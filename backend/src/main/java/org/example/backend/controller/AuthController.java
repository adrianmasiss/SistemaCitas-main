package org.example.backend.controller;

import org.example.backend.dto.LoginRequest;
import org.example.backend.dto.LoginResponse;
import org.example.backend.entidad.Usuario;
import org.example.backend.servicio.UsuarioService;
import org.example.backend.seguridad.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        Usuario usuario = usuarioService.autenticarApi(req.getUsername(), req.getClave());
        if (usuario == null) {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }
        String token = jwtUtils.generateToken(usuario.getUsername(), usuario.getRol());
        // Cambiado para incluir el ID
        return ResponseEntity.ok(
                new LoginResponse(token, usuario.getRol(), usuario.getNombre(), usuario.getId())
        );
    }
}
