import React, {Component} from 'react'
import {render} from 'react-dom'

import Calendar from '../../src'

class Demo extends Component {
  render() {
    return <div>
      <h1>Calendar Demo</h1>
      <div className="row" style={{width:'100%'}}>
      	<div className="col-lg-12">

      	<Calendar 
        onSelect={(startDate,endDate)=>{ console.log(startDate,' this is the start date',endDate,' this is the end date value.......'); }}
        onChange = {(selectedDate) => {
          console.log('here is the selected date',selectedDate);
        }}
        selectedRange = {['2019-08-22','2019-09-25']}
        disabledDates = {() => { return ['2019-08-16','2019-08-20'] }}
        disablePrevDates
        />
      	</div>
      </div>
      <div className="row" style={{width:'100%'}}>
        <div className="col-lg-12">

        
        </div>
      </div>

    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
