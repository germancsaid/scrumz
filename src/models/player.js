/**
 * *Creacion del schema de la coleccion
 */

//import { Schema } from "module";
import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    PlayerName: {
      type: String,
      required: true,
    },
    NickName: {
      type: String,
    },
    Email: {
      type: String,
    },
    Password: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

/**
 * *Se exporta la coleccion con una 's' al final
 */
export default model("player", schema);
