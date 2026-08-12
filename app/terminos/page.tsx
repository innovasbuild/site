import type { Metadata } from "next"
import Link from "next/link"
import { seo } from "@/content/seo"
import { buildMetadata } from "@/lib/metadata"

export const metadata: Metadata = buildMetadata("/terminos", seo["/terminos"])

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="font-display text-xl font-bold text-ink mb-4">{title}</h2>
    <div className="space-y-3 text-[15px] leading-relaxed text-ink-70">{children}</div>
  </div>
)

export default function TerminosPage() {
  return (
    <main>
      <section className="border-b border-line bg-ink pt-32 pb-16 text-paper">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-teal">Legal</p>
          <h1 className="mt-4 font-display text-4xl font-bold text-paper md:text-5xl">Términos y Condiciones</h1>
          <p className="mt-3 text-sm text-paper/50">Última actualización: agosto de 2026</p>
        </div>
      </section>

      <div className="mx-auto max-w-[780px] px-6 py-16 lg:py-24">
        <Section title="1. Aceptación de los términos">
          <p>
            Los presentes Términos y Condiciones ("Términos") regulan el acceso y uso de los servicios de{" "}
            <strong>INNOV.AS</strong> ("INNOV.AS", "nosotros"), incluyendo el sitio web{" "}
            <strong>innov.as</strong> y los servicios de transformación con datos, automatización agéntica y
            programas de adopción de IA prestados a empresas, organismos y equipos.
          </p>
          <p>
            Al contratar nuestros servicios, acceder al sitio web o completar cualquier formulario de
            contacto, el usuario declara haber leído, comprendido y aceptado estos Términos en su totalidad.
            Si actuás en representación de una empresa u organismo, declarás tener facultades suficientes
            para obligarla.
          </p>
          <p>Si no aceptás estos Términos, no debés usar nuestros servicios ni el sitio web.</p>
        </Section>

        <Section title="2. Descripción del servicio">
          <p>INNOV.AS provee servicios de diseño y construcción de sistemas de datos e inteligencia artificial para empresas y organismos. Los servicios pueden incluir:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong>Asistentes digitales y agentes de IA:</strong> atención, consultas, análisis de documentos y otros flujos con IA donde hace falta criterio y lógica determinística donde hace falta precisión.</li>
            <li><strong>Bots de automatización de procesos:</strong> orquestación con herramientas de integración: aprobaciones, reportes, sincronización entre sistemas.</li>
            <li><strong>Company Brain y plataformas de datos:</strong> plataformas que integran información y decisiones del negocio, escalables a nuevas unidades, verticales o países.</li>
            <li><strong>Analítica y visualización:</strong> dashboards y plataformas de datos para decisiones operativas.</li>
            <li><strong>Programas de adopción de IA:</strong> formación de equipos (por ejemplo, el programa Desde Adentro) para instalar capacidades de IA dentro de la organización cliente.</li>
          </ul>
          <p>
            El alcance específico de cada servicio queda determinado en el acuerdo comercial suscrito entre
            las partes. INNOV.AS se reserva el derecho de modificar, ampliar o discontinuar funcionalidades
            previa notificación al cliente.
          </p>
        </Section>

        <Section title="3. Naturaleza del servicio — sistemas y agentes de IA">
          <p>El cliente reconoce que:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Los agentes construidos por INNOV.AS son sistemas de inteligencia artificial que operan dentro de flujos y parámetros definidos conjuntamente con el cliente.</li>
            <li>Los agentes no son personas humanas y actúan en representación del cliente conforme a la configuración acordada.</li>
            <li>La calidad y pertinencia de las respuestas depende en parte de la información que el cliente provea durante el relevamiento y la configuración.</li>
            <li>El cliente es el responsable final de las comunicaciones emitidas a sus usuarios finales a través de los sistemas de INNOV.AS, y debe asegurarse de que el contenido configurado cumpla con la normativa aplicable.</li>
          </ul>
        </Section>

        <Section title="4. Metodología, diagnóstico y etapas">
          <p>
            El inicio del servicio está sujeto a un proceso de diagnóstico (Radar) y relevamiento (Mapa del
            Método). Al contratar una etapa o "ola" de transformación, el cliente y INNOV.AS acuerdan:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>El circuito o proceso a implementar.</li>
            <li>El alcance y precio de la etapa.</li>
            <li>Los criterios de aceptación (UAT) que determinan la entrega.</li>
          </ul>
          <p>
            El cliente se compromete a proveer en tiempo y forma la información necesaria para el diseño y
            configuración de los sistemas (procesos, datos, accesos a sistemas). La demora en la entrega de
            esta información puede extender los plazos de implementación sin responsabilidad de INNOV.AS.
          </p>
        </Section>

        <Section title="5. Planes, precios y facturación">
          <p>Los precios y condiciones de facturación se establecen en el acuerdo comercial específico. Salvo indicación en contrario:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Cada etapa o servicio recurrente se factura según lo acordado en el contrato de servicio.</li>
            <li>Los precios no incluyen impuestos locales que puedan corresponder según la jurisdicción del cliente.</li>
            <li>El impago de facturas por más de 15 días hábiles puede resultar en la suspensión del servicio, previa notificación al cliente.</li>
          </ul>
        </Section>

        <Section title="6. Obligaciones del cliente">
          <p>El cliente se compromete a:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Usar el servicio exclusivamente para fines lícitos y conforme a la normativa aplicable en su jurisdicción.</li>
            <li>Obtener los consentimientos necesarios de sus usuarios finales para el procesamiento de sus datos a través de los sistemas de INNOV.AS.</li>
            <li>No instruir a los agentes de INNOV.AS para que emitan comunicaciones engañosas, fraudulentas, discriminatorias o que violen derechos de terceros.</li>
            <li>Mantener la confidencialidad de los accesos e integraciones configuradas.</li>
            <li>Notificar a INNOV.AS de cualquier cambio en su operación que pueda afectar la configuración de los sistemas.</li>
          </ul>
        </Section>

        <Section title="7. Propiedad intelectual">
          <p>
            Todos los desarrollos, metodologías, flujos, modelos de agentes, prompts, configuraciones y
            sistemas creados por INNOV.AS son y permanecen propiedad intelectual exclusiva de INNOV.AS,
            incluso cuando hayan sido diseñados específicamente para la operación de un cliente.
          </p>
          <p>
            El cliente retiene la propiedad de toda la información propia que provea para la configuración de
            los sistemas (datos, procesos, información de negocio). INNOV.AS no usará esa información para
            fines distintos a la prestación del servicio contratado.
          </p>
          <p>El cliente recibe una licencia de uso limitada, no exclusiva e intransferible sobre los sistemas configurados, vigente durante la duración del contrato de servicio.</p>
        </Section>

        <Section title="8. Confidencialidad">
          <p>
            Ambas partes se comprometen a mantener la confidencialidad de la información que la otra parte
            designe como confidencial o que por su naturaleza deba entenderse como tal. Esta obligación
            subsiste por un período de 3 años después de la finalización del acuerdo de servicio.
          </p>
          <p>Se exceptúa información que sea de dominio público, que el receptor ya conociera previamente, o cuya divulgación sea requerida por ley o autoridad competente.</p>
        </Section>

        <Section title="9. Limitación de responsabilidad">
          <p>En la máxima medida permitida por la ley aplicable, INNOV.AS no será responsable por:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Daños indirectos, incidentales, especiales o consecuentes, incluyendo pérdida de ganancias, pérdida de datos o daño reputacional.</li>
            <li>Interrupciones del servicio causadas por fuerza mayor, fallas de plataformas de terceros o causas fuera del control razonable de INNOV.AS.</li>
            <li>Resultados comerciales específicos. Los impactos estimados en propuestas comerciales son proyecciones basadas en benchmarks del sector y no constituyen garantía de resultado.</li>
            <li>Decisiones tomadas por el equipo del cliente basadas en información provista por los sistemas.</li>
          </ul>
          <p>
            La responsabilidad total acumulada de INNOV.AS frente al cliente por cualquier reclamo no
            superará el monto abonado por el cliente en los 3 meses inmediatamente anteriores al evento que
            da origen al reclamo.
          </p>
        </Section>

        <Section title="10. Cancelación y rescisión">
          <p>
            <strong>Por el cliente:</strong> el cliente puede cancelar el servicio en cualquier momento con
            un preaviso de 30 días calendario, sin penalidad, salvo que exista un contrato de plazo fijo con
            condiciones específicas. La cancelación no da derecho a reembolso de etapas ya facturadas.
          </p>
          <p>
            <strong>Por INNOV.AS:</strong> INNOV.AS puede rescindir el contrato con efecto inmediato en caso
            de incumplimiento grave de estos Términos por parte del cliente, uso ilícito del servicio, o
            impago reiterado. En casos no graves, se otorgará un preaviso de 30 días.
          </p>
          <p>
            <strong>Efectos de la rescisión:</strong> al finalizar el contrato, INNOV.AS pondrá a disposición
            del cliente los datos que sean de su propiedad, en formato exportable, durante un período de 30
            días. Transcurrido ese plazo, los datos serán eliminados conforme a la Política de Privacidad.
          </p>
        </Section>

        <Section title="11. Modificaciones a los términos">
          <p>
            INNOV.AS puede modificar estos Términos periódicamente. Las modificaciones entran en vigor 30
            días después de su publicación en{" "}
            <Link href="/terminos" className="text-teal underline">innov.as/terminos</Link>, salvo que la
            ley requiera un plazo mayor. El uso continuado del servicio después de esa fecha implica la
            aceptación de los nuevos Términos.
          </p>
        </Section>

        <Section title="12. Ley aplicable y jurisdicción">
          <p>
            Estos Términos se rigen por la legislación argentina. Cualquier controversia que no pueda
            resolverse amigablemente entre las partes será sometida a los tribunales ordinarios competentes
            de la Ciudad Autónoma de Buenos Aires, Argentina, con renuncia expresa a cualquier otro fuero que
            pudiera corresponder.
          </p>
        </Section>

        <Section title="13. Divisibilidad y acuerdo completo">
          <p>
            Si alguna disposición de estos Términos fuera declarada inválida o inaplicable, las restantes
            disposiciones continuarán en pleno vigor. Estos Términos, junto con el acuerdo comercial
            específico y la Política de Privacidad, constituyen el acuerdo completo entre las partes respecto
            al objeto aquí regulado.
          </p>
        </Section>

        <Section title="14. Contacto">
          <p>Para consultas sobre estos Términos:</p>
          <div className="mt-2 rounded-xl bg-paper-soft p-6">
            <p className="font-display font-bold text-ink">INNOV.AS</p>
            <p>
              Email: <a href="mailto:hola@innov.as" className="text-teal underline">hola@innov.as</a>
            </p>
            <p>
              Web: <a href="https://innov.as" className="text-teal underline">innov.as</a>
            </p>
          </div>
        </Section>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 text-sm text-ink-70 sm:flex-row">
          <Link href="/privacidad" className="text-teal hover:underline">Ver Política de Privacidad →</Link>
          <Link href="/" className="hover:text-teal transition-colors">← Volver al inicio</Link>
        </div>
      </div>
    </main>
  )
}
