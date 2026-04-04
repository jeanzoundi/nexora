import { useState, useEffect, useRef } from "react";

const G = {
  black: "#040507", deep: "#080b12", surface: "#0d1220",
  border: "rgba(99,179,255,0.12)", cyan: "#38bdf8",
  cyanDim: "rgba(56,189,248,0.15)", cyanGlow: "rgba(56,189,248,0.4)",
  white: "#f0f4ff", muted: "#6b7fa8", accent: "#a78bfa",
};

// ── TRANSLATIONS ──────────────────────────────────────────────────────────────
const LANG = {
  fr: {
    nav: {
      home: "Accueil", services: "Services", sectors: "Secteurs",
      about: "À propos", pricing: "Tarifs", contact: "Contact",
      cta: "Démarrer un projet →",
    },
    hero: {
      pill: "IA · AUTOMATISATION · INTELLIGENCE",
      title1: "L'intelligence qui",
      titleGrad: "transforme",
      title2: "vos opérations",
      sub: "Nexora conçoit et déploie des solutions IA sur mesure et des systèmes autonomes pour les entreprises ivoiriennes et ouest-africaines — pour éliminer les tâches répétitives, accélérer vos décisions et faire croître votre activité 24h/24.",
      cta1: "Obtenir un audit gratuit →",
      cta2: "Découvrir nos solutions",
      scroll: "DÉFILER",
    },
    stats: [
      ["–90%", "Temps opérationnel économisé", "garanti contractuellement"],
      ["72h", "Premier déploiement", "prototype fonctionnel"],
      ["98%", "Satisfaction client", "engagement NPS > 8/10"],
      ["24/7", "Systèmes actifs", "sans interruption"],
    ],
    banner: {
      title: "Prêt à automatiser votre activité ?",
      sub: "Audit gratuit · Réponse en 24h · Sans engagement",
      cta1: "Commencer →", cta2: "Nos solutions",
    },
    sectorsPreview: {
      tag: "Nos secteurs", title1: "Nous connaissons", title2: "votre métier",
      sub: "Des solutions conçues pour les réalités du marché ivoirien et ouest-africain.",
      more: "Voir tous les secteurs →",
    },
    servicesPreview: {
      tag: "Ce que nous faisons", title1: "Nos domaines", title2: "d'expertise",
      sub: "Chaque solution est construite pour votre entreprise — jamais à partir d'un modèle générique.",
      items: [
        ["01", "Automatisation", "Workflows répétitifs éliminés. Facturation, CRM, emails — 100% fiable."],
        ["02", "Agents IA", "Systèmes autonomes qui décident et agissent 24h/24 sans intervention humaine."],
        ["03", "Analytics Prédictif", "Données brutes transformées en décisions stratégiques en temps réel."],
        ["04", "Chatbots Business", "Assistants entraînés sur vos données. SAV et onboarding automatisés."],
        ["05", "Intégration", "ERP, CRM, SaaS connectés en un écosystème intelligent et sans silos."],
        ["06", "Audit IA", "Diagnostic de maturité, feuille de route ROI et formation de vos équipes."],
      ],
      more: "Voir toutes les solutions →",
    },
    services: {
      tag: "Nos solutions", title1: "Ce que nous construisons", title2: "pour vous",
      sub: "Deux approches selon vos besoins : une solution standard déployée en 48h, ou un système entièrement conçu pour votre contexte métier.",
      tab1: "⚙ SUR-MESURE / CUSTOM", tab2: "⚡ SOLUTIONS STANDARD",
      notSure: "Vous ne savez pas par où commencer ?",
      auditCta: "Obtenir un audit gratuit →",
      quoteCta: "Demander un devis →",
    },
    svcs: [
      { title: "Automatisation de Processus", desc: "Identification et automatisation des workflows répétitifs : facturation, reporting, gestion de données, emails, CRM. Zéro erreur humaine, fiabilité totale.", tag: "n8n · MAKE · API" },
      { title: "Agents IA Autonomes", desc: "Agents intelligents qui agissent de façon indépendante : prise de décision, réponse client, analyse de données en temps réel, exécution de tâches complexes.", tag: "LLM · AGENTIC AI · RAG" },
      { title: "Chatbots Business", desc: "Assistants conversationnels entraînés sur vos données internes : SAV, FAQ intelligent, assistant commercial, onboarding automatisé. Intégration WhatsApp incluse.", tag: "NLP · WHATSAPP · EMBED" },
      { title: "Analytics & Reporting IA", desc: "Transformez vos données brutes en décisions stratégiques. Prévisions de ventes, détection d'anomalies, segmentation client, lead scoring automatisé.", tag: "POWER BI · SQL · PYTHON" },
      { title: "Intégration CRM / ERP", desc: "Connectez tout votre écosystème digital. ERP, CRM, e-commerce, SaaS — infrastructure intelligente sans silos de données. Migration et formation incluses.", tag: "ODOO · HUBSPOT · API CUSTOM" },
      { title: "Audit IA & Stratégie", desc: "Diagnostic complet de maturité digitale. Feuille de route d'automatisation priorisée par ROI. Conseil stratégique et formation de vos équipes.", tag: "AUDIT · STRATÉGIE · FORMATION" },
    ],
    std: [
      { badge: "PRÊT EN 48H", title: "Chatbot SAV WhatsApp", desc: "Assistant IA 24/7 multilingue qui qualifie les demandes et escalade vers vos équipes humaines.", features: ["WhatsApp Business API", "Base de connaissance configurable", "Dashboard analytique inclus", "Transfert vers agent humain"] },
      { badge: "PRÊT EN 48H", title: "Automatisation CRM & Email", desc: "Sync emails, création de leads, relances intelligentes et scoring automatique dans votre CRM.", features: ["HubSpot, Salesforce, Pipedrive", "Relances personnalisées automatiques", "Scoring IA des leads", "Rapports hebdomadaires auto"] },
      { badge: "PRÊT EN 72H", title: "Générateur de Contenu IA", desc: "Posts réseaux sociaux, newsletters, fiches produits — créés automatiquement depuis vos briefs ou données.", features: ["Ton & style personnalisables", "Publication multicanale programmée", "Optimisation SEO intégrée", "Workflow de validation humaine"] },
      { badge: "PRÊT EN 48H", title: "Extraction de Documents", desc: "OCR intelligent sur vos factures, contrats et bons de commande — dans vos systèmes en quelques secondes.", features: ["Multi-format PDF, scan, image", "Export direct ERP ou comptabilité", "Alertes validation & anomalies", "Architecture conforme RGPD"] },
      { badge: "PRÊT EN 72H", title: "Dashboard BI Automatique", desc: "Tableau de bord temps réel connecté à vos sources de données, avec rapports et alertes KPI automatisés.", features: ["Google Sheets, SQL, API", "Rapports PDF automatiques", "Alertes SMS/email sur seuils", "Accès multi-utilisateurs"] },
      { badge: "PRÊT EN 48H", title: "Assistant RH & Onboarding", desc: "Tri de CV, planification d'entretiens, envoi de documents, suivi des nouvelles recrues.", features: ["Scoring automatique des CV", "Emails & rappels d'onboarding", "Intégration signature électronique", "Suivi période d'essai"] },
      { badge: "🏗 BTP MANAGER", title: "BTP Manager", desc: "Le logiciel de gestion complet pour vos entreprises BTP — de l'étude à la réalisation, en passant par le devis, la logistique et la gestion de chantier.", features: ["Études & métrés automatisés", "Devis & appels d'offres en 1 clic", "Gestion de chantier en temps réel", "Logistique & approvisionnement", "Suivi budgétaire & facturation", "Tableau de bord direction"], isBtp: true },
    ],
    sectors: {
      tag: "Nos secteurs", title1: "Nous connaissons", title2: "votre réalité métier",
      sub: "Chaque secteur a ses propres douleurs. Nos solutions sont conçues pour le contexte ivoirien et ouest-africain — pas copiées de l'étranger.",
      problems: "Problèmes actuels", solutions: "Solutions Nexora",
      cta1: "Audit gratuit pour mon secteur →", cta2: "Voir toutes nos solutions",
      items: [
        { icon: "🛒", titre: "Commerce & Distribution", douleurs: ["Gestion manuelle des commandes", "Relances clients non automatisées", "Rapports de ventes chronophages"], solutions: ["Automatisation commandes → ERP", "Relances WhatsApp automatiques", "Dashboard ventes temps réel"] },
        { icon: "🏥", titre: "Santé & Cliniques", douleurs: ["Gestion RDV par téléphone", "Dossiers patients dispersés", "Rappels consultations manquants"], solutions: ["Agent IA prise de RDV 24/7", "Centralisation dossiers patients", "Rappels SMS/WhatsApp auto"] },
        { icon: "🏦", titre: "Finance & Assurance", douleurs: ["Onboarding clients lent", "Conformité & reporting manuel", "Scoring risque non automatisé"], solutions: ["Workflow KYC automatisé", "Rapports réglementaires auto", "Scoring IA des dossiers"] },
        { icon: "🏨", titre: "Hôtellerie & Tourisme", douleurs: ["Réservations multi-canaux non centralisées", "SAV débordé hors heures ouvrables", "Upsell non automatisé"], solutions: ["Centralisation réservations + IA", "Chatbot SAV 24/7 WhatsApp", "Recommandations IA personnalisées"] },
        { icon: "🏗️", titre: "BTP & Construction", douleurs: ["Devis manuels chronophages", "Suivi chantier sans visibilité", "Gestion logistique dispersée"], solutions: ["BTP Manager — devis en 1 clic", "Tableau de bord chantier temps réel", "Automatisation approvisionnement"] },
        { icon: "🎓", titre: "Éducation & Formation", douleurs: ["Inscriptions et relances manuelles", "Suivi pédagogique dispersé", "Communication parents/élèves inefficace"], solutions: ["Workflow inscriptions automatisé", "Dashboard suivi apprenants", "Notifications automatiques"] },
        { icon: "🏢", titre: "Immobilier", douleurs: ["Qualification leads chronophage", "Gestion visites non optimisée", "Relances prospects manuelles"], solutions: ["Agent IA qualification leads 24/7", "Planning visites automatisé", "Séquences relances CRM"] },
        { icon: "🍽️", titre: "Restauration & Food", douleurs: ["Prises de commandes sur plusieurs canaux", "Gestion stock & pertes", "Fidélisation client absente"], solutions: ["Agrégation commandes centralisée", "Alertes rupture stock prédictives", "Programme fidélité automatisé"] },
      ],
    },
    about: {
      tag: "Notre histoire", title1: "Pas une agence.", title2: "Un partenaire tech.",
      sub: "Nous ne vendons pas des outils. Nous construisons des systèmes qui travaillent pour vous — en permanence, silencieusement, sans erreur.",
      quote: '"L\'IA ne remplace pas vos équipes.\nElle les libère pour ce que seuls\nles humains savent vraiment faire."',
      why: [
        { t: "ROI garanti en 90 jours", d: "Métriques de succès définies avant chaque projet. Vous payez pour des résultats mesurables, pas des promesses." },
        { t: "Solutions 100% sur mesure", d: "Aucun template générique. Chaque système est conçu pour votre contexte métier spécifique." },
        { t: "Prototype en 72h", d: "Premier déploiement opérationnel en moins de 3 jours. Des livrables concrets, pas des slides." },
        { t: "Partenariat durable", d: "Nous ne disparaissons pas après le lancement. Monitoring, optimisation et support continu inclus." },
      ],
      methodTag: "Notre méthode", methodTitle1: "De l'idée au système", methodTitle2: "en 4 étapes",
      methodSub: "Un processus structuré pour livrer vite, bien et durablement.",
      steps: [
        ["01", "Découverte", "Audit de vos processus existants, identification des opportunités d'automatisation à fort ROI et définition des KPIs de succès."],
        ["02", "Architecture", "Conception technique adaptée à votre stack, sélection des modèles IA, design des flux de données et plan de déploiement."],
        ["03", "Déploiement", "Développement agile, tests en environnement réel, intégration avec vos systèmes existants. Premier prototype en 72h."],
        ["04", "Optimisation", "Monitoring continu des performances, ajustements des modèles, formation de vos équipes. Amélioration continue garantie."],
      ],
      ctaTitle: "Prêt à commencer votre transformation ?",
      cta1: "Nous contacter →", cta2: "Nos solutions",
    },
    pricing: {
      tag: "Tarifs", title1: "Investissez dans", title2: "votre croissance",
      sub: "Des offres adaptées à chaque stade de votre transformation. Tarifs indicatifs en FCFA — devis précis après audit gratuit.",
      recommended: "⚡ RECOMMANDÉ",
      onRequest: "Sur devis",
      plans: [
        { name: "STARTER", desc: "Pour tester l'automatisation avec un premier cas d'usage concret.", fourchette: "350 000 – 600 000 FCFA", maintenance: "50 000 FCFA / mois", features: ["Audit initial gratuit", "1 processus automatisé", "Intégration avec vos outils", "Documentation complète", "Support 30 jours"] },
        { name: "GROWTH", featured: true, desc: "Pour les entreprises prêtes à industrialiser leur transformation IA.", fourchette: "800 000 – 1 500 000 FCFA", maintenance: "120 000 FCFA / mois", features: ["Jusqu'à 5 automatisations", "1 agent IA dédié", "Dashboard analytique temps réel", "Intégrations illimitées", "Support prioritaire 24/7", "Optimisation mensuelle"] },
        { name: "ENTERPRISE", desc: "Infrastructure IA complète pour grandes organisations.", fourchette: "2 000 000+ FCFA", maintenance: "Sur devis", features: ["Automatisations illimitées", "Agents IA multiples", "Architecture dédiée", "Conformité SLA & RGPD", "Équipe dédiée on-site", "Formation & change management"] },
      ],
      quoteCta: "Demander un devis →",
      faqTag: "FAQ", faqTitle: "Questions fréquentes", faqSub: "Tout ce qu'il faut savoir avant de démarrer.",
      faqs: [
        { q: "Pourquoi afficher des fourchettes plutôt qu'un tarif fixe ?", a: "Parce que chaque projet est unique. Une fourchette transparente vous permet de vous positionner rapidement, et le devis précis est établi après l'audit gratuit — sans surprise." },
        { q: "Combien de temps pour déployer une première solution ?", a: "Pour les solutions standard : 48 à 72 heures. Pour les projets sur mesure, le premier prototype est livré en moins d'une semaine après validation de l'architecture." },
        { q: "Faut-il des compétences techniques ?", a: "Absolument pas. Nos solutions sont conçues pour vos équipes métier sans expertise technique requise. Nous assurons la formation complète, la documentation et le support continu." },
        { q: "Mes données sont-elles sécurisées ?", a: "Oui. Vos données restent dans votre infrastructure ou dans des environnements cloud sécurisés dédiés. Aucun partage avec des tiers." },
        { q: "L'audit initial est-il vraiment gratuit ?", a: "Oui, sans aucune condition. Nous analysons vos processus et vous livrons un rapport d'opportunités — que vous travailliez avec nous ou non par la suite." },
        { q: "Y a-t-il un accompagnement après le déploiement ?", a: "Oui. Tous les projets incluent un support post-déploiement. Monitoring des performances, mises à jour et optimisation continue garantis." },
      ],
    },
    contact: {
      tag: "Contact", title1: "Prêt à automatiser", title2: "votre futur ?",
      sub: "Obtenez un audit gratuit de vos processus et découvrez vos opportunités d'automatisation. Réponse garantie sous 24h.",
      guarantees: ["Réponse sous 24h ouvrables", "Audit initial 100% gratuit", "Sans engagement contractuel", "Devis clair et transparent en FCFA"],
      guaranteesTitle: "NOS ENGAGEMENTS",
      stepsTitle: "DE LA DEMANDE AU LIVE",
      steps: [
        ["01", "Audit gratuit", "Nous analysons vos processus et identifions les opportunités d'automatisation."],
        ["02", "Devis sur mesure", "Proposition adaptée avec périmètre clair, délai et livrables."],
        ["03", "Design & Dev", "On construit votre solution. Premier prototype en 72 heures."],
        ["04", "Tests & QA", "Tests rigoureux dans votre environnement réel. Zéro bug avant lancement."],
        ["05", "Déploiement", "Mise en production sur votre infra ou cloud. Transfert complet."],
        ["06", "Live & optimisé", "Monitoring, support et optimisation continue post-lancement."],
      ],
      form: {
        prenom: "Prénom *", nom: "Nom", email: "Email professionnel *",
        entreprise: "Entreprise *", pays: "Pays", taille: "Taille entreprise",
        besoin: "Ce que vous souhaitez automatiser *",
        prenomPh: "Jean", nomPh: "Kouassi", emailPh: "jean@entreprise.ci",
        entreprisePh: "Nom de votre société",
        paysList: ["Côte d'Ivoire", "Sénégal", "Mali", "Burkina Faso", "Togo", "Bénin", "Cameroun", "Autre"],
        tailleList: ["1–10 employés", "11–50 employés", "51–200 employés", "200+ employés"],
        besoinPh: "Décrivez vos processus, outils actuels, points de douleur...",
        submit: "ENVOYER MA DEMANDE D'AUDIT GRATUIT →",
        loading: "ENVOI EN COURS...",
        error: "Veuillez remplir tous les champs obligatoires (*).",
        privacy: "Vos données restent confidentielles et ne sont jamais partagées.",
        successTitle: "Demande envoyée !",
        successSub: "Nous vous recontactons sous 24h avec votre rapport d'audit personnalisé.",
      },
    },
    footer: {
      tagline: "IA & Automatisation pour les entreprises",
      copy1: "© 2026 NEXORA AI — by",
      copy1b: "Entreprenons Ensemble",
      copy1c: "· International",
      copy2: "IA · Automatisation · Solutions sur mesure · Afrique de l'Ouest",
    },
  },

  en: {
    nav: {
      home: "Home", services: "Services", sectors: "Sectors",
      about: "About", pricing: "Pricing", contact: "Contact",
      cta: "Start a project →",
    },
    hero: {
      pill: "AI · AUTOMATION · INTELLIGENCE",
      title1: "The intelligence that",
      titleGrad: "transforms",
      title2: "your operations",
      sub: "Nexora designs and deploys custom AI solutions and autonomous systems for Ivorian and West African businesses — to eliminate repetitive tasks, accelerate decisions and grow your business 24/7.",
      cta1: "Get a free audit →",
      cta2: "Discover our solutions",
      scroll: "SCROLL",
    },
    stats: [
      ["–90%", "Operational time saved", "contractually guaranteed"],
      ["72h", "First deployment", "functional prototype"],
      ["98%", "Client satisfaction", "NPS > 8/10 commitment"],
      ["24/7", "Active systems", "without interruption"],
    ],
    banner: {
      title: "Ready to automate your business?",
      sub: "Free audit · Response in 24h · No commitment",
      cta1: "Get started →", cta2: "Our solutions",
    },
    sectorsPreview: {
      tag: "Our sectors", title1: "We understand", title2: "your business",
      sub: "Solutions designed for the realities of the Ivorian and West African market.",
      more: "See all sectors →",
    },
    servicesPreview: {
      tag: "What we do", title1: "Our areas", title2: "of expertise",
      sub: "Every solution is built for your business — never from a generic template.",
      items: [
        ["01", "Automation", "Repetitive workflows eliminated. Billing, CRM, emails — 100% reliable."],
        ["02", "AI Agents", "Autonomous systems that decide and act 24/7 without human intervention."],
        ["03", "Predictive Analytics", "Raw data transformed into strategic decisions in real time."],
        ["04", "Business Chatbots", "Assistants trained on your data. Customer support and onboarding automated."],
        ["05", "Integration", "ERP, CRM, SaaS connected into one seamless, intelligent ecosystem."],
        ["06", "AI Audit", "Maturity diagnosis, ROI roadmap and team training."],
      ],
      more: "See all solutions →",
    },
    services: {
      tag: "Our solutions", title1: "What we build", title2: "for you",
      sub: "Two approaches based on your needs: a standard solution deployed in 48h, or a system entirely designed for your business context.",
      tab1: "⚙ CUSTOM / BESPOKE", tab2: "⚡ STANDARD SOLUTIONS",
      notSure: "Not sure where to start?",
      auditCta: "Get a free audit →",
      quoteCta: "Request a quote →",
    },
    svcs: [
      { title: "Process Automation", desc: "Identification and automation of repetitive workflows: billing, reporting, data management, emails, CRM. Zero human error, total reliability.", tag: "n8n · MAKE · API" },
      { title: "Autonomous AI Agents", desc: "Intelligent agents that act independently: decision-making, customer response, real-time data analysis, complex task execution.", tag: "LLM · AGENTIC AI · RAG" },
      { title: "Business Chatbots", desc: "Conversational assistants trained on your internal data: customer support, intelligent FAQ, sales assistant, automated onboarding. WhatsApp integration included.", tag: "NLP · WHATSAPP · EMBED" },
      { title: "Analytics & AI Reporting", desc: "Transform raw data into strategic decisions. Sales forecasting, anomaly detection, customer segmentation, automated lead scoring.", tag: "POWER BI · SQL · PYTHON" },
      { title: "CRM / ERP Integration", desc: "Connect your entire digital ecosystem. ERP, CRM, e-commerce, SaaS — intelligent infrastructure without data silos. Migration and training included.", tag: "ODOO · HUBSPOT · CUSTOM API" },
      { title: "AI Audit & Strategy", desc: "Complete digital maturity diagnosis. ROI-prioritized automation roadmap. Strategic consulting and team training.", tag: "AUDIT · STRATEGY · TRAINING" },
    ],
    std: [
      { badge: "READY IN 48H", title: "WhatsApp Support Chatbot", desc: "Multilingual 24/7 AI assistant that qualifies requests and escalates to your human teams.", features: ["WhatsApp Business API", "Configurable knowledge base", "Analytics dashboard included", "Human agent handoff"] },
      { badge: "READY IN 48H", title: "CRM & Email Automation", desc: "Email sync, lead creation, intelligent follow-ups and automatic scoring in your CRM.", features: ["HubSpot, Salesforce, Pipedrive", "Personalized automated follow-ups", "AI lead scoring", "Automated weekly reports"] },
      { badge: "READY IN 72H", title: "AI Content Generator", desc: "Social posts, newsletters, product sheets — auto-created from your briefs or data.", features: ["Customizable tone & style", "Scheduled multichannel publishing", "Built-in SEO optimization", "Human review workflow"] },
      { badge: "READY IN 48H", title: "Document Extraction", desc: "Intelligent OCR on your invoices, contracts and purchase orders — into your systems in seconds.", features: ["Multi-format PDF, scan, image", "Direct ERP or accounting export", "Validation & anomaly alerts", "GDPR-ready architecture"] },
      { badge: "READY IN 72H", title: "Auto BI Dashboard", desc: "Real-time dashboard connected to your data sources, with automated reports and KPI alerts.", features: ["Google Sheets, SQL, API", "Automatic PDF reports", "SMS/email threshold alerts", "Multi-user access"] },
      { badge: "READY IN 48H", title: "HR & Onboarding Assistant", desc: "CV screening, interview scheduling, document sending, new hire tracking.", features: ["Automatic CV scoring", "Onboarding emails & reminders", "E-signature integration", "Probation period tracking"] },
      { badge: "🏗 BTP MANAGER", title: "BTP Manager", desc: "The complete management software for your construction business — from design to delivery, covering quotes, logistics and site management.", features: ["Automated estimates & quantities", "Quotes & tenders in 1 click", "Real-time site management", "Logistics & procurement", "Budget tracking & invoicing", "Executive dashboard"], isBtp: true },
    ],
    sectors: {
      tag: "Our sectors", title1: "We understand", title2: "your business reality",
      sub: "Every sector has its own pain points. Our solutions are designed for the Ivorian and West African context — not copied from abroad.",
      problems: "Current challenges", solutions: "Nexora solutions",
      cta1: "Free audit for my sector →", cta2: "See all our solutions",
      items: [
        { icon: "🛒", titre: "Retail & Distribution", douleurs: ["Manual order management", "No automated follow-ups", "Time-consuming sales reports"], solutions: ["Order → ERP automation", "Automatic WhatsApp follow-ups", "Real-time sales dashboard"] },
        { icon: "🏥", titre: "Healthcare & Clinics", douleurs: ["Phone-based appointment booking", "Scattered patient records", "Missing consultation reminders"], solutions: ["24/7 AI appointment agent", "Centralized patient records", "Automatic SMS/WhatsApp reminders"] },
        { icon: "🏦", titre: "Finance & Insurance", douleurs: ["Slow client onboarding", "Manual compliance & reporting", "No automated risk scoring"], solutions: ["Automated KYC workflow", "Auto regulatory reports", "AI file scoring"] },
        { icon: "🏨", titre: "Hospitality & Tourism", douleurs: ["Uncentered multi-channel bookings", "Overwhelmed support outside hours", "No automated upsell"], solutions: ["Centralized bookings + AI", "24/7 WhatsApp support chatbot", "Personalized AI recommendations"] },
        { icon: "🏗️", titre: "Construction & BTP", douleurs: ["Time-consuming manual quotes", "No site visibility", "Scattered logistics management"], solutions: ["BTP Manager — quotes in 1 click", "Real-time site dashboard", "Procurement automation"] },
        { icon: "🎓", titre: "Education & Training", douleurs: ["Manual registrations and follow-ups", "Scattered academic tracking", "Inefficient parent-student communication"], solutions: ["Automated registration workflow", "Student tracking dashboard", "Automatic notifications"] },
        { icon: "🏢", titre: "Real Estate", douleurs: ["Time-consuming lead qualification", "Unoptimized visit management", "Manual prospect follow-ups"], solutions: ["24/7 AI lead qualification", "Automated visit scheduling", "CRM follow-up sequences"] },
        { icon: "🍽️", titre: "Food & Restaurant", douleurs: ["Orders across multiple channels", "Stock management & waste", "No customer loyalty program"], solutions: ["Centralized order aggregation", "Predictive stock alerts", "Automated loyalty program"] },
      ],
    },
    about: {
      tag: "Our story", title1: "Not an agency.", title2: "A tech partner.",
      sub: "We don't sell tools. We build systems that work for you — permanently, silently, without error.",
      quote: '"AI doesn\'t replace your teams.\nIt frees them for what only\nhumans truly know how to do."',
      why: [
        { t: "ROI guaranteed in 90 days", d: "Success metrics defined before each project. You pay for measurable results, not promises." },
        { t: "100% custom solutions", d: "No generic templates. Every system is designed for your specific business context." },
        { t: "Prototype in 72h", d: "First deployment operational in under 3 days. Concrete deliverables, not slides." },
        { t: "Ongoing partnership", d: "We don't disappear after launch. Continuous monitoring, optimization and support included." },
      ],
      methodTag: "Our method", methodTitle1: "From idea to system", methodTitle2: "in 4 steps",
      methodSub: "A structured process to deliver fast, well, and durably.",
      steps: [
        ["01", "Discovery", "Audit of your existing processes, identification of high-ROI automation opportunities and KPI definition."],
        ["02", "Architecture", "Technical design adapted to your stack, AI model selection, data flow design and deployment plan."],
        ["03", "Deployment", "Agile development, real-environment testing, integration with your existing systems. First prototype in 72h."],
        ["04", "Optimization", "Continuous performance monitoring, model adjustments, team training. Continuous improvement guaranteed."],
      ],
      ctaTitle: "Ready to start your transformation?",
      cta1: "Contact us →", cta2: "Our solutions",
    },
    pricing: {
      tag: "Pricing", title1: "Invest in", title2: "your growth",
      sub: "Offerings adapted to each stage of your transformation. Indicative pricing — precise quote after free audit.",
      recommended: "⚡ RECOMMENDED",
      plans: [
        { name: "STARTER", desc: "To test automation with a first concrete use case.", fourchette: "350,000 – 600,000 FCFA", maintenance: "50,000 FCFA / month", features: ["Free initial audit", "1 automated process", "Integration with your tools", "Full documentation", "30-day support"] },
        { name: "GROWTH", featured: true, desc: "For companies ready to industrialize their AI transformation.", fourchette: "800,000 – 1,500,000 FCFA", maintenance: "120,000 FCFA / month", features: ["Up to 5 automations", "1 dedicated AI agent", "Real-time analytics dashboard", "Unlimited integrations", "Priority 24/7 support", "Monthly optimization"] },
        { name: "ENTERPRISE", desc: "Full AI infrastructure for large organizations.", fourchette: "2,000,000+ FCFA", maintenance: "On request", features: ["Unlimited automations", "Multiple AI agents", "Dedicated architecture", "SLA & GDPR compliance", "On-site dedicated team", "Training & change management"] },
      ],
      quoteCta: "Request a quote →",
      faqTag: "FAQ", faqTitle: "Frequently asked questions", faqSub: "Everything you need to know before getting started.",
      faqs: [
        { q: "Why price ranges rather than fixed pricing?", a: "Because no project is the same. A transparent range lets you position yourself quickly, and the precise quote is established after the free audit — no surprises." },
        { q: "How long to deploy a first solution?", a: "For standard solutions: 48 to 72 hours. For custom projects, the first prototype is delivered in less than a week after architecture validation." },
        { q: "Do you need technical skills?", a: "Absolutely not. Our solutions are designed for your business teams with no technical expertise required. We provide full training, documentation and ongoing support." },
        { q: "Is my data secure?", a: "Yes. Your data remains in your infrastructure or in dedicated secure cloud environments. No third-party sharing." },
        { q: "Is the initial audit really free?", a: "Yes, with no conditions. We analyze your processes and deliver an opportunities report — whether you work with us afterward or not." },
        { q: "Is there support after deployment?", a: "Yes. All projects include post-deployment support. Performance monitoring, updates and continuous optimization guaranteed." },
      ],
    },
    contact: {
      tag: "Contact", title1: "Ready to automate", title2: "your future?",
      sub: "Get a free audit of your processes and discover your automation opportunities. Guaranteed response within 24 hours.",
      guarantees: ["Response within 24 business hours", "100% free initial audit", "No contractual commitment", "Clear and transparent quote"],
      guaranteesTitle: "OUR GUARANTEES",
      stepsTitle: "FROM REQUEST TO LIVE",
      steps: [
        ["01", "Free audit", "We analyze your processes and identify automation opportunities."],
        ["02", "Custom quote", "Tailored proposal with clear scope, timeline and deliverables."],
        ["03", "Design & Dev", "We build your solution. First prototype in 72 hours."],
        ["04", "Testing & QA", "Rigorous testing in your real environment. Zero bugs before launch."],
        ["05", "Deployment", "Go live on your infrastructure or cloud. Full handover."],
        ["06", "Live & optimized", "Monitoring, support and continuous optimization post-launch."],
      ],
      form: {
        prenom: "First name *", nom: "Last name", email: "Professional email *",
        entreprise: "Company *", pays: "Country", taille: "Company size",
        besoin: "What you want to automate *",
        prenomPh: "John", nomPh: "Smith", emailPh: "john@company.com",
        entreprisePh: "Your company name",
        paysList: ["Côte d'Ivoire", "Senegal", "Mali", "Burkina Faso", "Togo", "Benin", "Cameroon", "Other"],
        tailleList: ["1–10 employees", "11–50 employees", "51–200 employees", "200+ employees"],
        besoinPh: "Describe your processes, current tools, pain points...",
        submit: "SEND MY FREE AUDIT REQUEST →",
        loading: "SENDING...",
        error: "Please fill in all required fields (*).",
        privacy: "Your data is confidential and never shared.",
        successTitle: "Request sent!",
        successSub: "We'll get back to you within 24 hours with your personalized audit report.",
      },
    },
    footer: {
      tagline: "AI & Automation for businesses",
      copy1: "© 2026 NEXORA — by",
      copy1b: "Entreprenons Ensemble",
      copy1c: "· International",
      copy2: "AI · Automation · Custom Solutions · West Africa",
    },
  },
};

