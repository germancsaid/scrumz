/**
 * *Import constants
 */
import {
  c_insertOne_event_backlog,
  c_delete_event,
  
  c_update_event,
} from "./socketClient.js";
//c_play_event,
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
    FormNewEventBodyGame["newNameEventInputBodyGame"].value,
    FormNewEventBodyGame["newDescriptionEventInputBodyGame"].value
  );
};

/**
 * *Objects
 */

// Container to publish old events and new events
const pending_event_sprint_list = document.querySelector("#containerEventsListPending");

// Container to publish old events and new events
const pending_event_sprint_UI = (event_sprint) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <li id="eventPending" class="content-horizontal plomo invisible">
      <button id="btn-delete-eventPending" class="btn-delete-eventPending rojo invisible" data-id="${event_sprint._id}"></button>
      <form action="" class="w-100">
          <input class="uppercase font-400 text-18" type="text" value="${event_sprint.NameEvent}" spellcheck="false">
          <textarea class="text-16" name="" id="" cols="30" rows="2" spellcheck="false">${event_sprint.DescriptionEvent}</textarea>
          <button class="hiden">submit</button>
          <div class="separador"></div>
      </form>
      <button id="btn-play-eventPending" class="btn-play-eventPending lechuga invisible" data-id="${event_sprint._id}"></button>
      <button id="btn-stop-eventPending" class="btn-stop-eventPending rojo" data-id="${event_sprint._id}" style="display:none"></button>
   </li>
    `;
  // Button update button
  //const update_event = li.querySelector(".btn-update");
  //update_event.onclick = (e) => {
  //  c_update_event(update_event.dataset.id);
  //};
  // Button delete button
  const delete_event = li.querySelector(".btn-delete-eventPending");
  delete_event.onclick = (e) => {
    c_delete_event(delete_event.dataset.id);
  };
  // Button play button
/*  export const c_function_save_event_backlog = (e) => {
    e.preventDefault();
    c_insertOne_event_backlog(
      FormNewEventBodyGame["newNameEventInputBodyGame"].value,
      FormNewEventBodyGame["newDescriptionEventInputBodyGame"].value
    );
  };

  const play_event = li.querySelector(".btn-play-eventPending");
  play_event.onclick = (e) => {
    c_play_event(play_event.dataset.id);
  };

  return li;
};*/

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
export const publish_new_event_backlog = (new_event_game) => {
  pending_event_sprint_list.append(pending_event_sprint_UI(new_event_game));
};
