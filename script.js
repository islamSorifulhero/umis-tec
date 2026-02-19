
        function toggleMenu() {
            const menu = document.getElementById('nav-menu');
            menu.classList.toggle('open');
        }

        function openBooking() {
            document.getElementById('bookingModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeBooking() {
            document.getElementById('bookingModal').classList.remove('active');
            document.body.style.overflow = '';
        }

        function handleModalClick(e) {
            if (e.target === document.getElementById('bookingModal')) {
                closeBooking();
            }
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeBooking();
        });

        function toggleFAQ(btn) {
            const answer = btn.nextElementSibling;
            const isOpen = answer.classList.contains('open');

            document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
            document.querySelectorAll('.faq-question').forEach(b => b.classList.remove('active'));

            if (!isOpen) {
                answer.classList.add('open');
                btn.classList.add('active');
            }
        }

        window.addEventListener('scroll', function () {
            const btn = document.getElementById('scrollTop');
            if (window.scrollY > 400) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    document.getElementById('nav-menu').classList.remove('open');
                }
            });
        });

        function animateCounters() {
            document.querySelectorAll('.num').forEach(el => {
                const target = el.textContent;
                const num = parseInt(target.replace(/\D/g, ''));
                const suffix = target.replace(/[0-9]/g, '');
                let current = 0;
                const step = num / 60;
                const timer = setInterval(() => {
                    current = Math.min(current + step, num);
                    el.textContent = Math.floor(current) + suffix;
                    if (current >= num) clearInterval(timer);
                }, 20);
            });
        }

        const statsObserver = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                animateCounters();
                statsObserver.disconnect();
            }
        }, { threshold: 0.5 });

        const statsBar = document.querySelector('.stats-bar');
        if (statsBar) statsObserver.observe(statsBar);
