import { Schema, model, models } from "mongoose";

const PresencasSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  nomeColaborador: { type: String, require: true },
  horaChegada: { type: String, require: true },
  data: { type: String, require: true },
  mes: { type: String, require: true },
});

const Presencas = models.Presencas || model("Presencas", PresencasSchema);

export default Presencas;
