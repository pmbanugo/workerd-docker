import { HonoContext } from "hono/dist/context";
import { nanoid } from "nanoid";

interface RequestBody {
  slug?: string;
  destination?: string;
}

const createRedirect = async (c: HonoContext) => {
  const body = await c.req.json<RequestBody>();

  if (!body.destination) {
    return c.json({ error: "Missing destination!" });
  }
  const slug = body.slug ?? nanoid(7);

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${c.env.UPSTASH_REDIS_REST_TOKEN}`,
    },
    body: JSON.stringify({ slug, destination: body.destination }),
  };
  const url = `${c.env.UPSTASH_REDIS_REST_URL}/set/${slug}`;
  await fetch(url, options);

  return c.json({
    message: "Created redirect!",
    slug,
  });
};

export default createRedirect;
