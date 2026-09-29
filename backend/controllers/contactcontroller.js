import Contact from "../model/ContactModel.js";
export const createContact=async(req,res)=>{
    try{
      const {name,email,subject,message}=req.body;
      if(!name || !email || !subject || !message){
        return res.status(400).json({
            message:"All fields are required"
        });
      }
      const contact=await Contact.create({
        name,
        email,
        subject,
        message
      });
      res.status(201).json({
        message:"Message sent successfully",
        contact
      })
    }catch(error){
       console.error("Contact error:",error);
       res.status(500).json({
        message:"Server error",
        error:error.message
       });
    }
};