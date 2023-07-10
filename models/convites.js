import { Schema, model, models } from "mongoose";

const ConvitesSchema = new Schema ({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    modelo: {type: String, require: true},
    preco: {type: String, require: true},
})

const Convites = models.Convites || model("Convites", ConvitesSchema);

export default Convites;