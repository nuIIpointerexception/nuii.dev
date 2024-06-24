# nuii.dev - Portfolio

Hey, this might be a bit overengineered for a portfolio, but i created this to try out Svelte and thought it would be a good time to do some rebranding for myself.

## Screenshots

Will be added as soon as some eye candy is available.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `@nuii/web`: a [SvelteKit](https://kit.svelte.dev/) app serving as the main portfolio website, using `@nuii/ui`
- `@nuii/ui`: A comprehensive UI package for the site using [shadcn-svelte](https://www.shadcn-svelte.com/)

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Technologies Used

This project leverages a variety of cutting-edge technologies:

- [SvelteKit](https://kit.svelte.dev/): Full-stack framework for building web applications
- [Turborepo](https://turbo.build/repo): High-performance build system for JavaScript and TypeScript codebases
- [TypeScript](https://www.typescriptlang.org/): Typed superset of JavaScript
- [Bun](https://bun.sh/): All-in-one JavaScript runtime & toolkit
- [shadcn-svelte](https://www.shadcn-svelte.com/): Beautifully designed components built with Radix UI and Tailwind CSS
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework

### Clone and Setup

To get started with nuii.dev, follow these steps:

```bash
# Clone the repository
git clone https://github.com/nuiipointerexception/nuii.dev.git
cd nuii.dev

# Install dependencies
bun i
```

### Build

To build all apps and packages, run the following command:

```
bun run build
```

### Develop

To develop all apps and packages, run the following command:

```
bun run dev
