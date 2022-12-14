import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import { AppContextProvider } from './context';

export default defineComponent({
    name: 'App',
    setup() {
        return () => {
            return (
                <AppContextProvider>
                    <RouterView />
                </AppContextProvider>
            );
        };
    },
});
