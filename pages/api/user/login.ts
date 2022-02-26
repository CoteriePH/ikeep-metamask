import client from '@lib/prisma_client';
import { hash } from '@util/hash';
import validate from '@util/validate';
import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

const schema = Joi.object({
    decrypting_pin: Joi.string().required(),
    wallet_address: Joi.string().required(),
});

export default validate({ body: schema }, async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(405).send({ message: 'Method Not Allowed' });

    try {
        const { decrypting_pin, wallet_address } = req.body;

        const userExists = await client.user.findFirst({
            where: { decrypting_pin: hash(decrypting_pin), wallet_address: wallet_address },
            include: { accounts: true },
        });

        if (userExists) res.status(200).send({
            nickname: userExists.nickname,
            accounts: userExists.accounts,
            avatar: userExists.avatar,
            accessToken: hash(userExists.id),
        });
        else res.status(404).send({ message: 'User not found' });

    } catch (error) {
        res.status(500).send(error);
    }
});