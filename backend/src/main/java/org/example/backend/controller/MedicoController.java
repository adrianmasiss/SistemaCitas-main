package org.example.backend.controller;

import org.example.backend.entidad.Usuario;
import org.example.backend.servicio.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicos")
public class MedicoController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/aprobados")
    public List<Usuario> listarMedicosAprobados() {
        return usuarioService.buscarTodosLosMedicosAprobados();
    }
}
