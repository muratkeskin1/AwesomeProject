import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-graphhopper";
import "leaflet.awesome-markers";
import "./css/marker.css";
import "ionicons";
import "./css/routing.css";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "leaflet/dist/leaflet.css";
import Modal from "@mui/material/Modal";
import { Button} from "@mui/material";
import "leaflet-simple-map-screenshoter";
import "leaflet-easyprint";
import { saveAs } from "file-saver";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import FileUpload from "./fileUpload";
import { ButtonBase } from "@mui/material";
import "./css/modal.css"
import {REACT_APP_WEB_API} from '@env'
import {REACT_APP_LOCAL_API} from '@env'
export default class MapTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
      router: null,
      route: null,
      locations: [],
      markers: [],
      show:false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  async componentDidMount() {
    await this.getLocations();
    await this.initMap();
  }
  async getLocations() {
    const url ="https://stajprojewebapi.azurewebsites.net/";
    var row = [];
    var marker = [];
    row.push(L.latLng(41.117308, 28.849629));
    marker.push(L.marker([41.117308, 28.849629]));
    await fetch(REACT_APP_WEB_API+`status`)
      .then((response) => response.json())
      .then((usefulData) => {
        usefulData.map((value) => {
          row.push(L.latLng(value.latitude, value.longitude)),
            marker.push(L.marker([value.latitude, value.longitude]));
        });
        row.push(L.latLng(41.111965, 28.876416));
        marker.push(L.marker([41.111965, 28.876416]));

        this.locations = row;
        for (var i = 0; i < marker.length; i++) {
          if (i == 0 || i == marker.length - 1) {
            marker[i].setIcon(
              L.AwesomeMarkers.icon({
                prefix: "fa",
                icon: "home",
                markerColor: "green",
              })
            );
          } else {
            marker[i].setIcon(
              usefulData[i - 1].status
                ? L.AwesomeMarkers.icon({
                    prefix: "fa",
                    icon: "bank",
                    markerColor: "blue",
                  })
                : L.AwesomeMarkers.icon({
                    prefix: "fa",
                    icon: "home",
                    markerColor: "red",
                  })
            );
          }
        }
      })
      .catch((e) => {
        console.error(`An error occurred: ${e}`);
      });
    this.markers = marker;
  }
  async initMap() {
    const map = L.map("map", {
      center: [51.505, -0.09],
      zoom: 5,
    });
    L.tileLayer("https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=b42991387703414f898c4eb4b42deb66", {
      attribution:
        'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(map);
    const router = L.Routing.control({
      waypoints: this.locations.length > 2 ? this.locations : [],
      router: L.Routing.graphHopper("0915b664-ad7d-4e29-97c0-1173263a372c", {
        urlParameters: {
          edge_based: true,
          calc_points: true,
          consider_traffic: true,
          "ch.disabled": true,
          vehicle: "car_delivery",
          turn_cost: true,
          optimize: true,
          weighting: "shortest",
          locale: "tr",
          configuration: {
            routing: {
                network_data_provider:"tomtom",
                  
                consider_traffic:true
            }
          }
        },
      }),
      lineOptions: {
        styles: [{ color: "#1e24c9", weight: 5 }],
      },
      showAlternatives: true,
      addWaypoints: false,
      routeWhileDragging: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      createMarker: function () {
        return null;
      },
      altLineOptions: {
        styles: [
          { color: "black", opacity: 0.15, weight: 9 },
          { color: "white", opacity: 0.8, weight: 6 },
          { color: "blue", opacity: 0.5, weight: 2 },
        ],
      },
    }).addTo(map);
    if (this.markers.length > 2) {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].bindPopup("&dollar;").openPopup();
        this.markers[i].addTo(map);
      }
    }
    if (this.locations.length == 2) {
      alert("Teslimat noktası bulunamadı");
      window.location.href = "/table";
    }
    router.on("routesfound", async function (e) {
      var routes = await e.routes;
      var summary = routes[0].summary;
      const url ="https://stajprojewebapi.azurewebsites.net/";
      fetch(REACT_APP_WEB_API+
        "savedetails/" +
          summary.totalDistance / 1000 +
          "/" +
          Math.round((summary.totalTime % 3600) / 60) +
          "/" +
          routes[0].actualWaypoints.length,
        {
          method: "post",
        }
      );
    });
    L.easyPrint({
      title: "Kaydet",
      position: "bottomleft",
      sizeModes: ["Current", "A4Landscape", "A4Portrait"],
      exportOnly: true,
      hideControlContainer: true,
      exportLayers: true,
      printModes: ["Auto", "Custom"],
    }).addTo(map);
    L.Control.extend({
      options: {
        position: 'bottomright' 
      },
      onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        container.style.backgroundColor = 'white';
        container.style.width = '30px';
        container.style.height = '30px';
        container.onclick = function(){
        alert('buttonClicked');
        }
        return container;
        }
    })
    this.setState({ map, router }); 
  }
  async screeShot(map) {
    let pluginOptions = {
      cropImageByInnerWH: true,
      hidden: false,
      preventDownload: false,
      domtoimageOptions: {},
      position: "topleft",
      screenName: "screen",
      iconUrl: <LocalAtmIcon />,
      hideElementsWithSelectors: [".leaflet-control-container"],
      mimeType: "image/png",
      caption: null,
      captionFontSize: 15,
      captionFont: "Arial",
      captionColor: "black",
      captionBgColor: "white",
      captionOffset: 5,
      onPixelDataFail: async function ({
        node,
        plugin,
        error,
        mapPane,
        domtoimageOptions,
      }) {
        return plugin._getPixelDataOfNormalMap(domtoimageOptions);
      },
    };
    this.simpleMapScreenshoter =
    L.simpleMapScreenshoter(pluginOptions).addTo(map);
    let format = "canvas";
    let overridedPluginOptions = {
      mimeType: "image/jpeg",
    };
    this.simpleMapScreenshoter
      .takeScreen(pluginOptions)
      .then(async (image) => {
         //this.base64string(blob);   
        // saveAs(image,"screen.png"); 
      })
      .catch((e) => {
        console.error(e);
      });
      
  }

   base64string(blob) {
    var reader = new FileReader();
    var data;
    reader.readAsDataURL(blob);
    reader.onloadend = async function () {
      data =  reader.result;
      var formdata=new FormData();
      formdata.append("file",data);
      
      await fetch(REACT_APP_WEB_API+"postimage", {
        method: "post",
        body:formdata
      });
      console.log(data);
    };
    return data;
  }

  render() {
    return (
      <View style={styles.container}>
        <div id="map" style={styles.map} />       
        <Button color="info"  variant="contained" style={styles.customButton} onClick={this.showModal}>Dosya yükleme</Button> 
        <Modal  open={this.state.show} onClose={this.hideModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <FileUpload/>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  customButton:{
    position: "absolute",
    bottom: "20px",
    right: "20px",
    padding: "10px",
    zIndex: 400
  }
});
