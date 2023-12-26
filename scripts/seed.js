const { db } = require('@vercel/postgres');
const {
  Accreditations,
  customers,
  revenue,
  users,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS certify_users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        is_active BOOLEAN DEFAULT True,
        created_on TIMESTAMP DEFAULT (now() at time zone 'utc')
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO certify_users (name, email, password)
        VALUES (${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

// async function seedUploads(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS certify_uploads (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         url VARCHAR(255) NOT NULL,
//       );
//     `;

//     console.log(`Created "users" table`);

//     return {
//       createTable,
//     };
//   } catch (error) {
//     console.error('Error seeding users:', error);
//     throw error;
//   }
// }

// async function seedTransactions(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//     // Create the "users" table if it doesn't exist

//     // Check: created_on

//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS certify_transactions (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

//         url VARCHAR(255) NOT NULL,
//       );
//     `;

//     console.log(`Created "users" table`);

//     // Insert data into the "users" table
//     const insertedUsers = await Promise.all(
//       users.map(async (user) => {
//         const hashedPassword = await bcrypt.hash(user.password, 10);
//         return client.sql`
//         INSERT INTO certify_users (id, name, email, password)
//         VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//       }),
//     );

//     console.log(`Seeded ${insertedUsers.length} users`);

//     return {
//       createTable,
//       users: insertedUsers,
//     };
//   } catch (error) {
//     console.error('Error seeding users:', error);
//     throw error;
//   }
// }
// async function seedNotifications(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//     // Create the "users" table if it doesn't exist

//     // Check: created_on

//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS certify_uploads (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         url VARCHAR(255) NOT NULL,
//       );
//     `;

//     console.log(`Created "users" table`);

//     // Insert data into the "users" table
//     const insertedUsers = await Promise.all(
//       users.map(async (user) => {
//         const hashedPassword = await bcrypt.hash(user.password, 10);
//         return client.sql`
//         INSERT INTO certify_users (id, name, email, password)
//         VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//       }),
//     );

//     console.log(`Seeded ${insertedUsers.length} users`);

//     return {
//       createTable,
//       users: insertedUsers,
//     };
//   } catch (error) {
//     console.error('Error seeding users:', error);
//     throw error;
//   }
// }

// async function seedAccreditations(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     // Create the "Accreditations" table if it doesn't exist
//     const createTable = await client.sql`
//         CREATE TABLE IF NOT EXISTS certify_accreditations (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         name TEXT NOT NULL,
//         summary TEXT,
//         upload_id UUID,
//         type VARCHAR(255) NOT NULL,
//         valid_on TIMESTAMP DEFAULT (now() at time zone 'utc'),
//         valid_until TIMESTAMP,

//         is_active BOOLEAN DEFAULT True,
//         created_by_id UUID NOT NULL REFERENCES certify_users(id),
//         owned_by_id UUID NOT NULL REFERENCES certify_users(id),
//         created_on TIMESTAMP DEFAULT (now() at time zone 'utc')
//         modified_on TIMESTAMP DEFAULT (now() at time zone 'utc')

//       );
//     `;

//     console.log(`Created "Accreditations" table`);

//     return {
//       createTable,
//     };
//   } catch (error) {
//     console.error('Error seeding Accreditations:', error);
//     throw error;
//   }
// }

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  // await seedCustomers(client);
  // await seedAccreditations(client);
  // await seedRevenue(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
