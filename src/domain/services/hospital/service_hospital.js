const { requestPostApi } = require("../../repositories/repository_service");

const postAllPatients = async (req, res) => {
    try {
        const body = req.body;
        const token = req.get('Authorization');
        const urlPatients = "/patients/get-all";
        const responsePatients = await requestPostApi(urlPatients, body, token);
        res.send(responsePatients);
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    postAllPatients
}