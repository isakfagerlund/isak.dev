ALTER TABLE `isak.dev_burger` RENAME TO `isak.dev_burger_old`;--> statement-breakpoint

CREATE TABLE `isak.dev_burger` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`resturant_name` text(256),
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` integer,
	`rating` integer,
	`description` text,
	`city` text,
	`country` text(256),
	`tested_food` text,
	`images` text,
	`address` text DEFAULT 'empty address',
  `isPublished` integer DEFAULT 1
);--> statement-breakpoint

INSERT INTO `isak.dev_burger` (id,
	resturant_name,
	created_at,
	updatedAt,
	rating,
	description,
	city,
	country,
	tested_food,
	images,
  address)
SELECT * FROM `isak.dev_burger_old`;--> statement-breakpoint

DROP TABLE `isak.dev_burger_old`;--> statement-breakpoint