-- V2__add_blog_image_url.sql
ALTER TABLE blog
    ADD COLUMN image_url VARCHAR(255);
