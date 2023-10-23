const submitButton = document.getElementById('submit-button');
const bloodTypeInput = document.getElementById('blood-type');
const userNameInput = document.getElementById('user-name');
const userPhoneInput = document.getElementById('user-phone');
const userLocationInput = document.getElementById('user-location');
const userRadioInputs = document.querySelectorAll('input[name="user-type"]');
const donorsList = document.getElementById('donors');
const requestersList = document.getElementById('requesters');

// Load existing data from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const donors = JSON.parse(localStorage.getItem('donors')) || [];
    const requesters = JSON.parse(localStorage.getItem('requesters')) || [];

    donors.forEach(donor => {
        appendItem(donorsList, donor, 'donor-item');
    });

    requesters.forEach(requester => {
        appendItem(requestersList, requester, 'requester-item');
    });
});

submitButton.addEventListener('click', () => {
    const bloodType = bloodTypeInput.value;
    const userName = userNameInput.value;
    const userPhone = userPhoneInput.value;
    const userLocation = userLocationInput.value;
    const userType = getUserType();

    if (userName && userType) {
        const item = {
            userName,
            bloodType,
            userPhone,
            userLocation,
            userType,
        };

        if (userType === 'donor') {
            appendItem(donorsList, item, 'donor-item');
        } else if (userType === 'requester') {
            appendItem(requestersList, item, 'requester-item');
        }

        // Save data to localStorage
        saveDataToLocalStorage();
        
        // Clear the input fields
        userNameInput.value = '';
        userPhoneInput.value = '';
        userLocationInput.value = '';
    }
});

function appendItem(list, item, className) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${item.userName}</strong> (${item.bloodType}) <br> Phone: ${item.userPhone} <br> Location: ${item.userLocation}`;
    listItem.classList.add(className);
    list.appendChild(listItem);
}

function getUserType() {
    for (const radioInput of userRadioInputs) {
        if (radioInput.checked) {
            return radioInput.value;
        }
    }
    return null;
}

function saveDataToLocalStorage() {
    const donors = Array.from(donorsList.children).map(item => item.textContent);
    const requesters = Array.from(requestersList.children).map(item => item.textContent);

    localStorage.setItem('donors', JSON.stringify(donors));
    localStorage.setItem('requesters', JSON.stringify(requesters));
}
