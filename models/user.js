import { Schema, model, models } from "mongoose";

const UserSchema = new Schema ({
    email: {
        type: String,
        unique: [true, 'este email ja existe!'],
        required: [true, 'Necessario email!'],
    },
    username: {
        type: String,
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalido, deve conter 8-20 letras alfanumericas e unicas!"],
        required: [true, 'Nome do usuario necessario!'],
    },
    image: {
        type: String,
    }
})

const User = models.User || model("User", UserSchema);

export default User;