import React, { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import dayjs from 'dayjs';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import { connect } from 'react-redux';
import {
  getUserWorks,
  saveTodayWork,
} from '../../redux/actions/dailyWorkActions';
import {
  getUserFilterdWorks,
  deleteDailyWorks,
} from '../../redux/actions/dailyWorkActions';
import DateForm from '../form/DateForm.component';

import ShowModal from '../form/ShowModal.component';
import EditModal from './EditModal.component';
import LoadingSkeleton from '../loading/LoadingSkeleton.component';

import { showAlert } from '../alert';
import SaveBtn from '../form/SaveBtn.component';
import CancleBtn from '../form/CancleBtn.component';

const DailyWorksTable = ({
  user,
  isDailyWorkLoading,
  getUserWorks,
  saveTodayWork,
  dailyWorks,
  getUserFilterdWorks,
  deleteDailyWorks,
}) => {
  const [isDataChange, setIsDataChange] = useState(false);
  const [isopen, setIsopen] = useState(false);
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  let rowsData = [];

  const onDeleteClick = (id) => {
    deleteDailyWorks(id);
    showAlert('success', 'Task Deleted Successfully!');
  };

  useEffect(() => {
    if (user) {
      getUserWorks(user._id);
    }
  }, [user, isDataChange, getUserWorks]);

  if (isDailyWorkLoading) return <LoadingSkeleton />;

  if (dailyWorks.length > 0) {
    dailyWorks.forEach((da) =>
      rowsData.push({
        id: da._id,
        date: dayjs(da.createdAt).format('MMMM DD YYYY'),
        title: da.title,
        description:
          da.description.length >= 25 ? (
            <ShowModal
              buttonLabel={da.description.substr(0, 25) + '...'}
              data={da.description}
            />
          ) : (
            da.description
          ),
        status: da.status || 'Planned',
        action: (
          <>
            <EditModal data={da} />
            <button
              className="btn btn-link text-danger edit_modal_btn pl-3"
              title="Delete"
              onClick={() => onDeleteClick(da._id)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </>
        ),
      })
    );
  }

  const options = {
    // pageStartIndex: 0,
    sizePerPage: 5,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
  };
  const columns = [
    {
      field: 'date',
      label: 'Date',
      sort: true,
    },
    {
      field: 'title',
      label: 'Daily work Title',
      sort: true,
    },
    {
      field: 'description',
      label: 'Description',
      sort: true,
    },
    {
      field: 'status',
      label: 'Status',
      sort: true,
    },
    {
      field: 'action',
      label: 'Action',
      headerAlign: 'center',
      align: 'center',
    },
  ];

  const handleBtnClick = (e) => {
    e.preventDefault();
    getUserFilterdWorks(user._id, fromDate, toDate);
  };

  const handleResetDate = (e) => {
    e.preventDefault();
    setIsDataChange(!isDataChange);
  };

  const handleAddBtnClick = () => setIsopen(true);

  const cancelBtnClick = () => setIsopen(false);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDes(e.target.value);

  const handleSaveBtnClick = (e) => {
    e.preventDefault();
    if (title && des) {
      const body = {
        userId: user._id,
        userName: user.name,
        title,
        description: des,
      };
      saveTodayWork(body);
      setIsopen(false);
      showAlert('success', 'Your work has been saved!');
    }
  };

  const data = { columns, rows: rowsData };

  return (
    <>
      <h4>Daily Works : </h4>
      {dailyWorks?.length > 0 && (
        <MDBDataTable striped bordered hover small data={data} />
      )}
      <Button outline color="success" onClick={handleAddBtnClick}>
        Add New
      </Button>{' '}
      <br />
      {isopen && (
        <Form className="pt-2 pb-2 mb-5">
          <FormGroup>
            <Input
              type="text"
              id="date"
              value={dayjs(Date.now()).format('MMMM DD YYYY')}
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="textarea"
              className="form-control"
              id="title"
              placeholder="Daily Work Title"
              required
              onChange={handleTitleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="textarea"
              className="form-control"
              id="des"
              placeholder="Description"
              required
              onChange={handleDescriptionChange}
            />
          </FormGroup>
          <SaveBtn onClickFunc={handleSaveBtnClick} />
          <CancleBtn onClickFunc={cancelBtnClick} />
        </Form>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  isDailyWorkLoading: state.dailyWorks.loading,
  task: state.task.task,
  dailyW: state.dailyWorks,
  dailyWorks: state.dailyWorks.userWorks,
});

export default connect(mapStateToProps, {
  getUserWorks,
  saveTodayWork,
  getUserFilterdWorks,
  deleteDailyWorks,
})(DailyWorksTable);

// return <MDBDataTable striped bordered hover small data={data} />;
