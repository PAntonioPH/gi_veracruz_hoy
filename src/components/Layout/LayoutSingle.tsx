import {Flex, FlexProps} from '@chakra-ui/react'
import {Placeholder} from './Placeholder'
import {Navbar} from "@/components/Layout/Navbar";
import {Footer} from "@/components/Layout/Footer";
import Head from "next/head";
import {AnnouncementsRight} from "@/components/Layout/AnnouncementsRight";
import {useEffect} from "react";
import axios from "axios";

interface Props extends FlexProps {
  title: string;
}

export const LayoutSingle = (props: Props) => {
  const {children, title} = props

  useEffect(() => {
    axios.post("/api/v1/visits", {}, {headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}}).then()
  }, [])

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/assets/icons/favicon.ico"/>

        <meta property="og:title" content="Veracruz Hoy"/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://veracruzhoy.com.mx"/>
        <meta property="og:image" content="https://veracruzhoy.com.mx/assets/icons/logoMeta.jpg"/>
        <meta property="og:image/png" content="https://veracruzhoy.com.mx/assets/icons/logo.png"/>

        <meta property="twitter:title" content="Veracruz Hoy"/>
        <meta property="twitter:site" content="https://veracruzhoy.com.mx"/>
        <meta property="twitter:image" content="https://veracruzhoy.com.mx/assets/icons/logo.png"/>
      </Head>

      <Flex direction="column" flex="1">
        <Navbar/>

        <Flex
          direction={{base: "column", md: "row"}}
        >
          <Flex
            as="main"
            role="main"
            direction="column"
            flex="1"
            w={{base: "100%", md: "70%"}}
            mx={{base:0, md:"40"}}
            {...props}
          >
            <Placeholder bg="bg-accent">
              {children}
            </Placeholder>
          </Flex>
        </Flex>
        <Footer/>
      </Flex>
    </>
  )
}


