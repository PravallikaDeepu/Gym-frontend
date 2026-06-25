
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { basicGymSchema } from "../../schemas/schema";
import { ownerRegister } from "../../services/service";

function GymDetails() {
  const navigate = useNavigate();

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
      const out = await ownerRegister(ownerData);

      if (out.success) {
        alert("Gym Details Saved Successfully");
        navigate("/operating/details");
      }
    } catch (err) {
      console.log("API Error:", err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Basic Gym Information
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Gym Name */}
          <div>
            <label className="block font-medium mb-2">
              Gym Name
            </label>

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
              <p className="text-red-500 text-sm mt-1">
                {errors.gymName}
              </p>
            )}
          </div>

          {/* Establishment Year */}
          <div>
            <label className="block font-medium mb-2">
              Establishment Year
            </label>

            <input
              type="number"
              name="establishmentYear"
              placeholder="Enter Establishment Year"
              min="1900"
              max={new Date().getFullYear()}
              value={ownerData.establishmentYear}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("establishmentYear")}
            />

            {touched.establishmentYear &&
              errors.establishmentYear && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.establishmentYear}
                </p>
              )}
          </div>

          {/* Gym Type */}
          <div>
            <label className="block font-medium mb-2">
              Gym Type
            </label>

            <select
              name="gymType"
              value={ownerData.gymType}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("gymType")}
            >
              <option value="">Select Gym Type</option>
              <option value="gen-fitness">
                General Fitness Gym
              </option>
              <option value="body-building">
                Bodybuilding Gym
              </option>
              <option value="cross-fit">
                CrossFit Gym
              </option>
              <option value="women-gym">
                Women's Gym
              </option>
              <option value="yoga-studio">
                Yoga Studio
              </option>
              <option value="multi-purpose">
                Multi-Purpose Gym
              </option>
            </select>

            {touched.gymType && errors.gymType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gymType}
              </p>
            )}
          </div>

          {/* Gym Description */}
          <div>
            <label className="block font-medium mb-2">
              Gym Description
            </label>

            <textarea
              rows="5"
              name="gymDescription"
              placeholder="Tell about your Gym"
              value={ownerData.gymDescription}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("gymDescription")}
            />

            {touched.gymDescription &&
              errors.gymDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gymDescription}
                </p>
              )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default GymDetails;

