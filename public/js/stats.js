

async function loadStats() {
  try {
    const response = 
      await fetch("/startups"); //For local development, change the URL to your backend endpoint

    const startups = await response.json();
    console.log(startups);
    console.log(Array.isArray(startups));

    const industries = new Set();
    const cities = new Set();

    startups.forEach(startup => {
      if (startup.industry) {
        industries.add(startup.industry);
      }

      if (startup.location?.city) {
        cities.add(startup.location.city);
      }
    });

    document.getElementById("startup-count")
      .textContent = startups.length;

    document.getElementById("industry-count").textContent = industries.size;

    document.getElementById("city-count").textContent = cities.size;

  } catch (error) {
    console.error(error);
  }
}

function animateValue(id, endValue) {
  const element = document.getElementById(id);
  let current = 0;
  const increment = Math.ceil(endValue / 60); // Adjust the divisor to control animation speed
  
  const timer = setInterval(() => {
    current += increment;

    if (current >= endValue) {
      current = endValue;
      clearInterval(timer);
    }

    element.textContent = current;
  }, 25);
}

loadStats().then((startups, industries, cities) => {
  animateValue("startup-count", startups.length);
  animateValue("industry-count", industries.size);
  animateValue("city-count", cities.size);
});



