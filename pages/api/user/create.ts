import client from '@lib/prisma_client';
import { hash } from '@util/hash';
import validate from '@util/validate';
import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

const schema = Joi.object({
    decrypting_pin: Joi.string().required(),
    nickname: Joi.string().required(),
    avatar: Joi.string().required(),
    wallet_address: Joi.string().required(),
});

export default validate({ body: schema }, async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(405).send({ message: 'Method Not Allowed' });

    const { decrypting_pin, wallet_address } = req.body;

    try {
        if (decrypting_pin.trim().length < 9) return res.status(400).send({ message: 'Decrypting pin must be at least 9 characters long' });
        if (wallet_address.trim().length < 10) return res.status(400).send({ message: 'Wallet address must be at least 10 characters long' });

        const user = await client.user.create({
            data: {
                ...req.body,
                decrypting_pin: hash(decrypting_pin)
            }
        });

        if (user) res.status(200).send({ message: 'User created successfully', user });
        else res.status(500).send({ message: 'Something went wrong' });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Looks like you already have an account' });
    }
});