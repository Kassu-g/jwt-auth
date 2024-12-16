"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const auth = express();
auth.use(bodyParser.json());
const p = 3000;
const kayt = [];
const fs = require('fs');
auth.post('/api/user/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (kayt.find(user => user.email === email)) {
        return res.status(403).json({ error: 'Email already in use' });
    }
    const salattu = yield bcrypt.hash(password, 6);
    const uusi = { email, password: salattu };
    kayt.push(uusi);
    fs.writeFileSync('./results.txt', JSON.stringify(kayt, null, 2));
    res.status(201).json(uusi);
}));
auth.get('/api/user/list', (req, res) => {
    res.status(200).json(kayt);
});
auth.listen(p, () => {
    console.log(`toimii: http://localhost:${p}`);
});
