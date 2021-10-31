import * as React from 'react';
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { DayOfWeek } from 'office-ui-fabric-react/lib/DatePicker';
import styles from './FluentuiHome.module.scss';

interface IPivot2State {
  selectedItem: any;
  firstDayOfWeek: any;
  value: any;
}

export default class Tab2 extends React.Component<{}, IPivot2State> {

  constructor(props) {
    super(props);

    this.state = {
      value: null,
      selectedItem: null,
      firstDayOfWeek: DayOfWeek.Monday
    };
  }

  private makeList(items: any) {
    let list = [];
    for (let i = 0; i < items; i++) {
      list.push({ key: i, text: 'Option ' + i });
    }

    return list;
  }
  
  protected _onDropdownChanged(event) {
    var newValue = event.key;
    this.setState({ firstDayOfWeek: DayOfWeek[newValue] });
    console.log("dropdown: ", newValue);
  }

  public render(): React.ReactElement<{}> {

    return (
      <div className={styles.fluentuiHome}>
        <div className='dropdownExample'>

          <Dropdown
            label='Select the first day of the week'
            defaultSelectedKey={DayOfWeek[this.state.firstDayOfWeek]}
            options={[{ text: 'Monday', key: DayOfWeek[DayOfWeek.Monday] },
            { text: 'Tuesday', key: DayOfWeek[DayOfWeek.Tuesday] },
            { text: 'Wednesday', key: DayOfWeek[DayOfWeek.Wednesday] },
            { text: 'Thursday', key: DayOfWeek[DayOfWeek.Thursday] },
            { text: 'Friday', key: DayOfWeek[DayOfWeek.Friday] },
            { text: 'Saturday', key: DayOfWeek[DayOfWeek.Saturday] },
            { text: 'Sunday', key: DayOfWeek[DayOfWeek.Sunday] }
            ]
            }
            onChanged={this._onDropdownChanged.bind(this)}
          />

          <Dropdown
            id='Basicdrop1'
            placeHolder='Select an Option'
            label='Basic uncontrolled example:'
            ariaLabel='Basic dropdown example'
            options={
              [
                { key: 'Header', text: 'Actions', itemType: DropdownMenuItemType.Header },
                { key: 'A', text: 'Option a' },
                { key: 'B', text: 'Option b' },
                { key: 'C', text: 'Option c' },
                { key: 'D', text: 'Option d' },
                { key: 'E', text: 'Option e' },
                { key: 'divider_2', text: '-', itemType: DropdownMenuItemType.Divider },
                { key: 'Header2', text: 'People', itemType: DropdownMenuItemType.Header },
                { key: 'F', text: 'Option f' },
                { key: 'G', text: 'Option g' },
                { key: 'H', text: 'Option h' },
                { key: 'I', text: 'Option i' },
                { key: 'J', text: 'Option j' },
              ]
            }
          />

          <Dropdown
            label='Disabled uncontrolled example with defaultSelectedKey:'
            defaultSelectedKey='D'
            disabled={true}
            options={
              [
                { key: 'A', text: 'Option a' },
                { key: 'B', text: 'Option b' },
                { key: 'C', text: 'Option c' },
                { key: 'D', text: 'Option d' },
                { key: 'E', text: 'Option e' },
                { key: 'F', text: 'Option f' },
                { key: 'G', text: 'Option g' },
              ]
            }
          />

          <Dropdown
            label='Controlled example:'
            selectedKey={this.state.selectedItem && this.state.selectedItem.key}
            options={this.makeList(5)}
            onChanged={(item) => this.setState({ selectedItem: item })}
          />

        </div>
      </div>
    );
  }

}
