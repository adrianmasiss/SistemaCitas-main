package org.example.backend.servicio;

import org.example.backend.entidad.Usuario;
import org.example.backend.repositorio.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario autenticarApi(String username, String clave) {
        return usuarioRepository.findByUsername(username)
                .filter(u -> passwordEncoder.matches(clave, u.getClave()))
                .orElse(null);
    }

    public List<Usuario> buscarMedicos(String especialidad, String ciudad) {
        List<Usuario> medicos = usuarioRepository.findByRol("MEDICO");
        if (especialidad != null && !especialidad.isEmpty()) {
            medicos.removeIf(m -> m.getEspecialidad() == null || !m.getEspecialidad().toLowerCase().contains(especialidad.toLowerCase()));
        }
        if (ciudad != null && !ciudad.isEmpty()) {
            medicos.removeIf(m -> m.getLocalidad() == null || !m.getLocalidad().toLowerCase().contains(ciudad.toLowerCase()));
        }
        medicos.removeIf(m -> !Boolean.TRUE.equals(m.getAprobado()));
        return medicos;
    }

    public List<Usuario> buscarTodosLosMedicosAprobados() {
        List<Usuario> medicos = usuarioRepository.findByRol("MEDICO");
        medicos.removeIf(m -> !Boolean.TRUE.equals(m.getAprobado()));
        return medicos;
    }
}
