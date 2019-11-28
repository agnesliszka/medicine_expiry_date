<template>
  <div id="app">
    <h1>Medicine expiry date tracker</h1>
    <div class="container">
      <section>
         <div class="row justify-content-center">
           <input type="text" class="input-box" v-model="inputMedicineField" v-on:keyup.enter="addMedicine" placeholder="Input a medicine" />
           <input type="date" class="input-box" v-model="inputExpiryDateField" v-on:keyup.enter="addMedicine" placeholder="Input expiry date" />
           <button @click="addMedicine" class="btn btn-secondary">Add a medicine</button>
           <button @click="showExpiredMedicine" class="btn btn-secondary">Show Expired Medicine</button>
        </div>
      </section>
       <section class="container">
          <div class="row">
             <div class="offset-md-3 col-md-6 mt-3">
                <ul class="list-group justify-content-center">
                   <li class="row list-group-item border mt-2" v-for="medicine in medicineList" v-bind:key="medicine.id">
                      <div class="row align-items-center">
                        <div> {{ medicine.date }} </div>
                           <div class="col-md-6">{{ medicine.name }} </div>                                   
                        <span @click="deleteMedicine(medicine)" class="offset-sm-1 col-sm-2 delete text-right">X</span>
                      </div>
                   </li>
                </ul>
             </div>
          </div>
       </section>
       <section class="container">
          <div class="row">
             <div class="offset-md-3 col-md-6 mt-3">
                <ul class="list-group justify-content-center">
                  <div v-if="isActive">
                   <li class="row list-group-item border mt-2" v-for="medicine in medicineList" v-bind:key="medicine.id">
                      <div class="row align-items-center" v-if="medicine.isExpired">
                           <div>{{ medicine.name }} </div> 
                           <div v-bind:class="{ expired: isExpired }">{{ medicine.date }} </div> 
                      </div>
                   </li>
                   </div>
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

export default {
  name: 'app',
  components: {
     'medicine-cart': MedicineCart
 },

  data () {
    return {
      inputMedicineField: '',
      inputExpiryDateField: '',
      medicine: "",
      expiryDate: "",
      medicineList: [],
      isActive: false,
    }
  },
  methods: {
    addMedicine: function(medicine, expiryDate) {
      medicine = this.inputMedicineField;
      console.log("medicine"+medicine);
      expiryDate = this.inputExpiryDateField;
      console.log("expiryDateField"+expiryDate);
      this.medicineList.push({name: medicine, date: expiryDate, isExpired: false});
      console.log("name"+name)
      console.log("date"+date)
      console.log("isExpired"+isExpired)
      this.inputMedicineField = '';
      this.inputExpiryDateField = '';
   },
   deleteMedicine: function(medicine) {
      console.log(JSON.stringify(medicine))
      var index = this.medicineList.indexOf(medicine);
      this.medicineList.splice(index, 1);
   },
   toggle: function(medicine) {
      medicine.complete = !medicine.complete;
      console.log("medicine.complete"+medicine.complete)
   },
   isExpired: function(medicine) {
      const today = new Date();
      const todaysDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      console.log("todays date"+todaysDate)
      // if medicine.date < todaysDate {
      //   return false
      // }
   }, 
   showExpiredMedicine: function() {
      this.isActive = !this.isActive;
   }
  //  mounted() {
    //  isExpired()
  //  },
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
    margin-right: 10px;
    width: 300px;
    text-align: center;
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

.expired {
  background-color: red;
}

.btn-secondary {
  margin-left: 10px;
}

</style>
