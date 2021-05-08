import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSession, signOut, getSession  } from 'next-auth/client'
import * as Yup from 'yup'
import { Flex, Spinner, Box, Heading, FormControl, FormLabel, Input, Button, FormErrorMessage } from "@chakra-ui/react";
import { Formik, useFormik } from 'formik';
const axios = require('axios');

// Local File Imports
import { API_URL } from '../../_helper/config';
import Auth from '../../component/Auth'


const ChangePassword = () => {

    const [session, loading] = useSession();
    const router = useRouter();
    const [apiMessage, setApiMessage] = useState('')

    useEffect(() => {

console.log("Change");
	});



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
        setFieldValue,
        dirty,
        isValid
      } = useFormik({
        initialValues: {
          old_password: "",
          new_password:"",
          c_password:""
        },
        validationSchema: Yup.object().shape({
            old_password: Yup.string()
            .min(6, "Must be more than 6 characters")
            .required("Required"),
            new_password: Yup.string()
            .min(6, "Must be more than 6 characters")
            .required("Required"),
            c_password: Yup.string()
            .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
            .required("Required")
        }),
        onSubmit(values) {
            
          axios.post(API_URL+'change_password', {
            old_password: values.old_password,
            new_password: values.new_password,
            confirm_password: values.c_password,
          }, {
            headers: {
              'Authorization': `Bearer ${session.accessToken}`
            }})
          .then(function (response) {
              setApiMessage(response.data.message);
            setSubmitting(false);
            console.log(response.data.message);
          })
          .catch(function (error) {
            setSubmitting(false);
            console.log(error);
          });
        }
      });


    return ( 
      <>
      {(!session?.accessToken) ? <Auth/> : 

        <Flex width="100%" height="100vh" align="center" justifyContent="center">
    <Box p={8} maxWidth="650px" width="100%" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
            <Heading> Change Password </Heading>
        </Box>
        <Box my={4} textAlign="left">
        
            <form onSubmit={handleSubmit}>
            <FormControl isRequired mt={6} isInvalid={ touched["old_password"] && errors["old_password"] }>
                    <FormLabel> Old Password </FormLabel>
                    <Input type="password" 
                    id="old_password" 
                        placeholder="Old Password"
                        size="lg" {...getFieldProps("old_password")}/>
                        <FormErrorMessage>{touched["old_password"] && errors["old_password"]}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired mt={6} isInvalid={ touched["new_password"] && errors["new_password"] }>
                    <FormLabel> New Password </FormLabel>
                    <Input type="password" 
                    id="new_password" 
                        placeholder="New Password"
                        size="lg" {...getFieldProps("new_password")}/>
                        <FormErrorMessage>{touched["new_password"] && errors["new_password"]}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired mt={6} isInvalid={ touched["c_password"] && errors["c_password"] }>
                    <FormLabel> Confirm Password </FormLabel>
                    <Input type="password" 
                    id="c_password" 
                        placeholder="Confirm Password"
                        size="lg" {...getFieldProps("c_password")}/>
                        <FormErrorMessage>{touched["c_password"] && errors["c_password"]}</FormErrorMessage>
                </FormControl>
                {apiMessage}
                <Button width="full" mt={4} type="submit" isLoading={isSubmitting} disabled={!(isValid && dirty)}>Update</Button>
            </form>
        </Box>
    </Box>
</Flex>
 }
</>
     );
}
 
export default ChangePassword;