import './App.css';
import { Component } from 'react';
import Cookies from 'js-cookie';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_name: '',
      avatar: null,
      preview: '',
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  handleImage(e) {
    let file = e.target.files[0];
    this.setState({
      avatar: file,
    });

    console.log(this.state.avatar)

    // Allows use to read the contents of the file is asynchronous
    let reader = new FileReader();
    // Same as .then will wait until file is read and then set the value to state
    reader.onloadend = () => {
      this.setState({
        preview: reader.result,
      });
    }
    // Read the data file as as url
    reader.readAsDataURL(file);
  }

  async handleSubmit(event) {
      event.preventDefault();
      let formData = new FormData();
      formData.append('avatar', this.state.avatar);
      formData.append('display_name', this.state.display_name);

      const options = {
        method: 'POST',
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
        },
        body: formData,
      }
      const response = await fetch('api/v1/users/profiles/', options);
      console.log(response);

      this.props.handleNavigation('profile');
    }



  render() {
    console.log(this.props.handleNavigation)
  return (
    <>
    <form onSubmit={this.handleSubmit}>
      <div className="container App-header">
        <h2>User Profile</h2>
          <div className="card">
            <input type="file" name="avatar" onChange={this.handleImage}/>
            <input className="card-img-top" type="text" name="display_name" value={this.state.display_name} onChange={this.handleInput} placeholder="Enter a Display Name"/>
            <div className="card-body">
            <button type="submit" className="btn btn-primary edit-profile">Save your profile!</button>
          </div>
        </div>
    </div>
  </form>
    </>
  );
  }
}

export default CreateProfile;
