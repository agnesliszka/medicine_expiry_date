<template> 
 <div class="row justify-content-center">
            <div>
               <input 
                  ref="input"
                  type="text" 
                  class="input-box" 
                  v-model="$store.state.medicineNameInput" 
                  v-on:keydown.enter.prevent="addMedicine"
                  placeholder="Input a medicine" />
               <p class="validation" v-if="(getMedicineNameInput === ''|| getMedicineNameInput.trim() === '')">This field cannot be empty.</p>
               <p class="validation" v-else-if="getMedicineNameInput.length < 3">You need to input at least three characters.</p>
            </div>
            <div>
               <input 
                     ref="input"
                     type="date" 
                     class="input-box"  
                     v-model="$store.state.medicineExpiryDateInput" 
                     v-on:keydown.enter.prevent="addMedicine" 
                     placeholder="Input expiry date" />
               <p class="validation" v-if="getMedicineExpiryDateInput === ''">Please input a valid date.</p>
            </div>
            <button v-if="getMedicineNameInput.length >=3  && getMedicineExpiryDateInput.length === 10" @click="addMedicine" class="btn btn-warning">Add a medicine</button>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
export default {
    name: 'medicine-carts',
    props: ["isMedicineExpired"],
    computed: {
        ...mapGetters([
            'getMedicineNameInput',
            'getMedicineExpiryDateInput',
            'getMedicineList',
        ])
    },
    methods: {
        addMedicine: function(medicine, expiryDate, isExpired) {
            medicine = this.getMedicineNameInput;
            expiryDate = this.getMedicineExpiryDateInput;
            isExpired = this.isMedicineExpired(expiryDate);
            if (medicine.length >= 3 && expiryDate.length === 10 && medicine.trim() !== ""){
                // this.getMedicineList.push({name: medicine, date: expiryDate, expired: isExpired});
                const medicineDetails = {name: medicine, date: expiryDate, expired: isExpired}
                axios.post('https://medicineexpirydateproject.firebaseio.com/medicineList.json', medicineDetails)
                    .then(res => {console.log(res) 
                                window.location.reload()})
                    .catch(err => console.log(err));
                this.isMedicineExpired(expiryDate);
                this.$store.state.medicineNameInput = '';
                this.$store.state.medicineExpiryDateInput = '';
                this.$refs.input.blur();
                
        }  else return;
    },
  }
}
</script>