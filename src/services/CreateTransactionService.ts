import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // TODO
    // extra: validar o tipo de transação
    if(!['income', 'outcome'].includes(type)){
      throw new Error('O tipo de operação é inválido.');
    }


    const { total } = this.transactionsRepository.getBalance();

    if(type === 'outcome' && total < value) {
      throw new Error('Não há saldo suficiente para a operação');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    });

    return transaction;
  }
}

export default CreateTransactionService;
