import { useEffect, useState } from 'react';
import { Tag } from "@chakra-ui/react";

const Tagbutton = (props) => {
    
    const [color, setcolor] = useState(false);

    const UpdateParent = () => {

        props.addTag({id:props.dataid, color:color});
        color ? setcolor(false) : setcolor(true);
    }

    return ( 
        <Tag
      cursor="pointer"
      bg={color ? "#0C0B0B" : "#F5F5F7"}
      color={color ? "#ffffff" : "#0C0B0B"}
      mr="8px"
      mb="10px"
      padding="10px"
      borderRadius="20px"
      cursor={ props.totalSelect != 3 || color  ? "pointer" : "not-allowed"}
      onClick={ props.totalSelect != 3 || color ? UpdateParent : null}
    >
      {props.children}
    </Tag>
     );
}
 
export default Tagbutton;