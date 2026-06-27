-- Donors table
CREATE TABLE donors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  blood_group TEXT NOT NULL CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  age INTEGER NOT NULL CHECK (age >= 18 AND age <= 65),
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  last_donation_date DATE,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blood requests table
CREATE TABLE blood_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name TEXT NOT NULL,
  requester_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  blood_group TEXT NOT NULL CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  units_required INTEGER NOT NULL CHECK (units_required > 0),
  hospital_name TEXT NOT NULL,
  hospital_address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  required_date DATE NOT NULL,
  urgency TEXT NOT NULL CHECK (urgency IN ('critical', 'urgent', 'normal')),
  additional_notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'fulfilled', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Donors policies (public can insert, admin can do all - simplified for demo)
CREATE POLICY "donors_select" ON donors FOR SELECT TO authenticated USING (true);
CREATE POLICY "donors_insert" ON donors FOR INSERT WITH CHECK (true);
CREATE POLICY "donors_update" ON donors FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "donors_delete" ON donors FOR DELETE USING (true);

-- Blood requests policies
CREATE POLICY "requests_select" ON blood_requests FOR SELECT TO authenticated USING (true);
CREATE POLICY "requests_insert" ON blood_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "requests_update" ON blood_requests FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "requests_delete" ON blood_requests FOR DELETE USING (true);

-- Contact messages policies
CREATE POLICY "messages_select" ON contact_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "messages_insert" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "messages_update" ON contact_messages FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "messages_delete" ON contact_messages FOR DELETE USING (true);

-- Create indexes for better query performance
CREATE INDEX idx_donors_blood_group ON donors(blood_group);
CREATE INDEX idx_donors_city ON donors(city);
CREATE INDEX idx_donors_availability ON donors(is_available);
CREATE INDEX idx_requests_blood_group ON blood_requests(blood_group);
CREATE INDEX idx_requests_status ON blood_requests(status);