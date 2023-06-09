import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
//import "./routing.css";
import "lrm-graphhopper";
import { useEffect, useState } from "react";
function coords(path){
    let latLngArray = [];
    useEffect(() => {
        return latLngArray;
      },[]);
}

const createRoutineMachineLayer = (props) => {
    let latLngArray =[];
  //const [data, setData] = useState([]);
  console.log(props.coords);
  for (let i = 0; i < props.coords.length; i++) {
    latLngArray.push(L.latLng(props.coords[i].lat, props.coords[i].lng));
  }
  //setData(latLngArray);
  const instance = L.Routing.control({
    waypoints: [
        L.latLng(41.110205, 28.858547),     
        L.latLng(41.096882, 28.861138),      
        L.latLng(41.101846, 28.864373),    
        L.latLng(41.093122, 28.867779),
        L.latLng(41.089799, 28.870279),
        L.latLng(41.110205, 28.858547), 
        L.latLng(41.091006, 28.885385), 
    ],
    lineOptions: {
      styles: [{ color: "#de2814", weight: 5 }],
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: false,
    draggableWaypoints: false,
    fitSelectedRoutes: false,
    showAlternatives: true,
    router: L.Routing.graphHopper("", {
      urlParameters: {
        "ch.disabled":true,
        vehicle: "car_delivery",
        turn_cost:true,
        optimize:true,
        weighting:"fastest",
        locale:"tr"
      },
    }),

    //isochrone:L.routing.isochrone
  });
  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
