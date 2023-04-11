import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { localizer, getMessagesEs } from '../../helpers';
import { CalendarEvent, CalendarModal, FabAddNew, Navbar } from '../';
import { useCalendarStore, useUIStore } from '../../hooks';

export const CalendarPage = () => {

  const { openDateModal } = useUIStore();
  const { events, setActiveEvent } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    // console.log({ event, start, end, isSelected });
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = ( event ) => {
    // console.log({ doubleClick: event });
    openDateModal(); // abrir modal
  }

  const onSelect = ( event ) => {
    // console.log({ click: event });
    setActiveEvent( event );
  }

  const onViewChanged = ( event ) => {
    // console.log({ viewChanged: event });
    // Guardar donde se muestra el calendario week, month, dia, etc
    localStorage.setItem('lastView', event);
  }

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        messages={ getMessagesEs() }
        eventPropGetter={ eventStyleGetter }
        style={{ height: 'calc(100vh - 80px)' }}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged } />

      <CalendarModal />

      <FabAddNew />
    </>
  );
}
