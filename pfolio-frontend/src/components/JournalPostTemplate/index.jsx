import React from 'react';
import Container from '@mui/material/Container';
import styles from './JournalPostTemplate.module.scss';

export const JournalPostTemplate = ({postData}) => {

  console.log(postData);
  return (
    <>
   <Container maxWidth="lg" style={{
    "margin-bottom":"30px", 
    'border':'black 2px solid', 
    'border-left':'black 4px solid',
    'box-sizing': 'border-box',
    'background-color':'rgba(90,90,90,.5)',
    'min-height': '90px'
    }}>
        <div className={styles.title}>{postData?.title}</div>
        <div>{postData?.txt}</div>
   </Container>
   </>
  )
};