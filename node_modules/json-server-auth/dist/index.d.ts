import { Handler } from 'express';
import { rewriter } from './guards';
interface MiddlewaresWithRewriter extends Array<Handler> {
    rewriter: typeof rewriter;
}
declare const middlewares: MiddlewaresWithRewriter;
export = middlewares;
