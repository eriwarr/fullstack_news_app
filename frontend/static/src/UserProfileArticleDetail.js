import { Component } from 'react';
import Moment from 'react-moment';

class UserProfileArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      article: this.props.article.body
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value})
  }

  handleEdit() {
    this.setState({isEditing: false})
    const article = this.props.article
    article.body = this.state.article
    this.props.updateArticle(article)
  }

  render() {
    const article = this.props.article
    const dateToFormat = article.created_at

    return(
      <>
      <div className=" blog-main">
        <h2 className="blog-post-title">{article.title}</h2>
        <p className="blog-post-meta"><time><Moment format="MM/DD/YYYY">{dateToFormat}</Moment></time><span> by {article.owner}</span></p>
        {
          this.state.isEditing
          ? <textarea type="text" name="article" value={this.state.article} onChange={this.handleInput}></textarea>
          : <p>{article.body}</p>
        }

        {
          this.state.isEditing
          ? <p className="edit-article">This is your article.<button type="button" className="btn" onClick={this.handleEdit}><i className="icon-edit">Save</i></button></p>
          : article.has_owner_permissions && <p className="edit-article">This is your article.<button type="button" className="btn" onClick={()=> this.setState({ isEditing: true })}><i className="icon-edit">Edit</i></button><button className="btn" onClick={() => this.props.deleteArticle(article.id)}><i className="icon-edit">Delete</i></button></p>
        }
        <hr/>
      </div>
      </>
    )
  }
}
export default UserProfileArticleDetail
