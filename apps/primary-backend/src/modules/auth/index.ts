
import { Elysia } from 'elysia';
import { AuthModel } from './model';
import { AuthService } from './service';

export const app = new Elysia({ prefix: '/auth' })
    .post('/sign-up', async ({ body }) => {
        const userId = await AuthService.signUp(body.email, body.password);

        return {
            id: userId,
        }
    }, {
        body: AuthModel.signUpSchema,
        response: {
            200: AuthModel.signUpResponseSchema,
            400: AuthModel.signUpFailedResponseSchema,
        },
    })
    .post('/login', async ({  body }) => {
        const token = await AuthService.login(body.email, body.password);

        return {
            token,
        }
    }, {
        body: AuthModel.loginSchema,
        response: {
            200: AuthModel.loginResponseSchema,
            403: AuthModel.loginFailedResponseSchema,
        },
    })
