export async function POST(req: Request) {
  const { code } = await req.json();

  // 여기서 카카오 서버 호출
  return Response.json({ accessToken: "test" });
}
