const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const userInput = document.getElementById('userInp');
const locateMeButton = document.getElementById('locateMeBtn');

locateMeButton.addEventListener('click', ((e) => {
    e.preventDefault()
    function getUserLocation() {
        navigator.geolocation.getCurrentPosition(
            position => {
                if (position.coords) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    getReverseGeocodingData(latitude, longitude);
                }
            },
            error => {
                console.error('Error getting user location:', error.message);
                messageThree.textContent = 'Error getting user location';
            }
        );
    }
    getUserLocation();
            function getReverseGeocodingData(lat, lon) {
                const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
                fetch(url).then(response => response.json()).then(data => {
                        if (data.address.city) {
                            const address = data.address.city
                            fetch(`/weather?address=${address}`).then((response) => {
                                response.json().then((data) => {
                                    if (data.error) {
                                        messageOne.textContent = data.error
                                    }
                                    messageOne.textContent = data.location
                                    messageTwo.textContent = data.forecastData
                                })
                            })
                        } else {
                            console.error('Reverse Geocoding failed.');
                            messageThree.textContent = 'Error retrieving location';
                        }
                    })
                    .catch(error => {
                        console.error('Error during reverse geocoding:', error);
                        messageThree.textContent = 'Error retrieving location';
                    });
            }
}))

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecastData
        })
    })
})