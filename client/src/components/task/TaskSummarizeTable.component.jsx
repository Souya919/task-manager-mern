import React, { useState, useEffect } from "react";

import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import dayjs from "dayjs";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import EditTaskModal from "./EditTaskModal.component";
import { getUserTasks } from "../../redux/actions/userActions";
import {
  updateTask,
  geUsertFilterdTasks,
} from "../../redux/actions/taskActions";
import DateForm from "../form/DateForm.component";

import ShowModal from "../form/ShowModal.component";
import LoadingSkeleton from "../loading/LoadingSkeleton.component";

const TaskSummarizeTable = ({
  user,
  tasks,
  getUserTasks,
  updateTask,
  geUsertFilterdTasks,
  loading,
}) => {
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  // let data;

  useEffect(() => {
    getUserTasks();
  }, [isDataChanged, getUserTasks]);

  let rowsData = [];

  if (tasks.length > 0) {
    tasks.forEach((task) => {
      rowsData.push({
        id: task._id,
        createdAt: dayjs(task.createdAt).format("MMMM DD YYYY"),
        taskName: task.taskName,
        progress: task.progress,
        comment:
          task.comment.length >= 25 ? (
            <ShowModal
              buttonLabel={task.comment.substr(0, 25) + "..."}
              data={task.comment}
            />
          ) : (
            task.comment
          ),
        action: <EditTaskModal task={task} />,
      });
    });
  }

  // const options = {
  //   pageStartIndex: 0,
  //   sizePerPage: 5,
  //   hideSizePerPage: true,
  //   hidePageListOnlyOnePage: true,
  // };

  const columns = [
    {
      text: "Assigned Date",
      dataField: "createdAt",
      sort: true,
    },
    {
      text: "Task",
      dataField: "taskName",
      sort: true,
    },
    {
      text: "Progress",
      dataField: "progress",
      sort: true,
    },
    {
      text: "Comment",
      dataField: "comment",
      sort: true,
    },
    {
      dataField: "action",
      text: "Action",
      headerAlign: "center",
      align: "center",
    },
  ];

  const handleBtnClick = (e) => {
    e.preventDefault();
    geUsertFilterdTasks(user.email, fromDate, toDate);
  };

  const handleResetDate = (e) => {
    e.preventDefault();
    setIsDataChanged(!isDataChanged);
  };

  if (loading) return <LoadingSkeleton />;

  return <h5>No tasks assigned yet..</h5>;
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  tasks: state.userReducer.tasks,
  loading: state.userReducer.loading,
});
export default connect(mapStateToProps, {
  getUserTasks,
  updateTask,
  geUsertFilterdTasks,
})(TaskSummarizeTable);

// TODO: save double progress at a time problem
