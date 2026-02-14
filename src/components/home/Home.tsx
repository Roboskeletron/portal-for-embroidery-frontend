function Home() {
    return (
        <div className="container py-5">
            <div className="p-5 text-center">
                <h1 className="h3 fw-normal">Hello, My Friend !</h1>
                <br/>

                {/* d-flex and justify-content-center ensures this specific width div is centered */}
                <div className="d-flex justify-content-center">
                    <div className="w-75">
                        <h6 className="h5 mb-5 fw-normal">
                            Hope, You will enjoy our portal, because here you will
                            find a lot of things that will inspire you for new embroideries!
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;