import { resumeData } from "@/app/data/resume";
import Section from "./Section";
import { Mail, Github, Twitter, Linkedin, Wallet } from "lucide-react";

export default function Contact() {
  const { contact } = resumeData;

  const links = [
    {
      name: "Email",
      value: contact.email,
      icon: Mail,
      href: `mailto:${contact.email}`,
    },
    {
      name: "GitHub",
      value: "Github Profile",
      icon: Github,
      href: contact.github,
    },
    {
      name: "Twitter",
      value: "Twitter Profile",
      icon: Twitter,
      href: contact.twitter,
    },
    {
      name: "LinkedIn",
      value: "LinkedIn Profile",
      icon: Linkedin,
      href: contact.linkedin,
    },
  ];

  return (
    <Section id="contact" title="Get in Touch" className="mb-20">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground">
            I&apos;m currently open to remote opportunities in Web3 and Full
            Stack development. Feel free to reach out if you&apos;d like to
            collaborate or just say hi!
          </p>

          <div className="space-y-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent transition-colors group"
              >
                <div className="p-2 rounded-lg bg-secondary text-primary group-hover:bg-accent group-hover:text-white transition-colors">
                  <link.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    {link.name}
                  </div>
                  <div className="font-medium">{link.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {contact.wallet && (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary to-card border border-border">
            <div className="flex items-center gap-3 mb-4 text-accent">
              <Wallet className="w-6 h-6" />
              <h3 className="font-semibold">Web3 Wallet</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              You can verify my on-chain activity or send me a message via
              blockscan chat.
            </p>
            <div className="p-3 rounded-lg bg-black/50 font-mono text-xs md:text-sm break-all text-muted-foreground border border-border/50">
              {contact.wallet}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
