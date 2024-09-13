
const firebaseUrl = "https://ganesh-portfolio-01-default-rtdb.firebaseio.com/Interests.json";

let interests = {};

fetch(firebaseUrl)
  .then(response => response.json())
  .then(data => {
    interests = data;
    const serviceList = document.querySelector(".service-list"); // Get the UL

    // Loop through the interests and create an LI for each one
    for (let key in interests) {
      const interest = interests[key];

      // Create LI element
      const li = document.createElement("li");
      li.className = "service-item";

      // Create the service-icon-box div with the image
      const iconBoxDiv = document.createElement("div");
      iconBoxDiv.className = "service-icon-box";

      // Generate the Firebase Storage URL for the image
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/ganesh-portfolio-01.appspot.com/o/interests%2F${encodeURIComponent(interest.Image)}?alt=media`;

      const img = document.createElement("img");
      img.src = imageUrl; // Fetch image from Firebase Storage
      img.alt = interest.Title + " icon";
      img.width = 40;
      iconBoxDiv.appendChild(img);

      // Create the service-content-box div with title and message
      const contentBoxDiv = document.createElement("div");
      contentBoxDiv.className = "service-content-box";
      const h4 = document.createElement("h4");
      h4.className = "h4 service-item-title";
      h4.textContent = interest.Title;
      const p = document.createElement("p");
      p.className = "service-item-text";
      p.textContent = interest.Message;

      // Append title and message to content box
      contentBoxDiv.appendChild(h4);
      contentBoxDiv.appendChild(p);

      // Append icon box and content box to the LI
      li.appendChild(iconBoxDiv);
      li.appendChild(contentBoxDiv);

      // Append the LI to the UL
      serviceList.appendChild(li);
    }
  })
  .catch(error => {
    console.error("Error fetching data from Firebase:", error);
  });
