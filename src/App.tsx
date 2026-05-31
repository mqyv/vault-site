import { useEffect, useRef, type ReactNode } from "react";
import InteractiveBackground from "./components/InteractiveBackground";
import "./App.css";

const GITHUB_URL = "https://github.com/mqyv/vault";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>("[data-reveal]") ?? [];
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

const FEATURES: { id: string; title: string; body: string }[] = [
  { id: "001", title: "360+ plugins", body: "Une bibliothèque massive, prête à l'emploi. Active uniquement ce que tu veux." },
  { id: "002", title: "Thèmes & CSS", body: "Réécris entièrement l'apparence de Discord avec tes thèmes et ton CSS." },
  { id: "003", title: "Toujours à jour", body: "Une commande récupère les correctifs et garde Vault aligné sur Discord." },
  { id: "004", title: "Privé & local", body: "Tout tourne sur ta machine. Pas de compte, pas de tracking." },
  { id: "005", title: "Partageable", body: "Donne Vault à tes amis. Un guide d'install, et c'est parti." },
  { id: "006", title: "Sur-mesure", body: "C'est ton cord. On ajoute plugins et fonctions custom à la demande." },
];

const INSTALLER_URL = "/install-vault.bat";
const GUIDE_URL = "https://github.com/mqyv/vault/blob/main/INSTALL_FRIENDS.md";

const STEPS: { n: string; title: string; body: string }[] = [
  { n: "01", title: "Télécharge l'installeur", body: "Un seul fichier : install-vault.bat." },
  { n: "02", title: "Double-clique dessus", body: "Il installe tout, compile et configure Discord automatiquement." },
  { n: "03", title: "Rouvre Discord", body: "Vault est prêt, dans tes Réglages. C'est tout." },
];

function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="eyebrow" data-reveal>{children}</div>;
}

export default function App() {
  const root = useReveal();

  return (
    <>
      <InteractiveBackground />
      <div ref={root} className="app">
        <header className="nav">
          <a className="brand" href="#top">
            <img src="/vault-logo.svg" alt="" width={28} height={28} />
            <span>VAULT</span>
          </a>
          <nav className="nav-links">
            <a href="#features">Fonctionnalités</a>
            <a href="#install">Installation</a>
            <a href={GITHUB_URL} className="nav-cta">GitHub ↗</a>
          </nav>
        </header>

        <main id="top">
          {/* HERO */}
          <section className="hero">
            <Eyebrow>● Discord client mod — usage personnel</Eyebrow>
            <h1 data-reveal>
              Ton Discord,<br /><span className="grad">sans limites.</span>
            </h1>
            <p className="lead" data-reveal>
              Vault est un mod Discord personnel : des centaines de plugins, des thèmes
              sur-mesure et des mises à jour qui suivent Discord. Bâti pour toi,
              partagé avec tes proches.
            </p>
            <div className="hero-cta" data-reveal>
              <a href="#install" className="btn btn-primary">Installer Vault</a>
              <a href={GITHUB_URL} className="btn btn-ghost">Voir le code ↗</a>
            </div>
            <div className="hero-stats" data-reveal>
              <div><strong>360+</strong><span>plugins</span></div>
              <div className="sep" />
              <div><strong>∞</strong><span>thèmes</span></div>
              <div className="sep" />
              <div><strong>GPL-3.0</strong><span>open source</span></div>
              <div className="sep" />
              <div><strong>1&nbsp;cmd</strong><span>mise à jour</span></div>
            </div>
          </section>

          {/* FEATURES */}
          <section id="features" className="section">
            <div className="section-head">
              <Eyebrow>01 / Fonctionnalités</Eyebrow>
              <h2 className="section-title" data-reveal>Un client sans compromis.</h2>
            </div>
            <div className="grid">
              {FEATURES.map(f => (
                <article className="card" data-reveal key={f.id}>
                  <span className="card-index">{f.id}</span>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                  <span className="card-line" />
                </article>
              ))}
            </div>
          </section>

          {/* INSTALL */}
          <section id="install" className="section">
            <div className="section-head">
              <Eyebrow>02 / Installation</Eyebrow>
              <h2 className="section-title" data-reveal>Installe en un clic.</h2>
            </div>

            <a className="download-card" href={INSTALLER_URL} download data-reveal>
              <span className="dl-icon" aria-hidden="true">↓</span>
              <span className="dl-text">
                <strong>Télécharger Vault</strong>
                <span>Windows · installeur automatique · ~2 min</span>
              </span>
              <span className="dl-btn">Télécharger</span>
            </a>

            <div className="steps">
              {STEPS.map(s => (
                <div className="step" data-reveal key={s.n}>
                  <span className="step-n">{s.n}</span>
                  <div className="step-body">
                    <h4>{s.title}</h4>
                    <p>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="note" data-reveal>
              L'installeur s'occupe de tout (Git, Node, dépendances, injection). Mac/Linux ou méthode manuelle ?{" "}
              <a href={GUIDE_URL} target="_blank" rel="noreferrer">Voir le guide ↗</a>
            </p>
          </section>

          {/* CTA */}
          <section className="cta-band" data-reveal>
            <Eyebrow>● Prêt ?</Eyebrow>
            <h2>Débloque ton Discord.</h2>
            <a href="#install" className="btn btn-primary btn-lg">Commencer</a>
          </section>
        </main>

        <footer className="footer">
          <div className="footer-brand">
            <img src="/vault-logo.svg" alt="" width={22} height={22} />
            <span>VAULT</span>
          </div>
          <p>
            Logiciel libre sous licence{" "}
            <a href="https://www.gnu.org/licenses/gpl-3.0.txt" target="_blank" rel="noreferrer">GPL-3.0</a>.
            Modifier le client Discord va à l'encontre de ses conditions — usage à tes risques.
          </p>
          <p className="footer-mini">© {new Date().getFullYear()} VAULT</p>
        </footer>
      </div>
    </>
  );
}
