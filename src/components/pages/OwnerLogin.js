import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginOwner } from "../../services/service";
import { FaEye, FaEyeSlash } from "react-icons/fa";


function OwnerLogin() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

async function handleSubmit(e) {
  e.preventDefault();

  try {
    const out = await loginOwner(loginData);

    if (out.success) {
      localStorage.setItem("token", out.token);
      localStorage.setItem("user", JSON.stringify(out.user));
      alert("Login Successful");
      navigate("/owner/dashboard");
    }
  } catch (err) {
    console.log(err);

    alert(
      err.response?.data?.message ||
      "Login Failed"
    );

    navigate("/register");
  }
}

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6">
          Owner Login
        </h1>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="w-full border p-2 rounded mb-4"
          />

          <label>Password</label>

<div className="relative mb-4">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    value={loginData.password}
    onChange={handleChange}
    placeholder="Enter Password"
    className="w-full border p-2 rounded pr-10"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default OwnerLogin;