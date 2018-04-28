export async function up(sequelize) {
    // language=PostgreSQL
    sequelize.query(`
        ALTER TABLE users ALTER COLUMN id TYPE INTEGER; 
        ALTER TABLE entries ALTER COLUMN id TYPE INTEGER; 
        ALTER TABLE comments ALTER COLUMN id TYPE INTEGER; 
    `);

    console.log('*table column id type updated*');
}

export async function down(sequelize) {
    // language=PostgreSQL
    sequelize.query(``);
}
