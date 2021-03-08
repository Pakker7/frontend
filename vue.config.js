module.exports = {
  "outputDir": "F:\\Spring\\SpringBootAndVuejs\\src\\main\\resources\\static",
  "devServer": {
    "proxy": {
      "/api": {
        "target": "http://localhost:9000",
        "ws": true,
        "changeOrigin": true
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}