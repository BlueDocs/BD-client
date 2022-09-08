import 'vue-router';

declare module 'vue-router' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface RouterMeta {
        // 这里拓展 meta 的值
    }
}
