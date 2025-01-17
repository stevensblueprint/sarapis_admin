import Attribute from './Attribute';
import Metadata from './Metadata';

interface CostOption {
  id: string;
  validFrom: string;
  validTo: string;
  option: string;
  currency: string;
  amount: number;
  amountDescription: string;
  attributes: Attribute[];
  metadata: Metadata[];
}

export default CostOption;
