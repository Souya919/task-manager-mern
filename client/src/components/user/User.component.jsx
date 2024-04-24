import React from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import DailyWorksTable from '../dailyWorks/DailyWorksTable.component';

const User = ({ user }) => {
  return (
    <div className="user-page">
      <div className="container">
        {user && (
          <Row>
            <Col md="8">
              <h5>User name: {user.name}</h5>
            </Col>
            <Col md="4">
              <h5>Designation: {user.designation}</h5>
            </Col>
          </Row>
        )}
        <br />
        <Row>
          <Col lg="12" md="12" sm="12">
            {/* daily works table */}
            <DailyWorksTable />
          </Col>
        </Row>
      </div>
    </div>
  );
};

// TODO: progress change
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(User);
