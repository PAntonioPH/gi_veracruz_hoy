import {LayoutSingle} from "@/components/Layout/LayoutSingle";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {LoadingPage} from "@/components/LoadingPage";
import {useRouter} from "next/router";
import {Slider} from "@/components/Slider";
import {Flex, SimpleGrid, Stack, Text, Image, Heading, Center, Box, Button} from "@chakra-ui/react";
import category from "@/pages/category/[category]";

interface PropsPost {
  id: number,
  title: string,
  img: string,
  content: string,
  category: string,
  category_name: string
}

interface PropsCategory {
  estado: PropsPost[],
  deportes: PropsPost[],
  espectaculos: PropsPost[],
  nacional: PropsPost[],
  internacional: PropsPost[]
}

interface PropsCategories {
  categoriesPosts: PropsCategory
  lastPosts: PropsPost[]
}


const Index = () => {
  const router = useRouter()
  const [data, setData] = useState<PropsCategories>({
    categoriesPosts: {
      estado: [],
      deportes: [],
      espectaculos: [],
      nacional: [],
      internacional: []
    },
    lastPosts: []
  })
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/v1/home', {headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}})
      .then(res => {
        setData(res.data.response)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const handleClickPost = async (category: string, id: number) => await router.push(`/category/${category}/post/${id}`)

  return (
    <LayoutSingle title={"Veracruz Hoy"}>
      {
        isLoading
          ? (<LoadingPage/>)
          : (<>
            <Slider
              posts={data.lastPosts}
              handleClick={(index: number) => router.push(`/category/${data.lastPosts[index].category}/post/${data.lastPosts[index].id}`)}
              defaultImage={'assets/images/placeholderImg.jpg'}
            />
            <Box
              bg={"#333946"}
              w={"full"}
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
                  data.categoriesPosts.estado[0].category_name
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
                <Flex
                  h={"full"}
                  w={"full"}
                  direction={"column"}
                >
                  <Flex
                    bgImage={data.categoriesPosts.estado[1].img}
                    bgSize={"cover"}
                    borderRadius={"md"}
                    h={"80%"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                    alignItems={"flex-start"}
                    py={2}
                  >
                    <Text
                      px={5}
                      bg={"#bf3030"}
                      color={"white"}
                    >
                      {
                        data.categoriesPosts.estado[1].category_name
                      }
                    </Text>
                  </Flex>
                  <Heading
                    size={"sm"}
                    color={"black"}
                    pt={5}
                    textAlign={"center"}
                    h={"20%"}
                  >
                    {
                      data.categoriesPosts.estado[1].title
                    }
                  </Heading>
                  <Button
                    mt={5}
                  >
                    Leer más...
                  </Button>
                </Flex>

                <Flex
                  h={"full"}
                  w={"full"}
                  direction={"column"}
                >
                  <Flex
                    bgImage={data.categoriesPosts.estado[2].img}
                    bgSize={"cover"}
                    borderRadius={"md"}
                    h={"80%"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                    alignItems={"flex-start"}
                    py={2}
                  >
                    <Text
                      px={5}
                      bg={"#bf3030"}
                      color={"white"}
                    >
                      {
                        data.categoriesPosts.estado[2].category_name
                      }
                    </Text>
                  </Flex>
                  <Heading
                    size={"sm"}
                    color={"black"}
                    pt={5}
                    textAlign={"center"}
                  >
                    {data.categoriesPosts.estado[2].title}
                  </Heading>
                  <Button
                    mt={5}
                  >
                    Leer más...
                  </Button>
                </Flex>
              </Stack>

              <Flex
                w={"50%"}
                direction={"column"}
              >
                <Flex
                  bgImage={data.categoriesPosts.estado[0].img}
                  bgSize={"cover"}
                  borderRadius={"md"}
                  h={"80%"}
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                  alignItems={"flex-start"}
                  py={2}
                >
                  <Text
                    px={5}
                    bg={"#bf3030"}
                    color={"white"}
                  >
                    {
                      data.categoriesPosts.estado[0].category_name
                    }
                  </Text>
                </Flex>
                  <Heading
                    size={"sm"}
                    color={"black"}
                    pt={5}
                    textAlign={"center"}
                  >
                    {data.categoriesPosts.estado[0].title}
                  </Heading>

                  <Text>
                    {
                      data.categoriesPosts.estado[0].content.slice(85)
                    }
                    {
                      data.categoriesPosts.estado[0].content.length > 86
                      && "..."
                    }
                  </Text>
                  <Button
                    mt={5}
                  >
                    Leer más...
                  </Button>

              </Flex>

              <Stack
                w={"25%"}
                spacing={5}
                p={2}
              >
                <Flex
                  h={"full"}
                  w={"full"}
                  direction={"column"}
                >
                  <Flex
                    bgImage={data.categoriesPosts.estado[3].img}
                    bgSize={"cover"}
                    borderRadius={"md"}
                    h={"80%"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                    alignItems={"flex-start"}
                    py={2}
                  >
                    <Text
                      px={5}
                      bg={"#bf3030"}
                      color={"white"}
                    >
                      {
                        data.categoriesPosts.estado[3].category_name
                      }
                    </Text>
                  </Flex>
                  <Heading
                    size={"sm"}
                    color={"black"}
                    pt={5}
                    textAlign={"center"}
                    h={"20%"}
                  >
                    {
                      data.categoriesPosts.estado[3].title
                    }
                  </Heading>
                  <Button
                    mt={5}
                  >
                    Leer más...
                  </Button>
                </Flex>

                <Flex
                  h={"full"}
                  w={"full"}
                  direction={"column"}
                >
                  <Flex
                    bgImage={data.categoriesPosts.estado[4].img}
                    bgSize={"cover"}
                    borderRadius={"md"}
                    h={"80%"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                    alignItems={"flex-start"}
                    py={2}
                  >
                    <Text
                      px={5}
                      bg={"#bf3030"}
                      color={"white"}
                    >
                      {
                        data.categoriesPosts.estado[4].category_name
                      }
                    </Text>
                  </Flex>
                  <Heading
                    size={"sm"}
                    color={"black"}
                    pt={5}
                    textAlign={"center"}
                  >
                    {data.categoriesPosts.estado[4].title}
                  </Heading>
                </Flex>
              </Stack>
            </Stack>

            <Box
              bg={"#333946"}
              w={"full"}
              mt={10}
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
                  data.categoriesPosts.nacional[0].category_name
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
                <Flex
                  h={"full"}
                  w={"full"}
                  direction={"column"}
                >
                  <Flex
                    bgImage={data.categoriesPosts.nacional[1].img}
                    bgSize={"cover"}
                    borderRadius={"md"}
                    h={"80%"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                    alignItems={"flex-start"}
                    py={2}
                  >
                    <Text
                      px={5}
                      bg={"#bf3030"}
                      color={"white"}
                    >
                      {
                        data.categoriesPosts.nacional[1].category_name
                      }
                    </Text>
                  </Flex>
                  <Heading
                    size={"sm"}
                    color={"black"}
                    pt={5}
                    textAlign={"center"}
                    h={"20%"}
                  >
                    {
                      data.categoriesPosts.nacional[1].title
                    }
                  </Heading>
                </Flex>

                <Flex
                  h={"full"}
                  w={"full"}
                  direction={"column"}
                >
                  <Flex
                    bgImage={data.categoriesPosts.nacional[2].img}
                    bgSize={"cover"}
                    borderRadius={"md"}
                    h={"80%"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                    alignItems={"flex-start"}
                    py={2}
                  >
                    <Text
                      px={5}
                      bg={"#bf3030"}
                      color={"white"}
                    >
                      {
                        data.categoriesPosts.nacional[2].category_name
                      }
                    </Text>
                  </Flex>
                  <Heading
                    size={"sm"}
                    color={"black"}
                    pt={5}
                    textAlign={"center"}
                  >
                    {data.categoriesPosts.nacional[2].title}
                  </Heading>
                </Flex>
              </Stack>

              <Flex
                w={"50%"}
                direction={"column"}
              >
                <Flex
                  bgImage={data.categoriesPosts.nacional[0].img}
                  bgSize={"cover"}
                  borderRadius={"md"}
                  h={"80%"}
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                  alignItems={"flex-start"}
                  py={2}
                >
                  <Text
                    px={5}
                    bg={"#bf3030"}
                    color={"white"}
                  >
                    {
                      data.categoriesPosts.nacional[0].category_name
                    }
                  </Text>
                </Flex>
                <Heading
                  size={"sm"}
                  color={"black"}
                  pt={5}
                  textAlign={"center"}
                >
                  {data.categoriesPosts.nacional[0].title}
                </Heading>

                <Text>
                  {
                    data.categoriesPosts.nacional[0].content.slice(85)
                  }
                  {
                    data.categoriesPosts.nacional[0].content.length > 86
                    && "..."
                  }
                </Text>
              </Flex>

              <Stack
                w={"25%"}
                spacing={5}
                p={2}
              >
                <Flex
                  h={"full"}
                  w={"full"}
                  direction={"column"}
                >
                  <Flex
                    bgImage={data.categoriesPosts.nacional[3].img}
                    bgSize={"cover"}
                    borderRadius={"md"}
                    h={"80%"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                    alignItems={"flex-start"}
                    py={2}
                  >
                    <Text
                      px={5}
                      bg={"#bf3030"}
                      color={"white"}
                    >
                      {
                        data.categoriesPosts.nacional[3].category_name
                      }
                    </Text>
                  </Flex>
                  <Heading
                    size={"sm"}
                    color={"black"}
                    pt={5}
                    textAlign={"center"}
                    h={"20%"}
                  >
                    {
                      data.categoriesPosts.nacional[3].title
                    }
                  </Heading>
                </Flex>

                <Flex
                  h={"full"}
                  w={"full"}
                  direction={"column"}
                >
                  <Flex
                    bgImage={data.categoriesPosts.nacional[4].img}
                    bgSize={"cover"}
                    borderRadius={"md"}
                    h={"80%"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                    alignItems={"flex-start"}
                    py={2}
                  >
                    <Text
                      px={5}
                      bg={"#bf3030"}
                      color={"white"}
                    >
                      {
                        data.categoriesPosts.nacional[4].category_name
                      }
                    </Text>
                  </Flex>
                  <Heading
                    size={"sm"}
                    color={"black"}
                    pt={5}
                    textAlign={"center"}
                  >
                    {data.categoriesPosts.nacional[4].title}
                  </Heading>
                </Flex>
              </Stack>

            </Stack>
          </>)
      }
    </LayoutSingle>
  )
}

export default Index