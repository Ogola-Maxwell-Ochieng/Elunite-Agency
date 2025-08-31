// Policy pages JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize cookie preferences (only on cookie policy page)
    if (window.location.pathname.includes('cookie-policy.html')) {
        initializeCookiePreferences();
    }
    
    // Add scroll-to-top functionality
    addScrollToTop();
    
    // Add copy link functionality
    addCopyLinkFeature();
});

// Back button functionality
function goBack() {
    // Check if there's a history to go back to
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // Fallback to main site
        window.location.href = 'hero-header.html';
    }
}

// Initialize smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for sticky nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Cookie preferences functionality
function initializeCookiePreferences() {
    // Load saved preferences from localStorage
    loadCookiePreferences();
    
    // Add event listeners to checkboxes
    const checkboxes = document.querySelectorAll('.preference-item input[type="checkbox"]:not([disabled])');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Auto-save when preferences change
            saveCookiePreferences();
        });
    });
}

function loadCookiePreferences() {
    const preferences = JSON.parse(localStorage.getItem('cookiePreferences') || '{}');
    
    // Set checkbox states based on saved preferences
    const performanceCheckbox = document.getElementById('performance-cookies');
    const functionalityCheckbox = document.getElementById('functionality-cookies');
    const marketingCheckbox = document.getElementById('marketing-cookies');
    
    if (performanceCheckbox) {
        performanceCheckbox.checked = preferences.performance !== false;
    }
    if (functionalityCheckbox) {
        functionalityCheckbox.checked = preferences.functionality !== false;
    }
    if (marketingCheckbox) {
        marketingCheckbox.checked = preferences.marketing !== false;
    }
}

function saveCookiePreferences() {
    const preferences = {
        essential: true, // Always true, required
        performance: document.getElementById('performance-cookies')?.checked || false,
        functionality: document.getElementById('functionality-cookies')?.checked || false,
        marketing: document.getElementById('marketing-cookies')?.checked || false,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    
    // Show success message
    showNotification('Cookie preferences saved successfully!', 'success');
    
    // Apply preferences (simulate cookie management)
    applyCookiePreferences(preferences);
}

function applyCookiePreferences(preferences) {
    // Simulate applying cookie preferences
    // In a real implementation, this would enable/disable various tracking scripts
    
    if (!preferences.performance) {
        console.log('Performance cookies disabled');
        // Disable Google Analytics, etc.
    }
    
    if (!preferences.functionality) {
        console.log('Functionality cookies disabled');
        // Disable preference storage, etc.
    }
    
    if (!preferences.marketing) {
        console.log('Marketing cookies disabled');
        // Disable Facebook Pixel, marketing trackers, etc.
    }
}

// Add scroll to top functionality
function addScrollToTop() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>';
    scrollToTopBtn.className = 'scroll-to-top-btn';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 3rem;
        height: 3rem;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        display: none;
        align-items: center;
        justify-content: center;
        transition: var(--transition);
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 15px 30px -5px rgba(0, 0, 0, 0.2)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'var(--shadow-lg)';
    });
}

// Add copy link functionality for sections
function addCopyLinkFeature() {
    const headings = document.querySelectorAll('h2, h3');
    
    headings.forEach((heading, index) => {
        // Add ID if it doesn't exist
        if (!heading.id) {
            heading.id = `section-${index}`;
        }
        
        // Add copy link button
        const copyBtn = document.createElement('button');
        copyBtn.innerHTML = '🔗';
        copyBtn.className = 'copy-link-btn';
        copyBtn.title = 'Copy link to this section';
        copyBtn.style.cssText = `
            margin-left: 0.5rem;
            background: none;
            border: none;
            cursor: pointer;
            opacity: 0;
            transition: var(--transition);
            font-size: 0.8rem;
        `;
        
        heading.style.position = 'relative';
        heading.appendChild(copyBtn);
        
        // Show button on hover
        heading.addEventListener('mouseenter', function() {
            copyBtn.style.opacity = '0.7';
        });
        
        heading.addEventListener('mouseleave', function() {
            copyBtn.style.opacity = '0';
        });
        
        // Copy link functionality
        copyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const url = window.location.href.split('#')[0] + '#' + heading.id;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(url).then(() => {
                    showNotification('Link copied to clipboard!', 'success');
                }).catch(() => {
                    fallbackCopyTextToClipboard(url);
                });
            } else {
                fallbackCopyTextToClipboard(url);
            }
        });
    });
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showNotification('Link copied to clipboard!', 'success');
        } else {
            showNotification('Failed to copy link', 'error');
        }
    } catch (err) {
        showNotification('Failed to copy link', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Show notification function
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    const bgColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
    
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('style[data-notification-styles]')) {
        style.setAttribute('data-notification-styles', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Print functionality
function printPage() {
    window.print();
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + P for print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        printPage();
    }
    
    // Escape to go back
    if (e.key === 'Escape') {
        goBack();
    }
});

// Track scroll position for reading progress (optional feature)
function trackReadingProgress() {
    const content = document.querySelector('.policy-content');
    if (!content) return;
    
    let progressBar = document.querySelector('.reading-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--primary);
            z-index: 1001;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }
    
    window.addEventListener('scroll', function() {
        const contentHeight = content.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        const scrollableHeight = contentHeight - windowHeight;
        
        if (scrollableHeight > 0) {
            const progress = Math.min((scrollTop / scrollableHeight) * 100, 100);
            progressBar.style.width = progress + '%';
        }
    });
}

// Initialize reading progress tracker
document.addEventListener('DOMContentLoaded', function() {
    trackReadingProgress();
});

// Export functions for global access
window.goBack = goBack;
window.saveCookiePreferences = saveCookiePreferences;
window.printPage = printPage;