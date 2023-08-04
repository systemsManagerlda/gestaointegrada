import { Schema, model, models } from "mongoose";

const CronogramaSchema = new Schema ({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    titulo: {type: String, require: true},
    data: {type: String, require: true},
    corpo: {type: String, require: true},
})

const Cronograma = models.Cronograma || model("Cronograma", CronogramaSchema);

export default Cronograma;