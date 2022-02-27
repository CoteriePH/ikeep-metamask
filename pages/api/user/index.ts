import { dehash } from "@util/hash";
import client from "@lib/prisma_client";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') return res.status(405).send({ message: 'Method Not Allowed' });

    const token = req.headers.authorization;
    const { walletAddress } = JSON.parse(req.body);

    try {

        if (walletAddress) {

            const user = await client.user.findFirst({
                where: { wallet_address: walletAddress }
            });
            if (user) return res.status(200).send(user.nickname);
        }
        else if (token) {
            const user = await client.user.findUnique({
                where: { id: dehash(token) },
                include: { accounts: true }
            });
            if (user) return res.status(200).send(user);
        }
        return res.status(404).send('user not found');
    }
    catch (error) {
        return res.status(500).send(error);
    }
};