import { Component } from 'react';
import './App.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleLogin(this.state);
  }

  render() {
    return(
      <div className="signup-form">
        <form onSubmit={this.handleSubmit}>
          <h2>Sign In</h2>
          <p className="hint-text">"Create your account. It's free and only takes a minute."</p>
            <div className="form-group">
              <input className="username form-control" id="username" name="username" placeholder="Username" required="required" onChange={this.handleInput}/>
            </div>
            <div className="form-group">
              <input className="email form-control" id="email" name="email" placeholder="Email" required="required" onChange={this.handleInput}/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control" id="password" name="password" placeholder="Password" required="required" onChange={this.handleInput}/>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-success btn-lg btn-block">Log In</button>
            </div>
        </form>
        <div className="text-center">Already have an account?<button type="button" className="btn" onClick={() => this.props.handleNavigation('signup')}>Register!</button></div>
      </div>
    )
  }
}

export default Login
