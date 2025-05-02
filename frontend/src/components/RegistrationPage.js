const saveUserToDatabase = async (userData) => {
  // Remove confirmPassword field before sending to the server
  const { confirmPassword, ...dataToSend } = userData;
  
  try {
      const response = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend)
      });

      const data = await response.json();

      if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
      }

      // ✅ Store user details in localStorage
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("role", data.user.userType);
      localStorage.setItem("token", data.token);  // If backend sends a token

      // ✅ Redirect based on role
      if (data.user.userType === "student") window.location.href = "/student.html";
      else if (data.user.userType === "faculty") window.location.href = "/faculty.html";
      else if (data.user.userType === "admin") window.location.href = "/admin.html";
      else alert("Unknown role!");

      return data.user;
  } catch (error) {
      console.error('API Error:', error);
      throw error;
  }
};
