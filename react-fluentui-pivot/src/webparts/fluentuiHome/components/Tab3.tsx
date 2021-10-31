import * as React from 'react';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { DefaultButton } from 'office-ui-fabric-react';
import styles from './FluentuiHome.module.scss';

export interface IDatePickerBasicExampleState { 
  firstDayOfWeek?: DayOfWeek; 
  value?: Date; 
} 

export default class Tab3 extends React.Component<{}, IDatePickerBasicExampleState> {
  constructor(props) { 
    super(props); 

    this.state = { 
      firstDayOfWeek: DayOfWeek.Monday, 
      value: new Date()
    }; 
  } 

  private DayPickerStrings: IDatePickerStrings = { 
    months: [ 
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ], 
  
    shortMonths: [ 
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ], 
  
    days: [ 
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ], 
  
    shortDays: [ 
      'S',
      'M',
      'T',
      'W',
      'T',
      'F',
      'S'
    ], 
  
    goToToday: 'Go to today', 
    prevMonthAriaLabel: 'Go to previous month', 
    nextMonthAriaLabel: 'Go to next month', 
    prevYearAriaLabel: 'Go to previous year', 
    nextYearAriaLabel: 'Go to next year', 
  
    isRequiredErrorMessage: 'Start date is required.', 
    invalidInputErrorMessage: 'Invalid date format.' 
  }; 

  protected atualizarData(date){
    this.setState({ value: date });
    console.log("data br", new Date(date).toLocaleDateString());
    console.log("data en-us", new Date(date).toJSON().slice(0,10).replace(/-/g,'-'));
  }

  public render(): React.ReactElement<{}> {
    return (
      <div className={ styles.fluentuiHome }>
       <DatePicker 
          label='Start date' 
          isRequired={ true } 
          allowTextInput={ true } 
          ariaLabel='Campo obrigatório.'
          firstDayOfWeek={ this.state.firstDayOfWeek } 
          strings={ this.DayPickerStrings } 
          value={ this.state.value } 
          onSelectDate={ (date) => this.atualizarData(date) } 
          placeholder='Selecione uma data'
        /> 
        <br/>
        <DefaultButton onClick={ () => this.setState({ value: null }) } text='Clear' />         
        <br/> 
      
      </div>
    );
  }
}
