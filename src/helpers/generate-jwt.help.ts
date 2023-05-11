import jwt  from "jsonwebtoken";
export const generateJwtHelp = (uid: string = "") => {
    return new Promise((resolve, reject) => {
        const payload =  {uid};
        jwt.sign(payload, process.env.SECRET_PRIVATE_KEY!,{
            expiresIn: "4h"
        }, (err: Error | null, token: string | undefined) => {
            if(err){
                reject("No se puedo generar el token");
            }else{
                resolve(token);
            }
        });

    });
};