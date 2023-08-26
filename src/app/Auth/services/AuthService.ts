import jwt from 'jsonwebtoken'
import AuthError from "@app/Auth/exceptions/AuthError"
import config from '@/config'
import { get, set } from '@/lib/redis';
import Database from '@/lib/database';

export default class AuthService {
    private databaseConnector: Database;
    
    constructor(){
        this.databaseConnector = new Database()
    }

    async singIn(email: string, password: string): Promise<{user: object; token: string}> {
        
        const conn = await this.databaseConnector.generateConnection()
        const result = await conn.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password])
        const user = result.rows[0]

        if (email !== user.email && password !== user.password) {
            throw new AuthError('Email e Senha não confere!')
        }

        if (email !== user.email) {
            throw new AuthError('Email não confere!')
        }

        if (password !== user.password) {
            throw new AuthError('Senha não confere!')
        }

        const { id, fullName } = user

        const token = jwt.sign({id}, config.auth.secret, {
            expiresIn: config.auth.expiresIn
        })

        return {
            user: {
                id,
                fullName,
                email,
            },
            token,
        }
    }

    async singOut(token: string): Promise<void> {
        await this.blackListToken(token)
    }

    async validateToken(token: string): Promise<string> {
        try{
            if(await this.isTokenBlackListed(token)){
                throw new AuthError('Tonke está na BlackList')
            }
            const decoded = jwt.verify(token,config.auth.secret) as {
                id: string
            }
            return decoded.id
        }catch(error){
            throw new AuthError('Token inválido')
        }
    }

    private async isTokenBlackListed(token: string): Promise<boolean> {
        const blackListedToken = await get(`tokens:invalidated:${token}`)

        return !!blackListedToken
    }

    private async blackListToken(token: string): Promise<void> {
        await set(`tokens:invalidated:${token}`, true)
    }
}