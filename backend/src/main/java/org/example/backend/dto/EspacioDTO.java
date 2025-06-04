package org.example.backend.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class EspacioDTO {
    private LocalDate fecha;

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public LocalTime getHora() {
        return hora;
    }

    public void setHora(LocalTime hora) {
        this.hora = hora;
    }

    public boolean isDisponible() {
        return disponible;
    }

    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }

    private LocalTime hora;
    private boolean disponible;

    public EspacioDTO() {}
    public EspacioDTO(LocalDate fecha, LocalTime hora, boolean disponible) {
        this.fecha = fecha;
        this.hora = hora;
        this.disponible = disponible;
    }
}
