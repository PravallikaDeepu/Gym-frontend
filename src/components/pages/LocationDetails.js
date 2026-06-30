import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { locationDetailsSchema } from "../../schemas/schema";
import { locationDetails } from "../../services/service";
import Header from "../layouts/Header";

function LocationDetails() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [locationData, setLocationData] = useState({
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    googleMapsLink: ""
  });

  // ✅ HANDLE CHANGE
  function handleChange(e) {
    const { name, value } = e.target;

    setLocationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // ✅ INPUT CLASS (red/green borders)
  const getInputClass = (field) => {
    return `w-full border rounded-lg p-3 focus:outline-none transition ${
      errors[field]
        ? "border-red-500 focus:ring-red-500"
        : locationData[field]
        ? "border-green-500 focus:ring-green-500"
        : "border-gray-300 focus:ring-blue-500"
    }`;
  };

  // ✅ SUBMIT
  async function handleSubmit(e) {
    e.preventDefault();

    const result = locationDetailsSchema.safeParse(locationData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const out = await locationDetails(locationData);

      if (out.success) {
        navigate("/media/membership");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <div className="flex justify-center mt-10 px-6">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8">

          <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
            Location Details
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* ADDRESS 1 */}
            <div>
              <label className="block font-medium mb-2">
                Address Line 1
              </label>
              <input
                type="text"
                name="addressLine1"
                value={locationData.addressLine1}
                onChange={handleChange}
                className={getInputClass("addressLine1")}
              />
              {errors.addressLine1 && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.addressLine1}
                </p>
              )}
            </div>

            {/* ADDRESS 2 */}
            <div>
              <label className="block font-medium mb-2">
                Address Line 2
              </label>
              <input
                type="text"
                name="addressLine2"
                value={locationData.addressLine2}
                onChange={handleChange}
                className={getInputClass("addressLine2")}
              />
              {errors.addressLine2 && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.addressLine2}
                </p>
              )}
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
                className={getInputClass("landmark")}
              />
              {errors.landmark && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.landmark}
                </p>
              )}
            </div>

            {/* CITY + STATE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block font-medium mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={locationData.city}
                  onChange={handleChange}
                  className={getInputClass("city")}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={locationData.state}
                  onChange={handleChange}
                  className={getInputClass("state")}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.state}
                  </p>
                )}
              </div>

              {/* PINCODE */}
              <div>
                <label className="block font-medium mb-2">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={locationData.pincode}
                  onChange={handleChange}
                  className={getInputClass("pincode")}
                />
                {errors.pincode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pincode}
                  </p>
                )}
              </div>

              {/* COUNTRY */}
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

            </div>

{/* Google map */}
<div>
  <label className="block font-medium mb-2">
    Google Maps Location
  </label>

 <input
  type="url"
  name="googleMapsLink"
  placeholder="Paste your Google Maps location link"
  value={locationData.googleMapsLink}
  onChange={handleChange}
  className={getInputClass("googleMapsLink")}
/>
<p className="text-sm text-gray-500 mt-1">
  Open Google Maps → Find your gym → Share → Copy link → Paste it here.
</p>
{locationData.googleMapsLink && (
  <a
    href={locationData.googleMapsLink}
    target="_blank"
    rel="noreferrer"
    className="text-blue-600 underline"
  >
    View on Google Maps
  </a>
)}
</div>
            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Loading..." : "Save & Continue"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default LocationDetails;