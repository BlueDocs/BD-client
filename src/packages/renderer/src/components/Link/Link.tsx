import { defineComponent } from 'vue';
import { useMarkdownRendererContext } from '../../context';

export const Link = defineComponent({
    name: 'LinkRenderer',
    setup(props, { slots }) {
        const { createNamespace } = useMarkdownRendererContext();
        return () => {
            return <a class={createNamespace('link')}>{slots.default?.()}</a>;
        };
    },
});
