#!/bin/bash

echo "Starting the before-install.sh script..."

exec > >(tee -a /var/log/custom/scriptoutputs.log) 2>&1

# Überprüfen, ob Docker-Container ausgeführt werden
if [ "$(docker ps -q)" ]; then
    # Anhalten aller laufenden Container
    echo "Alle laufenden Docker-Container werden angehalten..."
    docker stop $(docker ps -aq)
else
    echo "Keine Docker-Container zum Anhalten gefunden."
fi
