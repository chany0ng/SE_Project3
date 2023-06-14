<template>
  <router-view></router-view>
  <AsideBar />
</template>

<script setup>
import AsideBar from "@/layouts/AsideBar.vue";
</script>

<style scoped>
#time-table {
  background-color: white;
  width: 50vw;
  margin: 0 auto;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid var(--main3-color);
  border-radius: 5px;
}
table {
  height: 100px;
  font-size: small;
}
</style>
