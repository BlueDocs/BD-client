import { defineComponent, PropType, toRefs } from 'vue';
import { RendererContextProvider } from './context';
import { DynamicRenderer } from './DynamicRenderer';
import { MarkdownToken } from '@/interfaces';

/**
 * Markdown 渲染结果组件
 */
const Renderer = defineComponent({
    name: 'Renderer',
    props: {
        tokens: {
            type: Array as PropType<MarkdownToken[]>,
            default: () => [],
        },
    },
    setup(props) {
        const { tokens } = toRefs(props);

        const namespace = 'renderer';

        return () => {
            const elements = (function render(t: MarkdownToken[]) {
                return t.map(item => {
                    if (item.type === 'text') {
                        return item.content;
                    }

                    if (item.tag === 'pre') {
                        return <DynamicRenderer tag='pre'>{item.content}</DynamicRenderer>;
                    }

                    return (
                        <DynamicRenderer tag={item.tag}>
                            {item.children?.length && render(item.children)}
                        </DynamicRenderer>
                    );
                });
            })(tokens.value);

            return (
                <RendererContextProvider namespace={namespace}>
                    <div class={namespace}>{elements}</div>
                </RendererContextProvider>
            );
        };
    },
});

export { Renderer };
