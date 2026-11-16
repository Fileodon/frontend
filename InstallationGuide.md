# Installations guide af Fileodon lokal opsætning
Denne guide er til hvis du bare vil køre projektet uden viden omkring det. Hvis du oplever fejl eller mangler noget læs README.md

### Forudsætninger
* Node js
* En god supporteret package manager. Vi har brugt **npm** under udvikling


## Konfiguration
* Opret .env
```sh
cp .env.example .env
```
* konfigurer api forbindelse
Eksempel på lokal opsætning
```
API_BASE_URL="http://localhost:5283/api"
API_OPENAPI_PATH="http://localhost:5283/openapi/v1.json"
```


## Installer Afhængighedder
* installer node modules
```sh
npm ci
```

## Kør projektet
```sh
npm run dev
```
