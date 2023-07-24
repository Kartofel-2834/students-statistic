import { createRouter, createWebHistory } from "vue-router";

// Pupils
import Pupils from "@/views/pupils/index.vue";
import PupilId from "@/views/pupils/id.vue";

// Homeworks
import Homeworks from "@/views/homeworks/index.vue";
import HomeworkId from "@/views/homeworks/id.vue";
import HomeworkCreationForm from "@/views/homeworks/add.vue";

// Visits
import Visits from "@/views/visits/index.vue";

const routes = [
  {
    path: "/",
    name: "pupilsMirror",
    component: Pupils,
  },
  {
    path: "/pupils",
    name: "pupils",
    component: Pupils,
  },
  {
    path: "/pupils/:id",
    name: "pupil-id",
    component: PupilId,
  },

  {
    path: "/homeworks",
    name: "homeworks",
    component: Homeworks,
  },
  {
    path: "/homeworks/:id",
    name: "homework-id",
    component: HomeworkId,
  },
  {
    path: "/homeworks/add",
    name: "homework-creation-form",
    component: HomeworkCreationForm,
  },

  {
    path: "/visits",
    name: "visits",
    component: Visits,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
