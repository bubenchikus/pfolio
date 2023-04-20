import React from 'react';
import Container from '@mui/material/Container';
import universalStyles from './UniversalStyles.module.scss'

export const PageDescription = ({descriptionData}) => {
  
  return (
    <>
    <Container>
    <div className={universalStyles.pageDescription}>
      {(descriptionData?.length > 0 && descriptionData[0].txt?.length > 0) ? descriptionData[0].txt : "Description isn't added yet..."}
      </div>
    </Container>
   </>
  )
};