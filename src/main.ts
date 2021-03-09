import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from './router';
import { setupStore } from './store';
import { setupAntd } from './plugins/ant';
import { setupCornerstone } from './plugins/cornerstone';
import './styles/index.less';
import './styles/tailwind.css';

const app = createApp(App);

setupCornerstone();
setupStore(app);
setupRouter(app);
setupAntd(app);

router.isReady().then(() => {
    app.mount('#app', true);
});
