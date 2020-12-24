// eslint-disable-next-line
// @ts-expect-error
import React, { ReactElement } from 'react'
import { renderToStaticMarkup } from "react-dom/server"
export * from './SpeechScript'

namespace LocalJSX {
  export type SSMLElement<P> = P & {
      key?: string;
  }
  export type SSMLChildren = string | SSMLElement<any> | Array<SSMLElement<any> | string>
  export type SSMLElementWithChildren<P> = SSMLElement<P> & {
      children: SSMLChildren
  }
  /**
   * Fork from https://github.com/jubilee-works/ssml-tsx/blob/master/src/jsx.ts
   * @license MIT
   * @author Yusuke Fujiki <yusuke@fujikkys.com>
   */
  export interface IntrinsicElements {
      // https://developer.amazon.com/ja-JP/docs/alexa/custom-skills/speech-synthesis-markup-language-ssml-reference.html
      "amazon-domain": SSMLElementWithChildren<{
        name: "music" | "news" | "conversational" | "long-form";
      }>;

      "amazon-effect": SSMLElementWithChildren<{
        name: "whispered";
      }>;

      "amazon-emotion": SSMLElementWithChildren<{
        name: "excited" | "disappointed";
        intensity: "low" | "medium" | "high";
      }>;

      break: SSMLElementWithChildren<{
        strength?:
          | "none"
          | "x-weak"
          | "weak"
          | "medium"
          | "strong"
          | "x-strong";
        time?: string;
      }>;

      emphasis: SSMLElementWithChildren<{
        level?: "strong" | "moderate" | "reduced";
      }>;

      lang: SSMLElementWithChildren<{
        "xml:lang": string;
      }>;


      phoneme: SSMLElementWithChildren<{
        alphabet: "ipa" | "x-sampa";
        ph: string;
      }>;

      prosody: SSMLElementWithChildren<{
        rate?: "x-slow" | "slow" | "medium" | "fast" | "x-fast" | string;
        pitch?: "x-low" | "low" | "medium" | "high" | "x-high" | string;
        volume?:
          | "silent"
          | "x-soft"
          | "soft"
          | "medium"
          | "loud"
          | "x-loud"
          | string;
      }>;


      "say-as": SSMLElementWithChildren<{
        "interpret-as":
          | "characters"
          | "spell-out"
          | "cardinal"
          | "number"
          | "ordinal"
          | "digits"
          | "fraction"
          | "unit"
          | "date"
          | "time"
          | "telephone"
          | "address"
          | "interjection"
          | "expletive";

        format?:
          | "mdy"
          | "dmy"
          | "ymd"
          | "md"
          | "dm"
          | "ym"
          | "my"
          | "d"
          | "m"
          | "y";
      }>;
      voice: SSMLElementWithChildren<{
        name: string;
      }>;

      w: SSMLElementWithChildren<{
        role: "amazon:VB" | "amazon:VBD" | "amazon:NN" | "amazon:SENSE_1";
      }>;
    speak: Omit<SSMLElementWithChildren<unknown>, 'key'>

    /*
     * @Note: These elements are already declared by React
     *
     * sub: SSMLElementWithChildren<{
     *   alias: string;
     * }>;
     * p: SSMLElementWithChildren<unknown>;
     * audio: SSMLElementWithChildren<{
     *   src: string;
     * }>;
     * s: SSMLElementWithChildren<unknown>;
     */
  }
}

declare global {
  namespace JSX {
    export interface IntrinsicElements {
      "amazon-domain": LocalJSX.IntrinsicElements['amazon-domain'];
      "amazon-effect": LocalJSX.IntrinsicElements['amazon-effect'];
      "amazon-emotion": LocalJSX.IntrinsicElements['amazon-emotion'];
      break: LocalJSX.IntrinsicElements['break'];
      emphasis: LocalJSX.IntrinsicElements['emphasis'];
      lang: LocalJSX.IntrinsicElements['lang'];
      phoneme: LocalJSX.IntrinsicElements['phoneme'];
      prosody: LocalJSX.IntrinsicElements['prosody'];
      "say-as":LocalJSX.IntrinsicElements['say-as'];
      voice: LocalJSX.IntrinsicElements['voice'];
      w:LocalJSX.IntrinsicElements['w'];
     speak: LocalJSX.IntrinsicElements['speak'];
    }
  }
}

export {LocalJSX as JSX}

export const renderSSMLToString = (element: ReactElement): string => {
  const markup = renderToStaticMarkup(element)
  return markup
      .replace(/&#x27;/ig, "'")
      .replace(/\<amazon\-/ig, '<amazon:')
      .replace(/\<\/amazon\-/ig, '</amazon:')
}