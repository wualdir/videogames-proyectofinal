
import jwt from 'jsonwebtoken'
import {envs} from "./envs";

const JWT_KEY = envs.JWT_SEED
export class JwtAdapter {

  static async generateToken(payload: any, duration: string = '3h') {

    return new Promise((resolve) => {
      jwt.sign(payload, JWT_KEY, { expiresIn: duration }, (err, token) => {

        if( err ) return resolve(null);

        resolve(token)
      })
    })

  }

  static async validateToken<T>(token: string): Promise <T | null> {
    return new Promise((resolve) => {

      jwt.verify(token, JWT_KEY, (err: any, decoded: any) => {
        if( err ) return resolve(null)

        resolve(decoded as T)
      })

    })
  }
}