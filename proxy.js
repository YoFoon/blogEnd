var proxy=require('http-proxy').createProxyServer({});

proxy.on(function(err,req,res){
  res.writeHead(500,{
    'Content-Type':'text/plain'
  });
});

var server=require('http').createServer(function(req,res){
  var host= req.headers.host;
  switch(host){
    case 'blogend.yofoon.com':
      proxy.web(req,res,{target:'http://127.0.0.1:8000'});
    break;
    default: 
      proxy.web(req,res,{target:'http://127.0.0.1:8000'});
      res.writeHead(200, { 
        'Content-Type': 'text/plain' 
      });
      res.end('Welcome to my server!');
  }
});

console.log("listening on port 8080")
server.listen(80);