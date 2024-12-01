document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const navDots = document.querySelectorAll('.nav-line');
    const prevButton = document.querySelector('.prev-arrow');
    const nextButton = document.querySelector('.next-arrow');
    let currentIndex = 0;

    // Make first slide visible initially
    if (slides.length > 0) {
        showSlide(0);
    }

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.opacity = '0';
            slide.style.visibility = 'hidden';
            slide.classList.remove('active');
        });
        
        // Show current slide
        slides[index].style.opacity = '1';
        slides[index].style.visibility = 'visible';
        slides[index].classList.add('active');
        
        // Update nav dots
        navDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }

    // Modified next button click handler
    nextButton.addEventListener('click', () => {
        // If we're at the last slide, go back to first slide
        if (currentIndex === slides.length - 1) {
            showSlide(0);
        } else {
            showSlide(currentIndex + 1);
        }
    });

    // Modified previous button click handler
    prevButton.addEventListener('click', () => {
        // If we're at the first slide, go to last slide
        if (currentIndex === 0) {
            showSlide(slides.length - 1);
        } else {
            showSlide(currentIndex - 1);
        }
    });

    // Navigation dots
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    const toggleButtons = document.querySelectorAll('.pricing-toggle button');
    const prices = document.querySelectorAll('.price');
    const periods = document.querySelectorAll('.period');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Toggle active state
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update prices
            const isYearly = button.textContent.includes('YEARLY');
            
            prices.forEach(price => {
                const monthlyPrice = price.getAttribute('data-monthly');
                const yearlyPrice = price.getAttribute('data-yearly');
                
                if (price.textContent === 'Free') {
                    price.innerHTML = 'Free';
                } else {
                    price.innerHTML = isYearly ? yearlyPrice : monthlyPrice;
                    price.innerHTML += `<span class="period">/${isYearly ? 'month' : 'month'}</span>`;
                    
                    // Add "per user" text for Business plan
                    if (price.closest('.pricing-card').querySelector('h3').textContent === 'Business') {
                        price.querySelector('.period').textContent += ' per user';
                    }
                }
            });
        });
    });
});
