
import { prisma } from "db";

export abstract class AuthService {
    static async signUp(email: string, password: string): Promise<string> {
        const user = await prisma.user.create({
            data: {
                email,
                password: await Bun.password.hash(password),
            },
        });
        
        return user.id.toString();
    }

    static async login(email: string, password: string): Promise<{ correctCredentials: boolean, userId?: string }> {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            return {
                correctCredentials: false,
            }
        } else {
            const ok = await Bun.password.verify(password, user.password);

            if (!ok) {
                return {
                    correctCredentials: false,
                }
            } else {
                return {
                    correctCredentials: true,
                    userId: user.id.toString(),
                }
            }
        }
    }
}
