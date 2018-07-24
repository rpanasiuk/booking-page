import React, { Component } from 'react';

import './BookingForm.css';

class BookingForm extends Component {

    static propTypes = {};

    static defaultProps = {};

    state = {
        emailInput: '',
        selectedCity: Object.keys(this.props.bookingCities)[2],
        selectedHotel: this.props.bookingCities[Object.keys(this.props.bookingCities)[2]].hotels[2] //refactor
    }

    handleCityChange = (e) => {
    	const city = e.target.value;

    	this.setState({
    		selectedCity: city
    	})
    }

    handleHotelChange = (e) => {
    	const hotel = e.target.value;

    	this.setState({
    		selectedHotel: hotel
    	})
    }    

    onFormSubmit = (e) => {
    	e.preventDefault();
    	console.log(this.state.selectedCity, this.state.selectedHotel);
    }

    createCityElements = (cities) => {
		return Object.keys(cities).map((city, i) => {
			return <option key={i} value={city}>{city}</option>
		});
    }

    createHotelElements = (hotels) => {
		return hotels.map((hotel, i) => {
			return <option key={i*70} value={hotel}>{hotel}</option>
		});    	
    }

	render() {
		const { bookingCities } = this.props;
		const cityElements = this.createCityElements(bookingCities);

		const { hotels } = bookingCities[this.state.selectedCity];
		const hotelElements = this.createHotelElements(hotels);

	    return (
	        <div className="booking__form">
				<form className="form" id="mainBookingForm" onSubmit={this.onFormSubmit}>

					<div className="form__row">
						<label htmlFor="email">Email Address</label>
						<input
							className="form__control"
							type="email"
							id="email"
							name="email"
							placeholder="Email"
						/>
					</div>		

					<div className="form__row">
						<label htmlFor="city">City</label>
						<select className="form__control" value={this.state.selectedCity} name="city" id="city" onChange={this.handleCityChange}>
							{cityElements}
						</select>
					</div>

					<div className="form__row">
						<label htmlFor="hotel">Hotel</label>
						<select className="form__control" value={this.state.selectedHotel} name="hotel" id="hotel" onChange={this.handleHotelChange}>
							{hotelElements}
						</select>
					</div>					

					<div className="form__row form__row--last form__button">
						<button type="submit" className="btn btn--form">book</button>
					</div>						

				</form>	        
	        </div>
	    );
	}
}

export default BookingForm;