import { defineComponent } from 'vue';
import { useRendererContext } from './context';

const Blockquote = defineComponent({
    name: 'BlockquoteRenderer',
    setup(props, { slots }) {
        const { createNamespace } = useRendererContext();

        return () => {
            return <blockquote class={createNamespace('blockquote')}>{slots.default?.()}</blockquote>;
        };
    },
});

export { Blockquote };
