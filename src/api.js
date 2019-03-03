import axios from "axios";
export const getData = async () => {
   const response= await axios("https://www.att.com/idpcms/sales/prod/uf.pagesinfo.js");
   return response.data;
}

