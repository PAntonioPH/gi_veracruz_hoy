import {useRouter} from "next/router";
import {LayoutSingle} from "@/components/Layout/LayoutSingle";
import {Text, Heading, SimpleGrid, Image, Box, Flex, Button, Center, HStack} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Post} from "@/interfaces/Post";
import {LoadingPage} from "@/components/LoadingPage";
import {Pagination} from "@/components/Pagination";
import moment from "moment";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator,} from '@chakra-ui/react'


const Category = () => {
  const router = useRouter()
  const [data, setData] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const {category} = router.query

  useEffect(() => {
    if (!category) return;

    setData([])
    axios.get(`/api/v1/posts?category=${category}&post_type=1&page=${currentPage}`, {headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}})
      .then((res) => {
        if (res.data.response.posts.length > 0) setData(res.data.response.posts.sort((a: Post, b: Post) => b.id - a.id))
        setTotalPages(res.data.response.total)
        console.log(res.data.response)
      })
      .finally(() => setLoading(false))
  }, [category, currentPage]);

  const handleClick = async (id: number) => await router.push(`/category/${category}/post/${id}`)

  return (
    <LayoutSingle
      title={typeof category === "string" ? `${category[0].toUpperCase()}${category.slice(1, category.length)}` : "category"}>
      {
        loading
          ? (<LoadingPage/>)
          : (<Box>
            <HStack>
              <Box
                w={"18%"}
                mb={5}
                mr={5}
              >
                <Heading
                  textTransform={"capitalize"}
                  bg={"#d13030"}
                  color={"white"}
                  size={"lg"}
                >
                  {
                    category
                  }
                </Heading>
              </Box>
              <Box>
                <Breadcrumb
                  separator={'>'}
                  color={"#aaaabd"}
                >
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href={'/'}
                      color={"#aaaabd"}
                    >
                      Inicio
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      textTransform={"capitalize"}
                      _hover={{
                        textDecoration: "none",
                        cursor: "default"
                      }}
                      color={"#aaaabd"}
                    >
                      Category: {category}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
              </Box>
            </HStack>

            <SimpleGrid
              spacing={10}
              columns={{base: 1, md: 2}}
            >
              {
                data.map(({id, title, img, date_update, content, category}) => (
                  <Flex
                    key={id}
                    onClick={() => handleClick(id)}
                    direction={"column"}
                    cursor={"pointer"}
                    bg={"white"}
                    borderRadius={"md"}
                    justifyContent={"space-between"}
                    pb={5}
                    borderBottom={"3px solid black"}
                  >
                    <Flex
                      direction={"column"}
                      bgImage={img}
                      bgSize={"cover"}
                      h={"200px"}
                      flexDirection={"column"}
                      justifyContent={"space-between"}
                      alignItems={"flex-start"}
                    >
                      <Text
                        px={5}
                        bg={"#d13030"}
                        color={"white"}
                      >
                        {
                          category
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
                        boxShadow={"lg"}
                      >
                        <Heading
                          size={"sm"}
                          color={"black"}
                          m={5}
                          textAlign={"center"}
                        >
                          {title}
                        </Heading>
                        <Text
                          mb={5}
                          as={"em"}
                          color={"#aaaaaa"}
                        >
                          {moment(date_update.split("T")[0]).format("MMMM D YYYY")}
                        </Text>
                        <Text
                          pb={5}
                        >
                          {
                            content.slice(0, 110)
                          }
                          {
                            content.length > 111
                            && "..."
                          }
                        </Text>
                      </Box>
                    </Center>
                    <Center>
                      <Button
                        variant={"outline"}
                        _hover={{
                          bg: "#d13030"
                        }}
                        boxShadow={"lg"}
                      >
                        Leer más
                      </Button>
                    </Center>

                    {/*<Flex*/}
                    {/*  direction={"column"}*/}
                    {/*  alignItems={"center"}*/}
                    {/*>*/}
                    {/*  <Heading*/}
                    {/*    size={"md"}*/}
                    {/*    pb={2}*/}
                    {/*    mt={2}*/}
                    {/*    mx={2}*/}
                    {/*  >*/}
                    {/*    {*/}
                    {/*      title.slice(0, 70)*/}
                    {/*    }*/}
                    {/*    {*/}
                    {/*      title.length > 70*/}
                    {/*      && "..."*/}
                    {/*    }*/}
                    {/*  </Heading>*/}
                    {/*  <Text*/}
                    {/*    pb={5}*/}
                    {/*    as={"em"}*/}
                    {/*  >*/}
                    {/*    {moment(date_update.split("T")[0]).format("DD/MM/YYYY")}*/}
                    {/*  </Text>*/}
                    {/*  <Image*/}
                    {/*    objectFit='cover'*/}
                    {/*    h={"300px"}*/}
                    {/*    w={"300px"}*/}
                    {/*    src={img && img != "" ? img : '/assets/images/placeholderImg.jpg'}*/}
                    {/*    alt='Imagen'*/}
                    {/*  />*/}
                    {/*  <Text*/}
                    {/*    px={5}*/}
                    {/*    py={5}*/}
                    {/*    textAlign={"justify"}*/}
                    {/*  >*/}
                    {/*    {*/}
                    {/*      content.slice(0, 130)*/}
                    {/*    }*/}
                    {/*    {*/}
                    {/*      content.length > 131*/}
                    {/*      && "..."*/}
                    {/*    }*/}
                    {/*  </Text>*/}
                    {/*  <Button*/}
                    {/*    variant={"outline"}*/}
                    {/*    colorScheme={"gray"}*/}
                    {/*    mb={5}*/}
                    {/*  >*/}
                    {/*    Leer más*/}
                    {/*  </Button>*/}
                    {/*</Flex>*/}

                  </Flex>
                ))
              }
            </SimpleGrid>
            {
              totalPages > 0
                ? (<Pagination
                  total={totalPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />)
                : (<Flex
                  direction={"column"}
                  alignItems={"center"}
                >
                  <Heading>
                    Aún no hay publicaciones en esta categoría
                  </Heading>
                  <Image
                    mt={5}
                    src={"/assets/images/placeholderImg.jpg"}
                    alt={"404"}
                    w={"50%"}
                  />
                </Flex>)
            }
          </Box>)
      }
    </LayoutSingle>
  )
}

export default Category;