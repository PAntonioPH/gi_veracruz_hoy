import {LayoutSingle} from "@/components/Layout/LayoutSingle";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {LoadingPage} from "@/components/LoadingPage";
import {useRouter} from "next/router";

const Index = () => {
  const router = useRouter()
  const [data, setData] = useState({})
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
          </>)
      }
    </LayoutSingle>
  )
}

export default Index