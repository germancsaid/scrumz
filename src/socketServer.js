/**
 * *Import data base schemas
 * todo: events backlog
 * todo: events played
 */
import event_backlog from "./models/event_backlog";
import event_played from "./models/event_played";

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
     * *LOAD INFORMATION TO THE DB
     */

    /**
     * *Read events_backlog from DB with socket connection
     */
    const s_query_find_event_backlog = async () => {
      const find_event_backlog = await event_backlog
        .find({ StatusEvent: "pending" })
        .sort({ createdAt: 1 });

      const find_closed_event_backlog = await event_backlog
        .find({ StatusEvent: "closed" })
        .sort({ createdAt: -1 });
      // Send data s_query_find_event_backlog to the all clients connected
      /**
       * !io vs socket analysis for this sintax but io is very inefficient load completely the information to the DB
       */
      io.emit("server:s_query_find_event_backlog", find_event_backlog);
      //console.log(find_event_backlog);
      io.emit("server:s_query_find_closed_event_backlog", find_closed_event_backlog);
    };
    s_query_find_event_backlog();

    /**
     * *Read data from played DB with socket connection
     */
    const s_query_find_event_played = async () => {
      let startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      let endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      console.log(startOfDay);
      console.log(endOfDay);
      console.log(Date());
      console.log(Date());
      const count_events_played = await event_played
        .find({ createdAt: { $gte: startOfDay, $lt: endOfDay } })
        .count();
      console.log(count_events_played);
      const find_event_played = await event_played.find({
        createdAt: { $gte: startOfDay, $lt: endOfDay },
      });
      console.log(find_event_played);

      // Send data s_query_find_event_played to the all clients connected
      /**
       * !io vs socket analysis for this sintax but io is very inefficient load completely the information to the DB
       */
      io.emit("server:s_query_find_event_played", find_event_played);
      io.emit("server:s_query_find_count_event_played", count_events_played);

      //console.log(find_event_backlog);
    };
    s_query_find_event_played();

    /**
     * *INFORMATION UPDATE TO THE DB
     */

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
     * *Insert and read send events_played from DB with socket connection
     */
    socket.on("client:c_insertOne_play_event", async (id) => {
      const find_event_backlog = await event_backlog.findById(id);

      let NameEvent = find_event_backlog.NameEvent;
      let DescriptionEvent = find_event_backlog.DescriptionEvent;

      const new_event_played = new event_played({
        NameEvent: NameEvent,
        DescriptionEvent: DescriptionEvent,
      });
      const s_insertOne_event_played = await new_event_played.save();

      io.emit("server:s_insertOne_event_played", s_insertOne_event_played);

      s_query_find_event_played();
    });

    /**
     * *Receive data for delete event backlog from Client
     */
    socket.on("client:c_delete_event", async (id) => {
      // Send data id to the DB for delete
      await event_backlog.findByIdAndDelete(id);
      // Load data from DB
      s_query_find_event_backlog();
    });

    /**
     * *Receive data for close event backlog from Client
     */
    socket.on("client:c_close_event", async (id) => {
      // Send data id to the DB for delete
      await event_backlog.findByIdAndUpdate(id, { StatusEvent: "closed" });
      // Load data from DB
      s_query_find_event_backlog();
    });

    /**
     * *Receive data for delete event played from Client
     */
    socket.on("client:c_delete_event_played", async (id) => {
      // Send data id to the DB for delete
      await event_played.findByIdAndDelete(id);
      // Load data from DB
      s_query_find_event_played();
    });

    /**
     * *Receive data for update event played from Client
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
