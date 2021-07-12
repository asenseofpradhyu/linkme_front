import { Spinner } from "@chakra-ui/react";
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSession  } from 'next-auth/client'

const Auth = () => {


    const [session, loading] = useSession();
    const router = useRouter();

    useEffect(() => {

      if((!loading && !session?.accessToken)) {
        console.log("Redirecting to Login");
        router.push('/user/login');
      }

      console.log("At Login");
	});


    return ( 
        <Spinner color="red.500" size="lg"/>
     );
}
 
export default Auth;