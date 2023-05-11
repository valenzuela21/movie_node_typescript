import {Schema, model} from "mongoose";

enum RolUser {
    ADMIN_ROLE,
    USER_ROLE
}

export interface IUser{
    name: string,
    email: string,
    password: string,
    rol: string,
    state: boolean
}

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "El correo es obligatorio"]
    },
    password: {
        type: String,
        required: [true, "El correo es obligatorio"]
    },
    rol: {
        type: String,
        required: true,
        default: "USER_ROL",
        enum: RolUser
    },
    state: {
        type: Boolean,
        default: true
    }
});


UserSchema.methods.toJSON = function (){
    const {__v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
};


export const User = model<IUser>("User", UserSchema);
