import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../index.css";

function Profile() {
    const navigate = useNavigate();

    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    const [analysis, setAnalysis] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);

    const token = localStorage.getItem("token");

    // ================= FETCH PROFILE =================

    const fetchProfile = async () => {
        try {
            if (!token) {
                toast.error("Please login first");
                navigate("/login");
                return;
            }

            const response = await fetch(
                "http://localhost:5000/api/application/my-application",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            console.log("Profile status:", response.status);
            console.log("Profile response:", data);

            // No application submitted yet
            if (response.status === 404) {
                setApplication(null);
                return;
            }

            // Other backend errors
            if (!response.ok) {
                toast.error(
                    data.message || "Unable to load profile"
                );

                setApplication(null);
                return;
            }

            // Application successfully found
            setApplication(data.application);

        } catch (error) {
            console.error("Profile error:", error);

            setApplication(null);

            toast.error(
                "Server error while loading profile"
            );

        } finally {
            setLoading(false);
        }
    };

    // ================= LOAD PROFILE =================

    useEffect(() => {
        fetchProfile();
    }, []);

    // ================= AI ANALYSIS =================

    const handleAIAnalysis = async () => {
        try {
            setAnalyzing(true);

            const response = await fetch(
                "http://localhost:5000/api/analyze",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            console.log("AI Response:", data);

            if (!response.ok) {
                toast.error(
                    data.message || "AI Analysis failed"
                );
                return;
            }

            setAnalysis(data.analysis);

        } catch (error) {
            console.error("AI analysis error:", error);

            toast.error(
                "Something went wrong while analyzing your profile"
            );

        } finally {
            setAnalyzing(false);
        }
    };

    // ================= LOADING =================

    if (loading) {
        return (
            <div className="profile-loading">
                Loading your profile...
            </div>
        );
    }

    // ================= NO APPLICATION =================

    if (!application) {
        return (
            <div className="profile-empty">

                <h2>👤 No Profile Found</h2>

                <p>
                    Please complete your career application first.
                </p>

                <button
                    onClick={() => navigate("/application")}
                >
                    Apply Now ➡️
                </button>

            </div>
        );
    }

    // ================= PROFILE =================

    return (
        <div className="profile-page">

            {/* ================= HEADER ================= */}

            <div className="profile-header">

                <div>

                    <p>MY PROFILE</p>

                    <h1>
                        👋 {application.name}
                    </h1>

                    <span>
                        Your career information
                    </span>

                </div>

                <button
                    className="edit-profile-btn"
                    onClick={() => navigate("/application")}
                >
                    ✏️ Edit Profile
                </button>

            </div>


            {/* ================= PERSONAL INFORMATION ================= */}

            <div className="profile-card">

                <h2>👤 Personal Information</h2>

                <div className="profile-grid">

                    <div>
                        <span>Name</span>

                        <strong>
                            {application.name}
                        </strong>
                    </div>

                    <div>
                        <span>Email</span>

                        <strong>
                            {application.email}
                        </strong>
                    </div>

                    <div>
                        <span>Phone</span>

                        <strong>
                            {application.phone}
                        </strong>
                    </div>

                </div>

            </div>


            {/* ================= EDUCATION ================= */}

            <div className="profile-card">

                <h2>🎓 Education</h2>

                <div className="profile-grid">

                    <div>
                        <span>Degree</span>

                        <strong>
                            {application.degree}
                        </strong>
                    </div>

                    <div>
                        <span>Branch</span>

                        <strong>
                            {application.branch}
                        </strong>
                    </div>

                    <div>
                        <span>College</span>

                        <strong>
                            {application.college}
                        </strong>
                    </div>

                    <div>
                        <span>Graduation Year</span>

                        <strong>
                            {application.graduationYear || "-"}
                        </strong>
                    </div>

                </div>

            </div>


            {/* ================= SKILLS ================= */}

            <div className="profile-card">

                <h2>🧠 Skills</h2>

                <p className="profile-text">
                    {application.skills || "None"}
                </p>

            </div>


            {/* ================= EXPERIENCE ================= */}

            <div className="profile-card">

                <h2>💼 Experience</h2>

                <div className="profile-grid">

                    <div>

                        <span>Internship</span>

                        <strong>
                            {application.internship || "None"}
                        </strong>

                    </div>

                    <div>

                        <span>Duration</span>

                        <strong>
                            {application.internshipDuration || "-"}
                        </strong>

                    </div>

                </div>


                <h3>
                    Previous Work Experience
                </h3>

                <p className="profile-text">
                    {application.workExperience || "None"}
                </p>


                <h3>
                    Work Details
                </h3>

                <p className="profile-text">
                    {application.workDetails || "None"}
                </p>

            </div>


            {/* ================= ACHIEVEMENTS ================= */}

            <div className="profile-card">

                <h2>🏆 Achievements</h2>

                <h3>
                    Certifications
                </h3>

                <p className="profile-text">
                    {application.certifications || "None"}
                </p>


                <h3>
                    Achievements
                </h3>

                <p className="profile-text">
                    {application.achievements || "None"}
                </p>

            </div>


            {/* ================= CAREER INTERESTS ================= */}

            <div className="profile-card">

                <h2>🎯 Career Interests</h2>

                <div className="profile-grid">

                    <div>

                        <span>
                            Interested Roles
                        </span>

                        <strong>
                            {application.interestedRoles || "None"}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Preferred Role
                        </span>

                        <strong>
                            {application.preferredRole || "None"}
                        </strong>

                    </div>

                </div>

            </div>


            {/* ================= RESUME ================= */}

            <div className="profile-card">

                <h2>📝 Resume</h2>

                <div className="resume-profile">

                    <span>
                        📝
                    </span>

                    <strong>
                        {application.resume?.fileName ||
                            "Resume Uploaded"}
                    </strong>

                </div>

            </div>


            {/* ================= AI ANALYSIS ================= */}

            <div className="profile-ai-card">

                <div className="ai-icon">
                    🤖
                </div>

                <div>

                    <h2>
                        AI Career Analysis
                    </h2>

                    <p>
                        Your profile is ready for AI analysis.
                        We'll use your skills, education,
                        experience and interests to recommend
                        suitable career opportunities.
                    </p>


                    <button
                        className="ai-analysis-btn"
                        onClick={handleAIAnalysis}
                        disabled={analyzing}
                    >

                        {analyzing
                            ? "🤖 AI analyzing..."
                            : "🤖 Analyze My Profile"
                        }

                    </button>


                    {/* ================= AI RESULT ================= */}

                    {analysis && (

                        <div className="ai-result">

                            <h2>
                                🤖 AI Career Recommendations
                            </h2>

                            <p>
                                Based on your skills,
                                education and experience,
                                AI recommends:
                            </p>


                            <div className="career-roles">

                                {analysis.recommendedRoles?.map(
                                    (role, index) => (

                                        <div
                                            className="career-role-card"
                                            key={index}
                                        >

                                            <span className="role-number">
                                                {index + 1}
                                            </span>

                                            <h3>
                                                {role}
                                            </h3>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default Profile;