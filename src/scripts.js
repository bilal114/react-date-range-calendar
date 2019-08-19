import Moment from 'moment';
import { extendMoment } from 'moment-range';



const moment = extendMoment(Moment);

let obj = {

    startDate : null,
    endDate : null,
    isEndDateNotFinalized: true,
    leftCalendar : {

        calendar: {

            "0" : {

                "0": "2019-03-03",
                "1" : "2019-03-04"
            },
            "1": {
                "0" : "2019-03-04",
                "1" : "2019-03-04",

            }
        }
                         
                    

    },

    rightCalendar : {

        calendar: {

            "0" : {

                "0": "2019-03-03",
                "1" : "2019-03-04"
            },
            "1": {
                "0" : "2019-03-04",
                "1" : "2019-03-04",

            }
        }
                         
                    

    }
}

let dateChangeHandler = false;
let tdCssObj = false;
let onHoverTdCssObj = false;
let inRangedTdCssObj = false;
let currentDateTdCssObj = false;
let startDateTdCssObj = false;
let endDateTdCssObj = false;
let disabledDatesTdCssObj = false;

// let dateChangeHandler = function(startDate,endDate) {


//     console.log(startDate,endDate,' so this is the end date');

// }

let selected_values = {};

let today = new Date();

let actualCurrentDay = new Date();

// (function(){
//     // validate these dates first 

//     if(selected_values['startDate'])
//     {

//         today = new Date(selected_values['startDate']);

//     }
// })()

let disabledDates = [];
let disablePrevDates = false;
let currentMonth1 = today.getMonth();
let currentMonth2 = today.getMonth();
let currentYear1 = today.getFullYear();
let currentYear2 = today.getFullYear();

let selectYear1 = document.getElementById("year1");
let selectYear2 = document.getElementById("year2");
let selectMonth1 = document.getElementById("month1");
let selectMonth2 = document.getElementById("month2");
var cancelMouseOut = false;
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear1 = document.getElementById("monthAndYear1");
let monthAndYear2 = document.getElementById("monthAndYear2");

 
export default function initiate (props){
    selectYear1 = document.getElementById("year1");
    selectYear2 = document.getElementById("year2");
    selectMonth1 = document.getElementById("month1");
    selectMonth2 = document.getElementById("month2");
    monthAndYear1 = document.getElementById("monthAndYear1");
    monthAndYear2 = document.getElementById("monthAndYear2");

    if(props && props.onSelect)
    dateChangeHandler = props.onSelect;
        
    if(props && props.selectedRange && Array.isArray(props.selectedRange) && props.selectedRange.length>1)
    {
        selected_values['startDate'] = props.selectedRange[0];
        selected_values['endDate'] = props.selectedRange[1];
    }
    if(selected_values['startDate'])
    {

        today = new Date(selected_values['startDate']);

    }

    if(props && props.disabledDates && typeof props.disabledDates==='function')
    {
        if(Array.isArray(props.disabledDates()))
            disabledDates = props.disabledDates();
        else
            throw new Error("prop, disabledDates method should return just array data type e.g. ['YYYY-MM-DD','YYYY-MM-DD']");

    }

    if(props && props.disablePrevDates)
    {
        disablePrevDates = props.disablePrevDates;
    }

    // from here props starts related to styling
    if(props && props.tdCssObj && props.tdCssObj instanceof Object)
    {
        tdCssObj = props.tdCssObj;
    }

    if(props && props.onHoverTdCssObj && props.onHoverTdCssObj instanceof Object)
    {
        onHoverTdCssObj = props.onHoverTdCssObj;
    }    
    if(props && props.inRangedTdCssObj && props.inRangedTdCssObj instanceof Object)
    {
        inRangedTdCssObj = props.inRangedTdCssObj;
    } 
    if(props && props.currentDateTdCssObj && props.currentDateTdCssObj instanceof Object)
    {
        currentDateTdCssObj = props.currentDateTdCssObj;
    } 
    if(props && props.startDateTdCssObj && props.startDateTdCssObj instanceof Object)
    {
        startDateTdCssObj = props.startDateTdCssObj;
    }
    if(props && props.endDateTdCssObj && props.endDateTdCssObj instanceof Object)
    {
        endDateTdCssObj = props.endDateTdCssObj;
    }

    showCalendar(currentMonth1, currentYear1);
    showSecondCalendar();
    selectValuesOnCalendar();
}

export function next() {
    currentYear1 = (currentMonth1 === 11) ? currentYear1 + 1 : currentYear1;
    currentMonth1 = (currentMonth1 + 1) % 12;
    showCalendar(currentMonth1, currentYear1);
}

