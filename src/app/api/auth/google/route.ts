export async function POST(req: Request) {
  const { code } = await req.json();

  return Response.json({ accessToken: "test" });
}
