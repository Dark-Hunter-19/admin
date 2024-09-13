const url = 'https://ganesh-portfolio-01-default-rtdb.firebaseio.com/Info.json';

// Fetch data from Firebase
fetch(url)
  .then(response => response.json())
  .then(data => {
    insertDataIntoHtml(data); // Insert data into the HTML
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

function insertDataIntoHtml(data) {
  // Insert name and role
  document.querySelector('.name').textContent = data.Name;
  document.querySelector('.name').setAttribute('title', data.Name);
  document.querySelector('.title').textContent = data.Role;

  // Insert email
  const emailLink = document.querySelector('.contact-link[href^="mailto"]');
  emailLink.textContent = data.Email;
  emailLink.setAttribute('href', `mailto:${data.Email}`);

  // Insert phone number
  const phoneLink = document.querySelector('.contact-link[href^="tel"]');
  phoneLink.textContent = data.Phone;
  phoneLink.setAttribute('href', `tel:+${data['Country-Code']} ${data.Phone}`);

  // Insert date of birth
  const birthdayTime = document.querySelector('time[datetime]');
  birthdayTime.textContent = new Date(data.DOB).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  birthdayTime.setAttribute('datetime', data.DOB);

  // Insert location
  document.querySelector('address').textContent = data.Location;

  // Directly fetch and display the profile image
  const profileImageUrl = `https://firebasestorage.googleapis.com/v0/b/ganesh-portfolio-01.appspot.com/o/Profile%2F${encodeURIComponent(data.Profile)}?alt=media`;

  const profileImage = document.querySelector('.avatar-box img');
  profileImage.src = profileImageUrl;
  profileImage.alt = 'Profile Image';

  // Add curved edges to the image
  profileImage.style.borderRadius = '15px'; // Adjust this value for desired roundness
}

console.log(profileImageUrl); // Check the generated image URL
