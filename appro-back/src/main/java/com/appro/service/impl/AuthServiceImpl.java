package com.appro.service.impl;

import com.appro.service.AuthService;
import com.appro.service.JwtService;
import com.appro.web.request.AuthRequest;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Value("${auth.password}")
    private String encodedPassword;

    @Value("${auth.token.cookie-name}")
    private String cookieName;

    @Value("${auth.token.ttl}")
    private int ttl;

    @Override
    public Optional<String> authenticate(AuthRequest authRequest) {
        if (passwordEncoder.matches(authRequest.password(), encodedPassword)) {
            return Optional.of(jwtService.generateToken());
        }
        return Optional.empty();
    }

    @Override
    public void setAuthCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie(cookieName, token);
        cookie.setHttpOnly(true);
        // cookie.setSecure(true); // Enable for HTTPS
        cookie.setPath("/");
        cookie.setMaxAge(ttl);
        response.addCookie(cookie);
    }

    @Override
    public boolean checkToken(HttpServletRequest request) {
        return Optional.ofNullable(jwtService.getJwtFromCookies(request))
                .map(jwtService::isTokenValid)
                .orElse(false);
    }
}