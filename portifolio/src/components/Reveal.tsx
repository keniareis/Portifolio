import type { ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

type RevealProps = {
    children: ReactNode;
    className?: string;
    delayMs?: number;
};

const Reveal = ({ children, className = '', delayMs = 0 }: RevealProps) => {
    const { ref, inView } = useInView<HTMLDivElement>();

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } ${className}`}
            style={{ transitionDelay: `${delayMs}ms` }}
        >
            {children}
        </div>
    );
};

export default Reveal;
