/**
 * *Import data base schemas
 * todo: events backlog
 * todo: events played
 * todo: players
*/

import event_backlog from "./models/event_backlog";
import event_played from "./models/event_played";

/**
 * *SOCKET CONNECTION
*/
export default (io) => {
  io.on("connection", (socket) => {
    //  One new socket connected in the explorer in the page
    const session = socket.request.session;

    if (session.passport && session.passport.user) {
      const userId = session.passport.user;
      console.log(`New connection: User:: ${userId}     SocketId:: ${socket.id}`);
    } else {
      console.log(`New connection only with socket id ${socket.id}`);
    }
    session.socketId = socket.id;
    session.save();

    /** 
     * *VARIABLES DEFINITED INTO THE SERVER
     * todo List of variables
     * * a.
     */

    /** 
     * *VARIABLES DEFINITED INTO THE CLIENT WITH RESPONSE EMIT FROM SERVER
     * todo List of variables
     * * a.
     */
        /**
     * todo a.
     */
    const player_id = session.passport.user;
      
    
    socket.on("client:c_data_time", async (date) => {
        console.log("Date:", date)
      });

    /**
     * *PAGE THEGAME
     * --------------------------------
     * todo: 1 -> Load information from MONGODB (Querys)
     * * 1.1 Query find events from backlog
     * * 1.2 Query find events from played and count
     * * 1.3 Query find player and teams
     * * 1.4 Query find pomodoro
     */

    /**
     * todo 1.1.
     */
    const s_query_find_event_backlog = async () => {
      //find events from backlog
      
      const find_event_backlog = await event_backlog
        .find({ StatusEvent: "pending", AssignedPlayerID: player_id})
        .sort({ createdAt: -1 });

        //find events from backlog where status event is closed
      const find_closed_event_backlog = await event_backlog
        .find({ StatusEvent: "closed", AssignedPlayerID: player_id})
        .sort({ createdAt: -1 });

      /**
       * !io vs socket analysis for this sintax but io is very inefficient load completely the information to the DB
       */
      // Send data find_event_backlog to the all clients connected
      io.emit(`server:s_query_find_event_backlog${player_id}`, find_event_backlog);

      // Send data find_closed_event_backlog to the all clients connected
      io.emit(`server:s_query_find_closed_event_backlog${player_id}`, find_closed_event_backlog);
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
        .find({ createdAt: { $gte: startOfDay, $lt: endOfDay }})
        .count();

      //find events from played
      const find_event_played = await event_played
      .find({ createdAt: { $gte: startOfDay, $lt: endOfDay }})
      .sort({ createdAt: -1 });    

      /**
       * !io vs socket analysis for this sintax but io is very inefficient load completely the information to the DB
       */
      
      // Send data count_events_played to the all clients connected
      io.emit(`server:s_query_find_count_event_played${player_id}`, count_events_played);
      
      // Send data find_event_played to the all clients connected
      io.emit(`server:s_query_find_event_played${player_id}`, find_event_played);

      // Send selected data related to chosen date in frontend, DAY+
      socket.on("client:c_nextDay_btn", async (date) => {
        // comment
        let startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        let endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        //count events from played
        const count_events_played = await event_played
        .find({ createdAt: { $gte: startOfDay, $lt: endOfDay }})//, TeamName: ChosenTeam})
        .count();    

        //find events from played
        const find_event_played = await event_played
        .find({ createdAt: { $gte: startOfDay, $lt: endOfDay }})//, TeamName: ChosenTeam})
        .sort({ createdAt: -1 });    

        /**
         * !io vs socket analysis for this sintax but io is very inefficient load completely the information to the DB
         */
        // Send data find_event_played to the all clients connected
        io.emit(`server:s_query_find_event_played${player_id}`, find_event_played);

        // Send data count_events_played to the all clients connected
        io.emit(`server:s_query_find_count_event_played${player_id}`, count_events_played);
      })

      // Send selected data related to chosen date in frontend, DAY-
      socket.on("client:c_previousDay_btn", async (date) => {
        // comment
        let startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        let endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        //count events from played
        const count_events_played = await event_played
        .find({ createdAt: { $gte: startOfDay, $lt: endOfDay }})//, TeamName: ChosenTeam})
        .count();    

        //find events from played
        const find_event_played = await event_played
        .find({ createdAt: { $gte: startOfDay, $lt: endOfDay }})//, TeamName: ChosenTeam})
        .sort({ createdAt: -1 });    

        /**
         * !io vs socket analysis for this sintax but io is very inefficient load completely the information to the DB
         */
        // Send data find_event_played to the all clients connected
        io.emit(`server:s_query_find_event_played${player_id}`, find_event_played);

        // Send data count_events_played to the all clients connected
        io.emit(`server:s_query_find_count_event_played${player_id}`, count_events_played);
      })
    };

    // load data in the frontend and ui when new page open or refresh page
    s_query_find_event_played();

    /**
     * todo 1.3.
     */
    /*
      const s_query_find_player_session = async () => {
        //find events from backlog
        const find_data_player_session = await player
          .find({PlayerName: PlayerSession});
          //.sort({ createdAt: -1 });
  
        //find events from backlog where status event is closed
        const find_data_team_player_session = await team
          .find({TeamName: ChosenTeam})
          //.sort({ createdAt: -1 });
  *//*
        /**
         * !io vs socket analysis for this sintax but io is very inefficient load completely the information to the DB
         */
        /*// Send data find_event_backlog to the all clients connected
        io.emit("server:s_query_find_player_session", find_data_player_session)

        io.emit("server:s_query_find_team_player_session", find_data_team_player_session)

      };
  
      // load data in the frontend and ui when new page open or refresh page
      s_query_find_player_session();
*/

    /**
     * todo 1.4.
     */
    const s_query_find_pomodoro = async () => {
      //find events from backlog
      
      const find_pomodoro = await event_played.findOne({ 
        PlayedByPlayerID: player_id
      }).sort({ createdAt: -1 });
      // Send data find_event_backlog to the all clients connected
      io.emit(`server:s_query_find_pomodoro${player_id}`, find_pomodoro);
    };

    // load data in the frontend and ui when new page open or refresh page
    s_query_find_pomodoro();
    /**
     * todo: 2 -> Change information from MONGODB (Querys)
     * * 2.3 Listen signal from client for insert one event into the backlog
     * * 2.4 Listen signal from client for insert one event into the played and pomodoro
     * * 2.5 Listen signal from client for delete one event from the backlog
     * * 2.6 Listen signal from client for update set closed one event from backlog
     * * 2.7 Listen signal from client for delete one event from played
     * * 2.8 Listen signal from client for update set "" one event from backlog
     */

    /**
     * todo 2.3
     */
    socket.on("client:c_insertOne_event_backlog", async (data) => {
      // Insert one event into the backlog
      const new_event_backlog_data = await event_backlog(data);

      let NameEvent = new_event_backlog_data.NameEvent;
      let DescriptionEvent = new_event_backlog_data.DescriptionEvent;
      let AllottedTime = new_event_backlog_data.AllottedTime;
      let AssignedPlayerID = new_event_backlog_data.AssignedPlayerID;
      let TeamName = new_event_backlog_data.TeamName;

      // Insert one event into the played
      const new_event_backlog = new event_backlog({
        NameEvent: NameEvent,
        DescriptionEvent: DescriptionEvent,
        AllottedTime: AllottedTime,
        AssignedPlayerID: AssignedPlayerID,
        TeamName: TeamName,
      });

      /**
       * !Method '.save()' posiblity change command
       */
      const insertOne_event_backlog = await new_event_backlog.save();
      // Load new data from DB
      s_query_find_event_backlog();

      // Send data insertOne_event_backlog to the all clients connected
      io.emit(`server:s_insertOne_event_backlog${player_id}`, insertOne_event_backlog);

    });

    /**
     * todo 2.4
     */
    socket.on("client:c_insertOne_play_event", async (id) => {
      // find events from backlog by id
      const find_event_backlog = await event_backlog.findById(id);

      let NameEvent = find_event_backlog.NameEvent;
      let DescriptionEvent = find_event_backlog.DescriptionEvent;
      let AllottedTime = find_event_backlog.AllottedTime;
      let PlayedByPlayerID = find_event_backlog.AssignedPlayerID;
      let TeamName = find_event_backlog.TeamName;
      let Pomodoro = {
        Status: "Initiated",
        CreatedTime: new Date(),
        FinishTime: null,
      };

      let ModifiedAt = new Date();

      // Insert one event into the played
      const new_event_played = new event_played({
        NameEvent: NameEvent,
        DescriptionEvent: DescriptionEvent,
        AllottedTime: AllottedTime,
        PlayedByPlayerID: PlayedByPlayerID,
        TeamName: TeamName,
        Pomodoro: Pomodoro
      });

      const insertOne_event_played = await new_event_played.save();
      
      // Send data insertOne_event_played to the all clients connected
      //io.emit(`server:s_insertOne_event_played${player_id}`, insertOne_event_played);

      // Send data insertOne_pomodoro to the all clients connected
      s_query_find_pomodoro();
      //io.emit(`server:s_insertOne_pomodoro${player_id}`, insertOne_pomodoro);

      // Load new data from DB
      s_query_find_event_played();
      s_query_find_event_activity();
      
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
      s_query_find_event_activity();
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

      /**
   * todo 1.9
   */
      socket.on("client:c_change_team", async (i) => {
        //Aqui iran los eventos para cambiar de equipo con un clic
        console.log(i)
      });
  
  
      /**
       * *PAGE STREAM
       * --------------------------------
       * todo: 2 -> Load information from MONGODB (Querys)
       * * 2.1 Query find all activity
       */
        /**
         * todo 2.1
         */
        const s_query_find_event_activity = async () => {
    
          //find events from played
          const find_event_activity = await event_played
          .find()
          .sort({ createdAt: -1 });
  
          // Send data find_event_activity to the all clients connected
          io.emit(`server:s_query_find_event_activity`, find_event_activity);
        };
    
        // load data in the frontend and ui when new page open or refresh page
        s_query_find_event_activity();
  
    });

  
};