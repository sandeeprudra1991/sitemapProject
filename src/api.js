import axios from "axios";
import {PAGE_INFO_URL} from "./constants";
import {TV_URL} from "./constants";
import {SPORTS_URL} from "./constants";

export const getData = async () => {

   const response= await axios(PAGE_INFO_URL);
   return response.data;
   
}

export const getDataByURL = async (url) => {

   const response= await axios(url);
   return response.data;
   
}

