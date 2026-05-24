
        // Smoothly switches view tabs without refreshing
        function switchTab(viewName) {
            document.querySelectorAll('.page-view').forEach(view => view.classList.remove('active-view'));
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            
            document.getElementById('view-' + viewName).classList.add('active-view');
            document.getElementById('nav-' + viewName).classList.add('active');

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            triggerCardAnimations();
            triggerHeaderAnimations();
            triggerCounterAnimations();
            
            if(viewName === 'home') {
                runHeroTypewriter();
            }
        }

        const observerOptions = {
            root: null,
            threshold: 0.08,
            rootMargin: "0px 0px -20px 0px"
        };

        const revealOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        const headerObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('header-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counterEl = entry.target;
                    const targetNum = parseInt(counterEl.getAttribute('data-target'));
                    const suffix = counterEl.getAttribute('data-suffix') || '';
                    let currentNum = 0;
                    
                    const duration = 1800; 
                    const stepTime = Math.max(Math.floor(duration / targetNum), 15);
                    const increment = Math.ceil(targetNum / (duration / stepTime));

                    const timer = setInterval(() => {
                        currentNum += increment;
                        if (currentNum >= targetNum) {
                            clearInterval(timer);
                            if(targetNum === 3000) {
                                counterEl.innerText = "3" + suffix;
                            } else {
                                counterEl.innerText = targetNum + suffix;
                            }
                        } else {
                            if(targetNum === 3000) {
                                counterEl.innerText = (currentNum / 1000).toFixed(1) + suffix;
                            } else {
                                counterEl.innerText = currentNum + suffix;
                            }
                        }
                    }, stepTime);

                    observer.unobserve(counterEl);
                }
            });
        }, { threshold: 0.5 });

        const textToType = "Our specialized solutions provide ironclad 24/7 security, safeguarding properties and corporate personnel with absolute reliability.";
        let typewriterTimeout;

        function runHeroTypewriter() {
            const container = document.getElementById('hero-typing-text');
            if(!container) return;
            
            container.innerHTML = ""; 
            clearTimeout(typewriterTimeout);
            
            let index = 0;
            const cursorSpan = document.createElement('span');
            cursorSpan.className = 'typewriter-cursor';
            cursorSpan.innerHTML = '&nbsp;';
            container.appendChild(cursorSpan);

            function type() {
                if (index < textToType.length) {
                    cursorSpan.before(textToType.charAt(index));
                    index++;
                    typewriterTimeout = setTimeout(type, 35); 
                }
            }
            type();
        }

        function triggerCardAnimations() {
            document.querySelectorAll('.active-view .premium-card, .active-view .service-img-card, .active-view .service-info-card, .active-view .img-panel, .active-view .deal-card, .active-view .feedback-card').forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                revealOnScroll.observe(element);
            });
        }

        function triggerHeaderAnimations() {
            document.querySelectorAll('.active-view .section-header-wrapper').forEach(header => {
                header.classList.remove('header-revealed'); 
                headerObserver.observe(header);
            });
        }

        function triggerCounterAnimations() {
            document.querySelectorAll('.active-view .counter').forEach(counter => {
                counter.innerText = "0"; 
                counterObserver.observe(counter);
            });
        }

        window.addEventListener('DOMContentLoaded', () => {
            triggerCardAnimations();
            triggerHeaderAnimations();
            triggerCounterAnimations();
            runHeroTypewriter();
        });