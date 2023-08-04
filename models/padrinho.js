import { Schema, model, models } from "mongoose";

const PadrinhoSchema = new Schema ({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    mensagem: {type: String, require: true},
    nomeConvidado: {type: String, require: true},
    emailConvidado: {type: String, require: true},
    grupo: {type: String, require: true},
    mesa: {type: String, require: true},
    tipoConvidado: {type: String, require: true},
    status: {type: String, require: true},
})

const Padrinho = models.Padrinho || model("Padrinho", PadrinhoSchema);

export default Padrinho;