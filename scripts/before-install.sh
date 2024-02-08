#!/bin/bash

# Anhalten aller laufenden Container
echo "Alle laufenden Docker-Container werden angehalten..."
docker stop $(docker ps -q)