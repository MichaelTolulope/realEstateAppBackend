import { EmailverificationMailTemplate } from "./emailTemplate.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail= async (email, verificationCode)=>{
    const recipients = [{email}]

   try{
    await mailtrapClient.send({
        from: sender,
        to: recipients,
        subject: "Verification Email",
        category: "verification email",
        html: EmailverificationMailTemplate().replace('{verificationcode}',verificationCode),
    }).then(console.log, console.error);
    console.log("Email sent!");
    
   }catch(error){
    console.log(error.message);
    
   }
}