
export const resumeData = {
  about: {
    title: "About Me",
    description: [
      "I am a developer with a journey from traditional Frontend development to complex business systems, and now focusing on Web3.",
      "I am passionate about building decentralized applications and exploring the future of the web.",
      "I thrive in remote, international teams where innovation and collaboration are valued."
    ],
    tags: ["Remote", "Web3", "Full Stack", "International Team"]
  },
  skills: {
    frontend: {
      title: "Frontend",
      items: [
        { name: "JavaScript / TypeScript", proficiency: 90, usage: "Core language for all my projects" },
        { name: "React / Next.js", proficiency: 85, usage: "Building complex, interactive UIs" },
        { name: "Vue", proficiency: 80, usage: "Used in previous enterprise projects" },
        { name: "Tailwind CSS", proficiency: 90, usage: "Rapid UI development and design system implementation" }
      ]
    },
    backend: {
      title: "Backend",
      items: [
        { name: "Node.js", proficiency: 75, usage: "Building RESTful APIs and server-side logic" },
        { name: "PostgreSQL / MongoDB", proficiency: 70, usage: "Data modeling and persistence" }
      ]
    },
    web3: {
      title: "Web3",
      items: [
        { name: "Solidity", proficiency: 60, usage: "Smart contract development" },
        { name: "Hardhat", proficiency: 65, usage: "Testing and deploying contracts" },
        { name: "Ethers.js / Viem", proficiency: 70, usage: "Blockchain interaction in frontend" }
      ]
    },
    engineering: {
      title: "Engineering",
      items: [
        { name: "Performance Optimization", proficiency: 80, usage: "Improving Core Web Vitals and load times" },
        { name: "Architecture Design", proficiency: 75, usage: "Designing scalable and maintainable codebases" },
        { name: "CI/CD", proficiency: 70, usage: "Automating build and deployment workflows" }
      ]
    }
  },
  projects: [
    {
      id: "nft-marketplace",
      name: "NFT Marketplace",
      description: "A decentralized marketplace for trading digital assets.",
      tags: ["React", "Solidity", "Next.js", "Web3"],
      details: {
        background: "Built to provide a low-fee alternative for artists to list their work.",
        role: "Full Stack Developer",
        architecture: "Next.js frontend, Solidity contracts on Ethereum, IPFS for storage.",
        challenges: "Optimizing gas costs and ensuring secure transactions.",
        results: "Successfully launched on testnet with 100+ active users.",
        links: {
          github: "https://github.com/example/nft-marketplace",
          demo: "https://example-nft-marketplace.vercel.app",
          contract: "0x123...abc"
        }
      }
    },
    {
      id: "defi-dashboard",
      name: "DeFi Dashboard",
      description: "Real-time analytics dashboard for DeFi protocols.",
      tags: ["TypeScript", "Graph Protocol", "Recharts"],
      details: {
        background: "Users needed a consolidated view of their investments across multiple chains.",
        role: "Frontend Lead",
        architecture: "React, Redux, The Graph for indexing blockchain data.",
        challenges: "Handling large datasets and real-time updates without performance lag.",
        results: "Reduced data load time by 40% using optimistic UI and caching.",
        links: {
          github: "https://github.com/example/defi-dashboard",
          demo: "https://example-defi-dashboard.vercel.app"
        }
      }
    },
    {
      id: "enterprise-crm",
      name: "Enterprise CRM",
      description: "A comprehensive CRM system for a logistics company.",
      tags: ["Vue", "Node.js", "MySQL"],
      details: {
        background: "Legacy system replacement to improve operational efficiency.",
        role: "Frontend Developer",
        architecture: "Vue 3, Element Plus, Node.js BFF.",
        challenges: "Migrating complex data and maintaining feature parity.",
        results: "Improved staff productivity by 25%.",
        links: {
          github: "https://github.com/example/crm"
        }
      }
    }
  ],
  experience: [
    {
      company: "Tech Innovators Inc.",
      role: "Senior Frontend Engineer",
      period: "2022 - Present",
      description: "Leading the frontend team in building next-gen web applications.",
      techStack: ["React", "Next.js", "GraphQL"],
      results: "Refactored legacy codebase, improving build time by 50%."
    },
    {
      company: "BlockChain Solutions",
      role: "Web3 Developer",
      period: "2020 - 2022",
      description: "Developed smart contracts and dApps for various clients.",
      techStack: ["Solidity", "Web3.js", "React"],
      results: "Deployed 5+ smart contracts to mainnet with zero security incidents."
    }
  ],
  contact: {
    email: "hello@example.com",
    github: "https://github.com/example",
    twitter: "https://twitter.com/example",
    linkedin: "https://linkedin.com/in/example",
    wallet: "0xYourWalletAddress"
  }
};
