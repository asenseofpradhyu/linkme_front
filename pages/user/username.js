import { useSession, signOut, getSession  } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button, Spinner } from "@chakra-ui/react";
const axios = require('axios');

// Local File Imports
import { API_URL } from '../../_helper/config';
import Utility from '../../_helper/util';


const Username = (props) => {

  const [session, loading] = useSession();
	const router = useRouter();
  // const { user } = props;
  const [user, setUser] = useState(props.user);
  
    useEffect(() => {
		if(!loading && !session?.accessToken) {
      router.push('login')
		}
	}, [loading, session])

  if(loading || !session){
    return(
      <Spinner color="red.500" size="lg"/>
    );
  }

    return ( 
        <div>
			<h1>Welcome {user.user.name}</h1>
            <Button type="button" onClick={() => signOut({redirect: false, callbackUrl: "/login"})}>Log Out</Button>
		</div>
     )
}

export async function getServerSideProps(context) {

  const sessionData = await getSession(context);
  axios.defaults.headers.common['Authorization'] = "Bearer "+sessionData.accessToken;
  const {data} = await axios.get(API_URL + 'user');
  return {
    props: {user:data}, // will be passed to the page component as props
  }
  
}

export default Username;