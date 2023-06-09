import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useEffect, useState } from "react";
import {
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import "leaflet.awesome-markers";
import "./css/marker.css";
import "ionicons";
import "./css/routing.css"
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/react-fontawesome";
import RoutingMachine from "../../routing";
import { Button, TextField } from "@mui/material";
import { View } from "react-native-web";
import {REACT_APP_WEB_API} from '@env'
import {REACT_APP_LOCAL_API} from '@env'
const center1 = {
  lat: 41.110205,
  lng: 28.858547,
};
let markerList = [];
let row = [];
async function getMarker() {
  try {
    const response = await fetch("https://localhost:44347/atm");
    const json = await response.json();

    console.log("test");
    console.log(markerList);
    json.map((value) =>
      row.push({
        lat: value.latitude,
        lng: value.longitude,
      })
    );
    console.log(row);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("final çıktı " + row);
  }
}

export default function DraggableMarker(prop) {
  const url ="https://stajprojewebapi.azurewebsites.net/";
  const [query, setQuery] = useState(""); 
  const [index, setIndex] = useState(0); 
  console.log(prop);
  L.AwesomeMarkers.Icon.prototype.options.prefix = "fa";
  var greenIcon = L.AwesomeMarkers.icon({
    icon: "home",
    markerColor: "red",
  });
  const [mapData, setMapData] = useState({
    locations:[],
    markers:[],
  });
  const [data, setData] = useState([]);
  useEffect(() => {
     fetch(REACT_APP_WEB_API+`atm`)
      .then((response) => response.json())
      .then(async (usefulData) => {
        console.log(usefulData);
        usefulData.map((value) =>
          row.push({
            lat: value.latitude,
            lng: value.longitude,
          })
        );
        setMapData({
          locations:row,
          markers:usefulData
        })
        markerList = await usefulData;      
      })
      .catch((e) => {
        console.error(`An error occurred: ${e}`);
      });
  }, []);
   const handleFilterChange = (event) => {
    setQuery(event.target.value);
  }
  return (
    <div style={{width:'100%',height:'100%',margin:'auto'}}>
    <MapContainer
      style={{ width:prop.width==null? '100%':prop.width, height: prop.height==null? 'calc(100vh)':prop.height}}
      center={center1}
      zoom={12}
      scrollWheelZoom={false}
    >
        <TextField
        type="text"
        placeholder="Filter"
        value={query}
        style={{zIndex:400,paddingTop:75,backgroundColor:"whitesmoke"}}
        onChange={(e) => setQuery(e.target.value)}
      />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright"></ZoomControl>
      {mapData.locations.filter(
    (location, indexFilter) =>
      mapData.markers[indexFilter].atmId.toString()
        .toLowerCase()
        .includes(query.toLowerCase())
  ).map((center, index) => (
        <Marker
          icon={
            mapData.markers[index].status == true
              ? new Icon({
                iconUrl: markerIconPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
              : greenIcon
          }
          position={center}
        >
          <Popup>
            <strong>
              {"lat: " +
                center.lat +
                ", lng: " +
                center.lng +
                " " +
                markerList[index].atmId}
            </strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
  );
}