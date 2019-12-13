<template>
  <div id="app">
    <h1>Medicine expiry date tracker</h1>
    <div class="container">
      <section>
         <div class="row justify-content-center">
            <div>
               <input 
                  type="text" 
                  class="input-box" 
                  @input="$v.medicineNameInput.$touch()" 
                  v-model="medicineNameInput" 
                  v-on:keydown.enter.prevent="addMedicine"
                  placeholder="Input a medicine" />
                  <p class="validation" v-if="!$v.medicineNameInput.required">This field cannot be empty.</p>
                  <p class="validation" v-if="!$v.medicineNameInput.minLength">You need to input at least three characters.</p>
            </div>
            <div>
               <input 
                     type="date" 
                     class="input-box" 
                     @input="$v.medicineExpiryDateInput.$touch()" 
                     v-model="medicineExpiryDateInput" 
                     v-on:keydown.enter.prevent="addMedicine" 
                     placeholder="Input expiry date" />
                  <p class="validation" v-if="!$v.medicineExpiryDateInput.required">This field cannot be empty.</p>
            </div>
           <button v-if="medicineNameInput.length >=3  && medicineExpiryDateInput !==''" @click="addMedicine" class="btn btn-secondary">Add a medicine</button>
           <button @click="showExpiredMedicine" class="btn btn-secondary">Show Expired Medicine</button>
        </div>
      </section>
      
       <section class="container">
          <div class="row">
             <div class="offset-md-3 col-md-6 mt-3">
                <ul class="list-group justify-content-center">
                   <li class="row list-group-item border mt-2" v-for="medicine in medicineList" v-bind:key="medicine.id">
                      <!-- <medicine-cart
                      :medicine="medicine"
                      :medicineList="medicineList"
                      >
                      </medicine-cart> -->
                      <div class="row align-items-center" :class="{expired: isMedicineExpired(medicine.date)}">
                           <div> {{ medicine.date }} </div>
                              <div class="col-md-6">{{ medicine.name }} </div>                                   
                           <span @click="deleteMedicine(medicine)" class="offset-sm-1 col-sm-2 delete text-right">X</span>
                     </div>
                   </li>
                </ul>
             </div>
          </div>
       </section>
       <!-- <section class="container">
          <div class="row">
             <div class="offset-md-3 col-md-6 mt-3">       
                <ul class="list-group justify-content-center">
                  <div v-if="isActive">
                  <h1>Expired medicine:</h1>
                   <li class="row list-group-item border mt-2" v-for="medicine in medicineList" v-bind:key="medicine.id">
                      <div :class="{expired: isExpired}">
                           <div>{{ medicine.name }} </div> 
                           <div>{{ medicine.date }} </div> 
                      </div>
                   </li>
                   </div>
                </ul>
             </div>
          </div>
       </section>       -->
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
      medicineNameInput: '',
      medicineExpiryDateInput: '',
      medicineList: [],
      isActive: false,
      isExpired: false
    }
  },
  validations: {
     medicineNameInput: {
        required: required, 
        minLength: minLength(3)
     },
     medicineExpiryDateInput: {
        required: required
     }
  },
  methods: {
   isMedicineExpired: function(expiryDate) {
      let today = new Date();
      today.setHours(0,0,0,0);
      today = today.getTime();
      let medicineExpiryDateInput = new Date(expiryDate);
      medicineExpiryDateInput.setHours(0,0,0,0);
      medicineExpiryDateInput = medicineExpiryDateInput.getTime();
      
      if(medicineExpiryDateInput>today) {
         return true;  
      }
      else{return false;}
   },
   addMedicine: function(medicine, expiryDate) {
         medicine = this.medicineNameInput;
         expiryDate = this.medicineExpiryDateInput;
         if (medicine.length > 3 && expiryDate.length === 10 ){
         this.medicineList.push({name: medicine, date: expiryDate});
         this.medicineNameInput = '';
         this.medicineExpiryDateInput = '';
         this.isMedicineExpired(expiryDate);
   }  else  { return false }
   },
   deleteMedicine: function(medicine) {
      var index = this.medicineList.indexOf(medicine);
      this.medicineList.splice(index, 1);
   },
   showExpiredMedicine: function() {
      medicineList.forEach.isExpired();
      this.isActive = !this.isActive;
   },
   // mounted: function() {
   //   isExpired();
   // },
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

h1 {
  font-family: Goudy Old Style;
  color: white;
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

h5 {
   margin-bottom: 0px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.single-row{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.delete {
   cursor: pointer;
}

.delete:hover {
   color: #999999;
}

.btn-secondary {
  margin-left: 10px;
}

.validation {
   color: white;
   text-align: left;
}

.expired {
   background-color: red;
}

</style>
