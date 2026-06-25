import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import {
  checkEmail,
  googleLogin,
} from "../../services/service";

function UserLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [showGoogleLogin, setShowGoogleLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check Email
  const handleEmailSubmit = async () => {
    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const data = await checkEmail(email);

      if (data.exists) {
        localStorage.setItem("token", data.token);

        if (data.user) {
          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );
        }

        alert("Login Successful");
        navigate("/user/dashboard");
      } else {
        setShowGoogleLogin(true);
      }
    } catch (error) {
  console.log("FULL ERROR:", error);
  console.log("MESSAGE:", error.message);
  console.log("RESPONSE:", error.response);
  console.log("REQUEST:", error.request);
}
  };

  // Google Login
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(
        credentialResponse.credential
      );

      console.log("Google User:", decoded);

     

      const data = await googleLogin({
        googleId: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        alert("Login Successful");

        navigate("/user/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Google Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          User Login
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Enter your email to continue
        </p>

        <input
          type="email"
          placeholder="Enter Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {!showGoogleLogin ? (
          <button
            onClick={handleEmailSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Checking..." : "Sign in with Email"}
          </button>
        ) : (
          <div className="mt-4">
            <p className="text-center text-gray-600 mb-4">
              Email not found. Continue with Google
            </p>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() =>
                  alert("Google Login Failed")
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserLogin;