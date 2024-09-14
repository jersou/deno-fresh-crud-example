import { Database } from "@db/sqlite";

// or export const db = new Database(":memory:");
export const db = new Database("database.sqlite");

export type DataType = {
  id: string;
  dataProp1: string;
};

function init() {
  return db.exec(`
    create table if not exists t_data (
      id   TEXT PRIMARY KEY NOT NULL,
      dataProp1 TEXT
    );`);
}

export function insert(row: DataType) {
  return db.exec(
    `insert into t_data ( id, dataProp1 ) values ( ?, ? );`,
    row.id,
    row.dataProp1,
  );
}

export function getDatas(size: number, page: number): DataType[] {
  return db.sql`select * from t_data order by id DESC limit ${size} offset ${
    size * (page - 1)
  }`;
}

export function getData(id: string): DataType | undefined {
  return db.sql`select * from t_data where id = ${id}`[0] as
    | DataType
    | undefined;
}

export function updateData(id: string, newData: string) {
  return db.sql`update t_data set dataProp1 = ${newData} where id = ${id}`;
}

export function deleteData(id: string) {
  return db.sql`delete from t_data where id = ${id}`;
}

export function truncate() {
  return db.exec("delete from t_data");
}

init();
