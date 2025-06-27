# StreamKit API

A Cloudflare Workers API that provides gaming profile information for streaming and content creation.

## Features

- **Valorant Profile Data**: Fetch current rank, peak rank, and player statistics
- **Fast Response Times**: Built on Cloudflare Workers edge network
- **Simple REST API**: Easy to integrate with streaming software and overlays

## Setup

Install dependencies:

```bash
bun install
```

## Development

Start the development server:

```bash
bun run dev
```

This will start the Wrangler development server with hot reloading.

## Deployment

Deploy to Cloudflare Workers:

```bash
bun run deploy
```

## API Endpoints

### Root

```
GET /
```

Returns a simple greeting message.

### Valorant Profile

```
GET /valorant?username={username}
```

Fetches Valorant profile information for the specified username.

**Parameters:**

- `username` (required): Riot username in format `username#tag`

**Example:**

```
GET /valorant?username=Player%23TAG
```

**Response:**
Returns formatted text with current rank and peak rank information:

```
Player#TAG - Diamond 2 (67 RR) | Peak Rank: Immortal 1 (Episode 8 Act 1)
```

## Type Generation

Generate TypeScript types for Cloudflare Workers bindings:

```bash
bun run cf-typegen
```

To use the generated `CloudflareBindings` type with Hono:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```

## Tech Stack

- **Runtime**: Cloudflare Workers
- **Framework**: Hono
- **Language**: TypeScript
- **Package Manager**: Bun
- **Deployment**: Wrangler

## Project Structure

```
src/
  ├── index.ts          # Main application and route handlers
  └── libs/
      └── fetcher.ts    # External API integration utilities
```
