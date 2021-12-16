import { Handler } from "express";
import bcrypt from "bcrypt";

import { HASH_SALT } from "../utils/config";

import { LoginRequest, RegisterRequest } from "../types/index";

import User from "../models/Users";

export const login: Handler = async (req: LoginRequest, res, next) => {
    try {
        console.log("here");
        if (!req.validated) throw Error("No validated obj");
        const { username, password } = req.validated;
        const user = await User.findOne({ username });
        if (!user) res.status(400).send("No such username");
        if (!(await bcrypt.compare(password, user.password)))
            res.status(400).send("Bad password");
    } catch (error) {
        next(error);
    }
};

export const register: Handler = async (req: RegisterRequest, res, next) => {
    try {
        if (!req.validated) throw Error("No validated obj");
        const { name, username, password } = req.validated;
        const exists = await User.findOne({ username });
        if (exists) res.status(400).send("User already exists");

        const hashedPassword = bcrypt.hash(password, HASH_SALT);
        const user = await User.create({
            username,
            name,
            password: hashedPassword,
        });
        res.send(user);
    } catch (error) {
        next(error);
    }
};
