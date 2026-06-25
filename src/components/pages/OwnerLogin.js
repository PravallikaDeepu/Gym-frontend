import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginOwner } from "../../services/service";


function OwnerLogin() {
  const navigate = useNavigate()
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

  console.log("Login Data:", loginData);

  try {
    const out = await loginOwner(loginData);

    console.log(out.message, "LOGIN RESPONSE");

    if (out.success) {
      alert("Login Successful 😊");

      navigate("/owner/dashboard"); 
    }
  } catch (err) {
    console.log(err);

    alert(
      err.response?.data?.message ||
      "Login Failed"
    );
    navigate("/register")
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
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="w-full border p-2 rounded mb-4"
          />

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