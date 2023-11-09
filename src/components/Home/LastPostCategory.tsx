import {Box, Button, Center, Flex, Heading, Text} from "@chakra-ui/react";
import React from "react";
import {useRouter} from "next/router";

interface PropsPost {
  id: number,
  title: string,
  img: string,
  content: string,
  category: string,
  category_name: string
}

export const LastPostCategory = ({post: {img, category_name, title, content, category, id}}: { post: PropsPost }) => {
  const router = useRouter()

  return (<Flex
    w={{md: "50%", base: "100%"}}
    direction={"column"}
    h={"full"}
    cursor={"pointer"}
    onClick={() => router.push(`/category/${category}/post/${id}`)}
  >
    <Flex
      bgImage={img}
      bgSize={"cover"}
      borderRadius={"md"}
      h={{md: "full", base:"200px"}}
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"flex-start"}
    >
      <Text
        px={5}
        bg={"#bf3030"}
        color={"white"}
        textTransform={"uppercase"}
      >
        {
          category_name
        }
      </Text>
    </Flex>
    <Center>
      <Box
        position={"relative"}
        bg={"white"}
        bottom={"40px"}
        w={"90%"}
        px={5}
      >
        <Heading
          size={"sm"}
          color={"black"}
          pt={5}
          textAlign={"center"}
        >
          {title}
        </Heading>

        <Text>
          {
            content.slice(0, 110)
          }
          {
            content.length > 111
            && "..."
          }
        </Text>
        <Center>
          <Button
            variant={"outline"}
            colorScheme={"gray"}
          >
            Leer más
          </Button>
        </Center>
      </Box>
    </Center>
  </Flex>)
}