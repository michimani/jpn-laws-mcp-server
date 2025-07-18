# Claude Development Guidelines

## CI Check Rules

**MUST** run the following checks every time you modify code:

### 1. Lint Check
```bash
bun run lint
```
- Biome syntax check and format validation
- If auto-fixable issues exist, run `bun run fmt` to fix them

### 2. Type Check
```bash
bun run typecheck
```
- TypeScript type error checking
- Fix all errors before committing

### 3. Build Check
```bash
bun run build
```
- Verify project builds successfully
- Ensure executable is generated correctly

### 4. MCP Server Tools List Test
```bash
# Test that MCP server tools are properly registered
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {}}' | node dist/index.js
```

## Execution Order

1. **lint** → 2. **typecheck** → 3. **build** → 4. **tools test** in sequence
2. If any step fails, fix errors before proceeding to next step
3. Confirm all checks pass before committing

## Note: macOS Build Issue
The current build.ts script has issues, so build manually:
```bash
rm -rf dist && bun build ./src/index.ts --outdir ./dist --target bun
```

## Important Guidelines

- **Avoid `any` type usage** - Use proper types when lint warns about `any`
- **Spell check errors** - Add legitimate words (from API specification) to cSpell configuration
- **Maintain type safety** - Minimize type casting
- **Error handling** - Implement error handling for all external API calls

## Available Scripts

```bash
bun run build     # Build project
bun run lint      # Lint check
bun run fmt       # Auto-fix formatting
bun run typecheck # TypeScript type check
bun run inspector # Test with MCP Inspector
```

## Project Structure

```
src/
├── index.ts              # Entry point
├── server.ts             # MCP server configuration
├── lib/
│   └── law-api-client.ts # Japanese Laws API client
├── mcp/
│   └── tools/
│       └── index.ts      # MCP tools definition
└── types/
    └── law-api.ts        # Japanese Laws API type definitions
```

## Available Japanese Laws API Tools

1. **search_laws** - Search laws by ID, title, type, category, etc.
2. **search_laws_by_keyword** - Full-text keyword search
3. **get_law_content** - Get full text content of laws
4. **get_law_revisions** - Get revision history of laws