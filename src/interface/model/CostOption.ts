import Attribute from './Attribute';
import Metadata from './Metadata';

interface CostOption {
  id: string;
  service_id?: string;
  valid_from?: string;
  valid_to?: string;
  option?: string;
  currency?: string;
  amount?: number;
  amount_description?: string;
  attributes?: Attribute[];
  metadata?: Metadata[];
}

export default CostOption;
