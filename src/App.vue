<template>
  <div id="app">
    <div class="header">
      <div class="controls">
        <label for="base">Base Color</label>
        <input type="color" name="base" v-model="$store.state.baseColor">
      </div>
      <h1 :style="{color: getBaseColor}">Medicine expiry date tracker</h1>
      <div class="current-date">
         {{ $store.state.currentDate }}
      </div>
    </div>
    <div class="container">
      <section>
         <div class="row justify-content-center">
            <button v-show="getMedicineList.length > 0" @click="showMedicineList" class="btn btn-danger">
              <span v-if="getIsActive">Hide Medicine List</span>
              <span v-if="!getIsActive">Show Medicine List</span>
            </button>
            <button @click="changeSortedByNameFlag" class="btn btn-dark">{{ getNameButtonText }}</button>
            <button @click="changeSortedByDateFlag" class="btn btn-dark">{{ getDateButtonText }}</button>
            <button v-show="expiredMedicineList.length > 0" @click="showExpiredMedicineOnly" class="btn btn-danger">{{ getButtonText }} </button>
         </div>
      <medicine-carts
         :isMedicineExpired="isMedicineExpired"
      >
      </medicine-carts>
      </section>
       <section class="container" v-show="!getShowExpiredMedicineOnly" v-if="getIsActive">
          <div class="row">
             <div class="offset-md-3 col-md-6 mt-3">
                <ul class="list-group justify-content-center">
                   <li class="row list-group-item border mt-2" v-for="medicine in getMedicineList" v-bind:key="medicine.id">
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
                   <li class="row list-group-item border mt-2" v-for="medicine in expiredMedicineList" v-bind:key="medicine.id">
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
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import moment from 'moment';
import MedicineCart from './components/MedicineCart.vue';
import MedicineCarts from './components/MedicineCarts.vue';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';

export default {
// TODO: 
// finish getters and mutationsd
// naming 
// get rod of the jump of the list when data is being inputted and then entered
// axios

  name: 'app',
  components: {
     'medicine-cart': MedicineCart,
     'medicine-carts': MedicineCarts
  },
  mounted() {
     this.setCurrentDate();
  },
  computed: {
        ...mapGetters([
            'getBaseColor',
            'getIsActive',
            'getMedicineList',
            'getMedicineNameInput',
            'getShowExpiredMedicineOnly',    
            'getSortedByNameAscendigly',
            'getSortedByDateAscendigly'
        ]),
        getColor: function() {
            this.$store.state.baseColor = e.target.value
        },
        getNameButtonText: function() {
            return this.getSortedByNameAscendigly ? 'Sort by name ascendingly' : 'Sort by name descendingly'
         },
        getDateButtonText: function() {
            return this.getSortedByDateAscendigly ? 'Sort by date ascendingly' : 'Sort by date descendingly'
         },
        getButtonText: function() {
            return this.getShowExpiredMedicineOnly ? 'Show all medicines' : 'Show expired medicine only'
         },
        expiredMedicineList: function() {
            return this.getMedicineList.filter(function(medicine) {
            return medicine.expired
         })
        }
    },
  methods: {
   ...mapMutations([
            'setIsActive',
        ]),
   isMedicineExpired: function(expiryDate) {
         let today = new Date();
         today.setHours(0,0,0,0);
         today = today.getTime();
         let medicineExpiryDate = new Date(expiryDate);
         medicineExpiryDate.setHours(0,0,0,0);
         medicineExpiryDate = medicineExpiryDate.getTime();
         if(medicineExpiryDate<today) {
               return true;  
         }else {
               return false;}
         },
   deleteMedicine: function(medicine) {
      const index = this.getMedicineList.indexOf(medicine);
      this.$store.state.medicineList.splice(index, 1);
   },
   showMedicineList: function() {
      console.log("dziala")
      this.$store.commit('setIsActive');
   },  
   setCurrentDate: function() {
      let todaysDate = new Date()
      todaysDate.setHours(0,0,0,0);
      this.$store.state.currentDate = moment(todaysDate).format('DD/MM/YYYY')
   },
   sortMedicineListByNameAscendingly: function() {
      function compare(a, b) {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      }
      return this.getMedicineList.sort(compare);
    },
    sortMedicineListByNameDescendingly: function() {
      function compare(a, b) {
        if (a.name < b.name)
          return 1;
        if (a.name > b.name)
          return -1;
        return 0;
      }
      return this.getMedicineList.sort(compare);
    },
   sortMedicineListByDateAscendingly: function() {
      function compare(a, b) {
        if (a.date < b.date)
          return -1;
        if (a.date > b.date)
          return 1;
        return 0;
      }
      return this.getMedicineList.sort(compare);
    },
    sortMedicineListByDateDescendingly: function() {
      function compare(a, b) {
        if (a.date < b.date)
          return 1;
        if (a.date > b.date)
          return -1;
        return 0;
      }
      return this.getMedicineList.sort(compare);
    },
    changeSortedByNameFlag: function() {
       if(this.getSortedByNameAscendigly){
         this.sortMedicineListByNameAscendingly()
       }
       else if(!this.getSortedByNameAscendigly){
          this.sortMedicineListByNameDescendingly()
       }
       this.$store.state.sortedByNameAscendigly = !this.$store.state.sortedByNameAscendigly;
    },
    changeSortedByDateFlag: function() {
       if(this.getSortedByDateAscendigly){
         this.sortMedicineListByDateAscendingly()
       }
       else if(!this.getSortedByDateAscendigly){
          this.sortMedicineListByDateDescendingly()
       }
       this.$store.state.sortedByDateAscendigly = !this.$store.state.sortedByDateAscendigly;
    },
    showExpiredMedicineOnly: function() {
       this.$store.state.showExpiredMedicineOnly = !this.$store.state.showExpiredMedicineOnly;
    }
 },
}
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
