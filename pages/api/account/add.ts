const Joi = require("joi");
import client from "../../../lib/prisma_client";
import jwt from "jsonwebtoken";
import validate from "@util/validate";
import { dehash } from "@util/hash";

const bodySchema = Joi.object({
    account_name: Joi.string().required(),
    username_email: Joi.string().required(),
    password: Joi.string().required(),
});

export function encrypt(value: string, pin: string) {
    return jwt.sign(value, pin);
}
export function decrypt(value: string, pin: string) {
    let result: any = '';
    jwt.verify(value, pin, (err, decoded) => {
        if (err) throw err;
        result = decoded;
    });
    return result;
}

export default validate({ body: bodySchema }, async (req: any, res: any) => {

    if (req.method !== 'POST') return res.status(405).send({ message: 'Method Not Allowed' });

    const token = req.headers.authorization;
    if (!token) return res.status(401).end();

    try {
        const { password, username_email, account_name } = req.body;
        const userId = dehash(token);

        const userExist = await client.user.findUnique({
            where: { id: userId },
            include: { accounts: true }
        });
        if (!userExist) return res.status(400).send('User not found');

        const duplicateAccountName = userExist.accounts.find((account: { account_name: any; }) => account.account_name === account_name);
        if (duplicateAccountName) return res.status(400).send('Account name already exists');

        const createdAccount = await client.account.create({
            data: {
                account_name: account_name,
                username_email: encrypt(username_email, userExist.decrypting_pin),
                password: encrypt(password, userExist.decrypting_pin),
                owner: { connect: { wallet_address: userExist.wallet_address } }
            }
        });

        res.status(200).send([...userExist.accounts, createdAccount]);

    } catch (error) {
        res.status(500).send(error);
    }
});