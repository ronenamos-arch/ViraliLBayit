// JavaScript לאתר בית וואו - מוצרים ויראליים
document.addEventListener('DOMContentLoaded', function() {
    
    // אנימציות hover לכפתורים
    initButtonAnimations();
    
    // פונקציית שיתוף בוואטסאפ
    initWhatsAppShare();
    
    // גלילה חלקה
    initSmoothScroll();
    
    // אנימציות כניסה לאלמנטים
    initScrollAnimations();
    
    // אפקטי hover על כרטיסי מוצרים
    initProductCardEffects();
});

/**
 * אנימציות hover לכפתורים
 */
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.cta-button, .main-cta-button, .share-button');
    
    buttons.forEach(button => {
        // אפקט hover עם אנימציה
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // אפקט לחיצה
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px) scale(1.02)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        // אנימציית bounce על click
        button.addEventListener('click', function() {
            this.classList.add('animate');
            setTimeout(() => {
                this.classList.remove('animate');
            }, 1000);
        });
    });
}

/**
 * פונקציית שיתוף בוואטסאפ
 */
function initWhatsAppShare() {
    const shareButton = document.getElementById('shareWhatsApp');
    
    if (shareButton) {
        shareButton.addEventListener('click', function() {
            const currentUrl = window.location.href;
            const shareText = encodeURIComponent(`תראו את המוצרים הוויראליים האלה לבית! כולם מדברים עליהם ב-2025! ${currentUrl}`);
            const whatsappUrl = `https://wa.me/?text=${shareText}`;
            
            // פתיחת וואטסאפ בחלון חדש
            window.open(whatsappUrl, '_blank');
            
            // אנימציה לכפתור
            this.style.background = 'linear-gradient(135deg, #128c7e 0%, #075e54 100%)';
            setTimeout(() => {
                this.style.background = 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)';
            }, 300);
        });
    }
}

/**
 * גלילה חלקה לאלמנטים
 */
function initSmoothScroll() {
    const scrollButton = document.getElementById('scrollToProducts');
    
    if (scrollButton) {
        scrollButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector('#products');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // גלילה חלקה לקישורי ניווט
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * אנימציות כניסה כשגוללים
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // אנימציה מדורגת לכרטיסי מוצרים
                if (entry.target.classList.contains('product-card')) {
                    const cards = document.querySelectorAll('.product-card');
                    const cardIndex = Array.from(cards).indexOf(entry.target);
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, cardIndex * 100);
                }
            }
        });
    }, observerOptions);
    
    // הוספת האלמנטים למעקב
    const animatedElements = document.querySelectorAll('.product-card, .section-title, .hero-title');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * אפקטים מיוחדים לכרטיסי מוצרים
 */
function initProductCardEffects() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productImage = card.querySelector('.product-image img');
        const ctaButton = card.querySelector('.cta-button');
        
        // אפקט פאראלקס קל על התמונה
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
        
        // אנימציה לכפתור CTA בתוך הכרטיס
        if (ctaButton) {
            ctaButton.addEventListener('mouseenter', function() {
                this.innerHTML = '🛒 ' + this.innerHTML.replace('🛒 ', '');
            });
            
            ctaButton.addEventListener('mouseleave', function() {
                this.innerHTML = this.innerHTML.replace('🛒 ', '');
            });
        }
        
        // אפקט שמעת על הכרטיס
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(40, 167, 69, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        });
    });
}

/**
 * מעקב אחר לחיצות על מוצרים לאנליטיקס
 */
function trackProductClick(productName, productPrice) {
    // כאן ניתן להוסיף קוד Google Analytics או מעקב אחר
    console.log(`Product clicked: ${productName} - Price: ${productPrice}`);
    
    // דוגמה ל-Google Analytics (יש להוסיף את הקוד הרלוונטי)
    // gtag('event', 'product_click', {
    //     'product_name': productName,
    //     'price': productPrice,
    //     'currency': 'ILS'
    // });
}

/**
 * פונקציה להוספת מעקב על כל לחיצות המוצרים
 */
document.querySelectorAll('.cta-button').forEach((button, index) => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('.product-title').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        
        trackProductClick(productName, productPrice);
    });
});

/**
 * התראה מותאמת לנייד
 */
function showMobileOptimizedAlert() {
    if (window.innerWidth <= 768) {
        // הוספת אפקטים מיוחדים למובייל
        document.body.classList.add('mobile-optimized');
        
        // שיפור ביצועים במובייל
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.style.willChange = 'transform';
        });
    }
}

// הפעלת אופטימיזציה למובייל
showMobileOptimizedAlert();

/**
 * ניהול מצב loading
 */
window.addEventListener('load', function() {
    // הסרת מצב loading אם קיים
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
    
    // הפעלת אנימציות הכניסה
    document.body.classList.add('loaded');
});

/**
 * פונקציית חיפוש מוצרים (עתידית)
 */
function searchProducts(query) {
    const products = document.querySelectorAll('.product-card');
    const searchQuery = query.toLowerCase();
    
    products.forEach(product => {
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        const description = product.querySelector('.product-description').textContent.toLowerCase();
        
        if (title.includes(searchQuery) || description.includes(searchQuery)) {
            product.style.display = 'block';
            product.style.animation = 'fadeIn 0.5s ease';
        } else {
            product.style.display = 'none';
        }
    });
}

/**
 * הוספת קיצורי מקלדת
 */
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter לשיתוף מהיר בוואטסאפ
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const shareButton = document.getElementById('shareWhatsApp');
        if (shareButton) {
            shareButton.click();
        }
    }
});

// הוספת console message למפתחים
console.log(`
🎉 ברוכים הבאים לבית וואו! 
🛠️ האתר נבנה עם HTML5, CSS3 ו-Vanilla JavaScript
📱 מותאם למובייל ומחשב
🎯 מותאם SEO לגוגל
💚 נבנה בישראל עם אהבה
`);
