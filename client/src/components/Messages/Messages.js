import React, { Component } from 'react';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3002');

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.buildMessage = this.buildMessage.bind(this);
  }

  buildMessage(e) {
    const name = e.target.name;
    const input = e.target.value;
    this.setState({
      [name]: input
    });
  }

  sendMessage() {
    socket.emit('example_message', this.state.message);
    this.setState({
        message: ''
    })
  }

  render() {
    return (
      <div className="container">
        <br />
        <div className="jumbotron">
          <h1 className="display-4">Send Message</h1>
          <textarea
            name="message"
            type="text"
            id="message"
            className="form-control"
            placeholder="Your Message Here"
            onChange={this.buildMessage}
            value={this.state.message}
          />
          <br />
          <button
            onClick={this.sendMessage}
            id="send"
            className="btn btn-success"
          >
            Send
          </button>
        </div>
        <div id="messages" />
      </div>
    );
  }
}

export default Messages;
