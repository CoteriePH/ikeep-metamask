const Joi = require("joi");
import client from "@lib/prisma_client";
import { hash } from "@util/hash";
import validate from "@util/validate";
import { decrypt } from "./add";

const bodySchema = Joi.object({
    account_id: Joi.string().required(),
    pin: Joi.string().required()
});

export default validate({ body: bodySchema }, async (req, res) => {

    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Method Not Allowed' });
        return;
    }

    const token = req.headers.authorization;

    if (!token) {
        res.status(401).end();
        return;
    }

    const { account_id, pin } = req.body;

    try {
        const accountExist = await client.account.findUnique({
            where: { id: account_id },
            include: { owner: true }
        });
        if (!accountExist) {
            res.status(400).send('Account not found');
            return;
        }
        res.status(200).send({
            username_email: decrypt(accountExist.username_email, hash(pin)),
            password: decrypt(accountExist.password, hash(pin)),
        });

    } catch (error) {
        res.status(500).send(error);
    }
});