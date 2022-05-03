import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'MyCustomMenuApplicationCustomizerStrings';
import styles from './MyCustomMenu.module.scss';

const LOG_SOURCE: string = 'MyCustomMenuApplicationCustomizer';


/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IMyCustomMenuApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
  Top: string;
  Bottom: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class MyCustomMenuApplicationCustomizer
  extends BaseApplicationCustomizer<IMyCustomMenuApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    //return this.ShowModal();
    this.context.placeholderProvider.changedEvent.add(this,this.RenderMenu);
    return Promise.resolve();
  }

  private RenderMenu() : Promise<void>{
    
    const placeHolderMenu = this.context.placeholderProvider.tryCreateContent(
      PlaceholderName.Top, {onDispose: this._onDispose}
    );

    if(!placeHolderMenu){
      console.error('The expected placeholder menu');
      return;
    }

    if(placeHolderMenu.domElement){
      placeHolderMenu.domElement.innerHTML = `
      <div class="${styles.app}">
      <div class="${styles.topnav}">
        <a class="${styles.active}" href="#get-trained-by-the-experts">Home</a>
        <a href="#guest-speakers">Guest Speakers</a>
        <a href="#agenda">Agenda</a>
        <a href="#contact">Contact</a>
      </div>
      </div>
      `;
    }

    const placeHolderFooter = this.context.placeholderProvider.tryCreateContent(
      PlaceholderName.Bottom, {onDispose: this._onDispose}
    );

    if(!placeHolderFooter){
      console.error('The expected placeholder footer');
      return;
    }

    if(placeHolderFooter.domElement){
      placeHolderFooter.domElement.innerHTML = `
      <div class="${styles.app}">
      <div class="${styles.topnav} ${styles.flexCenter}">
        <a class="${styles.active}" href="#get-trained-by-the-experts">Home</a>
        <a href="#guest-speakers">Guest Speakers</a>
        <a href="#agenda">Agenda</a>
        <a href="#contact">Contact</a>
      </div>
      </div>
      `;
    }

    return Promise.resolve();
  }

  private _onDispose() : void{
    console.log('test');
  }

  //example to show a modal
  private ShowModal() : Promise<void>{

    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let message: string = this.properties.testMessage;
    if (!message) {
      message = '(No properties were provided.)';
    }

    Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`);

    return Promise.resolve();

  }
}
