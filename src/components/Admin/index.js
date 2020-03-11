import React, { Component } from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
    };
  }
  componentDidMount() {
    console.log('AdminPage did mount');
    this.setState({ loading: true });
    this.props.firebase.users().on("value", snapshot => {
      console.log(snapshot.val());
      console.log('user');
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));
      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }
  componentWillUnmount() {
    console.log('AdminPage will unmount');
    this.props.firebase.users().off();
  }
  render() {
    const { users, loading } = this.state;
    return (
      <div>
        <h1>Admin</h1>
        {loading && <div>Loading ...</div>}
        <UserList users={users} />
      </div>
    );
  }
}
const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);
const condition = authUser => !!authUser;
export default withAuthorization(condition)(AdminPage); 