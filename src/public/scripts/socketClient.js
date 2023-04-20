/**
 * *Socket connection
 */
const socket = io();
const player_id = userData._id

/**
 * todo ON ON ON ON ON ON ON ON ON ON ON ON ON ON ON ON ON ON ON ON ON
 */
/**
 * * GENERAL
*/
// Receive data s_query_find_event_backlog to the server
export const c_query_find_player_session = (Player) => {
  socket.on("server:s_query_find_player_session", Player)
};

export const c_query_find_team_player_session = (Team) => {
  socket.on("server:s_query_find_team_player_session", Team)
};

/**
 * * PARA PUBLICAR EVENTOS PENDIENTES DE events_backlog
 */
// Receive data s_query_find_event_backlog to the server
export const c_query_find_event_backlog = (callback) => {
  socket.on(`server:s_query_find_event_backlog${player_id}`, callback);
};

/**
 * * PARA PUBLICAR EVENTOS FINALIZADOS DE events_backlog
 */
// Receive data s_query_find_event_backlog to the server
export const c_query_find_closed_event_backlog = (callback) => {
  socket.on(`server:s_query_find_closed_event_backlog${player_id}`, callback);
};

/**
 * * PARA PUBLICAR EN STREAM LISTA PLAYERS player
 */
// Receive data s_query_find_event_played to the server
export const c_query_find_event_activity = (callback) => {
  socket.on(`server:s_query_find_event_activity`,callback);
};

// Receive data s_query_find_event_played to the server
export const c_query_total_events_in_projects = (callback) => {
  socket.on(`server:s_query_total_events_in_projects`,callback);

};// Receive data s_query_find_event_played to the server
export const c_query_total_events_in_projects_closed = (callback) => {
  socket.on(`server:s_query_total_events_in_projects_closed`,callback);
};

/**
 * * PARA PUBLICAR EVENTOS EJECUTADOS DE events_played
 */

// Receive data s_query_find_event_played to the server
export const c_query_find_pomodoro = (callback) => {
  socket.on(`server:s_query_find_pomodoro${player_id}`,callback);
};

// Receive data s_query_find_event_played to the server
export const c_query_find_event_played = (callback) => {
  socket.on(`server:s_query_find_event_played${player_id}`,callback);
};

// Receive data s_query_find_count_event_played to the server
export const c_query_find_count_event_played = (callback) => {
  socket.on(`server:s_query_find_count_event_played${player_id}`, callback);
};


/**
 * * PARA PUBLICAR NUEVOS EVENTOS EN LA PAGINA
 */
// Publish new events from DB server
export const c_publish_insertOne_event_backlog = (callback) => {
  socket.on("server:s_insertOne_event_backlog", callback);
};

/**
 * * PARA PUBLICAR NUEVOS EVENTOS EJECUTADOS EN LA PAGINA
 */

/**
 * !EMIT EMIT EMIT EMIT EMIT EMIT EMIT EMIT EMIT EMIT EMIT EMIT EMIT
 */

/**
 * * PARA INSERTAR EVENTOS EN events_backlog
 */
// Sent events for insertOne to DB server
export const c_insertOne_event_backlog = (
  NameEvent,
  DescriptionEvent,
  AllottedTime,
  AssignedPlayerID,
  TeamName,
) => {
  socket.emit("client:c_insertOne_event_backlog", {
    NameEvent: NameEvent.toUpperCase(), // convierte a mayúsculas
    DescriptionEvent,
    AllottedTime,
    AssignedPlayerID,
    TeamName,
  });
};

/**
 * *Buttons
 */


// Delete new events from DB server
export const c_delete_event = (id) => {
  socket.emit("client:c_delete_event", id);
};

// Close events from DB server
export const c_close_event = (id) => {
  socket.emit("client:c_close_event", id);
};

// Delete events played from DB server
export const c_delete_event_played = (id) => {
  socket.emit("client:c_delete_event_played", id);
};

export const NextDay = (SelectedMoment) => {
  socket.emit("client:c_nextDay_btn", SelectedMoment);
};

export const PreviousDay = (SelectedMoment) => {
  socket.emit("client:c_previousDay_btn", SelectedMoment);
};

export const OtherTeam = (ChangeTeam) => {
  socket.emit("client:c_OtherTeam_btn", ChangeTeam);
};


/**
 * * PARA INSERTAR EVENTOS EN events_played
 */
// Sent events played for insertOne to DB server
export const c_insertOne_play_event = (id) => {
  socket.emit("client:c_insertOne_play_event", id);
};



/**
 * * CONSTANTES DE LA APP CLIENT PARA ENVIAR AL SERVER
 */
export const c_data_time = (date) => {
  socket.emit('client:c_data_time', date)
}

export const c_data_player = (date) => {
  socket.emit('client:c_data_player', date)
}