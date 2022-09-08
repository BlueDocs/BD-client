import { RouteRecordRaw } from 'vue-router';
import { BlankLayout, DefaultLayout } from '../layouts';

/**
 * 全局路由路径管理，用于页面间跳转
 *
 * @examples
 * ```ts
 * import { RoutesMap, router } from '@/router';
 *
 * router.push(RoutesMap.DEFAULT);
 * ```
 */
export const RoutesMap = {
    /**基础路径 */
    DEFAULT: '/',
    /**空白基础路径 */
    BLANK_DEFAULT: '/b',
} as const;

/**
 * 全局路由，用于注册
 */
export const routes: RouteRecordRaw[] = [
    // 基础 layout
    {
        path: RoutesMap.DEFAULT,
        component: DefaultLayout,
        children: [],
    },
    // 空白 layout
    {
        path: RoutesMap.BLANK_DEFAULT,
        component: BlankLayout,
        children: [],
    },
    // 兜底路由
    {
        path: '/:pathMatch(.*)*',
        name: Symbol('Not Found'),
        redirect() {
            return RoutesMap.DEFAULT;
        },
    },
];
