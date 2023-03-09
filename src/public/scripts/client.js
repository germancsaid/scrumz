import {
  c_query_find_event_backlog,
  c_query_find_closed_event_backlog,
  c_query_find_event_played,
  c_query_find_count_event_played,
  c_publish_insertOne_event_backlog,
  c_publish_insertOne_event_played,
  s_query_find_player,
} from "./socketClient.js";
import {
  publish_old_events_backlog,
  publish_old_closed_events_backlog,
  publish_old_events_played,
  publish_count_events_played,
  c_function_save_event_backlog,
  publish_new_event_backlog,
  publish_new_event_played,
  publish_player_stream,
} from "./ui.js";

/**
 * !SOLO FUNCIONA PARA UN USUARIO SE CORROMPE PARA MAS EL CARGAR EVENTOS YA EXISTENTES EN LA DB
 * ?SOLUCIONADO LO QUE ESTA EN ROJO
 */
let SelectedMoment = new Date();
calendarFormat("day", "month", "weekendDay", SelectedMoment, "", "");
let DayCounter = 0;

window.addEventListener("DOMContentLoaded", () => {
  // Publish old events
  c_query_find_event_backlog(publish_old_events_backlog);

  // Publish closed events
  c_query_find_closed_event_backlog(publish_old_closed_events_backlog);

  // Publish events played
  c_query_find_event_played(publish_old_events_played);

  // Publish events played
  c_query_find_count_event_played(publish_count_events_played);

  // Publish new events
  c_publish_insertOne_event_backlog(publish_new_event_backlog);

  c_publish_insertOne_event_played(publish_new_event_played);

  //stream
  s_query_find_player(publish_player_stream);
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
  DayCounter++;

  const NexDay = new Date(SelectedMoment);
  NexDay.setDate(SelectedMoment.getDate() + 1);
  //console.log("Selected day is" + DayCounter);
  SelectedMoment = NexDay;
  //console.log(SelectedMoment);
  calendarFormat("day", "month", "weekendDay", SelectedMoment, "", "");
});

const PreviousDayBtn = document.querySelector("#PreviousDay");
PreviousDayBtn.addEventListener("click", () => {
  DayCounter--;
  const PrevDay = new Date(SelectedMoment);
  PrevDay.setDate(SelectedMoment.getDate() - 1);
  //console.log("Selected day is" + DayCounter);
  SelectedMoment = PrevDay;
  //console.log(SelectedMoment);
  calendarFormat("day", "month", "weekendDay", SelectedMoment, "", "");
});

/**
 * * Functions backend
 */
function calendarFormat(idday, idmonth, idweekendDay, moment, weekDay, month) {
  switch (moment.getDay()) {
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
  switch (moment.getMonth()) {
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
  document.getElementById(idday).innerHTML = moment.getDate();
  document.getElementById(idmonth).innerHTML = month;
  document.getElementById(idweekendDay).innerHTML = weekDay;
}
