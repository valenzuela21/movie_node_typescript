import {User} from "../models/user.model";

export const emailExist = async (email: string = "") => {
    const existEmail = await User.findOne({email: email});
    if (existEmail) {
        throw new Error(`El correo: ${email}, ya está registrado`);
    }
};