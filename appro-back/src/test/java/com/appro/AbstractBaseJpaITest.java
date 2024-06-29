package com.appro;

import com.appro.repository.ImageRepository;
import com.appro.repository.ProjectRepository;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest(properties = {
        "spring.datasource.driverClassName=org.h2.Driver",
        "spring.datasource.username=sa",
        "spring.jpa.database-platform=org.hibernate.dialect.H2Dialect",
        "spring.jpa.hibernate.ddl-auto=create-drop",
        "spring.flyway.enabled=true"
})
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public abstract class AbstractBaseJpaITest {

    @Autowired
    protected ProjectRepository projectRepository;

    @Autowired
    protected ImageRepository imageRepository;

}
