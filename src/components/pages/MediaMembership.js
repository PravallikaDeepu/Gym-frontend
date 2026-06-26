import { useState } from "react";
import { mediaMembershipSchema } from "../../schemas/schema";
import { mediaMembershipDetails } from "../../services/service";
import { useNavigate } from "react-router-dom";
import Header from '../layouts/Header';

function MediaMembershipPlans() {
  const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);
const [touched, setTouched] = useState({
  membershipPlans: [{}],
  mediaData: {},
});
  const navigate = useNavigate();

const getPlanBorder = (index, field) => {
  if (!touched.membershipPlans[index]?.[field]) {
    return "border-gray-300";
  }

  return errors?.membershipPlans?.[index]?.[field]?._errors?.length
    ? "border-red-500"
    : "border-green-500";
};

const getMediaBorder = (field) => {
  if (!touched.mediaData[field]) {
    return "border-gray-300";
  }

  return errors?.mediaData?.[field]?._errors?.length
    ? "border-red-500"
    : "border-green-500";
};

const getBorder = (field) => {
  return errors?.[field]?.length
    ? "border-red-500"
    : "border-green-500";
};
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

  const updatedMedia =
    name === "gymPhotos"
      ? { ...mediaData, gymPhotos: Array.from(files) }
      : { ...mediaData, [name]: files[0] };

  setMediaData(updatedMedia);

  setTouched((prev) => ({
    ...prev,
    mediaData: {
      ...prev.mediaData,
      [name]: true,
    },
  }));

  const result = mediaMembershipSchema.safeParse({
    mediaData: updatedMedia,
    membershipPlans: plans,
  });

  setErrors(result.success ? {} : result.error.format());
};

  // ================= PLAN HANDLER =================
const handleChange = (index, e) => {
  const { name, value } = e.target;

  const updatedPlans = [...plans];
  updatedPlans[index][name] = value;
  setPlans(updatedPlans);

  const updatedTouched = { ...touched };
  updatedTouched.membershipPlans[index] = {
    ...updatedTouched.membershipPlans[index],
    [name]: true,
  };
  setTouched(updatedTouched);

  const result = mediaMembershipSchema.safeParse({
    mediaData,
    membershipPlans: updatedPlans,
  });

  setErrors(result.success ? {} : result.error.format());
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

  setTouched((prev) => ({
    ...prev,
    membershipPlans: [...(prev.membershipPlans || []), {}],
  }));
};

  const removePlan = (index) => {
    setPlans(plans.filter((_, i) => i !== index));
  };

  // ================= SUBMIT =================
async function handleSubmit(e) {
  
  e.preventDefault();
const payload = {
  mediaData,
  membershipPlans: plans,
};

const result = mediaMembershipSchema.safeParse(payload);

console.log("Result:", result);
console.log("Success:", result.success);

if (!result.success) {
  console.log("Error:", result.error);
  console.log("Formatted:", result.error.format());

  const errors = result.error.format();
  setErrors(errors);
  return;
}

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
      navigate("/owner/dashboard");
    }
  } catch (err) {
    console.log(err);
  }
}

 
  return (
     <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <div className="flex justify-center mt-10 px-6">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8">

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

<div className="grid grid-cols-2 gap-4">

  {/* Plan Name */}
  <div>
    <label className="block font-medium mb-2">Plan Name</label>
    <input
      type="text"
      name="planName"
      value={plan.planName}
      onChange={(e) => handleChange(index, e)}
      className={`w-full border rounded-lg p-3 ${getPlanBorder(index, "planName")}`}
      placeholder="Plan Name"
    />
{touched?.membershipPlans?.[index]?.planName &&
  errors?.membershipPlans?.[index]?.planName?._errors?.map((err, i) => (
    <p key={i} className="text-red-500 text-sm mt-1">
      {err}
    </p>
))}
  </div>

  {/* Duration */}
  <div>
    <label className="block font-medium mb-2">Duration</label>
    <select
      name="duration"
      value={plan.duration}
      onChange={(e) => handleChange(index, e)}
      className={`w-full border rounded-lg p-3 ${getPlanBorder(index, "duration")}`}
    >
      <option value="">Select Duration</option>
      <option value="1 Month">1 Month</option>
      <option value="3 Months">3 Months</option>
      <option value="6 Months">6 Months</option>
      <option value="12 Months">12 Months</option>
    </select>
{touched?.membershipPlans?.[index]?.duration &&
  errors?.membershipPlans?.[index]?.duration?._errors?.map((err, i) => (
    <p key={i} className="text-red-500 text-sm mt-1">
      {err}
    </p>
))}
  </div>

  {/* Price */}
  <div>
    <label className="block font-medium mb-2">Price</label>
    <input
      type="number"
      name="price"
      value={plan.price}
      onChange={(e) => handleChange(index, e)}
      className={`w-full border rounded-lg p-3 ${getPlanBorder(index, "price")}`}
      placeholder="Price"
    />
{touched?.membershipPlans?.[index]?.price &&
  errors?.membershipPlans?.[index]?.price?._errors?.map((err, i) => (
    <p key={i} className="text-red-500 text-sm mt-1">
      {err}
    </p>
))}
  </div>

  {/* Status */}
  <div>
    <label className="block font-medium mb-2">Status</label>
    <select
      name="status"
      value={plan.status}
      onChange={(e) => handleChange(index, e)}
      className={`w-full border rounded-lg p-3 ${getPlanBorder(index, "status")}`}
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  </div>

  {/* Description */}
  <div className="col-span-2">
    <label className="block font-medium mb-2">Description</label>
    <textarea
      name="description"
      value={plan.description}
      onChange={(e) => handleChange(index, e)}
      className={`w-full border rounded-lg p-3 ${getPlanBorder(index, "description")}`}
      placeholder="Description"
      rows={4}
    />
{touched?.membershipPlans?.[index]?.description &&
  errors?.membershipPlans?.[index]?.description?._errors?.map((err, i) => (
    <p key={i} className="text-red-500 text-sm mt-1">
      {err}
    </p>
))}
  </div>

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
      className={`w-full border rounded-lg p-3 ${getMediaBorder("gymLogo")}`}
    />
{touched?.mediaData?.gymLogo &&
  errors?.mediaData?.gymLogo?._errors?.map((err, i) => (
    <p key={i} className="text-red-500 text-sm mt-1">
      {err}
    </p>
))}
  </div>


  <div className="mb-4">
    <label className="block font-medium mb-2">
      Cover Image
    </label>

    <input
      type="file"
      name="coverImage"
      onChange={handleFileChange}
     className={`w-full border rounded-lg p-3 ${getMediaBorder("coverImage")}`}
    />
{touched?.mediaData?.coverImage &&
  errors?.mediaData?.coverImage?._errors?.map((err, i) => (
    <p key={i} className="text-red-500 text-sm mt-1">
      {err}
    </p>
))}
  </div>


  <div>
    <label className="block font-medium mb-2">
      Gym Photos 
    </label>

    <input
      type="file"
      name="gymPhotos"
      multiple
      onChange={handleFileChange}
     className={`w-full border rounded-lg p-3 ${getMediaBorder("gymPhotos")}`}
    />
{touched?.mediaData?.gymPhotos &&
  errors?.mediaData?.gymPhotos?._errors?.map((err, i) => (
    <p key={i} className="text-red-500 text-sm mt-1">
      {err}
    </p>
))}
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
    </div>
  );
}

export default MediaMembershipPlans;