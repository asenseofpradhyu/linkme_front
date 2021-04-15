import { useSession, signOut } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Button, Spinner } from "@chakra-ui/react";
const axios = require('axios');

// Local File Imports
import { API_URL } from '../../_helper/config';
import Utility from '../../_helper/util';


const Username = (props) => {

  const [session, loading] = useSession()
	const router = useRouter()
  const { data } = props;

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
			<h1>Welcome {data.user.name}</h1>
            <Button type="button" onClick={() => signOut({redirect: false, callbackUrl: "/login"})}>Log Out</Button>
		</div>
     )
}



export async function getStaticProps() {
 
	const data = await axios.get(API_URL + 'user')
  .then(res => res.data)
  .catch(err => err)

  return {
    props: {data} // will be passed to the page component as props
  }
}


export default Username;