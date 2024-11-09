import { boot } from 'quasar/wrappers';
import { useAuthStore } from 'src/stores/auth';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.16.33.182:5500/api/',
});

export default boot(({ app, router }) => {
  const auth = useAuthStore();

  // Ensure both the custom API instance and Axios are available globally
  app.config.globalProperties.$axios = axios;  // This gives access to default axios
  app.config.globalProperties.$api = api;      // This gives access to the custom api instance


  // Interceptors for the custom API instance
  api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      // Check if error.response exists
      if (error.response) {
        switch (error.response.status) {
          case 400:
            app.config.globalProperties.$showError(error.response.data.data[0].message);
            break;
          case 401:
            app.config.globalProperties.$showError(error.response.data.data.message);
            auth.logout();
            router.push({ name: 'LoginPage' });
            break;
          case 403:
            app.config.globalProperties.$showError(error.response.data.data.message);
            auth.logout();
            router.push({ name: 'LoginPage' });
            break;
          case 404:
            break;
          case 302:
            break;
          case 422:
            break;
          default:
            break;
        }
      } else {
        app.config.globalProperties.$showError('An unknown error occurred');
      }
      return Promise.reject(error);
    }
  );
});
