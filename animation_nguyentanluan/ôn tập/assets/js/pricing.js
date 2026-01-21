// Pricing Page JavaScript for ArtSpace
document.addEventListener('DOMContentLoaded', function() {
    // Billing Toggle - Bài 5
    const billingToggle = document.getElementById('billingToggle');
    const monthlyPrices = document.querySelectorAll('.amount.monthly');
    const yearlyPrices = document.querySelectorAll('.amount.yearly');
    
    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            const isYearly = this.checked;
            
            // Toggle prices visibility
            monthlyPrices.forEach(price => {
                price.style.display = isYearly ? 'none' : 'inline';
            });
            
            yearlyPrices.forEach(price => {
                price.style.display = isYearly ? 'inline' : 'none';
            });
            
            // Save preference to localStorage - Bài 4
            localStorage.setItem('artspace_billing', isYearly ? 'yearly' : 'monthly');
            
            // Show toast
            showToast(`Đã chuyển sang thanh toán ${isYearly ? 'hàng năm' : 'hàng tháng'}`, 'success');
        });
        
        // Load saved preference
        const savedBilling = localStorage.getItem('artspace_billing');
        if (savedBilling === 'yearly') {
            billingToggle.checked = true;
            billingToggle.dispatchEvent(new Event('change'));
        }
    }
    
    // FAQ Accordion - Bài 5
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
        });
    });
    
    // Plan selection
    const planButtons = document.querySelectorAll('.plan-footer .btn');
    
    planButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const planCard = this.closest('.pricing-card');
            const planName = planCard.querySelector('.plan-name').textContent;
            const planPrice = planCard.querySelector('.amount:not([style*="display: none"])').textContent;
            
            // Save selected plan to localStorage - Bài 4
            localStorage.setItem('artspace_selected_plan', JSON.stringify({
                name: planName,
                price: planPrice,
                date: new Date().toISOString()
            }));
            
            // Show confirmation
            showToast(`Đã chọn gói ${planName}`, 'success');
            
            // Redirect to contact page
            setTimeout(() => {
                window.location.href = 'contact.html';
            }, 1500);
        });
    });
    
    // Pricing card hover effects
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        // Add pulse animation to featured card
        if (card.classList.contains('featured')) {
            card.style.animation = 'featuredPulse 2s infinite';
        }
        
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-10px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
            } else {
                this.style.transform = 'scale(1.05)';
            }
        });
    });
    
    // Add CSS for featured card pulse
    const style = document.createElement('style');
    style.textContent = `
        @keyframes featuredPulse {
            0% { box-shadow: 0 10px 30px rgba(138, 43, 226, 0.2); }
            50% { box-shadow: 0 15px 40px rgba(138, 43, 226, 0.3); }
            100% { box-shadow: 0 10px 30px rgba(138, 43, 226, 0.2); }
        }
    `;
    document.head.appendChild(style);
});