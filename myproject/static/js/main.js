document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const charCount = document.getElementById('char-count');

    // Initialize theme
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌙';
    }

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        chatWindow.scrollTo({
            top: chatWindow.scrollHeight,
            behavior: 'smooth'
        });
    };

    // Update timestamp for initial message
    const updateTimestamps = () => {
        document.querySelectorAll('[data-timestamp]').forEach(el => {
            const time = new Date();
            el.textContent = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        });
    };
    updateTimestamps();

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeIcon.textContent = isDark ? '☀️' : '🌙';
    });

    // Character count
    messageInput.addEventListener('input', () => {
        const length = messageInput.value.length;
        charCount.textContent = `${length}/500`;
        sendButton.disabled = length === 0 || length > 500;
    });

    // Send message
    const sendMessage = async () => {
        const text = messageInput.value.trim();
        if (!text) return;

        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'flex justify-end items-end gap-4 animate-bounce-in message-bubble';
        userMessage.setAttribute('role', 'region');
        userMessage.setAttribute('aria-label', 'User message');
        userMessage.innerHTML = `
            <div class="relative max-w-md p-5 rounded-2xl shadow-elegant bg-gradient-to-br from-secondary to-accent text-secondary-foreground shadow-glow-coral border border-border rounded-br-none">
                <p class="text-base leading-relaxed font-medium">${text}</p>
                <span class="text-xs opacity-70 mt-2 block text-right font-medium">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <div class="absolute bottom-0 right-[-8px] w-4 h-4 bg-gradient-to-br from-secondary to-accent transform rotate-45"></div>
            </div>
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-secondary-foreground font-bold shadow-glow-coral animate-float border-2 border-secondary-foreground/30">
                <span class="text-sm">You</span>
            </div>
        `;
        chatWindow.appendChild(userMessage);
        messageInput.value = '';
        charCount.textContent = '0/500';
        sendButton.disabled = true;
        scrollToBottom();

        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'flex justify-start items-end gap-4 animate-bounce-in';
        typingIndicator.innerHTML = `
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold shadow-glow animate-pulse-slow border-2 border-primary-foreground/30">
                <span class="text-lg">✨</span>
            </div>
            <div class="max-w-md p-5 rounded-2xl bg-card dark:bg-card text-card-foreground dark:text-card-foreground flex items-center space-x-2 shadow-elegant border border-border">
                <span class="font-medium">Thinking</span>
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        chatWindow.appendChild(typingIndicator);
        scrollToBottom();

        try {
            const response = await axios.post('http://localhost:8000/generate', {
                user_input: text
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            // Remove typing indicator
            typingIndicator.remove();

            // Add bot response
            const botMessage = document.createElement('div');
            botMessage.className = 'flex justify-start items-end gap-4 animate-bounce-in message-bubble';
            botMessage.setAttribute('role', 'region');
            botMessage.setAttribute('aria-label', 'Bot message');
            botMessage.innerHTML = `
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold shadow-glow animate-float border-2 border-primary-foreground/30">
                    <span class="text-lg">✨</span>
                </div>
                <div class="relative max-w-md p-5 rounded-2xl shadow-elegant bg-card dark:bg-card dark:text-card-foreground text-card-foreground shadow-glow border border-border rounded-bl-none">
                    <p class="text-base leading-relaxed font-medium">${response.data.bot_response}</p>
                    <span class="text-xs opacity-70 mt-2 block text-right font-medium">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <div class="absolute bottom-0 left-[-8px] w-4 h-4 bg-card dark:bg-card border-l border-b border-border transform rotate-45"></div>
                </div>
            `;
            chatWindow.appendChild(botMessage);
            scrollToBottom();
        } catch (error) {
            // Remove typing indicator
            typingIndicator.remove();

            // Add error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'flex justify-start items-end gap-4 animate-bounce-in message-bubble';
            errorMessage.setAttribute('role', 'region');
            errorMessage.setAttribute('aria-label', 'Bot message');
            errorMessage.innerHTML = `
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold shadow-glow animate-float border-2 border-primary-foreground/30">
                    <span class="text-lg">✨</span>
                </div>
                <div class="relative max-w-md p-5 rounded-2xl shadow-elegant bg-card dark:bg-card dark:text-card-foreground text-card-foreground shadow-glow border border-border rounded-bl-none">
                    <p class="text-base leading-relaxed font-medium">Sorry, I couldn’t respond. Please try again.</p>
                    <span class="text-xs opacity-70 mt-2 block text-right font-medium">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <div class="absolute bottom-0 left-[-8px] w-4 h-4 bg-card dark:bg-card border-l border-b border-border transform rotate-45"></div>
                </div>
            `;
            chatWindow.appendChild(errorMessage);
            console.error('API error:', error);
            scrollToBottom();
        }
    };

    // Send button click
    sendButton.addEventListener('click', sendMessage);

    // Enter key press
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
});
