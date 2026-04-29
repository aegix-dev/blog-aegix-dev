document.addEventListener('DOMContentLoaded', () => {
    // --- Posts Data ---
    const allPosts = [{
            "id": "zero-trust",
            "title": "Beyond the Perimeter: Implementing Zero Trust",
            "excerpt": "Why traditional network security is failing modern distributed teams and how to fix it.",
            "tag": "Architecture",
            "date": "Apr 21, 2026",
            "readTime": "8 min read",
            "image": "assets/zero_trust_hero_1777315326317.png",
            "url": "posts/zero-trust.html"
        },
        {
            "id": "supply-chain",
            "title": "Hardening the Software Supply Chain",
            "excerpt": "A deep dive into securing your CI/CD pipelines and managing third-party dependency risks.",
            "tag": "Research",
            "date": "Apr 23, 2026",
            "readTime": "12 min read",
            "image": "assets/supply_chain_security_1777315341624.png",
            "url": "posts/supply-chain.html"
        },
        {
            "id": "rust-future",
            "title": "Why Rust is the Future of Secure Systems",
            "excerpt": "Exploring memory safety, ownership, and how Rust eliminates entire classes of vulnerabilities.",
            "tag": "Languages",
            "date": "Apr 25, 2026",
            "readTime": "10 min read",
            "image": "assets/rust_security_hero_1777315358276.png",
            "url": "posts/rust-future.html"
        },
        {
            "id": "envelope-encryption",
            "title": "Scaling Trust: A Guide to Envelope Encryption",
            "excerpt": "Protect your data at scale by mastering the relationship between DEKs and KEKs.",
            "tag": "Cryptography",
            "date": "Apr 27, 2026",
            "readTime": "7 min read",
            "image": "assets/envelope_encryption_hero_1777319572101.png",
            "url": "posts/envelope-encryption.html"
        },
        {
            "id": "ai-threats",
            "title": "The Emerging Landscape of AI-Driven Threats",
            "excerpt": "How large language models are being leveraged for automated phishing and vulnerability discovery.",
            "tag": "Research",
            "date": "Apr 19, 2026",
            "readTime": "15 min read",
            "image": "assets/ai_threats_hero_v3_1777321659472.png",
            "url": "posts/ai-threats.html"
        },
        {
            "id": "secrets-management",
            "title": "Env Vars vs. KMS: The Secret Management Paradox",
            "excerpt": "A deep dive into the security tradeoffs between environment variables and dedicated Key Management Systems.",
            "tag": "Research",
            "date": "Apr 28, 2026",
            "readTime": "12 min read",
            "image": "assets/secrets_management.png",
            "url": "posts/secrets-management.html"
        },
        {
            "id": "wasm-security",
            "title": "Wasm: Near-Native Speed, Zero-Trust Execution",
            "excerpt": "Exploring the security architecture and performance benefits of WebAssembly for modern systems programming.",
            "tag": "Architecture",
            "date": "Apr 29, 2026",
            "readTime": "12 min read",
            "image": "assets/wasm_security.png",
            "url": "posts/wasm-security.html"
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
    initCopyButtons();
    initPlaygrounds();

    // 4. Global Code Utilities
    function initCopyButtons() {
        document.querySelectorAll('pre').forEach(block => {
            const button = document.createElement('button');
            button.className = 'copy-btn';
            button.innerText = 'COPY';
            button.style.position = 'absolute';
            button.style.top = '0.5rem';
            button.style.right = '0.5rem';

            block.style.position = 'relative';
            block.appendChild(button);

            button.addEventListener('click', () => {
                const code = block.querySelector('code').innerText;
                navigator.clipboard.writeText(code).then(() => {
                    button.innerText = 'COPIED!';
                    setTimeout(() => button.innerText = 'COPY', 2000);
                });
            });
        });
    }

    function initPlaygrounds() {
        document.querySelectorAll('.code-playground').forEach(playground => {
            const editor = playground.querySelector('.playground-editor');
            const runBtn = playground.querySelector('.run-btn');
            const output = playground.querySelector('.playground-output');

            if (runBtn && editor && output) {
                runBtn.addEventListener('click', () => {
                    const code = editor.value || editor.innerText;
                    output.innerHTML = '<span style="color: var(--primary)">[SYSTEM] EVALUATING...</span>';

                    setTimeout(() => {
                        const result = wasmProxy.evaluate(code);
                        output.innerHTML = result;
                    }, 800);
                });
            }
        });
    }

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


    // 6. Terminal Logic
    const termTrigger = document.getElementById('terminal-trigger');
    const termWindow = document.getElementById('terminal-window');
    const termClose = document.getElementById('terminal-close');
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');

    // Wasm Engine Bridge (Simulated Fallback)
    const wasmProxy = {
        genkey: () => {
            const key = Array.from({
                length: 32
            }, () => Math.floor(Math.random() * 16).toString(16)).join('');
            return `<span style="color: var(--primary)">[WASM_ENGINE]</span> Generated 256-bit AES Key: 0x${key}`;
        },
        verify: (token) => {
            if (!token) return 'ERROR: Usage "verify <token>"';
            const valid = token.startsWith('eyJ') && token.includes('.');
            return valid ?
                `<span style="color: var(--primary)">[WASM_ENGINE]</span> JWT Signature Matched. Principal: aegix-admin.` :
                `<span style="color: var(--primary)">[WASM_ENGINE]</span> [INVALID] Signature Mismatch.`;
        },
        encrypt: (data) => {
            if (!data) return 'ERROR: Usage "encrypt <data>"';
            const encrypted = data.split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ 42)).join('');
            return `<span style="color: var(--primary)">[WASM_ENGINE]</span> Encrypted Payload (XOR-42): ${encrypted}`;
        },
        evaluate: (policy) => {
            // Simulated Rust Logic
            if (policy.includes('"trust_score":')) {
                const parts = policy.split('"trust_score":')[1].split(/[},]/)[0].trim();
                const score = parseInt(parts);
                if (!isNaN(score)) {
                    return score >= 80 ?
                        `<span style="color: #4ade80">[SUCCESS] Policy Passed: Trust Score ${score} Verified.</span>` :
                        `<span style="color: #f87171">[FAILED] Policy Rejected: Trust Score ${score} below threshold (80).</span>`;
                }
            }
            return `<span style="color: var(--secondary)">[ERROR] Invalid Policy Syntax. Access Denied.</span>`;
        }
    };

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
                response.innerHTML = `
                    <span style="color: var(--primary)">AVAILABLE COMMANDS:</span><br>
                    - <span style="color: var(--primary)">LS</span>: List latest entries<br>
                    - <span style="color: var(--primary)">WHOAMI</span>: Session identity<br>
                    - <span style="color: var(--primary)">GENKEY</span>: [WASM] Generate AES-256 Key<br>
                    - <span style="color: var(--primary)">VERIFY &lt;token&gt;</span>: [WASM] Validate JWT<br>
                    - <span style="color: var(--primary)">ENCRYPT &lt;msg&gt;</span>: [WASM] XOR Encryption<br>
                    - <span style="color: var(--secondary)">CAT SECRET.TXT</span>: Access classified data
                `;
                break;
            case 'whoami':
                response.innerHTML = 'GUEST_USER // SESSION: AEGIX_PERIMETER_SECURE';
                break;
            case 'ls':
                response.innerHTML = allPosts.map(p => `[${p.date}] ${p.title}`).join('<br>');
                break;
            case 'genkey':
                response.innerHTML = wasmProxy.genkey();
                break;
            case 'clear':
                termOutput.innerHTML = '';
                return;
            case 'cat secret.txt':
                response.innerHTML = `
                    <span style="color: var(--secondary)">[CLASSIFIED] DECRYPTION SUCCESSFUL:</span><br>
                    Aegix mission: Secure the code, empower the dev. 
                    Established 2024. Mesh-scale security reached 2026.
                `;
                break;
            default:
                if (cmd.startsWith('verify ')) {
                    response.innerHTML = wasmProxy.verify(cmd.split(' ')[1]);
                } else if (cmd.startsWith('encrypt ')) {
                    response.innerHTML = wasmProxy.encrypt(cmd.split(' ')[1]);
                } else if (cmd.startsWith('cat ')) {
                    response.innerHTML = 'ERROR: Permission Denied. Access restricted to level 4 agents.';
                } else {
                    response.innerHTML = `COMMAND NOT FOUND: ${cmd}. TYPE 'HELP' FOR ASSISTANCE.`;
                }
                break;
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