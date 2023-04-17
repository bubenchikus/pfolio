import React from 'react';
import Container from '@mui/material/Container';
import universalStyles from './UniversalStyles.module.scss'

export const JournalPostTemplate = ({postData}) => {

  return (
    <>
   <Container>
        <div className={universalStyles.blockContainer}>
            <div className={universalStyles.blockTitle}>{postData?.title}</div>
            <div className={universalStyles.blockText}>{postData?.txt}</div>
        </div>
   </Container>
   </>
  )
};