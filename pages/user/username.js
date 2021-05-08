import { useSession, signOut, getSession  } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button, Spinner, Link, Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuIcon, MenuCommand, MenuDivider } from "@chakra-ui/react";
import {
  
} from "@chakra-ui/react"
const axios = require('axios');

// Local File Imports
import { API_URL } from '../../_helper/config';
import Auth from '../../component/Auth'


const Username = ({user}) => {

  const [session, loading] = useSession();
	const router = useRouter();
  const [userData, setUserData] = useState(user);

  const logOut = () => {
    signOut({redirect: false, callbackUrl: "/"});
    router.replace("/");
  };

  const toChangePassword = () => {
    router.push("change_password");
  }

    return ( 
      <>
      {(!session?.accessToken) ? <Auth/> : 
        <div>
			<h1>Welcome</h1>
      <Menu>
  <MenuButton as={Button}>{userData.user.name + " >"} </MenuButton>
  <MenuList>
    <MenuItem onClick={toChangePassword}>Change Password</MenuItem>
    <MenuItem onClick={logOut}>Logout</MenuItem>
  </MenuList>
</Menu>
            {/* <Button type="button" onClick={logOut}>Log Out</Button> */}
		</div>
}
    </>
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