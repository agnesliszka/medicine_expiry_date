<template>
  <div id="app">
    <div class="header">
      <div class="controls">
        <label for="base">Base Color</label>
        <input type="color" name="base" v-model="baseColor" />
        <p>{{ baseColor }}</p>
      </div>
      <h1 :style="{ color: getBaseColor }">Medicine expiry date tracker</h1>
      <div class="current-date">
        {{ getCurrentDate }}
      </div>
    </div>
    <div class="container">
      <section>
        <div class="row justify-content-center">
          <button
            v-show="getMedicineList.length > 0"
            @click="showMedicineList"
            class="btn btn-danger"
          >
            <span v-if="getIsActive">Hide Medicine List</span>
            <span v-if="!getIsActive">Show Medicine List</span>
          </button>
          <button @click="changeSortedByNameFlag" class="btn btn-dark">
            {{ getNameButtonText }}
          </button>
          <button @click="changeSortedByDateFlag" class="btn btn-dark">
            {{ getTimeButtonText }}
          </button>
          <button
            v-show="expiredMedicineList.length > 0"
            @click="showExpiredMedicineOnly"
            class="btn btn-danger"
          >
            {{ getButtonText }}
          </button>
        </div>

        <medicine-carts :isMedicineExpired="isMedicineExpired">
        </medicine-carts>
      </section>
      <div class="block">
        <div style="color: white; margin-top: 50px">
          Select date range:
        </div>
        <el-date-picker
          @change="filterResults"
          style="margin-bottom: 20px"
          v-model="timerange"
          type="daterange"
          start-placeholder="Start date"
          end-placeholder="End date"
        >
        </el-date-picker>
      </div>
      <section
        class="container"
        v-show="!getShowExpiredMedicineOnly"
        v-if="getIsActive"
      >
        <div class="row">
          <div class="offset-md-3 col-md-6 mt-3">
            <ul class="list-group justify-content-center">
              <li
                class="row list-group-item border mt-2"
                v-for="medicine in getMedicineList"
                v-bind:key="medicine.id"
              >
                <medicine-cart
                  :medicine="medicine"
                  :isMedicineExpired="isMedicineExpired"
                >
                </medicine-cart>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section class="container" v-if="getFilteredDataShown">
        <div class="row">
          <div class="offset-md-3 col-md-6 mt-3">
            <ul class="list-group justify-content-center">
              <li
                class="row list-group-item border mt-2"
                v-for="medicine in filterResults()"
                v-bind:key="medicine.id"
              >
                <medicine-cart
                  :medicine="medicine"
                  :isMedicineExpired="isMedicineExpired"
                >
                </medicine-cart>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section class="container" v-show="getShowExpiredMedicineOnly">
        <div class="row">
          <div class="offset-md-3 col-md-6 mt-3">
            <ul class="list-group justify-content-center">
              <li
                class="row list-group-item border mt-2"
                v-for="medicine in expiredMedicineList"
                v-bind:key="medicine.id"
              >
                <medicine-cart
                  :medicine="medicine"
                  :isMedicineExpired="isMedicineExpired"
                >
                </medicine-cart>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import MedicineCart from "./components/MedicineCart.vue";
import MedicineCarts from "./components/MedicineCarts.vue";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import axios from "axios";

