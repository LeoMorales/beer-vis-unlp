import React, { useState } from "react";
import L from "leaflet";
import { TileLayer, Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet";
import beer from "../assets/beer.png";
import "./BeerMap.css";

function BeerMap() {
  const [breweries, setBreweries] = useState({
    brewery1: {
      lat: -34.9151681,
      lng: -57.9556653,
    },
    brewery2: {
      lat: -34.9202167,
      lng: -57.9516906,
    },
  });
  const [zoom, setZoom] = useState(15);

  const beerIcon = L.icon({
    iconUrl: beer,
    iconSize: [38, 45], // size of the icon
    iconAnchor: [22, 45], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76],
  });

  const positionBreweryB = [breweries.brewery1.lat, breweries.brewery1.lng];
  const positionBreweryA = [breweries.brewery2.lat, breweries.brewery2.lng];
  return (
    <MapContainer className='beermap' center={positionBreweryA} zoom={zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={positionBreweryA} icon={beerIcon}>
        <Popup>Cervecería A</Popup>
      </Marker>
      <Marker position={positionBreweryB} icon={beerIcon}>
        <Popup>Cervecería B</Popup>
      </Marker>
    </MapContainer>
  );
}

export default BeerMap;
