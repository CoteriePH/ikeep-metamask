import useForm from '@hooks/useForm';
import Column from '@styled/Column';
import Container from '@styled/Container';
import Row from '@styled/Row';
import Text from '@styled/Text';
import TextInput from '@styled/TextInput';
import type { NextPage } from 'next';
import React from 'react';

const Home: NextPage = () => {

  const { values, onInputHandler } = useForm({ username: 'das', password: 'asd' });

  return <>
    <Row verticalAlignment='center' horizontalAlignment='center' height='100vh'>
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
    </Row>
  </>;
};

export default Home;
