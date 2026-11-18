# Fileodon Frontend

<div align="center">

<img src="public/fileodon-haj-1.svg" alt="Fileodon" width="180" />

### Én samlet, organisationsklar løsning til SFTP-administration

[![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt&logoColor=white)](https://nuxt.com)
[![Vue](https://img.shields.io/badge/Vue-3-4FC08D?logo=vuedotjs&logoColor=white)](https://vuejs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tests](https://img.shields.io/badge/Tests-Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev)

**Gennemse servere, håndter filer, administrer teams og få overblik over organisationens handlinger — alt samlet i én gennemarbejdet Nuxt-grænseflade.**

</div>

---

## ✨ Funktioner

### 🗂️ Administration af SFTP-forbindelser

- Se og administrer SFTP-forbindelser for den valgte organisation
- Godkend, afvis eller behandl nye forbindelsesanmodninger
- Navigér i fjernmapper med breadcrumb-navigation
- Upload og download filer
- Opret og slet mapper samt fjernfiler
- Redigér eller fjern eksisterende forbindelser
- Generér en kode til oprettelse af nye forbindelser
- Distribuér filer til flere konfigurerede lokationer

### 🏢 Organisationer

- Opret organisationer og skift mellem tilgængelige organisationer
- Redigér organisationsoplysninger og kontaktinformation
- Få overblik over forbindelser, brugere og auditaktivitet
- Beskyt destruktive handlinger med en tydelig danger-zone

### 👥 Brugere og rettigheder

- Invitér brugere og tilknyt organisationsroller
- Redigér eller fjern medlemskaber
- Søg og gennemse organisationens brugere
- Opret og redigér egne roller
- Tilknyt detaljerede rettigheder til hver rolle
- Adskil systemroller fra brugeroprettede roller

### 🔐 Autentifikation

- Registrér, log ind og log ud
- Forny kortlivede adgangstokens via autentifikationsflowet
- Gendan adgangskoder
- Bekræft e-mailadresser
- Brug separate layouts til autentificerede og ikke-autentificerede sider

### 🧾 Auditlog

- Gennemse organisationens handlinger i en overskuelig tabel
- Se bruger, handling, tidspunkt, gamle værdier og nye værdier
- Identificér handlinger tydeligt via statusmærker

### 💫 Brugerflade

- Nuxt 4 med filebaseret routing og layouts
- Vue 3 Composition API og genanvendelige komponenter
- Pinia til autentifikation, organisationer, forbindelser, brugere, roller og notifikationer
- Tailwind CSS 4 og daisyUI-komponenter
- Monaco Editor til redigering
- Genbrugelige loading-, modal-, tabel-, formular-, toast- og breadcrumb-mønstre

---

## 🧭 Oversigt over siden

| Område | Formål |
| --- | --- |
| **Hjem** | Organisationsoverblik og genveje |
| **Forbindelser** | Godkendelse, status og oprettelse af forbindelser |
| **Filbrowser** | Navigér i mapper og udfør SFTP-handlinger |
| **Brugere** | Invitationer og administration af medlemskaber |
| **Roller** | Administration af brugerdefinerede roller og rettigheder |
| **Audit** | Historik over organisationshandlinger og ændringer |
| **Indstillinger** | Organisationens profil og destruktive handlinger |
| **Autentifikation** | Login, registrering, nulstilling og e-mailbekræftelse |

---

## 🛠️ Teknologi

| Lag | Teknologi |
| --- | --- |
| Framework | Nuxt 4, Vue 3 og Vue Router |
| Sprog | TypeScript |
| State | Pinia |
| Styling | Tailwind CSS 4 og daisyUI 5 |
| API-klient | `nuxt-open-fetch` med genererede API-skemaer |
| Værktøjer | VueUse |
| Ikoner | `@nuxt/icon` og egne SVG-collections |
| Test | Vitest, Nuxt Test Utils, Vue Test Utils og Happy DOM |
| Kodekontrol | ESLint 10 |
| Package manager | npm |

---

## 🚀 Kom hurtigt i gang

### Forudsætninger

- Node.js
- npm
- En kørende Fileodon API, som frontend kan nå

### 1. Installér dependencies

```bash
npm ci
```

Brug `npm install`, hvis dependencies bevidst skal opdateres eller tilføjes.

### 2. Konfigurér API'et

Opret en `.env`-fil i projektets rod:

```dotenv
API_BASE_URL="http://localhost:5283/api"
API_OPENAPI_PATH="http://localhost:5283/openapi/v1.json"
```

| Variabel | Formål |
| --- | --- |
| `API_BASE_URL` | Basis-URL til den genererede API-klient |
| `API_OPENAPI_PATH` | OpenAPI-dokumentet, der bruges som API-skema |

Standardværdierne er konfigureret i `nuxt.config.ts`, så variablerne kan udelades i de tilhørende hosted-miljøer. Det lokale API skal tillade forespørgsler fra frontendens origin.

### 3. Start udviklingsserveren

```bash
npm run dev
```

Åbn derefter **http://localhost:3000**.

---

## 📦 Tilgængelige kommandoer

```bash
npm run dev          # Start Nuxts udviklingsserver
npm run build        # Byg en produktionsversion
npm run generate     # Generér statisk Nuxt-output
npm run preview      # Forhåndsvis produktionsbygningen lokalt
npm run postinstall   # Generér Nuxt-filer efter installation
npm test             # Kør Vitest-suiten
npm run lint         # Tjek koden med ESLint
npm run lint:fix     # Ret automatiske ESLint-problemer
```

### Kør enkeltstående test

```bash
npm test -- test/unit/email.test.ts
npm test -- test/nuxt/authIndex.test.ts
```

### Kør hele testsuiten

```bash
npm test -- --run
```

---

## 🗃️ Projektstruktur

```text
app/
├── components/       # UI, formularer, layouts, cards og views
├── composables/      # SFTP-, formular- og API-adfærd
├── layouts/          # Autentificeret og ikke-autentificeret shell
├── middleware/       # Route guards
├── pages/            # Filebaserede applikationsruter
├── plugins/          # OpenFetch og tværgående hooks
├── stores/           # Pinia-state for domænerne
├── types/            # API- og applikationstyper
└── assets/           # Tailwind-styles og egne ikoner

public/               # Statiske offentlige assets
server/               # Nuxt serverroutes eller middleware
test/                 # Unit- og Nuxt-komponenttests
```

> Projektet har desuden en lille testside under `app/pages/test/`. Den er adskilt fra den automatiserede suite i `test/`.

---

## 🔌 API-integration

Fileodon bruger `nuxt-open-fetch` til typed API-kald baseret på OpenAPI-skemaet. API-konfigurationen ligger i `nuxt.config.ts`, mens fælles requestopsætning registreres i `app/plugins/openFetch.ts`.

Domænelogikken er delt op efter ansvar:

- `app/stores/` holder organisationer, brugere, roller, auth, auditlog og forbindelser
- `app/composables/` koordinerer filnavigation og SFTP-handlinger
- `app/components/forms/` leverer formularer til oprettelse og redigering
- `app/utils/` indeholder validering og håndtering af API-formfejl

Frontend forventer en autentificeret API-session til organisationer og SFTP-operationer. Adgangsstyringen bruger en cookie til access token samt et refresh-flow.

---

## ✅ Kvalitetskontrol

Før en pull request kan du køre:

```bash
npm run lint
npm test -- --run
npm run build
```

Til hurtigere feedback under udviklingen:

```bash
npm run dev
npm test
```

---

## 🧩 Miljønoter

- Lokal API: `http://localhost:5283/api`
- Lokalt OpenAPI: `http://localhost:5283/openapi/v1.json`
- Standardværdier for hosted API ligger i `nuxt.config.ts`
- Commit aldrig rigtige credentials, tokens eller private miljøværdier


---

<div align="center">

Bygget med Nuxt, Vue og en masse filmanagement-magi.

</div>
