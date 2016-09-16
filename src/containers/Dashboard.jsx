import React, { PropTypes as T } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const Dashboard = ({ data }) => {
  if (data.loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div>Current user email is {data.user.email}.</div>
      <div>
        Current user permissions are
        <ul>
          {data.user.permissions.map(type => <li>{type}</li>)}
        </ul>
      </div>
      <div>
        Current district member is {data.district.member},
        reachable at {data.district.email} or {data.district.phone}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  data: T.shape({
    loading: T.bool.isRequired,
    user: T.shape({
      permissions: T.string,
      email: T.string
    }),
    district: T.shape({
      member: T.string,
      phone: T.string,
      email: T.string
    })
  }).isRequired
};

const Query = gql`
  query TestQuery($userEmail: String!, $id: String!) {
    user(email: $userEmail) {
      permissions
      email
    }
    district(id: $id) {
      member
      phone
      email
    }
  }
`;

export default graphql(Query, {
  options: { variables: { userEmail: 'testing.email@email.com', id: '05' } }
})(Dashboard);