import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FaqItem {
  question: string
  answer: string
}

interface TrainerFaqProps {
  items: FaqItem[]
}

export function TrainerFaq({ items }: TrainerFaqProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, index) => (
        <AccordionItem key={item.question} value={`item-${index}`} className="border-ink/20">
          <AccordionTrigger className="text-left font-display text-lg text-ink hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-ink-70">{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
