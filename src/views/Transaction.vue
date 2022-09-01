<template>
  <div class="con">
    <div class="card"  :class="{ active: true }">
      <div class="card-title mx-auto">Transaction</div>
      <form @submit.prevent="handleSubmit()">
        <span id="card-header">Public Keys:</span>
        <div class="row row-1">
          <div class="col-1"><i class="fa fa-lock" aria-hidden="true"></i></div>
          <div class="col-7">
            <input
              class="text-input"
              type="text"
              disabled
              :value="this.user[0]"
            />
          </div>
          <div class="col-4 d-flex justify-content-center">Your Pub Key</div>
        </div>
        <div class="row row-1">
          <div class="col-1"><i class="fa fa-lock" aria-hidden="true"></i></div>
          <div class="col-7">
            <input
              class="text-input"
              type="text"
              placeholder="**** **** ****"
              v-model="reciever"
            />
          </div>
          <div class="col-4 d-flex justify-content-center">
            Receiver Pub Key
          </div>
        </div>
        <span id="card-header">Transaction Type:</span>
        <div style="margin-top: 10px">
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="whole-land"
              v-model="type"
              checked
            />
            <label class="form-check-label" for="inlineRadio1"
              >Whole Land</label
            >
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="portion-title"
              v-model="type"
            />
            <label class="form-check-label" for="inlineRadio2"
              >Partition From Title</label
            >
          </div>
          <!-- <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="portion-portion"
              v-model="type"
            />
            <label class="form-check-label" for="inlineRadio2"
              >Partition From Portion</label
            >
          </div> -->
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="whole-partition"
              v-model="type"
            />
            <label class="form-check-label" for="inlineRadio2"
              >Whole Portion
            </label>
          </div>
        </div>
        <div v-if="type === 'portion-title'">
          {{ (subBtnTxt = "swer") }}
          <div class="form-group py-1">
            <label for="exampleFormControlSelect1" id="card-header"
              >Select Title</label
            >
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              v-model="selectedCertificate"
            >
              <option
                v-for="(certificate, index) in validCertificates"
                v-bind:key="index"
                v-bind:value="certificate.serial_no"
                :selected="index == 0"
              >
                {{ certificate.owner_name }} {{ certificate.serial_no }}
                {{ certificate.partitioned }}
              </option>
            </select>
          </div>
        </div>
        <div v-else-if="type === 'whole-land'">
          {{ (subBtnTxt = "Transfer") }}
          <div class="form-group py-1">
            <label for="exampleFormControlSelect1" id="card-header"
              >Select Title</label
            >
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              v-model="selectedCertificate"
            >
              <option
                v-for="(certificate, index) in certificates"
                v-bind:key="index"
                v-bind:value="certificate.serial_no"
                :selected="index == 0"
              >
                {{ certificate.owner_name }} {{ certificate.serial_no }} 
              </option>
            </select>
          </div>
        </div>
        <div v-else-if="type === 'portion-portion'">
          {{ (subBtnTxt = "Transfer") }}
          <div class="form-group py-1">
            <label for="exampleFormControlSelect1" id="card-header"
              >Select Title</label
            >
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              v-model="selectedPortion"
            >
              <option
                v-for="(portion, index) in portions"
                v-bind:key="index"
                v-bind:value="portion.id"
                :selected="index == 0"
              >
                {{ portion.id }}
              </option>
            </select>
          </div>
        </div>
        <div v-else-if="type === 'whole-partition'">
          {{ (subBtnTxt = "Transfer") }}
          <div class="form-group py-1">
            <label for="exampleFormControlSelect1" id="card-header"
              >Select Title</label
            >
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              v-model="selectedCertificate"
            >
              <option
                v-for="(portion, index) in portions"
                v-bind:key="index"
                v-bind:value="portion.id"
                :selected="index == 0"
              >
                {{ portion.id }}
              </option>
            </select>
          </div>
        </div>
        <div v-else>
          <div class="form-group py-1">
            <label for="exampleFormControlSelect1" id="card-header"
              >Select Portion</label
            >
          </div>
        </div>
        <button class="btn d-flex mx-auto btn-bg rounded-pill">
          <b>Draw</b>
        </button>
      </form>
    </div>
    <Map :key="componentKey" @onChange="reloadMap" v-if="(type == 'whole-land' || type == 'whole-partition')" :transactionType="type" :id="id"/>
  </div>
