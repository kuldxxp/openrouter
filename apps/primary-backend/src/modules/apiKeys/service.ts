
import { prisma } from "db"

const apiSet = String(process.env.API_SET);

export abstract class ApiKeyService {
    static createRandomApiKey() {
        let suffixKey = '';

        for (let i = 0; i < Number(process.env.API_KEY_LENGTH); i++) {
            suffixKey += apiSet[Math.floor(Math.random() * apiSet.length)]
        }

        return `sk-or-v1-${suffixKey}`
    }

    static async createApiKey(name: string, userId: number): Promise<{
        id: string,
        apiKey: string,
    }> {
        const apiKey = ApiKeyService.createRandomApiKey();

        const apiKeyDb = await prisma.apiKey.create({
            data: {
                name,
                apiKey,
                userId,
            }
        });

        return {
            id: apiKeyDb.id.toString(),
            apiKey
        }
    }

    static async getApiKeys(userId: number) {
        const apiKeys = prisma.apiKey.findMany({
            where: {
                userId: userId,
                deleted: false,
            }
        })

        return (await apiKeys).map(apiKey => ({
            id: apiKey.id.toString(),
            name: apiKey.name,
            apiKey: apiKey.apiKey,
            creditsConsumed: apiKey.creditsConsumed,
            lastUsed: apiKey.lastUsed,
            status: apiKey.disabled,
        }))
    }

    static async updateApiKey(apiKeyId: number, disabled: boolean) {
        await prisma.apiKey.update({
            where: {
                id: apiKeyId,
            },
            data: {
                disabled,
            }
        });
    }

    static async delete(id: number) {
        await prisma.apiKey.update({
            where: {
                id,
            },
            data: {
                deleted: true,
            },
        });
    }
}
