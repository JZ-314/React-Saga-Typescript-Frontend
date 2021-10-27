import React, { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
// import localizer from 'react-big-calendar/lib/localizers/globalize';
// import * as dates from '../../../utils/date';

const DragAndDropCalendar = withDragAndDrop(Calendar);
const allViews = Object.keys(Views).map((k) => Views[k]);
const localizer = momentLocalizer(moment);

// const ColoredDateCellWrapper = ({ children }: any) =>
//   React.cloneElement(React.Children.only(children), {
//     style: {
//       backgroundColor: 'lightblue',
//     },
//   });

const style = {
  height: 600,
  color: '#000',
};

const ReactBigCalendar = ({
  events,
  onSelectSlot,
  onSelectEvent,
  onEventDrop,
  onResizeEvent,
  dragFromOutsideItem,
  onDropFromOutside,
  handleDragStart,
}: any) => (
  <DragAndDropCalendar
    selectable
    resizable
    popup
    showMultiDayTimes
    localizer={localizer}
    events={events}
    onEventDrop={onEventDrop}
    onSelectEvent={onSelectEvent}
    onSelectSlot={onSelectSlot}
    onEventResize={onResizeEvent}
    onDragStart={console.log}
    defaultView={Views.MONTH}
    defaultDate={new Date()}
    dragFromOutsideItem={dragFromOutsideItem}
    onDropFromOutside={onDropFromOutside}
    handleDragStart={handleDragStart}
    style={style}
  />
);

export default ReactBigCalendar;

{
  /* <DragAndDropCalendar
  popup
  selectable
  resizable
  showMultiDayTimes
  localizer={localizer}
  defaultView={Views.MONTH}
  views={allViews}
  events={events}
  step={60}
  startAccessor="start"
  endAccessor="end"
  dragFromOutsideItem={dragFromOutsideItem}
  style={style}
  onSelectEvent={onSelectEvent}
  onSelectSlot={onSelectSlot}
  onEventDrop={onEventDrop}
  onEventResize={onResizeEvent}
  onDragStart={console.log}
  onDropFromOutside={onDropFromOutside}
  handleDragStart={handleDragStart}
/> */
}
