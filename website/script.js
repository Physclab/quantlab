document.addEventListener('DOMContentLoaded', () => {

    // --- State & Language Support ---
    let currentLang = 'en'; // default
    const langToggleBtn = document.getElementById('langToggle');

    const uiTextMap = {
        en: {
            sending: "Sending...",
            success: "Thank you! Your message has been sent. We will contact you soon.",
            error: "Oops! There was a problem submitting your form.",
            networkError: "Oops! Network error or Formspree is not configured completely."
        },
        es: {
            sending: "Enviando...",
            success: "¡Gracias! Tu mensaje ha sido enviado. Te contactaremos pronto.",
            error: "¡Ups! Ocurrió un problema enviando el formulario.",
            networkError: "¡Ups! Error de red."
        }
    };

    function updateLanguage() {
        const elements = document.querySelectorAll('.translatable');
        elements.forEach(el => {
            const translation = el.getAttribute(`data-${currentLang}`);
            if (translation) {
                el.innerHTML = translation; // Using innerHTML to support <br> and <span> tags
            }
        });

        const placeholders = document.querySelectorAll('.translatable-placeholder');
        placeholders.forEach(el => {
            const translation = el.getAttribute(`data-${currentLang}`);
            if (translation) {
                el.setAttribute('placeholder', translation);
            }
        });

        // Update button visual
        if (currentLang === 'en') {
            langToggleBtn.textContent = 'ES'; // show toggle to ES
        } else {
            langToggleBtn.textContent = 'EN'; // show toggle to EN
        }

        // Re-render review UI in case language changed
        updateReviewUI();
    }

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'es' : 'en';
            updateLanguage();
        });
    }


    // --- Data: Reviews provided by user ---
    const reviewsData = [
        {
            author: "Loul Almonte",
            textEn: "Ask for Ramon or Flaco - Friendly, honest, reliable, affordable and fast service, I try to go to other mechanics to shop for price/service and at the end I have to come back to Nuñez Auto Inc - for my experience they are one of the best in the Bronx. Note: I been coming here for more than 20 years now, looks like they will be my mechanic by the end of days.",
            textEs: "Pregunte por Ramón o Flaco - Servicio amable, honesto, confiable, económico y rápido. He ido a otros mecánicos buscando precio y servicio, pero al final siempre vuelvo. Por mi experiencia, son de los mejores del Bronx. Llevo viniendo más de 20 años y parece que serán mis mecánicos hasta el final."
        },
        {
            author: "Ernesto J Bravo",
            textEn: "Great Shop Friendly Reliable Trustworthy not many places like this one in NYC. Honest Service with a smile.",
            textEs: "Gran taller, amables, confiables y fiables, no hay muchos lugares como este en NYC. Servicio honesto con una sonrisa."
        },
        {
            author: "Huguette S",
            textEn: "Great place to get quick work done. I left my car with them in the morning to get an oil change, change all my brake pads, and work on the front rotors. The work was completed within a few hours and everything came out to under $500. It’s been two months since my work was done and everything is working great!",
            textEs: "Excelente lugar para un trabajo rápido. Dejé mi carro por la mañana para un cambio de aceite, de pastillas de freno y para arreglar los rotores. El trabajo se completó en pocas horas y todo costó menos de $500. Han pasado dos meses y ¡todo funciona de maravilla!"
        },
        {
            author: "Keith Delaney",
            textEn: "Ramon and Flacco and his crew do a good job and the prices are fair. Never had a problem with them. They have like 7 lifts so they can deal with customers efficiently. And the other customers I sent there were all happy too.",
            textEs: "Ramón, Flaco y su equipo hacen un buen trabajo a precios justos. Nunca he tenido problemas con ellos. Tienen 7 elevadores, por lo que atienden rápido. Los clientes que he recomendado también están muy contentos."
        },
        {
            author: "Pedro Albizu",
            textEn: "Best professional, honest mechanics I've ever dealt with. Family oriented environment. Great customer service. Ask for Ramon he will point you in the right direction.",
            textEs: "Los mejores y más honestos mecánicos profesionales que he conocido. Ambiente familiar. Excelente atención al cliente. Pregunte por Ramón, él los guiará en la dirección correcta."
        },
        {
            author: "Fahim Ali",
            textEn: "Best place for an oil change in the Bronx Affordable, quick and friendly team It was $30 when i brought my own oil and filter The owner and his guys are super friendly and nice.",
            textEs: "El mejor lugar del Bronx para un cambio de aceite. Económico, rápido y amigable. Me costó $30 cuando llevé mi propio aceite y filtro. El dueño y su equipo son muy amables y agradables."
        }
    ];

    // --- Reviews Slider Logic ---
    let currentReviewIndex = 0;
    const reviewDisplay = document.getElementById('review-display');
    const dotsContainer = document.getElementById('slider-dots');

    // Generate dots
    reviewsData.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToReview(index);
            resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateReviewUI() {
        if (!reviewDisplay) return;
        const review = reviewsData[currentReviewIndex];

        // Retrigger animation
        reviewDisplay.style.animation = 'none';
        reviewDisplay.offsetHeight; // Trigger reflow
        reviewDisplay.style.animation = null;

        // Update content based on language
        const textKey = currentLang === 'es' ? 'textEs' : 'textEn';
        reviewDisplay.querySelector('.review-text').textContent = `"${review[textKey]}"`;
        reviewDisplay.querySelector('.review-author span').textContent = review.author;

        // Update dots
        if (dots.length > 0) {
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentReviewIndex]) dots[currentReviewIndex].classList.add('active');
        }
    }

    function rotateReviews() {
        currentReviewIndex = (currentReviewIndex + 1) % reviewsData.length;
        updateReviewUI();
    }

    function goToReview(index) {
        currentReviewIndex = index;
        updateReviewUI();
    }

    // Initialize first review
    updateReviewUI();

    // Auto rotate every 6 seconds (6000ms)
    let autoSlideInterval = setInterval(rotateReviews, 6000);

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(rotateReviews, 6000);
    }


    // --- Form Submission Handling ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const actionTarget = contactForm.getAttribute('action');

            // Feedback UI
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnHtml = submitBtn.innerHTML;

            // Set sending text and attributes based on language
            submitBtn.textContent = uiTextMap[currentLang].sending;
            submitBtn.disabled = true;

            try {
                const response = await fetch(actionTarget, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success
                    contactForm.reset();
                    formStatus.textContent = uiTextMap[currentLang].success;
                    formStatus.className = "form-status success";
                } else {
                    // Error
                    formStatus.textContent = uiTextMap[currentLang].error;
                    formStatus.className = "form-status error";
                }
            } catch (error) {
                // Network Error
                formStatus.textContent = uiTextMap[currentLang].networkError;
                formStatus.className = "form-status error";
            } finally {
                // Restore button HTML to keep spans from being wiped
                submitBtn.innerHTML = originalBtnHtml;
                submitBtn.disabled = false;

                // Clear status after 5s
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
                formStatus.style.display = 'block';
            }
        });
    }
});