export function nextSec() {
    currentYear2 = (currentMonth2 === 11) ? currentYear2 + 1 : currentYear2;
    currentMonth2 = (currentMonth2 + 1) % 12;
    showCalendar(currentMonth2, currentYear2,"calendar-right-body",monthAndYear2);
}

 function showSecondCalendar() {
    currentYear2 = (currentMonth2 === 11) ? currentYear2 + 1 : currentYear2;
    currentMonth2 = (currentMonth2 + 1) % 12;
    showCalendar(currentMonth2, currentYear2,"calendar-right-body",monthAndYear2);
}

export function previous() {
    currentYear1 = (currentMonth1 === 0) ? currentYear1 - 1 : currentYear1;
    currentMonth1 = (currentMonth1 === 0) ? 11 : currentMonth1 - 1;
    showCalendar(currentMonth1, currentYear1,"calendar-left-body",monthAndYear1);
}

export function previousSec() {
    currentYear2 = (currentMonth2 === 0) ? currentYear2 - 1 : currentYear2;
    currentMonth2 = (currentMonth2 === 0) ? 11 : currentMonth2 - 1;
    showCalendar(currentMonth2, currentYear2,"calendar-right-body",monthAndYear2);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth1.value);
    showCalendar(currentMonth, currentYear);
}

export function moveToPrevious () {
    previous();
    previousSec();
    selectValuesOnCalendar();

}

export  function moveToNext () {
    next();
    nextSec();
    selectValuesOnCalendar();

}
const getDaysRange = (startDate, endDate) => {
  if (startDate && endDate) {

    let arr = [];

    
    const range = moment.range(startDate, endDate);
        
        for (let day of range.by('days')) {
            
            day = day.format('YYYY-MM-DD');
            if(disabledDates.indexOf(day)>0);
            else
                arr.push(day);
        }

    return  arr;
  }

  return undefined;
};
function disableIt(condition,cell,registerEvents=true){


    // console.log(condition,registerEvents);
    
    cell.classList.remove('disabled');
    cell.classList.remove('not-available');

    if(condition)
    {    
        cell.classList.add('disabled')
        cell.classList.add('not-available');

        registerEvents = false;
    }
    
    // don't register any event on it.....
    return registerEvents;
}

