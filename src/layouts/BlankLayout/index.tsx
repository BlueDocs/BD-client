import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

const BlankLayout = defineComponent({
    name: 'BlankLayout',
    setup(props, { slots }) {
        return () => {
            return <div>{slots.default?.() || <RouterView />}</div>;
        };
    },
});

export { BlankLayout };
