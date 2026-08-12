import type { Metadata } from "next"
import Link from "next/link"
import { seo } from "@/content/seo"
import { buildMetadata } from "@/lib/metadata"

export const metadata: Metadata = buildMetadata("/privacidad", seo["/privacidad"])

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="font-display text-xl font-bold text-ink mb-4">{title}</h2>
    <div className="space-y-3 text-[15px] leading-relaxed text-ink-70">{children}</div>
  </div>
)

export default function PrivacidadPage() {
  return (
    <main>
      <section className="border-b border-line bg-ink pt-32 pb-16 text-paper">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-teal">Legal</p>
          <h1 className="mt-4 font-display text-4xl font-bold text-paper md:text-5xl">Política de Privacidad</h1>
          <p className="mt-3 text-sm text-paper/50">Última actualización: agosto de 2026</p>
        </div>
      </section>

      <div className="mx-auto max-w-[780px] px-6 py-16 lg:py-24">
        <Section title="1. Introducción">
          <p>
            INNOV.AS ("INNOV.AS", "nosotros", "nuestro") diseña y opera soluciones de automatización agéntica,
            agentes de inteligencia artificial y plataformas de datos para empresas y organismos, y ofrece
            programas de adopción de IA para equipos. Esta Política de Privacidad describe cómo recopilamos,
            usamos, almacenamos y protegemos la información personal que procesamos en el marco de nuestros
            servicios y del uso de nuestro sitio web <strong>innov.as</strong>.
          </p>
          <p>
            Al utilizar nuestros servicios o interactuar con nuestro sitio, aceptás los términos de esta
            política. Si no estás de acuerdo, te pedimos que no uses nuestros servicios.
          </p>
        </Section>

        <Section title="2. Datos que recopilamos">
          <p>
            <strong>Datos de contacto y consulta:</strong> cuando completás el formulario de contacto de nuestro
            sitio web recopilamos nombre completo, dirección de correo electrónico, teléfono, empresa y el
            contenido del mensaje.
          </p>
          <p>
            <strong>Datos operativos de clientes:</strong> en el marco de la prestación de nuestros servicios,
            podemos procesar datos operativos y de negocio provistos por el cliente (procesos, sistemas,
            documentación) exclusivamente para diseñar, construir y operar los sistemas acordados.
          </p>
          <p>
            <strong>Datos de participantes de programas de formación:</strong> cuando te inscribís a un
            programa de adopción de IA (por ejemplo, Desde Adentro) recopilamos datos de contacto, empresa y
            progreso dentro del programa.
          </p>
          <p>
            <strong>Datos de uso del sitio web:</strong> información técnica como dirección IP, tipo de
            navegador, páginas visitadas y duración de la sesión mediante herramientas de analítica web
            estándar.
          </p>
        </Section>

        <Section title="3. Cómo usamos tus datos">
          <p>Utilizamos la información recopilada para los siguientes fines:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Responder consultas y gestionar el proceso comercial y de onboarding.</li>
            <li>Diseñar, construir y operar los sistemas y programas contratados.</li>
            <li>Mejorar y optimizar nuestros servicios, agentes y contenidos de formación.</li>
            <li>Cumplir con obligaciones legales y contractuales.</li>
            <li>Enviar comunicaciones relacionadas con el servicio (avances de proyecto, reportes, novedades del programa).</li>
            <li>Prevenir fraudes y garantizar la seguridad de nuestros sistemas.</li>
          </ul>
          <p>No utilizamos los datos personales provistos por nuestros clientes para ningún fin distinto al de la prestación del servicio acordado.</p>
        </Section>

        <Section title="4. Base legal para el tratamiento">
          <ul className="list-disc space-y-2 pl-5">
            <li><strong>Ejecución de contrato:</strong> para cumplir con los servicios contratados.</li>
            <li><strong>Consentimiento:</strong> cuando el usuario lo otorga expresamente (formularios de contacto, inscripción a programas).</li>
            <li><strong>Interés legítimo:</strong> para mejorar nuestros servicios y prevenir fraudes.</li>
            <li><strong>Obligación legal:</strong> cuando la normativa aplicable nos obliga a conservar o reportar datos.</li>
          </ul>
        </Section>

        <Section title="5. Compartición de datos con terceros">
          <p>
            INNOV.AS no vende, alquila ni comercializa datos personales a terceros. Podemos compartir
            información en los siguientes casos limitados:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong>Proveedores de infraestructura tecnológica:</strong> hosting, bases de datos en la nube y plataformas de automatización (por ejemplo, n8n, Supabase) que operan como encargados del tratamiento bajo acuerdos de confidencialidad.</li>
            <li><strong>Integraciones contratadas por el cliente:</strong> CRMs u otras herramientas especificadas en el acuerdo de servicio.</li>
            <li><strong>Autoridades legales:</strong> cuando sea requerido por ley o resolución judicial.</li>
          </ul>
          <p>Todos los terceros con acceso a datos personales están sujetos a obligaciones contractuales de confidencialidad y seguridad.</p>
        </Section>

        <Section title="6. Retención de datos">
          <ul className="list-disc space-y-2 pl-5">
            <li>Datos de formularios de contacto: hasta 24 meses desde la última interacción.</li>
            <li>Datos operativos de clientes: durante la vigencia del contrato y hasta 12 meses después de su finalización.</li>
            <li>Datos de participantes de programas: durante la vigencia del programa y hasta 12 meses después de su finalización.</li>
          </ul>
          <p>Transcurridos estos plazos, los datos son eliminados o anonimizados de forma segura.</p>
        </Section>

        <Section title="7. Tus derechos">
          <p>De acuerdo con la normativa aplicable de protección de datos, tenés derecho a acceder, rectificar, eliminar, limitar el tratamiento, oponerte al tratamiento y a la portabilidad de tus datos personales.</p>
          <p>
            Para ejercer cualquiera de estos derechos —incluyendo la <strong>eliminación de tus datos
            personales</strong>— escribinos a{" "}
            <a href="mailto:hola@innov.as" className="text-teal underline">hola@innov.as</a>{" "}
            con el asunto "Ejercicio de derechos" o "Solicitud de eliminación de datos". Responderemos en un
            plazo máximo de 30 días hábiles.
          </p>
        </Section>

        <Section title="8. Seguridad de los datos">
          <p>Implementamos medidas técnicas y organizativas razonables para proteger la información personal, incluyendo comunicaciones cifradas en tránsito, control de acceso basado en roles y monitoreo de actividad sobre nuestros sistemas.</p>
        </Section>

        <Section title="9. Cookies y tecnologías similares">
          <p>Nuestro sitio web puede utilizar cookies propias y de terceros con fines analíticos y de funcionamiento. Podés configurar tu navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.</p>
        </Section>

        <Section title="10. Menores de edad">
          <p>Nuestros servicios están destinados exclusivamente a empresas, organismos y profesionales. No recopilamos intencionalmente datos personales de menores de 18 años.</p>
        </Section>

        <Section title="11. Cambios en esta política">
          <p>
            Podemos actualizar esta Política de Privacidad periódicamente. La fecha de "última actualización"
            al inicio del documento indica cuándo fue revisada por última vez.
          </p>
        </Section>

        <Section title="12. Eliminación de datos personales">
          <p>Podés solicitar la eliminación de tus datos personales en cualquier momento enviando un correo a:</p>
          <div className="mt-2 mb-4 rounded-xl border border-teal/20 bg-paper-soft p-6">
            <p className="mb-1 font-display font-bold text-ink">Solicitud de eliminación de datos</p>
            <p>
              Email:{" "}
              <a href="mailto:hola@innov.as" className="font-semibold text-teal underline">hola@innov.as</a>
            </p>
            <p className="mt-2 text-sm text-ink-70">
              Asunto sugerido: <em>&quot;Solicitud de eliminación de datos personales&quot;</em>. Incluí tu
              nombre completo y el correo o número de teléfono asociado a tu cuenta o interacción.
            </p>
          </div>
          <p>Procesaremos tu solicitud en un plazo máximo de 30 días hábiles.</p>
        </Section>

        <Section title="13. Contacto">
          <p>Para cualquier consulta sobre esta política o el tratamiento de tus datos, contactanos en:</p>
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
          <Link href="/terminos" className="text-teal hover:underline">Ver Términos y Condiciones →</Link>
          <Link href="/" className="hover:text-teal transition-colors">← Volver al inicio</Link>
        </div>
      </div>
    </main>
  )
}
