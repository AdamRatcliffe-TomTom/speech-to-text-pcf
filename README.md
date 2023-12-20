# A speech to text component for Power Apps

A speech to text component that uses the browser's [SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) API.

> [!IMPORTANT]
>  Turning off "Scale to fit" in your app settings is recommended for this component.

## Development

1. Install [yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable) if needed.
2. From the project root directory run `yarn` to install project dependencies.
3. Run `yarn start:watch` to run component in a local sandbox.

## Component Properties

Available component properties:

| Name                      | Type                                                                                                                   | Usage | Default value            | Description                                                                                                                                                                                                                                             |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| language                  | `SingleLine.Text`                                                                                                      | input | `lang` or `navigator.language`     | Sets the language used for speech recognition. If not specified, this defaults to the HTML [lang](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html#lang) attribute value, or the user agent's language setting if that isn't set either.                          |
| startRecordingText       | `SingleLine.Text` | input | "Start recording" | Text used for the record button label when recording has not been started. |
| stopRecordingText       | `SingleLine.Text` | input | "Stop recording" | Text used for the record button label when recording is in progress. |
| confirmText       | `SingleLine.Text` | input | "Confirm" | Text used for the confirm button label. |
| clearText       | `SingleLine.Text` | input | "Clear" | Text used for the clear button label. |
| showCloseButton       | `TwoOptions` | input | `true` | When `true` the close button is shown. |
| name       | `SingleLine.Text` | output | | The name of the event when the `OnChange` event is fired by the component. Either "OnChange" or "OnClose". |
| value       | `SingleLine.Text` | output | | The value of the event when the `OnChange` event is fired by the component. |
 
## Component Events

PCF components fire a single event, `OnChange`.  To overcome this limitation, the speech to text component overloads this event by providing a `name` output property to allow more event types to be fired by the component.

For more information on this pattern see [A Workable Pattern for PCF Events You Can Use Today](https://98.codes/a-workable-pattern-for-pcf-events-you-can-use-today/).

Use the PowerFx Switch function in your control's `OnChange` behavior property to handle these events in your app.

````
Switch(
  Self.name,
  "OnChange",
    Notify("OnChange received! Transcribed text: " & Self.value),
  "OnClose",
    Notify("OnClose received!")
)
````

### OnChange

Fired when the user clicks the component "Confirm" button.

#### Output properties

| Name                            | Value                               | Description                                 |
| ------------------------------- | ----------------------------------- | ------------------------------------------- |
| `name`                      | "OnChange" | The event name. |
| `value`                      | `string` | The transcribed speech. |

### OnClose

Fired when the user clicks the component "Close" button.

#### Output properties

| Name                            | Value                               | Description                                 |
| ------------------------------- | ----------------------------------- | ------------------------------------------- |
| `name`                      | "OnClose" | The event name. |