import {
  //play
  c_query_find_event_backlog,
  c_query_find_event_played,

  c_query_find_pomodoro,
  //stream
  c_query_find_event_activity,
  c_query_total_events_in_projects,
  c_query_total_events_in_projects_closed,
} from "./socketClient.js";
import {
  //play
  c_function_save_event_backlog,
  publish_old_events_backlog, change_filter_period, change_filter_class, change_filter_type,

  publish_old_closed_events_backlog,
  
  publish_old_events_played, NextDay, PreviousDay, 
  
  publish_count_events_played,
  
  publish_pomodoro,
  //stream
  publish_events_activity,
  publish_events_in_projects,
  publish_events_in_projects_closed,
  publish_hours_in_projects_list,
} from "./ui.js";
/**
 * *DEFINED DATA FROM CLIENT TO THE SEND TO SERVER
 */
  let SelectedMoment = new Date();
  calendarFormat(SelectedMoment);


  if (window.location.pathname === "/") {
    window.addEventListener("DOMContentLoaded", () => {
      c_query_find_event_backlog(publish_old_events_backlog);
      c_query_find_event_backlog(publish_old_closed_events_backlog);
      c_query_find_event_played(publish_old_events_played);
      c_query_find_event_played(publish_count_events_played);
    });
    window.addEventListener("DOMContentLoaded", () => {
      c_query_find_pomodoro(publish_pomodoro);
    });
  } else if (window.location.pathname === "/stream") {
    window.addEventListener("DOMContentLoaded", () => {
      c_query_find_event_activity(publish_events_activity)
      c_query_find_event_played(publish_hours_in_projects_list)
      c_query_total_events_in_projects(publish_events_in_projects)
      c_query_total_events_in_projects_closed(publish_events_in_projects_closed)
    });
  }

/**
 * * Filters PLAY
 */
if (window.location.pathname === "/") {
  const filterPeriod = document.querySelector("#filterPeriod");
  filterPeriod.addEventListener("click", () => {
      const btn = document.getElementById("filterPeriod");
      if (btn.innerHTML === "All Dates") {
        btn.innerHTML = "This Week";
      } else if (btn.innerHTML === "This Week") {
        btn.innerHTML = "For Today";
      } else {
        btn.innerHTML = "All Dates";
      }
      change_filter_period(btn.innerHTML)
  });
  const filterClass = document.querySelector("#filterClass");
  filterClass.addEventListener("click", () => {
      const btn = document.getElementById("filterClass");
      if (btn.innerHTML === "Class: Transitory") {
        btn.innerHTML = "Class: Recurrent";
      } else {
        btn.innerHTML = "Class: Transitory";
      }
      change_filter_class(btn.innerHTML)
  });
  const filterType = document.querySelector("#filterType");
  filterType.addEventListener("click", () => {
      const btn = document.getElementById("filterType");
      if (btn.innerHTML === "Type: All") {
        btn.innerHTML = "Type: Tarea";
      } else if (btn.innerHTML === "Type: Tarea") {
        btn.innerHTML = "Type: Reunion";
      } else {
        btn.innerHTML = "Type: All";
      }
      change_filter_type(btn.innerHTML)
  });
  /**
   * * New event PLAY
   */
  const FormNewEventBodyGame = document.querySelector("#FormNewEventBodyGame");
  FormNewEventBodyGame.addEventListener("submit", c_function_save_event_backlog);
  /**
   * * Date nav buttons
   */
  const NextDayBtn = document.querySelector("#NextDay");
  NextDayBtn.addEventListener("click", () => {
    const NexDay = new Date(SelectedMoment);
    NexDay.setDate(SelectedMoment.getDate() + 1);
    SelectedMoment = NexDay;
    calendarFormat(SelectedMoment);
    NextDay(SelectedMoment); // Llamar NextDay como una función
  });
  const PreviousDayBtn = document.querySelector("#PreviousDay");
  PreviousDayBtn.addEventListener("click", () => {
    const PrevDay = new Date(SelectedMoment);
    PrevDay.setDate(SelectedMoment.getDate() - 1);
    SelectedMoment = PrevDay;
    calendarFormat(SelectedMoment);
    PreviousDay(SelectedMoment); // Llamar NextDay como una función
  });
}

function calendarFormat(selectedMoment) {
  let idday = 'day'
  let idmonth = 'month'
  let idweekendDay = 'weekendDay'

  let weekDay = ''
  let month = ''

  switch (selectedMoment.getDay()) {
    case 0:
      weekDay = "Domingo";
      break;
    case 1:
      weekDay = "Lunes";
      break;
    case 2:
      weekDay = "Martes";
      break;
    case 3:
      weekDay = "Miercoles";
      break;
    case 4:
      weekDay = "Jueves";
      break;
    case 5:
      weekDay = "Viernes";
      break;
    case 6:
      weekDay = "Sabado";
      break;
  }
  switch (selectedMoment.getMonth()) {
    case 0:
      month = "Enero";
      break;
    case 1:
      month = "Febrero";
      break;
    case 2:
      month = "Marzo";
      break;
    case 3:
      month = "Abril";
      break;
    case 4:
      month = "Mayo";
      break;
    case 5:
      month = "Junio";
      break;
    case 6:
      month = "Julio";
      break;
    case 7:
      month = "Agosto";
      break;
    case 8:
      month = "Septiembre";
      break;
    case 9:
      month = "Octubre";
      break;
    case 10:
      month = "Noviembre";
      break;
    case 11:
      month = "Diciembre";
      break;
  }
  document.getElementById(idday).innerHTML = selectedMoment.getDate();
  document.getElementById(idmonth).innerHTML = month;
  document.getElementById(idweekendDay).innerHTML = weekDay;
}