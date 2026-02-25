
import { prisma } from "db";

const onrampAmt = Number(process.env.ONRAMP_AMOUNT);

export abstract class PaymentsService {
    static async onramp(userId: number) {
        const [user] = await prisma.$transaction([
            prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    credits: {
                        increment: onrampAmt,
                    },
                },
            }),
    
            prisma.onrampTransaction.create({
                data: {
                    userId,
                    amount: onrampAmt,
                    status: 'completed',
                }
            }),
        ]);

        return user.credits;
    }
}
