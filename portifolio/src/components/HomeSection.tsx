import React from 'react'
import foto from '../assets/foto.jpg'
import { FileText } from 'lucide-react'

const HomeSection = () => {
  return (        
    <section className="preahvihear-regular flex items-center gap-12 mt-20 px-6 lg:px-20 max-w-7xl mx-auto">
      <div className="max-w-xl">
        <p className="text-base mb-2">
            Olá! Sou a{' '}
            <span className="text-purple-400 font-semibold">Kenia Reis</span>
        </p>
        <h1 className="text-5xl font-bold text-white mb-6">
            Desenvolvedora de Software
        </h1>
        <p className="text-gray-300 text-sm leading-relaxed mb-10">
            Diretora e Desenvolvedora de Software autodidata na Tech Júnior,
            responsável por gestão administrativa, financeira e desenvolvimento de
            software. Anteriormente, adquiri experiência na Agência Azure em
            marketing digital e análise de dados. Estudo Bacharelado no IFMA e
            estou focada em Java com Springboot.
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-2 border border-purple-500 text-white py-2 px-5 rounded-md hover:bg-purple-500/20 transition">
            <FileText size={16} /> Meu CV
          </a>
          <a href="#" className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-5 rounded-md transition">
              Contato
          </a>
        </div>
      </div>
      <div className="hidden lg:flex w-72 h-72 rounded-full bg-purple-900/60 overflow-hidden items-center justify-center">
        <img src={foto} />
      </div>
    </section>
  )
}

export default HomeSection
