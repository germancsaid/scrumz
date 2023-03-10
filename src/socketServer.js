/**
 * *Import data base schemas
 * todo: events backlog
 * todo: events played
 * todo: players
 */
import event_backlog from "./models/event_backlog";
import event_played from "./models/event_played";
import player from "./models/player";

/**
 * *SOCKET CONNECTION
 */
export default (io) => {
  io.on("connection", (socket) => {
    //  One new socket connected in the explorer in the page
    console.log("Socket new ID", socket.id);

    /**
     * *PAGE THEGAME
     * --------------------------------
     * todo: Load information from MONGODB (Querys)
     * * 1.1 Query find events from backlog
     * * 1.2 Query find events from played and count
     */

    /**
     * todo 1.1.
     */
    const s_query_find_event_backlog = async () => {
      //find events from backlog
      const find_event_backlog = await event_backlog
        .find({ StatusEvent: "pending" })
        .sort({ createdAt: -1 });

      //find events from backlog where status event is closed
      const find_closed_event_backlog = await event_backlog
        .find({ StatusEvent: "closed" })
        .sort({ createdAt: -1 });

      /**
       * !io vs socket analysis for this sintax but io is very inefficient load completely the information to the DB
       */
      // Send data find_event_backlog to the all clients connected
      io.emit("server:s_query_find_event_backlog", find_event_backlog);

      // Send data find_closed_event_backlog to the all clients connected
      io.emit(
        "server:s_query_find_closed_event_backlog",
        find_closed_event_backlog
      );
    };

    // load data in the frontend and ui when new page open or refresh page
    s_query_find_event_backlog();

    /**
     * todo 1.2.
     */
    const s_query_find_event_played = async () => {
      //Define variables for the filters of the played events
      // Today
      let startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      let endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      //count events from played
      const count_events_played = await event_played
        .find({ createdAt: { $gte: startOfDay, $lt: endOfDay } })
        .count();

      //find events from played
      const find_event_played = await event_played
      .find({ createdAt: { $gte: startOfDay, $lt: endOfDay } })
      .sort({ createdAt: -1 });    

      /**
       * !io vs socket analysis for this sintax but io is very inefficient load completely the information to the DB
       */
      // Send data find_event_played to the all clients connected
      io.emit("server:s_query_find_event_played", find_event_played);

      // Send data count_events_played to the all clients connected
      io.emit("server:s_query_find_count_event_played", count_events_played);

      socket.on("client:c_nextDay_btn", async (date) => {
        // comment
        let startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        let endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        console.log(startOfDay + ": " + date + "charlys ")

        //count events from played
        const count_events_played = await event_played
          .find({ createdAt: { $gte: startOfDay, $lt: endOfDay } })
          .count();

        //find events from played
        const find_event_played = await event_played
        .find({ createdAt: { $gte: startOfDay, $lt: endOfDay } })
        .sort({ createdAt: -1 });    

        /**
         * !io vs socket analysis for this sintax but io is very inefficient load completely the information to the DB
         */
        // Send data find_event_played to the all clients connected
        io.emit("server:s_query_find_event_played", find_event_played);

        // Send data count_events_played to the all clients connected
        io.emit("server:s_query_find_count_event_played", count_events_played);
      })

      socket.on("client:c_previousDay_btn", async (date) => {
        // comment
        let startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        let endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        console.log(startOfDay + ": " + date + "charlys ")

        //count events from played
        const count_events_played = await event_played
          .find({ createdAt: { $gte: startOfDay, $lt: endOfDay } })
          .count();

        //find events from played
        const find_event_played = await event_played
        .find({ createdAt: { $gte: startOfDay, $lt: endOfDay } })
        .sort({ createdAt: -1 });    

        /**
         * !io vs socket analysis for this sintax but io is very inefficient load completely the information to the DB
         */
        // Send data find_event_played to the all clients connected
        io.emit("server:s_query_find_event_played", find_event_played);

        // Send data count_events_played to the all clients connected
        io.emit("server:s_query_find_count_event_played", count_events_played);
      })

    };

    // load data in the frontend and ui when new page open or refresh page
    s_query_find_event_played();

    /**
     * todo Change information from MONGODB (Querys)
     * * 1.3 Listen signal from client for insert one event into the backlog
     * * 1.4 Listen signal from client for insert one event into the played
     * * 1.5 Listen signal from client for delete one event from the backlog
     * * 1.6 Listen signal from client for update set closed one event from backlog
     * * 1.7 Listen signal from client for delete one event from played
     * * 1.8 Listen signal from client for update set "" one event from backlog
     */

    /**
     * todo 1.3
     */
    socket.on("client:c_insertOne_event_backlog", async (data) => {
      // Insert one event into the backlog
      const new_event_backlog = new event_backlog(data);
      /**
       * !Method '.save()' posiblity change command
       */
      const insertOne_event_backlog = await new_event_backlog.save();

      // Send data insertOne_event_backlog to the all clients connected
      io.emit("server:s_insertOne_event_backlog", insertOne_event_backlog);

      // Load new data from DB
      s_query_find_event_backlog();
    });

    /**
     * todo 1.4
     */
    socket.on("client:c_insertOne_play_event", async (id) => {
      // find events from backlog by id
      const find_event_backlog = await event_backlog.findById(id);

      let NameEvent = find_event_backlog.NameEvent;
      let DescriptionEvent = find_event_backlog.DescriptionEvent;
      let AllottedTime = find_event_backlog.AllottedTime;

      // Insert one event into the played
      const new_event_played = new event_played({
        NameEvent: NameEvent,
        DescriptionEvent: DescriptionEvent,
        AllottedTime: AllottedTime,
      });
      const insertOne_event_played = await new_event_played.save();

      // Send data insertOne_event_played to the all clients connected
      io.emit("server:s_insertOne_event_played", insertOne_event_played);

      // Load new data from DB
      s_query_find_event_played();
    });

    /**
     * todo 1.5
     */
    socket.on("client:c_delete_event", async (id) => {
      // find event from backlog by id and delete event
      await event_backlog.findByIdAndDelete(id);

      // Load or refresh data from DB
      s_query_find_event_backlog();
    });

    /**
     * todo 1.6
     */
    socket.on("client:c_close_event", async (id) => {
      // find event from backlog by id and update event set closed
      await event_backlog.findByIdAndUpdate(id, { StatusEvent: "closed" });

      // Load or refresh data from DB
      s_query_find_event_backlog();
    });

    /**
     * todo 1.7 
     */
    socket.on("client:c_delete_event_played", async (id) => {
      // find event from played by id and delete event
      await event_played.findByIdAndDelete(id);

      // Load data from DB
      s_query_find_event_played();
    });

    /**
     * todo 1.8
     */
    socket.on("client:c_update_event", async (id) => {
      // find event from backlog by id and update event set ""
      const update_event_backlog = await event_backlog.findById(id);
      console.log(update_event_backlog);

      // Load data from DB
      s_query_find_event_backlog();
    });
  });


/**
 * *PAGE STREAM
 * --------------------------------
 * todo: Load information from MONGODB (Querys)
 * * 2.1  Query find user from player
 */

/**
 * todo 2.1
 */
const s_query_find_player = async () => {
  const find_player = await player.find().sort({ createdAt: 1 });
  /*
      const find_closed_event_backlog = await event_backlog
        .find({ StatusEvent: "closed" })
        .sort({ createdAt: -1 });*/
  // Send data s_query_find_event_backlog to the all clients connected
  /**
   * !io vs socket analysis for this sintax but io is very inefficient load completely the information to the DB
   */
  io.emit("server:s_query_find_player", find_player);
  //console.log(find_event_backlog);
  /*
      io.emit("server:s_query_find_closed_event_backlog", find_closed_event_backlog);*/
};
s_query_find_player();

};