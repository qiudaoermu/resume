
import { resumeData } from "@/app/data/resume";
import Section from "./Section";

export default function Experience() {
  const { experience } = resumeData;

  return (
    <Section id="experience" title="Experience">
      <div className="space-y-12">
        {experience.map((job, index) => (
          <div
            key={index}
            className="relative pl-8 md:pl-0 border-l md:border-l-0 border-border md:grid md:grid-cols-[200px_1fr] md:gap-8 group"
          >
            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-accent md:hidden" />

            <div className="mb-2 md:mb-0 text-sm text-muted-foreground font-mono md:text-right md:pt-1">
              {job.period}
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                  {job.role}
                </h3>
                <div className="text-lg text-muted-foreground">{job.company}</div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {job.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {job.results && (
                <div className="pt-2 border-t border-border/50">
                  <span className="text-sm font-semibold text-accent">Key Achievement: </span>
                  <span className="text-sm text-muted-foreground">{job.results}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
