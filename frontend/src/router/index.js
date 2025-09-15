import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../views/UserLogin.vue';
import UserRegister from '../views/UserRegister.vue';
import UserDashboard from '../views/UserDashboard.vue';
import AppointmentForm from '../views/AppointmentForm.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: UserLogin
  },
  {
    path: '/register',
    name: 'Register',
    component: UserRegister
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: UserDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/schedule',
    name: 'ScheduleAppointment',
    component: AppointmentForm,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/');
  } else {
    next();
  }
});

export default router;