interface Metadata {
  id?: string;
  resource_id?: string;
  resource_type?: string;
  last_action_date?: Date;
  last_action_type?: string;
  field_name?: string;
  previous_value?: string;
  replacement_value?: string;
  updated_by?: string;
}

export default Metadata;
