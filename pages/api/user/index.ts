import { dehash } from "@util/hash";
import client from "@lib/prisma_client";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') return res.status(405).send({ message: 'Method Not Allowed' });

    const token = req.headers.authorization;

    let walletAddress = req.body.walletAddress;

    try {

        if (walletAddress) {
            const user = await client.user.findFirst({
                where: { wallet_address: walletAddress }
            });
            if (user) return res.status(200).send(user.nickname);
        }
        if (token) {
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