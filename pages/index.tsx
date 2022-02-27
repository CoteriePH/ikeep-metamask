import React from 'react';

const Home: NextPage = () => {
  return <></>;
};
export default Home;

// ========================================================

import type { GetServerSideProps, NextPage } from 'next';
import cookie from 'cookie';

export const getServerSideProps: GetServerSideProps = async (context) => {

  const reqCookie = context.req.headers.cookie ? cookie.parse(context.req.headers.cookie) : {};

  if (reqCookie) {
    const token = reqCookie.token;
    const address = reqCookie.userWalletAddress;
    if (!token && !address) return { redirect: { destination: '/index.html', permanent: false } };

    if (address && token) {
      const res = await fetch(process.env.BASE_URL + "/api/user", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: address })
      });

      if (res.ok) {
        return { redirect: { destination: '/login', permanent: false } };
      }
      else return { redirect: { destination: '/create', permanent: false } };
    }
  }

  return { redirect: { destination: '/index.html', permanent: false } };
};