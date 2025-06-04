import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [logout, setLogout] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: form.username, clave: form.password }) // Ajuste para backend
        })
            .then(res => {
                if (res.status === 200) return res.json();
                else throw new Error('Usuario o contraseña inválidos');
            })
            .then(data => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('rol', data.rol);
                localStorage.setItem('usuarioId', data.usuarioId);
                if (data.rol === 'MEDICO') navigate('/medico/gestionCitas');
                else if (data.rol === 'PACIENTE') navigate('/buscar');
                else navigate('/admin/medicosPendientes');
            })
            .catch(err => setError(err.message));
    };

    return (
        <div className="layout-wrapper">
            {/* HEADER lo maneja App.js */}

            <div className="contenido-principal">
                <div className="login-wrapper">
                    <div className="login-box">
                        <h2>Login</h2>
                        <img
                            src="/images/194_210_MjAyMC0wNS0wNiAwNzoyMDoxOQ==_dummy-male-img-1.png"
                            alt="User Icon"
                            className="login-avatar"
                        />

                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <span className="input-icon"><i className="fa fa-user"></i></span>
                                <input
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    placeholder="User id"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <span className="input-icon"><i className="fa fa-key"></i></span>
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="User Password"
                                    required
                                />
                            </div>

                            {error && <div className="error-msg">{error}</div>}
                            {logout && <div className="logout-msg">Has cerrado sesión correctamente.</div>}

                            <button type="submit" className="btn-primary">Log in</button>
                        </form>

                        <div className="register-link">
                            <p>Don't have an account?
                                <span className="register-text" onClick={() => setShowModal(true)}> Register here</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER lo maneja App.js */}

            {showModal && (
                <div id="modalRegistro" className="modal" onClick={() => setShowModal(false)}>
                    <div className="modal-registro" onClick={(e) => e.stopPropagation()}>
                        <h3>Registrarse como:</h3>
                        <a href="/registroPaciente" className="modal-btn">Paciente</a>
                        <a href="/registroMedico" className="modal-btn">Médico</a>
                        <button className="modal-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
