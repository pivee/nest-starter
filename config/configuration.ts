export function configuration() {
  return {
    database: {
      host: process.env.DATABASE_HOST || 'localhost',
      port: process.env.DATABASE_HOST || '1234',
    },
  };
}
