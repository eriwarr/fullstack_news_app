import './App.css';
import { Component } from 'react';
import Cookies from 'js-cookie';

class ProfileDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      profile: [],
      isEditing: false,
      display_name : '',
      avatar: null,
      preview: '',
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleEditProfile = this.handleEditProfile.bind(this);
  }

  componentDidMount (){
    fetch('api/v1/users/profiles/user')
      .then(response => response.json())
      .then(data => this.setState({profile: data}));
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value});
  }

  handleImage(event) {
    let file = event.target.files[0];
    this.setState({avatar: file,})

    let reader = new FileReader();
    reader.onloadend = () => {this.setState({preview: reader.result,})};
    reader.readAsDataURL(file);
  }

  async handleEditProfile(event) {
    event.preventDefault();
    let formData = new FormData();
    if (this.state.avatar) {
      formData.append('avatar', this.state.avatar);
      }
    if (this.state.display_name) {
      formData.append('display_name', this.state.display_name);
    }

    const options = {
      method: 'PATCH',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: formData,
    }
    const response = await fetch('api/v1/users/profiles/user/', options)
    console.log(response);
    this.setState({isEditing: false});

  }

  render() {

    return(
      <>
        <form onSubmit={this.handleEditProfile}>
          <div className="container App-header">
            <h2>User Profile</h2>
              <div className="card">
                {this.state.isEditing
                  ? <input className="card-img-top" type="file" name="avatar" onChange={this.handleImage}/>
                  : <img className="card-img-top" src={this.state.profile.avatar} alt="profile"/>
                }
                <div className="card-body">
                {this.state.isEditing
                  ? <input className="card-title" type="text" name="display_name" value={this.state.display_name} onChange={this.handleInput} placeholder={this.state.profile.display_name}></input>
                  : <h4 className="card-title">{this.state.profile.display_name}</h4>
                }

                  <p className="card-text">Hi {this.state.profile.display_name}! Time to get blogging! Click view posts to see your contributions.</p>
                {
                  this.state.isEditing
                  ? <button type="submit" className="btn btn-primary edit-profile">Save Profile</button>
                  : <button type="button" key="eric" className="btn btn-primary edit-profile" onClick={()=> this.setState({isEditing: true})}>Edit Profile</button>
                }
                <button className="btn btn-primary edit-profile" onClick={()=> this.props.handleNavigation('user-profile-articles')}>View Posts</button>
              </div>
            </div>
          </div>
      </form>
      </>
    )
  }
}
export default ProfileDetail
