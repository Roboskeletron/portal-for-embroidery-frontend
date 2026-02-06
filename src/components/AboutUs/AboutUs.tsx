function AboutUs() {
    const headerStyle = {
        fontWeight: 600,
    };

    return (
        <div className="container p-5 overflow-hidden">
            <h1 className="h4 mb-4 fw-normal text-center">About Us</h1><br/>
            <div className="container w-75">
                <h6 className="h5 mb-3 fw-normal text-right">
                    <span style={headerStyle}>&ensp; The Heart of the Designer Community</span></h6>
                <h6 className="h5 mb-3 fw-normal text-right">
                    &ensp; We’re on a mission to build the world’s best community for creatives to share,
                    inspire, and grow.</h6><br/>
                <h6 className="h5 mb-3 fw-normal text-right">
                    <span style={headerStyle}>&ensp; Over 1 trillion pixels shared. What are you working on?</span></h6>
                <h6 className="h5 mb-3 fw-normal text-right">
                    &ensp; Tens of millions of people look for design inspiration and feedback on our Portal. We help
                    players like you share small screenshots (shots) to show off your current projects, boost your
                    portfolio, and love what you do—no matter what kind of creative professional you are.<br/>
                    &ensp; Founded in 2023, we are a bootstrapped and profitable company helping design talent share,
                    inspire, and grow by over 40,000 of today’s most innovative brands around the world.</h6>
            </div>
        </div>
    );
}

export default AboutUs;