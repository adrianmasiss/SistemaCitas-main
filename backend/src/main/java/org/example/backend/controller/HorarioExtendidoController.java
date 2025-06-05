package org.example.backend.controller;

import org.example.backend.dto.EspacioDTO;
import org.example.backend.entidad.Usuario;
import org.example.backend.servicio.HorarioService;
import org.example.backend.servicio.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/horario-extendido")
public class HorarioExtendidoController {

    @Autowired
    private HorarioService horarioService;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/{medicoId}")
    public List<EspacioDTO> horarioExtendido(
            @PathVariable Long medicoId,
            @RequestParam(defaultValue = "1") int offset,
            @RequestParam(defaultValue = "7") int dias
    ) {
        if (offset < 1) offset = 1;
        if (dias < 1) dias = 1;
        if (dias > 30) dias = 30;
        Usuario medico = usuarioService.buscarPorId(medicoId).orElse(null);
        if (medico == null) return List.of();

        LocalDate fechaBase = LocalDate.now().plusDays(offset);
        return horarioService.calcularNdias(medico, fechaBase, dias);
    }
}
