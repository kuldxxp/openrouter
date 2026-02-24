
import { t } from 'elysia';

export namespace AuthModel {
    export const signUpSchema = t.Object({
        email: t.String(),
        password: t.String(),
    });

    export type signUpSchema = typeof signUpSchema.static;

    export const signUpResponseSchema = t.Object({
        id: t.String(),
    });

    export type signUpResponseSchema = typeof signUpResponseSchema.static;

    export const signUpFailedResponseSchema = t.Object({
        message: t.Literal('Error while signing up'),
    });

    export type signUpFailedResponseSchema = typeof signUpFailedResponseSchema.static;
    
    export const loginSchema = t.Object({
        email: t.String(),
        password: t.String(),
    });

    export type loginSchema = typeof loginSchema.static;

    export const loginResponseSchema = t.Object({
        message: t.Literal('Login successful'),
    });

    export type loginResponseSchema = typeof loginResponseSchema.static;
    
    export const loginFailedResponseSchema = t.Object({
        message: t.Literal('Error while logging in'),
    });

    export type loginFailedResponseSchema = typeof loginFailedResponseSchema.static;
}
