// Contact Page JavaScript for ArtSpace
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion - Bài 5
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-question');
        
        header.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Load saved data if available
    const savedPlan = localStorage.getItem('artspace_selected_plan');
    if (savedPlan) {
        try {
            const plan = JSON.parse(savedPlan);
            const inquiryType = document.getElementById('inquiryType');
            if (inquiryType && plan.name) {
                // Pre-select sales inquiry if coming from pricing page
                inquiryType.value = 'sales';
                
                // Add note about selected plan
                const messageField = document.getElementById('message');
                if (messageField) {
                    const currentMessage = messageField.value;
                    messageField.value = currentMessage + `\n\nTôi quan tâm đến gói ${plan.name} (${plan.price}/tháng).`;
                }
            }
        } catch (e) {
            console.error('Error parsing saved plan:', e);
        }
    }
    
    // Map interaction
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', function() {
            showToast('Đang mở chỉ đường...', 'info');
            // In a real app, this would open Google Maps
        });
    }
    
    // Artist type detection for better personalization
    const inquiryTypeSelect = document.getElementById('inquiryType');
    if (inquiryTypeSelect) {
        inquiryTypeSelect.addEventListener('change', function() {
            const messageField = document.getElementById('message');
            if (messageField && messageField.value === '') {
                const inquiryType = this.value;
                let defaultMessage = '';
                
                switch(inquiryType) {
                    case 'general':
                        defaultMessage = 'Xin chào ArtSpace,\n\nTôi muốn tìm hiểu thêm về nền tảng của bạn.';
                        break;
                    case 'support':
                        defaultMessage = 'Xin chào bộ phận hỗ trợ,\n\nTôi cần hỗ trợ về:';
                        break;
                    case 'sales':
                        defaultMessage = 'Xin chào bộ phận tư vấn,\n\nTôi quan tâm đến việc sử dụng ArtSpace cho công việc sáng tạo của mình.';
                        break;
                }
                
                if (defaultMessage) {
                    messageField.value = defaultMessage;
                    messageField.dispatchEvent(new Event('input'));
                }
            }
        });
    }
});