import React, { useEffect, useRef } from "react"
import { Flex, 
    Text, 
    Avatar, 
    Button,
    } from "@chakra-ui/react"
import BeatLoader from "react-spinners/BeatLoader"

const Messages = ({ messages }) => {
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  return (
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
      {messages.map((item, index) => {
        if (item.from === "me") {
          return (
            <Flex key={index} w="100%" justify="flex-end">
              <Flex
                bg="black"
                color="white"
                minW="1000px"
                maxW="550px"
                my="1"
                p="3"
                paddingLeft={"1.25rem"}
              >
                <Text>{item.text}</Text>
              </Flex>
            </Flex>
          );
        } else {
          return (
            <Flex key={index} w="100%">
              <Avatar
                name="Computer"
                w={70}
                h={70}
                src="https://media.licdn.com/dms/image/C5603AQE8fCwomwCjhQ/profile-displayphoto-shrink_800_800/0/1662494019775?e=2147483647&v=beta&t=HqZoo89s5GDJlxpiPt1_pMYtElbK0HVXDOr9tEiu87I"
                sx={({
                    img: {borderRadius:1000,
                    },
                })}
              />
              <Flex
                bg="gray.300"
                color="black"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
              >
                <Text>{item.text}</Text>
              </Flex>
              <Button isloading
                loadingText='Regenerating'
                colorScheme='teal'
                spinner={<BeatLoader size={8} color='white' />}
                variant='outline'>
                    Regenerate
                </Button>
            </Flex>
          );
        }
      })}
      <AlwaysScrollToBottom />
    </Flex>
  );
};

export default Messages;
