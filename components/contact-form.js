document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const fullname = event.target.fullname.value;
    const email = event.target.email.value;
    const number = event.target.number.value;
    const subject = event.target.subject.value;
    const message = event.target.message.value;

    // Prepare new response data
    const newResponse = {
        Name: fullname,
        Email: email,
        Phone: number,
        Subject: subject,
        Message: message
    };

    // Firebase Realtime Database endpoint
    const databaseURL = "https://ganesh-portfolio-01-default-rtdb.firebaseio.com/Response.json";

    // Fetch the existing data to determine the next key
    fetch(databaseURL)
        .then(response => response.json())
        .then(data => {
            let newResponseKey;
            if (data === null) {
                // If there's no data yet, start with 'r1'
                newResponseKey = 'r1';
            } else {
                // Get an array of keys and calculate the next response key
                const responseKeys = Object.keys(data);
                const lastResponseKey = responseKeys[responseKeys.length - 1];
                newResponseKey = 'r' + (parseInt(lastResponseKey.slice(1)) + 1);
            }

            // Log the new response key
            alert('New response key will be: ' + newResponseKey);

            // URL to insert the new response
            const insertURL = `https://ganesh-portfolio-01-default-rtdb.firebaseio.com/Response/${newResponseKey}.json`;

            // Insert new response data
            return fetch(insertURL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newResponse)
            });
        })
        .then(() => {
            // Success message
            alert('Message sent successfully!');
            event.target.reset(); // Reset the form fields
        })
        .catch((error) => {
            // Handle errors
            console.error('Error inserting message: ', error);
            alert('Error inserting message. Please check the console for details.');
        });
});
