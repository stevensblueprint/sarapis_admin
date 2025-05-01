import Metadata from './Metadata';

interface Taxonomy {
  id: string;
  name: string;
  description: string;
  uri?: string;
  version?: string;
  metadata?: Metadata[];
}

export default Taxonomy;
