package com.appro.configuration.web;

import com.appro.configuration.web.properties.WebCorsProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.view.BeanNameViewResolver;
import org.springframework.web.servlet.view.InternalResourceView;

@Configuration
@EnableWebMvc
@RequiredArgsConstructor
public class WebConfiguration implements WebMvcConfigurer {
    private final WebCorsProperties webConfigProperties;

    @Bean
    public InternalResourceView indexView() {
        InternalResourceView view = new InternalResourceView();
        view.setUrl("/index.html");
        return view;
    }

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.setPathMatcher(new AntPathMatcher());
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("indexView");
        registry.addViewController("/{x:[\\w\\-]+}").setViewName("indexView");
        registry.addViewController("/{x:^(?!api$).*$}/**/{y:[\\w\\-]+}").setViewName("indexView");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/", "file:target/classes/static/");
    }

    @Bean
    public BeanNameViewResolver beanNameViewResolver() {
        return new BeanNameViewResolver();
    }


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        WebCorsProperties.Cors cors = webConfigProperties.getCors();
        registry.addMapping("/**")
                .allowedOrigins(cors.getAllowedOrigins())
                .allowedMethods(cors.getAllowedMethods())
                .allowedHeaders(cors.getAllowedHeaders())
                .exposedHeaders(cors.getExposedHeaders())
                .allowCredentials(true)
                .maxAge(3600);
    }
}
