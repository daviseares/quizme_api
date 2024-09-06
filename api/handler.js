const fs = require('fs');
const path = require('path');

let questions = [];

function loadQuestions() {
    const data = fs.readFileSync(path.join(__dirname, 'questions.json'), 'utf8');
    questions = JSON.parse(data);
}

function getQuestions(req, res) {
    const nStr = req.query.n;
    if (!nStr) {
        return res.status(400).send("Missing 'n' query parameter");
    }

    const n = parseInt(nStr, 10);
    if (isNaN(n) || n <= 0) {
        return res.status(400).send("'n' query parameter must be a positive integer");
    }

    if (n > questions.length) {
        return res.status(400).send(`Requested number of questions exceeds available questions. Maximum is ${questions.length}`);
    }

    const shuffledQuestions = questions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffledQuestions.slice(0, n);

    res.json(selectedQuestions);
}

loadQuestions();

module.exports = (req, res) => {
    if (req.method === 'GET') {
        getQuestions(req, res);
    } else {
        res.status(405).send('Method Not Allowed');
    }
};