import {LayoutSingle} from "@/components/Layout/LayoutSingle";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {LoadingPage} from "@/components/LoadingPage";
import {useRouter} from "next/router";
import {Slider} from "@/components/Slider";
import {Flex, Stack, Text, Heading, Box} from "@chakra-ui/react";
import {Category} from "@/components/Home/Category";

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
  news: PropsPost[]
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
    lastPosts: [],
    news: []
  })
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/v1/home', {headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}})
      .then(res => {
        setData(res.data.response)
      })
      .finally(() => setIsLoading(false))
  }, [])

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

            <Category
              posts={data.categoriesPosts.estado}
              name={"Estado"}
            />

            <Category
              posts={data.categoriesPosts.deportes}
              name={"Deportes"}
            />

            <Category
              posts={data.categoriesPosts.espectaculos}
              name={"Espectáculos"}
            />

            <Category
              posts={data.categoriesPosts.nacional}
              name={"Nacional"}
            />

            <Category
              posts={data.categoriesPosts.internacional}
              name={"Internacional"}
            />

            <Flex
              direction={"column"}
              mt={"10"}
            >
              <Box
                bg={"#333946"}
                w={"full"}
                mb={5}
              >
                <Heading
                  p={2}
                  w={"fit-content"}
                  bg={"#d13030"}
                  size={"sm"}
                  color={"white"}
                >
                  NO TE PIERDAS...
                </Heading>
              </Box>

              <Stack
                spacing={5}
                p={2}
                direction={{md: "row", base: "column"}}
                bg={"#333946"}
              >
                {
                  data.news.map(({id, title, img, category_name, category}) => (
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
                      cursor={"pointer"}
                      onClick={() => router.push(`/category/${category}/post/${id}`)}
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
                      <Heading
                        size={"sm"}
                        color={"white"}
                        textAlign={"center"}
                        ml={5}
                        pt={5}
                      >
                        {
                          title
                        }
                      </Heading>
                    </Flex>
                  ))
                }
              </Stack>
            </Flex>
          </>)
      }
    </LayoutSingle>
  )
}

export default Index