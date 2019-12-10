import React from 'react';
import ArticleHeadline from './articleHeadline';
import { pillarColours, Pillar } from 'pillar';

export default { title: 'News' };

export const standard = () => <ArticleHeadline 
  headline="Headline" 
  feature={false}
  analysis={false}
  pillarStyles={pillarColours[Pillar.news]}
/>
