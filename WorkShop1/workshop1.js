document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-button');
    const clearButton = document.getElementById('clear-button');
    const activityList = document.getElementById('activity-list');
    const totalHours = document.getElementById('total-hours');
    let activities = JSON.parse(localStorage.getItem('activities')) || [];

    resetFormFields();

    function updateSummary() {
        activityList.innerHTML = '';
        let total = 0;
        let categories = { 'Työ': 0, 'Opiskelu': 0, 'Treenit': 0, 'Vapaa-aika': 0, 'Muu': 0 };

        activities.forEach(activity => {
            const li = document.createElement('li');
            li.textContent = `${activity.description} (${activity.hours} tuntia) - ${activity.category}`;
            activityList.appendChild(li);
            total += parseFloat(activity.hours);
            categories[activity.category] += parseFloat(activity.hours);
        });

        totalHours.textContent = `Yhteensä: ${total.toFixed(1)} tuntia`;
    }

    addButton.addEventListener('click', function () {
        const activity = document.getElementById('activity').value;
        const description = document.getElementById('description').value;
        const hours = document.getElementById('hours').value;

        if (!activity) {
            showErrorMessage('Lisää aktiviteetti.', 'red');
            return;
        }
        if (!description && hours) {
            showErrorMessage('Kuvaus puuttuu.', 'red');
            return;
        }
        if (!hours) {
            showErrorMessage('Syötä kelvollinen tuntimäärä.', 'red');
            return;
        }

        let totalHoursUsed = activities.reduce((sum, activity) => sum + parseFloat(activity.hours), 0);

        if (!isNaN(hours) && parseFloat(hours) >= 0) {
            if (totalHoursUsed + parseFloat(hours) > 168) {
                showErrorMessage('Virhe: Yhteensä yli 168 tuntia! Viikossa on vain 168 tuntia. Tarkista syöttämäsi tuntimäärä.', 'red');
            } else {
                activities.push({ category: activity, description: description, hours: parseFloat(hours) });
                localStorage.setItem('activities', JSON.stringify(activities));
                updateSummary();
                resetFormFields();
                showErrorMessage('Aktiviteetti lisätty onnistuneesti!', 'green');
            }
        } else {
            showErrorMessage('Syötä kelvollinen tuntimäärä.', 'orange');
            resetFormFields();
        }
    });

    clearButton.addEventListener('click', function () {
        if (confirm('Haluatko varmasti tyhjentää kaikki merkinnät?')) {
            activities = [];
            localStorage.removeItem('activities');
            updateSummary();
            resetFormFields();
            showErrorMessage('Kaikki merkinnät on tyhjennetty.', 'blue');
        }
    });

    function resetFormFields() {
            document.getElementById('activity').selectedIndex = 0; 
            document.getElementById('description').value = '';
            document.getElementById('hours').value = '';
            console.log('Kentät tyhjennetty');
    }

    function showErrorMessage(message, color) {
        const errorContainer = document.createElement('div');
        errorContainer.textContent = message;
        errorContainer.style.backgroundColor = color;
        errorContainer.style.color = 'white';
        errorContainer.style.padding = '10px';
        errorContainer.style.margin = '10px 0';
        errorContainer.style.textAlign = 'center';
        document.body.prepend(errorContainer);

        setTimeout(() => {
            errorContainer.remove();
        }, 3000);
    }

    updateSummary();
});
