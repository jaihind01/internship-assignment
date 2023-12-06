const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.post('/', (req, res) => {

    //using postman taking the input and validate
    const payload = req.body;

    if (!payload || !payload.str) {
        return res.status(400).json({ error: 'Invalid payload' });
    }

    const inputString = payload.str;
    

    // Use a regex 
    const words = inputString.match(/\S+/g) || [];

    // Check there are at least 8 words
    if (words.length >= 8) {
        
        return res.status(200).json({ result: inputString });
    } else {
        return res.status(406).json({ error: 'Not Acceptable. Input must have at least 8 words.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});