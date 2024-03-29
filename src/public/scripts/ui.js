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
let eventsBacklogList = {};
let eventsPlayedList = {};

let pomodorotime = 25 * 60;
let workedHoursDay = 8;
//For create News Tareas
//console.log(userData._id);
//console.log(userData.Email);
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
    userData.TeamName
  );
  FormNewEventBodyGame.reset();
};

/**
 * * PLAY
 */

// Container to publish old events and new events
const pending_event_sprint_list = document.querySelector(
  "#containerEventsListPending"
);
// Function publish events list from event_backlog from DB
export const publish_old_events_backlog = (data_events_backlog) => {
  pending_event_sprint_list.innerHTML = "";
  eventsBacklogList = data_events_backlog;

  data_events_backlog
    .filter(
      (event_sprint) =>
        event_sprint.TeamName === userData.TeamName &&
        event_sprint.AssignedPlayerID === userData._id &&
        event_sprint.StatusEvent === "pending"
    ) // Filtrar eventos por TeamName, AssignedPlayerID y status
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .forEach((event_sprint) =>
      pending_event_sprint_list.append(pending_event_sprint_UI(event_sprint))
    );
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
// Function publish new event into sprint from event_backlog from DB
export const change_filter_period = (filter) => {
  if (filter === "All Dates") {
    filter = "This Week";
  } else if (filter === "This Week") {
    filter = "For Today";
  } else {
    filter = "All Dates";
  }
  pending_event_sprint_list.innerHTML = "";

  eventsBacklogList
    .filter(
      (event_sprint) =>
        event_sprint.TeamName === userData.TeamName &&
        event_sprint.AssignedPlayerID === userData._id &&
        event_sprint.StatusEvent === "pending"
    ) // Filtrar eventos por TeamName, AssignedPlayerID y status
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .forEach((event_sprint) =>
      pending_event_sprint_list.append(pending_event_sprint_UI(event_sprint))
    );
}; // Function publish new event into sprint from event_backlog from DB
export const change_filter_class = (filter) => {
  if (filter === "All Dates") {
    filter = "This Week";
  } else if (filter === "This Week") {
    filter = "For Today";
  } else {
    filter = "All Dates";
  }
  pending_event_sprint_list.innerHTML = "";

  eventsBacklogList
    .filter(
      (event_sprint) =>
        event_sprint.TeamName === userData.TeamName &&
        event_sprint.AssignedPlayerID === userData._id &&
        event_sprint.StatusEvent === "pending"
    ) // Filtrar eventos por TeamName, AssignedPlayerID y status
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .forEach((event_sprint) =>
      pending_event_sprint_list.append(pending_event_sprint_UI(event_sprint))
    );
}; // Function publish new event into sprint from event_backlog from DB
export const change_filter_type = (filter) => {
  if (filter === "All Dates") {
    filter = "This Week";
  } else if (filter === "This Week") {
    filter = "For Today";
  } else {
    filter = "All Dates";
  }
  pending_event_sprint_list.innerHTML = "";

  eventsBacklogList
    .filter(
      (event_sprint) =>
        event_sprint.TeamName === userData.TeamName &&
        event_sprint.AssignedPlayerID === userData._id &&
        event_sprint.StatusEvent === "pending"
    ) // Filtrar eventos por TeamName, AssignedPlayerID y status
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .forEach((event_sprint) =>
      pending_event_sprint_list.append(pending_event_sprint_UI(event_sprint))
    );
};

// Container to publish old events and new events
const closed_event_sprint_list = document.querySelector(
  "#containerEventsListClosed"
);
// Function publish closed events list from event_backlog from DB
export const publish_old_closed_events_backlog = (data_events_backlog) => {
  closed_event_sprint_list.innerHTML = "";
  data_events_backlog
    .filter(
      (events_backlog) =>
        events_backlog.TeamName === userData.TeamName &&
        events_backlog.AssignedPlayerID === userData._id &&
        events_backlog.StatusEvent === "closed"
    ) // Filtrar eventos por TeamName, AssignedPlayerID y status
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) // Ordenar eventos por updateAt en orden descendente
    .forEach((events_backlog) =>
      closed_event_sprint_list.append(closed_event_sprint_UI(events_backlog))
    );
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

// Container to publish events played list
const played_event_sprint_list = document.querySelector(
  "#containerBoxi_listPlayed"
);
// Function publish events played list from event_played from DB
export const publish_old_events_played = (events_played_list) => {
  played_event_sprint_list.innerHTML = "";
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  eventsPlayedList = events_played_list; //si trae datos

  const filteredEvents = events_played_list.filter(
    (event_played) =>
      event_played.TeamName === userData.TeamName &&
      event_played.PlayedByPlayerID === userData._id &&
      new Date(event_played.createdAt) >= startOfDay &&
      new Date(event_played.createdAt) <= endOfDay
  );
  const filteredEventsWithCount = filteredEvents.map((event_played) => ({
    ...event_played,
    count: workedHoursDay / filteredEvents.length,
  }));
  filteredEventsWithCount.forEach((event_played) =>
    played_event_sprint_list.append(played_event_sprint_UI(event_played))
  );
};
export const NextDay = (SelectedMoment) => {
  played_event_sprint_list.innerHTML = "";
  const startOfDay = new Date(SelectedMoment);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(SelectedMoment);
  endOfDay.setHours(23, 59, 59, 999);

  const filteredEvents = eventsPlayedList.filter(
    (event_played) =>
      event_played.TeamName === userData.TeamName &&
      event_played.PlayedByPlayerID === userData._id &&
      new Date(event_played.createdAt) >= startOfDay &&
      new Date(event_played.createdAt) <= endOfDay
  );
  const filteredEventsWithCount = filteredEvents.map((event_played) => ({
    ...event_played,
    count: workedHoursDay / filteredEvents.length,
  }));
  filteredEventsWithCount.forEach((event_played) =>
    played_event_sprint_list.append(played_event_sprint_UI(event_played))
  );
};
export const PreviousDay = (SelectedMoment) => {
  played_event_sprint_list.innerHTML = "";
  const startOfDay = new Date(SelectedMoment);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(SelectedMoment);
  endOfDay.setHours(23, 59, 59, 999);

  const filteredEvents = eventsPlayedList.filter(
    (event_played) =>
      event_played.TeamName === userData.TeamName &&
      event_played.PlayedByPlayerID === userData._id &&
      new Date(event_played.createdAt) >= startOfDay &&
      new Date(event_played.createdAt) <= endOfDay
  );
  const filteredEventsWithCount = filteredEvents.map((event_played) => ({
    ...event_played,
    count: workedHoursDay / filteredEvents.length,
  }));
  filteredEventsWithCount.forEach((event_played) =>
    played_event_sprint_list.append(played_event_sprint_UI(event_played))
  );
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
        ${new Date(event_played.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </h5>
      
    </div>
    <h1 class="uppercase">${event_played.NameEvent}</h1>
    <h4 style="margin-bottom: 5px;">${event_played.DescriptionEvent}</h4>
    <div class="content-horizontal">
    <h5>${event_played.AllottedTime}h|${event_played.count.toFixed(2)}h</h5>
    <!--|8h</h5>-->
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

// Container to publish events played list
const containerWorkedHours = document.querySelector("#containerWorkedHours");
// Function publish events played list from event_played from DB
export const publish_count_events_played = (events_played_count) => {};
// Container to publish old events and new events
const quantity_played_event_sprint_UI = (quantity) => {
  const div = document.createElement("div");
  div.innerHTML = `
    <h5>Trabajadas hoy:</h5>
    <h1 class="text-28 font-400">${quantity}</h1>
  `;
  return div;
};

/**
 * * PLAY Objects
 */

// Container to publish old events and new events
const clockGame = document.getElementById("clockGame");

// Function publish new event into sprint from event_backlog from DB
export const publish_pomodoro = (pomodoro) => {
  // Filtrar eventos por TeamName y AssignedPlayerID
  if (
    pomodoro.TeamName === userData.TeamName &&
    pomodoro.PlayedByPlayerID === userData._id
  ) {
    const createdAt = new Date(pomodoro.Pomodoro.CreatedTime);
    const now = new Date();

    const EventTimePomodoro = Math.floor((now - createdAt) / 1000);

    const print_pomodoro = () => {
      let EndTimeToPomodoro = pomodorotime - EventTimePomodoro;

      const print = () => {
        const minutes = Math.floor(EndTimeToPomodoro / 60)
          .toString()
          .padStart(2, "0");
        const seconds = (EndTimeToPomodoro % 60).toString().padStart(2, "0");
        const tiempo = `${minutes}:${seconds}`;
        console.log(tiempo);

        if (EndTimeToPomodoro >= 0) {
          clockGame.innerHTML = tiempo;
          EndTimeToPomodoro--;
          if (EndTimeToPomodoro === 60) {
            const audio = new Audio("./sounds/zen-gong.mp3");
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
  }
};

/**
 * * STREAM
 */
// Container to publish events played list
const event_activity_list = document.querySelector("#event_activity_list");
// Container to publish old events and new events
const publish_events_activity_UI = (event_played) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>||</td>
    <td>${new Date(event_played.Date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
    })}·${new Date(event_played.Date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}</td>
    <td>ctardio</td>
    <td>${event_played.NameEvent}</td>
    <td style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;max-width:246px;">${
      event_played.status
    }: ${event_played.DescriptionEvent}</td>
  `;
  return tr;
};
// Function publish events played list from event_played from DB
export const publish_events_activity = (events_played_list) => {
  event_activity_list.innerHTML = "";
  events_played_list.forEach((event_played) =>
    event_activity_list.append(publish_events_activity_UI(event_played))
  );
};

// Container to publish events played list
const events_in_projects_list = document.querySelector(
  "#events_in_projects_list"
);
// Function publish events played list from event_closed_count from DB
export const publish_events_in_projects = (events_closed_list) => {
  events_in_projects_list.innerHTML = "";
  events_closed_list.forEach((event_closed_count) =>
    events_in_projects_list.append(
      publish_events_in_projects_UI(event_closed_count)
    )
  );
};
// Container to publish old events and new events
const publish_events_in_projects_UI = (event_closed_count) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${event_closed_count._id}</td>
    <td>${event_closed_count.TotalEvents}</td>
  `;
  return tr;
};
// Container to publish events played list
const events_in_projects_list_closed = document.querySelector(
  "#events_in_projects_list_closed"
);
// Container to publish old events and new events
const publish_events_in_projects_closed_UI = (event_closed_count) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${event_closed_count._id}</td>
    <td>${event_closed_count.Closed}</td>
  `;
  return tr;
};
// Function publish events played list from event_closed_count from DB
export const publish_events_in_projects_closed = (events_closed_list) => {
  events_in_projects_list_closed.innerHTML = "";
  events_closed_list.forEach((event_closed_count) =>
    events_in_projects_list_closed.append(
      publish_events_in_projects_closed_UI(event_closed_count)
    )
  );
};
// Container to publish events played list
const hours_in_projects_list = document.querySelector(
  "#hours_in_projects_list"
);
// Function publish events played list from event_closed_count from DB
export const publish_hours_in_projects_list = (events_played_list) => {
  hours_in_projects_list.innerHTML = "";
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const countsAdded = events_played_list.map((event_played) => ({
    ...event_played,
    count:
      workedHoursDay /
      parseInt(
        events_played_list.filter((o) => {
          const eventDate = new Date(o.createdAt);
          return (
            eventDate.getFullYear() ===
              new Date(event_played.createdAt).getFullYear() &&
            eventDate.getMonth() ===
              new Date(event_played.createdAt).getMonth() &&
            eventDate.getDate() === new Date(event_played.createdAt).getDate()
          );
        }).length
      ),
  }));

  console.log(countsAdded);

  const groupedCounts = countsAdded.reduce((accumulator, currentValue) => {
    const { NameEvent, count } = currentValue;
    accumulator[NameEvent] = (accumulator[NameEvent] || 0) + count;
    return accumulator;
  }, {});

  const sortedCounts = Object.entries(groupedCounts).sort(
    (a, b) => b[1] - a[1]
  );

  const groupedCountsDesc = sortedCounts.reduce((accumulator, currentValue) => {
    const [NameEvent, count] = currentValue;
    accumulator[NameEvent] = count;
    return accumulator;
  }, {});

  console.log(groupedCountsDesc);

  for (const NameEvent in groupedCountsDesc) {
    const count = groupedCountsDesc[NameEvent];
    if (typeof count === "number") {
      const countString = count.toFixed(2);
      hours_in_projects_list.append(
        publish_hours_in_projects_list_UI(NameEvent, countString)
      );
    }
  }
};

// Container to publish old events and new events
const publish_hours_in_projects_list_UI = (NameEvent, countString) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${NameEvent}</td>
    <td>${countString} h</td>
  `;
  return tr;
};
