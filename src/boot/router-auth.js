// import { useAuthStore } from 'src/stores/auth';

// export default ({ router }) => {
//   router.beforeEach((to, from, next) => {
//     const auth = useAuthStore();
//     const isAuthenticated = auth.isAuthenticated;

//     if (isAuthenticated) {
//       // Redirect authenticated users away from the login page to main page
//       if (to.path === '/' || to.path === '/login' || to.name === 'LoginPage') {
//         next({ path: '/my-tasks' });
//       } else {
//         next();
//       }
//     } else {
//       // Redirect unauthenticated users to login if trying to access a protected route
//       if (to.matched.some((record) => !record.meta.isPublic)) {
//         next({ name: 'LoginPage', query: { redirect: to.fullPath } });
//       } else {
//         next();
//       }
//     }
//   });
// };
