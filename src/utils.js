import {getData} from "./api";
import sitemap from "express-sitemap";
import {ATT_URL as url, HTTPS as http} from "./constants";



export const generateSitemap= async ()=>{
    const data= await getData();
    var route={};
    var map={};    
    Object.keys(data).forEach(key =>{
        map[key]=[];
        route[key]={
            lastmod: data[key].versionID,
            changefreq: 'daily',
        };
    })
    
    
    sitemap({http, url, map, route}).XMLtoFile();
    console.log("done");

}