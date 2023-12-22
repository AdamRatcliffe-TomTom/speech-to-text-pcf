import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { IControlEvent } from "./IControlEvent";
import Control from "./components/Control";
import * as React from "react";

export class SpeechToText
  implements ComponentFramework.ReactControl<IInputs, IOutputs>
{
  private event: IControlEvent;
  private notifyOutputChanged: () => void;

  /**
   * Empty constructor.
   */
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary
  ): void {
    this.notifyOutputChanged = notifyOutputChanged;

    context.mode.trackContainerResize(true);
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   * @returns ReactElement root react element for the control
   */
  public updateView(
    context: ComponentFramework.Context<IInputs>
  ): React.ReactElement {
    const width = context.mode.allocatedWidth;
    const height = context.mode.allocatedHeight;
    const value = this.getRawParameter(context, "value");
    const language = this.getRawParameter(context, "language");
    const startRecordingText = this.getRawParameter(
      context,
      "startRecordingText"
    );
    const stopRecordingText = this.getRawParameter(
      context,
      "stopRecordingText"
    );
    const confirmText = this.getRawParameter(context, "confirmText");
    const clearText = this.getRawParameter(context, "clearText");
    const showCloseButton = this.getRawParameter(context, "showCloseButton");

    const props = {
      width,
      height,
      value,
      language,
      startRecordingText,
      stopRecordingText,
      confirmText,
      clearText,
      showCloseButton,
      onChange: this.handleChange,
      onClose: this.handleClose
    };

    return React.createElement(Control, props);
  }

  private getRawParameter(
    context: ComponentFramework.Context<IInputs>,
    name: string,
    defaultValue?: any
  ): any {
    const parameter = (context.parameters as { [key: string]: any })[name];
    if (parameter && parameter.raw !== "val") {
      return parameter.raw;
    }
    return defaultValue;
  }

  private handleChange = (value: string) => {
    this.event = {
      name: "OnChange",
      value
    };

    this.notifyOutputChanged();
  };

  private handleClose = () => {
    this.event = { name: "OnClose" };

    this.notifyOutputChanged();
  };

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return this.event;
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }
}
