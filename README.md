# BMC Dashboard

## Deployments

| Name       | URL                              | Host/Pipeline    |
| ---------- | -------------------------------- | ---------------- |
| Production | -                                | -                |
| Staging    | https://bmc-dashboard.pages.dev/ | Cloudflare Pages |

## Tech Stack

- [Svelte 5](https://svelte.dev/) / [SvelteKit](https://svelte.dev/docs/kit)
- [Bits UI](https://bits-ui.com/) with [Phosphor Icons](https://phosphoricons.com/)
- [TailwindCSS 4](https://tailwindcss.com/)
- [D3.js](https://d3js.org/) (geo, scale, scale-chromatic)
- [Runed](https://runed.dev/) and [Zod](https://zod.dev/)
- [Sheethuahua](https://punchupworld.github.io/sheethuahua/)

## Usage

Requirements: [Node.js](https://nodejs.org/) 24+, [pnpm](https://pnpm.io/)

```sh
# Install packages
pnpm install

# Start local dev server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Type check
pnpm run check

# Lint
pnpm run lint

# Format
pnpm run format
```

## Related resources

- [Data Sheets](https://docs.google.com/spreadsheets/d/1vm2kIqOrKyPjWvlK9GjMAo9mFTcZEK1GSkJ3gM1gNb8/edit?usp=sharing)
- [Figma](https://www.figma.com/design/aSpOB74URAuZqIcFcq2H9q/BMC-Dashboard)

## License

[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
