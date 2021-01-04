import React from 'react';
import { SSMLFC } from '../interfaces';

export const MusicDomain: SSMLFC = ({ children }) => {
  return <AmazonDomain name="music" children={children} />;
};
export const NewsDomain: SSMLFC = ({ children }) => {
  return <AmazonDomain name="news" children={children} />;
};
export const ConversationalDomain: SSMLFC = ({ children }) => {
  return <AmazonDomain name="conversational" children={children} />;
};
export const LongFormDomain: SSMLFC = props => {
  return <AmazonDomain name="long-form" {...props} />;
};
export const AmazonDomain: SSMLFC<{
  name: 'music' | 'news' | 'conversational' | 'long-form';
}> = ({ name, children }) => {
  return <amazon-domain name={name}>{children}</amazon-domain>;
};
