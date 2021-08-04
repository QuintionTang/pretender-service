const AdministratorsModel = require("../models").administrators;

class AdministratorsService {
    constructor() {}
    async get(username) {
        try {
            const userinfo = await AdministratorsModel.findOne({
                where: { username },
            });
            return userinfo;
        } catch (error) {
            throw error;
        }
    }
    async add(newData) {
        try {
            return await AdministratorsModel.create(newData);
        } catch (error) {
            throw error;
        }
    }
    async del(id) {
        try {
            const isExist = await AdministratorsModel.findOne({
                where: { id: Number(id) },
            });

            if (isExist) {
                const deleted = await AdministratorsModel.destroy({
                    where: { id: Number(id) },
                });
                return deleted;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
    async update(id, updateData) {
        try {
            const isExist = await AdministratorsModel.findOne({
                where: { id: Number(id) },
            });

            if (isExist) {
                await AdministratorsModel.update(updateData, {
                    where: { id: Number(id) },
                });

                return updateData;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AdministratorsService();
