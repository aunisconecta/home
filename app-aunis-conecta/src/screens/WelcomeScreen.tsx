import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
    const navigate = useNavigate();
    return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
            className="flex flex-col items-center justify-center h-screen p-8 text-center bg-black"
            style={{ background: 'radial-gradient(circle at 50% 30%, #222 0%, #000 100%)' }}
        >
            <div className="mb-12 animate-fade">
                <img src="https://i.ibb.co/Kzcspycr/auniswwhi.png" alt="AUNIS logo" className="w-48 mx-auto filter drop-shadow-lg" />
                <h1 className="mt-8 text-3xl font-bold tracking-tighter" style={{ fontFamily: 'var(--font-heading)' }}>CONECTA</h1>
                <p className="mt-4 text-dim max-w-xs mx-auto">Onde conexões estratégicas se transformam em resultados reais.</p>
            </div>

            <div className="w-full space-y-4 mt-auto mb-10">
                <button onClick={() => navigate('/login')} className="btn-premium btn-primary w-full">ENTRAR</button>
                <button onClick={() => navigate('/register')} className="btn-premium btn-gold w-full text-white">CRIAR CONTA</button>
            </div>
        </motion.div>
    );
};

export default WelcomeScreen;
