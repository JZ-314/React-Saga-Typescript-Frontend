import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactBigCalendar from '../../components/calendar/reactBigCalendar';
import UserLayout from '../../components/layout/user';

import { fetchCurrentUser, openModal } from '../../store/app/actions';
import {
  fetchMeetingsByPayloadFailure,
  fetchMeetingsByPayloadRequest,
  updateMeetingRequest,
} from '../../store/meetings/actions';

export default function Meetings() {
  const dispatch = useDispatch();
  const user: any = useSelector((state: any) => state.app.currentUser);
  const resMeeting = useSelector((state: any) => state.meetings);

  const [events, setEvents] = useState([]);
  const [draggedEvent, setDraggedEvent] = useState();
  const [displayDragItemInCell] = useState(true);

  // initial load
  useEffect(() => {
    async function fetchData() {
      const result = dispatch(fetchCurrentUser());
      await dispatch(fetchMeetingsByPayloadRequest({ userId: result.payload.id }));
    }

    fetchData();
  }, []);

  // Reload meeting list from server after CRUD actions
  useEffect(() => {
    async function fetchData() {
      if (resMeeting.data?.success) {
        await dispatch(
          fetchMeetingsByPayloadRequest({
            userId: user.id,
          }),
        );
        await dispatch(fetchMeetingsByPayloadFailure(null));
      }
    }

    fetchData();
  }, [resMeeting.data]);

  useEffect(() => {
    if (resMeeting.meetingList) {
      const meetingList: any = [];

      resMeeting.meetingList.forEach((item: any) => {
        const payload = {
          id: item.id,
          title: item.title,
          description: item.description,
          start: new Date(item.start),
          end: new Date(item.end),
        };

        meetingList.push(payload);
      });

      setEvents(meetingList);
    }
  }, [resMeeting.meetingList]);

  const handleSelectSlot = async ({ start, end }: any) => {
    await dispatch(
      openModal({
        modal: 'CALENDAR_EVENT_MODAL',
        params: {
          type: 'add',
          userId: user?.id,
          formData: {
            title: '',
            description: '',
            start,
            end,
          },
        },
      }),
    );
  };

  const handleSelectEvent = (event: any) => {
    dispatch(
      openModal({
        modal: 'CALENDAR_EVENT_MODAL',
        params: {
          type: 'edit',
          userId: user?.id,
          formData: {
            meetingId: event.id,
            title: event.title,
            description: event.description,
            start: event.start,
            end: event.end,
          },
        },
      }),
    );
  };

  const handleDragStart = (event: any) => {
    setDraggedEvent(event);
  };

  const onDropFromOutside = async ({ start, end, allDay }: any) => {
    const event = {
      id: draggedEvent.id,
      title: draggedEvent.title,
      description: draggedEvent.description,
      start,
      end,
      allDay: allDay,
    };

    setDraggedEvent(null);
    handleMoveEvent({ event, start, end });
  };

  const handleMoveEvent = async ({ event, start, end, isAllDay: droppedOnAllDaySlot }: any) => {
    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const moveEvent = {
      id: event.id,
      title: event.title,
      description: event.description,
      start,
      end,
      allDay: allDay,
    };

    const nextEvents: any = events.map((existingEvent: any) => {
      return existingEvent.id == moveEvent.id ? moveEvent : existingEvent;
    });

    setEvents(nextEvents);

    // console.log(nextEvents)

    await dispatch(updateMeetingRequest(event.id, moveEvent));
  };

  const handleResizeEvent = async ({ event, start, end }: any) => {
    const resizeEvent = {
      id: event.id,
      title: event.title,
      description: event.description,
      start: start ? start : event.start,
      end,
    };

    const nextEvents: any = events.map((existingEvent: any) => {
      return existingEvent.id == resizeEvent.id ? resizeEvent : existingEvent;
    });

    setEvents(nextEvents);

    await dispatch(updateMeetingRequest(event.id, resizeEvent));

    // alert(`${event.title} was resized to ${start}-${end}`)
  };

  return (
    <UserLayout>
      <div className="meeting-calendar">
        <ReactBigCalendar
          events={events}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          onEventDrop={handleMoveEvent}
          onResizeEvent={handleResizeEvent}
          dragFromOutsideItem={displayDragItemInCell ? draggedEvent : null}
          onDropFromOutside={onDropFromOutside}
          handleDragStart={handleDragStart}
        />
      </div>
    </UserLayout>
  );
}

// const now = new Date();
// const eventDemos = [
//   {
//     id: 0,
//     title: 'All Day Event very long title',
//     description: 'aaaaaaa',
//     start: new Date('2021-08-25T22:00:00.000Z'),
//     end: new Date('2021-08-26T22:00:00.000Z'),
//   },
//   {
//     id: 1,
//     title: 'Long Event',
//     start: new Date(2021, 8, 7),
//     end: new Date(2021, 8, 25),
//   },

//   {
//     id: 2,
//     title: 'DTS STARTS',
//     start: new Date(2021, 8, 18, 0, 0, 0),
//     end: new Date(2021, 8, 20, 0, 0, 0),
//   },
// ];
