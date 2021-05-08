import { Spinner } from "@chakra-ui/react";
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSession  } from 'next-auth/client'

const Auth = () => {


    const [session, loading] = useSession();
    const router = useRouter();

    useEffect(() => {

      if((!loading && !session?.accessToken)) {
        router.push('login');
      }

      console.log("Test..");
	});


    return ( 
        <Spinner color="red.500" size="lg"/>
     );
}
 
export default Auth;