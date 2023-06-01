import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginViews/LoginPage.vue";
const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login/findpw",
    name: "FindPW",
    component: () => import("../views/LoginViews/FindPassword"),
  },
  {
    path: "/login/signup",
    name: "SignUp",
    component: () => import("../views/LoginViews/NewJoin"),
  },
  {
    path: "/student/subject/annoucement",
    name: "공지사항 조회",
    component: () =>
      import("../views/StudentViews/management/StudentAnnoucement"),
  },
  {
    path: "/student/subject/qna",
    name: "강의 묻고 답하기",
    component: () => import("../views/StudentViews/management/StudentQnA"),
  },
  {
    path: "/student/subject/syllabus",
    name: "강의 계획서 조회",
    component: () => import("../views/StudentViews/management/StudentSyllabus"),
  },
  {
    path: "/student/studying/assignment",
    name: "과제 제출",
    component: () =>
      import("../views/StudentViews/supporting/StudentAssignment"),
  },
  {
    path: "/student/studying/grade",
    name: "성적 조회",
    component: () => import("../views/StudentViews/supporting/StudentGrade"),
  },
  {
    path: "/student/studying/performance",
    name: "석차 조회",
    component: () =>
      import("../views/StudentViews/supporting/StudentPerformance"),
  },
  {
    path: "/student/mypage/information",
    name: "내 정보 조회/수정",
    component: () =>
      import("../views/StudentViews/mypage/StudentInformation.vue"),
  },
  {
    path: "/student/enrollment",
    name: "수강 신청",
    component: () =>
      import("../views/StudentViews/enrollment/StudentEnrollment"),
  },
  {
    path: "/student",
    name: "학생 메인화면",
    component: () => import("../views/StudentViews/StudentMain.vue"),
  },

  {
    path: "/professor",
    name: "교수 메인화면",
    component: () => import("../views/ProfessorViews/ProfessorMain"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
