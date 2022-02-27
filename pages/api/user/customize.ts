import { dehash } from '@util/hash';
import validate from '@util/validate';
import Joi from 'joi';
import client from '../../../lib/prisma_client';

const schema = Joi.object({
    nickname: Joi.string().required(),
    avatar: Joi.string().required(),
});

export default validate({ body: schema }, async (req, res) => {

    if (req.method !== 'PATCH') return res.status(405).send({ message: 'Method Not Allowed' });
    const token = req.headers.authorization;
    if (!token) return res.status(401).send('Unauthorized');

    try {
        const update = await client.user.update({
            where: { id: dehash(token) },
            data: {
                nickname: req.body.nickname,
                avatar: req.body.avatar,
            }
        });
        if (!update) return res.status(500).send({ message: 'Cannot update because of a server error' });
        res.status(200).send({ message: 'Successfully updated', data: update });

    } catch (error) {
        res.status(500).send(error);
    }
});