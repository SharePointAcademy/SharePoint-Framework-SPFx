import * as React from 'react';
import styles from './WpGetItems.module.scss';
import { IWpGetItemsProps } from './IWpGetItemsProps';

import * as jquery from "jquery";

export interface IWpGetItemsState {
  items: [
    {
      "Title": "",
      "Descricao": "",
      "UrlImagem": ""
    }];
}

export default class WpGetItems extends React.Component<IWpGetItemsProps, IWpGetItemsState> {

  public constructor(props: IWpGetItemsProps, state: IWpGetItemsState) {
    super(props);
    this.state = {
      items: [
        {
          "Title": "",
          "Descricao": "",
          "UrlImagem": ""
        }
      ]
    };
  }

  public componentDidMount() {
    var reactHandler = this;
    jquery.ajax({
      url: `${this.props.siteUrl}/_api/web/lists/getbytitle('Produtos')/items`,
      type: "GET",
      headers: { 'Accept': 'application/json; odata=verbose;' },
      success: (resultData) => {
        reactHandler.setState({
          items: resultData.d.results
        });
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.log("Erro na API");
      }
    });
  }


  public render(): React.ReactElement<IWpGetItemsProps> {
    return (
      
      <div className={styles.wpGetItems}>
        <h2 className={styles["titulo"]}>Produtos</h2>
        <div className={styles["products-list"]}>

          {this.state.items.map( (item, key) => {

            return (<div className={styles["product-info"]} key={key}>
              <h1>{item.Title}</h1>
              <p>{item.Descricao}</p>

              <p>
                <img src={item.UrlImagem} />
              </p>
            </div>

            );
          })}

        </div>
      </div>

    );
  }
}
