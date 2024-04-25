import React, { useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import { connect } from 'react-redux';
import { deleteUser, changeStatus } from '../../redux/actions/adminActions';
import { showAlert } from '../alert';
import EditUserForm from './EditUserForm.component';

function UserListTable({ users, deleteUser, changeStatus }) {
  const [modal, setModal] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  let rowsData = [];

  const toggle = () => {
    // clearErrors();
    setModal(!modal);
  };

  const handleToggle = (id) => {
    changeStatus(id);
  };

  const onEditClick = (user) => {
    setCurrentUser(user);
    toggle();
  };

  const onDeleteClick = (id) => {
    deleteUser(id);
    showAlert('success', 'User Deleted Successfully!');
  };

  users.forEach((user) =>
    rowsData.push({
      userName: user.name,
      designation: user.designation,
      email: user.email,
      active: user.active ? 'Active' : 'Blocked',
      action: (
        <center>
          <button
            className={`btn btn-link ${
              user.active ? 'text-success' : 'text-danger'
            }`}
            title={user.active ? 'Disable' : 'Enable'}
            onClick={() => handleToggle(user._id)}
          >
            <i
              className={`fas ${
                user.active ? 'fa-toggle-on' : 'fa-toggle-off'
              }`}
            ></i>
          </button>
          <button
            className="mr-2 btn btn-link edit_modal_btn"
            title="Edit"
            onClick={() => onEditClick(user)}
          >
            <i className="fas fa-sliders-h"></i>
          </button>
          <button
            className="btn btn-link text-danger edit_modal_btn"
            title="Delete"
            onClick={() => onDeleteClick(user._id)}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </center>
      ),
    })
  );
  const data = {
    columns: [
      {
        label: 'User Name',
        field: 'userName',
        sort: 'asc',
        width: 90,
      },
      {
        label: 'Designation',
        field: 'designation',
        sort: 'asc',
        width: 90,
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 90,
      },
      {
        label: 'Status',
        field: 'active',
        sort: 'asc',
        width: 90,
      },
      {
        label: <center>Action</center>,
        field: 'action',
      },
    ],
    rows: rowsData,
  };

  return (
    <>
      <MDBDataTable striped bordered hover small data={data} />
      <EditUserForm user={currentUser} modal={modal} toggle={toggle} />
    </>
  );
}

export default connect(null, {
  deleteUser,
  changeStatus,
})(UserListTable);
