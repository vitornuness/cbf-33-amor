import { createMemoryHistory, createRouter, type RouteRecordRaw } from 'vue-router';
import Palestras from './views/PalestrasView.vue';
import HomeView from './views/HomeView.vue';

const routes: RouteRecordRaw[] = [
    { path: '/', component: HomeView }, 
    { path: '/palestras', component: Palestras }
]

export const router = createRouter({
    history: createMemoryHistory(), 
    routes
});