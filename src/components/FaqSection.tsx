"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    id: "envio-argentina",
    question: "¿Envían a toda Argentina?",
    answer:
      "Sí, realizamos envíos a todo el país mediante correo o mensajería. El costo y el tiempo de entrega pueden variar según la provincia.",
  },
  {
    id: "envio-discreto",
    question: "¿El envío es discreto?",
    answer:
      "Siempre usamos embalajes discretos, sin logos ni referencias al contenido, para cuidar tu privacidad.",
  },
  {
    id: "formas-pago",
    question: "¿Qué formas de pago hay?",
    answer:
      "Aceptamos transferencias bancarias, tarjetas de crédito/débito a través de pasarela segura y, en algunos casos, efectivo contra entrega en puntos específicos.",
  },
  {
    id: "devolver-producto",
    question: "¿Puedo devolver mi producto?",
    answer:
      "Sí, siempre que el producto esté sin usar y con su empaque original, dentro del plazo de cambio detallado en nuestras políticas.",
  },
  {
    id: "devolver-producto-2",
    question: "¿Puedo devolver un producto?",
    answer:
      "Si el producto presenta fallas o llegó en mal estado, gestionamos el cambio o devolución. Escribinos con tu número de pedido y fotos del producto.",
  },
  {
    id: "pedido-no-llega",
    question: "Mi pedido no ha llegado, ¿qué puedo hacer?",
    answer:
      "Verificá el estado con el número de seguimiento. Si ves demoras o no tenés información, contactanos y revisamos el caso con la empresa de envíos.",
  },
  {
    id: "producto-roto",
    question: "El producto llegó roto, ¿qué puedo hacer?",
    answer:
      "Por favor sacá fotos del producto y del empaque y escribinos dentro de las primeras 24/48 horas. Te vamos a ofrecer un reemplazo o solución equivalente.",
  },
];

export function FaqSection() {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="mx-auto w-full max-w-3xl space-y-4 rounded-2xl border border-black/5 bg-white/50 p-4 shadow-sm dark:border-white/10 dark:bg-black/40 sm:p-6">
      <h2 className="text-base font-bebas tracking-wide text-black dark:text-white sm:text-lg">
        PREGUNTAS FRECUENTES
      </h2>

      <div className="divide-y divide-black/5 dark:divide-white/10">
        {faqs.map((item) => {
          const open = !!openMap[item.id];
          return (
            <div key={item.id} className="py-3">
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <span className="text-sm font-medium text-black dark:text-white">
                  {item.question}
                </span>
                <span className="text-lg text-black/60 dark:text-white/60">
                  {open ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open ? (
                  <motion.p
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 overflow-hidden text-xs leading-6 text-black/70 dark:text-white/70 sm:text-sm"
                  >
                    {item.answer}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

