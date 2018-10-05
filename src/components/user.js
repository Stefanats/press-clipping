import React from 'react';
import Hoc from './hoc/hoc';
import ArticleSearch from './user/articleSearch/index';

@Hoc
class User extends React.Component {
  render() {
    return (
      <div style={{padding:"50px"}}>
          <ArticleSearch />
      </div>
    )
  }
}

export default User;
