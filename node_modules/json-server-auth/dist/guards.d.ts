import { Router } from 'express';
declare const _default: import("express-serve-static-core").Router;
/**
 * Guards router
 */
export default _default;
/**
 * Transform resource-guard mapping to proper rewrite rule supported by express-urlrewrite.
 * Return other rewrite rules as is, so we can use both types in routes.json.
 * @example
 * { 'users': 600 } => { '/users*': '/600/users$1' }
 */
export declare function parseGuardsRules(resourceGuardMap: {
    [resource: string]: any;
}): {
    [rule: string]: string;
};
/**
 * Conveniant method to use directly resource-guard mapping
 * with JSON Server rewriter (which itself uses express-urlrewrite).
 * Works with normal rewrite rules as well.
 */
export declare function rewriter(resourceGuardMap: {
    [resource: string]: number;
}): Router;
