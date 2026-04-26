
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');

        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 150, fill: "forwards" });
        });

        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        });

        const interactives = document.querySelectorAll('a, button, .project-card, .skill-category, .stat-card, .learning-item, .contact-card, .timeline-content');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });

        const obs = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible'); }), { threshold: .1 });
        document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const links = document.querySelectorAll('nav a');
            let cur = '';
            sections.forEach(s => { if (pageYOffset >= s.offsetTop - 100) cur = s.id; });
            links.forEach(a => { a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--accent2)' : ''; });
        });
    
