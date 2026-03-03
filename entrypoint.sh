#!/bin/sh

echo "Waiting for database ...."

until flask db current >/dev/null 2>&1
do
  echo "Database not ready..."
  sleep 3
done

echo "Running Migrations..."
flask db upgrade

echo "Seeding..."
flask seed all || true

echo "Starting server.."

exec "$@"