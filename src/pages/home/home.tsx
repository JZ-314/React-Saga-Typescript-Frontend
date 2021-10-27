import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '../../components/layout/user';
import VideoPreview from '../../components/videoPreview';

const menuOptions = [
  {
    label: 'Start Meeting',
    icon: 'camera-video-fill',
    slug: 'start-meeting',
  },
  {
    label: 'Optimize',
    icon: 'ui-checks',
    slug: 'optimize',
  },
  {
    label: 'Training',
    icon: 'easel-fill',
    slug: 'training',
  },
];

const schedules = [
  {
    id: 123,
    time: '12 : 30 Pm (Est)',
    description: 'Next steps and planning for distribution',
  },
  {
    id: 124,
    time: '12 : 30 Pm (Est)',
    description: 'Next steps and planning for distribution',
  },
];

type ScheduleProps = {
  selected: boolean;
  id: number;
  time: string;
  description: string;
};

const Schedule = ({ selected, time, description, id }: ScheduleProps) => {
  return (
    <div
      className={`d-flex justify-content-between rounded-3 p-3 border-bottom border-dark ${
        selected && 'bg-primary'
      }`}
    >
      <div className="d-flex">
        <i className="bi-clock icon fs-4"></i>
        <div className="d-flex flex-column ms-4">
          <span className="fs-4">{time}</span>
          <span>{description}</span>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <i className="bi-share icon fs-3"></i>
        {selected && (
          <Link to={`/training/${id}`}>
            <button className="ms-4 btn btn-light rounded-pill">Start</button>
          </Link>
        )}
      </div>
    </div>
  );
};

const Home = () => {
  const [selectedOption, setSelectedOption] = useState('start-meeting');

  return (
    <UserLayout>
      <div className="row">
        <div className="col home_info">
          <h2 className="fw-bold">Welcome back</h2>
          <div className="d-flex justify-content-between mt-3 mb-5">
            {menuOptions.map((option) => (
              <div
                role="menuitem"
                tabIndex={0}
                key={option.label}
                className={`d-flex rounded-3 flex-column align-items-center home_info__menu text-center ${
                  selectedOption === option.slug && 'selected'
                }`}
                onClick={() => setSelectedOption(option.slug)}
                onKeyDown={() => setSelectedOption(option.slug)}
              >
                <i className={`bi-${option.icon} icon fs-1`}></i>
                <span className={`fs-5 ${selectedOption === option.slug && 'fw-bold'}`}>
                  {option.label}
                </span>
              </div>
            ))}
          </div>
          <div className="pt-5">
            <h4>Upcoming schedules</h4>
            <div className="mt-4">
              {schedules.map((schedule, i) => (
                <Schedule selected={i === 0} {...schedule} key={i} />
              ))}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="home_video_preview">
            <VideoPreview />
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Home;
