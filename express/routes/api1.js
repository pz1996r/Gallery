const api = require('../routes.js')
const router = api.router;

const ip = require("ip");
const serverIp = ip.address();
const Authorization = process.env.Authorization;

router.get('/api1', async (req, res) => {
    console.log('api', serverIp);
    console.log('env', Authorization);
    console.log()
    res.json({
        'hello': 'api',
        'ip': serverIp
    })
})

module.exports = router;