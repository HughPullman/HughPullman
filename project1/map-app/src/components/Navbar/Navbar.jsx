import React from 'react';
import "./Navbar.scss"

const Navbar = ({setMapLocation, forceUpdate}) => {
  return (
    <div className="navbar">
        <div className="wrapper">
          <div className="left">
            <span>Hugh's Map App</span>  
          </div>
          <div className="center">
            <span className='home' onClick={() => window.location.reload()}>My Location</span>
          </div>
          <div className="right">
            <h3>Popular Cities : </h3>
            <span onClick={() => setMapLocation({
              latitude:22.31, 
              longitude: 114.1,
              country_name: 'Hong Kong / China',
              country_capital: 'Hong Kong',
              utc_offset: '+0800',
              currency: 'HKD',
              country_area: '2,754',
              country_population: '7,413,000'
              })}>Hong Kong</span>
            <span onClick={() => setMapLocation({
              latitude:13.75, 
              longitude: 100.5,
              country_name: 'Thailand',
              country_capital: 'Bangkok',
              utc_offset: '+0700',
              currency: 'THB',
              country_area: '513,120',
              country_population: '71,600,000'
              })}>Bangkok</span>
            <span onClick={() => setMapLocation({
              latitude:51.5, 
              longitude: 0.12,
              country_name: 'England',
              country_capital: 'London',
              utc_offset: '+0000',
              currency: 'GBP',
              country_area: '130,200',
              country_population: '55,980,000'
              })}>London</span>
            <span onClick={() => setMapLocation({
              latitude:48.85, 
              longitude: 2.35,
              country_name: 'France',
              country_capital: 'Paris',
              utc_offset: '+0100',
              currency: 'EUR',
              country_area: '551,700',
              country_population: '67,750,000'
              })}>Paris</span>
            <span onClick={() => setMapLocation({
              latitude:25.20, 
              longitude: 55.27,
              country_name: 'United Arab Emirates',
              country_capital: 'Abu Dhabi',
              utc_offset: '+0400',
              currency: 'UAE',
              country_area: '83.600',
              country_population: '9,365,000'
              })}>Dubai</span>
            <span onClick={() => setMapLocation({
              latitude:40.7128, 
              longitude: -74.0060,
              country_name: 'United States of America',
              country_capital: 'Washington, D.C',
              utc_offset: '-0400',
              currency: 'USD',
              country_area: '9,834,000',
              country_population: '331,900,000'
              })}>New York City</span>
            <span onClick={() => setMapLocation({
              latitude:41.9, 
              longitude: 12.49,
              country_name: 'Italy',
              country_capital: 'Rome',
              utc_offset: '+0200',
              currency: 'EUR',
              country_area: '302,073',
              country_population: '59,110,000'
              })}>Rome</span>
            <span onClick={() => setMapLocation({
              latitude:35.6762, 
              longitude: 139.6503,
              country_name: 'Japan',
              country_capital: 'Tokyo',
              utc_offset: '+0900',
              currency: 'JPY',
              country_area: '377,970',
              country_population: '125,700,000'
              })}>Tokyo</span>
          </div>
        </div>
    </div>
  )
}

export default Navbar