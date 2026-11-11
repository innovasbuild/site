/**
 * Textos legales. Cada sección es una lista de bloques: párrafo (`p`), lista (`ul`) o tarjeta de contacto (`card`).
 * Dentro del texto: **negrita**, _cursiva_ y [texto](enlace); los enlaces que empiezan con "/" son internos.
 */
export type Block =
  | { p: string }
  | { ul: string[] }
  | { card: { title?: string; lines: string[]; note?: string; highlight?: boolean } }

export interface LegalSection {
  title: string
  blocks: Block[]
}

export interface LegalDocument {
  title: string
  sections: LegalSection[]
}

export const labels = {
  eyebrow: "Legal",
  updated: "Última actualización: agosto de 2026",
  backHome: "← Volver al inicio",
  seeTerms: "Ver Términos y Condiciones",
  seePrivacy: "Ver Política de Privacidad",
}

export const privacidad: LegalDocument = {
  title: "Política de Privacidad",
  sections: [
    {
      title: "1. Introducción",
      blocks: [
        {
          p: `INNOV.AS ("INNOV.AS", "nosotros", "nuestro") diseña y opera soluciones de automatización agéntica, agentes de inteligencia artificial y plataformas de datos para empresas y organismos, y ofrece programas de adopción de IA para equipos. Esta Política de Privacidad describe cómo recopilamos, usamos, almacenamos y protegemos la información personal que procesamos en el marco de nuestros servicios y del uso de nuestro sitio web **innov.as**.`,
        },
        {
          p: `Al utilizar nuestros servicios o interactuar con nuestro sitio, aceptas los términos de esta política. Si no estás de acuerdo, te pedimos que no uses nuestros servicios.`,
        },
      ],
    },
    {
      title: "2. Datos que recopilamos",
      blocks: [
        {
          p: `**Datos de contacto y consulta:** cuando completas el formulario de contacto de nuestro sitio web recopilamos nombre completo, dirección de correo electrónico, teléfono, empresa y el contenido del mensaje.`,
        },
        {
          p: `**Datos operativos de clientes:** en el marco de la prestación de nuestros servicios, podemos procesar datos operativos y de negocio provistos por el cliente (procesos, sistemas, documentación) exclusivamente para diseñar, construir y operar los sistemas acordados.`,
        },
        {
          p: `**Datos de participantes de programas de formación:** cuando te inscribes a un programa de adopción de IA (por ejemplo, Desde Adentro) recopilamos datos de contacto, empresa y progreso dentro del programa.`,
        },
        {
          p: `**Datos de uso del sitio web:** información técnica como dirección IP, tipo de navegador, páginas visitadas y duración de la sesión mediante herramientas de analítica web estándar.`,
        },
      ],
    },
    {
      title: "3. Cómo usamos tus datos",
      blocks: [
        { p: `Utilizamos la información recopilada para los siguientes fines:` },
        {
          ul: [
            `Responder consultas y gestionar el proceso comercial y de onboarding.`,
            `Diseñar, construir y operar los sistemas y programas contratados.`,
            `Mejorar y optimizar nuestros servicios, agentes y contenidos de formación.`,
            `Cumplir con obligaciones legales y contractuales.`,
            `Enviar comunicaciones relacionadas con el servicio (avances de proyecto, reportes, novedades del programa).`,
            `Prevenir fraudes y garantizar la seguridad de nuestros sistemas.`,
          ],
        },
        {
          p: `No utilizamos los datos personales provistos por nuestros clientes para ningún fin distinto al de la prestación del servicio acordado.`,
        },
      ],
    },
    {
      title: "4. Base legal para el tratamiento",
      blocks: [
        {
          ul: [
            `**Ejecución de contrato:** para cumplir con los servicios contratados.`,
            `**Consentimiento:** cuando el usuario lo otorga expresamente (formularios de contacto, inscripción a programas).`,
            `**Interés legítimo:** para mejorar nuestros servicios y prevenir fraudes.`,
            `**Obligación legal:** cuando la normativa aplicable nos obliga a conservar o reportar datos.`,
          ],
        },
      ],
    },
    {
      title: "5. Compartición de datos con terceros",
      blocks: [
        {
          p: `INNOV.AS no vende, alquila ni comercializa datos personales a terceros. Podemos compartir información en los siguientes casos limitados:`,
        },
        {
          ul: [
            `**Proveedores de infraestructura tecnológica:** hosting, bases de datos en la nube y plataformas de automatización (por ejemplo, n8n, Supabase) que operan como encargados del tratamiento bajo acuerdos de confidencialidad.`,
            `**Integraciones contratadas por el cliente:** CRMs u otras herramientas especificadas en el acuerdo de servicio.`,
            `**Autoridades legales:** cuando sea requerido por ley o resolución judicial.`,
          ],
        },
        {
          p: `Todos los terceros con acceso a datos personales están sujetos a obligaciones contractuales de confidencialidad y seguridad.`,
        },
      ],
    },
    {
      title: "6. Retención de datos",
      blocks: [
        {
          ul: [
            `Datos de formularios de contacto: hasta 24 meses desde la última interacción.`,
            `Datos operativos de clientes: durante la vigencia del contrato y hasta 12 meses después de su finalización.`,
            `Datos de participantes de programas: durante la vigencia del programa y hasta 12 meses después de su finalización.`,
          ],
        },
        { p: `Transcurridos estos plazos, los datos son eliminados o anonimizados de forma segura.` },
      ],
    },
    {
      title: "7. Tus derechos",
      blocks: [
        {
          p: `De acuerdo con la normativa aplicable de protección de datos, tienes derecho a acceder, rectificar, eliminar, limitar el tratamiento, oponerte al tratamiento y a la portabilidad de tus datos personales.`,
        },
        {
          p: `Para ejercer cualquiera de estos derechos —incluyendo la **eliminación de tus datos personales**— escríbenos a [hola@innov.as](mailto:hola@innov.as) con el asunto "Ejercicio de derechos" o "Solicitud de eliminación de datos". Responderemos en un plazo máximo de 30 días hábiles.`,
        },
      ],
    },
    {
      title: "8. Seguridad de los datos",
      blocks: [
        {
          p: `Implementamos medidas técnicas y organizativas razonables para proteger la información personal, incluyendo comunicaciones cifradas en tránsito, control de acceso basado en roles y monitoreo de actividad sobre nuestros sistemas.`,
        },
      ],
    },
    {
      title: "9. Cookies y tecnologías similares",
      blocks: [
        {
          p: `Nuestro sitio web puede utilizar cookies propias y de terceros con fines analíticos y de funcionamiento. Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.`,
        },
      ],
    },
    {
      title: "10. Menores de edad",
      blocks: [
        {
          p: `Nuestros servicios están destinados exclusivamente a empresas, organismos y profesionales. No recopilamos intencionalmente datos personales de menores de 18 años.`,
        },
      ],
    },
    {
      title: "11. Cambios en esta política",
      blocks: [
        {
          p: `Podemos actualizar esta Política de Privacidad periódicamente. La fecha de "última actualización" al inicio del documento indica cuándo fue revisada por última vez.`,
        },
      ],
    },
    {
      title: "12. Eliminación de datos personales",
      blocks: [
        { p: `Puedes solicitar la eliminación de tus datos personales en cualquier momento enviando un correo a:` },
        {
          card: {
            title: `Solicitud de eliminación de datos`,
            lines: [`Email: [hola@innov.as](mailto:hola@innov.as)`],
            note: `Asunto sugerido: _"Solicitud de eliminación de datos personales"_. Incluye tu nombre completo y el correo o número de teléfono asociado a tu cuenta o interacción.`,
            highlight: true,
          },
        },
        { p: `Procesaremos tu solicitud en un plazo máximo de 30 días hábiles.` },
      ],
    },
    {
      title: "13. Contacto",
      blocks: [
        { p: `Para cualquier consulta sobre esta política o el tratamiento de tus datos, contáctanos en:` },
        {
          card: {
            title: `INNOV.AS`,
            lines: [`Email: [hola@innov.as](mailto:hola@innov.as)`, `Web: [innov.as](https://innov.as)`],
          },
        },
      ],
    },
  ],
}

