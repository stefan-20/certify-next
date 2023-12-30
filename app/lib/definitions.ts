// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  is_active: boolean;
  created_on: string;
};

export type Upload = {
  id: string;
  url: string;
}

export type Accreditation = {
  id: string;
  name: string;
  summary: string;
  upload_id: string;
  type: 'certificate' | 'testimonial' | 'review';
  valid_on: string;
  valid_until: string;
  is_active: boolean;

  created_by_id: string;
  owned_by_id: string;
  created_on: string;
  modified_on: string;
}

export type Transaction = {
  id: string;
  from_id: string;
  to_id: string;
  accreditation: string;
  accreditation_id: string;
  status: 'pending' | 'confirmed' | 'rejected';

  created_on: string;
}
export type Request = {
  id: string;
  ref_id: string;
  to_id: string;
  accred_id: string;
  type: 'change' | 'approval' | 'accreditation';
  status: 'pending' | 'closed';

  created_by_id: string;
  created_on: string;
}

export type Notification = {
  id: string;
  target_id: string;
  ref_id: string;
  name: string;
  content: string;
  created_on: string;
}

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};


export type AccreditationForm = {
  id: string;
  name: string;
  description:string;
  valid_on: Date | null;
  valid_until: Date | null;
  is_active: boolean | null;
  type: 'certificate' | 'attest' | 'testimonial' | 'reference' ;
  last_transaction_status: null |'pending' | 'completed'
  created_on: Date|null;
  modified_on: Date|null;
  creator_id: string;
  owner_id: string;
};
