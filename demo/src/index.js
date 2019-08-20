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
        onSelect={(startDate,endDate,validDateRange)=>{ console.log(startDate,' this is the start date',endDate,' this is the end date value.......',' and this is the validDateRange',validDateRange); }}
        onChange = {(selectedDate) => {
          console.log('here is the selected date',selectedDate);
        }}
        selectedRange = {['2019-08-22','2019-10-25']}
        disabledDates = {() => { return ['2019-08-16','2019-08-20'] }}
        disablePrevDates
        />
      	</div>
      </div>
      <div className="row" style={{width:'100%'}}>
        <div className="col-lg-12">
          <iframe src="https://codesandbox.io/embed/awesome-hofstadter-58bgr?fontsize=14" title="awesome-hofstadter-58bgr" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
        
        </div>
      </div>

    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
