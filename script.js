// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
    const closeIcon = mobileMenuBtn.querySelector('.close-icon');
    let isMobileMenuOpen = false;

    // Handle scroll effect for navbar
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Mobile menu toggle
    function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
        
        if (isMobileMenuOpen) {
            mobileMenu.classList.remove('hidden');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        } else {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    }

    // Close mobile menu when clicking on a link
    function closeMobileMenu() {
        if (isMobileMenuOpen) {
            toggleMobileMenu();
        }
    }

    // Smooth scrolling function
    function scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Only close mobile menu if section exists
        // Otherwise, do nothing
    }

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Add click listeners to all navigation links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const sectionId = href.substring(1);
                scrollToSection(sectionId);
            }
            // For external links, let the browser handle navigation
        });
    });

    // Handle CTA button clicks
    const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-full');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            scrollToSection('process');
        });
    });

    // Make scrollToSection globally available for inline onclick handlers
    window.scrollToSection = scrollToSection;

    // Initialize scroll state
    handleScroll();
});

// Additional utility functions
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements that should animate in
    const animatedElements = document.querySelectorAll('.hero-inner');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeAnimations);

// Study Destinations 3D Carousel
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('destinations-carousel');
    const prevBtn = document.getElementById('destinations-prev');
    const nextBtn = document.getElementById('destinations-next');
    const dots = document.getElementById('destinations-dots');
    const cards = document.querySelectorAll('.destination-card');
    
    let currentIndex = 0;
    let isAnimating = false;
    const totalCards = cards.length;

    function getCardTransform(index) {
        const angle = (360 / totalCards) * index;
        const currentAngle = (360 / totalCards) * currentIndex;
        const relativeAngle = angle - currentAngle;
        
        const radius = 400;
        const translateZ = Math.cos((relativeAngle * Math.PI) / 180) * radius;
        const translateX = Math.sin((relativeAngle * Math.PI) / 180) * radius;
        
        const scale = Math.max(0.6, 1 - Math.abs(translateZ) / 800);
        const opacity = Math.max(0.3, 1 - Math.abs(translateZ) / 600);
        
        return {
            transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`,
            opacity: opacity,
            zIndex: Math.round(translateZ)
        };
    }

    function updateCarousel() {
        cards.forEach((card, index) => {
            const style = getCardTransform(index);
            card.style.transform = style.transform;
            card.style.opacity = style.opacity;
            card.style.zIndex = style.zIndex;
            
            if (index === currentIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Update dots
        const dotElements = dots.querySelectorAll('.dot');
        dotElements.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }

    function prevSlide() {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }

    function goToSlide(index) {
        if (isAnimating || index === currentIndex) return;
        isAnimating = true;
        currentIndex = index;
        updateCarousel();
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Dot navigation
    dots.addEventListener('click', function(e) {
        if (e.target.classList.contains('dot')) {
            const slideIndex = parseInt(e.target.dataset.slide);
            goToSlide(slideIndex);
        }
    });

    // Card click navigation
    cards.forEach((card, index) => {
        card.addEventListener('click', () => goToSlide(index));
    });

    // Auto-rotate
    setInterval(() => {
        if (!isAnimating) {
            nextSlide();
        }
    }, 4000);

    // Initialize
    updateCarousel();
});

// Partners Carousel
document.addEventListener('DOMContentLoaded', function() {
    const partnersGrid = document.getElementById('partners-grid');
    const partnersPrev = document.getElementById('partners-prev');
    const partnersNext = document.getElementById('partners-next');
    const partnersDots = document.getElementById('partners-dots');
    
    const partnerCards = [
        {
            logo: '🏛️',
            name: 'University of Toronto',
            location: 'Canada',
            ranking: '#1 in Canada',
            programs: ['Medicine', 'Engineering', 'Business']
        },
        {
            logo: '🎓',
            name: 'Oxford University',
            location: 'United Kingdom',
            ranking: '#2 Global',
            programs: ['Law', 'Medicine', 'PPE']
        },
        {
            logo: '🏫',
            name: 'University of Melbourne',
            location: 'Australia',
            ranking: '#1 in Australia',
            programs: ['Research', 'Arts', 'Science']
        },
        {
            logo: '🔬',
            name: 'MIT',
            location: 'United States',
            ranking: '#1 Engineering',
            programs: ['Technology', 'Engineering', 'Science']
        },
        {
            logo: '⚙️',
            name: 'TU Munich',
            location: 'Germany',
            ranking: '#1 in Germany',
            programs: ['Engineering', 'Technology', 'Innovation']
        },
        {
            logo: '🏜️',
            name: 'American University of Dubai',
            location: 'UAE',
            ranking: 'Top in Region',
            programs: ['Business', 'Engineering', 'Media']
        },
        {
            logo: '🍁',
            name: 'University of British Columbia',
            location: 'Canada',
            ranking: '#3 in Canada',
            programs: ['Medicine', 'Forestry', 'Arts']
        },
        {
            logo: '👑',
            name: 'Imperial College London',
            location: 'United Kingdom',
            ranking: '#4 Global',
            programs: ['Engineering', 'Medicine', 'Science']
        }
    ];

    let currentSlide = 0;
    const itemsPerSlide = 4;
    const totalSlides = Math.ceil(partnerCards.length / itemsPerSlide);

    function renderPartners() {
        const start = currentSlide * itemsPerSlide;
        const currentPartners = partnerCards.slice(start, start + itemsPerSlide);
        
        partnersGrid.innerHTML = currentPartners.map(partner => `
            <div class="partner-card">
                <div class="partner-logo">${partner.logo}</div>
                <h3 class="partner-name">${partner.name}</h3>
                <p class="partner-location">📍 ${partner.location}</p>
                <div class="partner-ranking">${partner.ranking}</div>
                <div class="partner-programs">
                    ${partner.programs.map(program => `<div>• ${program}</div>`).join('')}
                </div>
                <button class="partner-link">Learn More <i data-lucide="external-link"></i></button>
            </div>
        `).join('');

        // Reinitialize Lucide icons
        lucide.createIcons();
    }

    function updateDots() {
        const dots = partnersDots.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextPartnersSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        renderPartners();
        updateDots();
    }

    function prevPartnersSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        renderPartners();
        updateDots();
    }

    // Event listeners
    partnersNext.addEventListener('click', nextPartnersSlide);
    partnersPrev.addEventListener('click', prevPartnersSlide);

    partnersDots.addEventListener('click', function(e) {
        if (e.target.classList.contains('dot')) {
            currentSlide = parseInt(e.target.dataset.slide);
            renderPartners();
            updateDots();
        }
    });

    // Initialize
    renderPartners();
    updateDots();
});

document.addEventListener('DOMContentLoaded', function() {
    const bookNowBtn = document.getElementById("book-now-btn");
    if (bookNowBtn) {
        bookNowBtn.addEventListener("click", function () {
            const message = encodeURIComponent(
              `Hello *ELUNITE Team!*\nI’d like to schedule a one-on-one consultation session.\nLooking forward to your guidance.`
            );

            // Replace with your WhatsApp number (no + sign)
            const phoneNumber = "918050306510";
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

            // Redirect to WhatsApp
            window.open(whatsappURL, '_blank');
          });
    }
});

// Smooth scroll for all internal links
document.addEventListener('DOMContentLoaded', function() {
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            scrollToSection('contact');
        });
    });
});

// Add floating animation to particles
document.addEventListener('DOMContentLoaded', function() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        particle.style.animationDelay = `${index * 0.5}s`;
    });
});

// Footer functionality
function scrollToTop() {
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });
}

// Social media links
document.addEventListener('DOMContentLoaded', function() {
    const socialBtns = document.querySelectorAll('.social-btn');
    
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.dataset.platform;
            let url = '#';
            
            switch(platform) {
                case 'facebook':
                    url = 'https://www.facebook.com/elunite/';
                    break;
                case 'instagram':
                    url = 'https://www.instagram.com/elunite_education/';
                    break;
                case 'linkedin':
                    url = 'https://linkedin.com/company/elunite';
                    break;
                case 'twitter':
                    url = 'https://twitter.com/elunite';
                    break;
            }
            
            window.open(url, '_blank');
        });
    });
});

// Footer link navigation
document.addEventListener('DOMContentLoaded', function() {
    const footerLinks = document.querySelectorAll('.footer-link');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const sectionId = href.substring(1);
                scrollToSection(sectionId);
            }
            // For external links, let the browser handle navigation
        });
    });
});


// Student Testimonials Data

const testimonials = [
    {
        name: "Priya Sharma",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        program: "Computer Science Student",
        university: "University of Toronto, Canada",
        quote: "Elunite made my dream of studying in Canada a reality. Their guidance through the application process was invaluable, and I received a scholarship too!",
        rating: 5
    },
    {
        name: "Ahmed Hassan",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        program: "MBA Student",
        university: "University of Melbourne, Australia",
        quote: "From visa application to finding accommodation, Elunite supported me every step of the way. Now I'm pursuing my MBA in Australia!",
        rating: 5
    },
    {
        name: "Li Wei",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        program: "Engineering Student",
        university: "MIT, United States",
        quote: "Thanks to Elunite's expert counseling, I got admission to my dream university. Their test preparation helped me achieve the required scores.",
        rating: 5
    },
    {
        name: "Maria Rodriguez",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        program: "Medicine Student",
        university: "Oxford University, UK",
        quote: "The personalized approach at Elunite helped me secure admission to Oxford. Their scholarship guidance was exceptional and saved my family thousands.",
        rating: 5
    },
    {
        name: "David Thompson",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        program: "Business Analytics",
        university: "IIM Bangalore, India",
        quote: "Studying at IIM was always my goal. Elunite's counselors understood my aspirations and guided me perfectly through the entrance exams and interviews.",
        rating: 5
    },
    {
        name: "Sarah Johnson",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        program: "International Relations",
        university: "Peking University, China",
        quote: "The cultural preparation and language support from Elunite made my transition to Beijing seamless. I'm thriving in my international relations program!",
        rating: 5
    },
    {
        name: "Hassan Mahmoud",
        image: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        program: "Aerospace Engineering",
        university: "University of Sydney, Australia",
        quote: "Elunite's visa guidance was flawless. I faced no complications and received my student visa within the expected timeframe. Highly recommend their services!",
        rating: 5
    },
    {
        name: "Emma Wilson",
        image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        program: "Data Science",
        university: "University of Waterloo, Canada",
        quote: "The scholarship I received through Elunite's guidance covered 80% of my tuition. Their expertise in finding funding opportunities is unmatched.",
        rating: 5
    },
    {
        name: "Raj Patel",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        program: "Finance & Economics",
        university: "London School of Economics, UK",
        quote: "From application essays to interview preparation, Elunite's comprehensive support helped me get into LSE. Their expertise is truly world-class.",
        rating: 5
    },
    {
        name: "Yuki Tanaka",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        program: "Artificial Intelligence",
        university: "Stanford University, USA",
        quote: "Elunite's guidance helped me navigate the complex US admission process. Now I'm pursuing my passion for AI at Stanford - a dream come true!",
        rating: 5
    }
];
// ============================
// Student Testimonials Carousel (3D with prev/active/next)
// ============================
document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("testimonials-carousel");
    const prevBtn = document.getElementById("testimonials-prev");
    const nextBtn = document.getElementById("testimonials-next");
    const dotsContainer = document.getElementById("testimonials-dots");

    let currentIndex = 0;
    const total = testimonials.length;

    // Render testimonial cards
    function renderTestimonials() {
        carousel.innerHTML = testimonials
            .map(
                (t, index) => `
            <div class="testimonial-carousel-card" data-index="${index}">
                <div class="testimonial-header">
                    <img src="${t.image}" alt="${t.name}" class="testimonial-image"/>
                    <div class="testimonial-info">
                        <div class="testimonial-name">${t.name}</div>
                        <div class="testimonial-position">${t.program}</div>
                        <div class="testimonial-university">${t.university}</div>
                    </div>
                </div>
                <div class="testimonial-quote">
                    <div class="quote-icon">❝</div>
                    <p>${t.quote}</p>
                </div>
                <div class="testimonial-rating">${"⭐".repeat(t.rating)}</div>
            </div>
        `
            )
            .join("");

        updateClasses();
        renderDots();
    }

    // Update prev/active/next classes
    function updateClasses() {
        const cards = document.querySelectorAll(".testimonial-carousel-card");
        cards.forEach((card) => card.classList.remove("active", "prev", "next"));

        const prevIndex = (currentIndex - 1 + total) % total;
        const nextIndex = (currentIndex + 1) % total;

        cards[currentIndex].classList.add("active");
        cards[prevIndex].classList.add("prev");
        cards[nextIndex].classList.add("next");
    }

    // Render dots
    function renderDots() {
        dotsContainer.innerHTML = testimonials
            .map(
                (_, i) =>
                    `<span class="dot ${i === currentIndex ? "active" : ""}" data-slide="${i}"></span>`
            )
            .join("");
    }

    // Navigation
    function nextSlide() {
        currentIndex = (currentIndex + 1) % total;
        updateClasses();
        renderDots();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + total) % total;
        updateClasses();
        renderDots();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateClasses();
        renderDots();
    }

    // Event Listeners
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    dotsContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("dot")) {
            const slideIndex = parseInt(e.target.dataset.slide);
            goToSlide(slideIndex);
        }
    });

    // Auto-rotate
    setInterval(nextSlide, 6000);

    // Initialize
    renderTestimonials();
});

// FAQ Accordion
function initFAQ() {
    const faqToggles = document.querySelectorAll('.faq-toggle');

    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", initFAQ);

// Navigate to show the section title/heading
function navigateToSection(targetPage, sectionId) {
    if (window.location.pathname.includes(targetPage.replace('.html', ''))) {
        scrollToSectionTitle(sectionId);
    } else {
        window.location.href = `${targetPage}#${sectionId}`;
    }
}

// Scroll to show the section title prominently
function scrollToSectionTitle(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        // Find the title within the section
        const title = element.querySelector('.service-section-title, h2, h1');
        const targetElement = title || element;
        
        // Calculate position with extra space above the title
        const rect = targetElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const elementTop = rect.top + scrollTop;
        
        // Add buffer space above the title so it's clearly visible
        const bufferSpace = 80; // Adjust this value as needed
        
        window.scrollTo({
            top: Math.max(0, elementTop - bufferSpace),
            behavior: 'smooth'
        });
    }
}

// Handle page load navigation
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        setTimeout(() => {
            scrollToSectionTitle(sectionId);
        }, 500);
    }
});

window.addEventListener('load', function() {
    if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        setTimeout(() => {
            scrollToSectionTitle(sectionId);
        }, 200);
    }
});