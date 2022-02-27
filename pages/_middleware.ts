import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const baseUrl = process.env.BASE_URL;
let url = '';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    url = req.url;

    const addressIsSet = !noAddressSet(req);
    const hasSession = req.cookies.token;

    if (urlIs('/')) {
        if (!addressIsSet) return redirect('/index.html');
        else {
            const userExist = await aUserOwnThisAddress(req.cookies.userWalletAddress);
            return redirect(userExist ? '/login' : '/create');
        }
    }
    if (urlIs('/login')) {
        if (!addressIsSet) return redirect('/index.html');
        const userExist = await aUserOwnThisAddress(req.cookies.userWalletAddress);
        if (userExist && hasSession) return redirect('/accounts');
        if (!userExist) return redirect('/create');
    }
    if (urlIs('/create')) {
        if (!addressIsSet) return redirect('/index.html');
        if (addressIsSet && hasSession) return redirect('/accounts');
        const userExist = await aUserOwnThisAddress(req.cookies.userWalletAddress);

        if (userExist) return redirect('/login');
    }
    if (urlIs('/accounts')) {
        if (!addressIsSet) return redirect('/index.html');
        if (addressIsSet && !hasSession) return redirect('/login');
    }
    if (urlIs('/accounts/add')) {
        if (!addressIsSet) return redirect('/index.html');
        if (addressIsSet && !hasSession) return redirect('/login');
    }
}

function redirect(relativeUrl: string) {
    return NextResponse.redirect(baseUrl + relativeUrl);
}

function urlIs(relativeUrl: string) {
    return url === baseUrl + relativeUrl;
}

function noAddressSet(req: NextRequest) {
    return !req.cookies.userWalletAddress;
}

async function aUserOwnThisAddress(wallet_address: string) {
    try {
        const res = await fetch(baseUrl + '/api/user', {
            method: 'POST',
            body: JSON.stringify({ walletAddress: wallet_address })
        });

        return res.ok;
    } catch (error) {
        return false;
    }
}