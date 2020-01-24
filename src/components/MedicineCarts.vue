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
</template>
<script>
export default {
    name: 'medicine-carts',
    props: ["isMedicineExpired"],
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
                return false;
                }
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
  }
}
</script>