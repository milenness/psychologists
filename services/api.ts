import axios from "axios";
import { Psychologist } from "@/types/psychologist";

const BASE_URL =
  "https://psychologistsservices-322b6-default-rtdb.firebaseio.com";

export async function fetchPsychologists() {
  try {
    const response = await axios.get<Record<string, Omit<Psychologist, "id">>>(
      `${BASE_URL}/.json`,
    );
    if (!response.data) return [];

    return Object.entries(response.data).map(([id, item]) => ({
      id,
      ...item,
    }));
  } catch (error) {
    console.error("Error fetching psychologists:", error);
    throw error;
  }
}
