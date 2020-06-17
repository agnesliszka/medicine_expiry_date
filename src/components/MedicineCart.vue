<template lang="html">
  <div class="row align-items-center" :class="{expired: isMedicineExpired(medicine.date)}">
      <div> {{ medicine.date }} </div>
        <div class="col-md-6">{{ medicine.name }} </div>                                   
      <span @click="deleteMedicine(medicine)" class="offset-sm-1 col-sm-2 delete text-right">X</span>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
export default {
  name: 'medicine-carts',
  props: ["medicine", "isMedicineExpired"],
  computed: {
        ...mapGetters([
            'getMedicineList',
        ])
    },
  methods: {
  deleteMedicine: function(medicine) {
      const index = this.$store.state.medicineList.indexOf(medicine);
      const idx = this.$store.state.medicineList[index].id
      axios.delete(`https://medicineexpirydateproject.firebaseio.com/medicineList/${idx}`+'.json?auth='+'2pc6k4A0Tv5DR80pYc9enh0fTOBBewNAKfRcZD1N')
        .then(res => window.location.reload())
        .catch(err => console.log(err))
      // this.getMedicineList.splice(index, 1);
   },
  }
}
</script>
<style>
  .delete {
    cursor: pointer;
  }

  .delete:hover {
    color: #999999;
  }
  
  .expired {
    background-color: red;
  }
</style>

