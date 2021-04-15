import Head from 'next/head'
import { Flex, Link } from "@chakra-ui/react";

// Local File Imports
import DarkmodeToggle from '../component/darkmode'


export default function Home() {

  return (

    <Flex width="100%" height="100vh" align="center" justifyContent="center">
      <DarkmodeToggle/>
      <Link href="user/login">Login</Link>
</Flex>
  )
}
