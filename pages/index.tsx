import useForm from '@hooks/useForm';
import { BlueButton } from '@styled/Buttont';
import Center from '@styled/Center';
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
    <Center direction='column' gap={1}>
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
      <BlueButton onClick={e => console.log('hello')}> Save </BlueButton>
    </Center>
  </>;
};

export default Home;
