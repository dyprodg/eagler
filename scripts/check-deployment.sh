#!/bin/bash

exec > >(tee -a /var/log/custom/scriptoutputs.log) 2>&1

echo "Starting the check-deployment.sh script..."

# Warte, bis Port 80 verfügbar ist
while ! nc -z localhost 80; do   
  sleep 1 # Warte für 1 Sekunde vor dem nächsten Versuch
done

# Führe den curl-Befehl aus und überprüfe den Statuscode
if curl -sSf http://localhost:80 >/dev/null; then
  echo "Erfolgreich: Curl-Befehl wurde erfolgreich ausgeführt."
else
  echo "Fehler: Curl-Befehl fehlgeschlagen."
fi