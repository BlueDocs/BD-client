import { defineComponent } from 'vue';
import { AppContextProvider } from './context';

export default defineComponent({
    name: 'App',
    setup() {
        return () => {
            return (
                <AppContextProvider>
                    <div></div>
                </AppContextProvider>
            );
        };
    },
});
