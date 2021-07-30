import './App.css';
import { Component } from 'react';
import UserProfileArticleDetail from './UserProfileArticleDetail';
import Cookies from 'js-cookie';

class UserProfileArticles extends Component {
  constructor(props){
    super(props);
    this.state = {
      articles: [],
    }
    this.deleteArticle = this.deleteArticle.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
  };

  componentDidMount() {
    fetch('api/v1/articles/user_article/')
    .then(response => response.json())
    .then(data => this.setState({ articles: data }));

  }

  deleteArticle(id) {
    const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
      },
    }
    fetch(`api/v1/articles/user_article/${id}/`, options)
    .then(response => {
      if(!response.ok){
        throw new Error('Network response was not ok');
      }
      const articles = [ ...this.state.articles];
      const index = articles.findIndex(article => article.id === id);
      articles.splice(index, 1);
      this.setState({articles});
    })
  }

  updateArticle(article){
    const id = article.id;

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(article),
    }
    fetch(`api/v1/articles/user_article/${id}/`, options)
      .then(response => {
        if(!response.ok) {
          throw new Error('Network response was not ok')
        }
        const articles = [ ...this.state.articles];
        const index = articles.findIndex(article => article.id === id);
        articles[index] = article;
        this.setState({ articles });
      });
  }

  render() {
    const articleDisplay = this.state.articles.map((article) => (
      <UserProfileArticleDetail key={article.id} article={article} deleteArticle={this.deleteArticle} updateArticle={this.updateArticle}/>
    ));
    return (
      <>
        <div className="row">
          <div className="col-md-8 blog-main">
            {articleDisplay}
          </div>
        </div>
      </>
    )
  }
}
export default UserProfileArticles
