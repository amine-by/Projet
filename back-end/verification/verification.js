const verifcationJWT = (request, response, next) => {
    const bearerHeader = request.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      request.token = bearerToken;
      next();
    } else {
      response.sendStatus(403);
    }
};

module.exports = verifcationJWT;