package org.example.backend.servicio;

import org.example.backend.entidad.Cita;
import org.example.backend.entidad.Usuario;
import org.example.backend.repositorio.CitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CitaService {

    @Autowired
    private CitaRepository citaRepository;

    public boolean pacienteYaTieneCitaEnEseMomento(Usuario paciente, LocalDateTime fechaHora) {
        return citaRepository.findByPacienteOrderByFechaHoraDesc(paciente).stream()
                .anyMatch(c -> c.getFechaHora().equals(fechaHora));
    }

    public List<Cita> listarCitasPorMedico(Usuario medico) {
        return citaRepository.findByMedicoOrderByFechaHoraDesc(medico);
    }

    public List<Cita> listarCitasPorPaciente(Usuario paciente) {
        return citaRepository.findByPacienteOrderByFechaHoraDesc(paciente);
    }
}
