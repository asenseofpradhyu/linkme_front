import { useSession, signOut, getSession  } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Spinner, Tag, Flex, Box, Heading, Container, Center, FormControl, FormLabel, Input, Text, Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuIcon, MenuCommand, MenuDivider } from "@chakra-ui/react";



const axios = require('axios');

// Local File Imports
import { API_URL } from '../../_helper/config';
import Auth from '../../component/Auth';
import Tagbutton from '../../component/Tagbutton';


const Username = ({user}) => {

  const data = [
    {
      id: 1,
      first_name: "Jeanette",
      last_name: "Penddreth",
      email: "jpenddreth0@census.gov",
      gender: "Female",
      ip_address: "26.58.193.2"
    },
    {
      id: 2,
      first_name: "Giavani",
      last_name: "Frediani",
      email: "gfrediani1@senate.gov",
      gender: "Male",
      ip_address: "229.179.4.212"
    },
    {
      id: 3,
      first_name: "Noell",
      last_name: "Bea",
      email: "nbea2@imageshack.us",
      gender: "Female",
      ip_address: "180.66.162.255"
    },
    {
      id: 4,
      first_name: "Willard",
      last_name: "Valek",
      email: "wvalek3@vk.com",
      gender: "Male",
      ip_address: "67.76.188.26"
    },
    {
      id: 2,
      first_name: "Giavani",
      last_name: "Frediani",
      email: "gfrediani1@senate.gov",
      gender: "Male",
      ip_address: "229.179.4.212"
    },
    {
      id: 3,
      first_name: "Noell",
      last_name: "Bea",
      email: "nbea2@imageshack.us",
      gender: "Female",
      ip_address: "180.66.162.255"
    },
    {
      id: 4,
      first_name: "Willard",
      last_name: "Valek",
      email: "wvalek3@vk.com",
      gender: "Male",
      ip_address: "67.76.188.26"
    }
  ];

  const [session, loading] = useSession();
	const router = useRouter();
  const [userData, setUserData] = useState(user);
  const [tagSelect, setTagSelect] = useState(0);

  const logOut = () => {
    signOut({redirect: false, callbackUrl: "/"});
    router.replace("/");
  };

  const toChangePassword = () => {
    router.push("change_password");
  }

  const addTag = (value) => {
    console.log(value);
    
    if(value.color && value.id){
      if(tagSelect <= 0){
      setTagSelect(0);  
      } else {
        setTagSelect(tagSelect - 1);
      }
    } else {
      if(tagSelect == 3){

      } else {
        setTagSelect(tagSelect + 1);
      }
    }
      
  };


    return ( 
      <>
      {(!session?.accessToken) ? <Auth/> : 
        
        <Container maxW="container.xl" h="100%" minHeight="100vh" d="flex" flexDirection={["column","column"]} justifyContent="center">
<Flex width="100%" h="100%" align="center" flexDirection={["column","column"]} justifyContent="center">
  <Box w={["100%", "100%", "607px", "607px"]}>
    <Center flexDirection={["column","column"]}>
      <Heading fontSize={["24px","32px","36px","36px"]}>We just need to confirm a few things.</Heading>
    </Center>
  </Box>

  <Box w={["100%", "100%", "607px", "607px"]} mt={["20px"]}>
    <FormControl id="fullname">
      <FormLabel fontWeight="700">Tell us your full name</FormLabel>
      <Input type="text" placeholder="Name" bg="#F5F5F7 !important"/>
    </FormControl>
  </Box>

  <Box w={["100%", "100%", "607px", "607px"]} mt={["30px"]}>
    <Text fontWeight="700">Tell us about yourself</Text>
    <Text display="inline">Select up to 3 categories that best describe your Linkwynk.<br/>
    We'll customise your Linkwynk experience based on what you select.</Text>
    <Text float="right" display="inline-block">{tagSelect} of 3</Text>
  </Box>
  <Box w={["100%", "100%", "607px", "607px"]} mt={["25px"]}>
  {Object.values(data).map((type) => {
          return (
            <Tagbutton addTag={addTag} totalSelect={tagSelect} key={type.id} dataid={type.id}>
              {type.first_name}
            </Tagbutton>
          );
        })}
  {/* <Tag p="10px" borderRadius="20px" mr="10px" cursor="pointer">Sample Tag</Tag> */}
  </Box>
  <Box w={["100%", "100%", "607px", "607px"]} mt={["30px"]}>
    <Center>
      <Button className="theme-button" width="120px" type="submit" onClick={logOut}>Logout</Button>
    </Center>
  </Box>

  </Flex>
</Container>

        
        
        
        
        
        
        
        
        
        
        
        
//         <div>
// 			<h1>Welcome</h1>
//       <Menu>
//   <MenuButton as={Button}>{userData.user.name + " >"} </MenuButton>
//   <MenuList>
//     <MenuItem onClick={toChangePassword}>Change Password</MenuItem>
//     <MenuItem onClick={logOut}>Logout</MenuItem>
//   </MenuList>
// </Menu>
//             {/* <Button type="button" onClick={logOut}>Log Out</Button> */}
// 		</div>
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