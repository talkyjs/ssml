import React from 'react';
import { renderSSMLToString } from './index'

describe('renderSSMLToString', () => {
  it.each([
    [(
      <speak>
        <p>hello</p>
      </speak>
    ), "<speak><p>hello</p></speak>"],
    [<amazon-domain name="music">Music</amazon-domain>, "<amazon:domain name=\"music\">Music</amazon:domain>"],
    [<amazon-effect name="whispered">aaaa</amazon-effect>,"<amazon:effect name=\"whispered\">aaaa</amazon:effect>"],
    [<amazon-emotion name="disappointed" intensity="high">aaaa</amazon-emotion>, "<amazon:emotion name=\"disappointed\" intensity=\"high\">aaaa</amazon:emotion>"],
    [(
      <speak>
        hello It's a great thing,
        and there is test. 
        <emphasis level="reduced">hello</emphasis>
        <w role="amazon:NN">aaaa</w>
    </speak>
    ), "<speak>hello It's a great thing, and there is test.<emphasis level=\"reduced\">hello</emphasis><w role=\"amazon:NN\">aaaa</w></speak>"]
  ])('ssml %p, should return %p', (ssml, renderedString) => {
    expect(renderSSMLToString(ssml)).toEqual(renderedString)
  })
});
