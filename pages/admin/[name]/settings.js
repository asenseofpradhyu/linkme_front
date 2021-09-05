import { Button, Spinner, Tag, Tooltip, useClipboard, Avatar, Link, Switch, Flex, Box, Spacer, Heading, Image, useDisclosure, useEditableControls, IconButton, Collapse, Tabs, TabList, TabPanels, Tab, TabPanel, Editable, EditableInput, EditablePreview ,Container, Center, FormControl, FormLabel, Input, Text, Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuIcon, MenuCommand, MenuDivider } from "@chakra-ui/react";
import { AiOutlineFire, AiOutlineGift } from "react-icons/ai";
import { FiInbox, FiEyeOff } from "react-icons/fi";
import { BiCart } from "react-icons/bi";


// Compnent & File Imports
import SideNav from '../../../component/SideNav';
import LinkPreview from '../../../component/LinkPreview';



const settings = () => {


    
    return ( 
        <>
        <Box className="clearfix">
        <SideNav />
        <Box w="calc(100% - 164px)"  padding={["24px 35px"]} position="relative" left="164px" >
        <Flex justifyContent="space-between" width="100%">
    <Box flexShrink="0" flexBasis="70%" h="100%">
        <Box className="">
        <Tabs variant="unstyled">
  <TabList display="flex" alignItems="center" justifyContent="flex-start" flexWrap="wrap">
    <Tab width="300px" _focus={{ boxShadow:"none" }} _selected={{ color: "white", bg: "#0C0B0B" }} backgroundColor="#0C0B0B" color="#ffffff" marginRight="20px" marginBottom="12px" justifyContent="left" borderRadius="8px" padding="20px 25px" fontSize="20px"><AiOutlineFire height="30px" width="30px" fontSize="25px" style={{ marginRight:"15px", strokeWidth:"50px"}} /> Social Links</Tab>
    <Tab width="300px" _focus={{ boxShadow:"none" }} _selected={{ color: "white", bg: "#0C0B0B" }} backgroundColor="#0C0B0B" color="#ffffff" marginRight="20px" marginBottom="12px" justifyContent="left" borderRadius="8px" padding="20px 25px" fontSize="20px"><FiInbox height="30px" width="30px" fontSize="25px" style={{ marginRight:"15px"}}/> Mailing List Integration</Tab>
    <Tab width="300px" _focus={{ boxShadow:"none" }} _selected={{ color: "white", bg: "#0C0B0B" }} backgroundColor="#0C0B0B" color="#ffffff" marginRight="20px" marginBottom="12px" justifyContent="left" borderRadius="8px" padding="20px 25px" fontSize="20px"><AiOutlineGift height="30px" width="30px" fontSize="25px" style={{ marginRight:"15px", strokeWidth:"22px"}}/> Support Banner</Tab>
    <Tab width="300px" _focus={{ boxShadow:"none" }} _selected={{ color: "white", bg: "#0C0B0B" }} backgroundColor="#0C0B0B" color="#ffffff" marginRight="20px" justifyContent="left" borderRadius="8px" padding="20px 25px" fontSize="20px"><BiCart height="30px" width="30px" fontSize="25px" style={{ marginRight:"15px", strokeWidth:"1px"}}/> Commerce Integrations</Tab>
    <Tab width="300px" _focus={{ boxShadow:"none" }} _selected={{ color: "white", bg: "#0C0B0B" }} backgroundColor="#0C0B0B" color="#ffffff" marginRight="20px" justifyContent="left" borderRadius="8px" padding="20px 25px" fontSize="20px"><FiEyeOff height="30px" width="30px" fontSize="25px" style={{ marginRight:"15px"}}/> Sensitive Material</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Box marginTop="25px">
      <Text fontSize="20px" fontWeight="700" marginBottom="25px" display="flex" alignItems="center"><AiOutlineFire fontSize="25px" style={{ marginRight:"15px",display:"inline-block", strokeWidth:"50px"}} />Social Links</Text>
      <Input size="lg" height="60px" fontSize="16px !important" bg="#F5F5F7 !important" marginBottom="25px" placeholder="example@example.com" />
      <Input size="lg" height="60px" fontSize="16px !important" bg="#F5F5F7 !important" marginBottom="25px" placeholder="facebook.com/linkwynk" />
      <Input size="lg" height="60px" fontSize="16px !important" bg="#F5F5F7 !important" marginBottom="25px" placeholder="instagram.com/linkwynk" />
      </Box>
    </TabPanel>
    <TabPanel>
      <p>Mail listing Integration!</p>
    </TabPanel>
    <TabPanel>
      <p>Support Banner!</p>
    </TabPanel>
    <TabPanel>
      <p>Commerce Integration!</p>
    </TabPanel>
    <TabPanel>
      <p>Sensitive Content!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
        </Box>
    </Box>
        
        <LinkPreview />
        </Flex>
        </Box>
        </Box>
        </>
     );
}
 
export default settings;