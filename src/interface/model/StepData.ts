import Organization from './Organization';
import Url from './Url';
import ServiceCapacity from './ServiceCapacity';
import Funding from './Funding';
import Language from './Language';
import CostOption from './CostOption';
import RequiredDocument from './RequiredDocument';
import Schedule from './Schedule';
import Program from './Program';
import ServiceArea from './ServiceArea';
import ServiceAtLocation from './ServiceAtLocation';
import Contact from './Contact';
import Phone from './Phone';
import Attribute from './Attribute';

interface BasicInfoFormData {
  name: string;
  alternate_name?: string;
  organization?: Organization;
  email?: string;
  url?: string;
  additional_urls?: Url[];
  description?: string;
}

interface AdditionalInfoFormData {
  capacities?: ServiceCapacity[];
  accreditations?: string;
  funding?: Funding[];
  program?: Program;
  attributes?: Attribute[];
}

interface StatusFormData {
  status: string;
  assured_date?: Date;
  assurer_email?: string;
  last_modified?: Date;
  alert?: string;
}

interface LanguageFormData {
  languages?: Language[];
  interpretation_services?: string;
}

interface ApplicationFormData {
  application_process?: string;
  fees_description?: string;
  cost_options?: CostOption[];
  eligibility_description?: string;
  minimum_age?: number;
  maximum_age?: number;
  required_documents?: RequiredDocument[];
}

interface ScheduleFormData {
  schedules?: Schedule[];
}

interface LocationFormData {
  service_areas?: ServiceArea[];
  service_at_locations?: ServiceAtLocation[];
}

interface ContactFormData {
  contacts?: Contact[];
  phones?: Phone[];
}

type StepDataArray = [
  BasicInfoFormData?,
  AdditionalInfoFormData?,
  StatusFormData?,
  LanguageFormData?,
  ApplicationFormData?,
  ScheduleFormData?,
  LocationFormData?,
  ContactFormData?,
];

export default StepDataArray;
