import Metadata from './Metadata';

interface Taxonomy {
  id: string;
  name: string;
  description: string;
  uri: string | null;
  version: string | null;
  metadata: Metadata[] | null;
}

export default Taxonomy;
