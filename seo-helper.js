// seo-helper.js
// Utility to set page title/description/canonical/OG/Twitter tags and structured JSON-LD data dynamically.

(function () {
  const BASE_URL = 'https://incredibleindiaexplorer.gov.in';

  // Helper to ensure meta tag exists and sets its attribute
  function setMetaTag(nameOrProperty, value, isProperty = false) {
    const selector = isProperty
      ? `meta[property="${nameOrProperty}"]`
      : `meta[name="${nameOrProperty}"]`;
    let element = document.querySelector(selector);
    if (!element) {
      element = document.createElement('meta');
      if (isProperty) {
        element.setAttribute('property', nameOrProperty);
      } else {
        element.setAttribute('name', nameOrProperty);
      }
      document.head.appendChild(element);
    }
    element.setAttribute('content', value);
  }

  // Helper to ensure link tag exists and sets its attribute
  function setLinkTag(rel, href) {
    let element = document.querySelector(`link[rel="${rel}"]`);
    if (!element) {
      element = document.createElement('link');
      element.setAttribute('rel', rel);
      document.head.appendChild(element);
    }
    element.setAttribute('href', href);
  }

  // Parse background-image from computed styles or style attributes
  function parseBgImage(element) {
    if (!element) return null;
    const style = element.getAttribute('style') || '';
    const match = style.match(/url\(['"]?([^'"]+)['"]?\)/);
    if (match) return match[1];

    try {
      const compStyle = window.getComputedStyle(element);
      const bgImg = compStyle.backgroundImage;
      const compMatch = bgImg.match(/url\(['"]?([^'"]+)['"]?\)/);
      if (compMatch) return compMatch[1];
    } catch (e) {}

    return null;
  }

  // Main SEO updater function
  function update(doc = document, path = window.location.pathname) {
    try {
      // 1. Title formatting
      let rawTitle = doc.title || '';
      // Strip trailing brand if already present to prevent duplication
      rawTitle = rawTitle.split('|')[0].trim();
      if (!rawTitle) {
        const h1 = doc.querySelector('h1');
        rawTitle = h1 ? h1.textContent.trim() : 'Explore India';
      }
      const formattedTitle = `${rawTitle} | Incredible India Explorer`;
      document.title = formattedTitle;

      // Determine clean relative path from absolute path
      let relPath = path;
      if (relPath.startsWith('/')) {
        relPath = relPath.substring(1);
      }
      if (!relPath) {
        relPath = 'index.html';
      }

      const absoluteUrl = `${BASE_URL}/${relPath}`;

      // 2. Extract description from content
      let description = '';
      const existingDesc = doc.querySelector('meta[name="description"]');
      if (existingDesc) {
        description = existingDesc.getAttribute('content');
      }

      if (!description) {
        const pDesc = doc.querySelector('.hero-description, .sub-hero p, .section-subtitle, main p, article p');
        if (pDesc) {
          description = pDesc.textContent.trim();
        }
      }

      if (description) {
        if (description.length > 160) {
          description = description.substring(0, 157) + '...';
        }
      } else {
        description = `Discover the rich history, monuments, cuisines, traditions, and vibrant offbeat destinations of ${rawTitle} in India.`;
      }

      // 3. Extract or resolve OG image
      let imageUrl = '';
      const existingOgImg = doc.querySelector('meta[property="og:image"]');
      if (existingOgImg) {
        imageUrl = existingOgImg.getAttribute('content');
      }

      if (!imageUrl) {
        const heroEl = doc.querySelector('.premium-hero, .sub-hero, .hero, header.banner');
        const parsedBg = parseBgImage(heroEl);
        if (parsedBg) {
          imageUrl = parsedBg;
        }
      }

      if (!imageUrl) {
        const contentImg = doc.querySelector('main img, #app-root img, img');
        if (contentImg) {
          imageUrl = contentImg.getAttribute('src');
        }
      }

      // Make image URL absolute
      if (imageUrl) {
        if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
          if (imageUrl.startsWith('../')) {
            imageUrl = imageUrl.substring(3);
          }
          if (imageUrl.startsWith('./')) {
            imageUrl = imageUrl.substring(2);
          }
          imageUrl = `${BASE_URL}/${imageUrl}`;
        }
      } else {
        imageUrl = `${BASE_URL}/assets/Brihadeeswara_Temple.png`;
      }

      // 4. Inject Meta and Canonical tags
      setMetaTag('description', description);
      setLinkTag('canonical', absoluteUrl);

      const shouldIndex = !relPath.includes('login.html') && !relPath.includes('offline.html');
      setMetaTag('robots', shouldIndex ? 'index, follow, max-image-preview:large' : 'noindex, nofollow');

      // OpenGraph Tags
      setMetaTag('og:title', formattedTitle, true);
      setMetaTag('og:description', description, true);
      setMetaTag('og:image', imageUrl, true);
      setMetaTag('og:url', absoluteUrl, true);
      setMetaTag('og:type', (relPath.includes('states/') || relPath.includes('state.html?state=')) ? 'place' : 'website', true);
      setMetaTag('og:site_name', 'Incredible India Explorer', true);

      // Twitter Card Tags
      setMetaTag('twitter:card', 'summary_large_image');
      setMetaTag('twitter:title', formattedTitle);
      setMetaTag('twitter:description', description);
      setMetaTag('twitter:image', imageUrl);

      // 5. Generate JSON-LD Structured Data
      let schema = null;
      const isStatePage = relPath.includes('states/') || relPath.includes('state.html?state=') || doc.body?.classList.contains('state-page-body');

      if (isStatePage) {
        schema = {
          "@context": "https://schema.org",
          "@type": "AdministrativeArea",
          "name": rawTitle,
          "description": description,
          "image": imageUrl,
          "url": absoluteUrl,
          "geo": {
            "@type": "GeoShape",
            "addressCountry": "IN"
          }
        };

        // Standard DOM traversal to find capital details safely
        let capital = '';
        const statCards = doc.querySelectorAll('.stat-card');
        statCards.forEach(card => {
          const h3 = card.querySelector('h3');
          if (h3 && h3.textContent.includes('Capital')) {
            const p = card.querySelector('p');
            if (p) capital = p.textContent.trim();
          }
        });

        if (capital) {
          schema.containedInPlace = {
            "@type": "Country",
            "name": "India"
          };
        }
      } else if (relPath.includes('festivals.html')) {
        schema = {
          "@context": "https://schema.org",
          "@type": "Festival",
          "name": rawTitle,
          "description": description,
          "image": imageUrl,
          "url": absoluteUrl,
          "location": {
            "@type": "Place",
            "name": "India",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN"
            }
          }
        };
      } else if (relPath.includes('monuments.html') || relPath.includes('heritage.html') || relPath.includes('caves.html')) {
        schema = {
          "@context": "https://schema.org",
          "@type": "Place",
          "name": rawTitle,
          "description": description,
          "image": imageUrl,
          "url": absoluteUrl,
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN"
          }
        };
      } else {
        schema = {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": rawTitle,
          "description": description,
          "image": imageUrl,
          "url": absoluteUrl,
          "author": {
            "@type": "Organization",
            "name": "Incredible India Explorer",
            "url": BASE_URL
          },
          "publisher": {
            "@type": "Organization",
            "name": "Incredible India Explorer",
            "url": BASE_URL
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": absoluteUrl
          }
        };
      }

      if (schema) {
        let scriptTag = document.getElementById('seo-structured-data');
        if (!scriptTag) {
          scriptTag = document.createElement('script');
          scriptTag.id = 'seo-structured-data';
          scriptTag.type = 'application/ld+json';
          document.head.appendChild(scriptTag);
        }
        scriptTag.textContent = JSON.stringify(schema, null, 2);
      }

      console.log(`[SEO Helper] Metadata synchronized for: ${relPath}`);
    } catch (e) {
      console.error("[SEO Helper] Failed to synchronize metadata:", e);
    }
  }

  // Register globally
  window.seoHelper = {
    update: update
  };

  // Run automatically on first script load when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => update());
  } else {
    update();
  }
})();
