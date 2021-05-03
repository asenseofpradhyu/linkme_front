import { Flex, Link } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react"

// Local File Imports
import DarkmodeToggle from '../component/darkmode'


export default function Home() {

  return (

    <Flex width="100%" height="100vh" align="center" justifyContent="center">
      {/* <DarkmodeToggle/> */}
      <Link href="user/login" color="linkme.100">Login</Link>
</Flex>
  )
}
