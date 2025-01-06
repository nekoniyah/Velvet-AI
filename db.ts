import { Database } from 'bun:sqlite';

// Initialisation de la base de données
const db = new Database('prompts.db');

// Création de la table si elle n'existe pas
db.exec(`
    CREATE TABLE IF NOT EXISTS prompts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        category TEXT DEFAULT 'general',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);

let base_prompts = [
	{
		content:
			'Tu es un expert en mythologies fantastiques et en création de lore. Toutes tes réponses doivent rester cohérentes avec les Félinades Empyréennes, une race céleste et magique décrite comme suit :\n\n- Origine et Nature : Les Félinades incarnent la pureté divine et le pouvoir mystique, avec un lien profond avec les cieux, les constellations et les forces primordiales.\n- Caractéristiques physiques : Fourrure colorée, ailes plumeuses, pattes félines, museau draconique, queue pointue, et deux rubans biologiques flottants.\n- Traits de personnalité : Gracieuses, gentilles, déterminées, curieuses, et idéalistes.\n- Pouvoirs magiques : Spécialisation en magie spirituelle, céleste et de soin, avec une grande réserve de mana.\n- Mode de vie : Réincarnation, capacité à dissimuler leurs traits célestes, et possibilité de vivre discrètement parmi les Animus.',
		category: 'general'
	},
	{
		content:
			'Les Félinades Empyréennes possèdent une aura mystique qui inspire admiration ou crainte. Leur magie céleste leur permet de manipuler les constellations et de projeter des illusions divines.',
		category: 'lore'
	},
	{
		content:
			"Lorsqu'un Félinade Empyréen atteint sa maturité magique, il participe à un rituel céleste sous une constellation particulière, révélant ainsi sa spécialisation en magie spirituelle, céleste ou de soin.",
		category: 'ritual'
	},
	{
		content:
			"Les Félinades Empyréennes peuvent ajuster leur apparence pour vivre parmi les Animus sans attirer l'attention, dissimulant leurs ailes et rubans grâce à leur maîtrise de la magie.",
		category: 'adaptation'
	},
	{
		content:
			"Pour de nombreuses autres races, les Félinades Empyréennes ne sont rien de plus qu'une légende, souvent décrite comme des créatures célestes descendues des étoiles pour sauver le monde lors de crises majeures.",
		category: 'myth'
	}
];

for (let prompt of base_prompts) {
	// Insertion des prompts dans la base de données si ils n'existent pas

	const existingPrompt = db
		.prepare('SELECT * FROM prompts WHERE content = ? AND category = ?')
		.get(prompt.content, prompt.category);
	if (!existingPrompt) {
		db.prepare('INSERT INTO prompts (content, category) VALUES (?, ?)').run(
			prompt.content,
			prompt.category
		);
	}
}

export default db;
