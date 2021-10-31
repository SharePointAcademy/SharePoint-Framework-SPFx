import * as React from 'react';
import { ITabPalestrasProps } from './ITabPalestrasProps';
import { App } from './AppForm/App';

export default class TabPalestras extends React.Component<ITabPalestrasProps, {}> {
  public render(): React.ReactElement<ITabPalestrasProps> {
    return (
      <div>
        <App />
      </div>
    );
  }
}
