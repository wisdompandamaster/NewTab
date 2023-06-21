const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      //遇见/api前缀的就会触发这个转发
      target: "https://newtab.wisdompanda.com/api", //要转发的目标地址
      changeOrigin: true, //控制服务器中收到的请求头中host字段的值
      pathRewrite: { "^/api": "" }, //重写请求路径
    }),
    createProxyMiddleware("/pic", {
      target: "https://minio.wisdompanda.com",
      changeOrigin: true,
      pathRewrite: { "^/pic": "" },
    })
  );
};
