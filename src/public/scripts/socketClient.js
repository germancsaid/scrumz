/**
 * *Socket connection
 */
const socket = io();

// Receive data s_query_find_event_backlog to the server
export const c_query_find_event_backlog = (callback) => {
  socket.on("server:s_query_find_event_backlog", callback);
};

// Sent events for insertOne to DB server
export const c_insertOne_event_backlog = (NameEvent, DescriptionEvent) => {
  socket.emit("client:c_insertOne_event_backlog", {
    NameEvent,
    DescriptionEvent,
  });
};

// Publish new events from DB server
export const c_publish_insertOne_event_backlog = (callback) => {
  socket.on("server:s_insertOne_event_backlog", callback);
};

// Delete new events from DB server
export const c_delete_event = (id) => {
  socket.emit("client:c_delete_event", id);
};

// Play new events from DB server
export const c_play_event = (id) => {
  socket.emit("client:c_delete_event", id);
};

// Update events from DB server
export const c_update_event = (id) => {
  socket.emit("client:c_update_event", id);
};

