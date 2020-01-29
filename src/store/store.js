import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
      medicineNameInput: '',
      medicineExpiryDateInput: '',
      medicineList: [],
      isActive: true,
      currentDate: "",
      showExpiredMedicineOnly: false,
      sortedByNameAscendigly: true,
      sortedByDateAscendigly: true,
      baseColor: "#ffc600",
    },

    getters: {
      getMedicineNameInput: state => {
      return state.medicineNameInput;
      },
      getMedicineExpiryDateInput: state => {
        return state.medicineExpiryDateInput;
      },
      getMedicineList: state => {
        return state.medicineList;
        }, 
      getIsActive: state => {
        return state.isActive;
        },
      getCurrentDate: state => {
        return state.currentDate;
        },
      getShowExpiredMedicineOnly: state => {
        return state.showExpiredMedicineOnly;
        },
      getSortedByNameAscendigly: state => {
        return state.sortedByNameAscendigly;
        },
      getSortedByDateAscendigly: state => {
        return state.sortedByDateAscendigly;
        },
      getBaseColor: state => {
        return state.baseColor;
        }
    } ,
    mutations: {
      setIsActive: state => {
        state.isActive  = !state.isActive;
      }
    }
})