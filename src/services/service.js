import Axios from "axios";

const API_URL = "http://localhost:7070";
// const API_URL = "https://gym-backend-1kg1.onrender.com";

// export const registerUser = async (userData) => {
//   const response = await Axios.post(
//     `${API_URL}/auth/register`,
//     { message: userData }
//   );

//   return response.data;
// };

export const registerUser = async (userData) => {
  console.log("Inside registerUser");

  const response = await Axios.post(
    `${API_URL}/auth/register`,
    { message: userData }
  );

  console.log("Response received", response);

  return response.data;
};

export const ownerRegister = async (ownerData) => {
  const response = await Axios.post(
    `${API_URL}/gym/details`,
    { message: ownerData }
  );

  return response.data;
};


export const operatingDetails = async(operatingData) => {
  const response = await Axios.post(`${API_URL}/operating/details`, {message:operatingData})
  return response.data;
};

export const locationDetails = async(locationData) => {
  const response = await Axios.post(`${API_URL}/location/details`, {message:locationData})
  return response.data;
};

export const mediaMembershipDetails = async(membershipData) => {
  const response = await Axios.post(`${API_URL}/media/membership/details`, membershipData)
  return response.data;
};

export const loginOwner = async (ownerloginData) => {
  const response = await Axios.post(`${API_URL}/owner/login`,ownerloginData);
  return response.data;
};


export const loginUser = async (userloginData) => {
  const response = await Axios.post(`${API_URL}/user/login`,userloginData);
  return response.data;
};

export const sendOTP = async(email)=>{

const response = await Axios.post(
 `${API_URL}/auth/otp/send-otp`,
 {
   email:email
 }
);

return response.data;

};


export const verifyOTP = async(email,otp)=>{


const response = await Axios.post(
 `${API_URL}/auth/otp/verify-otp`,
 {
   email,
   otp
 }
);


return response.data;

};


export const checkEmail = async (email) => {
  try {
    const response = await Axios.post(
      `${API_URL}/auth/check-email`,
      { email }
    );

    return response.data;
  } catch (err) {
    console.log("checkEmail API failed:", err.response || err);
    throw err;
  }
};

export const googleLogin = async (userData) => {
  const response = await Axios.post(
    `${API_URL}/auth/google-login`,
    userData
  );

  return response.data;
};