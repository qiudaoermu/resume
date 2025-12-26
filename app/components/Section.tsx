import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({
  id,
  title,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "px-4 md:px-8 max-w-5xl mx-auto scroll-mt-24 md:scroll-mt-28",
        className
      )}
    >
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-primary"
        >
          {title}
        </motion.h2>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
