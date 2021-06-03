import { useRouter } from 'next/router';
import { Line } from 'react-chartjs-2';
import { Button, Spinner, Tag, Flex, Box, Spacer, Heading, Image, useDisclosure, Collapse, Container, Center, FormControl, FormLabel, Input, Text, Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuIcon, MenuCommand, MenuDivider } from "@chakra-ui/react";

// Local File Imports
import { API_URL } from '../../_helper/config';
import Auth from '../../component/Auth';
import SideNav from '../../component/SideNav';

const Links = () => {

    const router = useRouter();
    const { isOpen, onToggle } = useDisclosure()
    const { links } = router.query;

    return ( 
        <Box className="clearfix">
        <SideNav />
        <Box w="calc(100% - 164px)"  padding={["24px 50px"]} position="relative" left="164px" >
           <Box className="links-dashboard">
           <Flex>
    <Box w="620px" h="100%">
            <Box className="dashboard-greeting" bg="#F5F5F7" width="100%" borderRadius="14px" position="relative" padding="46px 0px" marginTop="31px">
               <Box display="inline-block" marginLeft="30px">
                  <Heading fontSize={["24px","32px","36px","36px"]} isTruncated maxWidth="300px">Hello {links}!</Heading>
                  <Text fontSize={["16px"]} title="New Text">It’s good to see you again.</Text>
               </Box>
               <Box position="absolute" right="70px" bottom="0">
                  <Image src="/img/boy.svg"alt="Segun Adebayo" />
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
                     <Button width="120px" type="button" onClick={onToggle}>View More</Button>
                     </Box>
                  </Box>
                  <Collapse in={isOpen} animateOpacity>
                  <Box mt="4">
          <Line
        data={{
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [
            {
              label: '# of votes',
              data: [12, 19, 3, 5, 2, 3],
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
                ticks: {
                  beginAtZero: true,
                } 
              },
            ],
          },
        }}
      />
        </Box>
                  </Collapse>
            </Box>
        <Box className="add-links-section">
            <Center marginTop="40px"><Button className="add-link-btn" width="130px" padding="18px 40px" type="button">Add Links</Button></Center>
        </Box>
       </Box>
    <Spacer />
    <Box w="350px" h="100%" bg="red.500">
       </Box>
  </Flex>
           </Box>
        </Box>
        </Box>
     );
}
 
export default Links;