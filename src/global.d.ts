declare const APP_VERSION: string | undefined;
declare const APP_NAME: string | undefined;
declare const APP_ENV: string | undefined;

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}
