import Attribute from './Attribute';
import Metadata from './Metadata';

interface CostOption {
  id: string;
  service_id: string | null;
  valid_from: string | null;
  valid_to: string | null;
  option: string | null;
  currency: string | null;
  amount: number | null;
  amount_description: string | null;
  attributes: Attribute[] | null;
  metadata: Metadata[] | null;
}

export default CostOption;
