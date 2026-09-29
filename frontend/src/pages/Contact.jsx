import {useState} from "react";
import {toast} from "react-toastify";
import "../index.css";
function Contact(){
    const[formData,setFormData]=useState({
        name:"",
        email:"",
        subject:"",
        message:"",
    });
    const[sending,setSending]=useState(false);
    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
         setSending(true);
         const response=await fetch("http://localhost:5000/api/contact",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData)
            }
         );
         const data=await response.json();
         console.log("Contact response:",data);
         if(!response.ok){
            toast.error(data.message || "Message sending failed");
            return;
         }
         toast.success("Message send successfully!");
         setFormData({
            name:"",
            email:"",
            subject:"",
            message:"",
         });
        }catch(error){
         console.error("Contact error:",error);
         toast.error("Server error while sending message");
        } finally {
            setSending(false);
        }
    };
    return (
        <div className="contact-page">
        <section className="contact-hero">
            <h1>GET IN TOUCH</h1>
            <p>We're Here to Help</p>
            <span>Have questions about CareerMatch?
                We'd love to hear from you
            </span>
            </section>
        <section className="contact-section">
            <div className="contact-info">
                <h2>Let's Talk</h2>
                <p>Whether you have a question,feedback,or need help with your career journey,
                    feel free to reach out to us
                </p>
            <div className="contact-info-card">
                <div className="contact-icon">📧
                </div>
                <div>
                    <h3>Email</h3>
                    
        <a
            href="mailto:support@aicareermatch.com"
            className="contact-link"
        >
            support@aicareermatch.com
        </a>
                </div>
            </div>
            <div className="contact-info-card">
                <div className="contact-icon">📞
                </div>
                <div>
                    <h3>Phone</h3>
                    <p>+91 7890521890</p>
                </div>
            </div>
            <div className="contact-info-card">
                <div className="contact-icon">📍
                </div>
                <div>
                    <h3>Location</h3>
                    <p>Kolkata,India</p>
                </div>
            </div>
            <div className="contact-info-card">
                <div className="contact-icon">⏰
                </div>
                <div>
                    <h3>Working Hours</h3>
                    <p>Monday-Friday
                        10AM-6PM
                    </p>
                </div>
            </div>
            </div>
            <div className="contact-form-card">
                <h2>Send Us a Message</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                        </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter your email id"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        </div>
                    <div className="form-group">
                        <label>Subject</label>
                        <input
                          type="text"
                          name="subject"
                          placeholder="Enter your subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                        </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea
                          name="message"
                          placeholder="Write your message..."
                          rows="6"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                        </div>
                    <button type="submit" className="contact-sbmt-btn"
                       disabled={sending}
                    >
                    {sending ? "Sending..." :"Send Message"}
                    </button>    
                </form>
            </div>
        </section>
        <section className="contact-bottom">
            <div className="contact-bottom-icon">
                <h2>Let's Build Your Career Together</h2>
                <p>Your next opportunity could be just one conversation away</p>
            </div>
        </section>
            </div>
    );
}
export default Contact;