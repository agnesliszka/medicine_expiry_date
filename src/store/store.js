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
      isActive: true,
      sortedByNameAscendigly: true,
      sortedByDateAscendigly: true,
    }
})