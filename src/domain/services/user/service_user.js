const mockDB = require('../../repositories/repository_data.mock');
const userOrm = require('../../orm/user/orm_user');

const getJoblist = async (req, res) => {
    try {
        const jobList = mockDB.jobs.filter(job => job.user_id === req.user.id);
        res.send(jobList);
    } catch (e) {
        console.log(e);
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const currentUser = mockDB.users.find(user => user.id === req.user.id);
        res.send(currentUser);
    } catch (e) {
        console.log(e);
    }
};

const pruebaPostgreSQL = async (req, res) => {
    try {
        const responseSql = await userOrm.responseIva();
        res.send(responseSql);
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    getJoblist,
    getCurrentUser,
    pruebaPostgreSQL
}