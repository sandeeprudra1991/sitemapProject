import axios from "axios";
import {PAGE_INFO_URL} from "./constants";
export const getData = async () => {
   const response= await axios(PAGE_INFO_URL);
   return response.data;
}

