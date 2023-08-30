import {Box, Flex, Heading, Stack} from "@chakra-ui/react";
import React from "react";
import {PostCategory} from "@/components/Home/PostCategory";
import {LastPostCategory} from "@/components/Home/LastPostCategory";

interface PropsPost {
  id: number,
  title: string,
  img: string,
  content: string,
  category: string,
  category_name: string
}

export const Category = ({posts, name}: { posts: PropsPost[], name: string }) => {
  return (<Box>
    <Box
      bg={"#333946"}
      w={"full"}
      mt={"20"}
    >
      <Heading
        p={2}
        mb={5}
        w={"fit-content"}
        bg={"#d13030"}
        size={"sm"}
        color={"white"}
      >
        {
          name
        }
      </Heading>
    </Box>
    <Stack
      direction={"row"}
      w={"100%"}
      spacing={10}
      h={"500px"}
    >
      <Stack
        w={"25%"}
        spacing={5}
        p={2}
      >
        <PostCategory post={posts[1]}/>
        <PostCategory post={posts[2]}/>
      </Stack>

      <LastPostCategory post={posts[0]}/>

      <Stack
        w={"25%"}
        spacing={5}
        p={2}
      >
        <PostCategory post={posts[3]}/>
        <PostCategory post={posts[4]}/>
      </Stack>
    </Stack>
  </Box>)
}