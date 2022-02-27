const Joi = require("joi");
import { dehash } from "@util/hash";
import validate from "@util/validate";
import client from "../../../lib/prisma_client";
import { decrypt, encrypt } from "./add";

const bodySchema = Joi.object({
    id: Joi.string().required(),
    username_email: Joi.string().required(),
    password: Joi.string().required(),
});

export default validate({ body: bodySchema }, async (req: any, res: any) => {

    if (req.method !== 'PATCH') return res.status(405).send('Method Not Allowed');

    const token = req.headers.authorization;
    if (!token) return res.status(401).end();

    try {
        const { id, username_email, password } = req.body;

        const owner = await client.user.findUnique({
            where: { id: dehash(token) },
        });

        if (!owner) return res.status(404).send('No user own this account');

        const accountUpdated = await client.account.update({
            where: { id: id },
            data: {
                username_email: encrypt(username_email, owner.decrypting_pin),
                password: encrypt(password, owner.decrypting_pin),
            }
        });
        res.status(200).send(accountUpdated);

    } catch (error) {
        res.status(500).send(error);
    }
});