# workerd-docker

A simple URL shortener implemented using Workers (workerd) running in Docker/Kubernetes.

See this [blog post](https://pmbanugo.me/running-cloudflare-workers-on-docker-kubernetes) for some details.

> Forked and modifed sample from https://github.com/WalshyDev/workerd-example

## Running

To run simply install the dependencies and run workerd :)

Requests are served at http://localhost:8080 (can be changed in `config.capnp`). Update `UPSTASH_REDIS_REST_TOKEN` and `UPSTASH_REDIS_REST_URL` to your Upstash redis details, or to any Redis server credentials with a different provider.

```
# Install the dependencies (including workerd)
npm i

# Bundle your Worker and start Workerd serving the Worker
npm run dev
```

## Building Docker Image

```
npm run build

docker build . -t redirect

# Run the image
docker run -d --rm -p 49160:8080 redirect
```

## Testing

Once the Worker is running we can test it!

To create a redirect do a `POST` to `/create` like so:

```
$ curl -X POST -d '{"slug": "test", "destination": "https://pmbanugo.me"}' http://localhost:8080/create
```

Then to test the redirect simply send a `GET` request to the slug like so:

```
$ curl -i http://localhost:8080/test
HTTP/1.1 302 Found
Content-Length: 0
Location: https://pmbanugo.dev
```
