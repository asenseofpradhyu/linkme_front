import { useSession, signOut, getSession  } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup'
import { Button, Spinner, Tag, Flex, Box, FormErrorMessage, Heading, Container, Center, FormControl, FormLabel, Input, Text, Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuIcon, MenuCommand, MenuDivider } from "@chakra-ui/react";



const axios = require('axios');

// Local File Imports
import { API_URL } from '../../_helper/config';
import Auth from '../../component/Auth';
import Tagbutton from '../../component/Tagbutton';


const Username = ({categoriesData}) => {

  const [session, loading] = useSession();
	const router = useRouter();
  const [tagSelectcount, setTagSelectcount] = useState(0);
  const [tagSelect, setTagSelect] = useState([]);
  
  console.log(tagSelect);

  // Handle Logout..
  const logOut = () => {

    axios.post(API_URL+'logout', null, {headers: {
      'Authorization': `Bearer ${session.accessToken}`
    }})
    .then(function (response) {
      signOut({redirect: false, callbackUrl: "/"});
      router.replace("/");
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    
  };

  // Save User Information
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
          name:""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
            .required("Required")
            .matches(/^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/, "Name is invalid"),
        }),
        onSubmit(values) {
          axios.post(API_URL+'setup_user', {
            name: values.name,
            categories: tagSelect
          }, {
            headers: {
              'Authorization': `Bearer ${session.accessToken}`
            }})
          .then(function (response) {
            setTimeout(
              function() {
                // router.push('/user/login')
              }
              .bind(this),
              300
          );
            setSubmitting(false);
            console.log(response);
          })
          .catch(function (error) {
            setSubmitting(false);
            console.log(error);
          });
          console.log(tagSelect);
        }
      });


  const toChangePassword = () => {
    router.push("change_password");
  }

  const addTag = (value) => {
    // console.log(value);
    
    if(value.color && value.id){
      if(tagSelectcount <= 0){
          setTagSelectcount(0); 
      } else {
        setTagSelectcount(tagSelectcount - 1);
      }
    } else {
      if(tagSelectcount != 3) {
        setTagSelectcount(tagSelectcount + 1);
      }
    }
    
     if(value.color == false){
       setTagSelect([...tagSelect, value.id]);
     } else if(value.color == true){
      setTagSelect(tagSelect.filter(item => item !== value.id));
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
<form onSubmit={handleSubmit}>
  <Box w={["100%", "100%", "607px", "607px"]} mt={["20px"]}>
    <FormControl id="fullname" isRequired  isInvalid={ touched["name"] && errors["name"] }>
      <FormLabel fontWeight="700">Tell us your full name</FormLabel>
      <Input type="text" 
      placeholder="Name" 
      bg="#F5F5F7 !important"
      {...getFieldProps("name")}/>
      <FormErrorMessage>{touched["name"] && errors["name"]}</FormErrorMessage>
    </FormControl>
  </Box>

  <Box w={["100%", "100%", "607px", "607px"]} mt={["30px"]} position="relative">
    <Text fontWeight="700" >Tell us about yourself</Text><Text position="absolute" top="-2px" right="calc(100% - 166px)" color="#e53e3e">*</Text>
    <Text display="inline">Select up to 3 categories that best describe your Linkwynk.<br/>
    We'll customise your Linkwynk experience based on what you select.</Text>
    <Text float="right" display="inline-block">{tagSelectcount} of 3</Text>
  </Box>
  <Box w={["100%", "100%", "607px", "607px"]} mt={["25px"]}>
  {Object.values(categoriesData.categories).map((type) => {
          return (
            <Tagbutton addTag={addTag} totalSelect={tagSelectcount} key={type._id} dataid={type._id}>
              {type.category}
            </Tagbutton>
          );
        })}
  {/* <Tag p="10px" borderRadius="20px" mr="10px" cursor="pointer">Sample Tag</Tag> */}
  </Box>
  <Box w={["100%", "100%", "607px", "607px"]} mt={["30px"]}>
    <Center>
      <Button className="theme-button" width="120px" type="submit">Next</Button>
    </Center>
    <br/>
    <Center>
      <Button className="theme-button" width="120px" type="button" onClick={logOut}>Logout</Button>
    </Center>
  </Box>
  </form>
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
    const {data} = await axios.get(API_URL + 'getCategories');

    return {
      props:{categoriesData:data}
    }
  } else {
    return {
      props:{categoriesData:null}
    }
  }
  

}

export default Username;