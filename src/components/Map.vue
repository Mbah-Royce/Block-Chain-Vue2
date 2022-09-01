<template>
  <div id="mapContainer" class="basemap"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { mapActions } from "vuex";

export default {
  emits: ['onChange'],

  props: {
    transactionType: String,
    id: String,
  },
  watch: {
    id: function (newVal) {
      if(newVal){
      alert(newVal);
      this.getFeature()
   }
    },
  },
  name: "BaseMap",
  data() {
    return {
      land:"",
      accessToken:
        "pk.eyJ1IjoidG9sb3MiLCJhIjoiY2wyazc1NWF0MTN1bjNpcDlweWltd3llYSJ9.bVFjRx__5fhAvYndMv51gw",
    };
  },
  mounted() {
    alert(this.id)
    this.land = this.$store.getters["map/getFeature"];
    console.log(this.land);

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
    if(this.id){
      draw.add(this.land)
    }
  },
  methods: {
    ...mapActions("map", {
      fetchFeature: "getFeature",
      fetchPartition: "getPartition",
    }),
    async getFeature() {
      if (this.transactionType == "whole-land" && this.id) {
        await this.fetchFeature({ id: this.id });
        this.land = this.$store.getters["map/getFeature"];
        this.$emit('onChange')
        console.log(this.land);
      } else if(this.transactionType == "whole-partition"){
        await this.fetchPartition({ id: this.id });
        this.land = this.$store.getters["map/getFeature"];
        this.$emit('onChange')
        console.log(this.land);
      }else{
        alert('not a valid transaction')
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.basemap {
  width: 52%;
  height: 700px;
  background-color: red;
  margin-left: 10px;
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