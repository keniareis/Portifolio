import foto from '../assets/foto.jpg'
import { FileText } from 'lucide-react'
import { useEffect, useState } from 'react'

const GREETING = "Olá! Sou a "
const NAME = "Kenia Reis"
const FULL_TEXT = GREETING + NAME

type TypewriterPhase = 'typing' | 'pausing' | 'deleting' | 'waiting'

const HomeSection = () => {
  const [typedLength, setTypedLength] = useState(0)
  const [phase, setPhase] = useState<TypewriterPhase>('typing')

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (typedLength < FULL_TEXT.length) {
        timeout = setTimeout(() => setTypedLength((prev) => prev + 1), 70)
      } else {
        timeout = setTimeout(() => setPhase('pausing'), 0)
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 4000)
    } else if (phase === 'deleting') {
      if (typedLength > 0) {
        timeout = setTimeout(() => setTypedLength((prev) => prev - 1), 30)
      } else {
        timeout = setTimeout(() => setPhase('waiting'), 0)
      }
    } else {
      timeout = setTimeout(() => setPhase('typing'), 1500)
    }

    return () => clearTimeout(timeout)
  }, [typedLength, phase])

  const typedGreeting = FULL_TEXT.slice(0, typedLength).slice(0, GREETING.length)
  const typedName = FULL_TEXT.slice(0, typedLength).slice(GREETING.length)

  return (
    <section id="sobre" className="preahvihear-regular flex items-center justify-between gap-12 mt-20 px-6 lg:px-20 max-w-7xl mx-auto">
      <div className="max-w-xl min-w-0">
        <p className="text-base mb-2">
            {typedGreeting}
            <span className="text-purple-400 font-semibold">{typedName}</span>
            <span className="animate-pulse">|</span>
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
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
          <a href="#" className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-5 rounded-md transition">
            <FileText size={16} /> Currículo
          </a>
          <a href="#" className="border border-purple-500 text-white py-2 px-5 rounded-md hover:bg-purple-500/20 transition">
              Contato
          </a>
        </div>
      </div>
      <div className="hidden lg:flex flex-shrink-0 w-96 h-96 rounded-full bg-purple-900/60 overflow-hidden items-center justify-center">
        <img src={foto} />
      </div>
    </section>
  )
}

export default HomeSection
