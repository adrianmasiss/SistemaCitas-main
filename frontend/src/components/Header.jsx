import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ rol, usuarioId }) => {
    return (
        <div className="header">
            <div className="logo">
                <img src="/images/patient-centered-care-examples.jpg" alt="Logo" />
                Medical Appointments
            </div>

            <div className="telefono-contacto">
                +506 5467 0937
            </div>

            <div className="menu">
                {rol !== 'ADMIN' && <Link to="/about">About...</Link>}
                {rol !== 'ADMIN' && rol !== 'MEDICO' && <Link to="/buscar">Search</Link>}
                {!usuarioId && <Link to="/login">Login</Link>}

                {rol === 'MEDICO' && (
                    <div className="menu-rol">
                        <Link to="/medico/perfil">👤 Perfil</Link>
                        <Link to="/medico/configurarHorario">🕒 Horario</Link>
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
