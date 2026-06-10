//main.js

const statusText = document.getElementById("api-status");
const statusDot = document.querySelector(".status-dot");

// Check API status -- For local development, change the URL to your backend endpoint
async function checkApiStatus() {
  try {
    const response = await fetch("/health"); //Change localhost URL to your backend endpoint

    if (response.ok) {
      statusText.textContent = "API Online";
      statusDot.classList.add("online");
    } else {
      throw new Error();
    }
  } catch (error) {
    statusText.textContent = "API Offline";

    statusDot.classList.remove("online");
    statusDot.classList.add("offline");
  }
}

checkApiStatus();


// Current Year
function currentYear(){
  document.getElementById("current-year")
    .textContent = new Date().getFullYear();
}

currentYear();




