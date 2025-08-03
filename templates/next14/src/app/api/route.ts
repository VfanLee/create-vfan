export async function GET() {
  return Response.json({
    code: 200,
    success: true,
    message: 'success',
    data: 'Hello World!',
  })
}
