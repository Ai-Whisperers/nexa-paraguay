# Nexa Paraguay — AI Agent Guide

## Quick Links
- **Live:** https://nexaparaguay.com
- **Repo:** github.com/Ai-Whisperers/nexa-paraguay
- **Docker service:** nexa_web (2 replicas)

## Pages
Home, Blog, Contacto, FAQ, Nosotros, Servicios (visas, residency, property, business), Privacidad, Términos

## Content
4 locales: content/es.json, en.json, de.json, nl.json

## Build & Deploy
npm run build && docker build -t nexa-paraguay:prod . && docker stack deploy -c docker-compose.yml nexa

## Critical Patterns
Most international (4 locales). Relocation focus. Document-heavy. WhatsApp contact.
