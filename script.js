//your JS code here. If required.
//your JS code here. If required.
// Function to set a cookie with a given name, value, and expiration days
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie by name
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Function to apply font size and color from cookies or defaults
function applyPreferences() {
  const fontsize = getCookie("fontsize") || "16";
  const fontcolor = getCookie("fontcolor") || "#000000";

  // Update CSS variables
  document.documentElement.style.setProperty("--fontsize", fontsize + "px");
  document.documentElement.style.setProperty("--fontcolor", fontcolor);

  // Update form inputs to reflect applied values
  document.getElementById("fontsize").value = fontsize;
  document.getElementById("fontcolor").value = fontcolor;
}

// Run on page load to apply saved preferences
window.onload = function () {
  applyPreferences();

  // Handle form submission
  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from reloading the page

    // Get user inputs
    const fontsize = document.getElementById("fontsize").value;
    const fontcolor = document.getElementById("fontcolor").value;

    // Save preferences to cookies
    setCookie("fontsize", fontsize, 30); // Expires in 30 days
    setCookie("fontcolor", fontcolor, 30);

    // Apply preferences immediately
    document.documentElement.style.setProperty("--fontsize", fontsize + "px");
    document.documentElement.style.setProperty("--fontcolor", fontcolor);
  });
};