export const submitTime = (submitTime, session) => {
  return {
    type: "SUBMIT",
    time: submitTime,
    session,
  }
}
