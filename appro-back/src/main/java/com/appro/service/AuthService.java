package com.appro.service;

import com.appro.web.request.AuthRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Optional;

public interface AuthService {

    Optional<String> authenticate(AuthRequest request);

    void setAuthCookie(HttpServletResponse response, String token);

    boolean checkToken(HttpServletRequest request);
}
