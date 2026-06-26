import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../../schemas/schema";
import { registerUser } from "../../services/service";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function Register() {
  const navigate = useNavigate();

  const [myTask, setMyTask] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    enteredEmail: "",
    enteredPassword: "",
    confirmPassword: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [countryCode, setCountryCode] = useState("+91");
const [loading, setLoading] = useState(false);

function handleChange(e) {
  const { name, value } = e.target;

  const updatedData = {
    ...myTask,
    [name]: value,
  };

  setMyTask(updatedData);

  const result = registerSchema.safeParse(updatedData);

  if (!result.success) {
    const fieldErrors = {};

    result.error.issues.forEach((issue) => {
      fieldErrors[issue.path[0]] = issue.message;
    });

    setErrors(fieldErrors);
  } else {
    setErrors({});
  }
}

function handleBlur(e) {
  const { name } = e.target;

  setTouched((prev) => ({
    ...prev,
    [name]: true,
  }));

  const result = registerSchema.safeParse(myTask);

  if (!result.success) {
    const fieldErrors = {};

    result.error.issues.forEach((issue) => {
      fieldErrors[issue.path[0]] = issue.message;
    });

    setErrors(fieldErrors);
  } else {
    setErrors({});
  }
}

const getInputClass = (field) => {
  if (touched[field] && errors[field]) {
    return "w-full border-2 border-red-500 rounded-lg p-2";
  }

  if (touched[field] && myTask[field] && !errors[field]) {
    return "w-full border-2 border-green-500 rounded-lg p-2";
  }

  return "w-full border rounded-lg p-2";
};

async function handleSubmit(e) {
  e.preventDefault();

  const result = registerSchema.safeParse(myTask);

  if (result.success) {
    try {
      setLoading(true);

      const out = await registerUser(myTask);

   if (out.success) {
  localStorage.setItem("token", out.token);

  localStorage.setItem(
    "user",
    JSON.stringify({
      firstName: myTask.firstName,
      lastName: myTask.lastName,
    })
  );

  navigate("/gym/details");
}
    } catch (err) {
      console.log("API Error:", err);
    } finally {
      setLoading(false);
    }
  } else {
    const fieldErrors = {};

    result.error.issues.forEach((issue) => {
      fieldErrors[issue.path[0]] = issue.message;
    });

    setErrors(fieldErrors);

    const touchedFields = {};
    Object.keys(myTask).forEach((key) => {
      touchedFields[key] = true;
    });

    setTouched(touchedFields);
  }
}

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Registration Form
        </h1>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
  <label
    htmlFor="firstName"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    First Name
  </label>

  <input
    id="firstName"
    type="text"
    name="firstName"
    placeholder="Enter your first name"
    value={myTask.firstName}
    onChange={handleChange}
    onBlur={handleBlur}
    className={getInputClass("firstName")}
  />

  {touched.firstName && errors.firstName && (
    <p className="text-red-500 text-sm mt-1">
      {errors.firstName}
    </p>
  )}
</div>

           <div>
  <label
    htmlFor="lastName"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Last Name
  </label>

  <input
    id="lastName"
    type="text"
    name="lastName"
    placeholder="Enter your last name"
    value={myTask.lastName}
    onChange={handleChange}
    onBlur={handleBlur}
    className={getInputClass("lastName")}
  />

  {touched.lastName && errors.lastName && (
    <p className="text-red-500 text-sm mt-1">
      {errors.lastName}
    </p>
  )}
</div>
          </div>

        <div>
  <label
    htmlFor="mobileNumber"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Mobile Number
  </label>

  <PhoneInput
    country={"in"}
    value={myTask.mobileNumber}
    onChange={(phone) =>
      setMyTask({
        ...myTask,
        mobileNumber: phone,
      })
    }
    inputStyle={{
      width: "100%",
      height: "42px",
      borderRadius: "8px",
      border: "1px solid #d1d5db",
    }}
    buttonStyle={{
      borderTopLeftRadius: "8px",
      borderBottomLeftRadius: "8px",
    }}
  />

  {touched.mobileNumber && errors.mobileNumber && (
    <p className="text-red-500 text-sm mt-1">
      {errors.mobileNumber}
    </p>
  )}
</div>

  <div>

  <label
    htmlFor="enteredEmail"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Email Address
  </label>


  <input
    id="enteredEmail"
    type="email"
    name="enteredEmail"
    placeholder="Enter your email address"
    value={myTask.enteredEmail}
    onChange={handleChange}
    onBlur={handleBlur}
    className={getInputClass("enteredEmail")}
  />

  {touched.enteredEmail && errors.enteredEmail && (
    <p className="text-red-500 text-sm mt-1">
      {errors.enteredEmail}
    </p>
  )}
</div>


<div>
  <label
    htmlFor="enteredPassword"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Password
  </label>

  <div className="relative">
    <input
      id="enteredPassword"
      type={showPassword ? "text" : "password"}
      name="enteredPassword"
      placeholder="Enter your password"
      value={myTask.enteredPassword}
      onChange={handleChange}
      onBlur={handleBlur}
      className={`${getInputClass("enteredPassword")} pr-10`}
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  </div>

  {touched.enteredPassword && errors.enteredPassword && (
    <p className="text-red-500 text-sm mt-1">
      {errors.enteredPassword}
    </p>
  )}
</div>

<div>
  <label
    htmlFor="confirmPassword"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Confirm Password
  </label>

  <div className="relative">
    <input
      id="confirmPassword"
      type={showConfirmPassword ? "text" : "password"}
      name="confirmPassword"
      placeholder="Re-enter your password"
      value={myTask.confirmPassword}
      onChange={handleChange}
      onBlur={handleBlur}
      className={`${getInputClass("confirmPassword")} pr-10`}
    />

    <button
      type="button"
      onClick={() =>
        setShowConfirmPassword(!showConfirmPassword)
      }
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
    >
      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  </div>

  {touched.confirmPassword && errors.confirmPassword && (
    <p className="text-red-500 text-sm mt-1">
      {errors.confirmPassword}
    </p>
  )}
</div>

         <div className="grid grid-cols-2 gap-4">
  {/* City */}
  <div>
    <label
      htmlFor="city"
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      City
    </label>

    <input
      id="city"
      type="text"
      name="city"
      placeholder="Enter your city"
      value={myTask.city}
      onChange={handleChange}
      onBlur={handleBlur}
      className={getInputClass("city")}
    />

    {touched.city && errors.city && (
      <p className="text-red-500 text-sm mt-1">
        {errors.city}
      </p>
    )}
  </div>

  {/* State */}
  <div>
    <label
      htmlFor="state"
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      State
    </label>

    <input
      id="state"
      type="text"
      name="state"
      placeholder="Enter your state"
      value={myTask.state}
      onChange={handleChange}
      onBlur={handleBlur}
      className={getInputClass("state")}
    />

    {touched.state && errors.state && (
      <p className="text-red-500 text-sm mt-1">
        {errors.state}
      </p>
    )}
  </div>
</div>
         <button
  type="button"
  onClick={handleSubmit}
  disabled={loading}
  className={`w-full py-3 rounded-lg text-white transition ${
    loading
      ? "bg-blue-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  {loading ? "Loading..." : "Next"}
</button>
        </form>
      </div>
    </div>
  );
}

export default Register;