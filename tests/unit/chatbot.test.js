/**
 * chatbot.test.js
 * Unit tests for the chatbot message escaping logic to prevent DOM XSS.
 *
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach } from 'vitest';

// Lightweight HTML escape utility extracted from app.js
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// addMessage logic extracted from app.js
function addMessage(text, className, chatMessages) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${className}`;
  const content = className === 'user-message' ? escapeHTML(text) : text;
  msgDiv.innerHTML = `<div class="message-content">${content}</div>`;
  chatMessages.appendChild(msgDiv);
}

describe('Chatbot Message Rendering & Escaping', () => {
  let chatMessages;

  beforeEach(() => {
    document.body.innerHTML = '<div id="chat-messages"></div>';
    chatMessages = document.getElementById('chat-messages');
  });

  it('escapeHTML helper correctly escapes special characters', () => {
    const raw = '<script>alert("hello & welcome");</script>';
    const escaped = escapeHTML(raw);
    expect(escaped).toBe('&lt;script&gt;alert(&quot;hello &amp; welcome&quot;);&lt;/script&gt;');
  });

  it('escapes user messages to prevent XSS injection', () => {
    const maliciousPayload = '<img src=x onerror=alert(1)>';
    addMessage(maliciousPayload, 'user-message', chatMessages);

    const msgElement = chatMessages.querySelector('.user-message .message-content');
    expect(msgElement).toBeTruthy();
    // In innerHTML, the escaped entities are rendered as text content, not as tags
    expect(msgElement.innerHTML).toBe('&lt;img src=x onerror=alert(1)&gt;');
    expect(msgElement.textContent).toBe(maliciousPayload);
  });

  it('does not escape bot messages to preserve HTML formatting', () => {
    const formatPayload = 'Taj Mahal is beautiful. <br><button class="chat-action-btn">Take me there</button>';
    addMessage(formatPayload, 'bot-message', chatMessages);

    const msgElement = chatMessages.querySelector('.bot-message .message-content');
    expect(msgElement).toBeTruthy();
    // Verify it rendered the inner HTML tags successfully
    expect(msgElement.innerHTML).toBe(formatPayload);
    expect(msgElement.querySelector('button')).toBeTruthy();
    expect(msgElement.querySelector('br')).toBeTruthy();
  });
});
