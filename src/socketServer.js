/**
 * *Import data base schemas
 * todo: events backlog
 */
import event_backlog from "./models/event_backlog";
/**
 * *Socket connection
 */
export default (io) => {
  io.on("connection", (socket) => {
    /**
     * *Socket connected in the explorer
     */
    console.log("Socket new ID", socket.id);

    /**
     * *Read data from DB with socket connection
     */
    const s_query_find_event_backlog = async () => {
      const find_event_backlog = await event_backlog.find();
      // Send data s_query_find_event_backlog to the all clients connected
      /**
       * !io vs socket analysis for this sintax
       */
      io.emit("server:s_query_find_event_backlog", find_event_backlog);
      //console.log(find_event_backlog);
    };
    s_query_find_event_backlog();

    /**
     * *Receive data from Client for insertOne to DB
     */
    socket.on("client:c_insertOne_event_backlog", async (data) => {
      const new_event_backlog = new event_backlog(data);
      // Method '.save()' posiblity change command
      const s_insertOne_event_backlog = await new_event_backlog.save();
      // Send data s_insertOne_event_backlog to the client
      io.emit("server:s_insertOne_event_backlog", s_insertOne_event_backlog);
    });

    /**
     * *Receive data for delete from Client
     */
    socket.on("client:c_delete_event", async (id) => {
      // Send data id to the DB for delete
      await event_backlog.findByIdAndDelete(id);
      // Load data from DB
      s_query_find_event_backlog();
    });

    /**
     * *Receive data for delete from Client
     */
    socket.on("client:c_update_event", async (id) => {
      // Send data id to the DB for delete
      const update_event_backlog = await event_backlog.findById(id);
      console.log(update_event_backlog);
      // Load data from DB
      s_query_find_event_backlog();
    });
  });
};
