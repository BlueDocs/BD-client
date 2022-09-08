import { computed, defineComponent, toRefs } from 'vue';
import Markdown from 'markdown-it';

/**
 * Markdown 渲染结果组件
 */
const Renderer = defineComponent({
    name: 'Renderer',
    props: {
        markdown: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        const { markdown } = toRefs(props);

        const renderer = new Markdown();

        const rendered = computed(() => renderer.render(markdown.value));

        return () => {
            return <div innerHTML={rendered.value} />;
        };
    },
});

export { Renderer };
