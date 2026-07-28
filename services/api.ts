import axios from "axios";

const BASE_URL =
  "https://psychologistsservices-322b6-default-rtdb.firebaseio.com";

export async function fetchPsychologists() {
  try {
    const response = await axios.get(`${BASE_URL}/.json`);
    return response.data ? Object.values(response.data) : [];
  } catch (error) {
    console.error("Error fetching psychologists:", error);
    throw error;
  }
}
