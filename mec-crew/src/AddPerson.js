import React, { Component } from 'react';
import fire from './fire.js';

class AddPerson extends Component {

    constructor() {
        super();
        this.state = {
          personName: '',
          tshirtSize: '',
          jacketSize: '',
          pantLeg: '',
          pantWaist: '',
          shoeSize: '',
          notes: '',
          items: [],
          user: '',
          initRedirect: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }

    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = fire.database().ref('people');
        const item = {
          person: this.state.personName,
          tshirtSize: this.state.tshirtSize,
          jacketSize: this.state.jacketSize,
          pantLeg: this.state.pantLeg,
          pantWaist: this.state.pantWaist,
          shoeSize: this.state.shoeSize,
          notes: this.state.notes,
          user: this.props.user.email
        }
        alert(this.state.personName + ' Added! Find them in "Crew"');
        itemsRef.push(item);
        this.setState({
          personName: '',
          tshirtSize: '',
          jacketSize: '',
          pantLeg: '',
          pantWaist: '',
          shoeSize: '',
          notes: '',
          user: ''
        });
        
      }


  render() {      
    return (
        <section className='add-item'>
        <form onSubmit={this.handleSubmit}>
          <input required type="text" name="personName" placeholder="What's their name?" onChange={this.handleChange} value={this.state.personName}/>
          <input type="text" name="tshirtSize" placeholder="Tshirt Size" onChange={this.handleChange} value={this.state.tshirtSize} />
          <input type="text" name="jacketSize" placeholder="Jacket Size" onChange={this.handleChange} value={this.state.jacketSize} />
          <input type="text" name="pantLeg" placeholder="Pant Leg" onChange={this.handleChange} value={this.state.pantLeg} />
          <input type="text" name="pantWaist" placeholder="Waist Size" onChange={this.handleChange} value={this.state.pantWaist} />
          <input type="text" name="shoeSize" placeholder="Whats their shoe size?" onChange={this.handleChange} value={this.state.shoeSize} />
          <input type="text" name="notes" placeholder="Notes" onChange={this.handleChange} value={this.state.notes} />
          <button className="person-add" >Add</button>
        </form>
    
    </section> 
    );
  }
}
export default AddPerson;