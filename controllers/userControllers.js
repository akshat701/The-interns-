const users = require("../models/userSchema");
const userotp = require("../models/userOtp");

exports.userregister = async(req,res)=>{
    const {email,
         phoneNo ,
         userName} = req.body;

         if(!email ||!phoneNo ||!userName){
            res.status(400).json({error:"Please enter all input data"})
         }


         try {
            const presuer = await users.findOne({email:email});

            if(presuer){
                res.status(400).json({error:"This user Allready exist in our db"})
            }
            else{
                const userregister = new users({
                    email,phoneNo,userName
                });

                const storeData = await userregister.save();
                res.status(200).json(storeData);
            }
         } catch (error) {
            res.status(400).json({error:"Invalid Details",error})
         }
}



