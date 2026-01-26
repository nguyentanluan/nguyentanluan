// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-list a');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (menuClose) {
        menuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Theme Toggle
    const themeToggle = document.querySelectorAll('.theme-toggle');
    
    themeToggle.forEach(toggle => {
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            const icon = toggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.forEach(toggle => {
            const icon = toggle.querySelector('i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        });
    }
    
    // Add to Cart Button
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart, .btn-add-to-cart-large');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product info
            const productCard = this.closest('.product-card, .portfolio-card');
            const productName = productCard ? productCard.querySelector('.product-name, .portfolio-name').textContent : 'Sản phẩm';
            
            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                let count = parseInt(cartCount.textContent);
                cartCount.textContent = count + 1;
                
                // Add animation to cart icon
                const cartIcon = document.querySelector('.btn-cart');
                if (cartIcon) {
                    cartIcon.classList.add('pulse');
                    setTimeout(() => {
                        cartIcon.classList.remove('pulse');
                    }, 300);
                }
            }
            
            // Show toast notification
            showToast(`"${productName}" đã được thêm vào giỏ hàng!`);
            
            // Save to localStorage
            saveToCart(productName);
        });
    });
    
    // Product Like Button
    const likeButtons = document.querySelectorAll('.product-like, .portfolio-like');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = 'var(--accent-color)';
                showToast('Đã thêm vào yêu thích!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = '';
                showToast('Đã xóa khỏi yêu thích!');
            }
        });
    });
    
    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.masonry-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide portfolio items
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Portfolio Modal
    const portfolioViewButtons = document.querySelectorAll('.portfolio-view');
    const portfolioModal = document.querySelector('.portfolio-modal');
    const portfolioModalClose = document.querySelector('.portfolio-modal-close');
    
    if (portfolioViewButtons.length > 0) {
        portfolioViewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const portfolioCard = this.closest('.portfolio-card');
                const portfolioImage = portfolioCard.querySelector('img').src;
                const portfolioTitle = portfolioCard.querySelector('.portfolio-title, .portfolio-name').textContent;
                const portfolioCategory = portfolioCard.querySelector('.portfolio-category').textContent;
                const currentPrice = portfolioCard.querySelector('.current-price').textContent;
                const originalPrice = portfolioCard.querySelector('.original-price') ? portfolioCard.querySelector('.original-price').textContent : '';
                
                // Set modal content
                document.getElementById('modal-img').src = portfolioImage;
                document.getElementById('modal-title').textContent = portfolioTitle;
                document.getElementById('modal-category').textContent = portfolioCategory;
                document.getElementById('modal-current-price').textContent = currentPrice;
                
                if (originalPrice) {
                    document.getElementById('modal-original-price').textContent = originalPrice;
                    document.getElementById('modal-original-price').style.display = 'inline';
                } else {
                    document.getElementById('modal-original-price').style.display = 'none';
                }
                
                // Show modal
                portfolioModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    }
    
    if (portfolioModalClose) {
        portfolioModalClose.addEventListener('click', () => {
            portfolioModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close modal when clicking outside
    portfolioModal.addEventListener('click', (e) => {
        if (e.target === portfolioModal) {
            portfolioModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Size Selection
    const sizeOptions = document.querySelectorAll('.size-option');
    
    if (sizeOptions.length > 0) {
        sizeOptions.forEach(option => {
            option.addEventListener('click', function() {
                sizeOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Tabs Functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked button and corresponding pane
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Accordion Functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const accordionItem = this.parentElement;
                
                // Toggle active class
                accordionItem.classList.toggle('active');
                
                // Close other accordion items
                accordionHeaders.forEach(otherHeader => {
                    if (otherHeader !== this) {
                        otherHeader.parentElement.classList.remove('active');
                    }
                });
            });
        });
    }
    
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const subjectSelect = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const submitBtn = document.getElementById('submitBtn');
        const formMessage = document.getElementById('formMessage');
        
        // Real-time validation
        nameInput.addEventListener('input', () => validateField(nameInput));
        emailInput.addEventListener('input', () => validateField(emailInput));
        phoneInput.addEventListener('input', () => validateField(phoneInput));
        subjectSelect.addEventListener('change', () => validateField(subjectSelect));
        messageInput.addEventListener('input', () => validateField(messageInput));
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            const isNameValid = validateField(nameInput);
            const isEmailValid = validateField(emailInput);
            const isSubjectValid = validateField(subjectSelect);
            const isMessageValid = validateField(messageInput);
            const isPhoneValid = phoneInput.value ? validateField(phoneInput) : true;
            
            if (isNameValid && isEmailValid && isSubjectValid && isMessageValid && isPhoneValid) {
                // Show loading state
                submitBtn.classList.add('loading');
                
                // Simulate API call
                setTimeout(() => {
                    // Hide loading state
                    submitBtn.classList.remove('loading');
                    
                    // Show success message
                    formMessage.textContent = 'Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.';
                    formMessage.className = 'form-message success';
                    formMessage.style.display = 'block';
                    
                    // Save form data to localStorage
                    const formData = {
                        name: nameInput.value,
                        email: emailInput.value,
                        phone: phoneInput.value || 'N/A',
                        subject: subjectSelect.options[subjectSelect.selectedIndex].text,
                        message: messageInput.value,
                        date: new Date().toISOString()
                    };
                    
                    saveFormData(formData);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset floating labels
                    document.querySelectorAll('.input-group label').forEach(label => {
                        label.style.top = '1rem';
                        label.style.left = '1rem';
                        label.style.fontSize = '1rem';
                        label.style.color = 'var(--gray-color)';
                    });
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                    
                    // Show toast notification
                    showToast('Tin nhắn của bạn đã được gửi thành công!');
                }, 2000);
            } else {
                // Show error message
                formMessage.textContent = 'Vui lòng kiểm tra lại thông tin trong form.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
            }
        });
    }
    
    // Initialize Swiper
    if (document.querySelector('.productsSwiper')) {
        const swiper = new Swiper('.productsSwiper', {
            slidesPerView: 1,
            spaceBetween: 20,
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
                640: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                },
                1200: {
                    slidesPerView: 4,
                },
            },
        });
    }
    
    // Parallax Effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.bg-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Helper Functions
function validateField(field) {
    const errorElement = field.parentElement.querySelector('.input-error');
    let isValid = true;
    let errorMessage = '';
    
    // Reset field styling
    field.parentElement.classList.remove('error');
    
    // Check if field is required and empty
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = 'Trường này là bắt buộc.';
    }
    
    // Email validation
    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value.trim())) {
            isValid = false;
            errorMessage = 'Vui lòng nhập email hợp lệ.';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && field.value.trim()) {
        const phoneRegex = /^[0-9\-\+]{9,15}$/;
        if (!phoneRegex.test(field.value.trim())) {
            isValid = false;
            errorMessage = 'Vui lòng nhập số điện thoại hợp lệ.';
        }
    }
    
    // Display error if any
    if (!isValid) {
        field.parentElement.classList.add('error');
        errorElement.textContent = errorMessage;
    } else {
        errorElement.textContent = '';
    }
    
    return isValid;
}

function showToast(message) {
    const toast = document.querySelector('.toast');
    const toastMessage = toast.querySelector('.toast-message');
    
    // Set message
    toastMessage.textContent = message;
    
    // Show toast
    toast.classList.add('active');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

function saveToCart(productName) {
    // Get existing cart from localStorage or initialize empty array
    let cart = JSON.parse(localStorage.getItem('jacketstore_cart')) || [];
    
    // Add product to cart
    cart.push({
        name: productName,
        addedAt: new Date().toISOString()
    });
    
    // Save back to localStorage
    localStorage.setItem('jacketstore_cart', JSON.stringify(cart));
}

function saveFormData(formData) {
    // Get existing form submissions from localStorage or initialize empty array
    let formSubmissions = JSON.parse(localStorage.getItem('jacketstore_contact_submissions')) || [];
    
    // Add new form submission
    formSubmissions.push(formData);
    
    // Save back to localStorage (limit to last 50 submissions)
    if (formSubmissions.length > 50) {
        formSubmissions = formSubmissions.slice(-50);
    }
    
    localStorage.setItem('jacketstore_contact_submissions', JSON.stringify(formSubmissions));
}

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    .pulse {
        animation: pulse 0.3s ease-in-out;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);