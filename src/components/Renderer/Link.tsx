import { defineComponent } from 'vue';
import { useRendererContext } from './context';

const Link = defineComponent({
    name: 'LinkRenderer',
    setup(props, { slots }) {
        const { createNamespace } = useRendererContext();
        return () => {
            return <a class={createNamespace('link')}>{slots.default?.()}</a>;
        };
    },
});

export { Link };
