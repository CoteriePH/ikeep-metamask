const Joi = require("joi");
import client from "@lib/prisma_client";
import { hash } from "@util/hash";
import validate from "@util/validate";
import { decrypt } from "./add";

const bodySchema = Joi.object({
    account_id: Joi.string().required()
});

export default validate({ body: bodySchema }, async (req, res) => {

    if (req.method !== 'DELETE') {
        res.status(405).send({ message: 'Method Not Allowed' });
        return;
    }

    const token = req.headers.authorization;
    if (!token) {
        res.status(401).end();
        return;
    }

    try {
        const deleteAccount = await client.account.delete({
            where: { id: req.body.account_id }
        });
        if (!deleteAccount) {
            res.status(400).send('Account not found');
            return;
        }

        res.status(200).send(deleteAccount);

    } catch (error) {
        res.status(500).send(error);
    }
});