import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db: any;

  async init() {
    this.db = await this.sqlite.createConnection('favorites', false, 'no-encryption', 1, false);
    await this.db.open();
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY,
        name TEXT,
        portrait_path TEXT,
        status TEXT,
        gender TEXT,
        occupation TEXT
      )
    `);
  }

  async addFavorite(character: any) {
    await this.db.run(
      `INSERT OR IGNORE INTO favorites VALUES (?,?,?,?,?,?)`,
      [character.id, character.name, character.portrait_path,
      character.status, character.gender, character.occupation]
    );
  }

  async removeFavorite(id: number) {
    await this.db.run(`DELETE FROM favorites WHERE id = ?`, [id]);
  }

  async getFavorites(): Promise<any[]> {
    const result = await this.db.query(`SELECT * FROM favorites`);
    return result.values ?? [];
  }

  async isFavorite(id: number): Promise<boolean> {
    const result = await this.db.query(`SELECT id FROM favorites WHERE id = ?`, [id]);
    return result.values?.length > 0;
  }
}
