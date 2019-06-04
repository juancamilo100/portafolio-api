const { User } = require('../../../models/user');
const { Portfolio } = require('../../../models/portfolio');

const syncPortafolioToUser = async (data, operation) => {
    try {
        const user = await User.findById(data.fullDocument.user);
        const newPortfolios = user.portfolios.slice(0);

        switch (operation) {
            case "insert":
                newPortfolios.push(data.documentKey._id);
                user.portfolios = newPortfolios;
                break;
            
            case "delete":
                user.portfolios = newPortfolios.filter(
                        (portfolioId) => !portfolioId === data.documentKey._id
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

const portfolioStreamsInit = () => {
    // Portfolio.watch()
    // .on('change', async (data) => { 
    //     if (['insert', 'delete'].indexOf(data.operationType) > -1) {
    //         syncPortafolioToUser(data, data.operationType);
    //     }
    // });
}

module.exports = portfolioStreamsInit;