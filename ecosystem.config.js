module.exports = {
  apps : [{
    name: 'APP',
    script: './server.js',
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    ignore_watch : [
      "node_modules",
      "persist",
      "storage",
      ".git",
      ".idea",
      ".history",
      "public/js",
      "public/qr",
      "public/uploads"
    ],
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
