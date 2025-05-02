import { useState } from 'react';
import { UserCircle, Mail, Lock, CheckCircle, AlertCircle } from 'lucide-react';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    userType: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.userType) {
      newErrors.userType = 'Please select a user type';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    
    // Show success message
    setIsSubmitted(true);
    
    // Reset form after successful submission
    setTimeout(() => {
      setFormData({
        userType: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setIsSubmitted(false);
    }, 3000);
  };
  
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
      
      {isSubmitted ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center mb-4">
          <CheckCircle className="mr-2" size={20} />
          <span>Account created successfully!</span>
        </div>
      ) : null}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">User Type</label>
          <div className="flex gap-4">
            {['Student', 'Faculty', 'Admin'].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value={type.toLowerCase()}
                  checked={formData.userType === type.toLowerCase()}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
          {errors.userType && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <AlertCircle className="mr-1" size={14} />
              {errors.userType}
            </p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserCircle className="text-gray-400" size={18} />
            </div>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="pl-10 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
            />
          </div>
          {errors.username && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <AlertCircle className="mr-1" size={14} />
              {errors.username}
            </p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="text-gray-400" size={18} />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="pl-10 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <AlertCircle className="mr-1" size={14} />
              {errors.email}
            </p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="text-gray-400" size={18} />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="pl-10 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <AlertCircle className="mr-1" size={14} />
              {errors.password}
            </p>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="text-gray-400" size={18} />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="pl-10 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm password"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <AlertCircle className="mr-1" size={14} />
              {errors.confirmPassword}
            </p>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Account
        </button>
      </form>
      
      <div className="mt-4 text-center text-sm">
        <p className="text-gray-600">
          Already have an account?{' '}
          <a href="#" className="text-blue-500 hover:text-blue-700">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}