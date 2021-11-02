import { useRouter } from 'next/router';
import { Button, Spinner, Tag, Tooltip, useClipboard, Avatar, Link, Switch,Flex, Box, Spacer, Heading, Image, useDisclosure, useEditableControls, IconButton, Collapse, Tabs, TabList, TabPanels, Tab, TabPanel, Editable, EditableInput, EditablePreview ,Container, Center, FormControl, FormLabel, Input, Text, Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuIcon, MenuCommand, MenuDivider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";



const links = () => {

    const router = useRouter();
    const {links} = router.query;


    return ( 
        <Box display="flex" justifyContent="center">
            {/* Link Page Background  */}
            <Box backgroundImage="url('/img/setup.jpg')" backgroundRepeat="no-repeat" backgroundSize="cover" backgroundPosition="center" position="fixed" top="0" right="0" left="0" bottom="0" height="100%" transform="scale(1.1)" filter="blur(20px)" opacity="0.9"></Box>

            {/* Start of All Users Links  */}
            <Box maxWidth="530px" width="100%" height="100vh" position="relative">
                
                {/* Start of User Top Cover Image */}
                <Box width="auto" height="auto">
                    <Image src="/img/setup.jpg" alt="Greetings from linkwynk" height="175px" objectFit="cover" width="100%"/>
                </Box>
                {/* End of User Top Cover Image */}

                {/* Start of Link List */}
                <Box background="#FFFFFF" height="100vh">
                    {/* Start of User Profile Image */}
                    <Box display="flex" justifyContent="center" position="absolute" left="50%" right="50%" transform="translate(-50%, -50%)">
                        <Avatar width="128px" height="128px" name="User Profile Image" src="https://source.unsplash.com/random/300x300" />
                    </Box>
                    {/* End of User Profile Image */}
                </Box>
                {/* End of Link List */}

            </Box>
            {/* End of All Users Links  */}
        </Box>
     );
}
 
export default links;