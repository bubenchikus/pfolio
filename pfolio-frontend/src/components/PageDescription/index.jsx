import React from 'react';
import Container from '@mui/material/Container';
import universalStyles from '../UniversalStyles.module.scss'

export const PageDescription = ({descriptionData}) => {

  var description;
  if (descriptionData?.length > 0){description = descriptionData[0].txt}
  else {description = ""}

  return (
    <>
   <Container>
    <div className={universalStyles.pageDescription}>{description}</div>
   </Container>
   </>
  )
};