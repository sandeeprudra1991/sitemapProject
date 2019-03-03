import axios from "axios";
export const getData = async () => {
   const response= await axios("https://www.att.com/idpcms/sales/prod/uf.pagesinfo.js");
//    const jsonData= await data.json();
//    console.log(data);
   return response.data;
}
// getData();

