import { Schema, model, models } from "mongoose";

const EmpresaSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    nomeEmpresa: { type: String, required: true },
    endereco: { type: String, required: true },
    nuit: { type: String, required: true },
    contactos: { type: String, required: true },
    email: { type: String, required: true },
    validade: { type: String, required: true },
    status: { type: String, required: true },
    pacoteAssinado: { type: String, required: true },
    periodo: { type: String, required: true },
  },
  { timestamps: true }
);

const Empresa = models.Empresa || model("Empresa", EmpresaSchema);

export default Empresa;
