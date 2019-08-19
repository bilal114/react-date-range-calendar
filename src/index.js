import React, {Component,Fragment} from 'react'
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './moment.js';
import './scripts.js';
import initiate,{moveToPrevious,moveToNext} from './scripts.js';
import styled,{createGlobalStyle} from 'styled-components';


// default data 

const YearOptions = (
	<Fragment>
				    <option value="1990">1990</option>
		            <option value="1991">1991</option>
		            <option value="1992">1992</option>
		            <option value="1993">1993</option>
		            <option value="1994">1994</option>
		            <option value="1995">1995</option>
		            <option value="1996">1996</option>
		            <option value="1997">1997</option>
		            <option value="1998">1998</option>
		            <option value="1999">1999</option>
		            <option value="2000">2000</option>
		            <option value="2001">2001</option>
		            <option value="2002">2002</option>
		            <option value="2003">2003</option>
		            <option value="2004">2004</option>
		            <option value="2005">2005</option>
		            <option value="2006">2006</option>
		            <option value="2007">2007</option>
		            <option value="2008">2008</option>
		            <option value="2009">2009</option>
		            <option value="2010">2010</option>
		            <option value="2011">2011</option>
		            <option value="2012">2012</option>
		            <option value="2013">2013</option>
		            <option value="2014">2014</option>
		            <option value="2015">2015</option>
		            <option value="2016">2016</option>
		            <option value="2017">2017</option>
		            <option value="2018">2018</option>
		            <option value="2019">2019</option>
		            <option value="2020">2020</option>
		            <option value="2021">2021</option>
		            <option value="2022">2022</option>
		            <option value="2023">2023</option>
		            <option value="2024">2024</option>
		            <option value="2025">2025</option>
		            <option value="2026">2026</option>
		            <option value="2027">2027</option>
		            <option value="2028">2028</option>
		            <option value="2029">2029</option>
		            <option value="2030">2030</option>
	</Fragment>
	);

const monthOptions = (
	<Fragment>
						<option value="0">Jan</option>
		                <option value="1">Feb</option>
		                <option value="2">Mar</option>
		                <option value="3">Apr</option>
		                <option value="4">May</option>
		                <option value="5">Jun</option>
		                <option value="6">Jul</option>
		                <option value="7">Aug</option>
		                <option value="8">Sep</option>
		                <option value="9">Oct</option>
		                <option value="10">Nov</option>
		                <option value="11">Dec</option>
	</Fragment>
	);
// styling 

const LeftArrowBtn = styled.span`
	font-size: 30px;
    padding: 0 9px 3px 10px;
    width: 8%;
    margin-left: 2%;
	&:hover {
		color : white;
        background : rgb(103, 89, 166);
        cursor: pointer;
	}

`;

const RightArrowBtn = styled.span`
	font-size: 30px;
    padding: 0 8px 3px 11px;
    width: 8%;
    margin-left: 2px;
	&:hover {
		color : white;
        background : rgb(103, 89, 166);
        cursor: pointer;
	}

`;

const LeftMonthYear = styled.span`
	padding-top: 14px;
    padding-left:30%;
	width : 90%;
`;

const RightMonthYear = styled.span`
	padding-top: 14px;
    padding-left:38%;
	width : 90%;
`;

const LeftCalHeader = styled.div`
	max-height: 70px;
    background : white;
`;


const RightCalHeader = styled.div`
	max-height: 70px;
    padding-right:5px;
    margin-right: 4px;
    background : white;
`;

const Th = styled.th`
	color:#bab5bf;
`;

const GlobalStyle = createGlobalStyle`
  	*{
    	border: none !important;
  	}
    .card {
        background: white !important;
        background-color: white !important;
    }
    .right{
        margin-left:0px;    padding-left:0px;
    }
    .hide {
        display: none;
    }

    .__cal__{
        max-width: 400px;
        min-width: 400px;
    }
  

`


export default class extends Component {


	componentDidMount() {

		initiate(this.props);

	}

  render() {
    return (
    	<Fragment>
    	
		<div className="row" style={{maxWidth:'100%'}}>
		    <div className="col-lg-5 __cal__ card left"  >  
		        <LeftCalHeader className="card-header row" ><LeftArrowBtn onClick={moveToPrevious} >&#8249;</LeftArrowBtn><LeftMonthYear id="monthAndYear1"></LeftMonthYear></LeftCalHeader>
		        <table className="table"  >
		            <thead>
		            <tr>
		                <Th>Su</Th>
		                <Th  style={{maxWidth:'50px',width:'50px'}}>Mo</Th>
		                <Th>Tu</Th>
		                <Th>We</Th>
		                <Th>Th</Th>
		                <Th>Fr</Th>
		                <Th>Sa</Th>
		            </tr>
		            </thead>

		            <tbody id="calendar-left-body">

		            </tbody>
		        </table>

		        <div className="form-inline hide">

		            <button className="btn btn-outline-primary col-sm-6" id="previous" onClick={this.previous}>Previous</button>

		            <button className="btn btn-outline-primary col-sm-6" id="next" onClick={this.next}>Next</button>
		        </div>
		        <br/>
		        <form className="form-inline hide">
		            <label className="lead mr-2 ml-2" htmlFor="month">Jump To: </label>
		            <select className="form-control col-sm-4" name="month1" id="month1" onChange={this.jump}>
		                {monthOptions}
		            </select>


		            <label htmlFor="year"></label><select className="form-control col-sm-4" name="year1" id="year1" onChange={this.jump}>
		            	{YearOptions}
		        </select></form>
		    </div>
		    <div className="col-lg-5 card __cal__  right ml-2 ml-xs-2" >
		        <RightCalHeader className="card-header row" ><RightMonthYear id="monthAndYear2"></RightMonthYear><RightArrowBtn onClick={moveToNext} >&#8250;</RightArrowBtn></RightCalHeader>
		        <table className="table ">
		            <thead>
		            <tr>
		                <Th>Su</Th>
		                <Th>Mo</Th>
		                <Th>Tu</Th>
		                <Th>We</Th>
		                <Th>Th</Th>
		                <Th>Fr</Th>
		                <Th>Sa</Th>
		            </tr>
		            </thead>

		            <tbody id="calendar-right-body">

		            </tbody>
		        </table>

		        <div className="form-inline hide" >

		            <button className="btn btn-outline-primary col-sm-6" id="previous2" onClick={this.previousSec}>Previous</button>

		            <button className="btn btn-outline-primary col-sm-6" id="next2" onClick={this.nextSec} >Next</button>
		        </div>
		        <br/>
		        <form className="form-inline hide">
		            <label className="lead mr-2 ml-2" htmlFor="month">Jump To: </label>
		            <select className="form-control col-sm-4" name="month" id="month2" onChange={this.jump}>
		                {monthOptions}
		            </select>


		        


		            <label htmlFor="year"></label><select className="form-control col-sm-4" name="year1" id="year2" onChange={this.jump}>
		            {YearOptions}
		        </select></form>

		    		</div>

				</div>
			<GlobalStyle/>
    </Fragment>)
  }
}
