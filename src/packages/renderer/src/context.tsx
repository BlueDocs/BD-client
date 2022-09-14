import { createContext } from 'vc-state';
import { MarkdownRendererComponents } from './interfaces';
import { Heading, Blockquote, Pre, Link, Code, Paragraph } from './components';

export interface MarkdownRendererContextProviderProps {
    namespace?: string;
    components?: MarkdownRendererComponents;
}

const defaultComponents: MarkdownRendererComponents = {
    h1: () => <Heading level={1} />,
    h2: () => <Heading level={2} />,
    h3: () => <Heading level={3} />,
    h4: () => <Heading level={4} />,
    h5: () => <Heading level={5} />,
    h6: () => <Heading level={6} />,
    blockquote: () => <Blockquote />,
    pre: () => <Pre />,
    a: () => <Link />,
    code: () => <Code />,
    p: () => <Paragraph />,
};

/**
 * Markdown 渲染器 context
 */
const [MarkdownRendererContextProvider, useMarkdownRendererContext] = createContext(
    (props: MarkdownRendererContextProviderProps) => {
        const { components = {}, namespace = 'renderer' } = props;

        const dynamicComponents = Object.assign({}, defaultComponents, components);

        function createNamespace(...names: string[]) {
            return names.reduce((t, c) => `${t}-${c}`, namespace);
        }

        return {
            namespace,
            createNamespace,
            dynamicComponents,
        };
    }
);

export { MarkdownRendererContextProvider, useMarkdownRendererContext };
