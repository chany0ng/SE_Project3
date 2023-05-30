<template>
  <div class="background">
    <div class="inner-background">
      <slot name="title"></slot>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.background {
  background-color: white;
  width: 60vw;
  height: 60vh;
  margin: 0 auto;
  position: relative;
}
.inner-background {
  background-color: var(--main4-color);
  width: 90%;
  height: 80%;
  position: absolute;
  top: 50%; /* adjust the positioning as needed */
  left: 50%; /* adjust the positioning as needed */
  transform: translate(-50%, -50%); /* center the child div */
  font-weight: bold;
}
</style>
