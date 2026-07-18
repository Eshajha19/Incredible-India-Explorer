window.IIE = window.IIE || {};
(function() {
  'use strict';

  function initBharatGuide() {
    const chatToggle = document.getElementById('chatbot-toggle');
    const chatPanel = document.getElementById('chatbot-panel');
    const chatClose = document.getElementById('chatbot-close');
    const chatInput = document.getElementById('chatbot-input');
    const chatSend = document.getElementById('chatbot-send');
    const chatMessages = document.getElementById('chatbot-messages');

    if (!chatToggle || !chatPanel) return;

    chatToggle.addEventListener('click', () => {
      chatPanel.classList.toggle('open');
      if (chatPanel.classList.contains('open')) {
        chatInput?.focus();
        if (chatMessages && chatMessages.children.length === 0) {
          addBotMessage('Namaste! \uD83D\uDE4F I\'m your Bharat Guide. Ask me about India\'s history, culture, food, festivals, or anything you\'d like to explore!');
        }
      }
    });

    chatClose?.addEventListener('click', () => chatPanel.classList.remove('open'));

    function addBotMessage(text) {
      if (!chatMessages) return;
      const div = document.createElement('div');
      div.className = 'chatbot-msg bot';
      div.innerHTML = `<div class="msg-content">${text}</div>`;
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addUserMessage(text) {
      if (!chatMessages) return;
      const div = document.createElement('div');
      div.className = 'chatbot-msg user';
      div.innerHTML = `<div class="msg-content">${text}</div>`;
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(input) {
      const text = input.toLowerCase().trim();
      if (text.includes('namaste') || text.includes('hello') || text.includes('hi')) {
        return 'Namaste! \uD83D\uDE4F How can I help you explore India today? Ask me about food, festivals, history, or travel destinations!';
      }
      if (text.includes('food') || text.includes('cuisine') || text.includes('eat')) {
        return 'India\'s cuisine is incredibly diverse! From spicy Hyderabadi Biryani to sweet Bengali Rasgulla, every region has unique flavors. Try exploring our Cuisine Explorer section to learn more! \uD83C\uDF5B';
      }
      if (text.includes('festival') || text.includes('celebrate')) {
        return 'India celebrates countless festivals! Diwali (Festival of Lights), Holi (Festival of Colors), Eid, Pongal, Navratri, and Bihu are just a few. Each has unique traditions and stories! \uD83C\uDF89';
      }
      if (text.includes('dance')) {
        return 'India has 8 classical dance forms recognized by Sangeet Natak Akademi: Bharatanatyam, Kathak, Kathakali, Odissi, Kuchipudi, Manipuri, Mohiniyattam, and Sattriya. Each tells stories through graceful movements! \uD83D\uDD7A';
      }
      if (text.includes('music')) {
        return 'Indian music spans from ancient classical traditions (Hindustani & Carnatic) to Bollywood hits and modern fusion. Instruments like sitar, tabla, and veena have captivated audiences worldwide! \uD83C\uDFB5';
      }
      if (text.includes('history') || text.includes('heritage')) {
        return 'India\'s history spans over 5,000 years! From the Indus Valley Civilization to the Mughal Empire to the struggle for independence. Our heritage section covers monuments, freedom fighters, and cultural evolution. \uD83C\uDFDB\uFE0F';
      }
      if (text.includes('sport') || text.includes('game')) {
        return 'Cricket is India\'s most popular sport, but we also excel in hockey, badminton, wrestling, and kabaddi. India has produced legends like Sachin Tendulkar, P.V. Sindhu, and Neeraj Chopra! \uD83C\uDFC6';
      }
      if (text.includes('science') || text.includes('space') || text.includes('isro')) {
        return 'India has a rich scientific heritage! ISRO\'s Chandrayaan and Mangalyaan missions made history. We\'ve produced Nobel laureates like C.V. Raman and pioneers like A.P.J. Abdul Kalam. \uD83D\uDE80';
      }
      if (text.includes('yoga') || text.includes('ayurveda')) {
        return 'Yoga and Ayurveda are ancient Indian practices that have gained global recognition. Yoga originated in India over 5,000 years ago, and Ayurveda is one of the world\'s oldest holistic healing systems! \uD83E\uDDD8';
      }
      if (text.includes('taj mahal') || text.includes('monument')) {
        return 'The Taj Mahal in Agra is India\'s most famous monument, built by Shah Jahan. India has 40 UNESCO World Heritage Sites, including Jaipur\'s Jantar Mantar, Ajanta Caves, and Kaziranga National Park! \uD83C\uDFF0';
      }
      if (text.includes('thank')) {
        return 'You\'re welcome! \uD83D\uDE4F Keep exploring Incredible India. There\'s always something new to discover! Feel free to ask more questions anytime.';
      }
      return 'That\'s a great question about ' + input.split(' ').slice(0, 3).join(' ') + '! India has fascinating stories and traditions. Try exploring the interactive map or browse our sections on cuisine, festivals, music, dance, and more! \uD83C\uDF0F';
    }

    function handleSend() {
      const text = chatInput?.value.trim();
      if (!text) return;
      addUserMessage(text);
      if (chatInput) chatInput.value = '';

      setTimeout(() => {
        const response = getBotResponse(text);
        addBotMessage(response);

        // Text-to-speech
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(response);
          utterance.lang = 'en-IN';
          utterance.rate = 0.9;
          const voices = speechSynthesis.getVoices();
          const indianVoice = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('en-GB'));
          if (indianVoice) utterance.voice = indianVoice;
          speechSynthesis.speak(utterance);
        }
      }, 500);
    }

    chatSend?.addEventListener('click', handleSend);
    chatInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  window.IIE.BharatGuide = { init: initBharatGuide };
})();
