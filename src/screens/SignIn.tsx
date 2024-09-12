import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import TextInput from '../components/TextInput';
import ErrorText from '../components/ErrorText';
import {useDispatch} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {GetToken, GetUserVars, HomeStackParams} from '../interfaces/interfaces';
import {LoginFormField, loginSchema} from '../zod/schemas';
import MButton from '../components/MButton';
import SemiBoldText from '../components/SemiBoldText';
import BoldText from '../components/BoldText';
import {MyColors} from '../constants/MyColors';
import {ApolloError, useMutation} from '@apollo/client';
import {GET_USER} from '../graphql/graphql';
import {setToken} from '../redux/AuthSlice';

type Props = NativeStackScreenProps<HomeStackParams, 'SignIn'>;

const SignIn = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [getUser, {data, loading}] = useMutation<GetToken, GetUserVars>(
    GET_USER,
  );
  const {control, handleSubmit} = useForm<LoginFormField>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormField> = async data => {
    try {
      const response = await getUser({
        variables: {
          getUserInput: {
            email: data.email,
            password: data.password,
          },
        },
      });

      dispatch(setToken(response.data?.getUser?.token!));

      setErrorMessage('');
    } catch (error: any) {
      const e = error as ApolloError;
      setErrorMessage(e.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heading}>
        <BoldText style={styles.headingText}>Sign In</BoldText>
        <View style={styles.signUpContainer}>
          <SemiBoldText style={styles.headingSubText}>
            Doesn&apos;t have an account yet?
          </SemiBoldText>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <SemiBoldText style={styles.signUpText}>Sign Up</SemiBoldText>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput<LoginFormField>
        name="email"
        control={control}
        label="Email"
        placeholderText={'e.g. contact@gmail.com'}
      />

      <TextInput<LoginFormField>
        name="password"
        control={control}
        label="Password"
        secureTextEntry={true}
        placeholderText={'********'}
      />

      <ErrorText errorMessage={errorMessage} />

      <MButton
        label="Login"
        loading={loading}
        onPress={handleSubmit(onSubmit)}
        iconName={'account'}
      />
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    marginTop: 20,
  },
  heading: {
    paddingVertical: 10,
    flexDirection: 'column',
    gap: 8,
    marginTop: 10,
  },
  headingText: {
    fontSize: 25,
  },

  headingSubText: {},
  signUpText: {
    color: MyColors.primaryColor,
    textDecorationLine: 'underline',
    fontSize: 15,
  },

  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flexWrap: 'wrap',
  },
});
