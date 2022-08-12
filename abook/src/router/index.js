import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'welcome',
			component: () => import('@/components/Moduls/Welcome/Welcome.vue'),
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('@/components/Moduls/Welcome/Login/Login.vue'),
		},
		{
			path: '/create',
			name: 'create',
			component: () => import('@/components/Moduls/Welcome/Create/Create.vue'),
		},
		{
			path: '/home',
			name: 'home',
			component: () => import('@/views/HomeView.vue'),
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('@/views/AboutView.vue'),
		},
	],
});

export default router;
