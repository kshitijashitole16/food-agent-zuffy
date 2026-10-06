# Validation

Validated on 6 October 2026 using Java 17 and the included Maven Wrapper.

- The React + TypeScript production build and strict TypeScript check passed.
  SCSS compiled successfully and the build is included in Spring Boot's static resources.
- Prettier's formatting check passed for the TypeScript, TSX and SCSS source files.
- Six Spring Boot integration tests passed with no failures or errors. They cover
  the Spring AI menu and order tool loops, configured Ollama model name,
  conversation history, server-calculated order totals, session isolation,
  invalid requests, a missing model, and the recipe API alias.
- The real Spring Boot server served the frontend and API during browser checks.
  Menu search, bag quantities, checkout, order display, an offline Ollama error,
  tool trace chips and recommendation cards passed.
- The UI was checked at desktop and 390-pixel mobile widths, including the
  bundled food illustrations, absence of horizontal overflow, and Escape to
  close the bag. No browser JavaScript errors were reported.
- The browser tool check confirmed that Spring AI sends `llama3.2:3b` to
  Ollama and sends actual menu data back after executing the Java tool.
- After the frontend refactor, browser checks passed for all three chat tools,
  cart/server totals, checkout, tracking, missing-model error and retry, saved
  preferences/conversation/cart, migration of the earlier JavaScript UI's stored
  data, dialog focus trapping and focus restoration. Retrying a failed question
  did not duplicate its displayed message or the question sent to the model.
- Computed styles were compared with the original CSS for desktop assistant,
  menu and order screens and mobile assistant/menu screens. No differences were
  found in the checked layout, typography, spacing and color properties.
- The separate Vite development frontend rendered TypeScript/SCSS and successfully
  proxied a chat request to the real Spring Boot backend.

Model transport and tool tests use a controlled Ollama-compatible HTTP server;
they do not test live Llama inference or generated recipe quality. The application
uses your local Ollama installation for real answers. Model weights are downloaded
separately on the first run and are not included in this ZIP.

Run the backend tests with `sh ./mvnw test` inside `spring-boot`. See `README.md`
for setup and frontend rebuild instructions.
