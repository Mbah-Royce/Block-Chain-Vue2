<template>
  <div id="mapContainer" class="basemap">
    <modal
      name="my-first-modal"
      :width="600"
      :height="550"
      :adaptive="true"
      :style="['background-color: #152733;']"
    >
      <div class="form-body" style="background-color: #152733">
        <div class="row">
          <div class="form-holder">
            <div class="form-content">
              <div class="form-items">
                <form class="requires-validation" @submit.prevent="transfer()">
                  <div class="col-md-12 mb-1">
                    <label for="gender">Sender: </label>
                    <input
                      class="form-control"
                      type="text"
                      name="name"
                      placeholder="Sender"
                      required
                      :value="this.userTransInfo.sender"
                    />
                  </div>
                  <div class="col-md-12 mb-1">
                    <label for="gender">Reciever: </label>
                    <input
                      class="form-control"
                      type="text"
                      name="name"
                      placeholder="Reciever"
                      required
                      :value="this.userTransInfo.reciever"
                    />
                  </div>
                  <div class="col-md-12 mb-1">
                    <label for="gender">Area: </label>
                    <input
                      class="form-control"
                      type="text"
                      name="name"
                      placeholder="Area"
                      required
                      v-model="polygonArea"
                    />
                  </div>

                  <div class="col-md-12 mb-1">
                    <label for="gender">Transaction Type: </label>
                    <input
                      class="form-control"
                      type="text"
                      name="name"
                      :value="this.userTransInfo.transactionType"
                    />
                  </div>

                  <div class="form-button mt-3">
                    <button id="submit" type="submit" class="btn btn-primary">
                      Transfer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import CalculateArea from "../Services/CalculateArea";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { mapActions, mapGetters } from "vuex";
// import axiosInstance from '../Services/AxiosInterceptor'
export default {
  name: "BaseMap",
  data() {
    return {
      userTransInfo: "",
      polygonArea: "",
      feature: "",
      draws: "",
      accessToken:
        "pk.eyJ1IjoidG9sb3MiLCJhIjoiY2wyazc1NWF0MTN1bjNpcDlweWltd3llYSJ9.bVFjRx__5fhAvYndMv51gw",
    };
  },
  created() {
  },
  async mounted() {
    await this.getUserLand();
    this.feature = this.$store.getters["transaction/getFeatures"];
    this.userTransInfo = this.$store.getters["transaction/getPerTransInfo"];
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
      defaultMode: "draw_polygon",
    });
    map.addControl(draw, "top-left");
    //     var feature = {
    //       id: "1a4236b80b1f34b1c4adefccb039d434",
    //       type: "Feature",
    //       properties: {},
    //       geometry: {
    //         coordinates: [
    //        [
    //     [
    //         -91.87390095979836,
    //         42.78897907974647
    //     ],
    //     [
    //         -91.90445933435558,
    //         42.770834374541636
    //     ],
    //     [
    //         -91.83819229739643,
    //         42.77726123241558
    //     ],
    //     [
    //         -91.83115829085445,
    //         42.7916108830978
    //     ],
    //     [
    //         -91.87390095979836,
    //         42.78897907974647
    //     ]
    // ],
    //         ],
    //         type: "Polygon",
    //       },
    //     };
    // var feature1 = {
    //   id: "33d4b51d8390782bfe77f6fcc4d9b5ed",
    //   type: "Feature",
    //   properties: {},
    //   geometry: {
    //     coordinates: [
    //       [
    //         [-91.86617552802893, 42.78532536531904],
    //         [-91.90686280201705, 42.77196857439469],
    //         [-91.85759171495062, 42.770456303308066],
    //         [-91.86617552802893, 42.78532536531904],
    //       ],
    //     ],
    //     type: "Polygon",
    //   },
    // };
    // var turf = require("@turf/turf");
    // var difference = turf.difference(feature, feature1);
    // var feature = { type: 'Point', coordinates: [-91.83623641342903, 42.77902706230125] };
    // draw.add(feature);
    // draw.add(feature1);
    // draw.add(difference);

    // console.log(difference);
    // console.log(featureIds);
    var vueInstance = this;
    if(vueInstance.feature){
          vueInstance.feature.forEach(element => {
      draw.add(element);
    });
    }
    // draw.add(vueInstance.feature[19]);
    map.on("draw.selectionchange", function () {
      vueInstance.show();
    });
    map.on("draw.create", function () {
      const data = draw.getAll();
      console.log(data.features, "yyyy");
      if (data.features.length > 0) {
        const area = CalculateArea.getErrorMessageFromResponse(data);
        const rounded_area = Math.round(area * 100) / 100;
        vueInstance.show();
        vueInstance.polygonArea = rounded_area;
        vueInstance.feature = data.features;
      }
    });
    map.on("draw.delete", function (e) {
      // const data = this.draw.getAll();
      console.log(e.features);
    });
    map.on("draw.update", function (e) {
      // const data = this.draw.getAll();
      console.log(e.features);
    });
  },
  methods: {
    ...mapGetters("transaction", {
      userPersonnelInfo: "getPerTransInfo",
    }),
    ...mapActions("transaction", {
      issueCertificate: "issueCertificate",
      getFeature: "getFeatures",
      getUserLand: "getUserLand",
    }),
    updateArea() {
      const data = this.draw.getAll();
      console.log(data);
    },
    show() {
      this.$modal.show("my-first-modal");
    },
    hide() {
      this.$modal.hide("my-first-modal");
    },
    set(param) {
      console.log(param);
    },
    async transfer() {
      this.loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
      });
      if (this.userTransInfo.transactionType == "wholeLand") {
        console.log(this.feature[0].geometry.coordinates[0]);
        await this.issueCertificate({
          reciever: this.userTransInfo.reciever,
          sender: this.userTransInfo.sender,
          area: this.polygonArea,
          id: this.feature[0].id,
          coordinates: this.feature[0].geometry.coordinates[0],
          type: this.feature[0].geometry.type,
        });
        this.loader.hide();
        this.$notify({ type: "success", text: "The operation completed" });
        this.hide();
        this.$router.push("/createCertificate");
      }
    },
    async loadFeature() {
      await this.getFeature();
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