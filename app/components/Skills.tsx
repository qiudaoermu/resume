
import { resumeData } from "@/app/data/resume";
import Section from "./Section";
import { motion } from "framer-motion";

export default function Skills() {
  const { skills } = resumeData;
  const categories = Object.keys(skills) as Array<keyof typeof skills>;

  return (
    <Section id="skills" title="Skills">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-6 capitalize text-accent">
              {skills[category].title}
            </h3>
            <div className="space-y-6">
              {skills[category].items.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-muted-foreground">{item.usage}</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.proficiency}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
