import jwt from 'jsonwebtoken';
export const isLoggedIn = function (req,res,next)
{
    const token = req.cookies.token;
    if(!token) return res.status(500).json({message:"Unauthorized - No Token Provided"});

    try {
        const data = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        req.user = data;
        next();
    } catch (error) {
        console.log("No token ",message);
        return res.status(500).json({message:"Token is Expired"});
    }
}

