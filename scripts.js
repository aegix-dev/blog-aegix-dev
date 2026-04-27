document.addEventListener('DOMContentLoaded', () => {
    // --- Posts Data ---
    const allPosts = [{
            "id": "zero-trust",
            "title": "Beyond the Perimeter: Implementing Zero Trust",
            "excerpt": "Why traditional network security is failing modern distributed teams and how to fix it.",
            "tag": "Architecture",
            "date": "Apr 21, 2026",
            "readTime": "8 min read",
            "image": "/Users/evanhelbig/.gemini/antigravity/brain/5840524b-bc67-4c3e-8cb0-a2611c24965d/zero_trust_hero_1777315326317.png",
            "url": "posts/zero-trust.html"
        },
        {
            "id": "supply-chain",
            "title": "Hardening the Software Supply Chain",
            "excerpt": "A deep dive into securing your CI/CD pipelines and managing third-party dependency risks.",
            "tag": "Research",
            "date": "Apr 23, 2026",
            "readTime": "12 min read",
            "image": "/Users/evanhelbig/.gemini/antigravity/brain/5840524b-bc67-4c3e-8cb0-a2611c24965d/supply_chain_security_1777315341624.png",
            "url": "posts/supply-chain.html"
        },
        {
            "id": "rust-future",
            "title": "Why Rust is the Future of Secure Systems",
            "excerpt": "Exploring memory safety, ownership, and how Rust eliminates entire classes of vulnerabilities.",
            "tag": "Languages",
            "date": "Apr 25, 2026",
            "readTime": "10 min read",
            "image": "/Users/evanhelbig/.gemini/antigravity/brain/5840524b-bc67-4c3e-8cb0-a2611c24965d/rust_security_hero_1777315358276.png",
            "url": "posts/rust-future.html"
        },
        {
            "id": "envelope-encryption",
            "title": "Scaling Trust: A Guide to Envelope Encryption",
            "excerpt": "Protect your data at scale by mastering the relationship between DEKs and KEKs.",
            "tag": "Cryptography",
            "date": "Apr 27, 2026",
            "readTime": "7 min read",
            "image": "/Users/evanhelbig/.gemini/antigravity/brain/5840524b-bc67-4c3e-8cb0-a2611c24965d/envelope_encryption_hero_1777319572101.png",
            "url": "posts/envelope-encryption.html"
        },
        {
            "id": "ai-threats",
            "title": "The Emerging Landscape of AI-Driven Threats",
            "excerpt": "How large language models are being leveraged for automated phishing and vulnerability discovery.",
            "tag": "Research",
            "date": "Apr 19, 2026",
            "readTime": "15 min read",
            "image": "/Users/evanhelbig/.gemini/antigravity/brain/5840524b-bc67-4c3e-8cb0-a2611c24965d/ai_threats_hero_v3_1777321659472.png",
            "url": "posts/ai-threats.html"
        }
    ];

    let activeTag = 'all';
    let searchQuery = '';

    // --- Core Engine ---
    function init() {
        renderPosts();
    }

    function renderPosts() {
        const grid = document.getElementById('blog-grid');
        const noResults = document.getElementById('no-results');

        const filtered = allPosts.filter(post => {
            const matchesTag = activeTag === 'all' || post.tag === activeTag;
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTag && matchesSearch;
        });

        grid.innerHTML = '';

        if (filtered.length === 0) {
            noResults.style.display = 'block';
            grid.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            grid.style.display = 'grid';

            filtered.forEach((post, index) => {
                const card = document.createElement('article');
                card.className = 'card reveal';
                card.style.animationDelay = `${index * 0.1}s`;
                card.innerHTML = `
                    <div class="card-image">
                        <img src="${post.image}" alt="${post.title}">
                    </div>
                    <div class="card-content">
                        <span class="card-tag">${post.tag}</span>
                        <h3>${post.title}</h3>
                        <p>${post.excerpt}</p>
                        <div class="card-footer">
                            <span>${post.date}</span>
                            <span>${post.readTime}</span>
                        </div>
                    </div>
                    <a href="${post.url}" class="stretched-link" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></a>
                `;
                grid.appendChild(card);
            });
        }
    }

    // --- Search & Filter Listeners ---
    const searchInput = document.getElementById('post-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderPosts();
        });
    }

    const tagBtns = document.querySelectorAll('.tag-btn');
    tagBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tagBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeTag = btn.dataset.tag;
            renderPosts();
        });
    });

    // --- Visual Effects ---

    // 1. Atomic Decrypt Animation (Zero-Jitter)
    const decryptElements = document.querySelectorAll('.decrypt');
    const glitchChars = '01X$#%&@*+=-_/';

    function decryptEffect(element) {
        const originalText = element.dataset.text || element.innerText;
        const duration = 40;
        let isRunning = false;

        // --- PRE-INITIALIZE SPANS ---
        // We do this once so we only update textContent later
        element.innerHTML = '';
        const charNodes = originalText.split('').map(char => {
            const span = document.createElement('span');
            span.className = 'decrypt-char';
            // Use non-breaking space for spaces to preserve width
            span.textContent = char === ' ' ? '\u00A0' : char;
            element.appendChild(span);
            return span;
        });

        element.onmouseover = () => {
            if (isRunning) return;
            isRunning = true;
            element.classList.remove('finished');

            let iteration = 0;
            const maxIterations = originalText.length + 10;

            const interval = setInterval(() => {
                charNodes.forEach((span, index) => {
                    const threshold = index + Math.random() * 5;

                    if (iteration > threshold) {
                        if (!span.classList.contains('resolved')) {
                            span.classList.add('resolved');
                            span.textContent = originalText[index] === ' ' ? '\u00A0' : originalText[index];
                        }
                    } else {
                        // Update glitch char
                        const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                        span.textContent = randomChar;
                    }
                });

                if (iteration >= maxIterations) {
                    clearInterval(interval);
                    isRunning = false;
                    element.classList.add('finished');

                    // FORCE RESOLVE: Ensure every character is perfectly correct at the end
                    charNodes.forEach((span, index) => {
                        span.classList.add('resolved');
                        span.textContent = originalText[index] === ' ' ? '\u00A0' : originalText[index];
                    });
                }

                iteration += 0.5;
            }, duration);
        };
    }
    decryptElements.forEach(decryptEffect);

    // 2. Reading Progress Bar
    const progressBar = document.getElementById('reading-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolled + "%";
    });

    // 3. Mouse Parallax Grid
    const bgGrid = document.querySelector('.bg-grid');
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 20;
        const y = (e.clientY / window.innerHeight) * 20;
        if (bgGrid) {
            bgGrid.style.transform = `translate(${-x}px, ${-y}px)`;
        }
    });

    // 4. Clipboard Manager (for code blocks in posts)
    function setupCodeBlocks() {
        document.querySelectorAll('pre').forEach(block => {
            const button = document.createElement('button');
            button.className = 'copy-btn';
            button.innerText = 'COPY';
            block.style.position = 'relative';
            block.appendChild(button);

            button.addEventListener('click', () => {
                const code = block.querySelector('code').innerText;
                navigator.clipboard.writeText(code).then(() => {
                    button.innerText = 'COPIED';
                    button.style.color = 'var(--secondary)';
                    setTimeout(() => {
                        button.innerText = 'COPY';
                        button.style.color = 'var(--text-dim)';
                    }, 2000);
                });
            });
        });
    }
    setupCodeBlocks();

    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // 5. Newsletter Form Logic
    const newsletterForm = document.getElementById('newsletter-form');
    const formStatus = document.getElementById('form-status');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            newsletterForm.classList.add('scanning');

            setTimeout(() => {
                newsletterForm.classList.remove('scanning');
                newsletterForm.style.display = 'none';
                formStatus.style.display = 'block';
            }, 2500);
        });
    }

    // 6. Terminal Logic
    const termTrigger = document.getElementById('terminal-trigger');
    const termWindow = document.getElementById('terminal-window');
    const termClose = document.getElementById('terminal-close');
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');

    if (termTrigger) {
        termTrigger.addEventListener('click', () => {
            termWindow.style.display = 'flex';
            termInput.focus();
        });
    }

    if (termClose) {
        termClose.addEventListener('click', () => {
            termWindow.style.display = 'none';
        });
    }

    if (termInput) {
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = termInput.value.trim().toLowerCase();
                handleCommand(cmd);
                termInput.value = '';
            }
        });
    }

    function handleCommand(cmd) {
        if (!cmd) return;

        const line = document.createElement('div');
        line.innerHTML = `<span class="prompt">></span> ${cmd}`;
        termOutput.appendChild(line);

        const response = document.createElement('div');
        response.style.marginBottom = '0.5rem';

        switch (cmd) {
            case 'help':
                response.innerHTML = 'AVAILABLE COMMANDS: HELP, WHOAMI, LS, CLEAR, CAT [FILE]';
                break;
            case 'whoami':
                response.innerHTML = 'GUEST_USER // ACCESS_LEVEL: MINIMAL';
                break;
            case 'ls':
                response.innerHTML = 'index.html, styles.css, scripts.js, secret.txt';
                break;
            case 'clear':
                termOutput.innerHTML = '';
                return;
            case 'cat secret.txt':
                response.innerHTML = '<span style="color: var(--secondary)">ACCESS GRANTED:</span> "The best security is the one that empowers the developer, not blocks them." // USE CODE \'AEGIX_HACKER\' FOR 20% OFF.';
                break;
            default:
                if (cmd.startsWith('cat ')) {
                    response.innerHTML = `ERROR: ${cmd.split(' ')[1]} IS ENCRYPTED OR NOT FOUND.`;
                } else {
                    response.innerHTML = `COMMAND NOT RECOGNIZED: ${cmd}`;
                }
        }

        termOutput.appendChild(response);
        termOutput.scrollTop = termOutput.scrollHeight;
    }

    // Draggable Logic
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    const termHeader = document.getElementById('terminal-header');

    if (termHeader) {
        termHeader.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);
    }

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        if (e.target === termHeader || termHeader.contains(e.target)) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;
            setTranslate(currentX, currentY, termWindow);
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    // Initial load
    init();
});