import { Schema, model, models } from "mongoose";

const ServicosSchema = new Schema ({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    nomeServico: {type: String, require: true},
    precoServico: {type: String, require: true},
    dataHora: {type: String, require: true},
    funcionario: {type: String, require: true},
    cliente: {type: String, require: true},
    status: {type: String, require: true},
})

const Servicos = models.Servicos || model("Servicos", ServicosSchema);

export default Servicos;