/**
 * api/translate.js
 * Issue #771 — AI-assisted translation endpoint.
 *
 * POST { text, targetLang, sourceLang?, context? }
 * ->   { translatedText, provider, cached }
 *
 * Keeps the same "degrade gracefully with no secrets configured" approach as
 * api/firebase-config.js: if TRANSLATION_API_KEY isn't set, the endpoint
 * returns the original text untouched with provider: "passthrough" instead
 * of throwing, so local dev / forks without an API key never see a 500.
 *
 * Provider is pluggable. Two are wired in here:
 *   - "anthropic": Claude via the Messages API (good for idiomatic,
 *     context-aware travel/culture copy, e.g. review translation)
 *   - "google": Google Cloud Translation v2 (cheap, fast, good default for
 *     short UI strings)
 * Select with the TRANSLATION_PROVIDER env var (defaults to "anthropic").
 */

const MAX_TEXT_LENGTH = 4000;

// Best-effort in-memory cache. Serverless instances are ephemeral and may be
// cold-started per request, so this only helps warm invocations — the
// client-side cache in js-modules/i18n-translation-client.js is the durable
// layer. Still worth it: it collapses duplicate requests hitting a warm
// instance (e.g. several visitors translating the same popular review).
const memoryCache = new Map();
const MEMORY_CACHE_LIMIT = 1000;

function cacheKey(text, targetLang, sourceLang) {
  return `${sourceLang}->${targetLang}:${text}`;
}

function rememberInCache(key, value) {
  if (memoryCache.size >= MEMORY_CACHE_LIMIT) {
    const oldestKey = memoryCache.keys().next().value;
    memoryCache.delete(oldestKey);
  }
  memoryCache.set(key, value);
}

async function translateWithAnthropic(text, targetLang, sourceLang, context) {
  const apiKey = process.env.TRANSLATION_API_KEY || process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const languageNames = {
    hi: 'Hindi', bn: 'Bengali', ta: 'Tamil', te: 'Telugu', mr: 'Marathi',
    gu: 'Gujarati', kn: 'Kannada', ml: 'Malayalam', pa: 'Punjabi', ur: 'Urdu', en: 'English',
  };
  const target = languageNames[targetLang] || targetLang;

  const prompt = [
    `Translate the following ${languageNames[sourceLang] || sourceLang} travel-website text into ${target}.`,
    context ? `Context: ${context}.` : '',
    'Preserve tone, keep place/dish/festival proper nouns recognizable, and reply with ONLY the translated text, no preamble or quotes.',
    '',
    'Text:',
    text,
  ].filter(Boolean).join('\n');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) throw new Error(`Anthropic API error: ${response.status}`);
  const data = await response.json();
  const textBlock = (data.content || []).find((block) => block.type === 'text');
  if (!textBlock) throw new Error('No text content in Anthropic response');
  return textBlock.text.trim();
}

async function translateWithGoogle(text, targetLang, sourceLang) {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) return null;

  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: text, target: targetLang, source: sourceLang, format: 'text' }),
  });

  if (!response.ok) throw new Error(`Google Translate API error: ${response.status}`);
  const data = await response.json();
  const translated = data?.data?.translations?.[0]?.translatedText;
  if (!translated) throw new Error('Malformed Google Translate response');
  return translated;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed, use POST' });
    return;
  }

  const apiSecret = process.env.TRANSLATE_API_SECRET;
  if (apiSecret) {
    const provided = req.headers['x-translate-secret'];
    if (!provided || provided !== apiSecret) {
      res.status(401).json({ error: 'Unauthorized.' });
      return;
    }
  }

  const { text, targetLang, sourceLang = 'en', context } = req.body || {};

  if (!text || typeof text !== 'string' || !targetLang) {
    res.status(400).json({ error: 'Request must include "text" (string) and "targetLang".' });
    return;
  }
  if (text.length > MAX_TEXT_LENGTH) {
    res.status(413).json({ error: `"text" exceeds ${MAX_TEXT_LENGTH} characters.` });
    return;
  }
  if (targetLang === sourceLang) {
    res.status(200).json({ translatedText: text, provider: 'noop', cached: false });
    return;
  }

  const key = cacheKey(text, targetLang, sourceLang);
  if (memoryCache.has(key)) {
    res.status(200).json({ translatedText: memoryCache.get(key), provider: 'cache', cached: true });
    return;
  }

  const provider = process.env.TRANSLATION_PROVIDER || 'anthropic';

  try {
    let translatedText = null;

    if (provider === 'google') {
      translatedText = await translateWithGoogle(text, targetLang, sourceLang);
    } else {
      translatedText = await translateWithAnthropic(text, targetLang, sourceLang, context);
    }

    if (translatedText === null) {
      // No provider credentials configured — degrade to passthrough rather
      // than error, matching the Firebase config endpoint's philosophy.
      res.status(200).json({ translatedText: text, provider: 'passthrough', cached: false });
      return;
    }

    rememberInCache(key, translatedText);
    res.status(200).json({ translatedText, provider, cached: false });
  } catch (err) {
    res.status(502).json({ error: 'Translation provider request failed.', detail: String(err.message || err) });
  }
}
