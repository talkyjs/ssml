import React from 'react'
import { HandlerInputCreator } from '@ask-utils/test';
import {
    SpeechScriptJSX
} from './SpeechScript'
import { SpeechScriptJSXWithOption } from '.';

class LaunchRequestScript extends SpeechScriptJSX {
    speech() {
        return (
            <speak>
                <p>Hello! It's a nice development. How are you?</p>
            </speak>
        )
    }
    
    reprompt() {
        return (
            <speak>
                <p>How are you?</p>
            </speak>
        )
    }
    progressiveResponse() {
        return (
            <speak>
                <p>Hello! Hello!!</p>
            </speak>
        )
    }  
}
class ScriptWithOptions extends SpeechScriptJSXWithOption<{
    username: string;
    launchCount: number;
}> {
    speech() {
        const {
            username,
            launchCount,
        } = this.options
        return (
            <speak>
                <p>Hello {username}-san. You launch it by {launchCount} times. How are you?</p>
            </speak>
        )
    }
}

describe('SpeechScriptJSXWithOption', () => {
    const handlerInput = new HandlerInputCreator().createIntentRequest({
        name: "LaunchRequest",
        confirmationStatus: 'NONE'
    });
    const speechScript = new ScriptWithOptions(handlerInput, {
        username: 'John',
        launchCount: 5
    })
    it('should include the option', () => {
        expect(speechScript.createResponse()).toEqual({
            outputSpeech: {
                ssml: "<speak><p>Hello John-san. You launch it by 5 times. How are you?</p></speak>",
                type: 'SSML'
            },
        })
    })
})
describe('SpeechScript', () => {
    describe('create', () => {
        const handlerInput = new HandlerInputCreator().createIntentRequest({
            name: "LaunchRequest",
            confirmationStatus: 'NONE'
        });
        const speechScript = new LaunchRequestScript(handlerInput)
        const response = speechScript.create()
        it('should return stringify speech ssml', () => {
            expect(response).toMatchObject({
                speech:"<speak><p>Hello! It's a nice development. How are you?</p></speak>"
            })
        })
        it('should return stringify reprompt ssml', () => {
            expect(response).toMatchObject({
                reprompt:"<speak><p>How are you?</p></speak>"
            })
        })
        it('should return stringify progressiveRepsonse ssml', () => {
            expect(response.progressiveRepsonse).toMatchObject({
                "ssml": "<speak><p>Hello! Hello!!</p></speak>",
                "directive": {
                  "header": {
                    "requestId": expect.any(String)
                  },
                  "directive": {
                    "type": "VoicePlayer.Speak",
                    "speech": "<speak><p>Hello! Hello!!</p></speak>"
                  }
                }
              })
        })
    })
    describe('createResponseBuilder()', () => {
        const handlerInput = new HandlerInputCreator().createIntentRequest({
            name: "LaunchRequest",
            confirmationStatus: 'NONE'
        });
        const responseBuilder = new LaunchRequestScript(handlerInput).createResponseBuilder()
        it('should return expected response', () => {
            expect(responseBuilder.getResponse()).toMatchObject({
                outputSpeech: {
                    ssml: "<speak><p>Hello! It's a nice development. How are you?</p></speak>",
                    type: 'SSML'
                },
                reprompt: {
                    outputSpeech: {
                        ssml: "<speak><p>How are you?</p></speak>",
                        type: 'SSML'
                    }
                },
                shouldEndSession: false,
            })
        })
    })
    describe('createResponse()', () => {
        const handlerInput = new HandlerInputCreator().createIntentRequest({
            name: "LaunchRequest",
            confirmationStatus: 'NONE'
        });
        const response = new LaunchRequestScript(handlerInput).createResponse()
        it('should return expected response', () => {
            expect(response).toMatchObject({
                outputSpeech: {
                    ssml: "<speak><p>Hello! It's a nice development. How are you?</p></speak>",
                    type: 'SSML'
                },
                reprompt: {
                    outputSpeech: {
                        ssml: "<speak><p>How are you?</p></speak>",
                        type: 'SSML'
                    }
                },
                shouldEndSession: false,
            })
        })
    })
})