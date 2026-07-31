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

    return Object.entries(response.data)
      .filter(([id]) => id !== "appointments")
      .map(([id, item]) => ({
        id,
        ...item,
      }));
  } catch (error) {
    console.error("Error fetching psychologists:", error);
    throw error;
  }
}

export async function createAppointment(appointmentData: {
  name: string;
  phone: string;
  time: string;
  email: string;
  comment: string;
  psychologistName: string;
}) {
  try {
    const response = await axios.post(
      `${BASE_URL}/appointments.json`,
      appointmentData,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
}
