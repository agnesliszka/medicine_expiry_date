<template>
  <form @submit.prevent class="row justify-content-center">
    <section>
    <input
      ref="input"
      type="text"
      class="input-box"
      style="display: block"
      v-model="$store.state.medicineNameInput"
      v-on:keydown.enter.prevent="addMedicine"
      placeholder="Input a medicine"
    />
    <p
      class="validation"
      v-if="getMedicineNameInput === '' || getMedicineNameInput.trim() === ''"
    >
      This field cannot be empty.
    </p>
    <p class="validation" v-else-if="getMedicineNameInput.length < 3">
      You need to input at least three characters.
    </p>
    </section>
    <section>
    <input
      ref="input"
      type="date"
      class="input-box"
      v-model="$store.state.medicineExpiryDateInput"
      v-on:keydown.enter.prevent="addMedicine"
      placeholder="Input expiry date"
    />
    <p class="validation" v-if="getMedicineExpiryDateInput === ''">
      Please input a valid date.
    </p>
    </section>
    <button
      type="submit"
      v-if="
        getMedicineNameInput.length >= 3 &&
        getMedicineExpiryDateInput.length === 10
      "
      @click="addMedicine"
      class="btn btn-warning"
    >
      Add a medicine
    </button>
  </form>
</template>
<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import axios from "axios";

export default {
  name: "medicine-carts",
  props: ["isMedicineExpired"],
  computed: {
    ...mapGetters([
      "getMedicineNameInput",
      "getMedicineExpiryDateInput",
      "getMedicineList"
    ])
  },
  methods: {
    ...mapMutations(["clearMedicineInput", "clearMedicineExpiryDateInput"]),
    addMedicine: function() {
      const medicine = this.getMedicineNameInput;
      const expiryDate = this.getMedicineExpiryDateInput;
      const isExpired = this.isMedicineExpired(expiryDate);
      if (
        medicine.length >= 3 &&
        expiryDate.length === 10 &&
        medicine.trim() !== ""
      ) {
        // this.getMedicineList.push({name: medicine, date: expiryDate, expired: isExpired});
        const medicineDetails = {
          name: medicine,
          date: expiryDate,
          expired: isExpired
        };
        axios
          .post(
            "https://medicineexpirydateproject.firebaseio.com/medicineList.json",
            medicineDetails
          )
          .then(res => {
            console.log(res);
          })
          .catch(err => console.log(err));
        this.isMedicineExpired(expiryDate);
        this.clearMedicineInput;
        this.clearMedicineExpiryDateInput;
        this.$refs.input.blur();
      } else return;
    }
  }
};
</script>
<style scoped>
.justify-content-center {
  height: 50px;
}
section {
  display: flex;
  flex-direction: column;
}
</style>
