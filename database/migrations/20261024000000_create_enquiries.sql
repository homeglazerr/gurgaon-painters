CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(120) NOT NULL,
  phone varchar(30) NOT NULL,
  service varchar(80) NOT NULL,
  message text NOT NULL DEFAULT '',
  status varchar(20) NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'contacted', 'follow_up', 'completed')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS enquiries_created_at_idx
  ON enquiries (created_at DESC);

CREATE INDEX IF NOT EXISTS enquiries_status_created_at_idx
  ON enquiries (status, created_at DESC);
