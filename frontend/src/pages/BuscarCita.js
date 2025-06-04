import React, { useState } from 'react';

const BuscarCita = () => {
    const [especialidad, setEspecialidad] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [medicos, setMedicos] = useState([]);
    const [hayHorarios, setHayHorarios] = useState({});
    const [mapaEspacios, setMapaEspacios] = useState({});

    const handleBuscar = (e) => {
        e.preventDefault();

        fetch(`/api/citas/buscar?especialidad=${especialidad}&ciudad=${ciudad}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // data = array de EspacioCitaDTO
                // AGRUPAR:
                const medicos = [];
                const mapaEspacios = {};
                const hayHorarios = {};

                data.forEach(esp => {
                    if (!medicos.find(m => m.id === esp.medicoId)) {
                        medicos.push({
                            id: esp.medicoId,
                            nombre: esp.medicoNombre,
                            especialidad: esp.especialidad,
                            localidad: esp.localidad,
                            foto: esp.foto,
                            costoConsulta: esp.costoConsulta
                        });
                    }

                    if (!mapaEspacios[esp.medicoId]) mapaEspacios[esp.medicoId] = {};
                    const fechaStr = esp.fecha;
                    if (!mapaEspacios[esp.medicoId][fechaStr]) mapaEspacios[esp.medicoId][fechaStr] = [];
                    mapaEspacios[esp.medicoId][fechaStr].push({
                        ...esp,
                        fechaHoraFormateada: `${esp.fecha}T${esp.hora}`
                    });

                    hayHorarios[esp.medicoId] = true;
                });

                setMedicos(medicos);
                setMapaEspacios(mapaEspacios);
                setHayHorarios(hayHorarios);
            });
    };



const toggleHorarios = (e) => {
        const container = e.currentTarget.nextSibling;
        container.style.display = container.style.display === 'none' ? 'flex' : 'none';
        e.currentTarget.textContent = container.style.display === 'none' ? 'Ver horarios ⬇️' : 'Ocultar horarios ⬆️';
    };

    const toggleVerMas = (e) => {
        const parent = e.currentTarget.closest('.fecha-col');
        const extras = parent.querySelectorAll('.ver-mas');
        let showing = false;
        extras.forEach(slot => {
            if (slot.style.display === 'none') {
                slot.style.display = 'block';
                showing = true;
            } else {
                slot.style.display = 'none';
            }
        });
        e.currentTarget.textContent = showing ? 'Ver menos' : 'Ver más';
    };

    return (
        <div className="contenido-principal">
            <div className="contenedor">
                <form onSubmit={handleBuscar} className="search-box">
                    <input
                        type="text"
                        placeholder="Especialidad"
                        value={especialidad}
                        onChange={(e) => setEspecialidad(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Ciudad"
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                    />
                    <button type="submit">Buscar</button>
                </form>

                {medicos.length === 0 && (
                    <p style={{ textAlign: 'center' }}>No results found for your search.</p>
                )}

                {medicos.map((medico) => (
                    <div className="medico-card" key={medico.id}>
                        <div className="medico-header">
                            <div className="medico-info">
                                <img src={medico.foto || '/images/profile.png'} alt="Foto" />
                                <div>
                                    <b style={{ color: '#2c3e50' }}>{medico.nombre}</b><br />
                                    <span style={{ color: '#007bff', fontWeight: 'bold' }}>₡{medico.costoConsulta}</span><br />
                                    <span>💼 {medico.especialidad}</span><br />
                                    <span>📍 {medico.localidad}</span>
                                </div>
                            </div>
                        </div>

                        {!hayHorarios[medico.id] && (
                            <p>Sin horarios disponibles en los próximos 3 días.</p>
                        )}

                        {mapaEspacios[medico.id] && (
                            <>
                                <button onClick={toggleHorarios} className="toggle-button">
                                    Ver horarios ⬇️
                                </button>

                                <div className="fechas horarios-toggle" style={{ display: 'none' }}>
                                    {Object.entries(mapaEspacios[medico.id]).map(([fecha, espacios]) => (
                                        <div className="fecha-col" key={fecha}>
                                            <h4>{fecha}</h4>

                                            {espacios.length === 0 && (
                                                <p>No se encontraron resultados para tu búsqueda.</p>
                                            )}

                                            {espacios.map((slot, index) => (
                                                <div
                                                    key={slot.id || index}
                                                    className={`slot ${slot.disponible ? 'disponible' : 'reservado'} ${index >= 3 ? 'ver-mas' : ''}`}
                                                    style={{ display: index >= 3 ? 'none' : 'block' }}
                                                >
                                                    {slot.disponible ? (
                                                        <a href={`/confirmarCita?medicoId=${medico.id}&fechaHora=${slot.fechaHoraFormateada}`}>
                                                            {slot.hora}
                                                        </a>
                                                    ) : (
                                                        <span>{slot.hora}</span>
                                                    )}
                                                </div>
                                            ))}

                                            {espacios.length > 3 && (
                                                <button onClick={toggleVerMas} type="button" className="toggle-button">Ver más</button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="schedule-link">
                                    <a href={`/horarioExtendido?medicoId=${medico.id}`}>Ver todos ➜</a>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BuscarCita;
