/**
 * *Import constants
 */
import {
  c_insertOne_event_backlog,
  c_delete_event,
  c_update_event,
} from "./socketClient.js";

/**
 * *Let
 */
let savedId = "";

/**
 * *Fuctions backend
 */

// Function to save new event backlog and insert one into the DB
export const c_function_save_event_backlog = (e) => {
  e.preventDefault();
  c_insertOne_event_backlog(
    FormNuevoEvento["NameEvent"].value,
    FormNuevoEvento["DescriptionEvent"].value
  );
};

/**
 * *Objects
 */

// Container to publish old events and new events
const pending_event_sprint_list = document.querySelector("#ListaEventos");

// Container to publish old events and new events
const pending_event_sprint_UI = (event_sprint) => {
  const div = document.createElement("div");
  div.innerHTML = `
    <div>
        <h1>${event_sprint.NameEvent}</h1>
        <h2>${event_sprint.DescriptionEvent}</h2>
        <button class="btn-update" data-id="${event_sprint._id}">update</button>
        <button class="btn-delete" data-id="${event_sprint._id}">delete</button>
        <button class="btn-play" data-id="${event_sprint._id}">play</button>
    </div>
    `;
  // Button update button
  const update_event = div.querySelector(".btn-update");
  update_event.onclick = (e) => {
    c_update_event(update_event.dataset.id);
  };
  // Button delete button
  const delete_event = div.querySelector(".btn-delete");
  delete_event.onclick = (e) => {
    c_delete_event(delete_event.dataset.id);
  };
  // Button play button
  const btnPlay = div.querySelector(".btn-play");
  btnPlay.onclick = (e) => {
    console.log(btnPlay.dataset.id);
  };

  return div;
};

/**
 * *Fuctions frontend
 */
/**
 * !SOLO FUNCIONA PARA UN USUARIO SE CORROMPE PARA MAS EL CARGAR EVENTOS YA EXISTENTES EN LA DB
 */
// Function publish events list from event_backlog from DB
export const publish_old_events_backlog = (events_backlog_list) => {
  savedId = "";
  pending_event_sprint_list.innerHTML = "";
  events_backlog_list.forEach((event_sprint) =>
    pending_event_sprint_list.append(pending_event_sprint_UI(event_sprint))
  );
};

// Function publish new event into sprint from event_backlog from DB
export const publish_new_event_backlog = (new_event_sprints) => {
  pending_event_sprint_list.append(pending_event_sprint_UI(new_event_sprints));
};
