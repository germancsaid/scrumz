/**
 * *Import constants
 */
import {
  c_insertOne_event_backlog,
  c_delete_event,
  c_close_event,
  c_delete_event_played,
  c_insertOne_play_event,
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
    FormNewEventBodyGame["newNameEventInputBodyGame"].value,
    FormNewEventBodyGame["newDescriptionEventInputBodyGame"].value
  );
};


/**
 * *Objects
 */

// Container to publish old events and new events
const pending_event_sprint_list = document.querySelector("#containerEventsListPending");

// Container to publish events played list
const containerWorkedHours = document.querySelector("#containerWorkedHours");

// Container to publish events played list
const played_event_sprint_list = document.querySelector("#containerBoxi_listPlayed");

// Container to publish old events and new events
const closed_event_sprint_list = document.querySelector("#containerEventsListClosed");


// Container to publish old events and new events
const pending_event_sprint_UI = (event_sprint) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <li id="eventPending" class="content-horizontal plomo invisible">
      <button id="btn-delete-eventPending" class="btn-delete-eventPending rojo invisible" data-id="${event_sprint._id}"></button>
      <form action="" class="FormEventBodyGame w-100">
          <input class="uppercase font-400 text-18" type="text" value="${event_sprint.NameEvent}" spellcheck="false">
          <textarea class="text-16" name="" id="" cols="30" rows="2" spellcheck="false">${event_sprint.DescriptionEvent}</textarea>
          <button class="hiden">submit</button>
          <nav id="containerTagsEventPending_bodyGame">
            <div>
              <button class="">${event_sprint.NameEvent}</button>
              <button class="">tag#1</button>
              <button class="">tag#2</button>
            </div>
            <div class="content-right">
              <button class="btn-close-eventPending rojo invisible" data-id="${event_sprint._id}">close</button>
            </div>
          </nav>
          <div class="separador"></div>
      </form>
      <button id="btn-play-eventPending" class="btn-play-eventPending lechuga invisible" data-id="${event_sprint._id}"></button>
      <button id="btn-stop-eventPending" class="btn-stop-eventPending rojo" data-id="${event_sprint._id}" style="display:none"></button>
   </li>
    `;

  // Button delete button
  const delete_event = li.querySelector(".btn-delete-eventPending");
  delete_event.onclick = (e) => {
    c_delete_event(delete_event.dataset.id);
  };

  // Button finir finish terminar close voila cerrar button
  const close_event = li.querySelector(".btn-close-eventPending");
  close_event.onclick = (e) => {
    c_close_event(close_event.dataset.id);
  };

  // Button play button
  const play_event = li.querySelector(".btn-play-eventPending");
  play_event.onclick = (e) => {
    c_insertOne_play_event(play_event.dataset.id);
  };

  return li;
};

// Container to publish old events and new events
const quantity_played_event_sprint_UI = (quantity) => {
  const div = document.createElement("div");
  div.innerHTML = `
    <h5>Trabajadas hoy:</h5>
    <h1 class="text-28 font-400">${quantity}</h1>
  `;

  return div;
};

// Container to publish old events and new events
const played_event_sprint_UI = (event_played) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <li id="boxi" class="">
    <div class="content-horizontal">
        <div style="width: 301px; margin-bottom: 5px;">
            <button>${event_played._id}</button>
            <button>PROYECTO</button>
            <button>ta</button>
            <button>media</button>
            <button>alta</button>
        </div>
        <h5 style="width: 40px; margin-left:5px; margin-top:3px;">${event_played.createdAt.substring(11,16)}</h5>
    </div>
    <h1 class="uppercase">${event_played.NameEvent}</h1>
    <h4 style="margin-bottom: 5px;">${event_played.DescriptionEvent}</h4>
    <div class="content-horizontal">
        <h5>2.5|8h</h5>
        <h5 id="EndTimeEventPlayed" class="contenido-derecha">Number${event_played.createdAt}</h5>
    </div>
  </li>
  <button class="btn-delete-event w-100 h-10 rojo text-8 negro-t" data-id="${event_played._id}">delete</button>
  `;

  const delete_event_played = li.querySelector(".btn-delete-event");
  delete_event_played.onclick = (e) => {
    c_delete_event_played(delete_event_played.dataset.id);
  };

  return li;
};

// Container to publish old closed events and new events
const closed_event_sprint_UI = (closed_event_sprint) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <li class="p-r-35p plomo invisible">
      <form class="" action="">
          <input class="uppercase text-18 font-400 mt-15p"  type="text" value="${closed_event_sprint.NameEvent}" spellcheck="false">
          <textarea class="text-16" name="" id="" cols="30" rows="2" spellcheck="false">${closed_event_sprint.DescriptionEvent}</textarea>
          <button id="" class="hiden">submit</button>
          <div class="separador" style="width: 80%; margin-left:20%;"></div>
      </form>
    </li>
    `;

  return li;
};

/**
 * *Fuctions frontend
 */


/**
 * !SOLO FUNCIONA PARA UN USUARIO SE CORROMPE PARA MAS EL CARGAR EVENTOS YA EXISTENTES EN LA DB
 * ?SOLUCIONADO PERO NO ES EFICIENTE
 */
// Function publish events list from event_backlog from DB
export const publish_old_events_backlog = (events_backlog_list) => {
  savedId = "";
  pending_event_sprint_list.innerHTML = "";
  events_backlog_list.forEach((event_sprint) =>
    pending_event_sprint_list.append(pending_event_sprint_UI(event_sprint))
  );
};

// Function publish closed events list from event_backlog from DB
export const publish_old_closed_events_backlog = (closed_events_backlog_list) => {
  savedId = "";
  closed_event_sprint_list.innerHTML = "";
  closed_events_backlog_list.forEach((closed_event_sprint) =>
  closed_event_sprint_list.append(closed_event_sprint_UI(closed_event_sprint))
  );
};


// Function publish events played list from event_played from DB
export const publish_old_events_played = (events_played_list) => {
  savedId = "";
  played_event_sprint_list.innerHTML = "";

  events_played_list.forEach((event_played) =>
    played_event_sprint_list.append(played_event_sprint_UI(event_played))
  );
};

// Function publish events played list from event_played from DB
export const publish_count_events_played = (events_played_count) => {
  savedId = "";
  containerWorkedHours.innerHTML =  "";

  containerWorkedHours.append(quantity_played_event_sprint_UI(events_played_count))
  
};



// Function publish new event into sprint from event_backlog from DB
export const publish_new_event_backlog = (new_event_game) => {
  pending_event_sprint_list.append(pending_event_sprint_UI(new_event_game));
};



// Function publish new event into sprint from event_backlog from DB
export const publish_new_event_played = (new_event_played) => {
  played_event_sprint_list.append(played_event_sprint_UI(new_event_played));
};
