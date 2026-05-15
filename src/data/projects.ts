interface ProjectLink {
  label: string;
  href?: string; // omit to render the label as plain text (e.g. "Repo coming soon")
}

export interface Project {
  name: string;
  pitch: string;
  techChips: string[];
  links: ProjectLink[];
  status?: "in-progress";
}

export const projects: Project[] = [
  {
    name: "Homelab",
    pitch:
      "A declarative, GitOps-driven homelab on two platforms: NixOS and a 5-node HA Kubernetes cluster — Proxmox, Talos, Terraform, Helm, and Flux.",
    techChips: [
      "Talos",
      "Flux Operator",
      "OpenTofu",
      "Helm",
      "SOPS",
      "Ansible",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/MurtadhaInit/homelab" },
      { label: "Write-up", href: "/blog/posts/homelab" },
    ],
  },
  {
    name: "E-commerce platform (CI/CD)",
    pitch:
      "Go API & Svelte frontend for a full-stack e-commerce store; CI builds the container image and Flux automatically deploys it to my homelab cluster.",
    techChips: ["Go", "MySQL", "GitHub Actions", "Docker", "Flux"],
    links: [
      {
        label: "GitHub (backend)",
        href: "https://github.com/MurtadhaInit/e-store-backend",
      },
      {
        label: "GitHub (frontend)",
        href: "https://github.com/MurtadhaInit/e-store-frontend",
      },
    ],
    status: "in-progress",
  },
  {
    name: "Dotfiles",
    pitch:
      "Declarative macOS workstation environment powered by Nix flakes and Home Manager, with Nushell-driven setup scripts.",
    techChips: ["Nix", "Nushell", "Homebrew", "macOS"],
    links: [
      { label: "GitHub", href: "https://github.com/MurtadhaInit/dotfiles" },
    ],
  },
  {
    name: "This Astro website/blog",
    pitch:
      "Astro 6 static site with MDX-powered blog and Tailwind v4 theming; deployed via GitHub Actions on GitHub Pages.",
    techChips: ["Astro", "TypeScript", "Tailwind", "MDX", "Figma"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/MurtadhaInit/personal-website-blog",
      },
    ],
  },
];
