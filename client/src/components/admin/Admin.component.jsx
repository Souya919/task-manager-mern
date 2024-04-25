import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllWorks } from '../../redux/actions/dailyWorkActions';
import { getAllLogs } from '../../redux/actions/adminActions';

import WorkInfo from './WorkInfo.component';
import Loading from '../loading/Loading.component';

const Admin = ({
  user,
  isLoading,
  getAllWorks,
  allWorks,
  getAllLogs,
  allLogs,
}) => {
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [displayedLogs, setDisplayedLogs] = useState(3);

  useEffect(() => {
    getAllWorks();
    getAllLogs();
  }, [isDataChanged, getAllWorks, getAllLogs]);

  const handleMoreButtonClick = () => {
    setDisplayedLogs(displayedLogs + 3);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="admin-home">
      <div className="container p-3">
        <h2>Welcome to Admin Panel, {user && user.name} 🎉</h2>
        <br />
        <h4>All daily works information:</h4>
        {allWorks.length > 0 && (
          <WorkInfo
            dailyWorks={allWorks}
            isDataChanged={isDataChanged}
            setIsDataChanged={setIsDataChanged}
          />
        )}
        <h4>Recent activity:</h4>
        {allLogs?.length > 0 &&
          allLogs
            .slice(0, displayedLogs)
            .map((log, index) => (
              <p className="text-lg font-semibold">{log.description}</p>
            ))}
        {allLogs?.length > 0 && displayedLogs < allLogs.length && (
          <button className="btn btn-primary" onClick={handleMoreButtonClick}>
            More
          </button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  allWorks: state.dailyWorks.allWorks,
  allLogs: state.admin.allLogs,
  isLoading: state.dailyWorks.loading,
});

export default connect(mapStateToProps, { getAllWorks, getAllLogs })(Admin);
