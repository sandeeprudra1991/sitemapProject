import {getData} from "./api";
import sitemap from "express-sitemap";



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
    console.log("map",map);
    console.log("route",route);
    
    
    sitemap({map,route}).XMLtoFile();
    console.log("done");

}