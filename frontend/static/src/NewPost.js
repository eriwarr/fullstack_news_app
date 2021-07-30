import { Component } from 'react';
import Cookies from 'js-cookie';
import './App.css';
import Dropdown from 'react-bootstrap/Dropdown';

class NewPost extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      body: '',
      category: null,
    }
    this.handleInput = this.handleInput.bind(this);
    this.addPost = this.addPost.bind(this);
  }

  handleInput(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  addPost(event) {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(this.state),
    }
    fetch('/api/v1/articles/', options)
      .then(response => response.json());

    this.setState({ title: '', body: ''})
    this.props.handleNavigation('articles')
  }

  render() {
    return (
      <div className="signup-form new-post">
        <form onSubmit={this.addPost}>
          <h2>Create Post</h2>
            <Dropdown className="form-group">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {this.state.category
                  ?  <span>{this.state.category}</span>
                  :  <span>Choose a Category</span>
                }
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={()=> this.setState({category: "Robotics"})}>Robotics</Dropdown.Item>
                <Dropdown.Item onClick={()=> this.setState({category: "Machine Learning"})}>Machine Learning</Dropdown.Item>
                <Dropdown.Item onClick={()=> this.setState({category: "Health Care"})}>Health Care</Dropdown.Item>
                <Dropdown.Item onClick={()=> this.setState({category: "FinTech"})}>FinTech</Dropdown.Item>
                <Dropdown.Item onClick={()=> this.setState({category: "AgriTech"})}>AgriTech</Dropdown.Item>
                <Dropdown.Item onClick={()=> this.setState({category: "Computer Security"})}>Computer Security</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div className="form-group">
              <input className="form-control" name="title" placeholder="What's the name of your blog post?" required="required" onChange={this.handleInput}/>
            </div>
            <div className="form-group">
              <textarea className="form-control" name="body" placeholder="Enter your blog post" required="required" onChange={this.handleInput}></textarea>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-success btn-lg btn-block">Submit</button>
            </div>
        </form>
      </div>
    )
  }
}
export default NewPost;
