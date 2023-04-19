/**
 * *Creacion del schema de la coleccion
 */

//import { Schema } from "module";
import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    IdEventBacklog: {
      type: String,
      required: true,
    },
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
    PlayedByPlayerID: {
      type: String,
      required: true,
    },
    TeamName: {
      type: String,
      required: true,
    },
    Pomodoro: {
      Status: {
        type: String,
      },
      CreatedTime: {
        type: Date,
      },
      FinishTime: {
        type: Date,
      }
    }
  },
  {
    timestamps: true,
  }
);

/**
 * *Se exporta la coleccion con una 's' al final
 */
export default model("event_played", schema);
