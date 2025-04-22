document.addEventListener('DOMContentLoaded', function() {
    // ----------------- Değişken ve Sabitlerin Tanımlanması -----------------
    // Pricing toggle değişkenleri
    // Fiyatları kart sırasına göre (Bronze, Silver, Gold) array olarak tanımla
    const prices = {
        monthly: [
            { original: '1.199,00', price: '599,00' },  // Bronze Monthly (Tahmini)
            { original: '1.699,00', price: '849,00' },  // Silver Monthly (Tahmini)
            { original: '1.999,00', price: '999,00' }   // Gold Monthly
        ],
        yearly: [
            { original: '11.999,00', price: '5.999,00' }, // Bronze Yearly
            { original: '16.999,00', price: '8.499,00' }, // Silver Yearly
            { original: '19.999,00', price: '9.999,00' }  // Gold Yearly
        ]
    };

    // Animasyon seçenekleri
    const animationOptions = {
        threshold: 0.2, // Element %20 görünür olduğunda tetikle
        rootMargin: '-20px 0px',
        triggerOnce: true // Elementleri bir kere tetikle
    };

    // ----------------- DOM Elementlerinin Seçilmesi -----------------
    // Sayfa elementleri
    const pageLoader = document.querySelector('.page-loader');
    const header = document.querySelector('header');
    
    // Navigasyon elementleri
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Hero section elementleri
    const heroElements = [
        document.querySelector('.hero-mascot'),
        document.querySelector('.hero-content h1'),
        document.querySelector('.hero-content p'),
        document.querySelector('.hero-buttons')
    ];
    
    // İçerik elementleri
    const featureCards = document.querySelectorAll('.feature-card');
    const steps = document.querySelectorAll('.step');
    const pricingCards = document.querySelectorAll('.pricing-card');
    const accordions = document.querySelectorAll('.accordion');
    const sectionTitles = document.querySelectorAll('.section-title');
    
    // Pricing toggle elementleri
    const pricingToggle = document.getElementById('pricingToggle');
    const toggleOptions = document.querySelectorAll('.toggle-option');
    const yearlySavingsBadge = document.querySelector('.yearly-savings'); // Badge'i seç
    
    // Animasyonlu elementler
    const animatedElements = document.querySelectorAll(
        '.fade-in, .slide-left, .slide-right, .fade-up, .fade-scale, .feature-card, .step, .pricing-card, .accordion, .section-title'
    );

    // ----------------- Sayfa Yükleme İşlemleri -----------------
    // Sayfa yükleme animasyonu
    if (pageLoader) {
        const progressBar = document.querySelector('.loader-progress-bar');
        const loaderText = document.querySelector('.loader-text');
        
        // Simüle edilmiş sayfa yükleme ilerlemesi
        let progress = 0;
        const interval = setInterval(() => {
            // ...existing code...
        }, 200);
    } else {
        // Sayfa yükleme elementleri yoksa doğrudan animasyonları başlat
        startAnimations();
    }

    // ----------------- Fonksiyon Tanımlamaları -----------------
    
    // Animasyonları başlatan ana fonksiyon
    function startAnimations() {
        // Hero elementlerini canlandır
        heroElements.forEach((el, index) => {
            // ...existing code...
        });

        // Feature kartları animasyonu
        featureCards.forEach((card, i) => {
            card.style.animationDelay = `${i * 150}ms`;
        });
        
        // Adımlar animasyonu
        steps.forEach((step, i) => {
            step.style.animationDelay = `${i * 150}ms`;
        });
        
        // Fiyatlandırma kartları animasyonu
        pricingCards.forEach((card, i) => {
            card.style.animationDelay = `${i * 150}ms`;
        });
        
        // FAQ animasyonu
        accordions.forEach((accordion, i) => {
            accordion.style.animationDelay = `${i * 100}ms`;
        });
        
        // Section başlıkları animasyonu
        sectionTitles.forEach(title => {
            title.classList.add('fade-up');
        });

        // Scroll animasyonları için observer
        initIntersectionObserver();
    }

    // Intersection Observer kurulumu
    function initIntersectionObserver() {
        // Görünürlüğe göre animasyon için observer
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
                    // Default animation for cards/steps/accordions if no specific class is set
                    else if (element.classList.contains('feature-card') || element.classList.contains('step') || element.classList.contains('accordion')) animationClass = 'fade-scale-active'; 
                    else if (element.classList.contains('pricing-card')) animationClass = 'fade-up-active';
                    else if (element.classList.contains('section-title')) animationClass = 'fade-up-active';

                    if (animationClass) {
                        element.classList.add(animationClass);
                    }
                    observer.unobserve(element); // Animasyon tetiklendikten sonra gözlemlemeyi bırak
                }
            });
        }, animationOptions);
        
        // Tüm animasyonlu elementleri gözlemle
        animatedElements.forEach(element => {
            observer.observe(element);
        });

        // Bölümleri gözlemleme kaldırıldı, ana observer tüm elementleri yönetiyor.
    }

    // Fiyatlandırma toggle fonksiyonu
    function togglePricing(isYearly) {
        // Toggle seçeneklerini güncelle
        toggleOptions.forEach(option => {
            if (option.dataset.plan === (isYearly ? 'yearly' : 'monthly')) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });

        // Fiyatları güncelle
        pricingCards.forEach((card, index) => {
            // Ribbon içindeki fiyat elementlerini seç
            const originalPriceEl = card.querySelector('.ribbon .original-price'); 
            const pricingPriceEl = card.querySelector('.ribbon .pricing-price');
            
            // İlgili fiyat verisini al (array index'i kullanarak)
            const priceData = isYearly ? prices.yearly[index] : prices.monthly[index];

            // Elementler ve veri varsa güncelle
            if (priceData && originalPriceEl && pricingPriceEl) {
                 originalPriceEl.textContent = `₺${priceData.original}`;
                 pricingPriceEl.textContent = `₺${priceData.price}`;
            } else {
                console.error(`Price data or elements not found for card index: ${index}`);
            }
        });
    }

    // ----------------- Event Listeners -----------------
    
    // Hamburger menü
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Menu linkleri tıklandığında menüyü kapat
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Scroll event listener
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        
        // Header'ı sticky yap
        if (scrollTop > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }, { passive: true }); // Performans için passive scroll
    
    // Anchor linkleri için smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // FAQ Accordion
    accordions.forEach(accordion => {
        const header = accordion.querySelector('.accordion-header');
        const content = accordion.querySelector('.accordion-content');
        
        header.addEventListener('click', () => {
            content.classList.toggle('active');
        });
    });
    
    // Pricing toggle
    if (pricingToggle) {
        // Başlangıçta toggle durumuna göre fiyatları ayarla (Yıllık seçili başlıyor)
        togglePricing(pricingToggle.checked);

        // Toggle değiştiğinde pricing'i güncelle
        pricingToggle.addEventListener('change', function() {
            togglePricing(this.checked);
        });
        
        // Aylık/yıllık metin seçeneklerine tıklama işlemleri
        toggleOptions.forEach(option => {
            option.addEventListener('click', () => {
                const isYearly = option.dataset.plan === 'yearly';
                pricingToggle.checked = isYearly;
                togglePricing(isYearly);
            });
        });
    }
});
