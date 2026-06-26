import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { operatingDetailsSchema } from "../../schemas/schema";
import { operatingDetails } from "../../services/service";
import Header from "../layouts/Header";

function OperatingDetails() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [gymData, setGymData] = useState({
    openingTime: "",
    closingTime: "",
    gymFacilities: [],
    gymEquipments: [],
    otherFacilities: [""],
    otherEquipments: [""],
  });

  // ✅ INPUT CHANGE
  function handleChange(e) {
    const { name, value } = e.target;

    setGymData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // ✅ CHECKBOX HANDLER
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;

    setGymData((prev) => ({
      ...prev,
      [name]: checked
        ? [...prev[name], value]
        : prev[name].filter((item) => item !== value),
    }));
  };


  const getInputClass = (field) => {
    return `w-full border rounded-lg p-3 focus:outline-none transition ${
      errors[field]
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-blue-500"
    }`;
  };

 async function handleSubmit(e) {
  e.preventDefault();

  const result = operatingDetailsSchema.safeParse(gymData);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    setErrors(fieldErrors);
    return;
  }

  setErrors({});
  setLoading(true); 

  try {
    const out = await operatingDetails(gymData);

    if (out.success) {
      navigate("/location/details");
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false); 
  }
}


  const handleAddFacility = () => {
    setGymData((prev) => ({
      ...prev,
      otherFacilities: [...prev.otherFacilities, ""],
    }));
  };

  const handleOtherFacilityChange = (index, value) => {
    const updated = [...gymData.otherFacilities];
    updated[index] = value;

    setGymData((prev) => ({
      ...prev,
      otherFacilities: updated,
    }));
  };

  const handleAddEquipment = () => {
    setGymData((prev) => ({
      ...prev,
      otherEquipments: [...prev.otherEquipments, ""],
    }));
  };

  const handleOtherEquipmentChange = (index, value) => {
    const updated = [...gymData.otherEquipments];
    updated[index] = value;

    setGymData((prev) => ({
      ...prev,
      otherEquipments: updated,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

   
      <div className="flex justify-center mt-10 px-6">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8">

          <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
            Operating Details
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium mb-2">
                Opening Time
              </label>
              <input
                type="time"
                name="openingTime"
                onChange={handleChange}
                className={getInputClass("openingTime")}
              />
              {errors.openingTime && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.openingTime}
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-2">
                Closing Time
              </label>
              <input
                type="time"
                name="closingTime"
                onChange={handleChange}
                className={getInputClass("closingTime")}
              />
              {errors.closingTime && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.closingTime}
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-3">
                Gym Facilities
              </label>

              <div className="grid grid-cols-2 gap-3">
                {[
                  "parking",
                  "locker-room",
                  "shower",
                  "personalTrainer",
                  "yogaClasses",
                  "zumbaClasses",
                  "others",
                ].map((facility) => (
                  <label key={facility} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="gymFacilities"
                      value={facility}
                      checked={gymData.gymFacilities.includes(facility)}
                      onChange={handleCheckboxChange}
                    />
                    {facility}
                  </label>
                ))}
              </div>

              {errors.gymFacilities && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gymFacilities}
                </p>
              )}
            </div>

         
            {gymData.gymFacilities.includes("others") && (
              <div>
                {gymData.otherFacilities.map((facility, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Enter other facility ${index + 1}`}
                    value={facility}
                    onChange={(e) =>
                      handleOtherFacilityChange(index, e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg p-3 mt-2"
                  />
                ))}

                <button
                  type="button"
                  onClick={handleAddFacility}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                >
                  Add More Facility
                </button>

                {errors.otherFacilities && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.otherFacilities}
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block font-medium mb-3">
                Gym Equipments
              </label>

              <div className="grid grid-cols-2 gap-3">
                {[
                  "Tread Mill",
                  "exercisebike",
                  "ellipticalTrainer",
                  "dumbBells",
                  "barbells",
                  "weightPlates",
                  "benchPress",
                  "squatRack",
                  "smithMachine",
                  "cableMachine",
                  "others",
                ].map((equipment) => (
                  <label key={equipment} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="gymEquipments"
                      value={equipment}
                      checked={gymData.gymEquipments.includes(equipment)}
                      onChange={handleCheckboxChange}
                    />
                    {equipment}
                  </label>
                ))}
              </div>

              {errors.gymEquipments && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gymEquipments}
                </p>
              )}
            </div>

         
            {gymData.gymEquipments.includes("others") && (
              <div>
                {gymData.otherEquipments.map((equipment, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Enter other equipment ${index + 1}`}
                    value={equipment}
                    onChange={(e) =>
                      handleOtherEquipmentChange(index, e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg p-3 mt-2"
                  />
                ))}

                <button
                  type="button"
                  onClick={handleAddEquipment}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                >
                  Add More Equipment
                </button>

                {errors.otherEquipments && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.otherEquipments}
                  </p>
                )}
              </div>
            )}

       
            <button
  type="submit"
  disabled={loading}
  className={`w-full py-3 rounded-lg font-semibold transition text-white ${
    loading
      ? "bg-blue-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  {loading ? "Submitting..." : "Submit"}
</button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default OperatingDetails;