import React, { useState } from "react";
import L from "leaflet";
import { TileLayer, Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet";
import beer from "../assets/beer.png";
import "./BeerMap.css";
import StylesList from "../styleslist/StylesList";

function BeerMap({breweries, onBarSelected}) {
  const [zoom, setZoom] = useState(15);

  const beerIcon = L.icon({
    iconUrl: beer,
    iconSize: [30, 37], // size of the icon
    iconAnchor: [22, 45], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76],
  });

  const initialLoc = [-34.921449, -57.954597];
  return (
    <MapContainer className='beermap' center={initialLoc} zoom={zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {breweries.map((element, index) =>
        <Marker
          key={index}
          position={[element.lat, element.lng]}
          draggable={false}
          icon={beerIcon}
          eventHandlers={{
            click: () => {
              console.log('marker clicked')
              onBarSelected(element.id);
            },
          }}
          >
          <Popup>
            <h6>{element.name}</h6>
            <p>Estilos disponibles:</p>
            <div className="sell-beers">
              <StylesList bar={element}/>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default BeerMap;
