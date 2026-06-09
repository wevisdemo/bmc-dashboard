# BMC Dashboard

Explore the topics discussed, studied, and proposed by the Bangkok Metropolitan Council (BMC) No. 13.

## Deployments

| Name       | URL                             | Host/Pipeline                     |
| ---------- | ------------------------------- | --------------------------------- |
| Production | https://wevis.info/bmcdashboard | Github Actions + SSH              |
| Staging    | https://bmc-dashboard.pages.dev | Github Actions + Cloudflare Pages |

## Tech Stack

- [Svelte 5](https://svelte.dev/) / [SvelteKit](https://svelte.dev/docs/kit)
- [Bits UI](https://bits-ui.com/) with [Phosphor Icons](https://phosphoricons.com/)
- [TailwindCSS 4](https://tailwindcss.com/)
- [D3.js](https://d3js.org/) (geo, scale, scale-chromatic)
- [Runed](https://runed.dev/) and [Zod](https://zod.dev/)
- [Sheethuahua](https://punchupworld.github.io/sheethuahua/)

## Environment Variables

| Variable          | Description                                     |
| ----------------- | ----------------------------------------------- |
| `PUBLIC_BASE_URL` | Base URL for OG images and base path derivation |

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

## Licenses

Regarding the data, the team intends to open it as Open Data under the [Attribution-NonCommercial 4.0 International](https://creativecommons.org/licenses/by-nc/4.0/) terms. This means you can use, modify, and build upon the data, but it cannot be used for commercial purposes or to seek profit from the work, and credit must be given to WeVis.

Regarding the source code, the team intends to develop every project as Open Source under the [Attribution-NonCommercial-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-nc-sa/4.0/) terms. This means you can use, modify, and build upon the work, but it cannot be used for commercial purposes or to seek profit from the work. You must provide notice and credit to the work's owner, and the resulting work must be under the same Creative Commons license conditions as the original. WeVis Ltd. and Punch Up Ltd. are joint licensors.
