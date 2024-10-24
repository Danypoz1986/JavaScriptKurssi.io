function checkForm(event){
    event.preventDefault();

    const form = event.target;

    const mail = form.elements['email'];
    const comment = form.elements['comment'];

    if (mail.value === '' || comment.value === ''){
        alert('Please fill in both the email and comment fields.');

        // Correctly clear the values of the input fields
        mail.value = '';
        comment.value = '';
        
        return false;
    }

    if (mail.value.length < 6 || mail.value.length > 15){
        alert('Email address must be at least 6 characters and less than 15 characters long.')
        mail.value = ''
        comment.value = ''
        return false;
    }

    if (!mail.value.includes('@')){
        alert('Email address must contain @')
        mail.value = ''
        comment.value = ''
        return false
    }

    if (comment.value.length > 50) {
        comment.value = comment.value.substring(0, 50);
    }

    
        alert(`Email: ${mail.value}\nComment: ${comment.value}`)
        mail.value = '';
        comment.value = '';
    
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('theForm');
    const typeSelect = document.getElementById('type');
    const yearsInput = document.getElementById('years');
    const costInput = document.getElementById('cost');
    const messageParagraph = document.createElement('p')
    messageParagraph.setAttribute('id', 'discountMessage');
    messageParagraph.style.display = 'inline-block';
    messageParagraph.style.margin = '0';
    messageParagraph.style.position = 'absolute';
    messageParagraph.style.marginLeft = '20px';

    yearsInput.parentNode.insertBefore(messageParagraph, yearsInput.nextSibling);

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const membershipType = typeSelect.value;
        const years = parseInt(yearsInput.value);
        let costPerYear;

        // Determine cost per year based on membership type
        switch (membershipType) {
            case 'basic':
                costPerYear = 10;
                break;
            case 'premium':
                costPerYear = 15;
                break;
            case 'gold':
                costPerYear = 20;
                break;
            case 'platinum':
                costPerYear = 25;
                break;
            default:
                costPerYear = 0;
                break;
        }

        let totalCost = costPerYear * years;

        // Apply 20% discount if enrolling for more than 2 years
        if (years > 2) {
            totalCost *= 0.8; // Apply 20% discount
            messageParagraph.textContent = 'You qualify for a 20% discount!';
        }

        costInput.value = `€${totalCost.toFixed(2)}`;

        
    });
});

function contactMethod(event){
    
    event.preventDefault();

    var checkBoxes = document.querySelectorAll('input[name="contact"]');

    checkBoxes.forEach((checkbox) => {
    var fieldId = checkbox.value + '-field'; 
    var field = document.getElementById(fieldId);
    
    if (checkbox.checked) {
        field.style.display = 'block';
    } else {
        field.style.display = 'none';
    }

    })
    
}
window.onload = function() {
    document.getElementById('contact-form').reset();
};

