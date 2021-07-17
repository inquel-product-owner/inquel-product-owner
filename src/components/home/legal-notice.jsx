import React, { useState, useEffect } from "react";
import Header from "./shared/navbar";
import Footer from "./shared/footer";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../common/ErrorFallback";
import Loading from "../common/loader";

const LegalNotice = () => {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Legal Notice | IQ Labs Academy";

        setLoading(false);
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header />

            <header className="jumbotron">
                <h1 className="mb-0">Legal Notice</h1>
            </header>

            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => window.location.reload()}
            >
                <main className="container mb-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 col-md-11">
                            <div className="card" style={{ minHeight: "50vh" }}>
                                <div className="card-body">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Volutpat lacus laoreet non curabitur
                                    gravida. Lectus arcu bibendum at varius vel
                                    pharetra vel turpis. Quis ipsum suspendisse
                                    ultrices gravida dictum fusce ut. Elit duis
                                    tristique sollicitudin nibh sit amet commodo
                                    nulla. Vivamus arcu felis bibendum ut
                                    tristique et egestas quis. Felis imperdiet
                                    proin fermentum leo vel orci porta non
                                    pulvinar. Id aliquet lectus proin nibh nisl.
                                    Enim sit amet venenatis urna. Duis tristique
                                    sollicitudin nibh sit amet commodo. Dui
                                    sapien eget mi proin. Adipiscing bibendum
                                    est ultricies integer quis auctor elit. Et
                                    magnis dis parturient montes nascetur
                                    ridiculus mus. Imperdiet sed euismod nisi
                                    porta lorem mollis aliquam ut porttitor.
                                    Metus aliquam eleifend mi in. Odio morbi
                                    quis commodo odio. Lectus mauris ultrices
                                    eros in cursus. Adipiscing elit pellentesque
                                    habitant morbi tristique senectus et.
                                    Pellentesque pulvinar pellentesque habitant
                                    morbi. Sed vulputate odio ut enim blandit.
                                    Purus sit amet volutpat consequat. In eu mi
                                    bibendum neque egestas congue quisque
                                    egestas diam. Rutrum quisque non tellus orci
                                    ac. Scelerisque purus semper eget duis at
                                    tellus at. Vel turpis nunc eget lorem dolor
                                    sed viverra ipsum. Eu sem integer vitae
                                    justo. Euismod lacinia at quis risus.
                                    Aliquam ut porttitor leo a diam
                                    sollicitudin. Faucibus scelerisque eleifend
                                    donec pretium vulputate. Cursus risus at
                                    ultrices mi tempus imperdiet. Eu facilisis
                                    sed odio morbi quis commodo. Orci porta non
                                    pulvinar neque laoreet suspendisse interdum
                                    consectetur libero. Quis imperdiet massa
                                    tincidunt nunc pulvinar sapien et ligula
                                    ullamcorper. Massa tempor nec feugiat nisl
                                    pretium fusce id velit ut. Egestas tellus
                                    rutrum tellus pellentesque. Augue eget arcu
                                    dictum varius duis at. Sed sed risus pretium
                                    quam vulputate. Duis ut diam quam nulla
                                    porttitor massa id. Elit sed vulputate mi
                                    sit amet mauris commodo quis. Posuere ac ut
                                    consequat semper viverra nam libero justo
                                    laoreet. Donec enim diam vulputate ut. Eget
                                    mauris pharetra et ultrices neque ornare
                                    aenean euismod. Cras tincidunt lobortis
                                    feugiat vivamus. Et malesuada fames ac
                                    turpis egestas. Lacus sed turpis tincidunt
                                    id. Morbi tincidunt augue interdum velit
                                    euismod in pellentesque massa. Libero nunc
                                    consequat interdum varius sit amet mattis
                                    vulputate.
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Loading component */}
                {isLoading ? <Loading /> : ""}
            </ErrorBoundary>

            <Footer />
        </>
    );
};

export default LegalNotice;
