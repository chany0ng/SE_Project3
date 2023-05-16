<template>
  <div class="container input-bg col-md-4">
    <h1>비밀번호 찾기</h1>
    <form action="">
      <div class="form-group flex-box">
        <div class="flex-container">
          <label for="userName">이름</label>
          <input
            type="text"
            class="form-control"
            id="userName"
            placeholder="이름을 입력하세요"
            required
          />
        </div>
        <div class="flex-container">
          <label for="userNumber">학번</label>
          <input
            type="text"
            class="form-control"
            id="userNumber"
            placeholder="학번을 입력하세요"
            required
          />
        </div>
        <div class="flex-container">
          <label for="userPwQ">비밀번호 찾기 질문</label>
          <select class="form-select" required name="question" id="userPwQ">
            <option value="">선택해주세요</option>
            <option value="elementary">졸업한 초등학교 이름</option>
            <option value="middle">졸업한 중학교 이름</option>
          </select>
        </div>
        <div class="flex-container">
          <label for="userPwA">비밀번호 찾기 답변</label>
          <input
            type="text"
            class="form-control"
            id="userPwA"
            placeholder="비밀번호 찾기 질문 답변"
            required
          />
        </div>
        <button type="submit" class="btn">Submit</button>
      </div>
    </form>
  </div>
  <router-view></router-view>
</template>

<script setup></script>

<style scoped>
div {
  background-color: white;
}
input,
select {
  border-color: #fa9884;
  width: 60%;
}
h1 {
  margin-top: 10px;
  margin-bottom: 20px;
  color: var(--main-color);
  font-weight: bold;
}
.flex-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}
.flex-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  white-space: nowrap;
  width: 90%;
  padding: 5px;
}
label {
  color: black;
  margin-bottom: 10px;
  font-size: large;
}

.btn {
  background-color: rgba(250, 152, 133, 0.3);
  width: 30%;
  color: var(--main-color);
  font-weight: bold;
}

.btn:hover {
  background-color: var(--main2-color);
  color: rgba(231, 70, 70, 0.9);
}
</style>