function showCalendar(month, year,tableId="calendar-left-body",monthAndYear1=document.getElementById("monthAndYear1")) {

    
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById(tableId); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    if(tableId==='calendar-left-body')
    {

        monthAndYear1.innerHTML = months[month] + ", " + year;
        selectYear1.value = year;
        selectMonth1.value = month;
    
    }
    else if(tableId==='calendar-right-body')
    {
        selectYear2.value = year;
        selectMonth2.value = month;
        monthAndYear2.innerHTML = months[month] + ", " + year;   
    }

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                cell.classList.add('td-not');
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    // cell.classList.add("current");
                } // color today's date

                cell.classList.remove('current');



                cell.appendChild(cellText);
                row.appendChild(cell);

                // adding date values in global object....

                if(typeof obj.leftCalendar.calendar[i] ==='undefined')
                    obj.leftCalendar.calendar[i] = {};

                if(typeof obj.rightCalendar.calendar[i] ==='undefined')
                    obj.rightCalendar.calendar[i] = {};

                let thatDay;
                if(tableId==='calendar-left-body')
                {

                
                    thatDay = obj.leftCalendar.calendar[i][j] = moment(`${currentYear1}-${currentMonth1+1}-${date}`)
                    if(moment(actualCurrentDay).isSame(obj.leftCalendar.calendar[i][j],'day'))
                    cell.classList.add('current');
                }
                else
                {

                    
                    thatDay = obj.rightCalendar.calendar[i][j] = moment(`${currentYear2}-${currentMonth2+1}-${date}`)
                    if(moment(actualCurrentDay).isSame(obj.rightCalendar.calendar[i][j],'day'))
                        cell.classList.add('current');
                }

                let registerEvents = true;

                if(disablePrevDates && moment(actualCurrentDay).isAfter(thatDay,'day'))
                {
                    disabledDates.push(thatDay.format('YYYY-MM-DD'));
                    // console.log(disabledDates,'sdddaaaaassssssssssssssssssssssssssssssssss')

                } 

                // console.log(thatDay.format('YYYY-MM-DD'),' ddddddddddddddddddddddddddddddd',cell);
                 
                if(disabledDates && Array.isArray(disabledDates) && disabledDates.length>0)
                for (let disabledDate of disabledDates) {

                    registerEvents =  disableIt(moment(disabledDate)._isValid && thatDay.isSame(moment(disabledDate),'day'),cell);
                    if(registerEvents===false)
                        break;
                }
               
                if(registerEvents)
                {
                        
                        
                        cell.dataset.title = 'r'+i+'c'+j;
                        cell.style.textAlign = 'center';

                        // mouseover event listener
                        cell.addEventListener('mouseover',function(e){
                            // console.log('mouseovered            fsadfsaaf',e)
                            e.target.classList.add('active')

                            onHoverAfterStartDate(e);

                            // e.target.className +='active';
                            applyStyling();
                        })
                        // called here to put styling default color of actual current date...
                        applyStyling();
                        // mouseout event listener
                       
                        let mouseout = function(e){

                            // e.target.style.color  = 'black';
                            // e.target.style.background  = 'inherit';
                            e.target.classList.remove('active')

                            applyStyling();
                        };
                        cell.addEventListener('mouseout',mouseout)


                       
                       // click event listener
                        cell.addEventListener('click',function(e){
                            // console.log('clicked            fsadfsaaf',e)
                            

                            document.querySelectorAll('.active').forEach(function(elem){
                                elem.classList.remove('active');
                            })
              

                            
                            // console.log(obj.startDate,obj.endDate,obj.isEndDateNotFinalized,'tttttttttttttttttttttttttttttttttttttttttttttttttttt')
                            
                            if(!obj.startDate || (obj.startDate && obj.endDate) || (obj.startDate && !obj.endDate && getDateFromTarget(e.target).isBefore(obj.startDate)) )
                            {
                                // removing previous selected start and end date....

                                // console.log(obj.startDate,obj.endDate,'tttttttttttttttttttttttttttttttttttttttttttttttttttt');
                                document.querySelectorAll('.start-date').forEach(function(elem){
                                    elem.classList.remove('start-date');
                                })
                                
                                 document.querySelectorAll('.end-date').forEach(function(elem){
                                    elem.classList.remove('end-date');
                                })
                                e.target.classList.add('start-date')
                                e.target.classList.add('active')
                                obj.startDate = getDateFromTarget(e.target);
                                selected_values['startDate'] = obj.startDate.format('YYYY-MM-DD');
                                obj.endDate = null;
                                selected_values['endDate'] = null;
                                obj.isEndDateNotFinalized = true;
                                onHoverAfterStartDate(e);
                                // e.target.removeEventListener('mouseout',mouseout)
                            }
                            else if((obj.startDate && !obj.endDate && getDateFromTarget(e.target).isAfter(obj.startDate)) || getDateFromTarget(e.target).isSame(obj.startDate,'day')  )
                            {
                               
                               // console.log('came to the right place')
                                document.querySelectorAll('.end-date').forEach(function(elem){
                                    elem.classList.remove('end-date');
                                })
                                e.target.classList.add('end-date')
                                e.target.classList.add('active')
                                
                                obj.endDate = getDateFromTarget(e.target);
                                selected_values['endDate'] = obj.endDate.format('YYYY-MM-DD');
                                obj.isEndDateNotFinalized = false;

                                if(dateChangeHandler)
                                    dateChangeHandler(obj.startDate.format('YYYY-MM-DD'),obj.endDate.format('YYYY-MM-DD'),getDaysRange(obj.startDate,obj.endDate));
                                // e.target.removeEventListener('mouseout',mouseout)
                                selectValuesOnCalendar();
                            }
                           
                            applyStyling();
                        })
                }

                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.


    }

}

function selectValuesOnCalendar () {

    if(selected_values['startDate'] && typeof selected_values['startDate']==='string' && selected_values['endDate'])
    {

        obj.startDate = moment(selected_values['startDate'])

        // let cameInside = false;
        document.querySelectorAll('.__cal__ tbody td').forEach(function(cell){

            if(!cell.dataset.title )
                return;
            let title = cell.dataset.title;



            let row = title.substr(1,1);
            let col = title.substr(3,1);

            let cal = cell.closest('.__cal__');

            let dt = cal.classList.contains('left')?obj.leftCalendar.calendar[row][col]: obj.rightCalendar.calendar[row][col];

            if(dt.isSame(moment(selected_values['startDate']),'day'))
            {
                
                cell.classList.add('in-range');
                cell.classList.add('start-date');
            }
            else if(dt.isSame(moment(selected_values['endDate']),'day'))
            {

                obj.endDate = moment(selected_values['endDate'])
                
                cell.classList.add('end-date');
                cell.classList.add('in-range');


            }
            else if ((dt.isAfter(obj.startDate) && dt.isBefore(moment(selected_values['endDate']) )) || dt.isSame(moment(selected_values['endDate']), 'day')) 
            {
                cell.classList.add('in-range');
            } 
            else 
            {
                cell.classList.remove('in-range');
            }



        })

        if(selected_values['startDate'] && selected_values['endDate'])
        {
            obj.isEndDateNotFinalized = false;
            applyStyling();
        }
    }

}

