import { useRouter } from 'next/router';
import { Box, Stack, HStack, VStack } from "@chakra-ui/react";
import { FiHome, FiUser, FiMessageSquare, FiSettings, FiLogOut, FiInbox } from "react-icons/fi";

const SideNav = () => {

  const router = useRouter();
  // console.log(router.query);






    return ( 
      <Box
      float="left"
      position="fixed"
        top="24px"
        left="32px"
        bottom="24px"
      >
        <VStack 
        padding={["40px 42px"]}
        bg="#0C0B0B"
        borderRadius="24px"
        height="100%"
        boxShadow="10px 0px 10px 0px rgba(12,11,11,0.42)"
        minHeight="95%">
  <Box bg="yellow.200">
    1
  </Box>
  <Box cursor="pointer">
    <FiHome 
    color="#fff"
    width="26px"
    height="26px"
    fontSize="26px"
     />
  </Box>
  <Box 
  marginTop="50px !important"
  cursor="pointer">
    <FiInbox 
    color="#fff"
    width="26px"
    height="26px"
    fontSize="26px" />
  </Box>
  <Box marginTop="50px !important"
  cursor="pointer">
    <FiUser 
    color="#fff"
    width="26px"
    height="26px"
    fontSize="26px" />
  </Box>
  <Box marginTop="50px !important"
  cursor="pointer">
    <FiMessageSquare 
    color="#fff"
    width="26px"
    height="26px"
    fontSize="26px" />
  </Box>
  <Box marginTop="50px !important"
  cursor="pointer">
    <FiSettings 
    color="#fff"
    width="26px"
    height="26px"
    fontSize="26px" />
  </Box>
  <Box
  marginTop="auto !important"
  cursor="pointer">
    <FiLogOut 
    color="#fff"
    width="26px"
    height="26px"
    fontSize="26px" />
  </Box>
</VStack>
</Box>
     );
}
 
export default SideNav;