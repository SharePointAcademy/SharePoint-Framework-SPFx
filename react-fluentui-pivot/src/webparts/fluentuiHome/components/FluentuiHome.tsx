import * as React from 'react';
import styles from './FluentuiHome.module.scss';
import { IFluentuiHomeProps } from './IFluentuiHomeProps';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';

export default class FluentuiHome extends React.Component<IFluentuiHomeProps, {}> {
  public render(): React.ReactElement<IFluentuiHomeProps> {
    return (
      <div className={ styles.fluentuiHome }>
        <Pivot aria-label="Exemplo Abas">
          <PivotItem headerText="TextField">
            <Tab1/>
          </PivotItem>
          <PivotItem headerText="DropDown">
            <Tab2/>
          </PivotItem>
          <PivotItem headerText="DatePicker">
            <Tab3/>
          </PivotItem>
        </Pivot>

      </div>
    );
  }
}
