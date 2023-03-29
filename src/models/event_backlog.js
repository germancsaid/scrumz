/**
 * *Creacion del schema de la coleccion
 */

//import { Schema } from "module";
import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    NameEvent: {
      type: String,
      required: true,
    },
    DescriptionEvent: {
      type: String,
    },
    AllottedTime: {
      type: String,
      default: ""
    },
    StatusEvent: {
      type: String,
      default: "pending"
    },
    AssignedPlayerID: {
      type: String,
      required: true,
    },
    TeamName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * *Se exporta la coleccion con una 's' al final
 */
export default model("event_backlog", schema);
