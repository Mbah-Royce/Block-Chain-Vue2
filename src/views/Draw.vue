<template>
  <div v-if="land" id="mapContainer" class="basemap">
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
                    <label for="sender">Sender: </label>
                    <input
                      class="form-control"
                      type="text"
                      name="sedner"
                      placeholder="Sender"
                      required
                      :value="this.userTransInfo.sender"
                    />
                  </div>
                  <div class="col-md-12 mb-1">
                    <label for="reciever">Reciever: </label>
                    <input
                      class="form-control"
                      type="text"
                      name="reciever"
                      placeholder="Reciever"
                      required
                      :value="this.userTransInfo.reciever"
                    />
                  </div>
                  <div class="col-md-12 mb-1">
                    <label for="area">Area: </label>
                    <input
                      class="form-control"
                      type="text"
                      name="area"
                      placeholder="Area"
                      required
                      v-model="reciever_area"
                    />
                  </div>

                    <div class="col-md-12 mb-1">
                    <label for="remaining_area">Remaining Area: </label>
                    <input
                      class="form-control"
                      type="text"
                      name="remaining_area"
                      placeholder="Area"
                      required
                      v-model="sender_area"
                    />
                  </div>

                  <div class="col-md-12 mb-1">
                    <label for="transaction_type">Transaction Type: </label>
                    <input
                      class="form-control"
                      type="text"
                      name="transaction_type"
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
      land:"",
      reciever_area: "",
      feature: "",
      senderFeature:"",
      draws: "",
      sender_area:"",
      accessToken:
        "pk.eyJ1IjoidG9sb3MiLCJhIjoiY2wyazc1NWF0MTN1bjNpcDlweWltd3llYSJ9.bVFjRx__5fhAvYndMv51gw",
    };
  },
  async created() {
    // this.$store.dispatch('map/getFeatures',{id:this.$route.params.id})
    this.userTransInfo = this.$store.getters["transaction/getPerTransInfo"];
    this.$watch( () => this.$route.params,await this.getFeature())
  },
  async mounted() {
    await this.getFeature()
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
//         var feature = {
//           id: "",
//           type: "Feature",
//           properties: [],
//           geometry: {
//             coordinates: [
//     [
//         [
//             -91.8563486639,
//             42.754967040795
//         ],
//         [
//             -91.835753230442,
//             42.752446576481
//         ],
//         [
//             -91.82682854261,
//             42.775253044529
//         ],
//         [
//             -91.853259348881,
//             42.774749124906
//         ],
//         [
//             -91.8554345644719,
//             42.76082037451498
//         ],
//         [
//             -91.85372599305535,
//             42.76026133547734
//         ],
//         [
//             -91.85557084606863,
//             42.759947710512535
//         ],
//         [
//             -91.8563486639,
//             42.754967040795
//         ]
//     ]
// ],
//             type: "Polygon",
//           },
//         };
    // console.log(feature)
    // feature.id = this.land.id
    // feature.geometry.coordinates = JSON.parse(JSON.stringify(this.land.geometry.coordinates))
    // console.log(feature)
    var feature1 = {
      id: "",
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [
    [
        [
            -91.861551895829,
            42.763488385424
        ],
        [
            -91.857844882965,
            42.763602736181
        ],
        [
            -91.857143977172,
            42.765569536166
        ],
        [
            -91.860103357189,
            42.765443754315
        ],
        [
            -91.861551895829,
            42.763488385424
        ]
    ],
    [
        [
            -91.85968100655603,
            42.76394004146371
        ],
        [
            -91.85922844179335,
            42.76470677611928
        ],
        [
            -91.85804481087634,
            42.7646556607707
        ],
        [
            -91.85851478197579,
            42.76392726247175
        ],
        [
            -91.85968100655603,
            42.76394004146371
        ]
    ]
],
        type: "Polygon",
      },
    };
    console.log(feature1.geometry.coordinates[1]);
    var turf = require("@turf/turf");
    // var difference = turf.difference(this.land, feature);
    // var feature = { type: 'Point', coordinates: [-91.83623641342903, 42.77902706230125] };
    // draw.add(feature1);
    // draw.add(feature);
    // this.sender_area = 
    // alert(CalculateArea.getErrorMessageFromResponse(difference))

    draw.add(this.land)
    var vueInstance = this;

    // var polygon2 = turf.polygon(JSON.parse(JSON.stringify(this.land.geometry.coordinates)));
    map.on("draw.selectionchange", function () {
      vueInstance.show();
    });
    map.on("draw.create", function () {
      const data = draw.getAll();
      console.log(data.features, "yyyy");
      if (data.features.length > 0) {
        const area = CalculateArea.getErrorMessageFromResponse(data); 
        const rounded_area = (Math.round(area * 100) / 100);alert(rounded_area)
        vueInstance.senderFeature = turf.difference(vueInstance.land,data.features[0])       
        var sender_area = CalculateArea.getErrorMessageFromResponse(vueInstance.senderFeature)
        vueInstance.sender_area = Math.round(sender_area * 100) / 100 
        vueInstance.show(); 
        vueInstance.reciever_area = (Math.round((rounded_area - (vueInstance.land.area)) * 100) / 100) ;
        vueInstance.feature = data.features;
        console.log(vueInstance.senderFeature)

        // const area = CalculateArea.getErrorMessageFromResponse(data); 
        // const rounded_area = (Math.round(area * 100) / 100);
        // vueInstance.senderFeature = turf.difference(vueInstance.land,data.features[0]) 
        // var sender_area = CalculateArea.getErrorMessageFromResponse(vueInstance.senderFeature)
        // vueInstance.sender_area = Math.round(sender_area * 100) / 100 ;alert(sender_area)
        // vueInstance.reciever_area = Math.round((vueInstance.land.area - vueInstance.sender_area) * 100) / 100 ;
        // console.log(vueInstance.senderFeature)


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
      submitPartitionTitleTrans: "partitionTitleTrasaction",
      getUserLand: "getUserLand",
    }),
    ...mapActions("map",{
        fetchFeature: "getFeature",
        fetchPartition: "getPartition"
    }),
    async getFeature(){
    if(this.$route.params.aspect == 'whole-land'){
        await this.fetchFeature({id:this.$route.params.id})
        this.land = this.$store.getters["map/getFeature"];
        console.log(this.land)
    }else{
        await this.fetchPartition({id:this.$route.params.id})
        this.land = this.$store.getters["map/getFeature"];
        console.log(this.land)
        // await axiosInstance
        // .get("partition/"+this.$route.params.id)
        // .then((response) => {
        //   // console.log(response.data.data);
        //   this.land = response.data.data;
        //   console.log(this.land);
        // })
        // .catch((error) => {
        //   console.log(error);
        // });
    }

    },
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
      if (this.userTransInfo.transactionType == "portion-title") {
        console.log(this.senderFeature,"kklk");
        await this.submitPartitionTitleTrans({
          message: this.userTransInfo.reciever + "gave" + this.polygonArea + "to" + this.userTransInfo.sender +"from land with serial number" + this.$route.params.id,
          serial_no:this.$route.params.id,

          reciever: this.userTransInfo.reciever,
          reciever_area: this.reciever_area,
          reciever_feature_id: this.feature[0].id,
          reciever_feature_coordinates: this.feature[0].geometry.coordinates[0],
          reciever_feature_type: this.feature[0].geometry.type,

          sender: this.userTransInfo.sender,
          sender_area: this.sender_area,
          sender_feature_coordinates: this.senderFeature.geometry.coordinates,
          sender_feature_type: this.senderFeature.geometry.type,
          sender_feature_coordinate_length: this.senderFeature.geometry.coordinates.length

        });
        this.loader.hide();
        this.$notify({ type: "success", text: "The operation completed" });
        this.hide();
        this.$router.push("/transaction");
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
  padding: 15px 60px;
}

.form-content .form-items {
  border: 3px solid #fff;
  padding: 0px 40px;
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