import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../index.css";

function Application() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        degree: "",
        branch: "",
        college: "",
        graduationYear: "",
        skills: "",
        internship: "",
        internshipDuration: "",
        workExperience: "",
        workDetails: "",
        certifications: "",
        achievements: "",
        interestedRoles: "",
        preferredRole: ""
    });

    const [resume, setResume] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // Handle normal input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle resume upload
    const handleResumeChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        if (file.type !== "application/pdf") {
            toast.error("Please upload a PDF resume");
            return;
        }

        setResume(file);
    };

    // Submit application
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check resume
        if (!resume) {
            toast.error("Please upload your resume");
            return;
        }

        try {
            setSubmitting(true);

            // Get JWT token
            const token = localStorage.getItem("token");

            if (!token) {
                toast.error("Please login first");
                navigate("/login");
                return;
            }

            // Create FormData
            const data = new FormData();

            // Add resume
            data.append("resume", resume);

            // Add all form fields
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            console.log("Submitting application...");
            console.log("Application Data:", formData);
            console.log("Resume:", resume);

            // Send application to backend
            const response = await fetch(
                "http://localhost:5000/api/application",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: data
                }
            );

            const result = await response.json();

            console.log("Application response:", result);

            // Backend error
            if (!response.ok) {
                toast.error(
                    result.message || "Application submission failed"
                );
                return;
            }

            // Successful submission
            toast.success("Application submitted successfully");

            // Go to profile
            navigate("/profile");

        } catch (error) {
            console.error("Application error:", error);

            toast.error(
                "Something went wrong while submitting your application"
            );

        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="application-page">

            {/* Header */}
            <div className="application-header">
                <p className="application-tag">
                    ✈️ Career Application
                </p>

                <h1>Build Your Career Profile</h1>

                <p>
                    Tell us about yourself so AI can understand your
                    skills, experience and career goals
                </p>
            </div>

            <form
                className="application-form"
                onSubmit={handleSubmit}
            >

                {/* ================= PERSONAL INFORMATION ================= */}

                <section className="application-section">

                    <div className="application-section-title">
                        <span>🧑</span>

                        <div>
                            <h2>Personal Information</h2>
                            <p>Tell us a little about yourself</p>
                        </div>
                    </div>

                    <div className="form-grid">

                        <div className="form-group">
                            <label>Full Name</label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone</label>

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>
                </section>

                {/* ================= EDUCATION ================= */}

                <section className="application-section">

                    <div className="application-section-title">
                        <span>🎓</span>

                        <div>
                            <h2>Education</h2>
                            <p>
                                Tell us about your educational background
                            </p>
                        </div>
                    </div>

                    <div className="form-grid">

                        <div className="form-group">
                            <label>Degree</label>

                            <select
                                name="degree"
                                value={formData.degree}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select Your Degree
                                </option>

                                <option value="B.Tech">
                                    B.Tech
                                </option>

                                <option value="BCA">
                                    BCA
                                </option>

                                <option value="B.Sc">
                                    B.Sc
                                </option>

                                <option value="M.Tech">
                                    M.Tech
                                </option>

                                <option value="MCA">
                                    MCA
                                </option>

                                <option value="M.Sc">
                                    M.Sc
                                </option>

                                <option value="Other">
                                    Other
                                </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Branch Specialization</label>

                            <input
                                type="text"
                                name="branch"
                                placeholder="e.g. Computer Science"
                                value={formData.branch}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>College/University</label>

                            <input
                                type="text"
                                name="college"
                                placeholder="Enter your college"
                                value={formData.college}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Graduation Year</label>

                            <input
                                type="number"
                                name="graduationYear"
                                placeholder="e.g. 2027"
                                value={formData.graduationYear}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>
                </section>

                {/* ================= RESUME ================= */}

                <section className="application-section">

                    <div className="application-section-title">
                        <span>📝</span>

                        <div>
                            <h2>Resume</h2>
                            <p>Upload your latest resume</p>
                        </div>
                    </div>

                    <label className="resume-upload-box">

                        <input
                            type="file"
                            accept=".pdf,application/pdf"
                            hidden
                            onChange={handleResumeChange}
                        />

                        <div className="upload-icon">
                            📝
                        </div>

                        {resume ? (
                            <>
                                <h3>{resume.name}</h3>
                                <p>Resume selected successfully</p>
                            </>
                        ) : (
                            <>
                                <h3>Upload your resume</h3>
                                <p>Click here to choose PDF file</p>
                            </>
                        )}

                    </label>

                </section>

                {/* ================= SKILLS ================= */}

                <section className="application-section">

                    <div className="application-section-details">
                        <span>🧠</span>

                        <div>
                            <h2>Skills</h2>
                            <p>
                                List the skills you currently have
                            </p>
                        </div>
                    </div>

                    <div className="form-group">

                        <label>
                            Technical & Other Skills
                        </label>

                        <textarea
                            name="skills"
                            placeholder="e.g. Java, Python, React, MongoDB, SQL, Git..."
                            value={formData.skills}
                            onChange={handleChange}
                            rows="4"
                            required
                        />

                        <small>
                            Separate multiple skills using commas
                        </small>

                    </div>

                </section>

                {/* ================= EXPERIENCE ================= */}

                <section className="application-section">

                    <div className="application-section-title">
                        <span>💼</span>

                        <div>
                            <h2>Experience</h2>
                            <p>
                                Tell us about your internships and
                                working experience
                            </p>
                        </div>
                    </div>

                    <div className="form-grid">

                        <div className="form-group">
                            <label>Internship</label>

                            <input
                                type="text"
                                name="internship"
                                placeholder="e.g. Web Development Intern"
                                value={formData.internship}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Internship Duration</label>

                            <input
                                type="text"
                                name="internshipDuration"
                                placeholder="e.g. 3 months"
                                value={formData.internshipDuration}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <div className="form-group">

                        <label>
                            Previous Work Experience
                        </label>

                        <textarea
                            name="workExperience"
                            placeholder="Mention your previous work experiences"
                            value={formData.workExperience}
                            onChange={handleChange}
                            rows="3"
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Work Details
                        </label>

                        <textarea
                            name="workDetails"
                            placeholder="Describe your responsibilities and projects..."
                            value={formData.workDetails}
                            onChange={handleChange}
                            rows="4"
                        />

                    </div>

                </section>

                {/* ================= ACHIEVEMENTS ================= */}

                <section className="application-section">

                    <div className="application-section-title">
                        <span>🏆</span>

                        <div>
                            <h2>Achievements</h2>
                            <p>
                                Add your certifications and achievements
                            </p>
                        </div>
                    </div>

                    <div className="form-group">

                        <label>
                            Certifications
                        </label>

                        <textarea
                            name="certifications"
                            placeholder="e.g. AWS Certified, Google Certificate..."
                            value={formData.certifications}
                            onChange={handleChange}
                            rows="3"
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Achievements
                        </label>

                        <textarea
                            name="achievements"
                            placeholder="e.g. Hackathons, awards, projects, competitions..."
                            value={formData.achievements}
                            onChange={handleChange}
                            rows="4"
                        />

                    </div>

                </section>

                {/* ================= CAREER INTERESTS ================= */}

                <section className="application-section">

                    <div className="application-section-details">

                        <span>🎯</span>

                        <div>
                            <h2>Career Interests</h2>
                            <p>
                                Tell us what kind of roles interest you
                            </p>
                        </div>

                    </div>

                    <div className="form-group">

                        <label>
                            Interested Roles
                        </label>

                        <input
                            type="text"
                            name="interestedRoles"
                            placeholder="e.g. Software Engineer, Data Analyst, ML Engineer"
                            value={formData.interestedRoles}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Preferred Role
                        </label>

                        <input
                            type="text"
                            name="preferredRole"
                            placeholder="Your preferred career role"
                            value={formData.preferredRole}
                            onChange={handleChange}
                            required
                        />

                    </div>

                </section>

                {/* ================= SUBMIT ================= */}

                <div className="application-submit">

                    <p>
                        🤖 Your information will help AI understand
                        your career profile and recommend suitable
                        opportunities
                    </p>

                    <button
                        type="submit"
                        className="application-submit-btn"
                        disabled={submitting}
                    >
                        {submitting
                            ? "Submitting..."
                            : "✈️ Submit"
                        }
                    </button>

                </div>

            </form>
        </div>
    );
}

export default Application;