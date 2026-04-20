# TypeScript Conventions

- Use arrow functions instead of `function` declarations:
  ```ts
  // ✗
  function doThing(x: string): number { ... }

  // ✓
  const doThing = (x: string): number => { ... };
  ```

- Avoid `null`; prefer `undefined`:
  ```ts
  // ✗
  let value: string | null = null;

  // ✓
  let value: string | undefined;
  ```

- Use optional properties (`?`) instead of explicit `| undefined` unions:
  ```ts
  // ✗
  interface Props { label: string | undefined; }

  // ✓
  interface Props { label?: string; }
  ```

- Use PascalCase for `const` names, not SCREAMING_SNAKE_CASE:
  ```ts
  // ✗
  const PING_INTERVAL_MS = 3000;
  const STARLINK_ADDRESS = '192.168.100.1:9200';

  // ✓
  const PingIntervalMs = 3000;
  const StarlinkAddress = '192.168.100.1:9200';
  ```
