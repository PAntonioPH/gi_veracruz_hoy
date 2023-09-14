import {Box, Divider, Heading, Stack, useBreakpointValue} from "@chakra-ui/react";
import React from "react";
import {PostCategory} from "@/components/Home/PostCategory";
import {LastPostCategory} from "@/components/Home/LastPostCategory";
import {TimelineFacebook} from "@/components/SocialMedia/TimelineFacebook";
import {TimelineTwitter} from "@/components/SocialMedia/TimelineTwitter";

interface PropsPost {
  id: number,
  title: string,
  img: string,
  content: string,
  category: string,
  category_name: string
}

interface Props {
  posts: PropsPost[],
  name: string,
  timeline?: boolean
}

export const Category = ({posts, name, timeline}: Props) => {
  const isDesktop = useBreakpointValue({base: false, md: true})

  return (<>
    {
      posts && posts.length > 0
      && (<Box
      >
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
          direction={{md: "row", base: "column"}}
          w={"100%"}
          spacing={10}
          h={{md: timeline ? "1000px" : "500px", base: "auto"}}
        >
          {
            (!isDesktop && !timeline) && (<LastPostCategory post={posts[0]}/>)
          }

          <Stack
            w={{md: timeline ? "35%" : "25%", base: "100%"}}
            spacing={5}
            p={2}
          >
            {
              timeline
                ? (<>
                  <PostCategory post={posts[0]}/>
                  <PostCategory post={posts[1]}/>
                </>)
                : (<>
                  <PostCategory post={posts[1]}/>
                  <PostCategory post={posts[2]}/>
                </>)
            }
          </Stack>

          {
            (isDesktop && !timeline) && (<LastPostCategory post={posts[0]}/>)
          }

          <Stack
            w={{md: timeline ? "35%" : "25%", base: "100%"}}
            spacing={5}
            p={2}
          >
            {
              timeline
                ? (<>
                  <PostCategory post={posts[2]}/>
                  <PostCategory post={posts[3]}/>
                </>)
                : (<>
                  <PostCategory post={posts[3]}/>
                  <PostCategory post={posts[4]}/>
                </>)
            }
          </Stack>

          {
            timeline
            && (<Box
              w={{md: "30%", base: "100%"}}
            >
              <TimelineFacebook/>
              <Divider my={5}/>
              <TimelineTwitter/>
            </Box>)
          }
        </Stack>
      </Box>)
    }
  </>)
}