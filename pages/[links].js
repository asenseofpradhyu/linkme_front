import { useRouter } from 'next/router';
import { FaFacebookSquare, FaInstagram, FaPinterest, FaSpotify, FaSnapchatGhost, FaLinkedin, FaYoutube, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { Button, Spinner, Tag, Tooltip, Stack, HStack, useClipboard, Avatar, Link, List, ListItem, UnorderedList , Switch,Flex, Box, Spacer, Heading, Image, useDisclosure, useEditableControls, IconButton, Collapse, Tabs, TabList, TabPanels, Tab, TabPanel, Editable, EditableInput, EditablePreview ,Container, Center, FormControl, FormLabel, Input, Text, Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuIcon, MenuCommand, MenuDivider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";



const links = () => {

    const router = useRouter();
    const {links} = router.query;


    return ( 
        <Box display="flex" justifyContent="center">
            {/* Link Page Background  */}
            <Box backgroundImage="url('/img/setup.jpg')" backgroundRepeat="no-repeat" backgroundSize="cover" backgroundPosition="center" position="fixed" top="0" right="0" left="0" bottom="0" height="100%" transform="scale(1.1)" filter="blur(20px)" opacity="0.9"></Box>

            {/* Start of All Users Links  */}
            <Box maxWidth="530px" width="100%" height="100vh" position="relative" boxShadow="0 7px 29px 0 rgb(100 100 111 / 20%)">
                
                {/* Start of User Top Cover Image */}
                <Box width="auto" height="auto">
                    <Image src="/img/setup.jpg" alt="Greetings from linkwynk" height="175px" objectFit="cover" width="100%"/>
                </Box>
                {/* End of User Top Cover Image */}

                {/* Start of Link List */}
                <Box background="#FFFFFF" height="100vh">
                    {/* Start of User Profile Image */}
                    <Box display="flex" justifyContent="center" position="absolute" left="50%" right="50%" transform="translate(-50%, -50%)">
                        <Avatar width="128px" height="128px" name={links} src="https://source.unsplash.com/random/300x300" />
                    </Box>
                    {/* End of User Profile Image */}
                    {/* Start of User Link and Description */}
                    <Box padding="70px 15px 50px 15px" height="100%">
                        <Text display="flex" justifyContent="center" fontSize="18px" fontWeight="bolder">@{links}</Text>
                        <Text display="flex" justifyContent="center" padding="0 50px" marginTop="20px" fontSize="14px">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.</Text>

                        {/* Start of Social Icons */}
                        <Box padding="20px 0">
                        <HStack spacing="20px" justifyContent="center">

                            <Box cursor="pointer">
                                <Link href="https://www.facebook.com">
                                    <FaFacebookSquare fontSize="28px"/>
                                </Link>
                            </Box>
                            <Box cursor="pointer">
                            <Link href="https://www.instagram.com">
                                <FaInstagram fontSize="28px"/>
                                </Link>
                            </Box>
                            <Box cursor="pointer">
                            <Link href="https://www.pinterest.com">
                                <FaPinterest fontSize="28px"/>
                                </Link>
                            </Box>
                            <Box cursor="pointer">
                            <Link href="https://www.spotify.com">
                                <FaSpotify fontSize="28px"/>
                                </Link>
                            </Box>
                            <Box cursor="pointer">
                            <Link href="https://www.youtube.com">
                                <FaYoutube fontSize="28px" />
                                </Link>
                            </Box>
                            <Box cursor="pointer">
                            <Link href="https://www.snapchat.com">
                                <FaSnapchatGhost fontSize="28px" />
                                </Link>
                            </Box>
                            </HStack>
                        </Box>
                        {/* End of Social Icons */}
                        {/* Start of Custom Links */}
                        <Box display="flex" justifyContent="center">
                        <UnorderedList listStyleType="none">
                            <ListItem>Lorem ipsum dolor sit amet</ListItem>
                            <ListItem>Consectetur adipiscing elit</ListItem>
                            <ListItem>Integer molestie lorem at massa</ListItem>
                            <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                        </UnorderedList>
                        </Box>
                        {/* End of Custom Links */}
                    </Box>
                    {/* End of User Link and Description */}
                </Box>
                {/* End of Link List */}

            </Box>
            {/* End of All Users Links  */}
        </Box>
     );
}
 
export default links;