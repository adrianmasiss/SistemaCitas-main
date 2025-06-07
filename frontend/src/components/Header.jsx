import React from 'react';
import { Link } from 'react-router-dom';

<<<<<<< HEAD
const Header = ({ rol, usuarioId }) => {
    return (
        <div className="header">
            <div className="logo">
=======
// Espera un objeto usuario con { rol, usuarioId }
const Header = ({ usuario }) => {
    const rol = usuario?.rol;
    const usuarioId = usuario?.usuarioId;

    return (
        <div className="header">
            {/* Izquierda: logo */}
            <div className="logo">
                {/* Imagen de logo desde public/images */}
>>>>>>> f8eaa34 (Falta ahora conectar bien el tema de la base de datos)
                <img src="/images/patient-centered-care-examples.jpg" alt="Logo" />
                Medical Appointments
            </div>

<<<<<<< HEAD
=======
            {/* Centro: Teléfono */}
>>>>>>> f8eaa34 (Falta ahora conectar bien el tema de la base de datos)
            <div className="telefono-contacto">
                +506 5467 0937
            </div>

<<<<<<< HEAD
            <div className="menu">
                {rol !== 'ADMIN' && <Link to="/about">About...</Link>}
                {rol !== 'ADMIN' && rol !== 'MEDICO' && <Link to="/buscar">Search</Link>}
                {!usuarioId && <Link to="/login">Login</Link>}

=======
            {/* Derecha: Menú */}
            <div className="menu">
                {/* About solo si NO es ADMIN */}
                {rol !== 'ADMIN' && <a href="#">About...</a>}

                {/* Search solo si NO es ADMIN ni MEDICO */}
                {rol !== 'ADMIN' && rol !== 'MEDICO' && (
                    <Link to="/buscarCita">Search</Link>
                )}

                {/* Si NO ha iniciado sesión */}
                {!usuarioId && <Link to="/login">Login</Link>}

                {/* Si ha iniciado sesión como MÉDICO */}
>>>>>>> f8eaa34 (Falta ahora conectar bien el tema de la base de datos)
                {rol === 'MEDICO' && (
                    <div className="menu-rol">
                        <Link to="/medico/perfil">👤 Perfil</Link>
                        <Link to="/medico/configurarHorario">🕒 Horario</Link>
<<<<<<< HEAD
                        <Link to="/medico/gestionCitas">📅 Mis Citas</Link>
                        <button onClick={() => {/* lógica logout */}} className="logout-btn">🚪 Cerrar sesión</button>
                    </div>
                )}

                {rol === 'PACIENTE' && (
                    <div className="menu-rol">
                        <Link to="/historicoCitas" className="btn-historial">🗓️ Mis Citas</Link>
                        <button onClick={() => {/* lógica logout */}} className="logout-btn">🚪 Cerrar sesión</button>
                    </div>
                )}

                {rol === 'ADMIN' && (
                    <div className="menu-rol">
                        <Link to="/admin/medicosPendientes">👨‍⚕️ Admin Médicos</Link>
                        <button onClick={() => {/* lógica logout */}} className="logout-btn">🚪 Cerrar sesión</button>
=======
                        <Link to="/medico/gestionCitas" className="btn-historial">📅 Mis Citas</Link>
                        <form action="/logout" method="post" style={{ display: "inline" }}>
                            <button type="submit" className="logout-btn">🚪 Cerrar sesión</button>
                        </form>
                    </div>
                )}

                {/* Si ha iniciado sesión como PACIENTE */}
                {rol === 'PACIENTE' && (
                    <div className="menu-rol">
                        <Link to="/historicoCitas" className="btn-historial">🗓️ Mis Citas</Link>
                        <form action="/logout" method="post" style={{ display: "inline" }}>
                            <button type="submit" className="logout-btn">🚪 Cerrar sesión</button>
                        </form>
                    </div>
                )}

                {/* Si ha iniciado sesión como ADMIN */}
                {rol === 'ADMIN' && (
                    <div className="menu-rol">
                        <Link to="/admin/medicosPendientes">👨‍⚕️ Admin Médicos</Link>
                        <form action="/logout" method="post" style={{ display: "inline" }}>
                            <button type="submit" className="logout-btn">🚪 Cerrar sesión</button>
                        </form>
>>>>>>> f8eaa34 (Falta ahora conectar bien el tema de la base de datos)
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
