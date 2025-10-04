export interface SelectOption {
  value: string;                 // The text content from SVG element
  label: string;                 // Same as value or formatted
  svgElementId: string;          // Full SVG element ID
}

export interface FormField {
  id: string;                    // Base field ID (e.g., "Product_Name", "Gender")
  name: string;                  // Display name (e.g., "Product Name", "Gender")
  type: string;                  // Field type extracted from extension
  svgElementId?: string;   
  defaultValue?: string | number | boolean;
  currentValue?: string | number | boolean;
  max?: number;                  // Max value for number OR max length for text
  options?: SelectOption[];      // If options exist, it's automatically a select field
  dependsOn?: string;
  isTrackingId?: boolean;        // Whether this field is marked with .tracking_id
  link?: string;                 // URL for tracking or other external links
  trackingRole?: string;         // Role in tracking display (e.g., "name", "email", "weight")
}

export type PurchasedTemplate = {
  id: string; // UUID
  buyer: number; 
  template: string; 

  svg: string;
  form_fields: FormField[]; // adjust type if fields are structured
  test: boolean;
  error_message: string;

  tracking_id: string | null;
  status: string;

  created_at: string; // ISO datetime string
  updated_at: string;
};
