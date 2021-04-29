import Head from 'next/head'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { Flex, Box, Heading, Link, FormControl, FormLabel, Input, Button, FormErrorMessage } from "@chakra-ui/react";
import { Formik, useFormik } from 'formik';
import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/client'
const axios = require('axios');

// Local File Imports
import { API_URL } from '../../_helper/config';
import Utility from '../../_helper/util';
import ForgotPassword from './forgot_password';


export default function Login() {
  const router = useRouter()
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    if (router.query.error) {
      setLoginError(router.query.error)
    }
  }, [router])


    const {
        values,
        handleSubmit,
        submitCount,
        getFieldProps,
        setValues,
        touched,
        errors,
        isSubmitting,
        setSubmitting,
        setFieldValue
      } = useFormik({
        initialValues: {
          email: "",
          password: ""
        },
        validationSchema: Yup.object().shape({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .required("Required")
        }),
        onSubmit(values) {
          
          // axios.post(API_URL+'login', {
          //   email: values.email,
          //   password: values.password
          // })
          // .then(function (response) {
          //   Utility.setToken(response.data.token);
          //   setTimeout(
          //     function() {
          //       router.push('/user/username')
          //     }
          //     .bind(this),
          //     300
          // );
          //   setSubmitting(false);
          //   console.log(response);
          // })
          // .catch(function (error) {
          //   setSubmitting(false);
          //   console.log(error);
          // });

          const email = values.email;
          const password = values.password;
          const res = signIn('credentials', {
                email,
                password,
                callbackUrl: `${window.location.origin}/username`,
                redirect: false,
          })

      res.then(function (response){
        if(response.error){

          setLoginError(response.error);
          setSubmitting(false);
          console.log(response);

        } else if(response.status == 200 && response.ok){
          
          setTimeout(
            function() {
              router.push('username')
          }.bind(this), 300);
          console.log(response);
        } else {
          setLoginError('Something Went Wrong..!!');
          setSubmitting(false);
        }
        
      });
      }
    });
    


  return (

    <Flex width="100%" height="100vh" align="center" justifyContent="center">
    <Box p={8} maxWidth="650px" width="100%" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
            <Heading> Login </Heading>
        </Box>
        <Box my={4} textAlign="left">
        
            <form onSubmit={handleSubmit}>
                <FormControl isRequired isInvalid={ touched["email"] && errors["email"] }>
                    <FormLabel> Email </FormLabel>
                    <Input type="text" 
                    id="email" 
                        placeholder="example@example.com"
                        size="lg" {...getFieldProps("email")}/>
                  <FormErrorMessage>{touched["email"] && errors["email"]}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired mt={6} isInvalid={ touched["password"] && errors["password"] }>
                    <FormLabel> Password </FormLabel>
                    <Input type="password" 
                    id="password" 
                        placeholder="********"
                        size="lg" {...getFieldProps("password")}/>
                        <FormErrorMessage>{touched["password"] && errors["password"]}</FormErrorMessage>
                </FormControl>
                <Button width="full" mt={4} type="submit" isLoading={isSubmitting}>
                Login
                </Button>
                <span>{loginError}</span>
            </form>
            <Link href="register" mt={4} mr={2}>Register</Link>
            <Link href="forgot_password" mt={4}>ForgotPassword</Link>
        </Box>
    </Box>
</Flex>
  )
}
