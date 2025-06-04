package org.example.backend.dto;

import org.example.backend.entidad.Usuario;

import java.time.LocalDate;
import java.time.LocalTime;

public class EspacioCitaDTO extends EspacioDTO {
    private Long medicoId;
    private String medicoNombre;
    private String especialidad;
    private String localidad;
    private String foto;
    private Double costoConsulta;

    public EspacioCitaDTO() {}
    public EspacioCitaDTO(EspacioDTO base, Usuario medico) {
        super(base.getFecha(), base.getHora(), base.isDisponible());
        this.medicoId = medico.getId();
        this.medicoNombre = medico.getNombre();
        this.especialidad = medico.getEspecialidad();
        this.localidad = medico.getLocalidad();
        this.foto = medico.getFoto();
        this.costoConsulta = medico.getCostoConsulta();
    }
    // Getters y Setters
    // ... omitido por espacio ...
}
