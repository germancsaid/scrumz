/**
 * *Import constants
 */
import {
  c_change_team,
  c_insertOne_event_backlog,
  c_delete_event,
  c_close_event,
  c_delete_event_played,
  c_insertOne_play_event,
} from "./socketClient.js";
/**
 * *Let
 */

let pomodorotime = 25 * 60
//For create News Tareas
console.log(userData._id);
console.log(userData.Email);
console.log(userData.PlayerName);
console.log(userData.TeamName);

/**
 * *Fuctions backend
 */

// Function to save new event backlog and insert one into the DB
export const c_function_save_event_backlog = (e) => {
  e.preventDefault();
  c_insertOne_event_backlog(
    FormNewEventBodyGame["newNameEventInputBodyGame"].value,
    FormNewEventBodyGame["newDescriptionEventInputBodyGame"].value,
    FormNewEventBodyGame["newAllottedTimeInputBodyGame"].value,
    userData._id,
    userData.TeamName,
  );
  FormNewEventBodyGame.reset();
};

/**
 * *Objects
 */
// Container to publish old events and new events
const player_session = document.querySelector("#PlayerNameContainer");

// Container to publish old events and new events
const team_player_session = document.querySelector("#ChosenTeamContainer");

// Container to publish old events and new events
const pending_event_sprint_list = document.querySelector(
  "#containerEventsListPending"
);

// Container to publish events played list
const containerWorkedHours = document.querySelector("#containerWorkedHours");

// Container to publish events played list
const played_event_sprint_list = document.querySelector(
  "#containerBoxi_listPlayed"
);

// Container to publish old events and new events
const closed_event_sprint_list = document.querySelector(
  "#containerEventsListClosed"
);

// Container to publish old events and new events
const clockGame = document.getElementById("clockGame");

// Container to publish old events and new events
const player_list = document.querySelector("#UserBoxiStream");

// Container to publish old events and new events
const player_session_UI = (player) => {
  const a = document.createElement("a");
  a.setAttribute("id", "PlayerName");
  a.setAttribute("href", "#");
  a.classList.add("link", "font-Major");
  a.innerHTML = `@${player.PlayerName} -> `;

  return a;
};

const team_player_session_UI = (team) => {
  const a = document.createElement("a");
  a.setAttribute("id", "chosenTeam");
  a.setAttribute("href", "#");
  a.classList.add("link", "font-Major");
  a.innerHTML = `${team.TeamName}`;

  let i = 0;
    // Button delete button
    a.onclick = (e) => {
      i ++
      c_change_team(i);
      a.innerHTML = `Scrumz`;
    };

  return a;
};

