

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Nenhum token fornecido' });

    const [, token] = authHeader.split(' ');

    try {
        const authService = new AuthService();
        await authService.validateToken(token);
    } catch (error) {
        if (error instanceof AuthError) {
            return res.status(401).send();
        }

        return res.status(500).json({ error });
    }

    return next();
}

export default authenticateToken;