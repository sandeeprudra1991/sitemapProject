import {getData} from "../api";
import sitemap from "express-sitemap";
import {ATT_URL as url, HTTPS as http} from "../constants";

export const generatePageInfoSitemap= async ()=>{
    const data= await getData();

    var route={};
    var map={};   
    console.log(data);
     
    Object.keys(data).forEach(key =>{

        let URLName = key;
        if(isHomeURL(key)){
            URLName = replceHomeURL(key);
            console.log("check dup",URLName);
            
        }

        if(!isDUlicateURL(key,map)){
            map[URLName]=[];
            route[URLName]={
                lastmod: data[key].versionID,
                changefreq: 'daily',
            };
        }
        //console.log(map);
        
    })
    
    
    sitemap({http, url, map, route,sitemap:"sitemaps/pageInfoSitemap.xml"}).XMLtoFile();
    console.log("done");

}

const isDUlicateURL = (url,map) => !!map[url]

const isHomeURL = url => /^\/*homepage/i.test(url);

const replceHomeURL = url => url.replace(/^\/*homepage/i,"");