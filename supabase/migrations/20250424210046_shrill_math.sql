/*
  # Create phishing analysis tables

  1. New Tables
    - `domains`
      - `id` (uuid, primary key)
      - `domain` (text, unique)
      - `is_genuine` (boolean)
      - `created_at` (timestamp)
    - `analysis_results`
      - `id` (uuid, primary key)
      - `genuine_domain_id` (uuid, foreign key)
      - `suspicious_domain_id` (uuid, foreign key)
      - `visual_similarity` (float)
      - `content_similarity` (float)
      - `risk_score` (float)
      - `created_at` (timestamp)
      - `detection_time` (float)
      - `confidence_score` (float)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS domains (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  domain text UNIQUE NOT NULL,
  is_genuine boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS analysis_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  genuine_domain_id uuid REFERENCES domains(id) NOT NULL,
  suspicious_domain_id uuid REFERENCES domains(id) NOT NULL,
  visual_similarity float NOT NULL,
  content_similarity float NOT NULL,
  risk_score float NOT NULL,
  created_at timestamptz DEFAULT now(),
  detection_time float NOT NULL,
  confidence_score float NOT NULL,
  UNIQUE(genuine_domain_id, suspicious_domain_id)
);

ALTER TABLE domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read access to all users"
  ON domains
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow insert for authenticated users"
  ON domains
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow read access to analysis results"
  ON analysis_results
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow insert analysis results"
  ON analysis_results
  FOR INSERT
  TO authenticated
  WITH CHECK (true);