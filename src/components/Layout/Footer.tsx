import {Box, BoxProps, Flex, SimpleGrid, Text} from '@chakra-ui/react'
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
  const handleClick = async (url: string) => await router.push(url === "/" ? "/" : `/category/${url}`)

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
              >
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


              <Flex
                p={5}>
                {
                  data.lastPosts.map(({id, img, title}) => (
                    <Flex
                      key={id}
                      bg={"white"}

                    >
                      <Text> {title}</Text>
                    </Flex>
                  ))
                }
              </Flex>

              <Flex>
                {
                  data.lastPosts.map(({id, title}) => (
                    <Flex
                      key={id}
                      bg={"purple"}
                    >
                      <Text>
                        {title}
                      </Text>
                    </Flex>
                  ))
                }
              </Flex>

            </SimpleGrid>

          </Box>)
      }
    </Box>


  )
}
