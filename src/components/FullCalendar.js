import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!


const Calendar = ({ left, title, right }) => {


  return (

    <FullCalendar

      slotMinWidth={50}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      initialView='dayGridYear'
      headerToolbar={
        left = {left},
        // center = {title},
        right = 'dayGridYear,dayGridWeek,dayGridDay'
      }
      editable={true}
      events='https://fullcalendar.io/api/demo-feeds/events.json'

    />

  )
}
export default Calendar;