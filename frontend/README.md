# Zuffy frontend

React with TypeScript, Vite, and SCSS. Spring Boot serves the production build;
Vite is used while editing the frontend.

## Run locally

Start the backend from the project root with `bash start-local.sh`. In a second
terminal, run `bash start-frontend.sh` from that same root and open
http://localhost:5173. Node.js 22.12 or newer is required for frontend development.

## File organization

| Location | Responsibility |
|---|---|
| `src/main.tsx` | React entry point and global SCSS import |
| `src/App.tsx` | Compose pages, navigation, and checkout coordination |
| `src/pages/AssistantPage.tsx` | Chat, preferences, and favorites layout |
| `src/pages/MenuPage.tsx` | Menu browsing, search, category and diet filters |
| `src/pages/OrdersPage.tsx` | Order list and refresh controls |
| `src/components/chat/` | Chat panel, messages, composer, suggestions, hero and preferences |
| `src/components/menu/` | Reusable food cards and favorites |
| `src/components/orders/` | Order card and delivery progression |
| `src/components/cart/` | Bag dialog, line quantities and checkout summary |
| `src/components/layout/` | Header, footer and Ollama connection indicator |
| `src/components/common/` | Typed SVG icons, food illustrations, diet selector and toast |
| `src/hooks/` | Chat, menu, cart, orders, health, preferences, session, toast and dialog focus state |
| `src/api/client.ts` | Shared HTTP client, timeout and error handling |
| `src/api/zuffyApi.ts` | Typed Spring Boot endpoint functions |
| `src/types/api.ts` | Request/response interfaces matching the Java API records |
| `src/data/suggestions.ts` | Chat starter content |
| `src/utils/` | INR formatting and browser storage helpers |
| `src/styles/` | SCSS theme, shared styles, feature partials and responsive mixins |

Presentation components receive typed props. Network requests stay in `api/`;
hooks own asynchronous state and browser persistence. `App.tsx` composes these
pieces, while each page lays out its own feature components.

The browser retains the session, cart, preferences and conversation. Storage
helpers validate saved data and support chats saved by the earlier JavaScript UI.
Only completed messages are sent as conversation history; retrying a failed
question reuses its displayed message.

## Styling

`src/styles/main.scss` loads feature partials with Sass `@use`.

- `_tokens.scss` defines colors and breakpoint sizes.
- `_mixins.scss` provides `down()` and `up()` responsive helpers.
- `_base.scss`, `_shared.scss`, and `_layout.scss` cover global styling.
- `components/` and `pages/` contain the matching feature styles, including
  their responsive rules.

For example, inside `styles/components/_chat.scss`:

```scss
@use '../mixins';

@include mixins.down('mobile') {
  .chat-header {
    padding: 17px 14px;
  }
}
```

Edit SCSS source files, then rebuild. The CSS and JavaScript in the backend's
`static/assets` directory are generated production files.

## Development commands

From `frontend`:

```bash
npm ci
npm run dev
npm run typecheck
npm run format:check
npm run format
npm run build
```

`npm run build` runs the strict TypeScript check before the Vite production build.
To copy that build into Spring Boot, run `bash build-web.sh` from the project root
and restart the backend.

Vite proxies `/api` to port 8081. To use a different backend port:

```bash
BACKEND_URL=http://127.0.0.1:8082 npm run dev
```
