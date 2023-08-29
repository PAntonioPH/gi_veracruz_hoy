import {useRouter} from "next/router";
import {LayoutSingle} from "@/components/Layout/LayoutSingle";
import {Button, Card, CardBody, CardFooter, Heading, SimpleGrid, Stack, Image} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import axios from "axios";
import {Post} from "@/interfaces/Post";
import {LoadingPage} from "@/components/LoadingPage";

const Category = () => {
  const router = useRouter()
  const [data, setData] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const {category} = router.query

  useEffect(() => {
    if (!category) return;

    setData([])
    axios.get(`/api/v1/posts?category=${category}&post_type=1`, {headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}})
      .then((res) => {
        if (res.data.response.length > 0) setData(res.data.response.sort((a: Post, b: Post) => b.id - a.id))
      })
      .finally(() => setLoading(false))
  }, [category]);

  const handleClick = async (id: number) => await router.push(`/category/${category}/post/${id}`)

  return (
    <LayoutSingle title={typeof category === "string" ? `${category[0].toUpperCase()}${category.slice(1, category.length)}` : "category"}>
      {
        loading
          ? (<LoadingPage/>)
          : (<SimpleGrid
            spacing={10}
            columns={{base: 1, md: 2}}
          >
            {
              data.map(({id, title, img}) => (
                <Card
                  key={id}
                  direction={{base: 'column', sm: 'row'}}
                  overflow='hidden'
                  variant='outline'
                >
                  <Image
                    objectFit='cover'
                    h={"200px"}
                    w={"280px"}
                    src={img && img != "" ? img : '/assets/images/placeholderImg.jpg'}
                    alt='Imagen'
                  />

                  <Stack>
                    <CardBody>
                      <Heading size='md'>{title}</Heading>
                    </CardBody>

                    <CardFooter>
                      <Button
                        variant='link'
                        colorScheme='red'
                        onClick={() => handleClick(id)}
                      >
                        Leer mas...
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
              ))
            }
          </SimpleGrid>)
      }
    </LayoutSingle>
  )
}

export default Category;