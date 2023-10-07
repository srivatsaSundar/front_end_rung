import React, { Component } from 'react';
import Icofont from 'react-icofont';
import '../static//citysearch.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface MyComponentState {
  showDiv: string | null;
  selectedDate: Date | null;
}

class CitySearch extends Component<{}, MyComponentState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      showDiv: 'first',
      selectedDate: null,
    };
  }
 
  render() {
    return (
      <div className='citysearch'>
        <div className='box'>
        <nav>
          <div className='button'>
            
            <button className='button-1' onClick={()=>{this.setState({showDiv:'first'})}}>Home Delivery</button>
            <button className='button-2' onClick={()=>{this.setState({showDiv:'second'})}}>Take away</button>
          </div>
        </nav>
        <div className='line'>
        {this.state.showDiv === 'first' ?
         <div className="home-delivery" id="homeDeliverySection">
         <form>
          <div className='label-food'>
           <label>Time to order food</label>
           </div>
           <div className='search-pin'>
           <input placeholder='Enter your pincode here' type='text'/>
           <button > <Icofont className="icon-pin" icon="icofont-search"  /> Search</button>
           </div>
         </form>
       </div>
          : null}
          
        {this.state.showDiv === 'second' ?
              
        <div className="take-away" id="takeAwaySection">
        <form>
          <div  className='label-food'>
          <label >Select date and time</label>
          </div>
          <div className='search-td'>
          <DatePicker
          selected={this.state.selectedDate}
          onChange={(date) => this.setState({ selectedDate: date })}
          dateFormat="MM/dd/yyyy"
          placeholderText="MM/DD/YYYY"
        />
       
       <select className='search-time' defaultValue="18:00">
    
      {Array.from({ length: 13 }, (_, i) => {
        const hour = 18 + Math.floor(i / 4);
        const minute = (i % 4) * 15;
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
         const pm ='PM';
        return (
          <option key={time} value={time}>
            {time} {pm}
          </option>
        );
      })}
    </select>
          <button className='search-button'> <Icofont className="icon-pin" icon="icofont-search"  />Search</button>
          </div>
        </form>
      </div>
          : null}
          </div>
          </div>

     <div>
     
      <ul className='icons-catch'>
        <div className='list-item'>
          <li>
            <Icofont className="icons" icon="icofont-fast-food" size="3"/>
            <p>Select Food</p>
          </li>
        </div>
        <div className='list-item'>
          <li>
            <Icofont className="icons" icon="icofont-food-basket" size="3" />
            <p>Order Food</p>
          </li>
        </div>
        <div className='list-item'>
          <li>
            <Icofont className="icons" icon="icofont-fast-delivery" size="3"/>
            <p>Delivery At Your Door Step</p>
          </li>
        </div>
      </ul>
    </div>
      </div>
    );
  }
}

export default CitySearch;