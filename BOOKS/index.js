const http = require('http');

const server = http.createServer(function (req, res) {
    console.log(req.url);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ "hi": "everyone" }));
});

server.listen(5050, () => {
    console.log("Listening on 5050...");
});