export async function up(sequelize) {
    // language=PostgreSQL
    sequelize.query(`
        CREATE TABLE "entries" (
            "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
            "title" TEXT NOT NULL,
            "content" TEXT NOT NULL,
            "userId" INTEGER NOT NULL
              CONSTRAINT "entries_userId_fkey"
              REFERENCES users
              ON UPDATE CASCADE ON DELETE CASCADE,
            "createdAt" TIMESTAMP NOT NULL,
            "updatedAt" TIMESTAMP NOT NULL,
            "deletedAt" TIMESTAMP
        );
    `);

    console.log('*Table entries created!*');
}

export async function down(sequelize) {
    // language=PostgreSQL
    sequelize.query(`DROP TABLE entries`);
}
