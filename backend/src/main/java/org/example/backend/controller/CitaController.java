package org.example.backend.controller;

import org.example.backend.dto.EspacioCitaDTO;
import org.example.backend.entidad.Usuario;
import org.example.backend.servicio.HorarioService;
import org.example.backend.servicio.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/citas")
public class CitaController {

    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private HorarioService horarioService;

    // Buscar médicos y espacios disponibles
    @GetMapping("/buscar")
    public List<EspacioCitaDTO> buscarCita(
            @RequestParam(required = false) String especialidad,
            @RequestParam(required = false) String ciudad,
            @RequestParam(defaultValue = "3") int dias) {

        List<Usuario> medicos = usuarioService.buscarMedicos(especialidad, ciudad);
        LocalDate hoy = LocalDate.now().plusDays(1);
        return horarioService.espaciosMedicosParaFechas(medicos, hoy, dias);
    }
}
