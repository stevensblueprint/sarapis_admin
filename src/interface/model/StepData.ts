import Organization from './Organization';
import Url from './Url';
import ServiceCapacity from './ServiceCapacity';
import Funding from './Funding';

interface BasicInfoFormData {
  name: string;
  alternate_name: string | null;
  organization: Organization | null;
  email: string | null;
  url: string | null;
  additional_urls: Url[] | null;
  description: string | null;
}

interface AdditionalInfoFormData {
  capacities: ServiceCapacity[];
  accreditations: string;
  funding: Funding[];
}

interface StatusFormData {
  status: string;
  assured_date: Date | null;
  assurer_email: string | null;
  last_modified: Date | null;
  alert: string | null;
}

interface LanguageFormData {}

type StepDataArray = [
  BasicInfoFormData?,
  AdditionalInfoFormData?,
  StatusFormData?,
];

export default StepDataArray;
