import { Schema, model, models } from "mongoose";

const EventoSchema = new Schema ({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    nomeNoiva: {type: String},
    nomeNoivo: {type: String, require: true},
    localEvento: {type: String, require: true},
    dataEvento: {type: String, require: true},
    orcamentoInicial: {type: String, require: true},
})

const Evento = models.Evento || model("Evento", EventoSchema);

export default Evento;