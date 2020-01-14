<template>
  <div id="app">
    <div class="header">
      <div class="controls">
        <label for="base">Base Color</label>
        <input type="color" name="base" v-model="baseColor">
      </div>
      <h1 :style="{color: baseColor}">Medicine expiry date tracker</h1>
      <div class="current-date">
         {{ currentDate }}
      </div>
    </div>
    <div class="container">
      <section>
         <div class="row justify-content-center">
            <button v-show="$store.state.medicineList.length>0" @click="showMedicineList" class="btn btn-danger">
              <span v-if="$store.state.isActive">Hide Medicine List</span>
              <span v-if="!$store.state.isActive">Show Medicine List</span>
            </button>
            <button @click="changeSortedByNameFlag" class="btn btn-dark">{{ getNameButtonText }}</button>
            <button @click="changeSortedByDateFlag" class="btn btn-dark">{{ getDateButtonText }}</button>
            <button @click="showExpiredMedicineOnly" class="btn btn-danger">{{ getButtonText }} </button>
         </div>
         <div class="row justify-content-center">
            <div>
               <input 
                  ref="input"
                  type="text" 
                  class="input-box" 
                  v-model="$store.state.medicineNameInput" 
                  v-on:keydown.enter.prevent="addMedicine"
                  placeholder="Input a medicine" />
               <p class="validation" v-if="($store.state.medicineNameInput===''|| $store.state.medicineNameInput.trim()==='')">This field cannot be empty.</p>
               <p class="validation" v-else-if="$store.state.medicineNameInput.length <3">You need to input at least three characters.</p>
            </div>
            <div>
               <input 
                     ref="input"
                     type="date" 
                     class="input-box"  
                     v-model="$store.state.medicineExpiryDateInput" 
                     v-on:keydown.enter.prevent="addMedicine" 
                     placeholder="Input expiry date" />
               <p class="validation" v-if="$store.state.medicineExpiryDateInput === ''">Please input a valid date.</p>
            </div>
            <button v-if="$store.state.medicineNameInput.length >=3  && $store.state.medicineExpiryDateInput.length===10" @click="addMedicine" class="btn btn-warning">Add a medicine</button>
        </div>
      </section>
      
       <section class="container" v-show="!$store.state.showExpiredMedicineOnly" v-if="$store.state.isActive">
          <div class="row">
             <div class="offset-md-3 col-md-6 mt-3">
                <ul class="list-group justify-content-center">
                   <li class="row list-group-item border mt-2" v-for="medicine in $store.state.medicineList" v-bind:key="medicine.id">
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
       <section class="container" v-show="$store.state.showExpiredMedicineOnly">
          <div class="row">
             <div class="offset-md-3 col-md-6 mt-3">
                <ul class="list-group justify-content-center">
                   <li class="row list-group-item border mt-2" v-for="medicine in $store.state.expiredMedicineList" v-bind:key="medicine.id">
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
import MedicineCart from './components/MedicineCart.vue';``
import Vuelidate from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';
import moment from 'moment';

export default {
  name: 'app',
  components: {
     'medicine-cart': MedicineCart
 },
 data () {
    return {
       baseColor: "#ffc600",
       currentDate: ""
    }
  },
  mounted() {
     this.setCurrentDate();
  },
  methods: {
   isMedicineExpired: function(expiryDate) {
      let today = new Date();
      today.setHours(0,0,0,0);
      today = today.getTime();
      let medicineExpiryDate = new Date(expiryDate);
      medicineExpiryDate.setHours(0,0,0,0);
      medicineExpiryDate = medicineExpiryDate.getTime();
      if(medicineExpiryDate<today) {
         return true;  
      }
      else{
         return false;}
   },
   addMedicine: function(medicine, expiryDate, isExpired) {
         medicine = this.$store.state.medicineNameInput;
         expiryDate = this.$store.state.medicineExpiryDateInput;
         isExpired = this.isMedicineExpired(expiryDate);
         if (medicine.length >= 3 && expiryDate.length === 10 && medicine.trim() !== ""){
         this.$store.state.medicineList.push({name: medicine, date: expiryDate, expired: isExpired});
         if(isExpired === true){
            this.$store.state.expiredMedicineList.push({name: medicine, date: expiryDate, expired: isExpired});
         }
         this.isMedicineExpired(expiryDate);
         this.$store.state.medicineNameInput = '';
         this.$store.state.medicineExpiryDateInput = '';
         this.$refs.input.blur();
   }  else return;
   },
   deleteMedicine: function(medicine) {
      const index = this.$store.state.medicineList.indexOf(medicine);
      this.$store.state.medicineList.splice(index, 1);
   },
   showMedicineList: function() {
      this.$store.state.isActive = !this.$store.state.isActive;
   },  
   setCurrentDate: function() {
      let todaysDate = new Date()
      todaysDate.setHours(0,0,0,0);
      this.currentDate = moment(todaysDate).format('DD/MM/YYYY')
   },
   sortMedicineListByNameAscendingly: function() {
      function compare(a, b) {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      }
      return this.$store.state.medicineList.sort(compare);
    },
    sortMedicineListByNameDescendingly: function() {
      function compare(a, b) {
        if (a.name < b.name)
          return 1;
        if (a.name > b.name)
          return -1;
        return 0;
      }
      return this.$store.state.medicineList.sort(compare);
    },
   sortMedicineListByDateAscendingly: function() {
      function compare(a, b) {
        if (a.date < b.date)
          return -1;
        if (a.date > b.date)
          return 1;
        return 0;
      }
      return this.$store.state.medicineList.sort(compare);
    },
    sortMedicineListByDateDescendingly: function() {
      function compare(a, b) {
        if (a.date < b.date)
          return 1;
        if (a.date > b.date)
          return -1;
        return 0;
      }
      return this.$store.state.medicineList.sort(compare);
    },
    changeSortedByNameFlag: function() {
       if(this.$store.state.sortedByNameAscendigly){
         this.sortMedicineListByNameAscendingly()
       }
       else if(!this.$store.state.sortedByNameDescendigly){
          this.sortMedicineListByNameDescendingly()
       }
       this.$store.state.sortedByNameAscendigly = !this.$store.state.sortedByNameAscendigly;
    },
    changeSortedByDateFlag: function() {
       if(this.$store.state.sortedByDateAscendigly){
         this.sortMedicineListByDateAscendingly()
       }
       else if(!this.$store.state.sortedByDateDescendigly){
          this.sortMedicineListByDateDescendingly()
       }
       this.$store.state.sortedByDateAscendigly = !this.$store.state.sortedByDateAscendigly;
    },
    showExpiredMedicineOnly: function() {
       this.$store.state.showExpiredMedicineOnly = !this.$store.state.showExpiredMedicineOnly;
    }
 },
 computed: {
   getColor: function() {
      this.baseColor = e.target.value
    },
   getNameButtonText: function() {
      return this.$store.state.sortedByNameAscendigly ? 'Sort by name ascendingly' : 'Sort by name descendingly'
   },
   getDateButtonText: function() {
      return this.$store.state.sortedByDateAscendigly ? 'Sort by date ascendingly' : 'Sort by date descendingly'
   },
   getButtonText: function() {
      return this.$store.state.showExpiredMedicineOnly ? 'Show all medicines' : 'Show expired medicine only'
   }
 }
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
