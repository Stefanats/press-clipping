import React from 'react';
import Hoc from './hoc/hoc';

@Hoc
class User extends React.Component {
  render() {
    return (
      <div>
          User
      </div>
    )
  }
}

export default User;
