
import { t } from 'elysia';
 
export namespace PaymentsModel {
    export const onRampResponseSchema = t.Object({
        message: t.Literal('Onramp successful'),
        credits: t.Number(),
    }); 

    export type onRampResponseSchema = typeof onRampResponseSchema.static;

    export const onRampFailedResponseSchema = t.Object({
        message: t.Literal('Onramp failed'),
    }); 

    export type onRampFailedResponseSchema = typeof onRampFailedResponseSchema.static;
}
