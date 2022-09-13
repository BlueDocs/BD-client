
export type MarkdownTokenType = 'text' | 'node';

export type MarkdownToken = {
    tag: string;
    children?: MarkdownToken[];
    type: MarkdownTokenType;
    content?: string;
};
