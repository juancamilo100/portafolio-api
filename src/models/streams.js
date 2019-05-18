const { Portfolio } = require('./portfolio');
const { User } = require('./user');

const syncNewPortafolioToUser = async (data) => {
    try {
        const user = await User.findById(data.fullDocument.user);
        const newPortfolios = user.portfolios.slice(0);

        newPortfolios.push(data.fullDocument._id);
        user.portfolios = newPortfolios;

        await user.save();
    } catch (error) {
        throw error;
    }
}

const initDatabaseStreams = () => {
    Portfolio.watch()
        .on('change', async (data) => { 
            if (data.operationType === 'insert') {
                syncNewPortafolioToUser(data);
            }
        });
}

module.exports = initDatabaseStreams; 


