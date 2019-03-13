import {getData, getDataByURL} from "./api";
import sitemap from "express-sitemap";
import {ATT_URL as url, HTTPS as http, DIRECT_TV_URL_HOST_NAME} from "./constants";
import {DIRECT_TV_URL} from "./constants";
import moment from "moment";



export const generateSitemap= async ()=>{
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


export const generateDirectTvSitemap= async () => {
    let titles = await getDitectTvTitles();
    let map={};
    let route={};
    titles.forEach(title => {
        map[title.detailsLinkUrl]=[];
        route[title.detailsLinkUrl]={
        };
    });
    sitemap({http, url:DIRECT_TV_URL_HOST_NAME, map, route,sitemap:"sitemaps/directTvSitemap.xml"}).XMLtoFile();
    console.log(route);
    console.log("done");
    
    
    
}

const getDitectTvTitles = async () => {
    let titles = [];
    let data= await getDataByURL(generateURL(0,1000));
    //titles.concat(data.titles);
    titles= [...titles,...data.titles];
    const searchResultsCount= data.searchResultsCount;
    let start=1000;
    //let end=start+1000;
    while(searchResultsCount > start){
        let data= await getDataByURL(generateURL(start,start+1000));
        titles= [...titles,...data.titles];
        //titles.concat(data.titles);
        start=start+data.titles.length;
       // end=start+1000;
    }
     
    return titles;
}

const generateURL = (resultsetStart, resultsetEnd) => `${DIRECT_TV_URL}=${resultsetEnd}&resultsetstart=${resultsetStart}`;

