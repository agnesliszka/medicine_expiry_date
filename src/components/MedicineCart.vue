<template lang="html">
  <div class="row align-items-center" :class="{expired: isMedicineExpired}">
      <div> {{ medicine.date }} </div>
        <div class="col-md-6">{{ medicine.name }} </div>                                   
      <span @click="deleteMedicine(medicine)" class="offset-sm-1 col-sm-2 delete text-right">X</span>
  </div>
</template>
<script>

export default {
  props: ["medicine, medicineList"],
  methods: {
   deleteMedicine: function(medicine) {
      console.log(JSON.stringify(medicine))
      const index = this.medicineList.indexOf(medicine);
      this.medicineList.splice(index, 1);
   },
  }
}
</script>
