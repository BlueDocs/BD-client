import { createContext } from 'vc-state';

export interface RendererContextProviderProps {
    namespace: string;
}

/**
 * Markdown 渲染器 context
 */
const [RendererContextProvider, useRendererContext] = createContext((props: RendererContextProviderProps) => {
    function createNamespace(...names: string[]) {
        return names.reduce((t, c) => `${t}-${c}`, props.namespace);
    }

    return {
        createNamespace,
    };
});

export { RendererContextProvider, useRendererContext };
