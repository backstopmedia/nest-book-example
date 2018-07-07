export async function up(sequelize) {
    // language=PostgreSQL
    await sequelize.query(`
        CREATE TABLE "keywords" (
            "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
            "keyword" VARCHAR(30) UNIQUE NOT NULL,
            "createdAt" TIMESTAMP NOT NULL,
            "updatedAt" TIMESTAMP NOT NULL,
            "deletedAt" TIMESTAMP
        );
        CREATE TABLE "keywords_entries" (
            "keywordId" INTEGER NOT NULL
                CONSTRAINT "keywords_entries_keywordId_fkey"
                REFERENCES keywords
                ON UPDATE CASCADE ON DELETE CASCADE,
            "entryId" INTEGER NOT NULL
                CONSTRAINT "keywords_entries_entryId_fkey"
                REFERENCES entries
                ON UPDATE CASCADE ON DELETE CASCADE,
            "createdAt" TIMESTAMP NOT NULL,
            UNIQUE("keywordId", "entryId")
        );
  `);

    console.log('*Table keywords created!*');
}

export async function down(sequelize) {
    // language=PostgreSQL
    await sequelize.query(`DROP TABLE keywords_entries`);
    await sequelize.query(`DROP TABLE keywords`);
}
