<template>
  <main>
    <ProfessorHeader />
    <div>lorem</div>
    <MainFooter />
  </main>
  <router-view></router-view>
</template>

<script setup>
import MainFooter from "../../layouts/MainFooter.vue";
import ProfessorHeader from "../../layouts/ProfessorHeader.vue";
</script>

<style scoped>
div {
  height: 1000px;
}
</style>
