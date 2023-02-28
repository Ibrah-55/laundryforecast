import React, { Component } from 'react';

class Apps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        to: '',
        body: ''
      },
      submitting: false,
      error: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ submitting: true });
    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.message)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState({
            error: false,
            submitting: false,
            message: {
              to: '',
              body: ''
            }
          });
        } else {
          this.setState({
            error: true,
            submitting: false
          });
        }
      });
  }

  onHandleChange(event) {
    const name = event.target.getAttribute('name');
    this.setState({
      message: { ...this.state.message, [name]: event.target.value }
    });
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        className={this.state.error ? 'error sms-form' : 'sms-form'}
      >
  <div className="min-h-screen bg-gray-100 flex justify-center items-center ">
	<div className="container mx-auto bg-indigo-500 rounded-lg p-14 md:w-1/2">
			<h1 className="text-center font-bold text-white text-4xl">Keep track of changes</h1>
				<p className="mx-auto font-normal text-sm my-6 max-w-lg">Enter your Phone number staring with your country code.</p>
          
      <br />
      <div className=" items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
          <label htmlFor="to"> Phone Number:</label>
          <input
            type="tel"
            name="to"
            id="to"
            placeholder=' E.g: +254...'
            value={this.state.message.to}
            onChange={this.onHandleChange}
          />
          </div>
          <br />
          <div className="items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
          <label htmlFor="body">Your Name:</label>
          <input
            name="body"
            id="body"
            value={this.state.message.body}
            onChange={this.onHandleChange}
          />
				</div>
        <div className="items-center px-2 rounded-lg space-x-4 mx-auto ">
          <br/>
        <button className="block uppercase mx-auto shadow 
        bg-blue-400 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded" type='submit' disabled={this.state.submitting}>Send Message</button>
					
          
					</div>
	</div>
</div>


        
      </form>
    );
  }
}

export default Apps;