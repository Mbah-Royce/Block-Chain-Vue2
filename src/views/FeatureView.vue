<template>
  <div id="mapContainer" class="basemap">
    <modal
      name="my-first-modal"
      :width="600"
      :height="550"
      :adaptive="true"
      :style="['background-color: #152733;']"
    >
    </modal>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl/dist/mapbox-gl.css";
// import { mapGetters } from "vuex";
import axiosInstance from "../Services/AxiosInterceptor";
// import USER_ROLE_GETTER from '../store/StoreConstants'
export default {
  name: "BaseMap",
  data() {
    return {
      land: "",
      partition: "",
      accessToken:
        "pk.eyJ1IjoidG9sb3MiLCJhIjoiY2wyazc1NWF0MTN1bjNpcDlweWltd3llYSJ9.bVFjRx__5fhAvYndMv51gw",
    };
  },
  created() {},
  async mounted() {
    this.role = this.$store.getters["auth/getRole"];
    alert(this.role);
    if (this.role == "client") {
      alert("user");
      await this.getUserLand();
      await this.getPartitions();
    } else if (this.role == "government") {
      alert("government");
      await this.getAllLand();
      await this.getAllPartitions();
    } else {
      alert("Cannot identify role");
    }

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
    var draw = new MapboxDraw({
      displayControlsDefault: false,
      // Select which mapbox-gl-draw control buttons to add to the map.
      controls: {
        polygon: true,
        trash: true,
      },
      // Set mapbox-gl-draw to draw by default.
      // The user does not have to click the polygon control button first.
      //   defaultMode: "draw_polygon",
    });
    map.addControl(draw, "top-left");

    var vueInstance = this;
    if (vueInstance.land) {
      vueInstance.land.forEach((element) => {
        draw.add(element);
      });
    }
    if (vueInstance.partition) {
      vueInstance.partition.forEach((element) => {
        draw.add(element);
      });
    }
    map.on("draw.selectionchange", function (e) {
      //   vueInstance.show();
      console.log(e);
    });
  },
  methods: {
    async getUserLand() {
      await axiosInstance
        .get("user/lands")
        .then((response) => {
          // console.log(response.data.data);
          this.land = response.data.data;
          console.log(this.land);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getPartitions() {
      await axiosInstance
        .get("user/partitions")
        .then((response) => {
          // console.log(response.data.data);
          this.partition = response.data.data;
          console.log(this.partition);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getAllLand() {
      await axiosInstance.get("government/all-land").then((response) => {
        // console.log(response.data.data);
        this.land = response.data.data;
        console.log(this.land);
      });
    },
    async getAllPartitions() {
      await axiosInstance.get("government/all-partitions").then((response) => {
        // console.log(response.data.data);
        this.partition = response.data.data;
        console.log(this.land);
      });
    },
  },
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
.form-holder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 80vh;
}

.form-holder .form-content {
  position: relative;
  text-align: center;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 60px;
}

.form-content .form-items {
  border: 3px solid #fff;
  padding: 40px;
  display: inline-block;
  width: 100%;
  min-width: 550px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  text-align: left;
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
}

.form-content h3 {
  color: #fff;
  text-align: left;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 5px;
}

.form-content h3.form-title {
  margin-bottom: 30px;
}

.form-content p {
  color: #fff;
  text-align: left;
  font-size: 17px;
  font-weight: 300;
  line-height: 20px;
  margin-bottom: 30px;
}

.form-content label,
.was-validated .form-check-input:invalid ~ .form-check-label,
.was-validated .form-check-input:valid ~ .form-check-label {
  color: #fff;
}

.form-content input[type="text"],
.form-content input[type="password"],
.form-content input[type="email"],
.form-content select {
  width: 100%;
  padding: 9px 20px;
  text-align: left;
  border: 0;
  outline: 0;
  border-radius: 6px;
  background-color: #fff;
  font-size: 15px;
  font-weight: 300;
  color: #8d8d8d;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  margin-top: 16px;
}

.btn-primary {
  background-color: #6c757d;
  outline: none;
  border: 0px;
  box-shadow: none;
}

.btn-primary:hover,
.btn-primary:focus,
.btn-primary:active {
  background-color: #495056;
  outline: none !important;
  border: none !important;
  box-shadow: none;
}

.form-content textarea {
  position: static !important;
  width: 100%;
  padding: 8px 20px;
  border-radius: 6px;
  text-align: left;
  background-color: #fff;
  border: 0;
  font-size: 15px;
  font-weight: 300;
  color: #8d8d8d;
  outline: none;
  resize: none;
  height: 120px;
  -webkit-transition: none;
  transition: none;
  margin-bottom: 14px;
}

.form-content textarea:hover,
.form-content textarea:focus {
  border: 0;
  background-color: #ebeff8;
  color: #8d8d8d;
}

.mv-up {
  margin-top: -9px !important;
  margin-bottom: 8px !important;
}

.invalid-feedback {
  color: #ff606e;
}

.valid-feedback {
  color: #2acc80;
}
</style>