/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `courses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `documents` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `forums` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `lessons` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `topics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "courses_title_key" ON "courses"("title");

-- CreateIndex
CREATE UNIQUE INDEX "documents_title_key" ON "documents"("title");

-- CreateIndex
CREATE UNIQUE INDEX "forums_title_key" ON "forums"("title");

-- CreateIndex
CREATE UNIQUE INDEX "lessons_title_key" ON "lessons"("title");

-- CreateIndex
CREATE UNIQUE INDEX "topics_title_key" ON "topics"("title");
