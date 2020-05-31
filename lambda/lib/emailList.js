const {query} = require('./db.js')

async function listSubscribe({email, name, listId}) {
  try {
    await query('BEGIN')

    const subscriber = (
      await query(
        `
      INSERT INTO subscribers("email", "name")
      VALUES($1, $2)
      RETURNING *
    `,
        [email, name]
      )
    ).rows[0]

    await query(
      `
      INSERT INTO subscriptions("listId", "subscriberId")
      VALUES($1, $2)
    `,
      [listId, subscriber.id]
    )

    await query('COMMIT')

    return subscriber
  } catch (err) {
    await query('ROLLBACK')
    throw err
  }
}

async function listConfirmSubscription(subscriberId, listId) {
  const {rowCount} = await query(`
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
  const {rowCount} = await query(`
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
  listSubscribe,
  listConfirmSubscription,
  listUnsubscribe,
}
