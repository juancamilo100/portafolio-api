const { Portfolio } = require('./portfolio');
const { User } = require('./user');

const syncNewPortafolioToUser = async (data, operation) => {
    try {
        const user = await User.findById(data.fullDocument.user);
        const newPortfolios = user.portfolios.slice(0);

        switch (operation) {
            case "insert":
                newPortfolios.push(data.fullDocument._id);
                user.portfolios = newPortfolios;
                break;
            
            case "delete":
                user.portfolios = newPortfolios.filter(
                        (portfolioId) => !portfolioId === data.fullDocument._id
                    );
                break;                
        
            default:
                break;
        }

        await user.save();
    } catch (error) {
        throw error;
    }
}

const initDatabaseStreams = () => {
    Portfolio.watch()
        .on('change', async (data) => { 
            if (['insert', 'delete'].indexOf(data.operationType) > -1) {
                syncNewPortafolioToUser(data, data.operationType);
            }
        });
}

module.exports = initDatabaseStreams; 


