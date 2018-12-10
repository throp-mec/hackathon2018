import React, { Component } from 'react';
import fire from './fire.js';


class ProductTile extends Component {

    constructor() {
        super();
        this.state = {
          currentUser: ''
        }
        this.addProduct = this.addProduct.bind(this); 
      }

    addProduct(product, person) {
        fire.database().ref('/people/' + person.id + '/products/').push({
            product: product,
        });
        alert(product.name + " added to " + person.person + "'s list!");
    }
  
    render() {   
    return (
        <div className='product-tile'>
            <div className="product-info">
                <p key={this.props.item.product_code}>{this.props.item.brand} {this.props.item.name}</p>
                <img className="product-img" alt={this.props.item.name} src={this.props.item.default_image_urls.main_image_url}/>
            </div>
            <div className="add-person-wrapper">
                <h4>Add to someones product list</h4>
                    {this.props.people.map((person) => {
                    if (this.props.user.email === person.user) {
                        return (
                            <button 
                                class="add-product-person-btn"
                                key={person.person} 
                                value={person.person}
                                onClick={() => this.addProduct(this.props.item, person)}
                                >
                                {person.person}
                            </button>
                        )
                    }

                    })}
              
            </div>
        </div>
    );
  }
}
export default ProductTile;