import { GetServerSideProps } from 'next';
import cookie from 'cookie';

import type { NextPage } from 'next';
import React from 'react';

const Home: NextPage = () => {
  return <></>;
};
export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {

  if (!context.req.headers.cookie) return {
    redirect: { destination: '/index.html', permanent: false }
  };
  let ikeepSession = cookie.parse(context.req.headers.cookie).token;

  const userHasSession =
    !(ikeepSession === undefined ||
      ikeepSession === '' ||
      ikeepSession === null);

  if (userHasSession)
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  return {
    redirect: { destination: '/index.html', permanent: false }
  };
};