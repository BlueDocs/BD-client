import { createApp } from 'vue';
import App from './App';
import { router } from './router';

const app = createApp(App);

app.use(router);

(async function init() {
    await router.isReady();

    await app.mount('#app').$nextTick();

    // 移除 preload 加载的 loading
    postMessage({ payload: 'removeLoading' }, '*');
})();
