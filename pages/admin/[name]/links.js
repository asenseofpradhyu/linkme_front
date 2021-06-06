import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { FiChevronDown, FiChevronUp, FiRepeat, FiEdit2, FiCheck, FiToggleLeft, FiToggleRight, FiShuffle, FiImage, FiZap, FiClock, FiLayers, FiXCircle } from "react-icons/fi";
import { Button, Spinner, Tag, Flex, Box, Spacer, Heading, Image, useDisclosure, useEditableControls, IconButton, Collapse, Tabs, TabList, TabPanels, Tab, TabPanel, Editable, EditableInput, EditablePreview ,Container, Center, FormControl, FormLabel, Input, Text, Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuIcon, MenuCommand, MenuDivider } from "@chakra-ui/react";

// Local File Imports
import { API_URL } from '../../../_helper/config';
import Auth from '../../../component/Auth';
import SideNav from '../../../component/SideNav';

const Links = () => {

    const router = useRouter();
    const { name } = router.query;
    const { isOpen, onToggle } = useDisclosure();
    console.log(isOpen);
    const [analticsDropdown, setAnalticsDropdown] = useState('Weekly');







    // Custom Controller for Edit Title & URL
    function EditableControls() {
      const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
      } = useEditableControls()
  
      return isEditing ? (
        <Box display="inline-block">
          <IconButton height="auto" width="auto"  bg="transparent" _hover={ "background:transparent" } _active={ "background:transparent" } _focus={ "background:transparent" } icon={<FiCheck />} {...getSubmitButtonProps()} />
        </Box>
      ) : (
        <Box display="inline-block">
          <IconButton height="auto" width="auto" className="themeFont" bg="transparent" _hover={ "background:transparent" } _active={ "background:transparent" } _focus={ "background:transparent" } icon={<FiEdit2 />} {...getEditButtonProps()} />
        </Box>
      )
    }

    return ( 
        <Box className="clearfix">
        <SideNav />
        <Box w="calc(100% - 164px)"  padding={["24px 50px"]} position="relative" left="164px" >
           <Box className="links-dashboard">
           <Flex>
    <Box w="620px" h="100%">
            <Box className="dashboard-greeting" bg="#F5F5F7" width="100%" borderRadius="14px" position="relative" padding="46px 0px" marginTop="31px">
               <Box display="inline-block" marginLeft="30px">
                  <Heading fontSize={["24px","32px","36px","36px"]} isTruncated maxWidth="300px">Hello { name }!</Heading>
                  <Text fontSize={["16px"]} title="New Text">It’s good to see you again.</Text>
               </Box>
               <Box position="absolute" right="70px" bottom="0">
                  <Image src="/img/boy.svg"alt="Greetings from linkwynk" />
               </Box>
            </Box>
            <Box className="links-analytics">
                  <Box bg="#F5F5F7" width="100%" display="flex" alignItems="center" justifyContent="space-between" borderRadius="14px" marginTop="16px" padding="16px 30px">
                     <Box display="inline-block">
                        <Heading fontSize="16px">Lifetime Analytics:</Heading>
                        <Text fontSize={["13px"]} display="inline-block" marginRight="16px">Views: <b>0</b></Text>
                        <Text fontSize={["13px"]} display="inline-block">Click: <b>0</b></Text>
                     </Box>
                     <Box display="inline-block">
                     <Button className="theme-button" width="120px" fontSize="13px" type="button" onClick={onToggle} rightIcon={ isOpen ? <FiChevronUp /> : <FiChevronDown />}>View More</Button>
                     </Box>
                  </Box>
                  <Collapse in={isOpen} animateOpacity>
                  <Box mt="17px" className="analtics-tabs">
                  <Heading fontSize="24px" paddingLeft="30px">Your Analytics:</Heading>
                  <Tabs variant="unstyled" paddingLeft="14px" isLazy>
                    <TabList>
                      <Tab _selected={{ color: "#0C0B0B", bg: "transparent", opacity:"1" }}>Views</Tab>
                      <Tab _selected={{ color: "#0C0B0B", bg: "transparent", opacity:"1" }}>Clicks</Tab>
                      <Box marginLeft="auto">
                      <Menu placement="bottom-end">
                          {({ isOpen }) => (
                            <>
                              <MenuButton isActive={isOpen} as={Button} rightIcon={<FiChevronDown />} bg="#F5F5F7" fontSize="13px" _focus={"box-shahdow:none"}>
                                { analticsDropdown }
                              </MenuButton>
                              <MenuList minWidth="120px">
                                <MenuItem onClick={() => setAnalticsDropdown('Weekly')}>Weekly</MenuItem>
                                <MenuItem onClick={() => setAnalticsDropdown('Monthly')}>Monthly</MenuItem>
                                <MenuItem onClick={() => setAnalticsDropdown('Yearly')}>Yearly</MenuItem>
                              </MenuList>
                            </>
                          )}
                        </Menu>
                      </Box>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                         <Line
        data={{
          labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
          datasets: [
            {
              label: '# of votes',
              data: [12, 19, 3, 5, 2, 3, 10],
              borderColor: "#0C0B0B",
              borderWidth: 2,
              tension: 0.3,
              pointBackgroundColor: "#0C0B0B",
              pointBorderWidth: 5,
              pointHoverBorderWidth: 5
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                gridLines: {
                  display: false ,
                  color: "#F5F5F7"
                },
                ticks: {
                  beginAtZero: true,
                } 
              },
            ],
          },
        }}
      />
                      </TabPanel>
                      <TabPanel>
                        <p>two!</p>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
        </Box>
                  </Collapse>
            </Box>
        <Box className="add-links-section">
            <Center marginTop="40px"><Button  className="theme-button add-link-btn" width="130px" padding="18px 40px" type="button">Add Links</Button></Center>
            <Box className="draggable-container" marginTop="40px">
                <Box className="links" bg="#F5F5F7" borderRadius="14px">
                  <Flex>
                  <Box className="draggable-handle" padding="50px 16px" borderRight="2px solid rgba(12, 11, 11, 0.2)">
                  <Center transform="rotate(90deg)">
                    <FiRepeat fontSize="20px"/>
                  </Center>
                  </Box>
                    <Box className="draggable-link-content" padding="8px 16px" width="100%">
                        <Flex alignItems="center" className="edit-link-details">
                        <Box className="link-img" display="inline-block">
                        <Image
                              boxSize="64px"
                              borderRight="12px"
                              objectFit="cover"
                              src="https://bit.ly/dan-abramov"
                              alt="link-img"
                              // fallbackSrc="https://via.placeholder.com/150"
                            />
                        </Box>
                        <Box className="link-detials" display="inline-block" marginLeft="22px">
                        <Editable defaultValue="Title" isPreviewFocusable={false} className="editable-container">
                          <EditablePreview className="themeFont" />
                          <EditableInput/>
                          <EditableControls />
                        </Editable>
                        <Editable defaultValue="Url" isPreviewFocusable={false} className="editable-container">
                          <EditablePreview />
                          <EditableInput/>
                          <EditableControls />
                        </Editable>
                        </Box>
                        <Box marginLeft="auto">
                            <Box className="toggle-link" fontSize="40px" cursor="pointer">
                              <FiToggleRight />
                            </Box>
                        </Box>
                        </Flex>
                        <Flex className="icon-links-control" marginTop="15px" justifyContent="flex-end">
                          <Box>
                            <Box display="inline-block" marginRight="18px" fontSize="18px">
                              <FiShuffle  />
                            </Box>
                            <Box display="inline-block" marginRight="18px" fontSize="18px">
                              <FiImage />
                            </Box>
                            <Box display="inline-block" marginRight="18px" fontSize="18px">
                              <FiZap />
                            </Box>
                            <Box display="inline-block" marginRight="18px" fontSize="18px">
                              <FiClock />
                            </Box>
                            <Box display="inline-block" marginRight="18px" fontSize="18px">
                              <FiLayers />
                            </Box>
                            <Box display="inline-block" fontSize="18px" color="red">
                              <FiXCircle />
                            </Box>
                          </Box>
                        </Flex>
                    </Box>
                  </Flex>
                </Box>
                <Box className="links" bg="#F5F5F7" borderRadius="14px">
                  <Flex>
                  <Box className="draggable-handle" padding="50px 16px" borderRight="2px solid rgba(12, 11, 11, 0.2)">
                  <Center transform="rotate(90deg)">
                    <FiRepeat fontSize="20px"/>
                  </Center>
                  </Box>
                    <Box className="draggable-link-content" padding="8px 16px" width="100%">
                        <Flex alignItems="center" className="edit-link-details">
                        <Box className="link-img" display="inline-block">
                        <Image
                              boxSize="64px"
                              borderRight="12px"
                              objectFit="cover"
                              src="https://bit.ly/dan-abramov"
                              alt="link-img"
                              // fallbackSrc="https://via.placeholder.com/150"
                            />
                        </Box>
                        <Box className="link-detials" display="inline-block" marginLeft="22px">
                        <Editable defaultValue="Title" isPreviewFocusable={false} className="editable-container">
                          <EditablePreview className="themeFont" />
                          <EditableInput/>
                          <EditableControls />
                        </Editable>
                        <Editable defaultValue="Url" isPreviewFocusable={false} className="editable-container">
                          <EditablePreview />
                          <EditableInput/>
                          <EditableControls />
                        </Editable>
                        </Box>
                        <Box marginLeft="auto">
                            <Box className="toggle-link" fontSize="40px" cursor="pointer">
                              <FiToggleRight />
                            </Box>
                        </Box>
                        </Flex>
                        <Flex className="icon-links-control" marginTop="15px" justifyContent="flex-end">
                          <Box>
                            <Box display="inline-block" marginRight="18px" fontSize="18px">
                              <FiShuffle  />
                            </Box>
                            <Box display="inline-block" marginRight="18px" fontSize="18px">
                              <FiImage />
                            </Box>
                            <Box display="inline-block" marginRight="18px" fontSize="18px">
                              <FiZap />
                            </Box>
                            <Box display="inline-block" marginRight="18px" fontSize="18px">
                              <FiClock />
                            </Box>
                            <Box display="inline-block" marginRight="18px" fontSize="18px">
                              <FiLayers />
                            </Box>
                            <Box display="inline-block" fontSize="18px" color="red">
                              <FiXCircle />
                            </Box>
                          </Box>
                        </Flex>
                    </Box>
                  </Flex>
                </Box>
            </Box>
        </Box>
       </Box>
    <Spacer />
    <Box w="350px" h="100%" bg="red.500">
      <Text>Preview</Text>
    </Box>
  </Flex>
           </Box>
        </Box>
        </Box>
     );
}
 
export default Links;