import React from 'react';
import {GalleryTemplate} from '../components/GalleryTemplate';
import { PageTitle } from '../components/PageTitle';

export const Comics = () => {

  return (
  <>
  <PageTitle pageTitle="Comics materials"/>
  <GalleryTemplate  url="art/comics" />
  </>
  );

};