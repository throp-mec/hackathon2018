import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import fire from './fire.js';

class People extends Component {

    constructor() {
        super();
        this.personRef = React.createRef();
        this.state = {
          className: 'hidden',
          label: 'Details'
        }
        this.removeItem = this.removeItem.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
        this.showDetails = this.showDetails.bind(this);
      }

    removeItem(itemId) {
        const itemRef = fire.database().ref(`/people/${itemId}`);
        itemRef.remove();
    }

    removeProduct(item, count) {
        console.log(item);
        console.log(count);
        
        console.log(this.props.people);
        
    }

    showDetails() {
        if (this.state.className === 'hidden') {
            this.setState({className: 'show', label: 'Hide'});
        } else {
            this.setState({className: 'hidden', label: 'Details'});
        }
    }

  render() {
    return (
        <div className='wrapper'>   
            <section className='display-item'>
                <div className="wrapper">
                
                <ul className="person-ul">
                    {this.props.people.map((item) => {
                    if (this.props.user.email === item.user) {
                        let products = '';
                        if (item.products !== undefined) {
                            products = item.products;
                        }
                        let productsArr = Object.values(products);
                        return (
                            <li key={item.id} ref={this.personRef} className="person">
                            
                            <div className="person-title">
                             <h3><i className="far fa-user-circle"></i> {item.person}</h3>
                             <div className="person-buttons">
    
                                <button  className="person-show-details" onClick={() => this.showDetails(item.id)}>{this.state.label} <i className="fas fa-angle-double-down"></i> </button>
                                
                                <button className="person-remove" onClick={() => this.removeItem(item.id)}><i className="far fa-times-circle fa-2x"></i></button>
                             </div>
    
                            </div>
                
                            <div className={this.state.className}>
                                <div className="person-details">
                                    {item.tshirtSize &&  <p>Tshirt: {item.tshirtSize}</p>}
                                    {item.jacketSize &&  <p>Jacket: {item.jacketSize}</p>}
                                    {item.pantLeg &&  <p>Pant Leg: {item.pantLeg}</p>}
                                    {item.pantWaist &&  <p>Pant Waist: {item.pantWaist}</p>}
                                    {item.shoeSize &&  <p>Shoe Size: {item.shoeSize}</p>}
                                    {item.notes &&   <p>Notes: {item.notes}</p>}
                                    
                                </div>
                                <h4 className="person-products-title">Products for {item.person}</h4>
                                <div className="person-products">
                                    {productsArr.map((product, i) => {
                                        let url = product.product.web_url,
                                            price = "";                                        
                                        if(product.product.list_price_range) {
                                            price = product.product.list_price_range.from.amount;
                                        } else {
                                            price = product.product.list_price.amount;
                                        }
                                        
                                        return (
                                            <div key={product.product.product_code} className="person-product-tile">
                                                <img className="person-product-image" alt="" src={product.product.default_image_urls.small_image_url} />
                                                <div className="person-product-desc">
                                                    <p >{product.product.name} by {product.product.brand}</p>

                                                </div>
                                                <h5 className="person-product-price">${price}</h5>
                                                <div className="person-product-buttons">
                                                    <button 
                                                        className="person-product-del-btn"
                                                        onClick={() => this.removeProduct(product, i)}
                                                    ><i className="fas fa-times fa-2x"></i></button>
                                                    <button 
                                                        className="person-product-btn"
                                                        onClick={()=> window.open(url, "_blank")}
                                                    ><i className="fas fa-shopping-cart fa-2x"></i></button>
                                                </div>
                                               
                                            </div>

                                        )
                                    })}

                                </div>
                                <Link to="/search">
                                    <h3 className="person-shopfor">Shop for {item.person}</h3>
                                </Link>
                                
                            </div>
                            
                            </li>
                        )
                    }
                    

                    })}
                </ul>
                </div>
            </section>
        </div>
    );
  }
}
export default People;