import {LayoutSingle} from "@/components/Layout/LayoutSingle";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {LoadingPage} from "@/components/LoadingPage";
import {useRouter} from "next/router";
import {Slider} from "@/components/Slider";
import {Flex, Stack, Text, Heading, Center, Box, Button} from "@chakra-ui/react";
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
          </>)
      }
    </LayoutSingle>
  )
}

export default Index