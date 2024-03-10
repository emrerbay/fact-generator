import axios from "axios";

const API_BASE_URL = "https://uselessfacts.jsph.pl/api/v2";

export interface Fact {
  text: string;
  language: string;
}

export const getRandomFact = async (language: string): Promise<Fact> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/facts/random`, {
      params: {
        language,
      },
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching random fact:", error);
    throw error;
  }
};

export const getFactOfTheDay = async (language: string): Promise<Fact> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/facts/today`, {
      params: {
        language,
      },
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching fact of the day:", error);
    throw error;
  }
};
