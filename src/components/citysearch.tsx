import React, { Component } from 'react';
import Icofont from 'react-icofont';
import '../static//citysearch.css';
interface MyComponentState {
  showDiv: string | null;
}

class CitySearch extends Component<{}, MyComponentState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      showDiv: 'first'
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
           <label className='label-food'>Time to order food</label>
           <div >
           <input className='search' placeholder='Enter your pincode here' type='text'/>
           <button >Search</button>
           </div>
         </form>
       </div>
          : null}
          
        {this.state.showDiv === 'second' ?
              
        <div className="take-away" id="takeAwaySection">
        <form>
          <label  className='label-food'>Select date and time</label>
          <div >
          <input className='search' type='date'/>
          <input className='search' type='time'/>
          <button>Search</button>
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
