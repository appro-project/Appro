import Container from "../../containers/hoc/Container";

import VisitedProjects from "../../containers/VisitedProjects";
import React from "react";
import Additional from "../Project/Additional";

export const AdditionalOptions = () => {
    return <section>
        <Container>
            <Additional/>
            <VisitedProjects/>
        </Container>
    </section>;
}

