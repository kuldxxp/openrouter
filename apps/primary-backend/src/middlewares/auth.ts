
import { Elysia } from 'elysia';
import jwt from '@elysiajs/jwt';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev secret';

interface JwtPayload {
    userId: string,
}

const isJwtPayload = (payload: unknown): payload is JwtPayload => {
    return (
        typeof payload === 'object' &&
        payload !== null &&
        'userId' in payload
    )
};

export const authMiddleware = new Elysia({ name: 'auth-middleware' })
    .use(
        jwt({
            name: 'jwt',
            secret: JWT_SECRET,
        })
    )
    .derive({ as: 'scoped' }, async ({ jwt, cookie, status }) => {
        const token = cookie.auth?.value;
        
        if (!token) {
            return status(401, {
                message: 'Unauthorized',
            })
        }

        const payload = await jwt.verify(token.toString());

        if (!isJwtPayload(payload)) {
            return status(401, {
                message: 'Unauthorized',
            })
        }

        return {
            userId: payload.userId as string,
        }
    })
