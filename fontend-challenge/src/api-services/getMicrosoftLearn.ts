import { CatalogList } from "../types/customTypes";
import { constants } from "../assets/constants";

export const getMicrosoftCatalogs = async (): Promise<CatalogList> => {
  try {
    const response = await fetch(constants.API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