export const terminos: LegalDocument = {
  title: "Términos y Condiciones",
  sections: [
    {
      title: "1. Aceptación de los términos",
      blocks: [
        {
          p: `Los presentes Términos y Condiciones ("Términos") regulan el acceso y uso de los servicios de **INNOV.AS** ("INNOV.AS", "nosotros"), incluyendo el sitio web **innov.as** y los servicios de transformación con datos, automatización agéntica y programas de adopción de IA prestados a empresas, organismos y equipos.`,
        },
        {
          p: `Al contratar nuestros servicios, acceder al sitio web o completar cualquier formulario de contacto, el usuario declara haber leído, comprendido y aceptado estos Términos en su totalidad. Si actúas en representación de una empresa u organismo, declaras tener facultades suficientes para obligarla.`,
        },
        { p: `Si no aceptas estos Términos, no debes usar nuestros servicios ni el sitio web.` },
      ],
    },
    {
      title: "2. Descripción del servicio",
      blocks: [
        {
          p: `INNOV.AS provee servicios de diseño y construcción de sistemas de datos e inteligencia artificial para empresas y organismos. Los servicios pueden incluir:`,
        },
        {
          ul: [
            `**Asistentes digitales y agentes de IA:** atención, consultas, análisis de documentos y otros flujos con IA donde hace falta criterio y lógica determinística donde hace falta precisión.`,
            `**Bots de automatización de procesos:** orquestación con herramientas de integración: aprobaciones, reportes, sincronización entre sistemas.`,
            `**Company Brain y plataformas de datos:** plataformas que integran información y decisiones del negocio, escalables a nuevas unidades, verticales o países.`,
            `**Analítica y visualización:** dashboards y plataformas de datos para decisiones operativas.`,
            `**Programas de adopción de IA:** formación de equipos (por ejemplo, el programa Desde Adentro) para instalar capacidades de IA dentro de la organización cliente.`,
          ],
        },
        {
          p: `El alcance específico de cada servicio queda determinado en el acuerdo comercial suscrito entre las partes. INNOV.AS se reserva el derecho de modificar, ampliar o discontinuar funcionalidades previa notificación al cliente.`,
        },
      ],
    },
    {
      title: "3. Naturaleza del servicio — sistemas y agentes de IA",
      blocks: [
        { p: `El cliente reconoce que:` },
        {
          ul: [
            `Los agentes construidos por INNOV.AS son sistemas de inteligencia artificial que operan dentro de flujos y parámetros definidos conjuntamente con el cliente.`,
            `Los agentes no son personas humanas y actúan en representación del cliente conforme a la configuración acordada.`,
            `La calidad y pertinencia de las respuestas depende en parte de la información que el cliente provea durante el relevamiento y la configuración.`,
            `El cliente es el responsable final de las comunicaciones emitidas a sus usuarios finales a través de los sistemas de INNOV.AS, y debe asegurarse de que el contenido configurado cumpla con la normativa aplicable.`,
          ],
        },
      ],
    },
    {
      title: "4. Metodología, diagnóstico y etapas",
      blocks: [
        {
          p: `El inicio del servicio está sujeto a un proceso de diagnóstico (Radar) y relevamiento (Mapa del Método). Al contratar una etapa o "ola" de transformación, el cliente y INNOV.AS acuerdan:`,
        },
        {
          ul: [
            `El circuito o proceso a implementar.`,
            `El alcance y precio de la etapa.`,
            `Los criterios de aceptación (UAT) que determinan la entrega.`,
          ],
        },
        {
          p: `El cliente se compromete a proveer en tiempo y forma la información necesaria para el diseño y configuración de los sistemas (procesos, datos, accesos a sistemas). La demora en la entrega de esta información puede extender los plazos de implementación sin responsabilidad de INNOV.AS.`,
        },
      ],
    },
    {
      title: "5. Planes, precios y facturación",
      blocks: [
        {
          p: `Los precios y condiciones de facturación se establecen en el acuerdo comercial específico. Salvo indicación en contrario:`,
        },
        {
          ul: [
            `Cada etapa o servicio recurrente se factura según lo acordado en el contrato de servicio.`,
            `Los precios no incluyen impuestos locales que puedan corresponder según la jurisdicción del cliente.`,
            `El impago de facturas por más de 15 días hábiles puede resultar en la suspensión del servicio, previa notificación al cliente.`,
          ],
        },
      ],
    },
    {
      title: "6. Obligaciones del cliente",
      blocks: [
        { p: `El cliente se compromete a:` },
        {
          ul: [
            `Usar el servicio exclusivamente para fines lícitos y conforme a la normativa aplicable en su jurisdicción.`,
            `Obtener los consentimientos necesarios de sus usuarios finales para el procesamiento de sus datos a través de los sistemas de INNOV.AS.`,
            `No instruir a los agentes de INNOV.AS para que emitan comunicaciones engañosas, fraudulentas, discriminatorias o que violen derechos de terceros.`,
            `Mantener la confidencialidad de los accesos e integraciones configuradas.`,
            `Notificar a INNOV.AS de cualquier cambio en su operación que pueda afectar la configuración de los sistemas.`,
          ],
        },
      ],
    },
    {
      title: "7. Propiedad intelectual",
      blocks: [
        {
          p: `Todos los desarrollos, metodologías, flujos, modelos de agentes, prompts, configuraciones y sistemas creados por INNOV.AS son y permanecen propiedad intelectual exclusiva de INNOV.AS, incluso cuando hayan sido diseñados específicamente para la operación de un cliente.`,
        },
        {
          p: `El cliente retiene la propiedad de toda la información propia que provea para la configuración de los sistemas (datos, procesos, información de negocio). INNOV.AS no usará esa información para fines distintos a la prestación del servicio contratado.`,
        },
        {
          p: `El cliente recibe una licencia de uso limitada, no exclusiva e intransferible sobre los sistemas configurados, vigente durante la duración del contrato de servicio.`,
        },
      ],
    },
    {
      title: "8. Confidencialidad",
      blocks: [
        {
          p: `Ambas partes se comprometen a mantener la confidencialidad de la información que la otra parte designe como confidencial o que por su naturaleza deba entenderse como tal. Esta obligación subsiste por un período de 3 años después de la finalización del acuerdo de servicio.`,
        },
        {
          p: `Se exceptúa información que sea de dominio público, que el receptor ya conociera previamente, o cuya divulgación sea requerida por ley o autoridad competente.`,
        },
      ],
    },
    {
      title: "9. Limitación de responsabilidad",
      blocks: [
        { p: `En la máxima medida permitida por la ley aplicable, INNOV.AS no será responsable por:` },
        {
          ul: [
            `Daños indirectos, incidentales, especiales o consecuentes, incluyendo pérdida de ganancias, pérdida de datos o daño reputacional.`,
            `Interrupciones del servicio causadas por fuerza mayor, fallas de plataformas de terceros o causas fuera del control razonable de INNOV.AS.`,
            `Resultados comerciales específicos. Los impactos estimados en propuestas comerciales son proyecciones basadas en benchmarks del sector y no constituyen garantía de resultado.`,
            `Decisiones tomadas por el equipo del cliente basadas en información provista por los sistemas.`,
          ],
        },
        {
          p: `La responsabilidad total acumulada de INNOV.AS frente al cliente por cualquier reclamo no superará el monto abonado por el cliente en los 3 meses inmediatamente anteriores al evento que da origen al reclamo.`,
        },
      ],
    },
    {
      title: "10. Cancelación y rescisión",
      blocks: [
        {
          p: `**Por el cliente:** el cliente puede cancelar el servicio en cualquier momento con un preaviso de 30 días calendario, sin penalidad, salvo que exista un contrato de plazo fijo con condiciones específicas. La cancelación no da derecho a reembolso de etapas ya facturadas.`,
        },
        {
          p: `**Por INNOV.AS:** INNOV.AS puede rescindir el contrato con efecto inmediato en caso de incumplimiento grave de estos Términos por parte del cliente, uso ilícito del servicio, o impago reiterado. En casos no graves, se otorgará un preaviso de 30 días.`,
        },
        {
          p: `**Efectos de la rescisión:** al finalizar el contrato, INNOV.AS pondrá a disposición del cliente los datos que sean de su propiedad, en formato exportable, durante un período de 30 días. Transcurrido ese plazo, los datos serán eliminados conforme a la Política de Privacidad.`,
        },
      ],
    },
    {
      title: "11. Modificaciones a los términos",
      blocks: [
        {
          p: `INNOV.AS puede modificar estos Términos periódicamente. Las modificaciones entran en vigor 30 días después de su publicación en [innov.as/terminos](/terminos), salvo que la ley requiera un plazo mayor. El uso continuado del servicio después de esa fecha implica la aceptación de los nuevos Términos.`,
        },
      ],
    },
    {
      title: "12. Ley aplicable y jurisdicción",
      blocks: [
        {
          p: `Estos Términos se rigen por la legislación argentina. Cualquier controversia que no pueda resolverse amigablemente entre las partes será sometida a los tribunales ordinarios competentes de la Ciudad Autónoma de Buenos Aires, Argentina, con renuncia expresa a cualquier otro fuero que pudiera corresponder.`,
        },
      ],
    },
    {
      title: "13. Divisibilidad y acuerdo completo",
      blocks: [
        {
          p: `Si alguna disposición de estos Términos fuera declarada inválida o inaplicable, las restantes disposiciones continuarán en pleno vigor. Estos Términos, junto con el acuerdo comercial específico y la Política de Privacidad, constituyen el acuerdo completo entre las partes respecto al objeto aquí regulado.`,
        },
      ],
    },
    {
      title: "14. Contacto",
      blocks: [
        { p: `Para consultas sobre estos Términos:` },
        {
          card: {
            title: `INNOV.AS`,
            lines: [`Email: [hola@innov.as](mailto:hola@innov.as)`, `Web: [innov.as](https://innov.as)`],
          },
        },
      ],
    },
  ],
}
