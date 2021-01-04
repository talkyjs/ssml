import { HandlerInput, getRequest, ResponseBuilder } from 'ask-sdk';
import { Request } from 'ask-sdk-model';
import { renderSSMLToString } from './render';
import { AlexaSpeechComponentProps, ProgressiveResponse } from './interfaces';

export class SpeechScriptJSX<T extends Request = Request> {
  /**
   * Props from Request
   */
  protected readonly props: AlexaSpeechComponentProps<T>;

  /**
   * ResponseBuilder class
   */
  protected readonly responseBuilder: ResponseBuilder;

  constructor(handlerInput: HandlerInput) {
    this.props = {
      ...handlerInput,
      ...handlerInput.requestEnvelope,
      request: getRequest<T>(handlerInput.requestEnvelope),
    };
    this.responseBuilder = handlerInput.responseBuilder;
  }

  /**
   * define progressive response text as JSX
   * @see https://developer.amazon.com/ja-JP/docs/alexa/custom-skills/send-the-user-a-progressive-response.html
   */
  public progressiveResponse(): JSX.Element | null {
    return null;
  }

  /**
   * Define speech text as JSX
   */
  public speech(): JSX.Element | null {
    return null;
  }

  /**
   * Define reporompt test as JSX
   */
  public reprompt(): JSX.Element | null {
    return null;
  }

  private createProgressiveResponse(): ProgressiveResponse | undefined {
    const progressiveRepsonse = this.progressiveResponse();
    if (!progressiveRepsonse) return undefined;
    const ssml = renderSSMLToString(progressiveRepsonse);
    return {
      ssml,
      directive: {
        header: {
          requestId: this.props.request.requestId,
        },
        directive: {
          type: 'VoicePlayer.Speak',
          speech: ssml,
        },
      },
    };
  }

  /**
   * Get speech text strings
   */
  public create() {
    const speech = this.speech();
    const reprompt = this.reprompt();
    return {
      speech: speech ? renderSSMLToString(speech) : undefined,
      reprompt: reprompt ? renderSSMLToString(reprompt) : undefined,
      progressiveRepsonse: this.createProgressiveResponse(),
    };
  }

  /**
   * Get responseBuilder with JSX Element
   */
  public createResponseBuilder() {
    const { speech, reprompt } = this.create();
    if (speech) this.responseBuilder.speak(speech);
    if (reprompt) this.responseBuilder.reprompt(reprompt);
    /**
     * @TODO Should call Progressive response API here
     */
    return this.responseBuilder;
  }

  /**
   * Get Response object from JSX elements
   */
  public createResponse() {
    return this.createResponseBuilder().getResponse();
  }
}

export class SpeechScriptJSXWithOption<
  U,
  T extends Request = Request
> extends SpeechScriptJSX<T> {
  /**
   * Additional props from handler
   */
  protected readonly options: Readonly<U>;

  constructor(handlerInput: HandlerInput, options: U) {
    super(handlerInput);
    this.options = options;
  }
}
