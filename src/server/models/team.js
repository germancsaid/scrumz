/**
 * *Creacion del schema de la coleccion
 */

//import { Schema } from "module";
import { Schema, model } from "mongoose";

const schema = new Schema(
  {
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
export default model("team", schema);
