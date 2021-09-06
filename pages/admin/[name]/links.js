import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession, signOut, getSession  } from 'next-auth/client';
const axios = require('axios');
import { Line } from 'react-chartjs-2';
import { DragDropContext, Droppable, Draggable, resetServerContext } from 'react-beautiful-dnd';
import { FiChevronDown, FiChevronUp, FiRepeat, FiClipboard, FiEdit2, FiCheck, FiBell, FiShuffle, FiImage, FiZap, FiClock, FiLayers, FiXCircle } from "react-icons/fi";
import { Button, Spinner, Tag, Tooltip, useClipboard, Avatar, Link, Switch,Flex, Box, Spacer, Heading, Image, useDisclosure, useEditableControls, IconButton, Collapse, Tabs, TabList, TabPanels, Tab, TabPanel, Editable, EditableInput, EditablePreview ,Container, Center, FormControl, FormLabel, Input, Text, Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuIcon, MenuCommand, MenuDivider } from "@chakra-ui/react";

// Compnent & File Imports
import { API_URL } from '../../../_helper/config';
import Auth from '../../../component/Auth';
import SideNav from '../../../component/SideNav';
import LinkPreview from '../../../component/LinkPreview';

const Links = ({linksData}) => {


  // if(!linksData){
  //   return <Auth/>;
  // }

    const [session, loading] = useSession();
    const router = useRouter();
    const { name } = router.query;
    // console.log(linksData.links);

    if(loading){
      console.log(setInterval(function(){ return "Loading.."; }, 1000));
    } else {
      console.log("Not Loading..");
    }


    // States & Effects
    const [analticsDropdown, setAnalticsDropdown] = useState('Weekly');
    const [linkList, setlinkList] = useState({list:linksData.links});
    const [titleName, setTitleName] = useState('');
    const [urlName, setUrlName] = useState('');
    const [linkActiveState, setlinkActiveState] = useState(
      new Array(linksData.links.length).fill(null).map((_, i)=> (linksData.links[i].active == 1 ? true : false))
    );
    const { isOpen, onToggle } = useDisclosure();
    const { hasCopied, onCopy } = useClipboard(`https://www.linkwynk.com/${name}`);
    
    // console.log(linkActiveState);
    
    // Link List Drag
    const onLinkDragEnd = (param) => {

          if (!param.destination) return;

          const items = Array.from(linkList.list);
          const [reorderedItem] = items.splice(param.source.index, 1);
          items.splice(param.destination.index, 0, reorderedItem);
          setlinkList({list:items});
          console.log(items);
    };

    // Add New Link
    const addLink = () => {
      const obj = {'title':"Title", 'url':'Url', 'active':0, 'link_image':null};
      linkList.list.unshift(obj);
      setlinkList({list:linkList.list});
      axios.post(API_URL+'save_link', {
        title: obj.title,
        link_url: obj.url,
        acitve: obj.acitve,
        link_image: obj.link_image
      }, {headers: {
        'Authorization': `Bearer ${session.accessToken}`
      }})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      // linkList.list.unshift(obj);
      // setlinkList({list:linkList.list});
      // console.log(linkList);
    };

    // Remove Link
    const removeLink = (link_id) => {

      let config = {
        headers: {
          'Authorization': `Bearer ${session.accessToken}`
        },
        params:{
          link_id: link_id
        },
      }

      const removedLinklist = linkList.list.filter(item => item._id !== link_id);
      setlinkList({list:removedLinklist});

      axios.get(API_URL+'delete_link', config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log(session.accessToken);
    };

    const handleChange = (e)=>{
      setTitleName(e.target.value);
      console.log("test:- "+e.target.value);
    };

  // Handle Logout..
  const logOut = () => {

    axios.post(API_URL+'logout', null, {headers: {
      'Authorization': `Bearer ${session.accessToken}`
    }})
    .then(function (response) {
      signOut({redirect: true, callbackUrl: "/"});
      router.replace("/");
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    
  };


  // Handle Link Title Value
  const saveTitleName = (titleName, linkId) => {
    setTitleName(titleName);
    const obj = {'switchCase':"title", 'title':titleName, 'linkId':linkId};
    saveLinkData(obj);
  }

  // Handle Link Url Value
  const saveUrlName = (urlName, linkId) => {
    setUrlName(urlName);
    const obj = {'switchCase':"url", 'url':urlName, 'linkId':linkId};
    saveLinkData(obj);
  }

  // Handle Link Active State
  const saveLinkActiveState = (state, toggleID, linkId) => {

    var active = state ? 1 : 0;
    const updatedCheckedState = linkActiveState.map((item, index) =>
    index === toggleID ? !item : item
  );
  setlinkActiveState(updatedCheckedState);
  // const obj = {'switchCase':"linkActiveState", 'active':!linkActiveState[toggleID], 'linkId':linkId};
  const obj = {'switchCase':"linkActiveState", 'active':active, 'linkId':linkId};
  saveLinkData(obj);
  console.log(obj);

  }

  const saveLinkData = (obj) => {
      
      const apiLoad = obj.switchCase;
      switch(apiLoad) {
        case "title":

          axios.post(API_URL+'save_link', { link_id:obj.linkId, title:obj.title }, {headers: {
            'Authorization': `Bearer ${session.accessToken}`
          }})
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

          console.log("Switch title");
          break;
        case "url":

          axios.post(API_URL+'save_link', { link_id:obj.linkId, link_url:obj.url }, {headers: {
            'Authorization': `Bearer ${session.accessToken}`
          }})
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

          console.log("Switch Url");
          break;
          case "linkActiveState":

          axios.post(API_URL+'save_link', { link_id:obj.linkId, active:obj.active }, {headers: {
            'Authorization': `Bearer ${session.accessToken}`
          }})
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

          console.log("Switch Active");
          break;
        default:
          console.log("Default in Switch Case..");
          // code block
      }
  }


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
          <IconButton height="auto" width="auto"  bg="transparent" _hover={{ backgroundColor:"none" }} _active={{ backgroundColor:"none" }} _focus={{ backgroundColor:"none" }} icon={<FiCheck />} {...getSubmitButtonProps()} />
        </Box>
      ) : (
        <Box display="inline-block">
          <IconButton height="auto" width="auto" className="themeFont" bg="transparent" _hover={{ backgroundColor:"none" }} _active={{ backgroundColor:"none" }} _focus={{ backgroundColor:"none" }} icon={<FiEdit2 />} {...getEditButtonProps()} />
        </Box>
      )
    }

    return ( 
      <>
      {(!linksData) ? <Auth/> : 
        <Box className="clearfix">
        <SideNav />
        <Box width={{ base: "100%", md: "100%", lg: "calc(100% - 164px)"}}  padding={["24px 35px"]} position="relative" left={{ base: "0", md: "0", lg: "164px"}}>
           <Box className="links-dashboard" width="100%">
           <Flex className="row" justifyContent="space-between" width="100%">
    <Box flexShrink="0" flexBasis={{ base: "100%", md:"100%", lg: "70%"}} h="100%">
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
                              <MenuButton isActive={isOpen} as={Button} rightIcon={<FiChevronDown />} bg="#F5F5F7" fontSize="13px"  _focus={{ boxShadow: "none" }}>
                                { analticsDropdown }
                              </MenuButton>
                              <MenuList minWidth="120px">
                                <MenuItem _focus={{ background:"#0C0B0B", color:"#FFFFFF" }} onClick={() => setAnalticsDropdown('Weekly')}>Weekly</MenuItem>
                                <MenuItem _focus={{ background:"#0C0B0B", color:"#FFFFFF" }} onClick={() => setAnalticsDropdown('Monthly')}>Monthly</MenuItem>
                                <MenuItem _focus={{ background:"#0C0B0B", color:"#FFFFFF" }} onClick={() => setAnalticsDropdown('Yearly')}>Yearly</MenuItem>
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
              label: 'Total',
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
        height={100}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          plugins:{
            tooltip:{
              callbacks: {
                labelColor: function(context) {
                    return {};
                },
                labelTextColor: function(context) {
                    return '#FFFFFF';
                },
            },
              backgroundColor: '#0C0B0B',
              bodyColor:'#FFFFFF',
              bodyFont:{
                size: 16
              },
              bodySpacing:2,
            }, 
            legend: {
              display: false
                    },
                 },
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
            <Center marginTop="40px"><Button onClick={addLink} className="theme-button add-link-btn" width="130px" padding="18px 40px" type="button">Add Links</Button></Center>

            {/* Start of Links Drag and Drop Section */}

            <Box className="draggable-container" marginTop="40px">

            <DragDropContext  onDragEnd={onLinkDragEnd}>
            <Droppable droppableId="droppable-1">

            {(provided, _) => (
              <Box  ref={provided.innerRef} {...provided.droppableProps}>

{Object.values(linkList.list).map((type, i) => {
          return (
                <Draggable key={type._id}
                draggableId={"draggable-" + type._id} index={i}>

                {(provided, snapshot) => (
                  <Box  ref={provided.innerRef} {...provided.draggableProps}>
                    
                <Box className="links" bg="#F5F5F7" borderRadius="14px" style={{ ...provided.draggableProps, boxShadow:snapshot.isDragging ? "0 0 .4rem #666" : "none"}}>
                  <Flex>
                  <Box  {...provided.dragHandleProps} className="draggable-handle" padding="50px 16px" borderRight="2px solid rgba(12, 11, 11, 0.2)">
                  <Center transform="rotate(90deg)">
                    <FiRepeat fontSize="20px"/>
                  </Center>
                  </Box>
                    <Box className="draggable-link-content" padding="8px 16px" width="100%">
                        <Flex alignItems="center" className="edit-link-details">
                        <Box className="link-img" display="inline-block">
                        <Image
                              boxSize="64px"
                              borderRadius="12px"
                              objectFit="cover"
                              src={ type.photo ? "https://dev.welovecoders.com/storage/app/public/"+type.photo : ''}
                              alt={type.title}
                              fallbackSrc={ !type.photo ? "https://via.placeholder.com/64" : ''}
                            />
                        </Box>
                        <Box className="link-detials" display="inline-block" marginLeft="22px">
                        <Editable defaultValue={type.title} isPreviewFocusable={false} className="editable-container">
                          <EditablePreview className="themeFont" />
                          <EditableInput value={titleName} onKeyDown={(e) => {e.key === 'Enter'? saveTitleName(e.target.value, type._id) : null}} onBlur={(e) => {saveTitleName(e.target.value, type._id)}}/>
                          <EditableControls />
                        </Editable>
                        <Editable defaultValue={type.link_url ? type.link_url : urlName} isPreviewFocusable={false} className="editable-container">
                          <EditablePreview />
                          <EditableInput value={urlName}  onKeyDown={(e) => {e.key === 'Enter'? saveUrlName(e.target.value, type._id) : null}} onBlur={(e) => {saveUrlName(e.target.value, type._id)}}/>
                          <EditableControls />
                        </Editable>
                        </Box>
                        <Box marginLeft="auto">
                            <Box className="toggle-link">
                            <Switch id="link-show-hide" size="md" isChecked={linkActiveState[i]} onChange={(e) => {saveLinkActiveState(e.target.checked, i, type._id)}}/>
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
                            <Box display="inline-block" fontSize="18px" color="red" cursor="pointer" onClick={() => removeLink(type._id)}>
                              <FiXCircle />
                            </Box>
                          </Box>
                        </Flex>
                    </Box>
                  </Flex>
                </Box>
                
                </Box>
                  )}
                </Draggable>
                );
              })}
              {provided.placeholder}
                </Box>
                 )}
                </Droppable>
                </DragDropContext>
            </Box>

            {/* End of Links Drag and Drop Section */}
        </Box>
       </Box>
    <Box h="100%" display={{ base: "none",  md: "none", lg: "block" }}>
      <Box className="link-preview-container" marginTop="31px">
          <Box className="notification-profile-dropdown" display="flex" alignItems="center" justifyContent="flex-end">
            <Box className="notification-bell" display="inline-block" boxSize="25px" marginRight="20px">
            <FiBell fontSize="25px" />
            </Box>
            
            <Box className="profile-dropdown" display="inline-block">
            <Menu>
              <MenuButton>
                <Avatar name="User Image" boxSize="40px" borderRadius="8px" src="https://bit.ly/dan-abramov" />
                <Box display="inline-block" marginTop="25%" marginLeft="5px"><FiChevronDown /></Box>
              </MenuButton>
              <MenuList minWidth="120px">
                <MenuItem _focus={{ background:"#0C0B0B", color:"#FFFFFF" }}>Profile</MenuItem>
                <MenuItem _focus={{ background:"#0C0B0B", color:"#FFFFFF" }}>Setting</MenuItem>
                <MenuItem _focus={{ background:"#0C0B0B", color:"#FFFFFF" }} onClick={logOut}>Logout</MenuItem>
              </MenuList>
            </Menu>
            </Box>
          </Box>
          <Box>
            <LinkPreview />
          </Box>
          <Box className="user-linkwynk-link" marginTop="30px" justifyContent="center" display="flex" alignItems="center">
                <Text display="inline-block" fontWeight="700" fontSize="20px" marginRight="5px">My Linkwynk:</Text><Link fontSize="20px" href={"https://www.linkwynk.com/"+ name} isExternal>linkwynk.com/{ name }</Link>
                <Box display="inline-block" marginLeft="5px" cursor="pointer" title="Copy" onClick={onCopy}>
                {!hasCopied ? <FiClipboard fontSize="20px"/> : <FiCheck ontSize="22px" />}
                </Box>
          </Box>
      </Box>
    </Box>
  </Flex>
           </Box>
        </Box>
        </Box>
}
        </>
     );
}


export async function getServerSideProps(context) {

  const sessionData = await getSession(context);

  if(sessionData){
    axios.defaults.headers.common['Authorization'] = "Bearer "+sessionData.accessToken;
    const {data} = await axios.get(API_URL + 'list_links', { params :{
      username:sessionData.username
    }});

    return {
      props:{linksData:data}
    }
  } else {
    return {
      props:{linksData:null}
    }
  }
  

}
 
export default Links;