const CONFIG = {
  email: "contact@nexoraia.pro",
  phone: "+225 05 74 12 77 35",
  location: "Abidjan, Côte d'Ivoire",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{background:${G.black};color:${G.white};font-family:'DM Sans',sans-serif;font-weight:300;overflow-x:hidden;cursor:none}
  ::-webkit-scrollbar{width:4px}
  ::-webkit-scrollbar-track{background:${G.deep}}
  ::-webkit-scrollbar-thumb{background:${G.cyan};border-radius:2px}

  .cursor{position:fixed;width:10px;height:10px;background:${G.cyan};border-radius:50%;pointer-events:none;z-index:9999;mix-blend-mode:screen}
  .cursor-ring{position:fixed;width:36px;height:36px;border:1px solid ${G.cyanGlow};border-radius:50%;pointer-events:none;z-index:9998;transition:width .25s,height .25s}

  @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
  @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
  @keyframes scrollDrop{0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}50.01%{transform:scaleY(1);transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}
  @keyframes pageIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

  .page-enter{animation:pageIn .45s cubic-bezier(.16,1,.3,1) both}
  .reveal{opacity:0;transform:translateY(28px);transition:opacity .65s ease,transform .65s ease}
  .reveal.visible{opacity:1;transform:translateY(0)}
  .dot-pulse{width:6px;height:6px;background:${G.cyan};border-radius:50%;animation:pulse 2s infinite;display:inline-block}
  .scroll-line{width:1px;height:50px;background:linear-gradient(to bottom,${G.cyan},transparent);animation:scrollDrop 2s infinite}

  /* ── NAV ── */
  .nx-nav{position:fixed;top:0;left:0;right:0;z-index:900;display:flex;align-items:center;justify-content:space-between;padding:1.2rem 4rem;border-bottom:1px solid ${G.border};background:rgba(4,5,7,0.9);backdrop-filter:blur(20px)}
  .nx-nav-logo{font-family:'Syne',sans-serif;font-weight:800;font-size:1.4rem;letter-spacing:.12em;cursor:none}
  .nx-nav-links{display:flex;list-style:none}
  .nx-nav-link{font-family:'DM Sans',sans-serif;font-size:.875rem;letter-spacing:.06em;color:${G.muted};padding:.5rem 1.1rem;cursor:none;border-left:1px solid ${G.border};transition:color .2s,background .2s;white-space:nowrap}
  .nx-nav-link:last-child{border-right:1px solid ${G.border}}
  .nx-nav-link:hover{color:${G.white};background:rgba(56,189,248,0.04)}
  .nx-nav-link.active{color:${G.cyan}}
  .nx-nav-cta{padding:.55rem 1.3rem;border:1px solid ${G.cyan};color:${G.cyan};background:transparent;font-family:'DM Sans',sans-serif;font-size:.82rem;letter-spacing:.08em;cursor:none;transition:background .25s,color .25s;white-space:nowrap}
  .nx-nav-cta:hover{background:${G.cyan};color:${G.black}}
  .lang-switch{display:flex;border:1px solid ${G.border};overflow:hidden}
  .lang-btn{padding:.38rem .65rem;background:transparent;border:none;color:${G.muted};font-family:'Syne',sans-serif;font-size:.72rem;font-weight:700;letter-spacing:.08em;cursor:none;transition:background .2s,color .2s}
  .lang-btn.active{background:${G.cyan};color:${G.black}}

  .nx-burger{display:none;flex-direction:column;gap:5px;cursor:none;padding:.3rem}
  .nx-burger span{width:22px;height:2px;background:${G.white};transition:all .3s}
  .nx-mobile-menu{display:none;position:fixed;top:64px;left:0;right:0;background:rgba(4,5,7,0.98);border-bottom:1px solid ${G.border};padding:1rem;z-index:899;flex-direction:column}
  .nx-mobile-menu.open{display:flex}
  .nx-mobile-link{font-family:'DM Sans',sans-serif;font-size:.95rem;color:${G.muted};padding:.9rem 1rem;cursor:none;border-bottom:1px solid ${G.border};transition:color .2s}
  .nx-mobile-link:hover,.nx-mobile-link.active{color:${G.cyan}}

  /* ── SECTIONS ── */
  .nx-section{padding:6rem 4rem}
  .nx-page-header{padding:5rem 4rem 3rem;border-bottom:1px solid ${G.border}}
  .nx-section-tag{display:inline-block;font-size:.68rem;letter-spacing:.2em;color:${G.cyan};border-left:2px solid ${G.cyan};padding-left:.75rem;margin-bottom:1rem;text-transform:uppercase}
  .nx-h2{font-family:'Syne',sans-serif;font-size:clamp(1.8rem,4vw,3rem);font-weight:800;line-height:1.1;letter-spacing:-.02em;margin-bottom:.9rem}
  .nx-sub{color:${G.muted};font-size:1rem;line-height:1.7;max-width:520px;margin-bottom:3rem}

  /* ── BUTTONS ── */
  .btn-p{padding:.85rem 2rem;background:${G.cyan};color:${G.black};font-family:'Syne',sans-serif;font-weight:700;font-size:.88rem;letter-spacing:.06em;border:none;cursor:none;transition:box-shadow .25s,transform .2s}
  .btn-p:hover{box-shadow:0 0 36px ${G.cyanGlow};transform:translateY(-2px)}
  .btn-g{padding:.85rem 2rem;background:transparent;color:${G.white};font-family:'Syne',sans-serif;font-weight:600;font-size:.88rem;letter-spacing:.06em;border:1px solid ${G.border};cursor:none;transition:border-color .25s,color .25s}
  .btn-g:hover{border-color:${G.cyan};color:${G.cyan}}

  /* ── TABS ── */
  .tab-wrap{display:flex;border:1px solid ${G.border};border-top:none;background:${G.deep}}
  .tab-btn{padding:.75rem 2rem;background:transparent;border:none;color:${G.muted};font-family:'Syne',sans-serif;font-size:.8rem;font-weight:700;letter-spacing:.1em;cursor:none;transition:background .25s,color .25s;border-right:1px solid ${G.border};white-space:nowrap}
  .tab-btn:last-child{border-right:none}
  .tab-btn.active{background:${G.cyan};color:${G.black}}

  /* ── SERVICE CARDS ── */
  .svc-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:${G.border};border:1px solid ${G.border};width:100%}
  .svc-card{background:${G.deep};padding:2rem 1.8rem;position:relative;overflow:hidden;transition:background .3s;cursor:none;display:flex;flex-direction:column;min-height:260px;word-break:break-word}
  .svc-card:hover{background:${G.surface}}
  .svc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,${G.cyan},${G.accent});transform:scaleX(0);transition:transform .4s ease;transform-origin:left}
  .svc-card:hover::before{transform:scaleX(1)}
  .svc-icon{width:38px;height:38px;margin-bottom:1rem;color:${G.cyan};flex-shrink:0;display:block}
  .svc-title{font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;margin-bottom:.55rem;line-height:1.3;color:${G.white}}
  .svc-body{color:${G.muted};font-size:.82rem;line-height:1.65;flex:1;margin:0}
  .svc-tag{display:inline-block;margin-top:1rem;font-size:.6rem;letter-spacing:.1em;color:${G.accent};border:1px solid rgba(167,139,250,0.3);padding:.18rem .5rem}

  /* ── STD CARDS ── */
  .std-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:${G.border};border:1px solid ${G.border};width:100%}
  .std-card{background:${G.deep};padding:1.8rem;position:relative;overflow:hidden;transition:background .3s;cursor:none;display:flex;flex-direction:column;word-break:break-word}
  .std-card:hover{background:${G.surface}}
  .std-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,${G.accent},${G.cyan});transform:scaleX(0);transition:transform .4s ease;transform-origin:left}
  .std-card:hover::before{transform:scaleX(1)}
  .std-card.btp{background:linear-gradient(135deg,${G.deep} 0%,rgba(26,107,255,0.08) 100%)}
  .std-card.btp::before{background:linear-gradient(90deg,#f59e0b,#ef4444)}

  /* ── BTP BADGE ── */
  .btp-badge{display:inline-flex;align-items:center;gap:.4rem;font-size:.65rem;letter-spacing:.1em;padding:.28rem .7rem;background:linear-gradient(90deg,rgba(245,158,11,0.15),rgba(239,68,68,0.15));border:1px solid rgba(245,158,11,0.4);color:#f59e0b;margin-bottom:1rem;font-weight:700}

  /* ── SECTORS ── */
  .sector-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:${G.border};border:1px solid ${G.border}}
  .sector-card{background:${G.deep};padding:1.6rem 1.4rem;cursor:none;transition:background .3s}
  .sector-card:hover{background:${G.surface}}

  /* ── STEPS ── */
  .nx-step{background:${G.black};padding:2rem 1.5rem;transition:background .3s;cursor:none}
  .nx-step:hover{background:${G.surface}}

  /* ── WHY ITEMS ── */
  .why-item{display:flex;gap:1rem;align-items:flex-start;padding:1.2rem;border:1px solid transparent;transition:border-color .3s,background .3s;cursor:none}
  .why-item:hover{border-color:${G.border};background:${G.surface}}

  /* ── PLANS ── */
  .plan{background:${G.black};padding:2.2rem;transition:background .3s;cursor:none;display:flex;flex-direction:column}
  .plan:hover{background:${G.surface}}

  /* ── FAQ ── */
  .faq-item{border-bottom:1px solid ${G.border}}
  .faq-q{width:100%;background:none;border:none;color:${G.white};font-family:'Syne',sans-serif;font-size:.95rem;font-weight:700;text-align:left;padding:1.3rem 0;cursor:none;display:flex;justify-content:space-between;align-items:center;gap:1rem;transition:color .2s}
  .faq-q:hover{color:${G.cyan}}
  .faq-icon{color:${G.cyan};font-size:1.2rem;flex-shrink:0;transition:transform .3s;display:inline-block}
  .faq-icon.open{transform:rotate(45deg)}
  .faq-a{color:${G.muted};font-size:.88rem;line-height:1.75;max-height:0;overflow:hidden;transition:max-height .4s ease,padding .3s}
  .faq-a.open{max-height:400px;padding-bottom:1.3rem}

  /* ── FORM ── */
  .field{display:flex;flex-direction:column;gap:.4rem}
  .field label{font-size:.72rem;letter-spacing:.1em;color:${G.muted};text-transform:uppercase}
  .field input,.field textarea,.field select{background:${G.surface};border:1px solid ${G.border};color:${G.white};padding:.8rem 1rem;font-family:'DM Sans',sans-serif;font-size:.88rem;outline:none;transition:border-color .25s;resize:none;width:100%}
  .field input:focus,.field textarea:focus,.field select:focus{border-color:${G.cyan}}
  .field select option{background:${G.surface}}
  .plan-btn{width:100%;padding:.8rem;background:transparent;border:1px solid ${G.border};color:${G.white};font-family:'Syne',sans-serif;font-size:.82rem;font-weight:700;letter-spacing:.08em;cursor:none;transition:background .25s,border-color .25s,color .25s;margin-top:auto}
  .plan-btn:hover,.plan-featured .plan-btn{background:${G.cyan};border-color:${G.cyan};color:${G.black}}
  .form-submit{width:100%;padding:1rem;background:${G.cyan};border:none;color:${G.black};font-family:'Syne',sans-serif;font-weight:800;font-size:.88rem;letter-spacing:.08em;cursor:none;transition:box-shadow .25s,transform .2s}
  .form-submit:hover{box-shadow:0 0 36px ${G.cyanGlow};transform:translateY(-2px)}
  .form-submit:disabled{opacity:.6;transform:none}

  /* ── DEPLOY STEPS ── */
  .deploy-step{display:flex;gap:1.5rem;align-items:flex-start;padding:1.5rem;border:1px solid ${G.border};transition:background .3s;cursor:none;margin-bottom:1px}
  .deploy-step:hover{background:${G.surface}}
  .deploy-num{font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:${G.border};line-height:1;flex-shrink:0;min-width:48px;transition:color .3s}
  .deploy-step:hover .deploy-num{color:rgba(56,189,248,0.25)}

  /* ── FOOTER ── */
  .nx-footer{background:${G.black};border-top:1px solid ${G.border};padding:2.5rem 4rem}
  .nx-footer-top{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1.5rem;padding-bottom:1.5rem;border-bottom:1px solid ${G.border};margin-bottom:1.5rem}
  .nx-footer-logo{font-family:'Syne',sans-serif;font-weight:800;font-size:1.2rem;letter-spacing:.1em;cursor:none}
  .nx-footer-links{display:flex;gap:1.8rem;flex-wrap:wrap}
  .nx-footer-link{color:${G.muted};font-size:.78rem;letter-spacing:.06em;cursor:none;transition:color .2s}
  .nx-footer-link:hover{color:${G.white}}
  .nx-footer-bottom{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem}
  .nx-footer-copy{color:${G.muted};font-size:.72rem;letter-spacing:.05em}

  /* ── RESPONSIVE ── */
  @media(max-width:960px){
    .nx-nav{padding:1rem 1.5rem}
    .nx-nav-links{display:none}
    .nx-burger{display:flex}
    .nx-section{padding:4rem 1.5rem}
    .nx-page-header{padding:4rem 1.5rem 2.5rem}
    .nx-footer{padding:2rem 1.5rem}
    .nx-hero-inner{padding:6rem 1.5rem 3rem!important}
  }
  @media(max-width:760px){
    .nx-stats-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
    .svc-grid,.std-grid,.sector-grid{grid-template-columns:1fr!important}
    .nx-steps-grid,.nx-pricing-grid{grid-template-columns:1fr!important}
    .nx-why-grid,.about-split{grid-template-columns:1fr!important;gap:2rem!important}
    .nx-contact-grid{grid-template-columns:1fr!important;gap:2.5rem!important}
    .nx-form-row{grid-template-columns:1fr!important}
    .nx-cta-banner{flex-direction:column!important;align-items:flex-start!important}
    .nx-footer-top,.nx-footer-bottom{flex-direction:column;align-items:flex-start}
    .tab-wrap{flex-wrap:wrap}
    .tab-btn{flex:1;text-align:center;border-bottom:1px solid ${G.border}}
  }
  @media(max-width:480px){
    .nx-stats-grid{grid-template-columns:1fr!important}
    .nx-h2{font-size:1.6rem!important}
    .btn-p,.btn-g{width:100%;text-align:center}
  }
`;

// ── HELPERS ────────────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.classList.add("visible");
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Tag({ c }) { return <div className="nx-section-tag">{c}</div>; }
function H2({ c }) { return <h2 className="nx-h2">{c}</h2>; }

// ── CURSOR ────────────────────────────────────────────────────────────────────
function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  const mouse = useRef({ x: 0, y: 0 }), pos = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const move = e => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dot.current) { dot.current.style.left = e.clientX - 5 + "px"; dot.current.style.top = e.clientY - 5 + "px"; }
    };
    document.addEventListener("mousemove", move);
    let raf;
    const anim = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12;
      if (ring.current) { ring.current.style.left = pos.current.x - 18 + "px"; ring.current.style.top = pos.current.y - 18 + "px"; }
      raf = requestAnimationFrame(anim);
    };
    raf = requestAnimationFrame(anim);
    return () => { document.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return <><div className="cursor" ref={dot} /><div className="cursor-ring" ref={ring} /></>;
}

// ── NAV ───────────────────────────────────────────────────────────────────────
function Nav({ page, navigate, lang, setLang, t }) {
  const [open, setOpen] = useState(false);
  const navKeys = ["home", "services", "sectors", "about", "pricing", "contact"];
  const pageKeys = { home: "Home", services: "Services", sectors: "Sectors", about: "About", pricing: "Pricing", contact: "Contact" };
  const go = p => { navigate(p); setOpen(false); };
  return (
    <>
      <nav className="nx-nav">
        <div className="nx-nav-logo" onClick={() => go("Home")}>NEX<span style={{ color: G.cyan }}>ORA</span></div>
        <ul className="nx-nav-links">
          {navKeys.map(k => (
            <li key={k} className={`nx-nav-link${page === pageKeys[k] ? " active" : ""}`} onClick={() => go(pageKeys[k])}>
              {t.nav[k]}
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", gap: ".75rem", alignItems: "center" }}>
          <div className="lang-switch">
            <button className={`lang-btn${lang === "fr" ? " active" : ""}`} onClick={() => setLang("fr")}>FR</button>
            <button className={`lang-btn${lang === "en" ? " active" : ""}`} onClick={() => setLang("en")}>EN</button>
          </div>
          <button className="nx-nav-cta" onClick={() => go("Contact")}>{t.nav.cta}</button>
          <div className="nx-burger" onClick={() => setOpen(o => !o)}><span /><span /><span /></div>
        </div>
      </nav>
      <div className={`nx-mobile-menu${open ? " open" : ""}`}>
        {navKeys.map(k => (
          <div key={k} className={`nx-mobile-link${page === pageKeys[k] ? " active" : ""}`} onClick={() => go(pageKeys[k])}>
            {t.nav[k]}
          </div>
        ))}
        <div style={{ display: "flex", gap: ".5rem", padding: ".9rem 1rem", borderTop: `1px solid ${G.border}` }}>
          <button className={`lang-btn${lang === "fr" ? " active" : ""}`} style={{ border: `1px solid ${G.border}`, padding: ".4rem .8rem" }} onClick={() => setLang("fr")}>FR</button>
          <button className={`lang-btn${lang === "en" ? " active" : ""}`} style={{ border: `1px solid ${G.border}`, padding: ".4rem .8rem" }} onClick={() => setLang("en")}>EN</button>
        </div>
      </div>
    </>
  );
}

// ── PAGE ACCUEIL ──────────────────────────────────────────────────────────────
function PageAccueil({ navigate, t }) {
  const statRef = useRef(null);
  const [animated, setAnimated] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0]);
  const previewRef = useReveal();
  const sectorRef = useReveal();
  const s = t.hero;

  useEffect(() => {
    const el = statRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || animated) return;
      setAnimated(true); obs.disconnect();
      [90, 72, 98].forEach((target, i) => {
        let v = 0; const inc = target / 60;
        const timer = setInterval(() => {
          v += inc; if (v >= target) { v = target; clearInterval(timer); }
          setCounts(p => { const n = [...p]; n[i] = Math.round(v); return n; });
        }, 25);
      });
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [animated]);

  const sectorsPrev = [
    { icon: "🛒", label: t.lang === "en" ? "Retail & Distribution" : "Commerce & Distribution", pain: t.lang === "en" ? "Orders, follow-ups, billing" : "Suivi commandes, relances, facturation" },
    { icon: "🏥", label: t.lang === "en" ? "Healthcare" : "Santé & Cliniques", pain: t.lang === "en" ? "Appointments, records, reminders" : "Gestion RDV, dossiers, rappels" },
    { icon: "🏗️", label: "BTP & Construction", pain: t.lang === "en" ? "Quotes, site management, logistics" : "Devis, chantier, logistique" },
    { icon: "🏦", label: t.lang === "en" ? "Finance & Insurance" : "Finance & Assurance", pain: t.lang === "en" ? "KYC, reporting, risk scoring" : "KYC, reporting, scoring risque" },
  ];

  return (
    <div className="page-enter">
      <section className="nx-hero-inner" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "8rem 4rem 4rem", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${G.border} 1px,transparent 1px),linear-gradient(90deg,${G.border} 1px,transparent 1px)`, backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%,black 40%,transparent 100%)" }} />
        <div style={{ position: "absolute", width: 600, height: 600, background: "radial-gradient(circle,rgba(56,189,248,0.08) 0%,transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 900, width: "100%" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", border: `1px solid ${G.border}`, padding: ".32rem 1rem", fontSize: ".72rem", letterSpacing: ".15em", color: G.cyan, marginBottom: "1.8rem", animation: "fadeUp .8s ease both", flexWrap: "wrap", justifyContent: "center" }}>
            <span className="dot-pulse" />&nbsp;{s.pill}
          </div>
          <h1 style={{ fontFamily: "Syne,sans-serif", fontSize: "clamp(2.5rem,7vw,6rem)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-.02em", marginBottom: "1.5rem", animation: "fadeUp .8s .1s ease both" }}>
            {s.title1}<br />
            <span style={{ background: "linear-gradient(135deg,#38bdf8,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.titleGrad}</span><br />
            {s.title2}
          </h1>
          <p style={{ fontSize: "clamp(.95rem,2vw,1.15rem)", color: G.muted, maxWidth: 580, margin: "0 auto 3rem", lineHeight: 1.75, animation: "fadeUp .8s .2s ease both" }}>{s.sub}</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", animation: "fadeUp .8s .3s ease both" }}>
            <button className="btn-p" onClick={() => navigate("Contact")}>{s.cta1}</button>
            <button className="btn-g" onClick={() => navigate("Services")}>{s.cta2}</button>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: ".5rem", color: G.muted, fontSize: ".68rem", letterSpacing: ".12em", animation: "fadeUp 1s .6s ease both" }}>
          <div className="scroll-line" /><span>{s.scroll}</span>
        </div>
      </section>

      <div ref={statRef} className="nx-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", borderTop: `1px solid ${G.border}`, borderBottom: `1px solid ${G.border}` }}>
        {t.stats.map(([val, label, sub], i) => {
          const display = i === 0 ? `–${counts[0]}%` : i === 1 ? `${counts[1]}h` : i === 2 ? `${counts[2]}%` : val;
          return (
            <div key={i} style={{ padding: "2.2rem", borderRight: i < 3 ? `1px solid ${G.border}` : "none", transition: "background .3s" }}
              onMouseEnter={e => e.currentTarget.style.background = G.cyanDim}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <span style={{ fontFamily: "Syne,sans-serif", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 800, color: G.cyan, display: "block" }}>{display}</span>
              <span style={{ color: G.white, fontSize: ".85rem", display: "block", marginBottom: ".2rem" }}>{label}</span>
              <span style={{ color: G.muted, fontSize: ".72rem", fontStyle: "italic" }}>{sub}</span>
            </div>
          );
        })}
      </div>

      <section className="nx-section" style={{ background: G.black, paddingBottom: "3rem" }}>
        <Tag c={t.sectorsPreview.tag} />
        <H2 c={<>{t.sectorsPreview.title1}<br />{t.sectorsPreview.title2}</>} />
        <p className="nx-sub">{t.sectorsPreview.sub}</p>
        <div ref={sectorRef} className="reveal sector-grid" style={{ marginBottom: "2rem" }}>
          {sectorsPrev.map((s, i) => (
            <div key={i} className="sector-card">
              <div style={{ fontSize: "1.8rem", marginBottom: ".7rem" }}>{s.icon}</div>
              <div style={{ fontFamily: "Syne,sans-serif", fontSize: ".95rem", fontWeight: 700, marginBottom: ".4rem" }}>{s.label}</div>
              <div style={{ color: G.muted, fontSize: ".8rem", lineHeight: 1.6 }}>{s.pain}</div>
            </div>
          ))}
        </div>
        <button className="btn-g" onClick={() => navigate("Sectors")}>{t.sectorsPreview.more}</button>
      </section>

      <section className="nx-section" style={{ background: G.deep }}>
        <Tag c={t.servicesPreview.tag} />
        <H2 c={<>{t.servicesPreview.title1}<br />{t.servicesPreview.title2}</>} />
        <p className="nx-sub">{t.servicesPreview.sub}</p>
        <div ref={previewRef} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "1px", background: G.border, border: `1px solid ${G.border}`, marginBottom: "2.5rem" }}>
          {t.servicesPreview.items.map(([n, title, desc], i) => (
            <div key={i} style={{ background: G.deep, padding: "2rem 1.8rem", transition: "background .3s", cursor: "none" }}
              onMouseEnter={e => e.currentTarget.style.background = G.surface}
              onMouseLeave={e => e.currentTarget.style.background = G.deep}>
              <div style={{ fontFamily: "Syne,sans-serif", fontSize: ".65rem", letterSpacing: ".15em", color: G.cyan, marginBottom: ".7rem" }}>{n}</div>
              <h3 style={{ fontFamily: "Syne,sans-serif", fontSize: "1rem", fontWeight: 700, marginBottom: ".5rem" }}>{title}</h3>
              <p style={{ color: G.muted, fontSize: ".82rem", lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
        <button className="btn-g" onClick={() => navigate("Services")}>{t.servicesPreview.more}</button>
      </section>

      <div className="nx-cta-banner" style={{ background: G.surface, borderBottom: `1px solid ${G.border}`, padding: "2.5rem 4rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem" }}>
        <div>
          <div style={{ fontFamily: "Syne,sans-serif", fontSize: "clamp(1.1rem,2.5vw,1.5rem)", fontWeight: 800, marginBottom: ".4rem" }}>{t.banner.title}</div>
          <p style={{ color: G.muted, fontSize: ".88rem" }}>{t.banner.sub}</p>
        </div>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button className="btn-p" onClick={() => navigate("Contact")}>{t.banner.cta1}</button>
          <button className="btn-g" onClick={() => navigate("Services")}>{t.banner.cta2}</button>
        </div>
      </div>
    </div>
  );
}

// ── PAGE SERVICES ─────────────────────────────────────────────────────────────
const SVC_ICONS = [
  <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />,
  <path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
  <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />,
  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
  <path d="M13 10V3L4 14h7v7l9-11h-7z" />,
  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
];

function PageServices({ navigate, t }) {
  const [tab, setTab] = useState("custom");
  const gridRef = useReveal();
  const ts = t.services;
  return (
    <div className="page-enter">
      <div className="nx-page-header" style={{ background: G.deep }}>
        <Tag c={ts.tag} />
        <H2 c={<>{ts.title1}<br />{ts.title2}</>} />
        <p style={{ color: G.muted, fontSize: "1rem", lineHeight: 1.7, maxWidth: 560 }}>{ts.sub}</p>
      </div>
      <div className="tab-wrap">
        <button className={`tab-btn${tab === "custom" ? " active" : ""}`} onClick={() => setTab("custom")}>{ts.tab1}</button>
        <button className={`tab-btn${tab === "standard" ? " active" : ""}`} onClick={() => setTab("standard")}>{ts.tab2}</button>
      </div>
      <section className="nx-section" style={{ background: G.deep, paddingTop: "3rem" }}>
        {tab === "custom" ? (
          <div ref={gridRef} className="reveal svc-grid">
            {t.svcs.map((s, i) => (
              <div key={i} className="svc-card">
                <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{SVC_ICONS[i]}</svg>
                <div className="svc-title">{s.title}</div>
                <p className="svc-body">{s.desc}</p>
                <span className="svc-tag">{s.tag}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="std-grid">
            {t.std.map((s, i) => (
              <div key={i} className={`std-card${s.isBtp ? " btp" : ""}`}>
                {s.isBtp ? (
                  <div className="btp-badge">🏗 BTP MANAGER</div>
                ) : (
                  <span style={{ display: "inline-block", fontSize: ".62rem", letterSpacing: ".12em", padding: ".2rem .55rem", border: `1px solid rgba(167,139,250,0.4)`, color: G.accent, marginBottom: "1rem" }}>{s.badge}</span>
                )}
                <h3 style={{ fontFamily: "Syne,sans-serif", fontSize: s.isBtp ? "1.15rem" : "1.05rem", fontWeight: 700, marginBottom: ".55rem", color: s.isBtp ? G.white : G.white }}>{s.title}</h3>
                {s.isBtp && <div style={{ fontSize: ".62rem", letterSpacing: ".1em", color: "#f59e0b", marginBottom: ".7rem", textTransform: "uppercase" }}>Logiciel de gestion BTP complet</div>}
                <p style={{ color: G.muted, fontSize: ".83rem", lineHeight: 1.65, marginBottom: "1.2rem", flex: 1 }}>{s.desc}</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".45rem", marginBottom: "1.3rem", paddingTop: ".9rem", borderTop: `1px solid ${G.border}` }}>
                  {s.features.map((f, j) => (
                    <li key={j} style={{ display: "flex", gap: ".45rem", alignItems: "center", fontSize: ".8rem", color: G.muted }}>
                      <span style={{ color: s.isBtp ? "#f59e0b" : G.cyan, fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <button style={{ background: "none", border: "none", color: s.isBtp ? "#f59e0b" : G.cyan, fontFamily: "Syne,sans-serif", fontSize: ".78rem", fontWeight: 700, letterSpacing: ".08em", cursor: "none", padding: 0, textAlign: "left" }} onClick={() => navigate("Contact")}>{ts.quoteCta}</button>
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: `1px solid ${G.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ color: G.muted, fontStyle: "italic", fontSize: ".92rem" }}>{ts.notSure}</p>
          <button className="btn-p" onClick={() => navigate("Contact")}>{ts.auditCta}</button>
        </div>
      </section>
    </div>
  );
}

// ── PAGE SECTEURS ─────────────────────────────────────────────────────────────
function PageSecteurs({ navigate, t }) {
  const gridRef = useReveal();
  const ts = t.sectors;
  return (
    <div className="page-enter">
      <div className="nx-page-header" style={{ background: G.deep }}>
        <Tag c={ts.tag} />
        <H2 c={<>{ts.title1}<br />{ts.title2}</>} />
        <p style={{ color: G.muted, fontSize: "1rem", lineHeight: 1.7, maxWidth: 560 }}>{ts.sub}</p>
      </div>
      <section className="nx-section" style={{ background: G.black }}>
        <div ref={gridRef} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "1px", background: G.border, border: `1px solid ${G.border}` }}>
          {ts.items.map((s, i) => (
            <div key={i} style={{ background: G.deep, padding: "2.2rem", transition: "background .3s", cursor: "none" }}
              onMouseEnter={e => e.currentTarget.style.background = G.surface}
              onMouseLeave={e => e.currentTarget.style.background = G.deep}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.2rem" }}>
                <span style={{ fontSize: "2rem" }}>{s.icon}</span>
                <h3 style={{ fontFamily: "Syne,sans-serif", fontSize: "1.05rem", fontWeight: 700 }}>{s.titre}</h3>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <div style={{ fontSize: ".65rem", letterSpacing: ".12em", color: G.muted, marginBottom: ".6rem", textTransform: "uppercase" }}>{ts.problems}</div>
                  {s.douleurs.map((d, j) => (
                    <div key={j} style={{ display: "flex", gap: ".5rem", alignItems: "flex-start", color: G.muted, fontSize: ".8rem", marginBottom: ".4rem" }}>
                      <span style={{ color: "#ef4444", flexShrink: 0 }}>✕</span>{d}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: ".65rem", letterSpacing: ".12em", color: G.cyan, marginBottom: ".6rem", textTransform: "uppercase" }}>{ts.solutions}</div>
                  {s.solutions.map((sol, j) => (
                    <div key={j} style={{ display: "flex", gap: ".5rem", alignItems: "flex-start", color: G.muted, fontSize: ".8rem", marginBottom: ".4rem" }}>
                      <span style={{ color: G.cyan, flexShrink: 0 }}>→</span>{sol}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "3rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button className="btn-p" onClick={() => navigate("Contact")}>{ts.cta1}</button>
          <button className="btn-g" onClick={() => navigate("Services")}>{ts.cta2}</button>
        </div>
      </section>
    </div>
  );
}

// ── PAGE À PROPOS ─────────────────────────────────────────────────────────────
const WHY_ICONS = [
  <path d="M13 10V3L4 14h7v7l9-11h-7z" />,
  <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />,
];
const NODES = [
  { top: "20%", left: "20%", d: 0, c: G.cyan }, { top: "50%", left: "50%", d: 1, c: G.accent },
  { top: "70%", left: "30%", d: .5, c: G.cyan }, { top: "30%", left: "75%", d: 2, c: G.accent },
  { top: "65%", left: "68%", d: 1.5, c: G.cyan }, { top: "15%", left: "52%", d: .3, c: G.cyan },
];

function PageApropos({ navigate, t }) {
  const whyRef = useReveal();
  const stepsRef = useReveal();
  const ta = t.about;
  return (
    <div className="page-enter">
      <div className="nx-page-header" style={{ background: G.deep }}>
        <Tag c={ta.tag} />
        <H2 c={<>{ta.title1}<br />{ta.title2}</>} />
        <p style={{ color: G.muted, fontSize: "1rem", lineHeight: 1.7, maxWidth: 560 }}>{ta.sub}</p>
      </div>
      <section className="nx-section" style={{ background: G.black }}>
        <div className="about-split" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "5rem", alignItems: "center" }}>
          <div style={{ position: "relative", height: 420, border: `1px solid ${G.border}`, overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 30% 50%,rgba(56,189,248,0.1) 0%,transparent 60%),radial-gradient(circle at 70% 50%,rgba(167,139,250,0.08) 0%,transparent 60%)` }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(56,189,248,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.06) 1px,transparent 1px)`, backgroundSize: "40px 40px" }} />
            {NODES.map((n, i) => <div key={i} style={{ position: "absolute", width: 9, height: 9, borderRadius: "50%", background: n.c, boxShadow: `0 0 12px ${n.c}80`, top: n.top, left: n.left, animation: `floatY 4s ease-in-out ${n.d}s infinite` }} />)}
            <div style={{ position: "absolute", bottom: "2rem", left: "2rem", right: "2rem" }}>
              <p style={{ fontFamily: "Syne,sans-serif", fontSize: ".95rem", fontStyle: "italic", color: G.muted, lineHeight: 1.6, borderLeft: `2px solid ${G.cyan}`, paddingLeft: "1rem" }}>
                {ta.quote.split("\n").map((line, i) => <span key={i}>{line}<br /></span>)}
              </p>
            </div>
          </div>
          <div ref={whyRef} className="reveal" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {ta.why.map((w, i) => (
              <div key={i} className="why-item">
                <div style={{ width: 34, height: 34, flexShrink: 0, display: "grid", placeItems: "center", background: G.cyanDim, color: G.cyan }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{WHY_ICONS[i]}</svg>
                </div>
                <div>
                  <h4 style={{ fontFamily: "Syne,sans-serif", fontSize: ".95rem", fontWeight: 700, marginBottom: ".25rem" }}>{w.t}</h4>
                  <p style={{ color: G.muted, fontSize: ".83rem", lineHeight: 1.6 }}>{w.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="nx-section" style={{ background: G.deep }}>
        <Tag c={ta.methodTag} />
        <H2 c={<>{ta.methodTitle1}<br />{ta.methodTitle2}</>} />
        <p className="nx-sub">{ta.methodSub}</p>
        <div ref={stepsRef} className="reveal nx-steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "1px", background: G.border, border: `1px solid ${G.border}` }}>
          {ta.steps.map(([n, title, desc], i) => (
            <div key={i} className="nx-step">
              <div style={{ fontFamily: "Syne,sans-serif", fontSize: "3rem", fontWeight: 800, color: G.border, lineHeight: 1, marginBottom: ".8rem" }}>{n}</div>
              <h3 style={{ fontFamily: "Syne,sans-serif", fontSize: ".95rem", fontWeight: 700, marginBottom: ".45rem" }}>{title}</h3>
              <p style={{ color: G.muted, fontSize: ".82rem", lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <div style={{ background: G.surface, padding: "2.5rem 4rem", borderTop: `1px solid ${G.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <p style={{ fontFamily: "Syne,sans-serif", fontSize: "clamp(1rem,2.5vw,1.3rem)", fontWeight: 700 }}>{ta.ctaTitle}</p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button className="btn-p" onClick={() => navigate("Contact")}>{ta.cta1}</button>
          <button className="btn-g" onClick={() => navigate("Services")}>{ta.cta2}</button>
        </div>
      </div>
    </div>
  );
}

// ── PAGE TARIFS ───────────────────────────────────────────────────────────────
function PageTarifs({ navigate, t }) {
  const [open, setOpen] = useState(null);
  const plansRef = useReveal();
  const tp = t.pricing;
  return (
    <div className="page-enter">
      <div className="nx-page-header" style={{ background: G.deep }}>
        <Tag c={tp.tag} />
        <H2 c={<>{tp.title1}<br />{tp.title2}</>} />
        <p style={{ color: G.muted, fontSize: "1rem", lineHeight: 1.7, maxWidth: 520 }}>{tp.sub}</p>
      </div>
      <section className="nx-section" style={{ background: G.black }}>
        <div ref={plansRef} className="reveal nx-pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "1px", background: G.border, border: `1px solid ${G.border}`, marginBottom: "5rem" }}>
          {tp.plans.map((p, i) => (
            <div key={i} className={`plan${p.featured ? " plan-featured" : ""}`}
              style={p.featured ? { background: G.surface, border: `1px solid ${G.cyan}`, margin: "-1px", zIndex: 2, padding: "2.2rem" } : {}}>
              {p.featured && <span style={{ display: "inline-block", fontSize: ".62rem", letterSpacing: ".15em", padding: ".22rem .7rem", background: G.cyan, color: G.black, fontWeight: 700, marginBottom: "1.3rem" }}>{tp.recommended}</span>}
              <div style={{ fontFamily: "Syne,sans-serif", fontSize: ".75rem", letterSpacing: ".15em", color: G.muted, marginBottom: ".4rem" }}>{p.name}</div>
              <div style={{ fontFamily: "Syne,sans-serif", fontSize: "1.2rem", fontWeight: 800, marginBottom: ".1rem", color: G.cyan }}>{p.fourchette}</div>
              <div style={{ color: G.muted, fontSize: ".78rem", marginBottom: ".3rem" }}>+ {p.maintenance}</div>
              <p style={{ color: G.muted, fontSize: ".82rem", marginBottom: "1.8rem", marginTop: ".5rem" }}>{p.desc}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".65rem", marginBottom: "1.8rem", flex: 1 }}>
                {p.features.map((f, j) => <li key={j} style={{ display: "flex", gap: ".55rem", alignItems: "center", color: G.muted, fontSize: ".83rem" }}><span style={{ color: G.cyan, flexShrink: 0 }}>→</span>{f}</li>)}
              </ul>
              <button className="plan-btn" onClick={() => navigate("Contact")}>{tp.quoteCta}</button>
            </div>
          ))}
        </div>
        <Tag c={tp.faqTag} />
        <H2 c={tp.faqTitle} />
        <p className="nx-sub">{tp.faqSub}</p>
        <div style={{ maxWidth: 780 }}>
          {tp.faqs.map((f, i) => (
            <div key={i} className="faq-item">
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                <span>{f.q}</span><span className={`faq-icon${open === i ? " open" : ""}`}>+</span>
              </button>
              <div className={`faq-a${open === i ? " open" : ""}`}>{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── PAGE CONTACT ──────────────────────────────────────────────────────────────
function PageContact({ navigate, t }) {
  const [form, setForm] = useState({ prenom: "", nom: "", email: "", entreprise: "", pays: "", taille: "", besoin: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const formRef = useReveal();
  const tc = t.contact;
  const f = tc.form;

  const handleChange = (field, val) => setForm(prev => ({ ...prev, [field]: val }));

  const handleSubmit = async () => {
    if (!form.prenom || !form.email || !form.entreprise || !form.besoin) {
      setError(f.error); return;
    }
    setError(""); setLoading(true);
    // const WEBHOOK = "https://ton-n8n.com/webhook/nexora-contact";
    // await fetch(WEBHOOK, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(form) });
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <div className="page-enter">
      <div className="nx-page-header" style={{ background: G.deep }}>
        <Tag c={tc.tag} />
        <H2 c={<>{tc.title1}<br />{tc.title2}</>} />
        <p style={{ color: G.muted, fontSize: "1rem", lineHeight: 1.7, maxWidth: 520 }}>{tc.sub}</p>
      </div>
      <section className="nx-section" style={{ background: G.black }}>
        <div className="nx-contact-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr)", gap: "5rem", alignItems: "start" }}>
          <div>
            <div style={{ marginBottom: "2.5rem" }}>
              {[["✉", CONFIG.email], ["☎", CONFIG.phone], ["◎", CONFIG.location]].map(([ic, val]) => (
                <div key={val} style={{ display: "flex", alignItems: "center", gap: ".75rem", color: G.muted, fontSize: ".88rem", padding: "1rem 0", borderBottom: `1px solid ${G.border}` }}>
                  <span style={{ color: G.cyan, width: 20, flexShrink: 0, textAlign: "center" }}>{ic}</span>{val}
                </div>
              ))}
            </div>
            <div style={{ background: G.surface, border: `1px solid ${G.border}`, padding: "1.5rem", marginBottom: "2rem" }}>
              <div style={{ fontFamily: "Syne,sans-serif", fontSize: ".7rem", letterSpacing: ".15em", color: G.cyan, marginBottom: "1rem" }}>{tc.guaranteesTitle}</div>
              {tc.guarantees.map((g, i) => (
                <div key={i} style={{ display: "flex", gap: ".7rem", alignItems: "center", color: G.muted, fontSize: ".83rem", marginBottom: ".55rem" }}>
                  <span style={{ color: G.cyan, fontSize: ".65rem", flexShrink: 0 }}>◆</span>{g}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: "Syne,sans-serif", fontSize: ".7rem", letterSpacing: ".15em", color: G.cyan, marginBottom: "1rem" }}>{tc.stepsTitle}</div>
              {tc.steps.map(([n, title, desc], i) => (
                <div key={i} className="deploy-step">
                  <div className="deploy-num">{n}</div>
                  <div>
                    <h4 style={{ fontFamily: "Syne,sans-serif", fontSize: ".9rem", fontWeight: 700, marginBottom: ".2rem" }}>{title}</h4>
                    <p style={{ color: G.muted, fontSize: ".78rem", lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div ref={formRef} className="reveal">
            {sent ? (
              <div style={{ padding: "3rem", background: G.surface, border: `1px solid ${G.cyan}`, textAlign: "center" }}>
                <div style={{ color: G.cyan, fontSize: "2.5rem", marginBottom: "1rem" }}>✓</div>
                <p style={{ fontFamily: "Syne,sans-serif", fontSize: "1.2rem", fontWeight: 700, marginBottom: ".5rem" }}>{f.successTitle}</p>
                <p style={{ color: G.muted, fontSize: ".9rem" }}>{f.successSub}</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="nx-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="field"><label>{f.prenom}</label><input type="text" placeholder={f.prenomPh} value={form.prenom} onChange={e => handleChange("prenom", e.target.value)} /></div>
                  <div className="field"><label>{f.nom}</label><input type="text" placeholder={f.nomPh} value={form.nom} onChange={e => handleChange("nom", e.target.value)} /></div>
                </div>
                <div className="field"><label>{f.email}</label><input type="email" placeholder={f.emailPh} value={form.email} onChange={e => handleChange("email", e.target.value)} /></div>
                <div className="field"><label>{f.entreprise}</label><input type="text" placeholder={f.entreprisePh} value={form.entreprise} onChange={e => handleChange("entreprise", e.target.value)} /></div>
                <div className="nx-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="field">
                    <label>{f.pays}</label>
                    <select value={form.pays} onChange={e => handleChange("pays", e.target.value)}>
                      <option value="">—</option>
                      {f.paysList.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label>{f.taille}</label>
                    <select value={form.taille} onChange={e => handleChange("taille", e.target.value)}>
                      <option value="">—</option>
                      {f.tailleList.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label>{f.besoin}</label>
                  <textarea placeholder={f.besoinPh} style={{ height: 130 }} value={form.besoin} onChange={e => handleChange("besoin", e.target.value)} />
                </div>
                {error && <div style={{ color: "#ef4444", fontSize: ".82rem", padding: ".6rem 1rem", border: "1px solid rgba(239,68,68,.3)", background: "rgba(239,68,68,.06)" }}>{error}</div>}
                <button className="form-submit" onClick={handleSubmit} disabled={loading}>
                  {loading ? f.loading : f.submit}
                </button>
                <p style={{ color: G.muted, fontSize: ".72rem", textAlign: "center" }}>{f.privacy}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({ navigate, t, lang }) {
  const navKeys = { Home: t.nav.home, Services: t.nav.services, Sectors: t.nav.sectors, About: t.nav.about, Pricing: t.nav.pricing, Contact: t.nav.contact };
  const tf = t.footer;
  return (
    <footer className="nx-footer">
      <div className="nx-footer-top">
        <div>
          <div className="nx-footer-logo" style={{ marginBottom: ".5rem" }} onClick={() => navigate("Home")}>
            NEX<span style={{ color: G.cyan }}>ORA</span>
          </div>
          <div style={{ color: G.muted, fontSize: ".75rem" }}>{tf.tagline}</div>
        </div>
        <div className="nx-footer-links">
          {Object.entries(navKeys).map(([key, label]) => (
            <span key={key} className="nx-footer-link" onClick={() => navigate(key)}>{label}</span>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
          <div style={{ color: G.muted, fontSize: ".78rem" }}>{CONFIG.email}</div>
          <div style={{ color: G.muted, fontSize: ".78rem" }}>{CONFIG.phone}</div>
          <div style={{ color: G.muted, fontSize: ".78rem" }}>{CONFIG.location}</div>
        </div>
      </div>
      <div className="nx-footer-bottom">
        <p className="nx-footer-copy">{tf.copy1} <strong style={{ color: G.white }}>{tf.copy1b}</strong> {tf.copy1c}</p>
        <p className="nx-footer-copy">{tf.copy2}</p>
      </div>
    </footer>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const [key, setKey] = useState(0);
  const [lang, setLang] = useState("fr");
  const t = { ...LANG[lang], lang };

  const navigate = p => { setPage(p); setKey(k => k + 1); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const pages = {
    Home:     <PageAccueil navigate={navigate} t={t} />,
    Services: <PageServices navigate={navigate} t={t} />,
    Sectors:  <PageSecteurs navigate={navigate} t={t} />,
    About:    <PageApropos navigate={navigate} t={t} />,
    Pricing:  <PageTarifs navigate={navigate} t={t} />,
    Contact:  <PageContact navigate={navigate} t={t} />,
  };

  return (
    <>
      <style>{css}</style>
      <Cursor />
      <Nav page={page} navigate={navigate} lang={lang} setLang={setLang} t={t} />
      <div style={{ background: G.black, minHeight: "100vh", paddingTop: "68px" }} key={key}>
        {pages[page] ?? pages["Home"]}
        <Footer navigate={navigate} t={t} lang={lang} />
      </div>
    </>
  );
}
