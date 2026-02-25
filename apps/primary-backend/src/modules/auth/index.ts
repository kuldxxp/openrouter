
import { Elysia } from 'elysia';
import { AuthModel } from './model';
import { AuthService } from './service';
import jwt from '@elysiajs/jwt';

export const app = new Elysia({ prefix: '/auth' })
    .use(
        jwt({
            name: 'jwt',
            secret: process.env.JWT_SECRET ?? 'dev secret',
        })
    )
    .post('/sign-up', async ({ body, status }) => {
        try {
            const userId = await AuthService.signUp(body.email, body.password);

            return {
                id: userId,
            }
        } catch (err) {
            console.error(`Error signing up: ${err}`);

            return status(400, {
                message: 'Error while signing up',
            })
        }
    }, {
        body: AuthModel.signUpSchema,
        response: {
            200: AuthModel.signUpResponseSchema,
            400: AuthModel.signUpFailedResponseSchema,
        },
    })
    .post('/login', async ({  body, status, cookie: { auth }, jwt }) => {
        try {
            const {
                correctCredentials,
                userId,
            } = await AuthService.login(body.email, body.password);

            if (correctCredentials && userId) {
                const token = await jwt.sign({ userId });

                auth.set({
                    value: token,
                    httpOnly: true,
                    maxAge: 7 * 86400,
                });

                return {
                    message: 'Login successful',
                }
            } else {
                return status(403, {
                    message: 'Error while logging in',
                });
            }
        } catch (err) {
            console.error(`Error logging in: ${err}`);

            return status(403, {
                message: 'Error while logging in',
            });
        }
    }, {
        body: AuthModel.loginSchema,
        response: {
            200: AuthModel.loginResponseSchema,
            403: AuthModel.loginFailedResponseSchema,
        },
    })
