import { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
export const renderSSMLToString = (element: ReactElement): string => {
  const markup = renderToStaticMarkup(element);
  return markup
    .replace(/&#x27;/gi, "'")
    .replace(/\<amazon\-/gi, '<amazon:')
    .replace(/\<\/amazon\-/gi, '</amazon:');
};
