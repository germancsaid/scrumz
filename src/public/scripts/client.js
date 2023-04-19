import {
  c_query_find_event_backlog,
  c_query_find_closed_event_backlog,
  c_query_find_event_played,
  c_query_find_count_event_played,

  c_query_find_event_activity,
  c_query_total_events_in_projects,
  c_query_total_events_in_projects_closed,

  c_query_find_pomodoro,

  NextDay,
  PreviousDay,
  OtherTeam,

  c_data_time,
} from "./socketClient.js";
import {
  change_filter_period,
  publish_old_events_backlog,
  publish_old_closed_events_backlog,
  publish_old_events_played,
  publish_count_events_played,

  publish_events_activity,
  publish_events_in_projects,
  publish_events_in_projects_closed,

  publish_pomodoro,

  c_function_save_event_backlog,

} from "./ui.js";

/**
 * *DEFINED DATA FROM CLIENT TO THE SEND TO SERVER
 */

    let SelectedMoment = new Date();
    calendarFormat(SelectedMoment);
    c_data_time(SelectedMoment)
    
window.addEventListener("DOMContentLoaded", () => {
  // Publish old events
  c_query_find_event_backlog(publish_old_events_backlog);

  // Publish closed events
  c_query_find_closed_event_backlog(publish_old_closed_events_backlog);

  // Publish events played
  c_query_find_event_played(publish_old_events_played);

  // Publish events played
  c_query_find_count_event_played(publish_count_events_played);

  c_query_find_event_activity(publish_events_activity)
  c_query_total_events_in_projects(publish_events_in_projects)
  c_query_total_events_in_projects_closed(publish_events_in_projects_closed)
});

window.addEventListener("DOMContentLoaded", () => {
  c_query_find_pomodoro(publish_pomodoro);
});


/**
 * * Actions frontend
 */

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
    change_filter_period(btn.innerHTML)
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
    change_filter_period(btn.innerHTML)
});
/**
 * Submit new events
 */
const FormNewEventBodyGame = document.querySelector("#FormNewEventBodyGame");
FormNewEventBodyGame.addEventListener("submit", c_function_save_event_backlog);

//days movigations buttons
const NextDayBtn = document.querySelector("#NextDay");
NextDayBtn.addEventListener("click", () => {

  const NexDay = new Date(SelectedMoment);
  NexDay.setDate(SelectedMoment.getDate() + 1);
  SelectedMoment = NexDay;
  calendarFormat(SelectedMoment);
  NextDay(SelectedMoment)
});

const PreviousDayBtn = document.querySelector("#PreviousDay");
PreviousDayBtn.addEventListener("click", () => {
  const PrevDay = new Date(SelectedMoment);
  PrevDay.setDate(SelectedMoment.getDate() - 1);
  SelectedMoment = PrevDay;
  calendarFormat(SelectedMoment);
  PreviousDay(SelectedMoment)
});

/*
const ChangeTeamBtn = document.querySelector("#chosenTeam");
let i = 0
ChangeTeamBtn.addEventListener("click", () => {
  i++;
  console.log('hola chialo')
  OtherTeam(i)
  console.log(i)
});
*/

/**
 * * Functions backend
 */
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