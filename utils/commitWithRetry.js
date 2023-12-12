async function commitWithRetry(session, retryCount = 3) {
  try {
    await session.commitTransaction();
  } catch (error) {
    if (retryCount > 0) {
      await commitWithRetry(session, retryCount - 1);
    } else {
      throw error;
    }
  }
}

module.exports = commitWithRetry;
