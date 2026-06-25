import { useState } from "react";
import { mediaMembershipSchema } from "../../schemas/schema";
import { mediaMembershipDetails } from "../../services/service";
import { useNavigate } from "react-router-dom";

function MediaMembershipPlans() {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([
    {
      planName: "",
      duration: "",
      price: "",
      description: "",
      status: "active",
    },
  ]);

  const [mediaData, setMediaData] = useState({
    gymLogo: null,
    coverImage: null,
    gymPhotos: [],
  });

  // ================= FILE HANDLER =================
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (name === "gymPhotos") {
      setMediaData((prev) => ({
        ...prev,
        gymPhotos: Array.from(files),
      }));
    } else {
      setMediaData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  // ================= PLAN HANDLER =================
  const handleChange = (index, e) => {
    const { name, value } = e.target;

    const updatedPlans = [...plans];
    updatedPlans[index][name] = value;

    setPlans(updatedPlans);
  };

  const addPlan = () => {
    setPlans([
      ...plans,
      {
        planName: "",
        duration: "",
        price: "",
        description: "",
        status: "active",
      },
    ]);
  };

  const removePlan = (index) => {
    setPlans(plans.filter((_, i) => i !== index));
  };

  // ================= SUBMIT =================
async function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData();

  // plans
  formData.append("membershipPlans", JSON.stringify(plans));

  formData.append("gymLogo", mediaData.gymLogo);
  formData.append("coverImage", mediaData.coverImage);

  mediaData.gymPhotos.forEach((file) => {
    formData.append("gymPhotos", file);
  });

  try {
    const out = await mediaMembershipDetails(formData);

    if (out.success) {
      alert("Saved Successfully");
      navigate("/auth/owner/login");
    }
  } catch (err) {
    console.log(err);
  }
}

 
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Membership Plans
        </h1>

      
        <form onSubmit={handleSubmit}>
          {plans.map((plan, index) => (
            <div key={index} className="border rounded-lg p-6 mb-6 bg-gray-50">

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Plan {index + 1}</h2>

                {plans.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePlan(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <input
                  type="text"
                  name="planName"
                  placeholder="Plan Name"
                  value={plan.planName}
                  onChange={(e) => handleChange(index, e)}
                  className="border p-3 rounded"
                />

                <select
                  name="duration"
                  value={plan.duration}
                  onChange={(e) => handleChange(index, e)}
                  className="border p-3 rounded"
                >
                  <option value="">Select Duration</option>
                  <option value="1 Month">1 Month</option>
                  <option value="3 Months">3 Months</option>
                  <option value="6 Months">6 Months</option>
                  <option value="12 Months">12 Months</option>
                </select>

                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={plan.price}
                  onChange={(e) => handleChange(index, e)}
                  className="border p-3 rounded"
                />

                <select
                  name="status"
                  value={plan.status}
                  onChange={(e) => handleChange(index, e)}
                  className="border p-3 rounded"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <textarea
                  name="description"
                  placeholder="Description"
                  value={plan.description}
                  onChange={(e) => handleChange(index, e)}
                  className="border p-3 rounded md:col-span-2"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addPlan}
            className="bg-green-600 text-white px-4 py-2 rounded mb-6"
          >
            + Add Another Plan
          </button>

  
          <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Media Uploads
          </h1>

        <div className="border rounded-lg p-6 bg-gray-50 mb-6">

 
  <div className="mb-4">
    <label className="block font-medium mb-2">
      Gym Logo
    </label>

    <input
      type="file"
      name="gymLogo"
      onChange={handleFileChange}
      className="w-full border border-gray-300 rounded-lg p-3"
    />
  </div>


  <div className="mb-4">
    <label className="block font-medium mb-2">
      Cover Image
    </label>

    <input
      type="file"
      name="coverImage"
      onChange={handleFileChange}
      className="w-full border border-gray-300 rounded-lg p-3"
    />
  </div>


  <div>
    <label className="block font-medium mb-2">
      Gym Photos (Multiple Upload)
    </label>

    <input
      type="file"
      name="gymPhotos"
      multiple
      onChange={handleFileChange}
      className="w-full border border-gray-300 rounded-lg p-3"
    />
  </div>

</div>

          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default MediaMembershipPlans;