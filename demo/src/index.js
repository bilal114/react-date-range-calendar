import React, { Component } from "react";
import { render } from "react-dom";
import Calendar from "../../src";

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>Calendar Demo</h1>
        <div style={{ width: "100%" }}>
          <Calendar
            onSelect={(startDate, endDate, validDateRange) => {
              console.log(
                startDate,
                " this is the start date",
                endDate,
                " this is the end date value.......",
                " and this is the validDateRange",
                validDateRange
              );
            }}
            onChange={selectedDate => {
              console.log("here is the selected date", selectedDate);
            }}
            selectedRange={["2020-08-22", "2020-09-25"]}
            disabledDates={() => {
              return ["2019-08-16", "2019-08-20"];
            }}
            disablePrevDates
          />
        </div>
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
