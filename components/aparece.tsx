"use client"

import { motion, useReducedMotion } from "framer-motion"

/** Entrada suave al aparecer en pantalla: sube y se aclara una sola vez. */
export function Aparece({
  children,
  className,
  demora = 0,
}: {
  children: React.ReactNode
  className?: string
  /** Segundos, para escalonar elementos hermanos. */
  demora?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: demora, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
