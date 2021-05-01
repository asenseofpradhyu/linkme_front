import Head from 'next/head'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, FormErrorMessage } from "@chakra-ui/react";
import { Formik, useFormik } from 'formik';
const axios = require('axios');

// Local File Imports
import { API_URL } from '../../_helper/config';
import Utility from '../../_helper/util';


const ResetPassword = () => {


    const router = useRouter();
    const {token, email} = router.query;
    console.log(router.query);
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
          password: "",
          c_password:""
        },
        validationSchema: Yup.object().shape({
          password: Yup.string()
            .min(6, "Must be more than 6 characters")
            .required("Required"),
            c_password: Yup.string()
            .min(6, "Must be more than 6 characters")
            .required("Required")
        }),
        onSubmit(values) {
            
          axios.post(API_URL+'password/reset', {
            token: token,
            email: email,
            password: values.password,
            confirm_password: values.c_password,
          })
          .then(function (response) {
          //   setTimeout(
          //     function() {
          //       router.push('/user/login')
          //     }
          //     .bind(this),
          //     300
          // );
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
            <Heading> Reset Password </Heading>
        </Box>
        <Box my={4} textAlign="left">
        
            <form onSubmit={handleSubmit}>
                <FormControl isRequired mt={6} isInvalid={ touched["password"] && errors["password"] }>
                    <FormLabel> Password </FormLabel>
                    <Input type="password" 
                    id="password" 
                        placeholder="********"
                        size="lg" {...getFieldProps("password")}/>
                        <FormErrorMessage>{touched["password"] && errors["password"]}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired mt={6} isInvalid={ touched["c_password"] && errors["c_password"] }>
                    <FormLabel> Confirm Password </FormLabel>
                    <Input type="password" 
                    id="password" 
                        placeholder="********"
                        size="lg" {...getFieldProps("c_password")}/>
                        <FormErrorMessage>{touched["c_password"] && errors["c_password"]}</FormErrorMessage>
                </FormControl>
                <Button width="full" mt={4} type="submit" isLoading={isSubmitting}>Reset Password</Button>
            </form>
        </Box>
    </Box>
</Flex>
     );
}
 
export default ResetPassword;