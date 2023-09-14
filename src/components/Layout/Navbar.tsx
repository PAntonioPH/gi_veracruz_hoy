import {Box, Flex, HStack, IconButton, SimpleGrid, Image, useBreakpointValue, useDisclosure} from '@chakra-ui/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {useRouter} from 'next/router';
import axios from 'axios';
import {NavbarMobile} from '@/components/Layout/NavbarMobile';
import React, {useEffect, useState} from 'react';
import {Category} from '@/interfaces/Category';
import {NavbarItem} from '@/components/Layout/NavbarItem';
import Bubble from '@/components/Bubble';
import {grupoHoy} from "@/data/grupoHoy";

export const Navbar = () => {
  const router = useRouter();
  const isDesktop = useBreakpointValue({base: false, lg: true});
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [pages, setPages] = useState<Category[]>([]);

  const handleClickNav = async (url: string) => {
    if (url.includes('http')) {
      window.open(url.replace(/^\/+/g, ''), '_blank');
    } else {
      await router.push(url === '/' ? '/' : `/category${url}`);
    }
  }

  useEffect(() => {
    axios
      .get('/api/v1/categories', {
        params: {navbar: true},
        headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`},
      })
      .then((res) => {
        if (res.data.response.length > 0) setPages([...res.data.response, grupoHoy]);
      });
  }, []);

  return (
    <>
      <Box as='section'>
        <Box
          as='nav'
          bg='bg-surface'
          boxShadow='sm'
        >
          <Image
            src='/assets/icons/portada.jpg'
            alt='Portada'
            w={'full'}
            h={'200px'}
            onClick={() => router.push('/')}
            cursor={'pointer'}
          />
          <HStack
            spacing='10'
            justify='space-between'
            bg={'#19232d'}
            color={'white'}
          >
            {isDesktop ? (
              <Flex
                justifyContent={'center'}
                flex='1'
                alignItems='center'
              >
                <SimpleGrid
                  columns={pages.length}
                  spacing={5}
                >
                  {pages.map((page, index) => (
                    <NavbarItem
                      key={index}
                      category={page}
                      handleClickNav={handleClickNav}
                    />
                  ))}
                </SimpleGrid>
              </Flex>
            ) : (
              <IconButton
                variant='ghost'
                icon={<FontAwesomeIcon icon={faBars}/>}
                aria-label='Open Menu'
                onClick={onOpen}
              />
            )}
            <Bubble/>
          </HStack>
        </Box>
      </Box>
      <NavbarMobile
        isOpen={isOpen}
        onClose={onClose}
        handleClickNav={handleClickNav}
        pages={pages}
      />
    </>
  );
};
