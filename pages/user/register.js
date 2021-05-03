import Head from 'next/head'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, FormErrorMessage } from "@chakra-ui/react";
import { Formik, useFormik } from 'formik';
const axios = require('axios');

// Local File Imports
import { API_URL } from '../../_helper/config';
import Utility from '../../_helper/util';


const Register = () => {


    const router = useRouter()
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
          name:"",
          password: ""
        },
        validationSchema: Yup.object().shape({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
            name: Yup.string()
            .required("Required")
            .matches(/^[A-Z][a-z]+\s[A-Z][a-z]+$/, "Must be only Alphabet"),
          password: Yup.string()
            .min(6, "Must be more than 6 characters")
            .required("Required")
        }),
        onSubmit(values) {
          axios.post(API_URL+'register', {
            name: values.name,
            email: values.email,
            password: values.password
          })
          .then(function (response) {
            setTimeout(
              function() {
                router.push('/user/login')
              }
              .bind(this),
              300
          );
            setSubmitting(false);
            console.log(response);
          })
          .catch(function (error) {
            setSubmitting(false);
            console.log(error);
          });
        }
      });


    return ( 
        <Flex width="100%" height="100vh" align="center" justifyContent="center">
    <Box p={8} maxWidth="650px" width="100%" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
            <Heading> Register </Heading>
        </Box>
        <Box my={4} textAlign="left">
        
            <form onSubmit={handleSubmit}>
            <FormControl isRequired  isInvalid={ touched["name"] && errors["name"] }>
                    <FormLabel>Name</FormLabel>
                    <Input type="text" 
                    id="Name" 
                        placeholder="John Doe"
                        size="lg" {...getFieldProps("name")}/>
                  <FormErrorMessage>{touched["name"] && errors["name"]}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired mt={6} isInvalid={ touched["email"] && errors["email"] }>
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
                <Button width="full" mt={4} type="submit" isLoading={isSubmitting}>Register</Button>
            </form>
        </Box>
    </Box>
</Flex>
     );
}
 
export default Register;