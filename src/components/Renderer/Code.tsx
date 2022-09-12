import { defineComponent } from 'vue';
import { useRendererContext } from './context';

const Code = defineComponent({
    name: 'CodeRenderer',
    setup(props, { slots }) {
        const { createNamespace } = useRendererContext();
        return () => {
            return <code class={createNamespace('code')}>{slots.default?.()}</code>;
        };
    },
});

export { Code };
