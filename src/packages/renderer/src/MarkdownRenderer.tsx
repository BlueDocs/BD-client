import { defineComponent, PropType, toRefs, h } from 'vue';
import { MarkdownToken } from '@/interfaces';
import { useMarkdownRendererContext } from './context';

const DynamicRenderer = defineComponent({
    name: 'DynamicRenderer',
    props: {
        tag: {
            type: String,
            required: true,
        },
    },
    setup(props, { slots }) {
        const { dynamicComponents } = useMarkdownRendererContext();

        const createComponent = dynamicComponents[props.tag] || dynamicComponents['p'];

        return () => h(createComponent(), slots.default);
    },
});

/**
 * Markdown 渲染结果组件
 */
export const MarkdownRenderer = defineComponent({
    name: 'MarkdownRenderer',
    props: {
        tokens: {
            type: Array as PropType<MarkdownToken[]>,
            default: () => [],
        },
    },
    setup(props) {
        const { tokens } = toRefs(props);

        const { namespace } = useMarkdownRendererContext();

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

            return <div class={namespace}>{elements}</div>;
        };
    },
});
