document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('applicationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const cvInput = document.getElementById('cv');
    const commentsInput = document.getElementById('comments');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const cvError = document.getElementById('cvError');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let isValid = true;

        // Reset error messages
        nameError.textContent = '';
        emailError.textContent = '';
        // cvError.textContent = '';

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
            // Disable the submit button
            submitButton.disabled = true;
            submitButton.textContent = 'Opening Gmail...';

            const subject = encodeURIComponent('Application to Zenthira');
            const body = encodeURIComponent(
                `Name: ${nameInput.value}\nEmail: ${emailInput.value}\nComments: ${commentsInput.value}\n\n(Please attach your CV manually)`
            );

            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=careers@zenthira.com&su=${subject}&body=${body}`;

            // Open Gmail in a new tab
            window.open(gmailUrl, '_blank');

            // Optionally reset button after delay
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Submit Application';
            }, 5000);
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});