export default {
  name: "app",
  components: {
    "medicine-cart": MedicineCart,
    "medicine-carts": MedicineCarts
  },
  data() {
    return {
      timerange: ""
    };
  },
  mounted() {
    this.setCurrentDate();
  },
  created() {
    axios
      .get("https://medicineexpirydateproject.firebaseio.com/medicineList.json")
      .then(res => {
        console.log(res);
        const data = res.data;
        const medicineList = [];
        for (let key in data) {
          const medicine = data[key];
          medicine.id = key;
          medicineList.push(medicine);
        }
        this.setMedicineList(medicineList);
      })
      .catch(err => console.log(err));
  },
  computed: {
    ...mapGetters([
      "getBaseColor",
      "getIsActive",
      "getMedicineList",
      "getMedicineNameInput",
      "getShowExpiredMedicineOnly",
      "getFilteredDataShown",
      "getSortedByNameAscendigly",
      "getSortedByDateAscendigly",
      "getCurrentDate",
      "getBaseColor"
    ]),
    baseColor: {
      get() {
        return this.getBaseColor;
      },
      set(baseColor) {
        this.$store.dispatch("updateBaseColor", baseColor);
      }
    },
    getNameButtonText: function() {
      return this.getSortedByNameAscendigly
        ? "Sort by name ascendingly"
        : "Sort by name descendingly";
    },
    getTimeButtonText: function() {
      return this.getSortedByDateAscendigly
        ? "Sort by date ascendingly"
        : "Sort by date descendingly";
    },
    getButtonText: function() {
      return this.getShowExpiredMedicineOnly
        ? "Show all medicines"
        : "Show expired medicine only";
    },
    expiredMedicineList: function() {
      return this.getMedicineList.filter(function(medicine) {
        return medicine.expired;
      });
    }
  },
  methods: {
    ...mapMutations([
      "setIsActive",
      "setIsActiveToFalse",
      "setFilteredDataShownToTrue",
      "setFilteredDataShownToFalse",
      "setMedicineList",
      "setSortedByNameAscendigly",
      "setSortedByDateAscendigly",
      "setShowExpiredMedicineOnly",
      "updateBaseColor",
      "setCurrentDate"
    ]),
    isMedicineExpired: function(expiryDate) {
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      today = today.getTime();
      let medicineExpiryDate = new Date(expiryDate);
      medicineExpiryDate.setHours(0, 0, 0, 0);
      medicineExpiryDate = medicineExpiryDate.getTime();
      if (medicineExpiryDate < today) {
        return true;
      } else {
        return false;
      }
    },
    showMedicineList: function() {
      if (this.timerange === "") {
        this.$store.commit("setFilteredDataShownToFalse");
      }
      this.$store.commit("setIsActive");
    },
    sortMedicineListByNameAscendingly: function() {
      function compare(a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }
      return this.getMedicineList.sort(compare);
    },
    sortMedicineListByNameDescendingly: function() {
      function compare(a, b) {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      }
      return this.getMedicineList.sort(compare);
    },
    sortMedicineListByDateAscendingly: function() {
      function compare(a, b) {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
      }
      return this.getMedicineList.sort(compare);
    },
    sortMedicineListByDateDescendingly: function() {
      function compare(a, b) {
        if (a.date < b.date) return 1;
        if (a.date > b.date) return -1;
        return 0;
      }
      return this.getMedicineList.sort(compare);
    },
    changeSortedByNameFlag: function() {
      if (this.getSortedByNameAscendigly) {
        this.sortMedicineListByNameAscendingly();
      } else if (!this.getSortedByNameAscendigly) {
        this.sortMedicineListByNameDescendingly();
      }
      this.$store.commit("setSortedByNameAscendigly");
    },
    changeSortedByDateFlag: function() {
      if (this.getSortedByDateAscendigly) {
        this.sortMedicineListByDateAscendingly();
      } else if (!this.getSortedByDateAscendigly) {
        this.sortMedicineListByDateDescendingly();
      }
      this.$store.commit("setSortedByDateAscendigly");
    },
    showExpiredMedicineOnly: function() {
      this.$store.commit("setShowExpiredMedicineOnly");
    },
    filterResults: function() {
      this.$store.commit("setIsActiveToFalse");
      this.$store.commit("setFilteredDataShownToTrue");
      const beginningDate = this.timerange[0];
      const endDate = this.timerange[1];
      const filteredElements = [];
      this.getMedicineList.forEach(element => {
        if (
          new Date(element.date).getTime() > beginningDate.getTime() &&
          new Date(element.date).getTime() < endDate.getTime()
        ) {
          filteredElements.push(element);
        }
      });
      return filteredElements;
    }
  }
};
</script>

<style>
#app {
  font-family: Arial;
  text-align: center;
  margin: 0px;
  padding: 0px;
  min-width: 100vw;
  min-height: 100vh;
  background-image: url("./assets/background.jpg");
}

.justify-content-center {
  margin-bottom: 25px;
}

button {
  margin-right: 10px;
}

.header {
  display: flex;
  height: 10vh;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

h1 {
  font-family: Goudy Old Style;
  font-weight: bold;
  margin-top: 10px;
}

.controls {
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  flex-grow: 1;
}

.current-date {
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  margin-right: 20px;
  color: white;
}

label {
  color: white;
  margin-top: 10px;
  margin-right: 10px;
}

.input-box {
  height: 50px;
  margin-right: 10px;
  width: 300px;
  text-align: center;
}

button {
  height: 50px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.btn-secondary {
  margin-left: 10px;
}

.validation {
  color: white;
  text-align: left;
}

input ~ p {
  display: none;
}

input:focus ~ p {
  display: block;
}
</style>
