import Organization from './Organization';
import Url from './Url';
import ServiceCapacity from './ServiceCapacity';
import Funding from './Funding';
import Language from './Language';
import CostOption from './CostOption';
import RequiredDocument from './RequiredDocument';

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

interface LanguageFormData {
  languages: Language[] | null;
  interpretation_services: string | null;
}

interface ApplicationFormData {
  application_process: string;
  fees_description: string;
  cost_options: CostOption[];
  eligibility_description: string;
  minimum_age: number;
  maximum_age: number;
  required_documents: RequiredDocument[];
}

type StepDataArray = [
  BasicInfoFormData?,
  AdditionalInfoFormData?,
  StatusFormData?,
  LanguageFormData?,
  ApplicationFormData?,
];

export default StepDataArray;
