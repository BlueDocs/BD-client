import { MarkdownToken } from '@/interfaces';
import Markdown from 'markdown-it';
import type Token from 'markdown-it/lib/token';

function createNode(tag: string, attrs: Omit<MarkdownToken, 'tag' | 'type'> = {}): MarkdownToken {
    return {
        tag,
        type: 'node',
        ...attrs,
    };
}

export function md2ast(md: string) {
    const markdown = new Markdown();

    const tokens = markdown.parse(md, {});

    return (function transform(originToken: Token[], stack: MarkdownToken[] = []) {
        return originToken.reduce<MarkdownToken[]>((t, token) => {
            const { type, tag, children, content, markup } = token;

            // 开始标签
            if (/_open$/.test(type)) {
                // 入栈 因为 group 解析还没结束
                stack.push(createNode(tag));
                return t;
            }

            // 关闭标签
            if (/_close$/.test(type)) {
                // 出栈
                const current = stack.pop();

                // 如果不是成对出现，抛出错误
                if (!current) {
                    throw new Error('Markdown 解析错误');
                }

                // 如果栈是空的，证明 group 已经解析完成，推入主 token 中
                if (!stack.length) {
                    return t.concat([current]);
                }

                // 如果栈还存在元素，则这个肯定是上一层的子元素
                (stack.at(-1)!.children ||= []).push(current);

                return t;
            }

            if (type === 'inline') {
                // 有子元素，则递归操作
                if (children?.length) {
                    const current = transform(children, stack);

                    // 一定是存到 stack 最后一个
                    // 如果栈还存在元素，则这个肯定是上一层的子元素
                    (stack.at(-1)!.children ||= []).concat(current);
                    return t;
                }

                return t.concat([createNode(tag)]);
            }

            if (type === 'text' && content) {
                const current: MarkdownToken = { tag, type: 'text', content };
                (stack.at(-1)!.children ||= []).push(current);
                return t;
            }

            if (type === 'fence' && markup === '```') {
                return t.concat([
                    {
                        tag: 'pre',
                        content,
                        type: 'node',
                    },
                ]);
            }

            return t;
        }, []);
    })(tokens);
}
