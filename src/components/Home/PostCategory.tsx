import {Flex, Heading, Text} from "@chakra-ui/react";
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

export const PostCategory = ({post: {img, category_name, category, title, id}}: { post: PropsPost }) => {
  const router = useRouter()

  return (<Flex
    h={"full"}
    w={"full"}
    direction={"column"}
    cursor={"pointer"}
    onClick={() => router.push(`/category/${category}/post/${id}`)}
  >
    <Flex
      bgImage={img}
      bgSize={"cover"}
      borderRadius={"md"}
      h={{base: "200px", md: "80%"}}
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"flex-start"}
      py={2}
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
    <Heading
      size={"sm"}
      color={"black"}
      pt={5}
      textAlign={"center"}
      h={{base: "auto", md: "20%"}}
    >
      {
        title
      }
    </Heading>
  </Flex>)
}