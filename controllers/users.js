module.exports = {
    signUp: async (req, res, next)=>{
        console.log("signup called", req.body.name);
    },
    signIn: async (req, res, next)=>{
        console.log("signin called");
    },
    secret: async (req, res, next)=>{
        console.log("secret called");
    }
}