// eslint-disable-next-line
// @ts-expect-error
import React, { FC, ReactElement } from 'react'
import { Request, Session, Context, services } from 'ask-sdk-model'
import { AttributesManager } from 'ask-sdk'

export type SSMLElement<P> = P & {
  key?: string;
}
export type SSMLChildren = string | SSMLElement<any> | Array<SSMLElement<any> | string>
export type SSMLElementWithChildren<P> = SSMLElement<P> & {
  children: SSMLChildren
}
export type SSMLFC<Props = undefined> = FC<SSMLElementWithChildren<Props>>

export interface ProgressiveResponse {
    ssml: string;
    directive: services.directive.SendDirectiveRequest;
}
export interface SpeechScriptResponse {
    speech?: string;
    reprompt?: string;
    progressiveResponse?: ProgressiveResponse;
}

export interface AlexaSpeechComponentProps<T extends Request = Request, U = unknown> {
    request: T;
    attributesManager: AttributesManager;
    session?: Session;
    context: Context;
    options?: U;
}
export type AlexaSpeechComponent<T extends Request = Request, U = unknown> = FC<AlexaSpeechComponentProps<T, U>> | null
export type AlexaSpeechComponentFunction<T extends Request = Request, U = unknown> = (props: AlexaSpeechComponentProps<T, U>) => FC | JSX.Element | JSX.Element[]

