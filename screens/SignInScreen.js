import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import UserContext from '../UserContext';
import { firebase } from "../firebase.js"
import * as Yup from 'yup';
import { Formik } from 'formik';
import Form from '../components/Form';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter a valid email")
    .email()
    .label("Email"),
  password: Yup.string()
    .required()
    .min(6, "Password must have at least 6 characters")
    .label("Password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Confirmation password must match password"
  ),
});

const RegisterScreen = ({ navigation }) => {
    const [signInError, setSignInError] = useState("");
    async function handleOnSubmit(values) {
  const { email, password, confirmPassword } = values;
  console.log("confirmPassword: "  + values.confirmPassword)
  if (!confirmPassword) {
    console.log("successfully logging in");
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
          setSignInError(error.message);
        });
  } else {
    console.log("successfully signing up");
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
          setSignInError(error.message);
        });
  }
}
    return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Form
          initialValues={{
            email: '',
            password: '',
            confirm: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleOnSubmit}
        >
          <Form.Field
            name="email"
            leftIcon="email"
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <Form.Field
            name="password"
            leftIcon="lock"
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
          />
          <Form.Field
            name="confirmPassword"
            leftIcon="lock"
            placeholder="Confirm password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
          />

          <Form.Button title={values => values.confirmPassword ? 'Sign up' : 'Log in'}
          onPress={() => navigation.navigate('ScheduleScreen')}/>
          {<Form.ErrorMessage error={signInError} visible={true} />}
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default RegisterScreen;
