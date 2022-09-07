import { createApp } from 'vue';
import App from './App';

const app = createApp(App);

app.mount('#app').$nextTick(() => {
    // 移除加载的 preload 的 loading
    postMessage({ payload: 'removeLoading' }, '*');
});
