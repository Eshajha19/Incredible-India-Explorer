/* ==========================================================================
   BHARAT GUIDE AI LOGIC
   ========================================================================== */

export function initBharatGuide() {
    const fabGuide = document.getElementById('fab-guide');
    const chatWindow = document.getElementById('guide-chat-window');
    const btnCloseChat = document.getElementById('btn-close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const btnSendMsg = document.getElementById('btn-send-msg');

    if (!fabGuide) return; // Not on this page

    // Knowledge Graph is now loaded from chatbot-data.js

    let isSynthesizing = false;

    // Toggle Chat
    fabGuide.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
        if (chatWindow.classList.contains('open')) {
            chatInput.focus();
        }
    });

    btnCloseChat.addEventListener('click', () => {
        chatWindow.classList.remove('open');
        if (isSynthesizing) {
            window.speechSynthesis.cancel();
            isSynthesizing = false;
        }
    });

    // Send Message
    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Add user message
        addMessage(text, 'user-message');
        chatInput.value = '';

        // Determine bot response using external knowledge base
        let response = "I'm sorry, I seem to be having trouble accessing my knowledge base. Let's try again later.";
        if (typeof findBestResponse === 'function') {
            response = findBestResponse(text);
        }

        // Show typing indicator
        const typingId = showTypingIndicator();

        setTimeout(() => {
            removeTypingIndicator(typingId);
            addMessage(response, 'bot-message');
            speakResponse(response);
        }, 1200 + Math.random() * 800);
    }

    btnSendMsg.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Chat UI helpers
    function addMessage(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${className}`;
        msgDiv.innerHTML = `<div class="message-content">${text}</div>`;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const id = 'typing-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot-message';
        msgDiv.id = id;
        msgDiv.innerHTML = `
            <div class="message-content typing-indicator">
                <span></span><span></span><span></span>
            </div>
        `;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
        return id;
    }

    function removeTypingIndicator(id) {
        const indicator = document.getElementById(id);
        if (indicator) {
            indicator.remove();
        }
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Web Speech API (Text-to-Speech)
    function speakResponse(text) {
        if (!('speechSynthesis' in window)) return;

        window.speechSynthesis.cancel(); // Cancel any ongoing speech

        const utterance = new SpeechSynthesisUtterance(text);

        // Try to find an Indian English voice for authenticity
        const voices = window.speechSynthesis.getVoices();
        const indianVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India'));

        if (indianVoice) {
            utterance.voice = indianVoice;
        }

        utterance.rate = 0.95;
        utterance.pitch = 1.0;

        isSynthesizing = true;
        utterance.onend = () => { isSynthesizing = false; };

        window.speechSynthesis.speak(utterance);
    }

    // Ensure voices are loaded (Chrome issue)
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.getVoices();
        };
    }
}

    


// Attach to window for global inline HTML handlers
window.initBharatGuide = initBharatGuide;
