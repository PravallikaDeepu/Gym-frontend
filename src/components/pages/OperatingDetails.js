import { useState } from 'react';
import Axios from 'axios';
import  {useNavigate} from 'react-router-dom'
import {operatingDetailsSchema} from '../../schemas/schema';
import { operatingDetails} from '../../services/service'


function OperatingDetails() {

   const navigate = useNavigate();
const [gymData, setGymData] = useState({
  openingTime: "",
  closingTime: "",
  gymFacilities: [],
  gymEquipments: [],
  otherFacilities: [""],
  otherEquipments: [""],
});

function handleChange(e) {
  const { name, value } = e.target;

  console.log("Selected:", name, value);

  setGymData((prev) => ({
    ...prev,
    [name]: value,
  }));
}

const handleCheckboxChange = (e) => {
  const { name, value, checked } = e.target;

  setGymData((prev) => ({
    ...prev,
    [name]: checked
      ? [...prev[name], value]
      : prev[name].filter((item) => item !== value),
  }));
};

  async function handleSubmit(e) {
    e.preventDefault();
      console.log("Final Data:", gymData);
    const result = operatingDetailsSchema.safeParse(gymData);
  
    if (!result.success) {
      console.log(result.error.format());
      alert("Validation Failed");
      return;
    }
  
    try {
      const out = await operatingDetails(gymData);
  
  console.log(out.message, "GYM Registration ");
      if(out.success){
       navigate("/location/details")
       alert("Basic Gym registration SUccess Buddy😊")
      }
     
    }
      catch (err) {
      console.log(err);
    }  
}
const handleAddFacility = () => {
  setGymData((prev) => ({
    ...prev,
    otherFacilities: [...prev.otherFacilities, ""],
  }));
};
const handleOtherFacilityChange = (index, value) => {
  const updatedFacilities = [...gymData.otherFacilities];
  updatedFacilities[index] = value;

  setGymData((prev) => ({
    ...prev,
    otherFacilities: updatedFacilities,
  }));
  console.log(gymData.otherFacilities,"Other Facilitoes")
};

const handleAddEquipment = () => {
  setGymData((prev) => ({
    ...prev,
    otherEquipments: [...prev.otherEquipments, ""],
  }));
};
const handleOtherEquipmentChange = (index, value) => {
  const updatedEquipments = [...gymData.otherEquipments];
  updatedEquipments[index] = value;

  setGymData((prev) => ({
    ...prev,
    otherEquipments: updatedEquipments,
  }));
  console.log(gymData.otherEquipments,"Other Equipments")
};
return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8">

      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Operating Details
      </h1>

      <form className="space-y-6">
          <div>
          <label className="block font-medium mb-2">Opening Time:</label>
          <input type="time" name="openingTime" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange}/>
        </div>

    <div>
          <label className="block font-medium mb-2">Closing Time:</label>
          <input type="time" name="closingTime" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange}/>
        </div>

          <div>
          <div>           
          <label className="block font-medium mb-2">
            Facilities
          </label>

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
      <label
        key={facility}
        className="flex items-center gap-2"
      >
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
</div>
{gymData.gymFacilities.includes("others") && (
  <>
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
  </>
)}
          <div>
        </div>

{gymData.gymFacilities === "others" && (
  <>
    {gymData.otherFacilities.map((facility, index) => (
      <input key={index}
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
      onClick={handleAddEquipment}
      className="bg-green-500 text-white px-4 py-2 rounded mt-2"
    >
      Add More
    </button>
  </>
)}
          </div>
 </div>
<div>
  <label className="block font-medium mb-3">
    Gym Equipments
  </label>

  <div className="grid grid-cols-2 gap-3">
    {[
      "treadmill",
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
      <label
        key={equipment}
        className="flex items-center gap-2"
      >
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
</div>
{gymData.gymEquipments.includes("others") && (
  <>
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
  </>
)}

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition" onClick={handleSubmit}>Submit</button>
      </form>
      
    </div>
  </div>
);
}

export default OperatingDetails;
