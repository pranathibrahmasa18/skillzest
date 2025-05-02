document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const userType = document.querySelector('input[name="userType"]:checked');
      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();
  
      if (!userType || !username || !email || !password) {
        alert("Please fill all fields");
        return;
      }
  
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
  
      const userData = {
        userType: userType.value,
        username,
        email,
        password,
      };
  
      try {
        const response = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert("Registration successful!");
          form.reset();
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      }
    });
  });
  