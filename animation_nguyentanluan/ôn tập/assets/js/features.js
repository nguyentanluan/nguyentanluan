// Features Page JavaScript for ArtSpace
document.addEventListener('DOMContentLoaded', function() {
    // Tab Functionality - Bài 5
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons and panes
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding tab pane
                const tabId = this.getAttribute('data-tab');
                const tabPane = document.getElementById(tabId);
                if (tabPane) {
                    tabPane.classList.add('active');
                    
                    // Trigger AOS refresh for new content
                    AOS.refresh();
                }
            });
        });
    }
    
    // FAQ Accordion - Bài 5
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            // Close all other accordion items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Feature cards animation
    const featureDetailed = document.querySelectorAll('.feature-detailed');
    
    featureDetailed.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.fd-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.color = 'var(--secondary)';
        });
        
        feature.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.fd-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.color = '';
        });
    });
    
    // Color palette animation
    const colorPalettes = document.querySelectorAll('.color-palette');
    
    colorPalettes.forEach(palette => {
        const colors = palette.querySelectorAll('.color');
        colors.forEach((color, index) => {
            color.style.animationDelay = `${index * 0.1}s`;
            color.classList.add('pulse');
        });
    });
    
    // Add CSS for color pulse
    const style = document.createElement('style');
    style.textContent = `
        .color.pulse {
            animation: colorPulse 2s infinite;
        }
        
        @keyframes colorPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
});