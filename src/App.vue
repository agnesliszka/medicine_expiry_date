<template>
  <div id="app">
    <div class="header">
      <h1>Medicine expiry date tracker</h1>
    </div>
    <div class="controls">
        <label for="base">Base Color</label>
        <input type="color" name="base" v-model="baseColor">
     </div>
    <div class="container">
      <section>
         <div class="row justify-content-center">
            <div>
               <input 
                  type="text" 
                  class="input-box" 
                  v-model="$store.state.medicineNameInput" 
                  v-on:keydown.enter.prevent="addMedicine"
                  placeholder="Input a medicine" />
               <p class="validation" v-if="$store.state.medicineNameInput ===''">This field cannot be empty.</p>
               <p class="validation" v-else-if="$store.state.medicineNameInput.length <=3">You need to input at least three characters.</p>
            </div>
            <div>
               <input 
                     type="date" 
                     class="input-box"  
                     v-model="$store.state.medicineExpiryDateInput" 
                     v-on:keydown.enter.prevent="addMedicine" 
                     placeholder="Input expiry date" />
               <p class="validation" v-if="$store.state.medicineExpiryDateInput === ''">Please input a valid date.</p>
            </div>
           <button v-if="$store.state.medicineNameInput.length >=3  && $store.state.medicineExpiryDateInput.length===10" @click="addMedicine" class="btn btn-secondary">Add a medicine</button>
           <button @click="showExpiredMedicine" class="btn btn-secondary">
              <span v-if="$store.state.isActive">Hide Medicine List</span>
              <span v-if="!$store.state.isActive">Show Medicine List</span>
            </button>
        </div>
      </section>
      
       <section class="container" v-if="$store.state.isActive">
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
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import MedicineCart from './components/MedicineCart.vue';
import Vuelidate from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'app',
  components: {
     'medicine-cart': MedicineCart
 },
 data () {
    return {
       baseColor: "",
    }
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
   addMedicine: function(medicine, expiryDate) {
         medicine = this.$store.state.medicineNameInput;
         expiryDate = this.$store.state.medicineExpiryDateInput;
         if (medicine.length > 3 && expiryDate.length === 10 ){
         this.$store.state.medicineList.push({name: medicine, date: expiryDate});
         this.$store.state.medicineNameInput = '';
         this.$store.state.medicineExpiryDateInput = '';
         this.isMedicineExpired(expiryDate);
   }  else return;
   },
   deleteMedicine: function(medicine) {
      const index = this.$store.state.medicineList.indexOf(medicine);
      this.$store.state.medicineList.splice(index, 1);
   },
   showExpiredMedicine: function() {
      this.$store.state.isActive = !this.$store.state.isActive;
   },
 },
 computed: {
    
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

.header {
   display: flex;
   height: 12vh;
   align-items: center;
   justify-content: center;
}

h1 {
  font-family: Goudy Old Style;
  color: white;
}

.controls {
   height: 30px;
   display: flex;
   align-items: center;
   justify-content: center;
   margin-bottom: 10px;
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
