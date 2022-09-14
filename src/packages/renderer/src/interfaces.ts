import { VNode } from 'vue';

export type MarkdownTokenType = 'element' | 'text' | 'code_block';

export interface MarkdownToken {
    type: MarkdownTokenType;
    children?: MarkdownToken[];
}

export interface MarkdownElement extends MarkdownToken {
    tag: string;
    type: 'element';
}

export interface MarkdownText extends MarkdownToken {
    content: string;
    type: 'text';
}

export interface MarkdownCodeBlock extends MarkdownToken {
    tag: 'pre';
    content: string;
    type: 'code_block';
}

export type MarkdownRendererComponentAttrs = Record<string, any>;

export type MarkdownRendererComponent = (attrs?: MarkdownRendererComponentAttrs) => VNode;

export type MarkdownRendererComponents = Record<string, MarkdownRendererComponent>;
