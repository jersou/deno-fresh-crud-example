FROM denoland/deno:1.46.3
RUN export DENO_DEPLOYMENT_ID=$(date -R)
WORKDIR /app
COPY . .
RUN deno cache main.ts && deno task build
EXPOSE 8000
CMD ["run", "-A", "--unstable-ffi", "main.ts"]
