import Attribute from './Attribute';
import Metadata from './Metadata';

interface Schedule {
  id: string;
  validFrom: string;
  validTo: string;
  timezone: number;
  unit: string;
  count: number;
  wkSt: string;
  freq: string;
  interval: number;
  byDay: string;
  byWeekNo: string;
  byMonthDay: string;
  byYearDay: string;
  description: string;
  opensAt: string;
  closesAt: string;
  scheduleLink: string;
  attendingType: string;
  notes: string;
  attributes: Attribute[];
  metadata: Metadata[];
}

export default Schedule;
