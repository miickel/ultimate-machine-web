const {Client} = require('pg')

const client = new Client({
  connectionString: process.env.PG_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

async function listSubscribe({email, name, listId}) {
  try {
    await client.query('BEGIN')

    const subscriber = (
      await client.query(
        `
      INSERT INTO subscribers("email", "name")
      VALUES($1, $2)
      RETURNING *
    `,
        [email, name]
      )
    ).rows[0]

    await client.query(
      `
      INSERT INTO subscriptions("listId", "subscriberId")
      VALUES($1, $2)
    `,
      [listId, subscriber.id]
    )

    await client.query('COMMIT')

    return subscriber
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  }
}

async function listConfirmSubscription(subscriberId, listId) {
  const {rowCount} = await client.query(`
    UPDATE subscriptions
    SET
      "status" = 'confirmed',
      "updatedAt" = NOW()
    WHERE
      "listId" = ${listId}
      AND "subscriberId" = ${subscriberId}
  `)
  return rowCount === 1
}

async function listUnsubscribe(subscriberId, listId) {
  const {rowCount} = await client.query(`
    UPDATE subscriptions
    SET
      "status" = 'unsubscribed',
      "updatedAt" = NOW()
    WHERE
      "listId" = ${listId}
      AND "subscriberId" = ${subscriberId}
  `)
  return rowCount === 1
}

module.exports = {
  client,
  listSubscribe,
  listConfirmSubscription,
  listUnsubscribe,
}
