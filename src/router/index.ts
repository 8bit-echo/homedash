import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SettingsView from '../views/SettingsView.vue';
import IFrame from '../components/widgets/IFrame.vue';
import Whiteboard from '../views/Whiteboard.vue';
import Vestaboard from '../views/Vestaboard.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsView,
  },
  {
    path: '/iframe/:url',
    name: 'iFrame',
    component: IFrame,
  },
  {
    path: '/whiteboard',
    name: 'Whiteboard',
    component: Whiteboard,
  },
  {
    path: '/now-playing',
    name: 'Now Playing',
    component: Vestaboard,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
