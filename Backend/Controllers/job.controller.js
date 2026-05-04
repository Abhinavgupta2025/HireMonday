import {job} from "../Models/jobModel"
import {User} from "../Models/user.model"
import {Notification} from "../Models/notification.model"

export const jobPost = (req,res)=>{
        try{
            const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
            const userId = req.id;
            if(!title||!description||!requirements||!salary||!location||!jobType||!experience||!position||!companyId){
                res.status(400).json({
                    message:"Enter all details please",
                    success:false,
                })
            }
            
        }
        catch(err){

        }
}
