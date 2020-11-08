# @talkyjs/ssml
## SSML helper for JSX / TSX

Simply helper with SSML markup in JSX/TSX.
It's compatible for 

## Setup

```
$ npm install -S @talkyjs/ssml react react-dom

# (Optional) with ask-sdk-jsx-for-apl
$ npm install -S ask-sdk-jsx-for-apl

# (Optional) with TypeScript
$ npm install -D @types/react @types/react-dom
```

### (Optional) update tsconfig.json

We need to update these attributes like this.

```json
...
    "jsx": "react",
    "esModuleInterop": true,
...
```

## Markup with JSX/TSX

### SSML (Use this!)

```jsx
import React from 'react'
import '@talkyjs/ssml'

export const LaunchRequestSpeech = () => {
    return (
        <speak>
            hello It's a great thing,
            and there is test. 
            <emphasis level="reduced">hello</emphasis>
            <w role="amazon:NN">aaaa</w>
            <amazon-domain name="music">Music</amazon-domain>
            <amazon-effect name="whispered">aaaa</amazon-effect>
            <amazon-emotion name="disappointed" intensity="high">aaaa</amazon-emotion>
        </speak>
    )
}
```

### APL (Use ask-sdk-jsx-for-apl)

```jsx
import React from 'react';
import { APL, MainTemplate, Container, Text, AplDocument } from 'ask-sdk-jsx-for-apl';

export const LaunchAplDocumentFC = () => {
    const launchMessage = 'Welcome to my first JSX for APL skill!';
    return (
        <APL theme="dark">
            <MainTemplate>
                <Container
                    alignItems="center"
                    justifyContent="spaceAround">
                    <Text
                        text={launchMessage}
                        fontSize="50px"
                        color="rgb(251,184,41)" />
                </Container>
            </MainTemplate>
        </APL>
    );
}
```

### Request Handler


```jsx
import React from 'react'
import { renderSSMLToString } from "@talkyjs/ssml";
import { AplDocument } from "ask-sdk-jsx-for-apl";

import { LaunchAplDocumentFC } from "./apl";
import { LaunchRequestSpeech } from "./ssml";

export const LaunchRequestHandler = {
    canHandle(input) {
        return input.requestEnvelope.request.type === 'LaunchRequest'
    },
    async handle(input) {
        return input.responseBuilder
            .speak(
                renderSSMLToString(
                    <LaunchRequestSpeech />
                )
            )
            .addDirective(
                new AplDocument(
                    <LaunchAplDocumentFC />
                ).getDirective()
            )
            .getResponse()
    }
}
```

### Result

```json
{
  "directives": [
    {
      "document": {
        "mainTemplate": {
          "items": [
            {
              "alignItems": "center",
              "items": [
                {
                  "color": "rgb(251,184,41)",
                  "fontSize": "50px",
                  "text": "Welcome to my first JSX for APL skill!",
                  "type": "Text"
                }
              ],
              "justifyContent": "spaceAround",
              "type": "Container"
            }
          ],
          "parameters": []
        },
        "theme": "dark",
        "type": "APL",
        "version": "1.4"
      },
      "type": "Alexa.Presentation.APL.RenderDocument"
    }
  ],
  "outputSpeech": {
    "ssml": "<speak>hello It's a great thing, and there is test.<emphasis level=\"reduced\">hello</emphasis><w role=\"amazon:NN\">aaaa</w><amazon:domain name=\"music\">Music</amazon:domain><amazon:effect name=\"whispered\">aaaa</amazon:effect><amazon:emotion name=\"disappointed\" intensity=\"high\">aaaa</amazon:emotion></speak>",
    "type": "SSML"
  }
}
```

## Known issue

- [ ] Several tag are almost same as HTML
  - `sub` / `p` / `audio` / `s`
- [ ] I don't know is the type declaration style better...

## License

MIT

## Credits

### [ssml-tsx](https://github.com/jubilee-works/ssml-tsx)
Forked the type definitions for SSML from it.

- Code: https://github.com/jubilee-works/ssml-tsx/blob/master/src/jsx.ts
- License MIT
- Author Yusuke Fujiki