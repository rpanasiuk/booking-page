import React from 'react';
import moment from 'moment';

import './BookingCalendar.css';

const BookingCalendar = ({ ...props }) => {

	const weekdays 			= moment.weekdays();
	const weekdaysShort 	= moment.weekdaysShort();

    const month = () => {
        return props.dateContext.format("MMMM");
    };

    const daysInMonth = () => {
        return props.dateContext.daysInMonth();
    };

    const firstDayOfMonth = () => {
    	// returns index in range(0,6)

        return moment(props.dateContext).startOf('month').format('d');
    };

    const createDayElement = (day, forbiddenDaysArray, newClass) => {
    	let enableOnClick = true;

    	if (props.dateContext.get("month") < props.today.get("month")) {
        	newClass += " calendar__day--forbidden";
        	enableOnClick = false;

    	} else if (day < props.today.format("D") && props.today.format("MMMM") == month()) {
        	newClass += " calendar__day--forbidden";
        	enableOnClick = false;

        } else if (forbiddenDaysArray && forbiddenDaysArray.length && forbiddenDaysArray.includes(day)) {
       		newClass += " calendar__day--dot";
       		enableOnClick = false;

        } else if (day == props.selectedDay && props.selectedMonth == month()) {
        	newClass += " calendar__day--selected";
        	enableOnClick = false;
        }

    	return (
    		<td key={day} className={newClass}>
                {enableOnClick
                	? <span onClick={(e)=>{props.triggerSelectDay(e, day, month())}}>{day}</span>
                	: <span>{day}</span>
                }
            </td>
        );
    };

	const createDayElementsList = () => {
	    const daysInMonthArray = [];
    	const forbiddenNumArray = props.forbiddenDays[month()];
    	const newClass = "calendar__day";	    

	    for (let d = 1; d <= daysInMonth(); d++) {
	        const day = createDayElement(d, forbiddenNumArray, newClass);

	        daysInMonthArray.push(day);
	    }

	    return daysInMonthArray;
	};

	const createRowElements = (rows) => {
		return rows.map((days, i) => {
		    return (
		        <tr key={i*100} className="calendar__row">
		            {days}
		        </tr>
		    );
		}
	)};

	const createWeekDayElements = (weekdays) => {
		return weekdays.map((day, i) => {
	        return <td key={day} className="calendar__weekdays-day">{day.slice(0,1)}</td>
	    });
	};

	const createBlankElements = () => {
	    const blanks = [];
	    for (let i = 0; i < firstDayOfMonth(); i++) {
	        blanks.push(
	        	<td key={i * 80} className="calendar__blank">
	            	<span>{""}</span>
	            </td>
	        );
	    }	

	    return blanks;	
	};

	const splitCellsForRows = (blanks, days) => {
	    const totalSlots = [...blanks, ...days];
	    const rows = [];
	    let cells = [];

	    totalSlots.forEach((row, i) => {
	        if ((i % 7) !== 0) {
	            cells.push(row);
	        } else {
	            const insertRow = cells.slice();
	            cells = [];

	            rows.push(insertRow);                
	            cells.push(row);
	        }

	        if (i === totalSlots.length - 1) {
	            const insertRow = cells.slice();
	            rows.push(insertRow);
	        }
	    });

	    return rows;	
	};

	const weekdaysArray = createWeekDayElements(weekdays);
	const blanksArray = createBlankElements();
	const daysArray = createDayElementsList();
	const cellsArray = splitCellsForRows(blanksArray, daysArray);
	const rowsArray = createRowElements(cellsArray);

    return (
        <div className="booking__calendar">
            <table className="calendar">
                <thead className="calendar__header">
                    <tr className="calendar__month">
                        <td colSpan="7" className="calendar__nav">
                            <i className="calendar__nav-prev fa fa-fw fa-chevron-left"
                                onClick={(e) => props.triggerPrevMonth(e)}>
                            </i>
                            <span>{month()}</span>
                            <i className="calendar__nav-next fa fa-fw fa-chevron-right"
                                onClick={(e) => props.triggerNextMonth(e)}>
                            </i>
                        </td>
                    </tr>
					<tr className="calendar__weekdays">
						{weekdaysArray}
					</tr>
                </thead>
                <tbody className="calendar__body">
                    {rowsArray}
                </tbody>
            </table>
        </div>   	
    );
};

export default BookingCalendar;