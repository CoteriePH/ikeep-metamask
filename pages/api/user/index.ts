import { dehash } from "@util/hash";
import client from "@util/prisma_client";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') return res.status(405).send({ message: 'method not allowed' });

    const token = req.headers.authorization;
    if (!token) return res.status(401).send({ message: 'unauthorized' });

    try {
        const user = await client.user.findUnique({
            where: { id: dehash(token) },
            include: { accounts: true }
        });
        if (user) return res.status(200).send(user);
        return res.status(404).send('user not found');
    }
    catch (error) {
        return res.status(500).send(error);
    }
}