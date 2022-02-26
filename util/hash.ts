import jwt from "jsonwebtoken";

export function hash(value: string) {
    if (!process.env.IKEEP) throw new Error("No IKEEP environment variable set");
    return jwt.sign(value, process.env.IKEEP);
}

export function dehash(value: string) {
    if (!process.env.IKEEP) throw new Error("No IKEEP environment variable set");
    let result = '';
    jwt.verify(value, process.env.IKEEP, (err: any, decoded: any) => {
        if (err) throw err;
        result = decoded;
    });
    return result;
}