// Container to publish old events and new events
const pending_event_sprint_UI = (event_sprint) => {
  const li = document.createElement("li");
  li.setAttribute("id", "eventPending");
  li.classList.add("content-horizontal", "plomo", "invisible");
  li.innerHTML = `
    <button id="btn-delete-eventPending" class="btn-delete-eventPending rojo invisible" data-id="${event_sprint._id}"></button>
    <form action="" class="FormEventBodyGame w-100">
        <input class="uppercase font-400 text-18" style="width: 99%;" type="text" value="${event_sprint.NameEvent}" spellcheck="false">
        <textarea class="text-16" style="width: 99%;" name="" id="" cols="30" rows="2" spellcheck="false">${event_sprint.DescriptionEvent}</textarea>
        <button class="hiden">submit</button>
        <nav id="containerTagsEventPending_bodyGame">
          <div>
            <button class="">${event_sprint.AllottedTime}h</button>
            <button class="">tag#1</button>
            <button class="">tag#2</button>
            <button class="">tag#3</button>
          </div>
          <div class="content-right">
            <button class="btn-close-eventPending lila invisible" data-id="${event_sprint._id}">close</button>
          </div>
        </nav>
        <div class="separador"></div>
    </form>
    <button id="btn-play-eventPending" class="btn-play-eventPending lechuga invisible" data-id="${event_sprint._id}"></button>
    <button id="btn-stop-eventPending" class="btn-stop-eventPending rojo" data-id="${event_sprint._id}" style="display:none"></button>
    `;

  // Button delete button
  const delete_event = li.querySelector(".btn-delete-eventPending");
  delete_event.onclick = (e) => {
    c_delete_event(delete_event.dataset.id);
  };

  // Button finir finish terminar close voila cerrar button
  const close_event = li.querySelector(".btn-close-eventPending");
  close_event.onclick = (e) => {
    e.preventDefault();
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
  li.setAttribute("id", "boxi");
  li.innerHTML = `
    <div class="content-horizontal">
        <div style="width: 301px; margin-bottom: 5px;">
            <button>tag#1</button>
            <button>tag#2</button>  
            <button>tag#3</button>
        </div>
        <h5 style="width: 40px; margin-left:5px; margin-top:3px;">
        ${new Date(event_played.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
      </h5>
      
    </div>
    <h1 class="uppercase">${event_played.NameEvent}</h1>
    <h4 style="margin-bottom: 5px;">${event_played.DescriptionEvent}</h4>
    <div class="content-horizontal">
        <h5>${event_played.AllottedTime}h|</h5><!--|8h</h5>-->
        <!--<h5 id="EndTimeEventPlayed" class="contenido-derecha">${
          event_played.createdAt
        }</h5>-->
    </div>
    <button class="btn-delete-event w-100 h-10 rojo text-8 negro-t" data-id="${
      event_played._id
    }" style="width:20%;">delete</button>
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
  li.setAttribute("id", "");
  li.classList.add("p-r-35p", "plomo", "invisible");
  li.innerHTML = `
    <form class="" action="">
        <input class="uppercase text-18 font-400 mt-15p" style="width: 80%;" type="text" value="${closed_event_sprint.NameEvent}" spellcheck="false">
        <textarea class="text-16" style="width: 80%;" name="" id="" cols="30" rows="2" spellcheck="false">${closed_event_sprint.DescriptionEvent}</textarea>
        <button id="" class="hiden">submit</button>
        <div class="separador" style="width: 80%; margin-left:20%;"></div>
      </form>
  `;

  return li;
};

// Container to publish old events and new events
const player_UI = (player) => {
  const div = document.createElement("div");
  div.innerHTML = `
  <div id="cajitaStream" class="">
  <h2>${player._id}</h2>
  <h1>${player.PlayerName}</h1>
  <div style="width: 301px; margin-bottom: 5px;">
      <button class="lila">online</button>
      <button class="rojo">out</button>
      <button class="verdelechuga">working</button>
  </div>
  <table>
      <tr>
          <td>Proyecto :</td>
          <td>SCRUMZ</td>
      </tr>
      <tr>
          <td>Avance :</td>
          <td>50%</td>
      </tr>
      <tr>
          <td>Tarea :</td>
          <td>Desarrollo</td>
      </tr>
      <tr>
          <td>Productividad :</td>
          <td>2 h</td>
      </tr>
  </table>
</div>  
  `;
  return div;
};

/**
 * *Fuctions frontend
 */
// Function publish events list from event_backlog from DB
export const publish_old_events_backlog = (events_backlog_list) => {
  pending_event_sprint_list.innerHTML = "";
  events_backlog_list
    .filter((event_sprint) => event_sprint.TeamName === userData.TeamName && event_sprint.AssignedPlayerID === userData._id) // Filtrar eventos por TeamName y AssignedPlayerID
    .forEach((event_sprint) => pending_event_sprint_list.append(pending_event_sprint_UI(event_sprint)));
};

// Function publish closed events list from event_backlog from DB
export const publish_old_closed_events_backlog = (
  closed_events_backlog_list
) => {
  closed_event_sprint_list.innerHTML = "";
  closed_events_backlog_list
    .filter((closed_event_sprint) => closed_event_sprint.TeamName === userData.TeamName && closed_event_sprint.AssignedPlayerID === userData._id) // Filtrar eventos por TeamName y AssignedPlayerID
    .forEach((closed_event_sprint) => closed_event_sprint_list.append(closed_event_sprint_UI(closed_event_sprint)));
};

// Function publish events played list from event_played from DB
export const publish_old_events_played = (events_played_list) => {
  played_event_sprint_list.innerHTML = "";

  events_played_list
    .filter((event_played) => event_played.TeamName === userData.TeamName && event_played.PlayedByPlayerID === userData._id) // Filtrar eventos por TeamName y AssignedPlayerID
    .forEach((event_played) => played_event_sprint_list.append(played_event_sprint_UI(event_played)));
};


// Function publish events played list from event_played from DB
export const publish_count_events_played = (events_played_count) => {
  if (events_played_count.TeamName === userData.TeamName && events_played_count.PlayedByPlayerID === userData._id) {// Filtrar eventos por TeamName y AssignedPlayerID
    console.log(events_played_count)
    containerWorkedHours.innerHTML = "";
    containerWorkedHours.append(
      quantity_played_event_sprint_UI(events_played_count)
      );
    }
  };

  
  
// Function publish new event into sprint from event_backlog from DB
export const publish_new_event_backlog = (new_event_game) => {
  if (new_event_game.TeamName === userData.TeamName && new_event_game.AssignedPlayerID === userData._id) {// Filtrar eventos por TeamName y AssignedPlayerID
    pending_event_sprint_list.append(pending_event_sprint_UI(new_event_game));
  }
};


// Function publish new event into sprint from event_backlog from DB
export const publish_new_event_played = (new_event_played) => {
  if (new_event_played.TeamName === userData.TeamName && new_event_played.PlayedByPlayerID === userData._id) {// Filtrar eventos por TeamName y AssignedPlayerID
    played_event_sprint_list.append(played_event_sprint_UI(new_event_played));
  }
};

// Function publish new event into sprint from event_backlog from DB
export const publish_pomodoro = (pomodoro) => {

  // Filtrar eventos por TeamName y AssignedPlayerID
  if (pomodoro.TeamName === userData.TeamName && pomodoro.PlayedByPlayerID === userData._id) {
    
    const createdAt = new Date(pomodoro.Pomodoro.CreatedTime);
    const now = new Date();

    const EventTimePomodoro = Math.floor((now - createdAt ) / 1000);
      
      const print_pomodoro = () => {
        let EndTimeToPomodoro = pomodorotime - EventTimePomodoro
        
          const print = () => {
            const minutes = Math.floor(EndTimeToPomodoro / 60).toString().padStart(2, '0');
            const seconds = (EndTimeToPomodoro % 60).toString().padStart(2, '0');
            const tiempo = `${minutes}:${seconds}`;
            console.log(tiempo)
            
            if (EndTimeToPomodoro >= 0) {
              clockGame.innerHTML = tiempo;
              EndTimeToPomodoro--;
              if (EndTimeToPomodoro === 60) {
                const audio = new Audio('./sounds/zen-gong.mp3');
                audio.play();
              }
              setTimeout(print, 1000);
            } else {
              clockGame.innerHTML = "25:00";
            }
/*
            } else if (EndTimeToPomodoro === 0) {
                const audio = new Audio('./sounds/zen-gong.mp3');
                audio.play();
                audio.play();
                audio.play();
                audio.play();
            } else if (EndTimeToPomodoro === -1){
              console.log("fin")
 
          };*/
        };
        print();
      };
      print_pomodoro();
  };
};

// Function publish new event into sprint from event_backlog from DB
export const change_filter_period = (data) => {
};