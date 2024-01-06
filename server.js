const http = require('http')

const routes = [{
  method: 'GET',
  path: '/health-check',
  controller: () => {
    return {
      status: 200,
      description: 'app is running'
    }
  },
},
{
  method: 'GET',
  path: '/users',
  controller: () => {
    return [{
      id: 1,
      name: 'Eduardo'
    },
    {
      id: 2,
      name: 'Alice'
    }]
  },

}]

const server = http.createServer(
  async (req, res) => {
    const path = parseUrl(req).pathname
    const method = req.method
    const route = routes.find((e) => e.method === method && path === e.path)

    if (route) {
      const result = route.controller()

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.write(
        JSON.stringify(result),
      );

    } else {
      res.writeHead(404, {
        "Content-Type": "application/problem+json",
      });

      res.write(
        JSON.stringify({
          status: 404,
          title: 'Not found',
          description: 'Route not found',
          type: 'about:blank'
        }),
      );
    }

    res.end()
  },
);

const parseUrl = (request) => {
  return new URL(request.url, `http://${request.headers.host}`);
};

server.listen(3000, () => {
  console.log(`server started on port 3000`);
});

