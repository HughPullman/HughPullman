import React, { useEffect, useState } from 'react'
import "./Home.scss"
import {MapContainer, TileLayer, useMap} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import axios from "axios"
import {Link} from "react-router-dom"
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


const Home = ({mapLocation, setMapLocation}) => {

    const [currWeather, setCurrWeather] = useState(null)
    const [wikiTitles, setWikiTitles] = useState([])
    const [wikiLinks, setWikiLinks] = useState([])




    useEffect(() => {
        const getFirstLocation = async () =>{
            let location = await getLocation();
            setMapLocation(location);
        }
        getFirstLocation();
        
    }, []);

    useEffect(() => {
        const fetchInfo = async () =>{
            if(mapLocation !== null){
                let weather = await getWeather(mapLocation);
                let wiki = await getWiki(mapLocation);
                setCurrWeather(weather);
                setLinksAndTitles(wiki);                
            } 
        }
        fetchInfo();
        
    },[mapLocation])  
    
    
    const getLocation = async() =>{
        const location = await axios.get('https://ipapi.co/json');
        return location.data
    }

    const getWeather = async(location) =>{
        const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=201e0f10c238d28f325af124a681cb69`);
        return weather.data
    }

    const getWiki = async(location) => {
        var url = "https://en.wikipedia.org/w/api.php"; 

        const params = {
            action: "query",
            list: "search",
            srsearch: location.country_name,
            format: "json",
           
        };

        url = url + '?origin=*';
        Object.keys(params).forEach((key) => {
            url += "&" + key + "=" + params[key]
        });

        const wikiData = await axios.get(url)
        return wikiData.data.query.search
    }

    const getWikiLink = async(pageid) => {
        const linkData = await axios.get(`https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids=${pageid}&inprop=url&format=json`)
        return linkData.data.query.pages[pageid].fullurl
    }

    const setLinksAndTitles = (wiki) =>{
        let titles = [];
        for(let i = 0 ; i < 5 ; i++) {
            titles.push(wiki[i].title) 
        }
        let links = [];
        for(let i = 0 ; i < 5 ; i++) {
            links.push(getWikiLink(wiki[i].pageid)) 
        }
        setWikiLinks(links)
        setWikiTitles(titles)
}

    const SetView = ({coords}) => {
        const map = useMap();
        map.setView(coords, 9);
        return null
    }

  return (
    <div className="home">
        <div className="info">
            <div className="left">
                <h1>Current Location</h1>
                <p>Latitude: {mapLocation?.latitude || ''}</p>
                <p>Longitude: {mapLocation?.longitude || ''}</p>
                <p>Country: {mapLocation?.country_name || ''}</p>
                <p>Capital City: {mapLocation?.country_capital || ''}</p>
                <p>UTC offset: {mapLocation?.utc_offset || ''}</p>
                <p>Currency: {mapLocation?.currency || ''}</p>
                <p>Country Area: {mapLocation?.country_area || ''}</p>
                <p>Country Population: {mapLocation?.country_population || ''}</p>
            </div>
            <div className="right">
                <h1>Weather</h1>
                <p>Temperature : {currWeather ? (currWeather.main.temp - 273.15).toFixed(1) : 'N/A'}°C</p>
                <p>Pressure : {currWeather ? (currWeather.main.pressure) : 'N/A'} hPa</p>
                <p>Humidity : {currWeather ? (currWeather.main.humidity) : 'N/A'} %</p>
                <p>Wind Speed : {currWeather ? (currWeather.wind.speed) : 'N/A'} MPH</p>
                <p>Conditions : {currWeather ? (currWeather.weather[0].description) : 'N/A'}</p>
            </div>
        </div>
        <div className="map">
            {mapLocation !== null && <MapContainer >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <SetView coords={[mapLocation.latitude, mapLocation.longitude]}/>
            </MapContainer>
            }    
        </div>
        <div className="wiki">
            <div className="title"><h2>Related Wikipedia</h2></div>
            <div className="searchResults">
                <div className="item">
                    {wikiLinks.length !== 0 ? <Link className='link' to={wikiLinks[0]} target="_blank">{wikiTitles[0]} <OpenInNewIcon className='icon'/></Link> : <span>Loading...</span>}
                </div>
                <div className="item">
                    {wikiLinks.length !== 0 ? <Link className='link' to={wikiLinks[1]} target="_blank">{wikiTitles[1]}<OpenInNewIcon className='icon'/></Link> : <span>Loading...</span>}
                </div>
                <div className="item">
                    {wikiLinks.length !== 0 ? <Link className='link' to={wikiLinks[2]} target="_blank">{wikiTitles[2]}<OpenInNewIcon className='icon'/></Link> : <span>Loading...</span>}
                </div>
                <div className="item">
                    {wikiLinks.length !== 0 ? <Link className='link' to={wikiLinks[3]} target="_blank">{wikiTitles[3]}<OpenInNewIcon className='icon'/></Link> : <span>Loading...</span>}
                </div>
                <div className="item">
                    {wikiLinks.length !== 0 ? <Link className='link' to={wikiLinks[4]} target="_blank">{wikiTitles[4]}<OpenInNewIcon className='icon'/></Link> : <span>Loading...</span>} 
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home