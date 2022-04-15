module.exports = {
    apps: [{
        name: "DegensDrop",
        script: "./app.js",
        instances: "0",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}