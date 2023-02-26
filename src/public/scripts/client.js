import {
  c_query_find_event_backlog,
  c_publish_insertOne_event_backlog,
} from "./socketClient.js";
import {
  publish_old_events_backlog,
  publish_new_event_backlog,
  c_function_save_event_backlog,
} from "./ui.js";

/**
 * !SOLO FUNCIONA PARA UN USUARIO SE CORROMPE PARA MAS EL CARGAR EVENTOS YA EXISTENTES EN LA DB
 * ?SOLUCIONADO LO QUE ESTA EN ROJO
 */
window.addEventListener("DOMContentLoaded", () => {
  // Publish old events
  c_query_find_event_backlog(publish_old_events_backlog);

  // Publish new events
  c_publish_insertOne_event_backlog(publish_new_event_backlog);
});

/**
 * * Actions frontend
 */
const FormNewEventBodyGame = document.querySelector("#FormNewEventBodyGame");
FormNewEventBodyGame.addEventListener("submit", c_function_save_event_backlog);
