import React, { Component } from 'react';
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
        <nav>
          <div>
            <button onClick={()=>{this.setState({showDiv:'first'})}}>Home Delivery</button>
            <button onClick={()=>{this.setState({showDiv:'second'})}}>Take away</button>
          </div>
        </nav>
        {this.state.showDiv === 'first' ?
         <div className="home-delivery" id="homeDeliverySection">
         <form>
           <label>Time to order food</label>
           <input placeholder='Enter your pincode here' type='text'/>
           <button>Search</button>
         </form>
       </div>
          : null}
        {this.state.showDiv === 'second' ?
              
        <div className="take-away" id="takeAwaySection">
        <form>
          <label>Select date and time</label>
          <input type='date'/>
          <input type='time'/>
          <button>Search</button>
        </form>
      </div>
          : null}
        <div>
          
        </div>
      </div>
    );
  }
}

export default CitySearch;
