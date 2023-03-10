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
  },
  {
    timestamps: true,
  }
);

/**
 * *Se exporta la coleccion con una 's' al final
 */
export default model("event_backlog", schema);
