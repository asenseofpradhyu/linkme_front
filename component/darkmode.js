import { Flex, Button, useColorMode } from "@chakra-ui/react";

const DarkmodeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return ( 
        <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
     );
}
 
export default DarkmodeToggle;