import { useRouter } from 'next/router'
import { Flex, Box, Container, Link } from "@chakra-ui/react";
import { useState, useEffect } from 'react'
const axios = require('axios');

// Local File Imports
import { API_URL } from '../../_helper/config';


export default function Login() {

  const [verifyError, setVerifyError] = useState('')
  const router = useRouter();
  const {verify_token, email} = router.query;

          axios.get(API_URL+'verify_account', {
              params:{
                email: email,
                verify_token: verify_token
              }
          }).then(function (response){
              setVerifyError(response.data.message);
            setTimeout(
              function() {
                router.push('/user/login')
              }
              .bind(this),
              5000
          );
            console.log(response.data.message);
          })
          .catch(function (error) {
            console.log(error);
          });

    


  return (

    <Flex width="100%" height="100vh" align="center" justifyContent="center">
     {verifyError ?
        <Container>
            <p>{verifyError}</p>
            <p>You're be redirect to Login page</p>
        </Container> : ""
    }
    </Flex>
  )
}
