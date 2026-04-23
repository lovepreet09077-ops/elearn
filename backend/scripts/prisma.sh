#!/bin/sh

echo "Starting Prisma Studio on port 5555..."

docker compose exec backend sh -c 'BROWSER=none npx prisma studio --port 5555'chmod +x backend/scripts/studio.sh