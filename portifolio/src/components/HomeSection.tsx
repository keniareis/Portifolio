import foto from '../assets/foto.jpg'
import { FileText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage'

type TypewriterPhase = 'typing' | 'pausing' | 'deleting' | 'waiting'

const HomeSection = () => {
  const { t } = useLanguage()
  const fullText = t.hero.greeting + t.hero.name
  const [typedLength, setTypedLength] = useState(0)
  const [phase, setPhase] = useState<TypewriterPhase>('typing')
  const [lastFullText, setLastFullText] = useState(fullText)

  if (fullText !== lastFullText) {
    setLastFullText(fullText)
    setTypedLength(0)
    setPhase('typing')
  }

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (typedLength < fullText.length) {
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
  }, [typedLength, phase, fullText])

  const typedGreeting = fullText.slice(0, typedLength).slice(0, t.hero.greeting.length)
  const typedName = fullText.slice(0, typedLength).slice(t.hero.greeting.length)

  return (
    <section id="sobre" className="preahvihear-regular flex items-center justify-between gap-12 mt-20 px-6 lg:px-20 max-w-7xl mx-auto">
      <div className="max-w-xl min-w-0">
        <p className="text-base mb-2">
            {typedGreeting}
            <span className="text-purple-400 font-semibold">{typedName}</span>
            <span className="animate-pulse">|</span>
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t.hero.title}
        </h1>
        <p className="text-gray-300 text-sm leading-relaxed mb-10">
            {t.hero.bio}
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-5 rounded-md transition">
            <FileText size={16} /> {t.hero.cv}
          </a>
          <a href="#" className="border border-purple-500 text-white py-2 px-5 rounded-md hover:bg-purple-500/20 transition">
              {t.hero.contact}
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
