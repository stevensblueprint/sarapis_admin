import Organization from './Organization';
import Url from './Url';

interface Step0Data {
  name: string;
  alternate_name: string | null;
  organization: Organization | null;
  email: string | null;
  url: string | null;
  additional_urls: Url[] | null;
  description: string | null;
}

interface Step1Data {
  capacities: string;
  accreditations: string;
  funding: string;
  attributes: string;
}

type StepDataArray = [Step0Data?, Step1Data?];

export default StepDataArray;
