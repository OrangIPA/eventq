export default defineEventHandler(async (event) => {
  deleteCookie(event, 'refresh_token')
  return 'Logged Out'
})
