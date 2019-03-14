import sitemap from "express-sitemap";
import {getDataByURL} from "../api";
import { HTTPS as http, DIRECT_TV_URL_HOST_NAME, MOVIE_URL, TV_URL, SPORTS_URL} from "../constants";


export const generateMovieSitemap = async () => {
    let titles = await getTitles(MOVIE_URL);
    generateSitemapFromTitles(titles,"sitemaps/moviesSitemap.xml");
};
export const generateTVSitemap = async () => {
    let titles = await getTitles(TV_URL);
    generateSitemapFromTitles(titles,"sitemaps/tvSitemap.xml");
};
export const generateSportSitemap = async () => {
    let titles = await getTitles(SPORTS_URL);
    generateSitemapFromTitles(titles,"sitemaps/sportsSitemap.xml");
};

const generateSitemapFromTitles = (titles, sitemapFileName) => {
    let map={};
    let route ={};
    titles.forEach(title =>{
        map[title.detailsLinkUrl]=[];
        route[title.detailsLinkUrl]={

        };
    });
    sitemap({http,url:DIRECT_TV_URL_HOST_NAME,map,route,sitemap:sitemapFileName}).XMLtoFile();
    console.log(route);
    console.log("done");
}

const getTitles = async (url) => {
    let titles = [];
    let data= await getDataByURL(generateUrl(url,0,1000));
    titles= [...titles,...data.titles];
    const searchResultsCount= data.searchResultsCount;
    let start = 1000;

    while(searchResultsCount > start){
        let data= await getDataByURL(generateUrl(url,start,start+1000));
        titles= [...titles,...data.titles];
        start=start+data.titles.length;
    }

    return titles;

}

const generateUrl = (url, resultsetStart, resultsetEnd) => `${url}=${resultsetEnd}&resultsetstart=${resultsetStart}`;

