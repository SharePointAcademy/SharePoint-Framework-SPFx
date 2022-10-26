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
  Top: string;
  Bottom: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class MyCustomMenuApplicationCustomizer
  extends BaseApplicationCustomizer<IMyCustomMenuApplicationCustomizerProperties> {

  private _userLoginName: string;

  @override
  public onInit(): Promise<void> {
    this._userLoginName = this.context.pageContext.legacyPageContext.userEmail;
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
      if(document.getElementById('divHeader') === null)
        placeHolderMenu.domElement.innerHTML = `
        <div id="divHeader" class="${styles.app}">
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
      if(document.getElementById('divFooter') === null)
        placeHolderFooter.domElement.innerHTML = `
        <div id="divFooter" class="${styles.app}">
        <div class="${styles.topnav} ${styles.flexCenter}">
          <a class="${styles.active}" href="#get-trained-by-the-experts">Home</a>
          <a href="#guest-speakers">Guest Speakers</a>
          <a href="#agenda">Agenda</a>
          <a href="#contact">Contact</a>
        </div>
        </div>
        `;
    }
    
    if(localStorage.getItem("modal") === "true")
      return Promise.resolve();
    else
      this.ShowModal();
  }

  //example to show a modal
  private ShowModal() : Promise<void>{

    localStorage.setItem("modal","true");

    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    Dialog.alert(`My email is ${this._userLoginName}`);

    return Promise.resolve();

  }

  private _onDispose() : void{
    console.log('test');
  }
}
