import Attribute from './Attribute';
import Metadata from './Metadata';

interface Schedule {
  id: string;
  service_id: string | null;
  location_id: string | null;
  service_at_location_id: string | null;
  valid_from: string | null;
  valid_to: string | null;
  dtstart: string | null;
  timezone: number | null;
  until: string | null;
  count: number | null;
  wkst: string | null;
  freq: string | null;
  interval: number | null;
  byday: string | null;
  byweekno: string | null;
  bymonthday: string | null;
  byyearday: string | null;
  description: string | null;
  opens_at: string | null;
  closes_at: string | null;
  schedule_link: string | null;
  attending_type: string | null;
  notes: string | null;
  attributes: Attribute[] | null;
  metadata: Metadata[] | null;
}

export default Schedule;
