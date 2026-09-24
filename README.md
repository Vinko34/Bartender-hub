# Cocktail Maister

Radni stol za barmene: sastavljanje koktela po aromatskim spojevima sastojaka, uz vodič kroz pripreme i znanost okusa.

- **Radni stol** – zaliha, koktel u izradi, aromatski profil i preporuke „Paše uz mješavinu”
- **Recepti** – spremljeni kokteli, jednim klikom natrag na radni stol ili skidanje sa zalihe
- **Pripreme** – sirupi, cordiali, oleo saccharum, infuzije i milk wash: koji sastojak gdje najbolje prozire i zašto
- **Flavor compounding** – spajanje okusa preko zajedničkih molekula, usporedba dva sastojka i „mostovi”
- **Enzimi** – pektinaza, proteaze, invertaza, β-glukozidaza, lipoksigenaza, PPO, amilaza
- **Zaliha / Spojevi** – uređivanje komponenti i biblioteka aromatskih molekula

Podaci (zaliha, recepti) spremaju se lokalno u pregledniku.

## Pokretanje

```bash
npm install
npm run dev     # http://localhost:5173
npm test        # testovi
npm run build   # produkcijski build u dist/
```

## Objava

Svaki push na `main` pokreće GitHub Actions workflow (`.github/workflows/deploy.yml`) koji testira, builda i objavljuje stranicu na GitHub Pages. Jednokratno treba uključiti: **Settings → Pages → Source: GitHub Actions**.

## Napomena o podacima

Aromatski spojevi su stvarne molekule tipične za pojedine sastojke, ali intenziteti (1–5) i klasifikacija topljivosti su procjene za praksu, ne laboratorijska mjerenja.
