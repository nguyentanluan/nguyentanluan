// Main JavaScript File for ArtSpace Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) - Bài 3
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        disable: 'mobile'
    });
    
    // Initialize Swiper (Testimonial Slider) - Bài 5
    if (document.querySelector('.testimonial-slider')) {
        const testimonialSwiper = new Swiper('.testimonial-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                }
            }
        });
    }
    
    // Mobile Menu Toggle - Bài 1
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Sticky Header on Scroll - Bài 1
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Active Menu Highlight based on current page - Bài 1
    function highlightActiveMenu() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const menuItems = document.querySelectorAll('.nav-menu a');
        
        menuItems.forEach(item => {
            const itemHref = item.getAttribute('href');
            // Remove active class from all items
            item.classList.remove('active');
            
            // Check if this link matches current page
            if (itemHref === currentPage || 
                (currentPage === '' && itemHref === 'index.html') ||
                (currentPage === 'index.html' && itemHref === '')) {
                item.classList.add('active');
            }
        });
    }
    
    highlightActiveMenu();
    
    // 3D Card Hover Effect - Bài 2
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = this.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const rotateY = (mouseX / cardRect.width) * 10;
            const rotateX = -(mouseY / cardRect.height) * 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
        });
    });
    
    // CTA Button Animation - Bài 2
    const ctaButtons = document.querySelectorAll('.btn-cta, .btn-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple effect CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Stats Counter Animation - Bài 2
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current).toLocaleString();
            }, 20);
        });
    }
    
    // Trigger stats animation when in viewport
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => observer.observe(stat));
    }
    
    // Parallax Effect - Bài 3
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxBg = document.querySelector('.parallax-bg');
        
        if (parallaxBg) {
            parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Reveal pricing table on scroll - Bài 3
        const comparisonTable = document.querySelector('.comparison-table');
        if (comparisonTable) {
            const tablePosition = comparisonTable.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (tablePosition < screenPosition) {
                comparisonTable.classList.add('revealed');
            }
        }
        
        // Reveal elements on scroll
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    });
    
    // Form Submission with Validation - Bài 4
    const contactForm = document.getElementById('contactForm');
    const homeSignupForm = document.getElementById('homeSignupForm');
    
    // Home signup form
    if (homeSignupForm) {
        homeSignupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('#homeEmail');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Show loading
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Save to localStorage - Bài 4
                    const signups = JSON.parse(localStorage.getItem('artspace_signups') || '[]');
                    signups.push({
                        email: email,
                        date: new Date().toISOString(),
                        source: 'homepage'
                    });
                    localStorage.setItem('artspace_signups', JSON.stringify(signups));
                    
                    // Show success
                    showToast('Đăng ký dùng thử thành công!', 'success');
                    
                    // Reset form
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    emailInput.value = '';
                    
                    // Redirect to signup modal or page
                    setTimeout(() => {
                        if (document.getElementById('signupModal')) {
                            document.getElementById('signupModal').style.display = 'flex';
                        }
                    }, 1000);
                }, 1500);
            } else {
                showToast('Vui lòng nhập địa chỉ email hợp lệ', 'error');
                emailInput.focus();
            }
        });
    }
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all required fields
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showFieldError(field, 'Trường này là bắt buộc');
                } else {
                    clearFieldError(field);
                    
                    // Email validation
                    if (field.type === 'email' && !validateEmail(field.value)) {
                        isValid = false;
                        showFieldError(field, 'Vui lòng nhập email hợp lệ');
                    }
                }
            });
            
            if (isValid) {
                // Show loading
                const submitBtn = this.querySelector('#submitBtn');
                submitBtn.classList.add('loading');
                
                // Get form data
                const formData = {
                    firstName: document.getElementById('firstName')?.value,
                    email: document.getElementById('email')?.value,
                    subject: document.getElementById('subject')?.value,
                    inquiryType: document.getElementById('inquiryType')?.value,
                    message: document.getElementById('message')?.value,
                    newsletter: document.getElementById('newsletter')?.checked,
                    timestamp: new Date().toISOString()
                };
                
                // Save to localStorage - Bài 4
                const contacts = JSON.parse(localStorage.getItem('artspace_contacts') || '[]');
                contacts.push(formData);
                localStorage.setItem('artspace_contacts', JSON.stringify(contacts));
                
                // Simulate API call
                setTimeout(() => {
                    // Hide loading
                    submitBtn.classList.remove('loading');
                    
                    // Show success message
                    document.getElementById('formSuccess').style.display = 'flex';
                    
                    // Show toast
                    showToast('Tin nhắn của bạn đã được gửi thành công!', 'success');
                    
                    // Reset form after 3 seconds
                    setTimeout(() => {
                        contactForm.reset();
                        document.getElementById('formSuccess').style.display = 'none';
                    }, 3000);
                }, 2000);
            }
        });
        
        // Real-time validation - Bài 4
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    showFieldError(this, 'Trường này là bắt buộc');
                } else if (this.type === 'email' && this.value && !validateEmail(this.value)) {
                    showFieldError(this, 'Vui lòng nhập email hợp lệ');
                } else {
                    clearFieldError(this);
                }
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
    
    // Modal functionality - Bài 5
    const videoModal = document.getElementById('videoModal');
    const signupModal = document.getElementById('signupModal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const videoTriggers = document.querySelectorAll('.video-trigger');
    const signupTriggers = document.querySelectorAll('#ctaSignupBtn');
    
    // Video modal
    if (videoModal) {
        videoTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                videoModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
    }
    
    // Signup modal
    if (signupModal) {
        signupTriggers.forEach(trigger => {
            if (trigger) {
                trigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    signupModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                });
            }
        });
        
        // Signup form in modal
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('signupName').value;
                const email = document.getElementById('signupEmail').value;
                const password = document.getElementById('signupPassword').value;
                
                if (name && validateEmail(email) && password.length >= 8) {
                    // Save to localStorage
                    const accounts = JSON.parse(localStorage.getItem('artspace_accounts') || '[]');
                    accounts.push({
                        name: name,
                        email: email,
                        created: new Date().toISOString()
                    });
                    localStorage.setItem('artspace_accounts', JSON.stringify(accounts));
                    
                    showToast('Tạo tài khoản thành công!', 'success');
                    signupModal.style.display = 'none';
                    document.body.style.overflow = '';
                    
                    // Redirect to dashboard or home
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                } else {
                    showToast('Vui lòng điền đầy đủ thông tin. Mật khẩu phải có ít nhất 8 ký tự.', 'error');
                }
            });
        }
    }
    
    // Close modals
    modalCloseButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.video-modal, .signup-modal').style.display = 'none';
            document.body.style.overflow = '';
        });
    });
    
    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.closest('.video-modal, .signup-modal').style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.video-modal, .signup-modal');
            modals.forEach(modal => {
                if (modal.style.display === 'flex') {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
        }
    });
    
    // Helper Functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showFieldError(field, message) {
        field.closest('.form-group').classList.add('error');
        const errorElement = document.getElementById(field.id + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    function clearFieldError(field) {
        field.closest('.form-group').classList.remove('error');
        const errorElement = document.getElementById(field.id + 'Error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
    
    // Toast notification function - Bài 4
    window.showToast = function(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 5000);
        
        // Close button
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', function() {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        });
    };
    
    // Demo toast on page load
    setTimeout(() => {
        if (!localStorage.getItem('artspace_welcome_shown')) {
            showToast('Chào mừng đến với ArtSpace! Khám phá các tính năng của chúng tôi.', 'success');
            localStorage.setItem('artspace_welcome_shown', 'true');
        }
    }, 1000);
});