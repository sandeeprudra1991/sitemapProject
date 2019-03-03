import Axios from "axios";
import sitemap from "express-sitemap";
import {getData} from "./src/api";
console.log("test");

var route={};
var data={};
//Axios.get ("https://www.att.com/idpcms/sales/prod/uf.pagesinfo.js").then(response =>response.data.entries().forEach((key,value)=>console.log(key,value)))
const generateSitemap = data => {
    var map={};    
    Object.keys(data).forEach(key =>{
    map[key]=[];
    route[key]={
        lastmod: data[key].versionID,
        changefreq: 'daily',
    };

    sitemap({
        map,
        route
    }).XMLtoFile();
    
})
console.log(map);


};
const data= await getData();
console.log(data);
//map.key="test"
// Axios.get ("https://www.att.com/idpcms/sales/prod/uf.pagesinfo.js").then(response =>generateSitemap(response.data));




