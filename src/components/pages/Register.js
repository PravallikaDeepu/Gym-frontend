import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../../schemas/schema";
import { registerUser } from "../../services/service";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
    console.log(result,"RESULT")
    if(result.success){
      console.log("Result is success")
   try {
  console.log("Before API Call");

  const out = await registerUser(myTask);

  console.log("After API Call");
  console.log("Hi", out);

  if (out.success) {
    navigate("/gym/details");
  }
} catch (err) {
  console.log("API Error:", err);
}
    }else{
      console.log("do it ")
    }

  //   if (!result.success) {
  //     console.log(result.error.format());
  //     alert("Validation Failed");
  //     return;
  //   }
  //   else{
  //   try {
  //     const out = await registerUser(myTask);
  //     console.log("Hi", out)
  //     if (out.success) {
  //       alert("Navigating to Gym Details page");
  //       navigate("/gym/details");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
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
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
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
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
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
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Mobile Number"
              value={myTask.mobileNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("mobileNumber")}
            />
            {touched.mobileNumber && errors.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobileNumber}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="enteredEmail"
              placeholder="Email Address"
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

          <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    name="enteredPassword"
    placeholder="Password"
    value={myTask.enteredPassword}
    onChange={handleChange}
    onBlur={handleBlur}
    className={`${getInputClass("enteredPassword")} pr-10`}
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-3 text-gray-500"
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>

  {touched.enteredPassword && errors.enteredPassword && (
    <p className="text-red-500 text-sm mt-1">
      {errors.enteredPassword}
    </p>
  )}
</div>

  <div className="relative">
  <input
    type={showConfirmPassword ? "text" : "password"}
    name="confirmPassword"
    placeholder="Confirm Password"
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
    className="absolute right-3 top-3 text-gray-500"
  >
    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
  </button>

  {touched.confirmPassword && errors.confirmPassword && (
    <p className="text-red-500 text-sm mt-1">
      {errors.confirmPassword}
    </p>
  )}
</div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="city"
                placeholder="City"
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

            <div>
              <input
                type="text"
                name="state"
                placeholder="State"
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
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Next
          </button>

        </form>
      </div>
    </div>
  );
}

export default Register;