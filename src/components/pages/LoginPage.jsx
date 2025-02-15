import React, { useState } from "react";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace this with your login logic
    if (
      credentials.username === "admin" &&
      credentials.password === "password"
    ) {
      alert("Login successful!");
    } else {
      alert("Invalid username or password.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* Login Card */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900">
            GYM<span className="text-red-500">Flow</span>
          </h1>
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold mb-4">
          GYM MANAGEMENT SYSTEM
        </h2>
        <p className="text-center text-gray-600 mb-8">Sign in to account</p>

        {/* Form */}
        <form onSubmit={handleLogin}>
          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="username"
              className="w-full border border-red-500 p-2 rounded"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full border border-red-500 p-2 rounded"
              required
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200"
          >
            Sign in
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Powered By Danish The Techie
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
