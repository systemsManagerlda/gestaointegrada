import { Schema, model, models } from "mongoose";

const MesaSchema = new Schema ({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    mesa: {type: String, require: true},
})

const Mesa = models.Mesa || model("Mesa", MesaSchema);

export default Mesa;