import {
  c_query_find_event_backlog,
  c_query_find_closed_event_backlog,
  c_query_find_event_played,
  c_query_find_count_event_played,

  c_publish_insertOne_event_backlog,
  c_publish_insertOne_event_played,
} from "./socketClient.js";
import {
  publish_old_events_backlog,
  publish_old_closed_events_backlog,
  publish_old_events_played,
  publish_count_events_played,
  c_function_save_event_backlog,
  publish_new_event_backlog,
  publish_new_event_played,
} from "./ui.js";

/**
 * !SOLO FUNCIONA PARA UN USUARIO SE CORROMPE PARA MAS EL CARGAR EVENTOS YA EXISTENTES EN LA DB
 * ?SOLUCIONADO LO QUE ESTA EN ROJO
 */
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

  c_publish_insertOne_event_played(publish_new_event_played)

});

/**
 * * Actions frontend
 */
/**
 * Submit new events
 */
const FormNewEventBodyGame = document.querySelector("#FormNewEventBodyGame")
FormNewEventBodyGame.addEventListener("submit", c_function_save_event_backlog)
