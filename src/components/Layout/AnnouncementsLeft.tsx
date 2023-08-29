import {Box, Divider, Flex, Heading, Image, useBreakpointValue} from "@chakra-ui/react";

export const AnnouncementsLeft = () => {
  const isDesktop = useBreakpointValue({base: false, lg: true})

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
        <Heading as="h1" size="lg">:::::</Heading>
        <Divider borderColor="#a02142" borderWidth="1px"/>
      </Box>

      <Divider my={5} borderColor="gray.200" borderWidth="1px"/>
      <Box>
        <Image
          src={`/assets/campanas/anna.jpg`}
          alt={'Conducir'}
        />
      </Box>
      {/*<Divider my={5} borderColor="gray.200" borderWidth="1px"/>*/}

      {/*   <Box>*/}
      {/*  <Image*/}
      {/*    // src={`/assets/campanas/violeta.jpg`}*/}
      {/*    alt={'inscribete'}*/}
      {/*  />*/}
      {/*  <Divider my={5} borderColor="gray.200" borderWidth="1px"/>*/}
      {/*</Box>*/}

      {/*<Box>*/}
      {/*  <iframe width="250" height="300" src="https://www.youtube.com/embed/765i3uB2onA"*/}
      {/*          title="YouTube video player"*/}
      {/*          frameBorder="0"*/}
      {/*          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"*/}
      {/*          allowFullScreen>*/}
      {/*  </iframe>*/}

      {/*</Box>*/}
      <Divider my={5} borderColor="gray.200" borderWidth="1px"/>
      <Box>
        <Image
          src={`/assets/campanas/school3.jpeg`}
          alt={'Conducir'}
        />
      </Box>

      {/*<Divider my={5} borderColor="gray.200" borderWidth="1px"/>*/}

      {/*<Box>*/}
      {/*  <iframe width="250" height="300" src="https://www.youtube.com/embed/FxLBJhWcI1o"*/}
      {/*          title="YouTube video player"*/}
      {/*          frameBorder="0"*/}
      {/*          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"*/}
      {/*          allowFullScreen>*/}
      {/*  </iframe>*/}

      {/*</Box>*/}
      {/*<Divider my={5} borderColor="gray.200" borderWidth="1px"/>*/}
      {/*<Box>*/}
      {/*  <Image*/}
      {/*    src={`/assets/campanas/089-den.jpg`}*/}
      {/*    alt={'Conducir'}*/}
      {/*  />*/}
      {/*</Box>*/}
      {/*<Divider my={5} borderColor="gray.200" borderWidth="1px"/>*/}
      {/*<Box>*/}
      {/*  <Image*/}
      {/*    src={`/assets/campanas/tlan.jpg`}*/}
      {/*    alt={'Conducir'}*/}
      {/*  />*/}
      {/*</Box>*/}

      <Divider my={5} borderColor="gray.200" borderWidth="1px"/>
      <Image
        src={`/assets/campanas/bann.png`}
        alt={'Casa de empeño'}
        onClick={() => window.open(`https://hidalgo.travel/wordpress/?page_id=5312`, '_blank')}
        cursor={"pointer"}
      />
      <Divider my={5} borderColor="gray.200" borderWidth="1px"/>
      <Box>
        <Image
          src={`/assets/campanas/school2.jpeg`}
          alt={'Conducir'}
        />
      </Box>
      <Divider my={5} borderColor="gray.200" borderWidth="1px"/>
      <Box>
        <Image
          src={`/assets/campanas/jmg.jpg`}
          alt={'Conducir'}
        />
      </Box>
    </Flex>
  )
}

