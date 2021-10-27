/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Pagination from 'react-js-pagination';

import UserLayout from '../../components/layout/user';
import OptionsColumn from './components/optionsColumn';
import TeamPreview from './components/teamPreview';

import { fetchCurrentUser, openModal } from '../../store/app/actions';
import { fetchTeamsByPayloadFailure, fetchTeamsByPayloadRequest } from '../../store/teams/actions';

export default function Library() {
  const dispatch = useDispatch();
  const currentUser: any = useSelector((state: any) => state.app.currentUser);
  const resTeams: any = useSelector((state: any) => state.teams); // get sales_rep users

  const [teams, setTeams] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const result = await dispatch(fetchCurrentUser());
      await dispatch(fetchTeamsByPayloadRequest({ userId: result.payload.id }));
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (resTeams.teamList) {
      setTeams(resTeams.teamList);
    }
  }, [resTeams.teamList]);

  // Reload teams list from server after CRUD actions
  useEffect(() => {
    async function fetchData() {
      if (resTeams.data?.success) {
        await dispatch(fetchTeamsByPayloadRequest({ userId: currentUser?.id }));
        await dispatch(fetchTeamsByPayloadFailure(null));
      }
    }

    fetchData();
  }, [resTeams.data]);

  const handleClickCreate = async () => {
    await dispatch(
      openModal({
        modal: 'TEAM_MODAL',
        params: {
          action: 'add',
          userId: currentUser?.id,
          formData: {
            avatar: '',
            username: '',
            email: '',
          },
        },
      }),
    );
  };

  // const handleChangePagination = async (page: number) => {
  //   setCurrentPage(page);

  // call API to get data based on pageNumber
  // let payload = {
  //   type: location.state.params.type,
  //   limit: pageSize,
  //   offset: parseInt((pageNumber - 1) * pageSize),
  // };
  // };

  return (
    <UserLayout>
      <div className="library-page">
        <div className="row">
          <div className="col-lg-4 col-md-12 col-sm-12">
            <OptionsColumn />
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12">
            {currentUser?.role === 'manager' && (
              <div className="teams-wrapper">
                <div className="button-wrapper d-flex justify-content-end">
                  <button className="btn btn-primary" onClick={handleClickCreate}>
                    <span className="text-light">Create Team</span>
                  </button>
                </div>
                <div className="row teams-list-wrapper">
                  {teams?.map((item: any) => (
                    <div className="col-lg-4 col-md-6 col-sm-12" key={item.id}>
                      <TeamPreview item={item} userId={currentUser?.id} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* <div className="teams-pagination-wrapper d-flex justify-content-center">
              <Pagination
                itemClass="page-item" // add it for bootstrap 4
                linkClass="page-link" // add it for bootstrap 4
                activePage={currentPage}
                itemsCountPerPage={5}
                totalItemsCount={teams.length}
                pageRangeDisplayed={10}
                onChange={handleChangePagination}
              />
            </div> */}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
