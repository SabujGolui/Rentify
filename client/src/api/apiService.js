import axios from "axios";

const baseUrl = "http://localhost:8080/api";

const getUser = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}/userlogin`, formData);
    //console.log("Data fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const userSignUp = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}/usersignup`, formData);
    //console.log("Data fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getProperty = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}/getproperty`, formData);
    //console.log("Data fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getPropertybyid = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}/getpropertybyid`, formData);
    //console.log("Data fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const createProperty = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}/createproperty`, formData);
    //console.log("Data fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const DeleteProperty = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}/delproperty`, formData);
    //console.log("Data fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const interestedProperty = async (formData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/interestedproperty`,
      formData
    );
    //console.log("Data fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
const searchProperty = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}/searchroperty`, formData);
    //console.log("Data fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export {
  getUser,
  userSignUp,
  getProperty,
  DeleteProperty,
  getPropertybyid,
  createProperty,
  interestedProperty,
  searchProperty,
};
