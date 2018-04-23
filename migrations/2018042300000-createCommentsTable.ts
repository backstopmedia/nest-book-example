export async function up(sequelize) {
    // language=PostgreSQL
    sequelize.query(`
        CREATE TABLE "comments" (
            "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
            "body" TEXT NOT NULL,
            "userId" INTEGER NOT NULL
              CONSTRAINT "entries_userId_fkey"
              REFERENCES users
              ON UPDATE CASCADE ON DELETE CASCADE,
            "entryId" INTEGER NOT NULL
              CONSTRAINT "comments_entryId_fkey"
              REFERENCES entries
              ON UPDATE CASCADE ON DELETE CASCADE,
            "createdAt" TIMESTAMP NOT NULL,
            "updatedAt" TIMESTAMP NOT NULL,
            "deletedAt" TIMESTAMP
        );
    `);

    console.log('*Table comment created!*');
}

export async function down(sequelize) {
    // language=PostgreSQL
    sequelize.query(`DROP TABLE comments`);
}
