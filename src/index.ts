// eslint-disable-next-line
// @ts-expect-error
import React, { ReactElement } from 'react';
import { SSMLElementWithChildren } from './interfaces';
export * from './SpeechScript';
export * from './render';

namespace LocalJSX {
  /**
   * Fork from https://github.com/jubilee-works/ssml-tsx/blob/master/src/jsx.ts
   * @license MIT
   * @author Yusuke Fujiki <yusuke@fujikkys.com>
   */
  export interface IntrinsicElements {
    // https://developer.amazon.com/ja-JP/docs/alexa/custom-skills/speech-synthesis-markup-language-ssml-reference.html
    // https://developer.amazon.com/en-US/blogs/alexa/alexa-skills-kit/2021/01/new-fun-speaking-style-for-japan
    'amazon-domain': SSMLElementWithChildren<{
      name: 'music' | 'news' | 'conversational' | 'long-form' | 'fun';
    }>;

    'amazon-effect': SSMLElementWithChildren<{
      name: 'whispered';
    }>;

    'amazon-emotion': SSMLElementWithChildren<{
      name: 'excited' | 'disappointed';
      intensity: 'low' | 'medium' | 'high';
    }>;

    break: SSMLElementWithChildren<{
      strength?: 'none' | 'x-weak' | 'weak' | 'medium' | 'strong' | 'x-strong';
      time?: string;
    }>;

    emphasis: SSMLElementWithChildren<{
      level?: 'strong' | 'moderate' | 'reduced';
    }>;

    lang: SSMLElementWithChildren<{
      'xml:lang': string;
    }>;

    phoneme: SSMLElementWithChildren<{
      alphabet: 'ipa' | 'x-sampa' | 'ruby' | 'x-amazon-pron-kana';
      ph: string;
    }>;

    prosody: SSMLElementWithChildren<{
      rate?: 'x-slow' | 'slow' | 'medium' | 'fast' | 'x-fast' | string;
      pitch?: 'x-low' | 'low' | 'medium' | 'high' | 'x-high' | string;
      volume?:
        | 'silent'
        | 'x-soft'
        | 'soft'
        | 'medium'
        | 'loud'
        | 'x-loud'
        | string;
    }>;

    'say-as': SSMLElementWithChildren<{
      'interpret-as':
        | 'characters'
        | 'spell-out'
        | 'cardinal'
        | 'number'
        | 'ordinal'
        | 'digits'
        | 'fraction'
        | 'unit'
        | 'date'
        | 'time'
        | 'telephone'
        | 'address'
        | 'interjection'
        | 'expletive';

      format?:
        | 'mdy'
        | 'dmy'
        | 'ymd'
        | 'md'
        | 'dm'
        | 'ym'
        | 'my'
        | 'd'
        | 'm'
        | 'y';
    }>;
    voice: SSMLElementWithChildren<{
      name: string;
    }>;

    w: SSMLElementWithChildren<{
      role: 'amazon:VB' | 'amazon:VBD' | 'amazon:NN' | 'amazon:SENSE_1';
    }>;
    speak: Omit<SSMLElementWithChildren<unknown>, 'key'>;

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
      'amazon-domain': LocalJSX.IntrinsicElements['amazon-domain'];
      'amazon-effect': LocalJSX.IntrinsicElements['amazon-effect'];
      'amazon-emotion': LocalJSX.IntrinsicElements['amazon-emotion'];
      break: LocalJSX.IntrinsicElements['break'];
      emphasis: LocalJSX.IntrinsicElements['emphasis'];
      lang: LocalJSX.IntrinsicElements['lang'];
      phoneme: LocalJSX.IntrinsicElements['phoneme'];
      prosody: LocalJSX.IntrinsicElements['prosody'];
      'say-as': LocalJSX.IntrinsicElements['say-as'];
      voice: LocalJSX.IntrinsicElements['voice'];
      w: LocalJSX.IntrinsicElements['w'];
      speak: LocalJSX.IntrinsicElements['speak'];
    }
  }
}

export { LocalJSX as JSX };
