import IDataService from '../interfaces/dataService.interface';
import { IPortfolio, Portfolio } from '../models/portfolio';

class PortfolioDataService implements IDataService<IPortfolio> {
    getAll() {
        return Portfolio.find().exec();
    }

    get(id: string) {
        return Portfolio.findOne({_id: id}).exec();
    }

    create(entity: IPortfolio) {

    }

    update(entity: IPortfolio) {

    }

    delete(id: string) {

    }
}


Property 'get' in type 'PortfolioDataService' is not assignable to the same property in base type 'IDataService<IPortfolio>'.
  Type '() => Promise<IPortfolio[]>' is not assignable to type '{ (): Promise<IPortfolio[]>; (id: string): Promise<IPortfolio>; }'