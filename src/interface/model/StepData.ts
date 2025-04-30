import Organization from './Organization';

interface Step0Data {
  name: string;
  alternate_name: string;
  organization: Organization;
  email: string;
  url: string;
  additional_urls: string[];
  description: string;
}

interface Step1Data {
  capacities: string;
  accreditations: string;
  funding: string;
  attributes: string;
}

type StepDataArray = [Step0Data?, Step1Data?];

export default StepDataArray;
