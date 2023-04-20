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
  /** 
   * *VARIABLES DEFINITED INTO THE SERVER
   * todo List of variables
   * * a.
  */
    //  One new socket connected in the explorer in the page
    const session = socket.request.session;
    session.socketId = socket.id;
    session.save();
    const player_id = session.passport.user;
  /**
   * *PAGE PLAY
   * --------------------------------
   * todo: 1 -> Load information from MONGODB (Querys)
   * * 1.1 Query find events from backlog
   * * 1.2 Query find events from played
   * * 1.3 Query find player and teams
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
     * todo: 2 -> API Change information from MONGODB (Querys)
     * * 2. Update
     * * 2.1 Listen signal from client for insert one event into the backlog
     * * 2.2 Listen signal from client for insert one event into the played and pomodoro
     * * 2.3 Listen signal from client for delete one event from the backlog
     * * 2.4 Listen signal from client for update set closed one event from backlog
     * * 2.5 Listen signal from client for delete one event from played
     * * 2.6 Listen signal from client for update set "" one event from backlog
     */

    /**
     * todo 2.1
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

      const insertOne_event_backlog = await new_event_backlog.save();
      // Load new data from DB
      s_query_find_event_backlog();

      // Send data insertOne_event_backlog to the all clients connected
      io.emit(`server:s_insertOne_event_backlog${player_id}`, insertOne_event_backlog);

    });

    /**
     * todo 2.2
     */
    socket.on("client:c_insertOne_play_event", async (id) => {
      // find events from backlog by id
      const find_event_backlog = await event_backlog.findById(id);

      let IdEventBacklog = find_event_backlog._id;
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
        IdEventBacklog: IdEventBacklog,
        NameEvent: NameEvent,
        DescriptionEvent: DescriptionEvent,
        AllottedTime: AllottedTime,
        PlayedByPlayerID: PlayedByPlayerID,
        TeamName: TeamName,
        Pomodoro: Pomodoro
      });

      const insertOne_event_played = await new_event_played.save();
      
      s_query_find_pomodoro();
      s_query_find_event_played();
      s_query_find_event_activity();
      
    });

    /**
     * todo 2.3
     */
    socket.on("client:c_delete_event", async (id) => {
      // find event from backlog by id and delete event
      await event_backlog.findByIdAndDelete(id);

      // Load or refresh data from DB
      s_query_find_event_backlog();
    });

    /**
     * todo 2.4
    */
    socket.on("client:c_close_event", async (id) => {
      // find event from backlog by id and update event set closed
      await event_backlog.findByIdAndUpdate(id, { StatusEvent: "closed" });

      // Load or refresh data from DB
      s_query_find_event_backlog();
      s_query_find_event_activity();
      s_query_total_events_in_projects();

    });

    /**
     * todo 2.5 
     */
    socket.on("client:c_delete_event_played", async (id) => {
      // find event from played by id and delete event
      await event_played.findByIdAndDelete(id);

      // Load data from DB
      s_query_find_event_played();
      s_query_find_event_activity();
    });
  
    /**
     * *PAGE STREAM
     * --------------------------------
     * todo:  -> Load information from MONGODB (Querys)
     * *  Query find all activity
     */

    /**
     * todo 
     */
      const s_query_find_event_activity = async () => {
        const find_event_activity = await event_backlog.aggregate([
        // Filtro para encontrar los eventos cerrados
        { $match: { StatusEvent: "closed" } },

        // Selección de campos
        { $project: { Date: "$updatedAt", PlayedByPlayerID: "$AssignedPlayerID", NameEvent: 1, DescriptionEvent: 1, status: { $literal: "Concluido" } } },

        // Unión con los eventos de la colección "event_playeds"
        { $unionWith: { coll: "event_playeds", pipeline: [] } },

        // Selección de campos
        { $project: { Date: { $ifNull: [ "$createdAt", "$Date" ] }, PlayedByPlayerID: 1, NameEvent: 1, DescriptionEvent: 1, status: { $ifNull: [ "$status", "Trabajando" ] } } },

        // Ordenamiento por fecha de creación o actualización descendente
        { $sort: { Date: -1 } }
      ]).exec();
      
/*
      //find events from played
      const find_event_activity = await event_played
      .find()
      .sort({ createdAt: -1 });*/

      // Send data find_event_activity to the all clients connected
      io.emit(`server:s_query_find_event_activity`, find_event_activity);
      };
      // load data in the frontend and ui when new page open or refresh page
      s_query_find_event_activity();

    /**
     * todo
    */
      const s_query_total_events_in_projects_closed = async () => {
        const total_events_in_projects_closed = await event_backlog.aggregate([
          
          // Primero, hacemos una etapa de coincidencia para encontrar solo los eventos cerrados
          { $match: { StatusEvent: 'closed' } },
          // Luego, agrupamos los eventos según el campo NameEvent y contamos los eventos cerrados en cada grupo
          { $group: { _id: '$NameEvent', Closed: { $sum: 1 } } },

          { $sort: { _id: 1 } }
        ]);
        // Send data total_events_in_projects to the all clients connected
        io.emit(`server:s_query_total_events_in_projects_closed`, total_events_in_projects_closed);
      };
  
      // load data in the frontend and ui when new page open or refresh page
      s_query_total_events_in_projects_closed();
      
      /**
      * todo
      */
      const s_query_total_events_in_projects = async () => {
        const total_events_in_projects = await event_backlog.aggregate([
        // Primero, hacemos una etapa de coincidencia para encontrar solo los eventos cerrados
        { $match: {} },
        // Luego, agrupamos los eventos según el campo NameEvent y contamos los eventos cerrados en cada grupo
        { $group: { _id: '$NameEvent', TotalEvents: { $sum: 1 } } },

        { $sort: { _id: 1 } }
        ]);
      // Send data total_events_in_projects to the all clients connected
      io.emit(`server:s_query_total_events_in_projects`, total_events_in_projects);
      };
      // load data in the frontend and ui when new page open or refresh page
      s_query_total_events_in_projects();
    });
};