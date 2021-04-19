import { useSession, signOut, getSession  } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button, Spinner } from "@chakra-ui/react";
const axios = require('axios');

// Local File Imports
import { API_URL } from '../../_helper/config';
import Utility from '../../_helper/util';


const Username = ({user}) => {

  const [session, loading] = useSession();
	const router = useRouter();
  const [userData, setUserData] = useState(user);
  
    useEffect(() => {
		if((!loading && !session?.accessToken)) {
      router.push('login');
		} else if(user == null){
      router.push('login');

    }
    console.log("Loading "+loading);
    console.log("Session "+JSON.stringify(session));
    console.log("user "+JSON.stringify(user));
	})

  if(loading || !session?.accessToken){
    // (user == null || !userData)
    return(
      <Spinner color="red.500" size="lg"/>
    );
  };

  const logOut = () => {
    signOut({redirect: false, callbackUrl: "/login"});
    router.push('login');
    console.log("Test");
  };

    return ( 
        <div>
			<h1>Welcome {userData.user.name}</h1>
            <Button type="button" onClick={logOut}>Log Out</Button>
		</div>
     )
}

export async function getServerSideProps(context) {

  const sessionData = await getSession(context);

  if(sessionData){
    axios.defaults.headers.common['Authorization'] = "Bearer "+sessionData.accessToken;
    const {data} = await axios.get(API_URL + 'user');
    return {
      props:{user:data}
    }
  } else {
    return {
      props:{user:null}
    }
  }

}

export default Username;