import {Button, Box} from "@chakra-ui/react";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons";

export const FloatingSocialMedia = () => {
  return (
    <>
      <Button
        onClick={() => window.open('https://www.facebook.com/profile.php?id=100095189781749')}
        colorScheme="facebook"
        size="sm"
        mb={2}
        leftIcon={<FontAwesomeIcon icon={faFacebook}/>}
      >
        Veracruz Hoy
      </Button>
      <Button
        onClick={() => window.open('https://twitter.com/VeracruzHoy_Mx')}
        colorScheme="twitter"
        size="sm"
        mb={2}
        leftIcon={<FontAwesomeIcon icon={faTwitter}/>}
      >
        @VeracruzHoy_Mx
      </Button>
      <Button
        onClick={() => window.open('https://www.instagram.com/veracruzhoyn/')}
        bg="#702459"
        _hover={{
          bg: '#702459'
        }}
        color={'white'}
        size="sm"
        mb={2}
        leftIcon={<FontAwesomeIcon icon={faInstagram}/>}
      >

        veracruzhoyn
      </Button>
    </>
  )
}