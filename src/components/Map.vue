<template>
  <div id="mapContainer" class="basemap"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

export default {
  props:{
    transactionType:String,
    receiver:String,
    sender:String
  },
  name: "BaseMap",
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoidG9sb3MiLCJhIjoiY2wyazc1NWF0MTN1bjNpcDlweWltd3llYSJ9.bVFjRx__5fhAvYndMv51gw",
    };
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;

    const map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [-91.874, 42.76],
      zoom: 12,
    });
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "top-right");
    new mapboxgl.Marker().setLngLat([103.811279, 1.345399]).addTo(map);
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      // Select which mapbox-gl-draw control buttons to add to the map.
      controls: {
        polygon: true,
        trash: true,
      },
      // Set mapbox-gl-draw to draw by default.
      // The user does not have to click the polygon control button first.
      defaultMode: "draw_polygon",
    });
    map.addControl(draw,'top-right');

    map.on("draw.create", this.updateArea());
    map.on("draw.delete", this.updateArea());
    map.on("draw.update", this.updateArea());
  },
  methods:{
      updateArea(){

      }
  }
};
</script>
<style lang="scss" scoped>
.basemap {
  width: 100%;
  height: 700px;
  background-color: red;
}
.calculation-box {
  height: 75px;
  width: 150px;
  position: absolute;
  bottom: 40px;
  left: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px;
  text-align: center;
}

p {
  font-family: "Open Sans";
  margin: 0;
  font-size: 13px;
}
</style>