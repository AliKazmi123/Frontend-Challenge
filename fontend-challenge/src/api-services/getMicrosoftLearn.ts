import axios from "axios";
import { CatalogList } from "../types/customTypes";
import { constants } from "../assets/constants";

export const getMicrosoftCatalogs = async (): Promise<CatalogList> => {
    return axios.get<CatalogList>(constants.API_URL)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        })
}