<template>
    <main>

      <form action="/api/student/subject/notice/write" method="post">
        <input type="file" name="upload" id="upload">
        <button type="submit">파일 업로드</button>
      </form>

    </main>
    <router-view></router-view>
  </template>
  
  <script setup>

  </script>
  
  <style scoped>
  div {
    height: 1000px;
  }
  </style>
  