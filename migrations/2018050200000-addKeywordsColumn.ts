export async function up(sequelize) {
	// language=PostgreSQL
	await sequelize.query(`
        ALTER TABLE entries ADD COLUMN keywords TEXT;
    `);

	console.log('*keywords column added to entries table*');
}

export async function down(sequelize) {
	// language=PostgreSQL
	await sequelize.query(`
        ALTER TABLE entries DROP COLUMN keywords;
    `);
}
