/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainInput from '../../../../components/input/mainInput';
import DateTimePicker from '../../../../components/datetimePicker';

import {
  fetchMeetingsByPayloadRequest,
  createMeetingRequest,
  updateMeetingRequest,
  deleteMeetingRequest,
} from '../../../../store/meetings/actions';

type props = {
  closeModal: any;
};

export default function CalendarEventModal({ closeModal }: props) {
  const dispatch = useDispatch();
  const modalParams = useSelector((state: any) => state.app.modalParams);
  const { type, userId, formData } = modalParams;

  const [formState, setFormState] = useState({
    title: formData.title,
    description: formData.description,
    start: formData.start,
    end: formData.end,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleChangeDateTimePicker = (type: string) => (date: any) => {
    setFormState({ ...formState, [type]: date });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    if (type === 'add') {
      const payload = {
        title: formState.title,
        description: formState.description,
        userId,
        start: new Date(formState.start),
        end: new Date(formState.end),
      };

      await dispatch(createMeetingRequest(payload));
      await dispatch(fetchMeetingsByPayloadRequest({ userId }));
    } else if (type === 'edit') {
      const payload = {
        title: formState.title,
        description: formState.description,
        userId,
        start: new Date(formState.start),
        end: new Date(formState.end),
      };

      await dispatch(updateMeetingRequest(formData.meetingId, payload));
      await dispatch(fetchMeetingsByPayloadRequest({ userId }));
    }
    setSubmitting(false);
    closeModal();
  };

  const handleClickDelete = async () => {
    if (submitting) return;
    setSubmitting(true);

    await dispatch(deleteMeetingRequest(formData.meetingId));
    await dispatch(fetchMeetingsByPayloadRequest({ userId }));
    setSubmitting(false);
    closeModal();
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title">
          <strong>Meeting Details</strong>
        </h4>
        <div className="modal-close-icon" onClick={closeModal}>
          <i className="fas fa-times"></i>
        </div>
      </div>
      <form className="meeting-form" onSubmit={handleSubmit}>
        <div className="modal-body">
          <MainInput
            id="Title"
            type="text"
            label="Title"
            placeholder="Title"
            name="title"
            value={formState.title}
            onChange={handleInputChange}
            required
          />
          <MainInput
            id="description"
            type="text"
            label="Description"
            placeholder="Description"
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            required
          />
          <div className="datetime-picker-wrapper">
            <label className="datetime-picker-label">Start</label>
            <DateTimePicker
              placeholder="Start Date"
              onChange={handleChangeDateTimePicker('start')}
              value={formState.start}
            />
          </div>
          <div className="datetime-picker-wrapper">
            <label className="datetime-picker-label">End</label>
            <DateTimePicker
              placeholder="End Date"
              onChange={handleChangeDateTimePicker('end')}
              value={formState.end}
            />
          </div>
          {type === 'edit' && (
            <div className="meeting-link">
              <a
                href={`${location.origin}/call/${formData.meetingId}`}
                target="_blank"
                rel="noreferrer"
              >
                {location.origin}/call/{formData.meetingId}
              </a>
            </div>
          )}
        </div>
        <div className="modal-footer">
          {type === 'add' ? (
            <div>
              <button type="submit" className="btn btn-primary text-light mx-2">
                Add
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <button type="submit" className="btn btn-primary text-light mx-2">
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleClickDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
