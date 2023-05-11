import {Request, Response} from "express";
import {User} from "../models/user.model";
import bcryptjs from "bcrypt";
import {generateJwtHelp} from "../helpers/generate-jwt.help";

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos."
            });
        }
        if (!user.state) {
            return res.status(400).json({
                msg: "El usuario se encuentra en cancelación"
            });
        }

        const validPassword: boolean = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Usuario o Password no son correctos..."
            });
        }

        const token = await generateJwtHelp(user.id);
        res.json({
            user,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Error hable con el administrador"
        });
    }
};

export const register = async (req: Request, res: Response) => {
    const {name, email, password, rol} = req.body;
    const user = new User({name, email, password, rol});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        user
    });
};