package org.example.backend.controller;

import org.example.backend.entidad.Horario;
import org.example.backend.entidad.Usuario;
import org.example.backend.servicio.HorarioService;
import org.example.backend.servicio.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/horarios")
public class HorarioController {

    @Autowired
    private HorarioService horarioService;
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/medico/{medicoId}")
    public List<Horario> listar(@PathVariable Long medicoId) {
        Usuario medico = usuarioService.buscarPorId(medicoId).orElse(null);
        return horarioService.listarHorariosPorMedico(medico);
    }

    @PostMapping("/crear")
    public ResponseEntity<?> crear(@RequestBody Horario horario) {
        horarioService.crearHorario(horario);
        return ResponseEntity.ok("Horario creado");
    }
}
