import { ReactElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
export const renderSSMLToString = (element: ReactElement): string => {
    const markup = renderToStaticMarkup(element)
    return markup
        .replace(/&#x27;/ig, "'")
        .replace(/\<amazon\-/ig, '<amazon:')
        .replace(/\<\/amazon\-/ig, '</amazon:')
  }