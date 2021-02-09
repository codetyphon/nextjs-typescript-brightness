const nircmd = require('nircmd');
const WmiClient = require('wmi-client');
import { NextApiRequest, NextApiResponse } from 'next'

const get = async () => {
    const query = 'SELECT CurrentBrightness,InstanceName FROM WmiMonitorBrightness';
    const wmi = new WmiClient({
        host: 'localhost',
        namespace: '\\\\root\\WMI'
    });
    return new Promise((resolve, reject) => {
        wmi.query(query, (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            if (res.length === 0) {
                reject(new Error('Unable to find any monitors to read brightness levels from'));
                return;
            }
            resolve(res[0].CurrentBrightness / 100);
        });
    })
}

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    // const {
    //     query: { id, name },
    //     method,
    // } = _req
    switch (_req.method) {
        case 'GET':
            const wmi_res:number = await get();
            res.status(200).json(wmi_res*100)
            break
        case 'POST':
            const { brightness } = _req.body;
            console.log(brightness);
            try {
                nircmd(['setbrightness', parseInt(brightness)]);
                res.status(200).json({ ok: true })
            } catch (err) {
                res.status(500).json({ statusCode: 500, message: err.message })
            }
            break
        default:
            res.status(405).end() //Method Not Allowed
            break
    }

}

export default handler