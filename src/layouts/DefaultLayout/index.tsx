import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import { BlankLayout } from '../BlankLayout';

const DefaultLayout = defineComponent({
    name: 'DefaultLayout',
    setup() {
        return () => {
            return (
                <BlankLayout>
                    <RouterView />
                </BlankLayout>
            );
        };
    },
});

export { DefaultLayout };
