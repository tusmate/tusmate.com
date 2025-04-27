document.addEventListener('DOMContentLoaded', function() {
    const prices = {
        monthly: [
            { original: '1.199,00', price: '599,00' },
            { original: '1.699,00', price: '849,00' },
            { original: '1.999,00', price: '999,00' }
        ],
        yearly: [
            { original: '11.999,00', price: '5.999,00' },
            { original: '16.999,00', price: '8.499,00' },
            { original: '19.999,00', price: '9.999,00' }
        ]
    };

    const animationOptions = {
        threshold: 0.2,
        rootMargin: '-20px 0px',
        triggerOnce: true
    };

    const pageLoader = document.querySelector('.page-loader');
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const heroElements = [
        document.querySelector('.hero-mascot'),
        document.querySelector('.hero-content h1'),
        document.querySelector('.hero-content p'),
        document.querySelector('.hero-buttons')
    ];
    const featureCards = document.querySelectorAll('.feature-card');
    const steps = document.querySelectorAll('.step');
    const pricingCards = document.querySelectorAll('.pricing-card');
    const accordions = document.querySelectorAll('.accordion');
    const sectionTitles = document.querySelectorAll('.section-title');
    const pricingToggle = document.getElementById('pricingToggle');
    const toggleOptions = document.querySelectorAll('.toggle-option');
    const yearlySavingsBadge = document.querySelector('.yearly-savings');
    const animatedElements = document.querySelectorAll(
        '.fade-in, .slide-left, .slide-right, .fade-up, .fade-scale, .feature-card, .step, .pricing-card, .accordion, .section-title'
    );

    if (pageLoader) {
        const progressBar = document.querySelector('.loader-progress-bar');
        const loaderText = document.querySelector('.loader-text');
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 100) progress = 100;
            progressBar.style.width = `${progress}%`;
            loaderText.textContent = `Yükleniyor... ${Math.round(progress)}%`;
            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    pageLoader.classList.add('fade-out');
                    startAnimations();
                }, 500);
            }
        }, 200);
    } else {
        startAnimations();
    }

    function startAnimations() {
        heroElements.forEach((el, index) => {
            if (!el) return;
            let animationClass = '';
            if (index === 0) animationClass = 'fade-in';
            else if (index === 1) animationClass = 'slide-left';
            else if (index === 2) animationClass = 'slide-right';
            else if (index === 3) animationClass = 'fade-in';
            
            if (animationClass) {
                el.classList.add(animationClass);
                el.style.animationDelay = `${index * 200 + 500}ms`;
            }
        });

        featureCards.forEach((card, i) => {
            card.style.animationDelay = `${i * 150}ms`;
        });
        
        steps.forEach((step, i) => {
            step.style.animationDelay = `${i * 150}ms`;
        });
        
        pricingCards.forEach((card, i) => {
            card.style.animationDelay = `${i * 150}ms`;
        });
        
        accordions.forEach((accordion, i) => {
            accordion.style.animationDelay = `${i * 100}ms`;
        });
        
        sectionTitles.forEach(title => {
            title.classList.add('fade-up');
        });

        initIntersectionObserver();
    }

    function initIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    let animationClass = '';
                    if (element.classList.contains('fade-in')) animationClass = 'fade-in-active';
                    else if (element.classList.contains('slide-left')) animationClass = 'slide-left-active';
                    else if (element.classList.contains('slide-right')) animationClass = 'slide-right-active';
                    else if (element.classList.contains('fade-up')) animationClass = 'fade-up-active';
                    else if (element.classList.contains('fade-scale')) animationClass = 'fade-scale-active';
                    else if (element.classList.contains('feature-card') || element.classList.contains('step') || element.classList.contains('accordion')) animationClass = 'fade-scale-active'; 
                    else if (element.classList.contains('pricing-card')) animationClass = 'fade-up-active';
                    else if (element.classList.contains('section-title')) animationClass = 'fade-up-active';

                    if (animationClass) {
                        element.classList.add(animationClass);
                    }
                    observer.unobserve(element);
                }
            });
        }, animationOptions);
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    function togglePricing(isYearly) {
        toggleOptions.forEach(option => {
            if (option.dataset.plan === (isYearly ? 'yearly' : 'monthly')) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });

        pricingCards.forEach((card, index) => {
            const originalPriceEl = card.querySelector('.ribbon .original-price'); 
            const pricingPriceEl = card.querySelector('.ribbon .pricing-price');
            const priceData = isYearly ? prices.yearly[index] : prices.monthly[index];

            if (priceData && originalPriceEl && pricingPriceEl) {
                 originalPriceEl.textContent = `₺${priceData.original}`;
                 pricingPriceEl.textContent = `₺${priceData.price}`;
            } else {
                console.error(`Price data or elements not found for card index: ${index}`);
            }
        });
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        
        if (scrollTop > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }, { passive: true });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    accordions.forEach(accordion => {
        const header = accordion.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            accordion.classList.toggle('active');
        });
    });
    
    if (pricingToggle) {
        togglePricing(pricingToggle.checked);

        pricingToggle.addEventListener('change', function() {
            togglePricing(this.checked);
        });
        
        toggleOptions.forEach(option => {
            option.addEventListener('click', () => {
                const isYearly = option.dataset.plan === 'yearly';
                pricingToggle.checked = isYearly;
                togglePricing(isYearly);
            });
        });
    }
});
