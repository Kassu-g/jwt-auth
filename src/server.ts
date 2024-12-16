const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const auth = express();
auth.use(bodyParser.json());
const p = 3000;
const kayt: { email: any; password: any; }[] = [];
const fs = require('fs');

auth.post('/api/user/register', async (req: { body: { email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; email?: any; password?: any; }): void; new(): any; }; }; }) => {
    const { email, password } = req.body;

    if (kayt.find(user => user.email === email)) {
        return res.status(403).json({ error: 'Email already in use' });
    }

    const salattu = await bcrypt.hash(password, 6);

    const uusi = { email, password: salattu };
    kayt.push(uusi);
    fs.writeFileSync('./results.txt', JSON.stringify(kayt, null, 2));

    res.status(201).json(uusi);
});
auth.get('/api/user/list', (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any[]): void; new(): any; }; }; }) => {
    
    res.status(200).json(kayt);
});

auth.listen(p, () => {
    console.log(`toimii: http://localhost:${p}`);
});
