import { defineComponent } from 'vue';
import { useRendererContext } from './context';

const Paragraph = defineComponent({
    name: 'ParagraphRenderer',
    setup(props, { slots }) {
        const { createNamespace } = useRendererContext();

        return () => {
            return <p class={createNamespace('paragraph')}>{slots.default?.()}</p>;
        };
    },
});

export { Paragraph };
