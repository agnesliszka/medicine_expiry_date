<template lang="html">
  <div class="row align-items-center" :class="{expired: isMedicineExpired}">
      <div> {{ medicine.date }} </div>
        <div class="col-md-6">{{ medicine.name }} </div>                                   
      <span @click="deleteMedicine(medicine)" class="offset-sm-1 col-sm-2 delete text-right">X</span>
  </div>
</template>
<script>

export default {
  props: ["medicine"],
  methods: {
  deleteMedicine: function(medicine) {
      const index = this.$store.state.medicineList.indexOf(medicine);
      this.$store.state.medicineList.splice(index, 1);
   },
  }
}
</script>
