<template>
  <router-view></router-view>
  <StudentHeader />
  <AsideBar />
  <MainFooter />
</template>

<script setup>
import AsideBar from "@/layouts/AsideBar.vue";
import MainFooter from "@/layouts/MainFooter.vue";
import StudentHeader from "@/layouts/StudentHeader.vue";
</script>

<style scoped></style>
