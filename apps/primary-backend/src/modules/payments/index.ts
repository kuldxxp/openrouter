
import Elysia from 'elysia';
import { PaymentsModel } from './model';
import { PaymentsService } from './service';

import { authMiddleware } from 'src/middlewares/auth';

export const app = new Elysia({ prefix: '/payments' })
    .use(authMiddleware)
    .post('/onramp', async ({ userId, status }) => {
        try {
            const credits = await PaymentsService.onramp(Number(userId));

            return {
                message: 'Onramp successful' as const,
                credits,
            }
        } catch (err) {
            console.error(`Error making onramp transaction: ${err}`);

            return status(411, {
                message: 'Onramp failed',
            })
        }
    }, {
        response: {
            200: PaymentsModel.onRampResponseSchema,
            411: PaymentsModel.onRampFailedResponseSchema,
        }
    })
