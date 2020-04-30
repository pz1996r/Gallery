require('dotenv').config();

const axios = require('axios');
const api = require('../routes.js')
const router = api.router;
const Authorization = process.env.Authorization;

router.get('/clash', async (req, res) => {
    try {
        const { amount, page } = req.query;
        const headers = { 'Authorization': Authorization }
        const response = await axios.get('https://api.clashroyale.com/v1/cards', { headers: headers });
        let responsePackage;
        let limit = response.data.items.length - 1;
        if (amount && page) {
            responsePackage = { cards: response.data.items.splice(page, amount).map((record, i) => ({ ...record, id: (+ page + i + 1) })), amount: limit };
        } else {
            responsePackage = response.data.items.map((record, i) => ({ ...record, id: i++ }));
        }
        return res.json({
            'response': responsePackage
        })
    } catch (error) {
        return res.status(404).json({
            'error': 'Failed to connect with clashRoyal serwer, try again later.',
            'info': error
        })
    }
})

module.exports = router;