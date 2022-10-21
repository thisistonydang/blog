export interface Contact {
  contact_id: string;
  created_at: string;
  modified_at: string;
  name: string;
  preferred_name: string;
  email: string;
  is_verified: boolean;
  is_subscriber: boolean;
  is_banned: boolean;
  mailing_list_id: number;
}
