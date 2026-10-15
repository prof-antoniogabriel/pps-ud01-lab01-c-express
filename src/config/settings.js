export const settings = {
  appName: process.env.APP_NAME ?? 'Avisos de Seguridad',
  port: Number.parseInt(process.env.PORT ?? '3000', 10),
};
