package com.appro.web;

import com.appro.service.AuthService;
import com.appro.web.request.AuthRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest, HttpServletResponse response) {
        return authService.authenticate(authRequest)
                .map(token -> {
                    authService.setAuthCookie(response, token);
                    return ResponseEntity.ok().build();
                })
                .orElseGet(() -> ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body("Invalid password"));
    }

    @GetMapping("/check")
    public ResponseEntity<?> checkAuth(HttpServletRequest request) {
        return authService.checkToken(request)
                ? ResponseEntity.ok().body("Token is valid")
                : ResponseEntity.status(401).body("Unauthorized");
    }
}
