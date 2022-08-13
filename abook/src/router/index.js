import { createRouter, createWebHistory } from 'vue-router';
// import { useUserStore } from '@/stores/user';
// const user = useUserStore();

async function importFB() {
	return await import('@/stores/user');
}
const stores = await importFB();
let user = { loginUser: null };
setTimeout(() => {
	user = stores.useUserStore();
});
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
			meta: { requiresAuth: true },
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('@/views/AboutView.vue'),
			meta: { requiresAuth: true },
		},
	],
});
router.beforeEach((to, from) => {
	if (to.meta.requiresAuth && !user.loginUser) {
		return {
			path: '/',
			query: { redirect: to.fullPath },
		};
	}
});
export default router;
