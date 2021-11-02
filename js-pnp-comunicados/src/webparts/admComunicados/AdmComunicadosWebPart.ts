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

import styles from './AdmComunicadosWebPart.module.scss';
import * as strings from 'AdmComunicadosWebPartStrings';

//carrega o pnp
import { sp, Item, ItemAddResult } from '@pnp/sp';

//carrega bootstrap
SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css');

export interface IAdmComunicadosWebPartProps {
  description: string;
}

export default class AdmComunicadosWebPart extends BaseClientSideWebPart<IAdmComunicadosWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
    <div class="${ styles.admComunicados}">
    <div class="${ styles.container}">
      <div class="${ styles.row}">
        <div class="${ styles.column}">              
          <div class="row">
            <div class="col-md-12">
              <h2>Lista comunicados</h2>
              <div class="form-group">              
                <button type="button" class="btn btn-success criarComunicado">Criar</button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div id="divComunicados"></div>
            </div>
          </div>
      </div>
    </div>
  </div>`;

    var urlSite = this.context.pageContext.web.absoluteUrl;
    this.carregarComunicados(urlSite);
    this.setButtonsEventHandlers();
    
  }

  private setButtonsEventHandlers(): void {
    const webPart: AdmComunicadosWebPart = this;
    this.domElement.querySelector('button.criarComunicado').addEventListener('click', () => { webPart.criarComunicado(); });    
  }

  private criarComunicado(): void {
    window.location.href = this.context.pageContext.web.absoluteUrl + "/SitePages/Comunicados.aspx";
  }

  protected carregarComunicados(urlSiteCompleta): void {

    jQuery.ajax({
      url: urlSiteCompleta + "/_api/web/lists/getbytitle('Comunicados')/items?$orderby=Title asc",
      type: "GET",
      headers: {
        "Accept": "application/json;odata=verbose"
      },
      success: (data) => {
        var results = data.d.results;

        var comunicadosFinal = "<table class=\"table table-striped\">";
        var comunicadosHTML = '';
        var listItem = '';
        for (var idx = 0; idx < results.length; idx++) {
          listItem = results[idx];
          comunicadosHTML += "<tr><td><a target=\"_blank\" href=\" "+ listItem["Link"] + "\">" + listItem["Title"] + "</a></td>" +
            "<td><a href=\"" + urlSiteCompleta + "/SitePages/Comunicados.aspx?idComunicado=" + listItem["ID"] + "\">Editar</a></td>"+
            "<td><a href=\"" + urlSiteCompleta + "/SitePages/ApagarComunicado.aspx?idComunicado=" + listItem["ID"] + "\">Excluir</a></td>";
        }

        comunicadosFinal += comunicadosHTML + "</table>";

        jQuery('#divComunicados').html(comunicadosFinal);

      },
      error: (data) => {
        console.log("Erro ao carregar os comunicados: " + data.statusText);
      }
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
