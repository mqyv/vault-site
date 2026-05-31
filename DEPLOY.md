# Mettre le site Vault en ligne 24/7

Le site est statique (Vite) → hébergement **gratuit, 24/7, HTTPS automatique**. Choisis UN des hébergeurs ci-dessous. Tous redéploient automatiquement à chaque `git push`.

## Réglages de build (identiques partout)
- **Build command** : `pnpm build`
- **Output directory** : `dist`
- **Install command** : `pnpm install`
- **Node version** : 20+

---

## Option A — Vercel (le plus simple) ⭐
1. Pousse `vault-site` sur un repo GitHub.
2. Va sur **https://vercel.com** → *Add New Project* → importe le repo.
3. Vercel détecte Vite automatiquement → clique **Deploy**.
4. Ton site est en ligne sur `xxx.vercel.app` (24/7). Domaine perso possible dans *Settings → Domains*.

## Option B — Cloudflare Pages
1. **https://pages.cloudflare.com** → *Create application* → *Pages* → connecte GitHub.
2. Framework preset : **Vite**. Build = `pnpm build`, output = `dist`.
3. **Save and Deploy** → en ligne sur `xxx.pages.dev`.

## Option C — Netlify
1. **https://app.netlify.com** → *Add new site* → *Import an existing project*.
2. Build = `pnpm build`, publish = `dist`.
3. **Deploy** → en ligne sur `xxx.netlify.app`.

---

## Déploiement express SANS GitHub (test rapide)
```bash
cd vault-site
npx vercel        # se connecte via navigateur, déploie en ~30s
npx vercel --prod # pour la version définitive
```

## Après le déploiement
Mets l'URL de ton repo GitHub dans `src/App.tsx` (la constante `GITHUB_URL = "#"`) pour activer les boutons « GitHub » / « Voir le code ».
