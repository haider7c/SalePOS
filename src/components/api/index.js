import axios from "axios";



// Base URL for API
const BASE_URL = "http://localhost:5000/api"; // Update as per your backend

// Function to POST data

export const postItem = async(endpoint, data) => {
  try {
    const response = await axios.post( `${BASE_URL}/${endpoint}`,data);
    return response.data;
  }catch (error){
    console.error(`Error in POST to ${endpoint}:`, error);
    throw error;
  }
}
// Generic function to GET data
export const getItem = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error in GET from ${endpoint}:`, error);
    throw error;
  }
};
