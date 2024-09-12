import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import TextInput from '../components/TextInput';
import ErrorText from '../components/ErrorText';
import {useDispatch} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CreateUserVars, HomeStackParams, Token} from '../interfaces/interfaces';
import {RegisterFormField, signupSchema} from '../zod/schemas';
import MButton from '../components/MButton';
import {ApolloError, useMutation} from '@apollo/client';
import {CREATE_USER} from '../graphql/graphql';
import {setToken} from '../redux/AuthSlice';
import SemiBoldText from '../components/SemiBoldText';
import {MyColors} from '../constants/MyColors';
import AccountSuggestion from '../components/AccountSuggestion';
import BoldText from '../components/BoldText';

type Props = NativeStackScreenProps<HomeStackParams, 'SignUp'>;

const SignUp = ({route, navigation}: Props) => {
  const {params} = route;
  const dispatch = useDispatch();
  const [createUser, {data, loading}] = useMutation<Token, CreateUserVars>(
    CREATE_USER,
  );
  const [errorMessage, setErrorMessage] = useState('');

  const {control, handleSubmit} = useForm<RegisterFormField>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormField> = async data => {
    try {
      const response = await createUser({
        variables: {
          createUserInput: {
            fullname: data.fullname,
            email: data.email,
            password: data.password,
          },
        },
      });

      dispatch(setToken(response.data?.createUser?.token!));

      setErrorMessage('');
    } catch (error: any) {
      const e = error as ApolloError;
      console.log(e.message);
      setErrorMessage(e.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <BoldText style={styles.headingText}>Sign Up</BoldText>

      <TextInput<RegisterFormField>
        name="fullname"
        control={control}
        label="Full Name"
        placeholderText={'e.g. John Samiul'}
      />

      <TextInput<RegisterFormField>
        name="email"
        control={control}
        label="Email"
        placeholderText={'e.g. contact@gmail.com'}
      />

      <TextInput<RegisterFormField>
        name="password"
        control={control}
        label="Password"
        secureTextEntry={true}
        placeholderText={'*********'}
      />

      <AccountSuggestion
        btnLabel="Sign In Here"
        label="Already Have An Account?"
        onPress={() => navigation.navigate('SignIn')}
      />

      {<ErrorText errorMessage={errorMessage} />}
      <MButton
        label="Sign Up"
        onPress={handleSubmit(onSubmit)}
        iconName={'account-plus'}
        style={{alignSelf: 'flex-end'}}
        loading={loading}
      />
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
  headingText: {
    fontSize: 25,
    marginVertical: 25,
  },
  btn: {
    color: MyColors.primaryColor,
  },
});
