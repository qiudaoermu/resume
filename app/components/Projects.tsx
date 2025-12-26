"use client";

import { resumeData } from "@/app/data/resume";
import Section from "./Section";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ExternalLink, Github, Code } from "lucide-react";

type Project = (typeof resumeData.projects)[0];

export default function Projects() {
  const { projects } = resumeData;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <Section id="projects" title="Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layoutId={`project-${project.id}`}
            onClick={() => setSelectedProject(project)}
            className="group cursor-pointer rounded-2xl bg-card border border-border p-6 hover:border-accent/50 transition-colors relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-bold">{project.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="text-xs px-2 py-1 text-muted-foreground">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                layoutId={`project-${selectedProject.id}`}
                className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-3xl p-6 md:p-8 relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      {selectedProject.name}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-primary">Overview</h4>
                      <div className="space-y-4 text-sm text-muted-foreground">
                        <div>
                          <strong className="text-foreground block mb-1">
                            Role
                          </strong>
                          {selectedProject.details.role}
                        </div>
                        <div>
                          <strong className="text-foreground block mb-1">
                            Background
                          </strong>
                          {selectedProject.details.background}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-primary">Technical</h4>
                      <div className="space-y-4 text-sm text-muted-foreground">
                        <div>
                          <strong className="text-foreground block mb-1">
                            Architecture
                          </strong>
                          {selectedProject.details.architecture}
                        </div>
                        <div>
                          <strong className="text-foreground block mb-1">
                            Key Challenges
                          </strong>
                          {selectedProject.details.challenges}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                    <h4 className="font-semibold text-primary mb-2">
                      Results & Impact
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedProject.details.results}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                    {selectedProject.details.links?.github && (
                      <a
                        href={selectedProject.details.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Source Code
                      </a>
                    )}
                    {selectedProject.details.links?.demo && (
                      <a
                        href={selectedProject.details.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                    {selectedProject.details.links?.contract && (
                      <a
                        href={`https://etherscan.io/address/${selectedProject.details.links.contract}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
                      >
                        <Code className="w-4 h-4" />
                        Smart Contract
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Section>
  );
}
