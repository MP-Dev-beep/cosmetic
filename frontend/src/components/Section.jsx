function Section({ title, children }) {

    return (

        <section className="section">

            <div className="container">

                <h2>{title}</h2>

                {children}

            </div>

        </section>

    );

}

export default Section;