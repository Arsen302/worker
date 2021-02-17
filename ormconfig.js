module.exports = {
  "type": process.env.DB_CONNECTION,
  "host": process.env.DB_HOST,
  "port":  process.env.DB_PORT || 3000,
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_NAME,
  "synchronize": false,
  "logging": true,
  "entities": ["src/models/*.ts"],
  "migrations": ["src/migrations/*.ts"],
  "subscribers": ["src/subscribers/**/*.ts"],
  "cli": {
    "entitiesDir": "src/models",
    "migrationsDir": "src/migrations",
    "subscribersDir": "src/subscribers"
  }
}
