import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = async (res, id, role) => {
    try {
        const token = jwt.sign(
            { id, role },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )

        res.cookie('token', token, {
            maxAge: 3600000, // Cookie will expire in 1 hour (in milliseconds)
            httpOnly: true,  // This makes the cookie inaccessible to JavaScript (helps prevent XSS attacks)
            secure: process.env.NODE_ENV === 'production',  // Cookie is only sent over HTTPS in production
            sameSite: 'strict'  // Restricts cookie to same-site requests for CSRF protection
        })
    } catch (error) {
        console.log(error);
        
    }
}

export default generateTokenAndSetCookie;