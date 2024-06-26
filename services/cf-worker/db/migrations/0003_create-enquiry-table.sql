CREATE TABLE enquiry (
    `id` TEXT PRIMARY KEY,
    `email` TEXT NOT NULL,
    `message` TEXT,
    `selected_services` TEXT NOT NULL,
    `json_text` TEXT NOT NULL,
    `created_at` integer NOT NULL,
    `updated_at` integer NOT NULL
);
CREATE INDEX idx_email ON enquiry (`email`);