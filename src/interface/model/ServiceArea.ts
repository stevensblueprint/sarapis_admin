import Attribute from './Attribute';
import Metadata from './Metadata';

interface ServiceArea {
  id: string;
  name: string;
  description: string;
  extent: string;
  extentType: string;
  uri: string;
  attributes: Attribute[];
  metadata: Metadata[];
}

export default ServiceArea;
