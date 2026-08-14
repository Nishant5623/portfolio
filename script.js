/**
 * Portfolio Core Interactive JavaScript
 * Precision Custom Cursor, Magnetic Hover Physics, Card Spotlights, 3D Tilt, and Interactive Terminal
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Precision Dual Custom Cursor (Zero-Lag Dot + Smooth Elastic Ring)
    // -------------------------------------------------------------------------
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isCursorVisible = false;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isCursorVisible) {
            isCursorVisible = true;
            if (cursorDot) cursorDot.style.opacity = '1';
            if (cursorRing) cursorRing.style.opacity = '1';
            ringX = mouseX;
            ringY = mouseY;
        }

        // Instant 0ms tracking for the center laser dot
        if (cursorDot) {
            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        }
    }, { passive: true });

    // Smooth LERP loop for the outer trailing ring
    function renderCursor() {
        if (isCursorVisible && cursorRing) {
            ringX += (mouseX - ringX) * 0.16;
            ringY += (mouseY - ringY) * 0.16;
            cursorRing.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) translate(-50%, -50%)`;
        }
        requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Window enter / leave visibility handling
    document.addEventListener('mouseleave', () => {
        isCursorVisible = false;
        if (cursorDot) cursorDot.style.opacity = '0';
        if (cursorRing) cursorRing.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        isCursorVisible = true;
        if (cursorDot) cursorDot.style.opacity = '1';
        if (cursorRing) cursorRing.style.opacity = '1';
    });

    // Mousedown / Mouseup click feedback
    window.addEventListener('mousedown', () => {
        document.body.classList.add('cursor-click');
    });

    window.addEventListener('mouseup', () => {
        document.body.classList.remove('cursor-click');
    });

    // Attach hover scaling over interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, input, .btn, .magnetic-btn, .spotlight-card, .skill-item, .pill, .social-link, .term-btn, #emailCopyBtn, .nav-item'
    );

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });

    // -------------------------------------------------------------------------
    // 2. Magnetic Button Physics (Smooth Pull towards Cursor)
    // -------------------------------------------------------------------------
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px) scale(1.04)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // -------------------------------------------------------------------------
    // 3. Mouse-Following Spotlight on Cards (Linear / Vercel style)
    // -------------------------------------------------------------------------
    const spotlightCards = document.querySelectorAll('.spotlight-card');
    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // -------------------------------------------------------------------------
    // 4. 3D Card Perspective Tilt
    // -------------------------------------------------------------------------
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-9px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // -------------------------------------------------------------------------
    // 5. Brand Color Halos for Tech Stack Badges
    // -------------------------------------------------------------------------
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        const brandColor = item.getAttribute('data-color');
        if (brandColor) {
            item.style.setProperty('--skill-accent', brandColor);
            item.style.setProperty('--skill-glow', `${brandColor}45`);
        }
    });

    // -------------------------------------------------------------------------
    // 6. Interactive Developer Terminal
    // -------------------------------------------------------------------------
    const termTyping = document.getElementById('termTyping');
    const termOutput = document.getElementById('termOutput');
    const activePromptLine = document.getElementById('activePromptLine');
    const termButtons = document.querySelectorAll('.term-btn');

    const termResponses = {
        whoami: `<span class="text-white">Nishant Pal</span> — 3rd Year B.Tech CSE Student & Backend Enthusiast.`,
        skills: `<div class="json-output">
            <span class="json-key">"languages"</span>: [<span class="json-str">"Java"</span>, <span class="json-str">"Python"</span>, <span class="json-str">"C++"</span>, <span class="json-str">"Bash"</span>],<br>
            <span class="json-key">"backend"</span>: [<span class="json-str">"Spring Boot"</span>, <span class="json-str">"DSA"</span>, <span class="json-str">"SQL"</span>, <span class="json-str">"MongoDB"</span>],<br>
            <span class="json-key">"environment"</span>: <span class="json-str">"Arch Linux / Git / REST APIs"</span>
        </div>`,
        status: `<span class="badge-success">● READY TO BUILD</span> Actively seeking internships and backend software roles. Open to collaborate!`,
        projects: `<div class="json-output">
            1. <strong>CLI Interactive Portfolio</strong> (JavaScript, Terminal UI)<br>
            2. <strong>Patient Billing System</strong> (Java Swing, OOP, File I/O)<br>
            3. <strong>VLSM Network Calculator</strong> (Subnetting Algorithm, JS)<br>
            4. <strong>Student Task Manager</strong> (Node.js, Express, MongoDB)
        </div>`
    };

    let isTyping = false;

    function runTerminalCommand(cmd) {
        if (isTyping) return;

        if (cmd === 'clear') {
            const logs = termOutput.querySelectorAll('.term-log');
            logs.forEach(log => log.remove());
            return;
        }

        isTyping = true;
        termTyping.textContent = '';
        let charIndex = 0;

        const typeInterval = setInterval(() => {
            if (charIndex < cmd.length) {
                termTyping.textContent += cmd[charIndex];
                charIndex++;
            } else {
                clearInterval(typeInterval);

                setTimeout(() => {
                    const logEntry = document.createElement('div');
                    logEntry.className = 'term-log';
                    logEntry.innerHTML = `
                        <div class="code-line mt-2">
                            <span class="prompt">❯</span>
                            <span class="command">${cmd}</span>
                        </div>
                        <div class="command-output">
                            ${termResponses[cmd] || `<span class="text-dim">Command not recognized. Try whoami, skills, or status.</span>`}
                        </div>
                    `;

                    termOutput.insertBefore(logEntry, activePromptLine);
                    termTyping.textContent = '';
                    termOutput.scrollTop = termOutput.scrollHeight;
                    isTyping = false;
                }, 180);
            }
        }, 40);
    }

    termButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            if (cmd) runTerminalCommand(cmd);
        });
    });

    // -------------------------------------------------------------------------
    // 7. Click-to-Copy Email with Toast Notification
    // -------------------------------------------------------------------------
    const emailBtn = document.getElementById('emailCopyBtn');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    let toastTimeout = null;

    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            const email = emailBtn.getAttribute('data-email') || 'nishantpal072@gmail.com';
            
            navigator.clipboard.writeText(email).then(() => {
                showToast(`Copied to clipboard: ${email}`);
            }).catch(() => {
                window.location.href = `mailto:${email}`;
            });
        });
    }

    function showToast(message) {
        if (!toast) return;
        if (toastMsg) toastMsg.textContent = message;
        
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3200);
    }

    // -------------------------------------------------------------------------
    // 8. Scroll Progress Bar & Header Glass Effect & Scrollspy
    // -------------------------------------------------------------------------
    const scrollProgress = document.getElementById('scrollProgress');
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    const handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Progress Bar
        if (scrollProgress && maxScroll > 0) {
            const progress = (scrollTop / maxScroll) * 100;
            scrollProgress.style.width = `${progress}%`;
        }

        // Header Background Blur Transition
        if (header) {
            if (scrollTop > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Scrollspy - Active Navigation Highlight
        let currentSection = '';
        const probe = scrollTop + window.innerHeight * 0.3;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 130;
            const sectionBottom = section.offsetTop + section.offsetHeight;
            if (probe >= sectionTop && probe < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });

        if (scrollTop >= maxScroll - 2 && sections.length) {
            currentSection = sections[sections.length - 1].getAttribute('id');
        }

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // -------------------------------------------------------------------------
    // 9. Mobile Drawer Navigation Toggle
    // -------------------------------------------------------------------------
    const navToggle = document.getElementById('navToggle');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-open');
        });
    }

    navItems.forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('nav-open');
        });
    });

    document.addEventListener('click', (e) => {
        if (document.body.classList.contains('nav-open') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('#navToggle')) {
            document.body.classList.remove('nav-open');
        }
    });

    // -------------------------------------------------------------------------
    // 10. Dynamic Footer Year
    // -------------------------------------------------------------------------
    const footerYear = document.getElementById('footerYear');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    // -------------------------------------------------------------------------
    // 11. Smooth Anchor Link Scrolling with Header Offset
    // -------------------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 85;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
