import Database from "./connectors/database.js";

class UserRepository {
    constructor() {
        this.databaseConnector = new Database();
    }

    async getUserByEmail(email) {
        const conn = await this.databaseConnector.generateConnection();
        const result = await conn.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }
}

export default UserRepository;