/////////////////////////////////CUSTOM METHODS///////////////////////////////--------------------

function applyStyling() {

    let elem;
    if(elem = document.querySelectorAll('td:not(.td-not)')){
        elem.forEach(function(e){
            e.style.color = 'black';
            e.style.background = 'white';

            tdCssObj && Object.entries(tdCssObj).forEach(function([key,val]){

                e.style[key] = val;
            });
        })
    }


    if(elem = document.querySelectorAll('.active'))
    {

        elem.forEach(function(e){
            e.style.color='white';
            e.style.background='rgb(118, 51, 152)';

            onHoverTdCssObj && Object.entries(onHoverTdCssObj).forEach(function([key,val]){

                e.style[key] = val;
            });
        })
        
    }



    if(elem = document.querySelectorAll('.in-range'))
    {

        elem.forEach(function(e){
            e.style.color = 'white';
            e.style.background = 'rgb(143, 136, 177)';
            // e.style.background = '#c4bbeb';

            inRangedTdCssObj && Object.entries(inRangedTdCssObj).forEach(function([key,val]){

                e.style[key] = val;
            });
        })
        
    }

    if(elem = document.querySelector('.current'))
    {
        if(!elem.classList.contains('active'))
        {
        elem.style.color = '#f16d9b';

        currentDateTdCssObj && Object.entries(currentDateTdCssObj).forEach(function([key,val]){

                elem.style[key] = val;
            });
        }
    }

    if(elem = document.querySelector('.start-date'))
    {
        elem.style.color='white';
        elem.style.background='rgb(118, 51, 152)';

        startDateTdCssObj && Object.entries(startDateTdCssObj).forEach(function([key,val]){

                elem.style[key] = val;
            });
    }


    if(elem = document.querySelector('.end-date'))
    {
        elem.style.color='white';
        // elem.style.background='#6759a6';
        elem.style.background='rgb(118, 51, 152)';

        endDateTdCssObj && Object.entries(endDateTdCssObj).forEach(function([key,val]){

                elem.style[key] = val;
            });
       
    }




    if(elem = document.querySelectorAll('.disabled'))
    {

        elem.forEach(function(e){
           

            // e.style = objec;
            e.style.color = 'black';
            e.style.opacity = '0.3';
            e.style.textDecoration = 'line-through';
            e.style.cursor = 'not-allowed';
            e.style.background = 'white';

            disabledDatesTdCssObj && Object.entries(disabledDatesTdCssObj).forEach(function([key,val]){

                e.style[key] = val;
            });
        })
        
    }
}


function onHoverAfterStartDate (e){

    if (e.target.classList.contains('not-available')) return;

    if(obj.startDate && obj.isEndDateNotFinalized)
    {

        // console.log(obj.startDate,obj.endDate,obj.isEndDateNotFinalized,'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
        let currentHovered = e.target;



        let title = currentHovered.dataset.title;

        let row = title.substr(1,1);
        let col = title.substr(3,1);

        let cal = currentHovered.closest('.__cal__');

        let date = cal.classList.contains('left')?obj.leftCalendar.calendar[row][col]: obj.rightCalendar.calendar[row][col];

        document.querySelectorAll('.__cal__ tbody td').forEach(function(cell){

            // console.log(cell);
            if(!cell.dataset.title)
                return;
            let title = cell.dataset.title;



            let row = title.substr(1,1);
            let col = title.substr(3,1);

            let cal = cell.closest('.__cal__');

            let dt = cal.classList.contains('left')?obj.leftCalendar.calendar[row][col]: obj.rightCalendar.calendar[row][col];

            if ((dt.isAfter(obj.startDate) && dt.isBefore(date)) || dt.isSame(date, 'day')) 
            {
                cell.classList.add('in-range');
            } 
            else 
            {
                cell.classList.remove('in-range');
            }

        });

        // console.log(cal.classList.contains('left'));

    }
}

function getDateFromTarget (eDotTarget) {

        let currentTraget = eDotTarget;

        let title = currentTraget.dataset.title;

        let row = title.substr(1,1);
        let col = title.substr(3,1);

        let cal = currentTraget.closest('.__cal__');

        let date = cal.classList.contains('left')?obj.leftCalendar.calendar[row][col]: obj.rightCalendar.calendar[row][col];

        return date;
}

