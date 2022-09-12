import { defineComponent, h, VNode } from 'vue';
import { Heading } from './Heading';
import { Paragraph } from './Paragraph';
import { Blockquote } from './Blockquote';
import { Pre } from './Pre';
import { Code } from './Code';

export const DynamicRenderer = defineComponent({
    name: 'DynamicRenderer',
    props: {
        tag: {
            type: String,
            required: true,
        },
    },
    setup(props, { slots }) {
        const ComponentMap: Record<string, () => VNode> = {
            h1: () => <Heading level={1} />,
            h2: () => <Heading level={2} />,
            h3: () => <Heading level={3} />,
            h4: () => <Heading level={4} />,
            h5: () => <Heading level={5} />,
            h6: () => <Heading level={6} />,
            blockquote: () => <Blockquote />,
            pre: () => <Pre />,
            a: () => <Code />,
            p: () => <Paragraph />,
        };

        const createComponent = ComponentMap[props.tag] || ComponentMap['p'];

        return () => h(createComponent(), null, slots.default);
    },
});
