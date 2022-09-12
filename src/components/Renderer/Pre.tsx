import { defineComponent } from 'vue';
import highlight from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { useRendererContext } from './context';

highlight.registerLanguage('javascript', javascript);

const Pre = defineComponent({
    name: 'PreRenderer',
    setup(props, { slots }) {
        const { createNamespace } = useRendererContext();

        return () => {
            return (
                <pre
                    class={createNamespace('pre')}
                    innerHTML={
                        highlight.highlight((slots.default?.()[0].children as string) || '', { language: 'javascript' })
                            .value
                    }
                ></pre>
            );
        };
    },
});

export { Pre };
