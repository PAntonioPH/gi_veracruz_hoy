import {Box, BoxProps, Flex, SimpleGrid, Text, HStack, Image, VStack, Heading, Divider} from '@chakra-ui/react'
import React, {useEffect, useState} from "react";
import {LoadingPage} from "@/components/LoadingPage";
import axios from "axios";
import {useRouter} from "next/router";

interface PropsPost {
  id: number,
  title: string,
  img: string,
  content: string,
  category_name: string,
  category: string
}

interface PropsCategories {
  lastPosts: PropsPost[]
  estado: PropsPost[]
}

export const Footer = (props: BoxProps) => {
  const router = useRouter()
  const [data, setData] = useState<PropsCategories>({
    lastPosts: [],
    estado: []
  })

  useEffect(() => {
    axios.get('/api/v1/footer', {
      headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}
    })
      .then(res => {
        setData(res.data.response)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const [isLoading, setIsLoading] = useState(true);

  return (
    <Box>
      {
        isLoading
          ? (<LoadingPage/>)
          : (<Box as="footer" role="contentinfo" px={{base: '8'}} mt={10} bg={"#252729"} {...props} >
            <SimpleGrid
              columns={3}
              py={10}
            >
              <Flex
                px={5}
                direction={"column"}
              >
                <Text
                  color={"white"}
                >
                  ESTADO
                </Text>
                <Divider borderWidth="3px" mb={5} borderColor="#d13030"/>
                {
                  data.estado.map(({id, img, title, content, category_name, category}) => (
                    <Flex
                      key={id}
                      bgImage={img}
                      bgSize={"cover"}
                      borderRadius={"md"}
                      flexDirection={"column"}
                      justifyContent={"flex-end"}
                      alignItems={"flex-start"}
                      py={2}
                      h={"300px"}
                      w={"full"}
                      boxShadow={"lg"}
                      bgGradient={`linear-gradient(to-t, black, transparent), url("${img}")`}
                      onClick={() => router.push(`/category/${category}/post/${id}`)}
                      cursor={"pointer"}
                    >
                      <Text
                        px={5}
                        bg={"#bf3030"}
                        color={"white"}
                      >
                        {
                          category_name
                        }
                      </Text>
                      <Text
                        color={"white"}
                        px={5}
                        py={5}
                        textTransform="uppercase"
                      >
                        {
                          title
                        }
                      </Text>

                      <Text
                        color={"white"}
                        px={5}
                      >
                        {
                          content.slice(0, 70)
                        }
                        {
                          content.length > 71
                          && "..."
                        }
                      </Text>
                    </Flex>
                  ))
                }
              </Flex>

              <VStack
                spacing={5}
                pb={5}
              >
                <Flex
                  direction={"column"}
                >
                  <Text
                    color={"white"}
                  >
                    RECIENTES
                  </Text>
                  <Divider borderWidth="3px" mb={5} borderColor="#d13030"/>
                </Flex>
                {
                  data.lastPosts.map(({id, img, title, category}) => (
                    <HStack
                      key={id}
                      h={"50px"}
                      borderRadius={"lg"}
                      boxShadow={"lg"}
                      onClick={() => router.push(`/category/${category}/post/${id}`)}
                      cursor={"pointer"}
                    >
                      <Image
                        objectFit='cover'
                        src={img}
                        alt='Imagen'
                        h={"full"}
                      />
                      <Heading
                        color={"white"}
                        size={"sm"}
                        textTransform="uppercase"
                      >
                        {
                          title.slice(0, 25)
                        }
                        {
                          title.length > 25
                          && "..."
                        }
                      </Heading>
                    </HStack>
                  ))
                }
              </VStack>

              <VStack
                spacing={15}
              >
                <Text
                  color={"white"}
                >
                  ÚLTIMAS TENDENCIAS
                </Text>
                <Divider borderWidth="3px" mb={5} borderColor="#d13030"/>

                {
                  data.lastPosts.map(({id, title, category}) => (
                    <Flex
                      key={id}
                      px={5}
                      onClick={() => router.push(`/category/${category}/post/${id}`)}
                      cursor={"pointer"}
                      borderLeft={"6px solid white"}
                      _hover={{bg: "#8c2d2d"}}
                    >

                      <Text
                        color={"white"}
                      >
                        {
                          title
                        }
                      </Text>
                    </Flex>
                  ))
                }
              </VStack>

            </SimpleGrid>

          </Box>)
      }
    </Box>


  )
}
