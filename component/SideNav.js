import { Box, Stack, HStack, VStack } from "@chakra-ui/react";
import { FiHome, FiUser, FiMessageSquare, FiSettings, FiLogOut, FiInbox } from "react-icons/fi";

const SideNav = () => {
    return ( 
      <Box
      float="left"
      position="relative"
      top="0px"
      bottom="0px"
      >
        <VStack 
        position="absolute"
        top="24px"
        left="32px"
        bottom="24px"
        padding={["40px 42px"]}
        bg="#0C0B0B"
        borderRadius="24px"
        height="100vh"
        boxShadow="10px 0px 10px 0px rgba(12,11,11,0.42)"
        minHeight="100%">
  <Box bg="yellow.200">
    1
  </Box>
  <Box>
    <FiHome 
    color="#fff"
    width="26px"
    height="26px"
    fontSize="26px" />
  </Box>
  <Box 
  marginTop="50px !important">
    <FiInbox 
    color="#fff"
    width="26px"
    height="26px"
    fontSize="26px" />
  </Box>
  <Box marginTop="50px !important">
    <FiUser 
    color="#fff"
    width="26px"
    height="26px"
    fontSize="26px" />
  </Box>
  <Box marginTop="50px !important">
    <FiMessageSquare 
    color="#fff"
    width="26px"
    height="26px"
    fontSize="26px" />
  </Box>
  <Box marginTop="50px !important">
    <FiSettings 
    color="#fff"
    width="26px"
    height="26px"
    fontSize="26px" />
  </Box>
  <Box
  marginTop="auto !important">
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