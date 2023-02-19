import jwt from "jsonwebtoken"
import { secret } from "../env"

export const maxAge = 3 * 24 * 60 * 60 // three days in seconds

export const createJWT = (user:any) => {
    const token = jwt.sign({ id: user.id, username: user.username }, `${secret}`, {
        expiresIn: maxAge //expires in 3 days
    }) //takes in the object and the secret (in the .env fileß)
    return token 
}