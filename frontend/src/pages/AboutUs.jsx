import "../index.css";
function AboutUs(){
    return (
        <>
        <div className="about-page">
            <section className="about-hero">
                <div className="hero-text">
                    <h2>ABOUT AI CAREERMATCH</h2>
                    <br/>
                    <p>Your Skills,Your Potential,Your Career.</p>
                    <br/>
                    <p>AI CareerMatch is an AI-powered career platform
                        designed to help students and job seekers discover
                        career opportunities that match their skills,
                        education, experience and interests.
                    </p>
                </div>
            </section>
            <section className="text-portion">
                <div className="about-text">
                <h3>Our Mission  Is To Make Your Career Decisions Smarter</h3>
                <div className="mission-texts">
                    <div className="card-part">
                       <h4>Right Career Direction</h4>
                       <img src="/careerpic2.webp"
                            alt="Career Decision"/>
                       <p>We help users understand which career roles
                            align with their abilities and interests.
                            </p>
                    </div>
                     <div className="card-part">
                       <h4>AI-Powered Insights</h4>
                       <img src="/careerpic3.jpg"
                            alt="AI Insights"/>
                       <p>AI analyzes your profile to identify skills,
                        strengths and potential career opportunities.
                        </p>
                    </div>
                     <div className="card-part">
                       <h4>Better Opportunities</h4>
                       <img src="/careerpic7.jpg"
                            alt="opportunities pic"/>
                       <p>Discover job opportunities that match your
                        skills and career goals.</p>
                    </div>
                </div>
                </div>
            </section>
            <section className="steps-part">
                <div className="working-part">
                    <h2>From Profile To Opportunity</h2>
                    <div className="each-step">
                     <h4>Step 01</h4>
                     <p>Create Your Profile.Add your education,skills,internships,experience,achievements and career interests</p>
                    </div>
                    <div className="each-step">
                     <h4>Step 02</h4>
                     <p>AI Understands You.It will analyze the information in your profile to understand your career potential</p>
                    </div>
                    <div className="each-step">
                     <h4>Step 03</h4>
                     <p>Discover Career Opportunities and get AI powered career role suggestions and job recommendations
                        based on your profile.
                     </p>
                    </div>
                </div>
            </section>
            <section className="about-section">
                <div className="about-section-heading">
                    <p>WHY AI CAREERMATCH?</p>
                    <h2>Built Around Your Career</h2>
                </div>
                <div className="feature-card">
                    <div className="feature-icon"> 📝</div>
                    <h2>Complete Profile</h2>
                    <p>Keep your education skills experience achievements and resume in one place</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">🤖 </div>
                    <h3>AI Career Analysis</h3>
                    <p>Let AI analyze your profile and identify suitable career paths</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">🔍</div>
                    <h3>Skill Gap Insights</h3>
                    <p>Understand which skills you need to improve for your desired career</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">🚀</div>
                    <h3>Career Growth</h3>
                    <p>Get insights that help you make better decisions about your professional future</p>
                </div>
            </section>
            <section className="footer">
                <div className="footer-portion">
                    <h2>Ready to Discover your Career</h2>
                    <p>Create your profile and let AI help you find opportunities that match your potential</p>
                </div>
            </section>
            </div>
        </>
    )
}
export default AboutUs;