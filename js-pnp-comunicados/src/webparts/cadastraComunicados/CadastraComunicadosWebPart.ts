//necessario para carregar componentes externos, nesse caso iremos carregar o bootstrap
import { SPComponentLoader } from '@microsoft/sp-loader';

//importa o jquery
import * as jQuery from 'jquery';

import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './CadastraComunicadosWebPart.module.scss';
import * as strings from 'CadastraComunicadosWebPartStrings';

//carrega o pnp
import { sp, Item, ItemAddResult } from '@pnp/sp';

//carrega bootstrap
SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css');

export interface IListItem {
  Id: number;
  Title?: string;
  Link?: string;
}

export interface ICadastraComunicadosWebPartProps {
  description: string;
}

export default class CadastraComunicadosWebPart extends BaseClientSideWebPart<ICadastraComunicadosWebPartProps> {

  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.cadastraComunicados}">
        <div class="${ styles.container}">
          <div class="${ styles.row}">
            <div class="${ styles.column}">              
              <div class="row">
              <div class="col-md-8">
                <h2>Criar comunicado</h2>
                <div class="form-group">
                  <input type="text" id="txtTitulo" placeholder="Título do comunicado" class="form-control"/>
                  <input type="text" id="txtLink" placeholder="https://www.google.com.br" class="form-control"/>
                  <br/>
                  <button type="button" class="btn btn-success criarComunicado">Salvar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;

    this.setButtonsEventHandlers();
    this.pageLoad();
  }

  private pageLoad() : void
  {
      var origem = this.getQueryStringParameter("idComunicado");      
      if(origem != "")
      {
        var idItem = parseInt(origem);
        sp.web.lists.getByTitle(this.properties.description).items.getById(idItem).get().then((item: any) => {
          (<HTMLInputElement>document.getElementById('txtTitulo')).value = item.Title;
          (<HTMLInputElement>document.getElementById('txtLink')).value = item.Link;
          //jQuery('#txtTitulo').val(item.Title);
          //jQuery('#txtLink').val(item.Link);
        });
      } 
  }

  private setButtonsEventHandlers(): void {
    const webPart: CadastraComunicadosWebPart = this;
    this.domElement.querySelector('button.criarComunicado').addEventListener('click', () => { webPart.criarComunicado(); });
  }

  private criarComunicado(): void {
    var origem = this.getQueryStringParameter("idComunicado");

    if (origem == "") {
      sp.web.lists.getByTitle(this.properties.description).items.add({
        'Title': document.getElementById('txtTitulo')["value"],
        'Link': document.getElementById('txtLink')["value"]

      }).then((result: ItemAddResult): void => {
        const item: IListItem = result.data as IListItem;
        console.log(`Id do item criado ${item.Id}`);
        window.location.href = this.context.pageContext.web.absoluteUrl + "/SitePages/AdmComunicados.aspx";
      }, (error: any): void => {
        console.log('Erro ao cadastrar o comunicado: ' + error);
      });
    }
    else {
      var idComunicado = parseInt(origem);
        sp.web.lists.getByTitle(this.properties.description).items.getById(idComunicado).update({
          'Title': document.getElementById('txtTitulo')["value"],
          'Link': document.getElementById('txtLink')["value"]
      });

      console.log('Id do comunicado igual a: ' + idComunicado);
      window.location.href = this.context.pageContext.web.absoluteUrl + "/SitePages/AdmComunicados.aspx";

    }

  }

  private getQueryStringParameter(paramToRetrieve) {

    if (document.URL.indexOf("?") !== -1) {
      var params = document.URL.split("?")[1].split("&amp;");
      var strParams = "";

      for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] === paramToRetrieve)
          return singleParam[1];
      }
    }
    else return "";
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
