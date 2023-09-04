import {Box, Divider, Flex, Heading, useBreakpointValue} from "@chakra-ui/react";
import {TimelineTwitter} from "@/components/SocialMedia/TimelineTwitter";
import {TimelineFacebook} from "@/components/SocialMedia/TimelineFacebook";
import React from "react";

export const AnnouncementsRight = () => {
  return (<Flex
      as="aside"
      direction="column"
      w={{base: "100%", md: "20%"}}
      pr={{base: 8, md: 2}}
      pl={{base: 8, md: 2}}
      pt={{base: 0, md: 3}}
    >
      <Box
        mb={5}
      >
        <Heading as="h1" size="lg"> :::::</Heading>
        <Divider borderColor="#a02142" borderWidth="1px"/>
      </Box>

      <Divider my={5} borderColor="gray.200" borderWidth="1px"/>
      <TimelineFacebook/>

      <Divider my={5} borderColor="gray.200" borderWidth="1px"/>

      <TimelineTwitter/>

      <Divider my={5} borderColor="gray.200" borderWidth="1px"/>

    </Flex>
  )
}

