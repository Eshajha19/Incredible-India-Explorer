# Incredible India Explorer 🇮🇳

![Hero Image](assets/hero_banner.png)

Welcome to the **Incredible India Explorer**—an immersive, interactive digital experience designed to showcase the rich culture, history, geography, and wildlife of India.

## 📑 Table of Contents

- [💡 The Idea Behind This](#-the-idea-behind-this)
- [✨ Features](#-features)
- [🚀 Getting Started](#-getting-started)
- [Demo](#demo)
- [Demo Link](#demo-link)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 💡 The Idea Behind This

The Incredible India Explorer was born out of a desire to move beyond static encyclopedias and dry historical texts. India's culture, history, and geography are dynamic and alive. This project aims to build an immersive, interactive digital experience—using modern web technologies, gamification, and interactive storytelling—to let users truly *experience* India from their screens.

## ✨ Features
*   **Interactive Freedom Story:** A 'Choose Your Own Adventure' style historical narrative allowing you to explore the Independence Movement through different philosophies.
*   **Dynamic Storylines:** Vertical scrolling timelines that tell a narrative journey (e.g., traveling from the Himalayas down to Kanyakumari).
*   **Bharat AI Guide:** A simulated, highly intelligent chatbot that can answer your questions about Indian food, culture, and travel destinations.
*   **Interactive Map:** A beautifully animated SVG map of India allowing users to click and learn about specific states.
*   **Global Theme Toggle:** Seamlessly switch between an elegant Frosted Glass Dark Mode and a crisp, clean Light Mode.
*   **Premium UI/UX:** Built entirely with Vanilla HTML, CSS, and JS, featuring CSS Grid, Flexbox, glassmorphism, and scroll-triggered IntersectionObserver animations.

## 🚀 Getting Started

This project uses no complex build tools or backend frameworks. It runs purely in the browser!

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/incredible-india-explorer.git
   ```
2. Navigate to the project directory:
   ```bash
   cd incredible-india-explorer
   ```
3. Open `index.html` in your favorite web browser!

### Firebase configuration for Vercel

Do not commit real Firebase secrets to GitHub. Copy [.env.example](.env.example) to your deployment environment and set these values in Vercel:

- FIREBASE_API_KEY
- FIREBASE_AUTH_DOMAIN
- FIREBASE_PROJECT_ID
- FIREBASE_STORAGE_BUCKET
- FIREBASE_MESSAGING_SENDER_ID
- FIREBASE_APP_ID
- FIREBASE_MEASUREMENT_ID

You can also use the VITE_* equivalents if you prefer.

The app will read these values at runtime via the /api/firebase-config endpoint.

## Demo

<img width="1909" height="910" alt="image" src="https://github.com/user-attachments/assets/84819247-7698-4cb5-ac16-c7f913733add" />
<img width="1904" height="898" alt="image" src="https://github.com/user-attachments/assets/b0f9c023-063e-413a-99fc-6688f59e80d2" />
<img width="1903" height="904" alt="image" src="https://github.com/user-attachments/assets/a564bc9a-29ea-49fb-9e2b-297976440727" />
<img width="1888" height="877" alt="image" src="https://github.com/user-attachments/assets/c09a2ef0-5c2c-403a-83e2-9a52e5c1401a" />
<img width="1886" height="777" alt="image" src="https://github.com/user-attachments/assets/fccdb4da-71bc-41d6-a80c-4eb152fcce4c" />
<img width="1902" height="816" alt="image" src="https://github.com/user-attachments/assets/66d0a1b2-f3d0-40c2-abd1-23e812491849" />
<img width="1899" height="901" alt="image" src="https://github.com/user-attachments/assets/bda3cf76-4b0f-4559-b1e4-a6dbdaed25ae" />

## Demo Link
https://incredible-india-explorer.vercel.app/

## 🧭 My India Journey - adding a new explorer page

Every explorer page can plug into the shared "My Journey" bookmarks + cross-explorer
search (see `journey.js`) with two small additions instead of inventing a new
`localStorage` key or a page-local search box:

1. **Bookmark button.** For each bookmarkable card, add a button
   (see the pattern in `museums.js` / `unesco.js`) and wire it to the shared API:

   ```js
   window.Journey.toggle({
     id: 'yourpage-someid',      // unique across the whole site
     explorerPage: 'yourpage.html',
     title: 'Card title',
     thumbnail: 'assets/your-image.png',
     category: 'your-category'
   });

   // Check saved state: window.Journey.isSaved(id)
   ```

2. **Searchable items.** Once your page's cards are rendered, register them with the
   cross-explorer search index so they show up in the shared nav search bar:

   ```js
   window.Journey.registerSearchItems('yourpage.html', [
     { id: 'yourpage-someid', title: 'Card title', description: 'Short description', link: 'yourpage.html' }
   ]);
   ```

Also include `<script src="journey.js"></script>` before your page's own script
(same load order as `data.js`/`app.js`), and add the shared nav search box + a
"🧭 My Journey" link to your page's nav (copy the `.journey-nav-search` block
from `unesco.html` or `museums.html`).

No build step or bundler is required — `journey.js` is a plain script include,
consistent with `app.js`/`pages-common.js`/`router.js`.


We welcome contributions! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) guide, review the [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md), and use the provided Issue and PR templates.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.