import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';

const protection=(expectedRole)=>{
    return (req, res, next)=>{
        const token = req.cookies.token;
        if(!token){
            return res.status(401)
            .send({message:"no access token, access denied!"})
        }

        try {
            const decodedUserInfo = jwt.verify(token, process.env.JWT_SECRET);
 
            req.user = decodedUserInfo;

            if(req.user.role != expectedRole){
                return res.status(403)
                .send({message:"You don't have permission to access this resource!"})
            }

            next();

        } catch (error) {
            console.log(error);
            res.status(401)
            .send({message:"Invalid or expired token!"})
            
        }
    }
    
}
export default protection;