
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { basicGymSchema } from "../../schemas/schema";
import { ownerRegister } from "../../services/service";
import {Header} from '../../components/layouts/Header'

function GymDetails() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
const [loading, setLoading] = useState(false);
  const [ownerData, setOwnerData] = useState({
    gymName: "",
    establishmentYear: "",
    gymType: "",
    gymDescription: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;

    const updatedData = {
      ...ownerData,
      [name]: value,
    };

    setOwnerData(updatedData);

    const result = basicGymSchema.safeParse(updatedData);

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

    const result = basicGymSchema.safeParse(ownerData);

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
      return "w-full border-2 border-red-500 rounded-lg p-3 focus:outline-none";
    }

    if (touched[field] && ownerData[field] && !errors[field]) {
      return "w-full border-2 border-green-500 rounded-lg p-3 focus:outline-none";
    }

    return "w-full border border-gray-300 rounded-lg p-3 focus:outline-none";
  };

 async function handleSubmit(e) {
  e.preventDefault();

  const result = basicGymSchema.safeParse(ownerData);

  if (!result.success) {
    const fieldErrors = {};

    result.error.issues.forEach((issue) => {
      fieldErrors[issue.path[0]] = issue.message;
    });

    setErrors(fieldErrors);

    const touchedFields = {};
    Object.keys(ownerData).forEach((key) => {
      touchedFields[key] = true;
    });

    setTouched(touchedFields);

    alert("Validation Failed");
    return;
  }

  try {
    setLoading(true); // ✅ START LOADING

    const out = await ownerRegister(ownerData);

    if (out.success) {
     
      navigate("/operating/details");
    }
  } catch (err) {
    console.log("API Error:", err);
  } finally {
    setLoading(false); // ✅ STOP LOADING (always runs)
  }
}

 return (
  <div className="min-h-screen bg-gray-100 flex flex-col">

    {/* HEADER */}
    <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      
      {/* Left - Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
        <h2 className="text-blue-600 font-bold text-lg">Gym Manager</h2>
      </div>

  
      <h2 className="text-gray-700 font-bold">
        Welcome, <span className="text-blue-600 font-semibold">
          {user?.firstName} {user?.lastName}
        </span>
      </h2>

      <button onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/");
        }}
        className="text-red-500 font-medium flex items-center gap-2">
        <span>Logout</span>
      </button>
    </header>

  
    <div className="flex justify-center items-start mt-10 px-4">

      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-10">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-10">
          Basic Gym Information
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* Gym Name */}
          <div>
            <label className="block font-medium mb-2">Gym Name</label>
            <input
              type="text"
              name="gymName"
              placeholder="Enter Gym Name"
              value={ownerData.gymName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("gymName")}
            />
            {touched.gymName && errors.gymName && (
              <p className="text-red-500 text-sm mt-1">{errors.gymName}</p>
            )}
          </div>

          {/* Establishment Year */}
          <div>
            <label className="block font-medium mb-2">Establishment Year</label>
            <input
              type="number"
              name="establishmentYear"
              placeholder="Enter Establishment Year"
              value={ownerData.establishmentYear}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("establishmentYear")}
            />
          </div>

          {/* Gym Type */}
          <div>
            <label className="block font-medium mb-2">Gym Type</label>
            <select
              name="gymType"
              value={ownerData.gymType}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("gymType")}
            >
              <option value="">Select Gym Type</option>
              <option value="gen-fitness">General Fitness</option>
              <option value="body-building">Body Building</option>
              <option value="cross-fit">CrossFit</option>
              <option value="yoga">Yoga Studio</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-2">Gym Description</label>
            <textarea
              rows="4"
              name="gymDescription"
              placeholder="Tell about your Gym"
              value={ownerData.gymDescription}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("gymDescription")}
            />
          </div>

          {/* Submit */}
          <button
  type="submit"
  disabled={loading}
  className={`w-full py-3 rounded-lg font-semibold transition text-white 
  ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
>
  {loading ? "Submitting..." : "Submit"}
</button>

        </form>
      </div>
    </div>
  </div>
);
}

export default GymDetails;

