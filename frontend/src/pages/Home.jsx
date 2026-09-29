import {useNavigate} from "react-router-dom";
import "../index.css";
function Home(){
   const navigate=useNavigate();
   return (
    <div className="home-page">
        <section className="hero-section">
            <div className="hero-content">
                <p>FIND THE CAREER THAT FITS YOU</p>
                <br/>
                <p>Your skills.Your experience.Your Future</p>
                <br/>
                <p>Powered By AI 🤖</p>
            </div>
            <div className="hero-text">
                <p>AI CareerMatch analyzes your resume, skills, education  and experience to discover career opportunities that
                   actually match you.
                </p>
            </div>
            <div className="button-section">
                <button className="apply button"
                 onClick={()=>navigate("/application")}>Apply Now</button>
            </div>
            </section>
        <section className="statistics part">
            <div className="stat-home-card">
                <div className="stat-home-icon">👨‍🎓</div>
                <h2>190+</h2>
                <p>Students Registered</p>
            </div>
            <div className="stat-home-card">
                <div className="stat-home-icon">💼</div>
                <h2>80+</h2>
                <p>Jobs Confirmed</p>
            </div>
            <div className="stat-home-card">
                <div className="stat-home-icon">🎯</div>
                <h2>150+</h2>
                <p>Career Matches</p>
            </div>
            <div className="stat-home-card">
                <div className="stat-home-icon">🤖</div>
                <h2>95%</h2>
                <p>AI Match Success</p>
            </div>
        </section>
        <section className="process-work">
            <div className="step-info">
                <p>HOW IT WORKS</p>
                <h2>Your Career Journey</h2>
                <span>Three simple steps to discover your career opportunities</span>
            </div>
            <div className="steps-container">
                <div className="step-card">
                    <div className="step-icon">
                        📝
                    </div>
                    <h3>Create Your Profile</h3>
                    <p>Tell Tell us about yourself and upload resume.</p>
                </div>
                <div className="step-card">
                    <div className="step-icon">
                         🤖 
                    </div>
                    <h3>AI Analyzes</h3>
                    <p>AI understands your skills and experiences. </p>
                </div>
                <div className="step-card">
                    <div className="step-icon">
                        📝
                    </div>
                    <h3>Get Recommendations</h3>
                    <p>Discover suitable career roles and job opportunities. </p>
                </div>
            </div>
        </section>
        <section className="result part">
            <div className="result-info">
                <p>WHAT YOU GET</p>
                <div className="result-card">
                    <div className="result-icon">
                        📝
                    </div>
                <p>Resume Analysis</p>
                </div>
                <div className="result-card">
                    <div className="result-icon">
                        🎯
                    </div>
                <p>Career Prediction</p>
                </div>
                <div className="result-card">
                    <div className="result-icon">
                        🧠
                    </div>
                <p>Skill Gap Analysis</p>
                </div>
                <div className="result-card">
                    <div className="result-icon">
                        💼
                    </div>
                <p>AI Job Matching</p>
                </div>
            </div>
        </section>
        <section className="footer">
            <div className="final-part">
                <p>READY TO FIND YOUR CAREER?</p>
                <div className="button-section">
                <button className="apply button"
                 onClick={()=>navigate("/application")}>Apply Now</button>
            </div>
            </div>
        </section>
    </div>
   )
}
export default Home;