import {Job} from "../Models/jobModel"
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
            const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
            });

            const students = await User.find({role:"student"});
            const notification = students.map((student)=>({
                    userId:student._id,
                    message: "Hurray new job is available for you",
                    type: "job-post",
            }))
            await Notification.insertMany(notifications);
            return res.status(200).json({
                message:"Job posted successfully",
                success:true,
            })
        }
        catch(err){
            console.log(error);
            res.status(400).json({
                message: "Failed to Post",
                success: "false",
            })
        }
}
   export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;

        const jobs = await Jobs.find({ created_by: adminId })
            .populate({ path: 'company' })
            .sort({ createdAt: -1 });

        if (jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs",
                success: false,
            });
        }

        return res.status(200).json({
            jobs,
            success: true,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Error fetching the files",
            success: false,
        });
    }
};

