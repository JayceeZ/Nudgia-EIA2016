/**
 * Created by alexandre on 21/06/16.
 */

var openStreetMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 20,
  id: 'traxxs.ol4dhdm1',
  accessToken: 'pk.eyJ1IjoidHJheHhzIiwiYSI6ImNpajV0eHl4NDAwM253OG0zejB1MWhuczQifQ.XZvLZsm6bio9CjRXnaVPHA'
});

var googleStreets = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

var googleSat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

var googleTerrain = L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

var baseMaps = {
  "OpenStreetMap": openStreetMap,
  "Google Streets": googleStreets,
  "Google Satellite": googleSat,
  "Google Terrain": googleTerrain
};

window.MapContainer = React.createClass({
    getInitialState:function(){
        return {}
    },
    map:null,
    componentDidMount:function(){
      this.map = L.map('map',{zoomControl:false}).setView([43.62216, 7.00241], 12);
      openStreetMap.addTo(this.map);
      L.control.layers(baseMaps).addTo(this.map);
      L.control.zoom({position:"topright"}).addTo(this.map);
      this.props.getMapFocus(this.focusOnPicture);
      this.map.addLayer(this.currentMarkers);
      this.componentDidUpdate();
    },
    currentMarkers:L.featureGroup(),
    componentDidUpdate:function(){
      this.currentMarkers.clearLayers();
      for(var picId in this.props.userPictures){
        this.currentMarkers.addLayer(buildMarker(picId,this.props.userPictures[picId]))
      }
      this.focusOnFeatureGroup(this.currentMarkers);
    },
    focusOnPicture:function(pictureId){

      if(!zoomLevel)
        zoomLevel = 19;
      //this.map.fitBounds(featureGroup.getBounds(), {paddingTopLeft: [405, 100], maxZoom: zoomLevel});
    },
    focusOnFeatureGroup:function(featureGroup,zoomLevel){
      if(!featureGroup || layerGroupCount(featureGroup) == 0) return;
      if(!zoomLevel)
        zoomLevel = 19;
      this.map.fitBounds(featureGroup.getBounds(), {paddingTopLeft: [0, 0], maxZoom: zoomLevel});
    },
    render:function(){
      return(
        <div id="map" style={{height:"100%",width:"100%"}}></div>
      )
    }
});

var greenCarIconUrl = "styles/images/greenCarIcon.png";
var redCarIconUrl = "styles/images/redCarIcon.png";
var ICON_SIZE = 25;

function buildMarker(picId, picData){
  var marker = L.marker([picData.lat,picData.lon]);
  var iconUrl = greenCarIconUrl;
  if(picData.drivingStatus != "good")
    iconUrl = redCarIconUrl;
  var iconHtml = '<div><img class="marker-icon" src="'+iconUrl+'" width="100%" ></div>';
  marker.setIcon(buildIcon(ICON_SIZE,iconHtml));
  marker.bindPopup(buildPopup(picId,picData));
  return marker;
}

function buildIcon(size, html, classname){
  if(!classname)
    classname = "";
  return new L.divIcon({
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
    popupAnchor: [0, -size/2],
    html: html,
    className: classname
  });
}

function buildPopup(picId,picData){
  var popup = document.createElement('div');
  popup.className = "driver-popup";
  var alert = "";
  if(picData.drivingStatus != "good")
    alert = "<li><h6 class='popup-alert'>"+picData.drivingStatus+"</h6></li>";
  popup.innerHTML = '<ul><li><h6 class="popup-timestamp">'+picData.timestamp+'</h6></li>' +
    '<li><img class="popup-picture" src="'+picData.url+'" onClick="onPopupPictureClick('+picId+')"/></li>' + alert +
    '</ul>';
  return popup;
}

function layerGroupCount(group){
  var count = 0;
  group.eachLayer(function(layer){
    if(layer.getLayers)
      count += layerGroupCount(layer);
    else
      count ++;
  });
  return count;
}