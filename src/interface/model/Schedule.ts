import Attribute from './Attribute';
import Metadata from './Metadata';

interface Schedule {
  id?: string;
  service_id?: string;
  location_id?: string;
  service_at_location_id?: string;
  valid_from?: string;
  valid_to?: string;
  dtstart?: string;
  timezone?: number;
  until?: string;
  count?: number;
  wkst?: string;
  freq?: string;
  interval?: number;
  byday?: string;
  byweekno?: string;
  bymonthday?: string;
  byyearday?: string;
  description?: string;
  opens_at?: string;
  closes_at?: string;
  schedule_link?: string;
  attending_type?: string;
  notes?: string;
  attributes?: Attribute[];
  metadata?: Metadata[];
}

export default Schedule;
