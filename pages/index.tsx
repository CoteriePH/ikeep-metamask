import useForm from '@hooks/useForm';
import Text from '@styled/Text';
import TextInput from '@styled/TextInput';
import type { NextPage } from 'next';
import React from 'react';

const Home: NextPage = () => {

  const { values, onInputHandler } = useForm({ username: '', password: '' });

  return <>
    <Text as='h1' m={1}> {values.username} {values.password} </Text>
    <TextInput
      name='username'
      placeholder='Username'
      onInput={onInputHandler} />
    <TextInput
      type='password'
      name='password'
      placeholder='Password'
      onInput={onInputHandler} />
  </>;
};

export default Home;
