
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('applicationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const cvInput = document.getElementById('cv');
    const commentsInput = document.getElementById('comments');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const submitButton = form.querySelector('button[type="submit"]');

    // Helper: Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Helper: Device detection
    function isMobileOrTablet() {
        return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop|Tablet/i.test(navigator.userAgent);
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let isValid = true;

        // Clear previous errors
        nameError.textContent = '';
        emailError.textContent = '';


        // Validate name
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            isValid = false;
        }

        // Validate email
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            emailError.textContent = 'Invalid email format';
            isValid = false;
        }

        if (isValid) {
            // Disable button
            submitButton.disabled = true;
            submitButton.textContent = 'Opening Gmail...';

            // Prepare Gmail URL
            const subject = encodeURIComponent('Application to Zenthira');
            const body = encodeURIComponent(
                `Name: ${nameInput.value}\nEmail: ${emailInput.value}\nComments: ${commentsInput.value}\n\n(Please attach your CV manually)`
            );
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=careers@zenthira.com&su=${subject}&body=${body}`;
            const mailtoUrl = `mailto:careers@zenthira.com?subject=${subject}&body=${body}`;
            // Redirect based on device
            if (isMobileOrTablet()) {
                window.location.href = mailtoUrl; // Open in same tab
            } else {
                window.open(gmailUrl, '_blank'); // Open in new tab
            }

            // Reset button after a short delay
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Submit Application';
            }, 5000);
        }
    });
});

