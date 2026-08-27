/*
# Create 财搭子 (Cai Da Zi) Database Schema

## Overview
This migration creates the complete database schema for the 财搭子 AI financial companion app.
It is a single-tenant demo app (no sign-in), so all tables use anon+authenticated policies.

## New Tables

1. **profiles** - User onboarding profile
   - id (uuid, PK)
   - monthly_savings (int) - monthly investable amount
   - investment_horizon (text) - how long before they need the money
   - risk_tolerance (text) - risk comfort level
   - risk_type (text) - computed: conservative/moderate/aggressive
   - companion_density (text) - high/medium/low push frequency
   - created_at (timestamptz)

2. **chat_messages** - Conversation history with 财小搭
   - id (uuid, PK)
   - role (text) - 'user' or 'assistant'
   - content (text) - message text
   - context_type (text) - 'onboarding'/'daily'/'crisis'/'qa'/'learning'
   - created_at (timestamptz)

3. **daily_briefings** - Today's 3 things + review
   - id (uuid, PK)
   - briefing_date (date)
   - type (text) - 'pre_market'/'post_market'/'weekly'
   - title (text)
   - content (text)
   - is_read (boolean, default false)
   - created_at (timestamptz)

4. **learning_lessons** - 每日一学 content
   - id (uuid, PK)
   - title (text)
   - concept (text) - the financial concept
   - analogy (text) - life analogy
   - content (text) - full lesson text
   - difficulty (text) - 'beginner'/'intermediate'/'advanced'
   - created_at (timestamptz)

5. **learning_progress** - User's learning progress
   - id (uuid, PK)
   - lesson_id (uuid, FK -> learning_lessons)
   - is_completed (boolean, default false)
   - completed_at (timestamptz)
   - created_at (timestamptz)

6. **diary_entries** - Investment diary
   - id (uuid, PK)
   - action_type (text) - 'buy'/'sell'/'hold'/'observe'
   - product_name (text)
   - amount (numeric)
   - reason (text) - user's reason for the action
   - market_context (text) - market environment at the time
   - emotion (text) - user's emotional state
   - created_at (timestamptz)

7. **milestones** - Growth milestones
   - id (uuid, PK)
   - title (text)
   - description (text)
   - icon (text) - emoji or icon name
   - is_achieved (boolean, default false)
   - achieved_at (timestamptz)
   - created_at (timestamptz)

## Security
- All tables have RLS enabled.
- All policies use TO anon, authenticated since this is a single-tenant demo app with no sign-in.
- USING (true) / WITH CHECK (true) is acceptable because all data is intentionally shared (single-tenant).
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  monthly_savings int,
  investment_horizon text,
  risk_tolerance text,
  risk_type text DEFAULT 'moderate',
  companion_density text DEFAULT 'medium',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_profiles" ON profiles;
CREATE POLICY "anon_select_profiles" ON profiles FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_profiles" ON profiles;
CREATE POLICY "anon_insert_profiles" ON profiles FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_profiles" ON profiles;
CREATE POLICY "anon_update_profiles" ON profiles FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_profiles" ON profiles;
CREATE POLICY "anon_delete_profiles" ON profiles FOR DELETE TO anon, authenticated USING (true);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL,
  content text NOT NULL,
  context_type text DEFAULT 'daily',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_chat" ON chat_messages;
CREATE POLICY "anon_select_chat" ON chat_messages FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_chat" ON chat_messages;
CREATE POLICY "anon_insert_chat" ON chat_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_chat" ON chat_messages;
CREATE POLICY "anon_update_chat" ON chat_messages FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_chat" ON chat_messages;
CREATE POLICY "anon_delete_chat" ON chat_messages FOR DELETE TO anon, authenticated USING (true);

-- Daily briefings table
CREATE TABLE IF NOT EXISTS daily_briefings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  briefing_date date NOT NULL,
  type text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE daily_briefings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_briefings" ON daily_briefings;
CREATE POLICY "anon_select_briefings" ON daily_briefings FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_briefings" ON daily_briefings;
CREATE POLICY "anon_insert_briefings" ON daily_briefings FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_briefings" ON daily_briefings;
CREATE POLICY "anon_update_briefings" ON daily_briefings FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_briefings" ON daily_briefings;
CREATE POLICY "anon_delete_briefings" ON daily_briefings FOR DELETE TO anon, authenticated USING (true);

-- Learning lessons table
CREATE TABLE IF NOT EXISTS learning_lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  concept text NOT NULL,
  analogy text,
  content text NOT NULL,
  difficulty text DEFAULT 'beginner',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE learning_lessons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_lessons" ON learning_lessons;
CREATE POLICY "anon_select_lessons" ON learning_lessons FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_lessons" ON learning_lessons;
CREATE POLICY "anon_insert_lessons" ON learning_lessons FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_lessons" ON learning_lessons;
CREATE POLICY "anon_update_lessons" ON learning_lessons FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_lessons" ON learning_lessons;
CREATE POLICY "anon_delete_lessons" ON learning_lessons FOR DELETE TO anon, authenticated USING (true);

-- Learning progress table
CREATE TABLE IF NOT EXISTS learning_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES learning_lessons(id) ON DELETE CASCADE,
  is_completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_progress" ON learning_progress;
CREATE POLICY "anon_select_progress" ON learning_progress FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_progress" ON learning_progress;
CREATE POLICY "anon_insert_progress" ON learning_progress FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_progress" ON learning_progress;
CREATE POLICY "anon_update_progress" ON learning_progress FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_progress" ON learning_progress;
CREATE POLICY "anon_delete_progress" ON learning_progress FOR DELETE TO anon, authenticated USING (true);

-- Diary entries table
CREATE TABLE IF NOT EXISTS diary_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action_type text NOT NULL,
  product_name text,
  amount numeric,
  reason text,
  market_context text,
  emotion text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE diary_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_diary" ON diary_entries;
CREATE POLICY "anon_select_diary" ON diary_entries FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_diary" ON diary_entries;
CREATE POLICY "anon_insert_diary" ON diary_entries FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_diary" ON diary_entries;
CREATE POLICY "anon_update_diary" ON diary_entries FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_diary" ON diary_entries;
CREATE POLICY "anon_delete_diary" ON diary_entries FOR DELETE TO anon, authenticated USING (true);

-- Milestones table
CREATE TABLE IF NOT EXISTS milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  icon text DEFAULT '🎯',
  is_achieved boolean DEFAULT false,
  achieved_at timestamptz,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_milestones" ON milestones;
CREATE POLICY "anon_select_milestones" ON milestones FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_milestones" ON milestones;
CREATE POLICY "anon_insert_milestones" ON milestones FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_milestones" ON milestones;
CREATE POLICY "anon_update_milestones" ON milestones FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_milestones" ON milestones;
CREATE POLICY "anon_delete_milestones" ON milestones FOR DELETE TO anon, authenticated USING (true);
