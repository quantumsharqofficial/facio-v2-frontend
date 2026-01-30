import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "./utilits/axiosInstance";
import login2 from "./assets/login-2.png";
import logo from "./assets/logo.png";
import visionx from "./assets/quantum vision x.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailInputRef = useRef(null);
  const refreshToken = localStorage.getItem("refreshToken");
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  console.log("test");
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const refreshToken = localStorage.getItem("refreshToken");
    if (token && user && refreshToken) {
      if (user.role === "COMPANY_ADMIN") {
        navigate("/employee");
      } else if (user.role === "SUPER_ADMIN") {
        navigate("/customer");
      }
    }

    emailInputRef.current?.focus();
  }, []);

  console.log("test 1");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosInstance.post("/auth/login", {
        email,
        password,
      });

      console.log("Login success:", response);

      const { accessToken, refreshToken, user } = response?.data?.result;
      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);
      console.log("user", user);



      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "COMPANY_ADMIN") {
        navigate("/employee");
      } else if (user.role === "SUPER_ADMIN") {
        navigate("/customer");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  console.log("test 2");
  return (
    <div className="min-h-screen w-full flex relative font-sans">
      <div className="relative hidden w-1/2 flex-col justify-center items-center text-white p-16 overflow-hidden md:flex bg-gradient-to-br from-[#4f46e5] to-[#06b6d4]">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')",
          }}
        ></div>
      </div>
      {/* Right Side - Login Form */}
      <div className="relative w-full md:w-1/2 flex justify-center items-center bg-white p-8 overflow-hidden">
        {/* Background Image for Right Side */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${login2})` }}
        ></div>
      </div>

      {/* Center Login Card */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10">
          <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
            Welcome to
          </h2>
          <div className="flex justify-center mt-2">
            <img src={visionx} alt="Logo" className="h-20 object-contain" />
          </div>
          <p className="text-gray-500 text-center mb-8">
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                ref={emailInputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="name@company.com"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              // type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Sign In
            </button>

            <p className="text-sm text-gray-500 text-center mt-6 ">
              <Link
                to="/forget-password"
                className="text-indigo-600 font-medium"
              >
                Forget Password
              </Link>
            </p>
            <p className="text-gray-300 text-center mt-4">From :</p>

            <div className="flex justify-center mt-2">
              <img src={logo} alt="Logo" className="h-20 object-contain" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
