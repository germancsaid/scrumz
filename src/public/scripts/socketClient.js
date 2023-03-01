/**
 * *Socket connection
 */
const socket = io();

/**
 * !ON ON ON ON ON ON ON ON ON ON ON ON ON ON ON ON ON ON ON ON ON
 */
/**
 * * PARA PUBLICAR EVENTOS PENDIENTES DE events_backlog
 */
// Receive data s_query_find_event_backlog to the server
export const c_query_find_event_backlog = (callback) => {
  socket.on("server:s_query_find_event_backlog", callback);
};

// Receive data s_query_find_event_backlog to the server
export const c_query_find_closed_event_backlog = (callback) => {
  socket.on("server:s_query_find_closed_event_backlog", callback);
};

/**
 * * PARA PUBLICAR EVENTOS EJECUTADOS DE events_played
 */

// Receive data s_query_find_event_played to the server
export const c_query_find_event_played = (callback) => {
  socket.on("server:s_query_find_event_played", callback);
};

// Receive data s_query_find_count_event_played to the server
export const c_query_find_count_event_played = (callback) => {
  socket.on("server:s_query_find_count_event_played", callback);
};


/**
 * * PARA INSERTAR EVENTOS EN events_backlog
 */
// Sent events for insertOne to DB server
export const c_insertOne_event_backlog = (NameEvent, DescriptionEvent) => {
  socket.emit("client:c_insertOne_event_backlog", {
    NameEvent,
    DescriptionEvent,
  });
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
// Publish new events from DB server
export const c_publish_insertOne_event_played = (callback) => {
  socket.on("server:s_insertOne_event_played", callback);
};

/**
 * !EMIT EMIT EMIT EMIT EMIT EMIT EMIT EMIT EMIT EMIT EMIT EMIT EMIT
 */

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

// Delete new events from DB server
export const c_delete_event_played = (id) => {
  socket.emit("client:c_delete_event_played", id);
};

/**
 * * PARA INSERTAR EVENTOS EN events_played
 */
// Sent events played for insertOne to DB server
export const c_insertOne_play_event = (id) => {
  socket.emit("client:c_insertOne_play_event", id);
};