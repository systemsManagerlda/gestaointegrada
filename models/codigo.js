import { Schema, model, models } from "mongoose";

const CodigoSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  codigo: { type: String, require: true },
});

const Codigo = models.Codigo || model("Codigo", CodigoSchema);

export default Codigo;
