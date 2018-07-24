import React, { Component } from 'react';
import moment from 'moment';

import BookingCalendar from "../BookingCalendar/BookingCalendar.js";
import BookingForm from "../BookingForm/BookingForm.js";
import { forbiddenDays, bookingCities } from "../../helpers/initialData.js";

import './Booking.css';

class Booking extends Component {

    static propTypes = {};

    static defaultProps = {};

    state = {
        dateContext: moment(),
        today: moment(),
        selectedDay:  moment().format("D"),
        selectedMonth: moment().format("MMMM")
    }

    handleNextMonth = (e) => {
        let dateContext = Object.assign({}, this.state.dateContext);

        if (moment(dateContext).get("month") < 11) {
	        dateContext = moment(dateContext).add(1, "month");

	        this.setState({
	            dateContext: dateContext
	        });        	
        }
    }

    handlePrevMonth = (e) => {
        let dateContext = Object.assign({}, this.state.dateContext);

        if (moment(dateContext).get("month") > 0) {
	        dateContext = moment(dateContext).subtract(1, "month");

	        this.setState({
	            dateContext: dateContext
	        });
        }	        
    }

    handleSelectDay = (e, day, month) => {
        this.setState({
            selectedDay: day,
            selectedMonth: month
        }, () => {
            console.log("SELECTED DAY: ", this.state.selectedDay);
            console.log("SELECTED MONTH: ", this.state.selectedMonth);
        });
    }

	render() {
	    return (
	        <div className="booking">
	        	<BookingCalendar
	        		{ ...this.state }
	        		forbiddenDays={forbiddenDays}
	        		triggerNextMonth={this.handleNextMonth}
	        		triggerPrevMonth={this.handlePrevMonth}
	        		triggerSelectDay={this.handleSelectDay}
	        	/>
                <BookingForm
                    bookingCities={bookingCities}
                />
	        </div>
	    );
	}
}

export default Booking;