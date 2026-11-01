-- 0031: Zalo sync – quản trị nhóm Zalo, lưu tin nhắn/file từ Zalo Web CDP
-- PA-1, GĐ mới: module /zalo mở rộng, Hybrid DB + AI gợi ý nhãn
-- Bảng nhóm, tin nhắn, file, tín hiệu giá

create table if not exists zalo_groups (
  id text primary key,
  zalo_group_id text not null unique,
  zalo_name text not null,
  member_count int default 0,
  is_sync_enabled boolean not null default false,
  purpose_label text default '',
  ai_suggested_label text default '',
  last_sync_at timestamptz,
  raw_json jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists zalo_groups_sync_idx on zalo_groups (is_sync_enabled) where is_sync_enabled;
create index if not exists zalo_groups_label_idx on zalo_groups (purpose_label);

create table if not exists zalo_messages (
  id text primary key default gen_random_uuid()::text,
  zalo_group_id text not null references zalo_groups(zalo_group_id) on delete cascade,
  zalo_message_id text not null,
  sender_name text not null default '',
  sender_zalo_id text default '',
  text text not null default '',
  at timestamptz not null,
  attachments jsonb not null default '[]'::jsonb,
  raw_json jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique (zalo_group_id, zalo_message_id)
);

create index if not exists zalo_messages_group_at_idx on zalo_messages (zalo_group_id, at desc);
create index if not exists zalo_messages_at_idx on zalo_messages (at desc);

create table if not exists zalo_files (
  id text primary key default gen_random_uuid()::text,
  zalo_message_id text not null references zalo_messages(id) on delete cascade,
  file_name text not null default '',
  file_url text default '',
  file_type text default '',
  file_size int default 0,
  raw_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists zalo_files_message_idx on zalo_files (zalo_message_id);

create table if not exists zalo_price_signals (
  id text primary key default gen_random_uuid()::text,
  zalo_group_id text not null,
  zalo_message_id text not null,
  sender_name text not null default '',
  text text not null,
  at timestamptz not null,
  matched_keywords text[] not null default '{}',
  created_at timestamptz not null default now(),
  unique (zalo_group_id, zalo_message_id)
);

create index if not exists zalo_price_signals_group_at_idx on zalo_price_signals (zalo_group_id, at desc);
