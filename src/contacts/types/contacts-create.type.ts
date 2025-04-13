export interface ContactCreateResponse {
    id: string;
    properties: {
      createdate: string;
      email: string;
      firstname: string;
      hs_all_contact_vids: string;
      hs_associated_target_accounts: string;
      hs_currently_enrolled_in_prospecting_agent: string;
      hs_email_domain: string;
      hs_full_name_or_email: string;
      hs_is_contact: string;
      hs_is_unworked: string;
      hs_lifecyclestage_lead_date: string;
      hs_membership_has_accessed_private_content: string;
      hs_object_id: string;
      hs_object_source: string;
      hs_object_source_id: string;
      hs_object_source_label: string;
      hs_pipeline: string;
      hs_prospecting_agent_actively_enrolled_count: string;
      hs_registered_member: string;
      hs_searchable_calculated_phone_number: string;
      hs_sequences_actively_enrolled_count: string;
      lastmodifieddate: string;
      lastname: string;
      lifecyclestage: string;
      num_notes: string;
      phone: string;
    };
    createdAt: string;
    updatedAt: string;
    archived: boolean;
}
  