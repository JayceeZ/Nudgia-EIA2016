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
      this.props.getMapFocus(this.focusOnFeatureGroup);
      this.map.addLayer(this.cluster);
      this.componentDidUpdate();
    },
    currentMarkers:null,
    cluster:new L.MarkerClusterGroup({
      iconCreateFunction: buildClusterIcon,
      showCoverageOnHover: true,
      zoomToBoundsOnClick: true,
      spiderfyOnMaxZoom: false,
      disableClusteringAtZoom: 18
    }),
    componentDidUpdate:function(){
      var _this = this;
      this.cluster.clearLayers();
      if(this.currentMarkers)
        this.map.removeLayer(this.currentMarkers);
      if(this.props.currentMarkers){
        if(this.props.clustering){
          this.props.currentMarkers.eachLayer(function (layer) {
            _this.cluster.addLayer(layer);
          });
        }else {
          this.map.addLayer(this.props.currentMarkers);
        }
        this.currentMarkers = this.props.currentMarkers;
        refreshMarkersTopIndex();
      }
    },
    focusOnFeatureGroup:function(featureGroup,zoomLevel){
      if(!featureGroup || layerGroupCount(featureGroup) == 0) return;
      if(!zoomLevel)
        zoomLevel = 19;
      this.map.fitBounds(featureGroup.getBounds(), {paddingTopLeft: [405, 100], maxZoom: zoomLevel});
    },
    render:function(){
      return(
        <div id="map" style={{position:"absolute",bottom:"0",top:"50px",width:"100%"}}></div>
      )
    }
});

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
