import React from "react";
import { MDBDataTable } from "mdbreact";
import { connect } from "react-redux";
import { deleteUser, changeStatus } from "../../redux/actions/adminActions";
import { showAlert } from "../alert";

function UserListTable({ users, deleteUser, changeStatus }) {
  let rowsData = [];

  const handleToggle = (id) => {
    changeStatus(id);
  };

  const onDeleteClick = (id) => {
    deleteUser(id);
    showAlert("success", "User Deleted Successfully!");
  };

  users.forEach((user) =>
    rowsData.push({
      userName: user.name,
      designation: user.designation,
      email: user.email,
      active: user.active ? "Active" : "Blocked",
      action: (
        <center>
          <button
            className={`btn btn-link ${
              user.active ? "text-success" : "text-danger"
            }`}
            title={user.active ? "Disable" : "Enable"}
            onClick={() => handleToggle(user._id)}
          >
            <i
              className={`fas ${
                user.active ? "fa-toggle-on" : "fa-toggle-off"
              }`}
            ></i>
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
        label: "User Name",
        field: "userName",
        sort: "asc",
        width: 90,
      },
      {
        label: "Designation",
        field: "designation",
        sort: "asc",
        width: 90,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 90,
      },
      {
        label: "Status",
        field: "active",
        sort: "asc",
        width: 90,
      },
      {
        label: <center>Action</center>,
        field: "action",
      },
    ],
    rows: rowsData,
  };

  return <MDBDataTable striped bordered hover small data={data} />;
}

export default connect(null, {
  deleteUser,
  changeStatus,
})(UserListTable);
