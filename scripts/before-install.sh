#!/bin/bash

echo "Starting the before-install.sh script..."

exec > >(tee -a /var/log/custom/scriptoutputs.log) 2>&1
# Anhalten aller laufenden Container
echo "Alle laufenden Docker-Container werden angehalten..."
docker stop $(docker ps -q)