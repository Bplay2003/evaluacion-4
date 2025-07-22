import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div style={{ minHeight: '80vh', padding: '1rem' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />

                    <Route path="/exposiciones" element={<ExposicionList />} />
                    <Route path="/exposicion/create" element={<ExposicionCreate />} />
                    <Route path="/exposicion/edit/:id" element={<ExposicionEdit />} />
                    <Route path="/exposicion/delete/:id" element={<ExposicionDelete />} />

                    <Route path="/usuarios" element={<UsuarioList />} />
                    <Route path="/usuario/create" element={<UsuarioCreate />} />
                    <Route path="/usuario/edit/:id" element={<UsuarioEdit />} />
                    <Route path="/usuario/delete/:id" element={<UsuarioDelete />} />

                    <Route path="/comentarios" element={<ComentarioList />} />
                    <Route path="/comentario/create" element={<ComentarioCreate />} />
                    <Route path="/comentario/edit/:id" element={<ComentarioEdit />} />
                    <Route path="/comentario/delete/:id" element={<ComentarioDelete />} />

                </Routes>
            </div>
        </Router>
    );
};

export default App;

