import jwt from "jsonwebtoken";
import { envs } from "./env";

export class jwtAdapter {
  static async generateToken(payload: any, duration: string = "3h") {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        envs.JWT_SEED,
        { expiresIn: duration },
        (error, token) => {
          if (error) return resolve(null);
          resolve(token);
        }
      );
    });
  }


  static async validateToken<T>(token:string):Promise <T | null>{
    return new Promise((resolve)=>{
      jwt.verify(token,envs.JWT_SEED,(err:any,decoded:any)=>{
        if(err) return resolve(null)

          resolve(decoded as T)
      })
    })
  }
}
