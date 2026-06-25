import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {locationDetailsSchema} from '../../schemas/schema';
import {locationDetails} from '../../services/service'

function LocationDetails() {
  const navigate = useNavigate();

  const [locationData, setLocationData] = useState({
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });
  


  function handleChange(e) {
    const { name, value } = e.target;

    setLocationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("Location Data:", locationData);

 const result = locationDetailsSchema.safeParse(locationData);
   
     if (!result.success) {
       console.log(result.error.format());
       alert("Validation Failed");
       return;
     }
   
     try {
       const out = await locationDetails(locationData);
   
   console.log(out.message, "GYM Registration ");
       if(out.success){
        navigate("/media/membership")
        alert("Location Details Saved Succesfully😊")
       }
      
     }
       catch (err) {
       console.log(err);
     }  
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Location Details
        </h1>

        <form className="space-y-6">
          <div>
            <label className="block font-medium mb-2">
              Address Line 1
            </label>
            <input
              type="text"
              name="addressLine1"
              value={locationData.addressLine1}
              onChange={handleChange}
              placeholder="Enter Address"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Address Line 2
            </label>
            <input
              type="text"
              name="addressLine2"
              value={locationData.addressLine2}
              onChange={handleChange}
              placeholder="Apartment, Building, Floor (Optional)"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Landmark
            </label>
            <input
              type="text"
              name="landmark"
              value={locationData.landmark}
              onChange={handleChange}
              placeholder="Near..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={locationData.city}
                onChange={handleChange}
                placeholder="Enter City"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                State
              </label>
              <input
                type="text"
                name="state"
                value={locationData.state}
                onChange={handleChange}
                placeholder="Enter State"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                value={locationData.pincode}
                onChange={handleChange}
                placeholder="Enter Pincode"
                maxLength={6}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={locationData.country}
                readOnly
                className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100"
              />
            </div>

            <div className="space-y-6">

  {/* <div>
    <label className="block font-medium mb-2">
      Gym Logo
    </label>

    <input
      type="file"
      name="gymLogo"
      accept="image/*"
      onChange={handleFileChange}
      className="w-full border border-gray-300 rounded-lg p-3"
    />
  </div>

  <div>
    <label className="block font-medium mb-2">
      Cover Image
    </label>

    <input
      type="file"
      name="coverImage"
      accept="image/*"
      onChange={handleFileChange}
      className="w-full border border-gray-300 rounded-lg p-3"
    />
  </div>

 
  <div>
    <label className="block font-medium mb-2">
      Gym Photos
    </label>

    <input
      type="file"
      name="gymPhotos"
      accept="image/*"
      multiple
      onChange={handleFileChange}
      className="w-full border border-gray-300 rounded-lg p-3"
    />

    <p className="text-sm text-gray-500 mt-1">
      You can upload multiple gym photos.
    </p>
  </div> */}

</div>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default LocationDetails;