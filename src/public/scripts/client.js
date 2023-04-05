import {
  c_query_find_event_backlog,
  c_query_find_closed_event_backlog,
  c_query_find_event_played,
  c_query_find_count_event_played,

  c_query_find_pomodoro,

  NextDay,
  PreviousDay,
  OtherTeam,

  c_data_time,
} from "./socketClient.js";
import {
  publish_old_events_backlog,
  publish_old_closed_events_backlog,
  publish_old_events_played,
  publish_count_events_played,

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

});

window.addEventListener("DOMContentLoaded", () => {
  c_query_find_pomodoro(publish_pomodoro);
});


/**
 * * Actions frontend
 */
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

const ChangeTeamBtn = document.querySelector("#chosenTeam");
let i = 0
ChangeTeamBtn.addEventListener("click", () => {
  i++;
  console.log('hola chialo')
  OtherTeam(i)
  console.log(i)
});

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