import { Component } from 'react';
import Moment from 'react-moment';

class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
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
    this.props.updateArticle(article)
  }

  render() {
    let isStaff = localStorage.getItem("isStaff")
    const article = this.props.article
    const dateToFormat = article.created_at
    const published = article.published
    const adminarticle =    [<div className="col-md-8 blog-main">
            <h2 className="blog-post-title">{article.title}</h2>
            <p className="blog-post-meta"><time><Moment format="MM/DD/YYYY">{dateToFormat}</Moment></time><span> by {article.owner}</span></p>
            <p>{article.body}</p>
            <hr/>
          </div>]
    return(
      <>
      {isStaff
      ? adminarticle
      : published && adminarticle
      }

      </>
    )
  }
}
export default ArticleDetail
