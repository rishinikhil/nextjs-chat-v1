// lib/crm.ts

import axios from 'axios';

const FRAPPE_CRM_BASE_URL = process.env.NEXT_PUBLIC_FRAPPE_CRM_URL || '';
const CRM_API_KEY = process.env.NEXT_PUBLIC_CRM_API_KEY || '';

// Function to save a lead to Frappe CRM
export async function saveLeadToCRM({
  name,
  email,
  phone,
  inquiry,
}: {
  name: string;
  email: string;
  phone?: string;
  inquiry: string;
}): Promise<boolean> {
  try {
    // Construct the CRM API endpoint
    const url = `${FRAPPE_CRM_BASE_URL}/api/resource/Lead`;

    // Define the payload for the lead
    const payload = {
      lead_name: name,
      email_id: email,
      phone,
      inquiry_details: inquiry,
      status: 'Open',
    };

    // Send POST request to Frappe CRM
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${CRM_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return response.status === 200 || response.status === 201;
  } catch (error) {
    console.error('Error saving lead to CRM:', error);
    return false;
  }
}

// You can add more CRM-related functions here as needed for other operations (e.g., updating leads, fetching data).
