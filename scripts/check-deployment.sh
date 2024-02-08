#!/bin/bash

# Warte, bis Port 80 verfügbar ist
while ! nc -z localhost 80; do   
  sleep 1 # Warte für 1 Sekunde vor dem nächsten Versuch
done

# Führe den curl-Befehl aus, nachdem der Port verfügbar ist
curl http://localhost:80