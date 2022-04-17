import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './OrdersWebPart.module.scss';
import * as strings from 'OrdersWebPartStrings';

import { AadHttpClient, HttpClientResponse } from '@microsoft/sp-http';

export interface IOrdersWebPartProps {
  description: string;
}

export default class OrdersWebPart extends BaseClientSideWebPart<IOrdersWebPartProps> {

  private ordersClient: AadHttpClient;
  protected onInit(): Promise<void> {
    return new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
      this.context.aadHttpClientFactory
        .getClient('your clientid here(aad app guid)')
        .then((client: AadHttpClient): void => {
          this.ordersClient = client;
          resolve();
        }, err => reject(err));
    });
  }

  public render(): void {
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'orders');

    this.ordersClient
      .get('your azure function url here',
        AadHttpClient.configurations.v1)
      .then((res: HttpClientResponse): Promise<any> => {
        return res.json();
      })
      .then((orders: any): void => {
        this.context.statusRenderer.clearLoadingIndicator(this.domElement);
        this.domElement.innerHTML = `
          <div class="${styles.spfxSpoApiConnect}">
          <div class="${styles.container}">
          <div class="${styles.row}">
          <div class="${styles.column}">
          <span class="${styles.title}">Orders</span>
          <p class="${styles.description}">
          <ul>
          ${orders.map((o: { rep: any; total: any; }) => `<li>${o.rep}
          $${o.total}</li>`).join('')}
          </ul>
          </p>
          <a href="https://aka.ms/spfx" class="${styles.button}">
          <span class="${styles.label}">Learn more</span>
          </a>
          </div>
          </div>
          </div>
          </div>`;
      }, (err: any): void => {
        this.context.statusRenderer.renderError(this.domElement, err);
      });

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
