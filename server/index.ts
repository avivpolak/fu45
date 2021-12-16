import express from "express";
import http from "http";

import { PORT } from "./utils/config";

import app from "./app";

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
