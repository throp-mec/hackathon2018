import React, { Component } from 'react';
import axios from 'axios';
import ProductTile from './ProductTile';

class Search extends Component {
    
    constructor() {
        super();
        this.state = {
         searchQuery: '',
         products: [],
         searching: false
        }
        this.updateSearchQuery = this.updateSearchQuery.bind(this); 
        this.submitForm = this.submitForm.bind(this)
      }

    updateSearchQuery(input) {
        this.setState({searchQuery: input})
    }

    submitForm(e) {
        e.preventDefault();
        this.setState({searching: true});
        this.fetchData(this.state.searchQuery);
    }

    fetchData(query) {
        axios.get('https://cors-anywhere.herokuapp.com/https://www.mec.ca/api/v1/products/search?keywords='+query)
    .then((response) => {
      this.setState({ products : response.data.products, searching: false })
    })
    .catch((error) => { console.error(error); });
    }
  
    render() {
    return (
      <div className="search-wrapper">
          <h3 className="search-title">Find things they might like</h3>
          <form
              onSubmit={this.submitForm}
              >
              <input
                  className="search-products"
                  type="text"
                  placeholder="Tents, Shoes..."
                  name="product"
                  onChange={(event) => {this.updateSearchQuery(event.target.value)}}
              />
              {this.state.searching === true &&
                <i class="fas fa-spinner fa-3x fa-spin"></i>
              }
              <button className="search-button" type="submit">Search</button>
            </form>
            <div className="product-wrapper">
                {this.state.products !== [] &&
                    this.state.products.map(item => {
                        return (
                            <ProductTile key={item.product_code} item={item} user={this.props.user} people={this.props.people}/>
                        )
                    })
                }
            </div>
      </div>  
    );
  }
}
export default Search;