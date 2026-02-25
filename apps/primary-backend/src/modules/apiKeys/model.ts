import { t } from "elysia";

export namespace ApiKeyModel {
    export const createApiKeySchema = t.Object({
        name: t.String(),
    }) 

    export type createApiKeySchema = typeof createApiKeySchema.static;
    
    export const createApiKeyResponseSchema = t.Object({
        id: t.String(),
        apiKey: t.String(),
    }) 

    export type createApiKeyResponseSchema = typeof createApiKeyResponseSchema.static;

    export const createApiKeyFailedResponseSchema = t.Object({
        message: t.Literal('Creating api key failed'),
    }) 

    export type createApiKeyFailedResponseSchema = typeof createApiKeyFailedResponseSchema.static;

    export const getApiKeyResponseSchema = t.Object({
        apiKeys: t.Array(t.Object({
            id: t.String(),
            name: t.String(),
            apiKey: t.String(),
            creditsConsumed: t.Number(),
            lastUsed: t.Nullable(t.Date()),
            status: t.Boolean(),
        })),
    })

    export type getApiKeyResponseSchema = typeof getApiKeyResponseSchema.static;

    export const updateApiKeySchema = t.Object({
        id: t.String(),
        disabled: t.Boolean(),
    })

    export type updateApiKeySchema = typeof updateApiKeySchema.static;

    export const updateApiKeyResponseSchema = t.Object({
        message: t.Literal('Api key updated successfully'),
    })

    export type updateApiKeyResponseSchema = typeof updateApiKeyResponseSchema.static;

    export const updateApiKeyFailedResponseSchema = t.Object({
        message: t.Literal('Updating api key unsuccessful'),
    })

    export type updateApiKeyFailedResponseSchema = typeof updateApiKeyFailedResponseSchema.static;

    export const deleteApiKeyResponseSchema = t.Object({
        message: t.Literal('Api key deleted successfully'),
    })

    export type deleteApiKeyResponseSchema = typeof deleteApiKeyResponseSchema.static;

    export const deleteApiKeyFailedResponseSchema = t.Object({
        message: t.Literal('Deleting api key unsuccessful'),
    })

    export type deleteApiKeyFailedResponseSchema = typeof deleteApiKeyFailedResponseSchema.static;
}
