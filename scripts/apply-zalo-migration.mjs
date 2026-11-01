import fs from 'fs';

const tunnelBase = "https://fundamentals-beans-fell-organizing.trycloudflare.com";
const apiToken = "c4e2e7976a2a78b578d52d39d7eab1705bd013af1731d11c";

const statements = [
  // Create tables - use UNIQUEIDENTIFIER for id columns
  `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='zalo_groups' AND xtype='U')
BEGIN
    CREATE TABLE zalo_groups (
        id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        zalo_group_id NVARCHAR(255) NOT NULL,
        zalo_name NVARCHAR(500) NOT NULL,
        member_count INT DEFAULT 0,
        is_sync_enabled BIT NOT NULL DEFAULT 0,
        purpose_label NVARCHAR(255) DEFAULT '',
        ai_suggested_label NVARCHAR(255) DEFAULT '',
        last_sync_at DATETIMEOFFSET NULL,
        raw_json NVARCHAR(MAX) NOT NULL DEFAULT '{}',
        updated_at DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET()
    );
    
    CREATE UNIQUE INDEX UX_zalo_groups_zalo_group_id ON zalo_groups (zalo_group_id);
    CREATE INDEX IX_zalo_groups_sync ON zalo_groups (is_sync_enabled) WHERE is_sync_enabled = 1;
    CREATE INDEX IX_zalo_groups_label ON zalo_groups (purpose_label);
END`,

  `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='zalo_messages' AND xtype='U')
BEGIN
    CREATE TABLE zalo_messages (
        id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        zalo_group_id NVARCHAR(255) NOT NULL,
        zalo_message_id NVARCHAR(255) NOT NULL,
        sender_name NVARCHAR(255) NOT NULL DEFAULT '',
        sender_zalo_id NVARCHAR(255) DEFAULT '',
        text NVARCHAR(MAX) NOT NULL DEFAULT '',
        at DATETIMEOFFSET NOT NULL,
        attachments NVARCHAR(MAX) NOT NULL DEFAULT '[]',
        raw_json NVARCHAR(MAX) NOT NULL DEFAULT '{}',
        updated_at DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        CONSTRAINT UX_zalo_messages_group_msg UNIQUE (zalo_group_id, zalo_message_id)
    );
    
    CREATE INDEX IX_zalo_messages_group_at ON zalo_messages (zalo_group_id, at DESC);
    CREATE INDEX IX_zalo_messages_at ON zalo_messages (at DESC);
    
    ALTER TABLE zalo_messages ADD CONSTRAINT FK_zalo_messages_group 
        FOREIGN KEY (zalo_group_id) REFERENCES zalo_groups(zalo_group_id) ON DELETE CASCADE;
END`,

  `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='zalo_files' AND xtype='U')
BEGIN
    CREATE TABLE zalo_files (
        id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        zalo_message_id UNIQUEIDENTIFIER NOT NULL,
        file_name NVARCHAR(500) NOT NULL DEFAULT '',
        file_url NVARCHAR(MAX) DEFAULT '',
        file_type NVARCHAR(255) DEFAULT '',
        file_size INT DEFAULT 0,
        raw_json NVARCHAR(MAX) NOT NULL DEFAULT '{}',
        created_at DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET()
    );
    
    CREATE INDEX IX_zalo_files_message ON zalo_files (zalo_message_id);
    
    ALTER TABLE zalo_files ADD CONSTRAINT FK_zalo_files_message 
        FOREIGN KEY (zalo_message_id) REFERENCES zalo_messages(id) ON DELETE CASCADE;
END`,

  `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='zalo_price_signals' AND xtype='U')
BEGIN
    CREATE TABLE zalo_price_signals (
        id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        zalo_group_id NVARCHAR(255) NOT NULL,
        zalo_message_id NVARCHAR(255) NOT NULL,
        sender_name NVARCHAR(255) NOT NULL DEFAULT '',
        text NVARCHAR(MAX) NOT NULL,
        at DATETIMEOFFSET NOT NULL,
        matched_keywords NVARCHAR(MAX) NOT NULL DEFAULT '[]',
        created_at DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        CONSTRAINT UX_zalo_price_signals_group_msg UNIQUE (zalo_group_id, zalo_message_id)
    );
    
    CREATE INDEX IX_zalo_price_signals_group_at ON zalo_price_signals (zalo_group_id, at DESC);
END`
];

async function run() {
  for (const stmt of statements) {
    if (!stmt) continue;
    console.log(`Running statement...`);
    try {
      const res = await fetch(`${tunnelBase}/exec`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-token': apiToken,
        },
        body: JSON.stringify({ text: stmt, params: [] }),
        signal: AbortSignal.timeout(30_000),
      });
      const json = await res.json();
      console.log('Result:', JSON.stringify(json, null, 2));
    } catch (e) {
      console.error('Error:', e);
    }
  }
  console.log('Done');
}

run();