</template>

<script>
import axiosInstance from "../Services/AxiosInterceptor";
import { mapActions, mapMutations } from "vuex";
import {
  TRANSATION_SUBMIT,
  GET_USER_DATA,
  GET_USER_TOKEN_GETTER,
} from "../store/StoreConstants";
import Map from '../components/Map.vue'
export default {
  components:{
    Map
  },
  created() {
    this.getPartitions();
    this.getCertificates();
    this.getValidCertificates();
  },
  mounted() {
    this.user = this.$store.getters[`auth/${GET_USER_DATA}`];
    this.token = this.$store.getters[`auth/${GET_USER_TOKEN_GETTER}`];
    // this.$store.commit["map/setFeature",null];
  },
  data() {
    return {
      subBtnTxt: "Draw",
      user: [],
      id:null,
      token: null,
      componentKey:0,
      type: null,
      reciever: null,
      selectedPortion: null,
      selectedCertificate: null,
      area: null,
      certificates: [],
      validCertificates: [],
      portions: [],
      loader: null,
    };
  },
    watch:{
    selectedCertificate(newVal){
      this.id = newVal;
      // this.componentKey=!this.componentKey
    },
    selectedPortion(newVal){
      this.id = newVal
      // this.componentKey=!this.componentKey

    }
  },
  methods: {
    reloadMap(){
    this.componentKey=!this.componentKey
    // console.log(event.target.value)

    },
    ...mapActions("auth", {
      transaction: TRANSATION_SUBMIT,
    }),
    ...mapActions("transaction", {
      transaction: "submitTrasaction",
    }),
    ...mapMutations("transaction", {
      setTransPersonnelInfo: "setPersonnleTransactionInfo",
    }),
    async handleSubmit() {
      if (this.type == "whole-land") {
        await this.transaction({
          reciever: this.reciever,
          sender: this.user[0],
          type: this.type,
          serial_no: this.selectedCertificate,
          message: this.reciever+" recieved"+ "portion of id "+this.selectedPortion+" from "+this.sender
        });
      } else if (this.type == "portion-title") {
        this.setTransPersonnelInfo({
          reciever: this.reciever,
          sender: this.user[0],
          transactionType: "portion-title",
        });
        this.$router.push("/draw/whole-land/" + this.selectedCertificate);
      } else if (this.type == "portion-portion") {
        this.setTransPersonnelInfo({
          reciever: this.reciever,
          sender: this.user[0],
          transactionType: "portion-portion",
        });
        this.$router.push("/draw/portion/" + this.selectedCertificate);
      } else if (this.type == "whole-partition") {
        await this.transaction({
          reciever: this.reciever,
          sender: this.user[0],
          type: this.type,
          partitionId: this.selectedPortion,
          message: this.reciever+" recieved"+ "portion of id "+this.selectedCertificate+" from "+this.sender
        });
      }
    },
    textToBin(text) {
      var length = text.length,
        output = [];
      for (var i = 0; i < length; i++) {
        var bin = text[i].charCodeAt().toString(2);
        output.push(Array(8 - bin.length + 1).join("0") + bin);
      }
      return output.join(" ");
    },
    async getPartitions() {
      await axiosInstance
        .get("user/partitions/info")
        .then((response) => {
          // console.log(response.data.data);
          this.portions = response.data.data;
          console.log(this.portions);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getCertificates() {
      await axiosInstance
        .get("user/lands/info")
        .then((response) => {
          // console.log(response.data.data);
          this.certificates = response.data.data;
          console.log(this.certificates);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getValidCertificates() {
      await axiosInstance
        .get("user/valid/land")
        .then((response) => {
          // console.log(response.data.data);
          this.validCertificates = response.data.data;
          console.log(response, "dsdsdd");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
body {
  min-height: 100vh;
  vertical-align: middle;
  display: flex;
}
.active{
  margin: auto;
}
.con {
  padding-top: 25px;
  display: flex;
  flex-direction: row;
  margin-top: 0px;
  /* background: url("../../public/rm222batch5-kul-21.jpg") center; */
  /* background-size: cover; */
  height: 100vh;
  background-attachment: fixed;
}
.card {
  background: url("../../public/rm222batch5-kul-21.jpg") center;
  background-size: cover;
  height: 100vh;
  /* margin: auto; */
  width: 48%;
  padding: 3rem 3.5rem;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.mt-50 {
  margin-top: 50px;
}

.mb-50 {
  margin-bottom: 50px;
}

@media (max-width: 767px) {
  .card {
    width: 90%;
    padding: 1.5rem;
  }
}

@media (height: 1366px) {
  .card {
    width: 90%;
    padding: 8vh;
  }
}

.card-title {
  font-weight: 700;
  font-size: 2.5em;
}

.nav {
  display: flex;
}

.nav ul {
  list-style-type: none;
  display: flex;
  padding-inline-start: unset;
  margin-bottom: 6vh;
}

.nav li {
  padding: 1rem;
}

.nav li a {
  color: black;
  text-decoration: none;
}

.active {
  border-bottom: 2px solid black;
  font-weight: bold;
}

.text-input {
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 600;
  color: #000;
  width: 100%;
  min-width: unset;
  background-color: transparent;
  border-color: transparent;
  margin: 0;
}

form a {
  color: grey;
  text-decoration: none;
  font-size: 0.87rem;
  font-weight: bold;
}

form a:hover {
  color: grey;
  text-decoration: none;
}

form .row {
  margin: 0;
  overflow: hidden;
}

form .row-1 {
  border: 1px solid rgba(0, 0, 0, 0.137);
  padding: 0.5rem;
  outline: none;
  width: 100%;
  min-width: unset;
  border-radius: 5px;
  background-color: rgba(221, 228, 236, 0.301);
  border-color: rgba(221, 228, 236, 0.459);
  margin: 2vh 0;
  overflow: hidden;
}

form .row-2 {
  border: none;
  outline: none;
  background-color: transparent;
  margin: 0;
  padding: 0 0.8rem;
}

form .row .row-2 {
  border: none;
  outline: none;
  background-color: transparent;
  margin: 0;
  padding: 0 0.8rem;
}

form .row .col-2,
.col-7,
.col-3 {
  display: flex;
  align-items: center;
  text-align: center;
  padding: 0 1vh;
}

form .row .col-2 {
  padding-right: 0;
}

#card-header {
  font-weight: bold;
  font-size: 0.9rem;
}

#card-inner {
  font-size: 0.7rem;
  color: gray;
}

.three .col-7 {
  padding-left: 0;
}

.three {
  overflow: hidden;
  justify-content: space-between;
}

.three .col-2 {
  border: 1px solid rgba(0, 0, 0, 0.137);
  padding: 0.5rem;
  outline: none;
  width: 100%;
  min-width: unset;
  border-radius: 5px;
  background-color: rgba(221, 228, 236, 0.301);
  border-color: rgba(221, 228, 236, 0.459);
  margin: 2vh 0;
  width: fit-content;
  overflow: hidden;
}

.three .col-2 input {
  font-size: 0.7rem;
  margin-left: 1vh;
}

.btn {
  width: 100%;
  background-color: green;
  border-color: green;
  color: white;
  justify-content: center;
  padding: 2vh 0;
  margin-top: 3vh;
}

.btn:focus {
  box-shadow: none;
  outline: none;
  box-shadow: none;
  color: white;
  -webkit-box-shadow: none;
  transition: none;
}

.btn:hover {
  color: green;
  background-color: white;
}

input:focus::-webkit-input-placeholder {
  color: transparent;
}

input:focus:-moz-placeholder {
  color: transparent;
}

input:focus::-moz-placeholder {
  color: transparent;
}

input:focus:-ms-input-placeholder {
  color: transparent;
}
</style>
