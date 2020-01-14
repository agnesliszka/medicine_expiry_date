import Vue from 'vue';
import Vuex from 'vuex';
import Vuelidate from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
      medicineNameInput: '',
      medicineExpiryDateInput: '',
      medicineList: [],
      expiredMedicineList: [],
      isActive: true,
      showExpiredMedicineOnly: false,
      sortedByNameAscendigly: true,
      sortedByDateAscendigly: true,
    }
})