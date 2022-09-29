import { HonoContext } from "hono/dist/context";

const handleRedirect = async (c: HonoContext) => {
  try {
    const { pathname } = new URL(c.req.url);
    const path = pathname.slice(1);

    const init = {
      headers: {
        Authorization: `Bearer ${c.env.UPSTASH_REDIS_REST_TOKEN}`,
      },
    };
    const url = `${c.env.UPSTASH_REDIS_REST_URL}/get/${path}`;

    const res = await fetch(url, init);
    const { result } = await res.json<{ result: string }>();
    const { destination }: { destination: string } = JSON.parse(result);

    if (destination === null) {
      c.status(404);
      return c.json({ error: "Not found!" });
    }

    return c.redirect(destination);
  } catch (e) {
    return c.json({
      error: "exception caught! Message: " + e.message,
      stack: e.stack,
    });
  }
};

export default handleRedirect;
