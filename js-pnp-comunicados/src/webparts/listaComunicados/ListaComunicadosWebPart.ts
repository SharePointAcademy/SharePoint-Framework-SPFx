//necessario para carregar componentes externos, nesse caso iremos carregar o bootstrap
import { SPComponentLoader } from '@microsoft/sp-loader';

import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ListaComunicadosWebPart.module.scss';
import * as strings from 'ListaComunicadosWebPartStrings';

//carrega o pnp
import { sp, Item } from '@pnp/sp';

//carrega bootstrap
SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css');

export interface IListaComunicadosWebPartProps {
  description: string;
}

export default class ListaComunicadosWebPart extends BaseClientSideWebPart<IListaComunicadosWebPartProps> {

  public onInit(): Promise<void> 
  {
      return super.onInit().then(_ => {
          sp.setup({
          spfxContext: this.context
          });
      });
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.listaComunicados }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <h2>Comunicados</h2>
              <div id="divComunicados">
              </div>
            </div>
          </div>
        </div>
      </div>`;

      this.lerComunicados();
  }

  private lerComunicados(): void {

    sp.web.lists.getByTitle(this.properties.description)
      .items.select('Id','Title','Link')
      .get().then((response: Item[]): void => {
        
            let html: string = ``;
        
            if (response.length > 0) 
            {

              html += `<ul>`;
                response.forEach((listItem: any) => {

                    html += `<li style="list-style: none"><a target="_blank" href="${listItem.Link}">${listItem.Title}</a></li>`;

                });

                html += `</ul>`;
            }
            else {
                html += `Nenhum comunicado cadastrado.`;
            }
            
            const listContainer: Element = this.domElement.querySelector('#divComunicados');
            listContainer.innerHTML = html;

      }, (error: any): void => {
        console.log('Erro ao carregar comunicados: ' + error);
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
