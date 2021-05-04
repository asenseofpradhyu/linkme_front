import Head from 'next/head'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { Flex, Box, Container, Center, Heading, FormControl, FormLabel, Input, Button, FormErrorMessage } from "@chakra-ui/react";
import { Formik, useFormik } from 'formik';
const axios = require('axios');

// Local File Imports
import { API_URL } from '../../_helper/config';
import Utility from '../../_helper/util';


const ForgotPassword = () => {


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
          email: ""
        },
        validationSchema: Yup.object().shape({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required")
        }),
        onSubmit(values) {
          axios.post(API_URL+'password/reset-request', {
            email: values.email
          })
          .then(function (response) {
        //     setTimeout(
        //       function() {
        //         router.push('/user/login')
        //       }
        //       .bind(this),
        //       300
        //   );
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


      <Container maxW="container.xl" h="100%">
<Flex width="100%" h="100vh" align="center" flexDirection={["column","column"]} justifyContent="center">
  <Box>
    <Center><Heading fontSize={["24px","32px","36px","36px"]}>Forgot Password?</Heading></Center>
  </Box>
  
  <Box borderWidth="1px" borderRadius="14px" overflow="hidden" bg="#F5F5F7" p={["20px 20px", "78px 168px", "78px 168px", "78px 168px"]} w={['100%','638px','725px','725px']} mt="79px">
    <Box>
    <form onSubmit={handleSubmit}>
                       <FormControl isRequired isInvalid={ touched["email"] && errors["email"] }>
                     <Input 
                        type="text" 
                        id="email" 
                        placeholder="Email"
                        h="40px"
                        {...getFieldProps("email")}
                        />
                  <FormErrorMessage>{touched["email"] && errors["email"]}</FormErrorMessage>
                </FormControl>
                <Center flexDirection={["column","column"]}>
                <Button width="auto" mt={"34px"} type="submit" isLoading={isSubmitting}>Send Reset Link</Button>
                </Center>
            </form>
    </Box>
    </Box>
  </Flex>
</Container>



//         <Flex width="100%" height="100vh" align="center" justifyContent="center">
//     <Box p={8} maxWidth="650px" width="100%" borderWidth={1} borderRadius={8} boxShadow="lg">
//         <Box textAlign="center">
//             <Heading> Forgot Password </Heading>
//         </Box>
//         <Box my={4} textAlign="left">
        
//             <form onSubmit={handleSubmit}>
            
//                 <FormControl isRequired mt={6} isInvalid={ touched["email"] && errors["email"] }>
//                     <FormLabel> Email </FormLabel>
//                     <Input type="text" 
//                     id="email" 
//                         placeholder="example@example.com"
//                         size="lg" {...getFieldProps("email")}/>
//                   <FormErrorMessage>{touched["email"] && errors["email"]}</FormErrorMessage>
//                 </FormControl>
//                 <Button width="full" mt={4} type="submit" isLoading={isSubmitting}>Send Reset Link</Button>
//             </form>
//         </Box>
//     </Box>
// </Flex>
     );
}
 
export default ForgotPassword;