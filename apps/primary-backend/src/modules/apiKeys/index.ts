
import { Elysia } from "elysia";

import { authMiddleware } from "src/middlewares/auth";
import { ApiKeyService } from "./service";
import { ApiKeyModel } from "./model";

export const app = new Elysia({ prefix: '/api-keys' })
    .use(authMiddleware)
    .post('/', async ({ userId, body, status }) => {
        try {
            const { apiKey, id } = await ApiKeyService.createApiKey(body.name, Number(userId))

            return {
                id,
                apiKey,
            }
        } catch (err) {
            console.error(`Error creating api key: ${err}`);

            return status(503, {
                message: 'Creating api key failed',
            })
        }
    }, {
        body: ApiKeyModel.createApiKeySchema,
        response: {
            200: ApiKeyModel.createApiKeyResponseSchema,
            503: ApiKeyModel.createApiKeyFailedResponseSchema,
        }
    })
    .get('/', async ({ userId }) => {
        const apiKeys = await ApiKeyService.getApiKeys(Number(userId));

        return {
            apiKeys: apiKeys
        }
    }, {
        response: {
            200: ApiKeyModel.getApiKeyResponseSchema,
        }
    })
    .put('/', async ({ body, status }) => {
        try {
            await ApiKeyService.updateApiKey(Number(body.id), body.disabled);

            return status(200, {
                message: 'Api key updated successfully',
            });
        } catch (err) {
            console.error(`Error disabling api key: ${err}`);
            
            return status(411, {
                message: 'Updating api key unsuccessful',
            });
        }
    }, {
        body: ApiKeyModel.updateApiKeySchema,
        response: {
            200: ApiKeyModel.updateApiKeyResponseSchema,
            411: ApiKeyModel.updateApiKeyFailedResponseSchema,
        }
    })
    .delete('/:id', async ({ params: { id }, status }) => {
        try {
            await ApiKeyService.delete(Number(id));

            return status(200, {
                message: 'Api key deleted successfully',
            });
        } catch (err) {
            console.error(`Error deleting api key: ${err}`);
            
            return status(409, {
                message: 'Deleting api key unsuccessful',
            });
        }
    }, {
        response: {
            200: ApiKeyModel.deleteApiKeyResponseSchema,
            409: ApiKeyModel.deleteApiKeyFailedResponseSchema,
        }
    })
