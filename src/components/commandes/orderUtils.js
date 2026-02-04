export const initialOrders = [
  {
    id: "ORD-20260116-ABC",
    client: "Mohamed Ali",
    montant: "45.50 DT",
    statut: "En Cours",
    date: "2026-01-16",
    email: "mohamed.ali@example.com",
    telephone: "55123456",
    adresse: "Avenue Habib Bourguiba, Tunis",
    produits: [
      { nom: "Produit A", quantite: 2, prix: "15.00 DT" },
      { nom: "Produit B", quantite: 1, prix: "15.50 DT" },
    ],
    notes: "Livraison avant 14h",
  },
  {
    id: "ORD-20260116-DEF",
    client: "Fatma Ben Salah",
    montant: "120.00 DT",
    statut: "Terminée",
    date: "2026-01-16",
    email: "fatma.bensalah@example.com",
    telephone: "98123456",
    adresse: "Rue de la Liberté, Sfax",
    produits: [
      { nom: "Produit C", quantite: 3, prix: "30.00 DT" },
      { nom: "Produit D", quantite: 1, prix: "30.00 DT" },
    ],
    notes: "Client fidèle",
  },
  {
    id: "ORD-20260115-GHI",
    client: "Ahmed Trabelsi",
    montant: "78.25 DT",
    statut: "En Attente",
    date: "2026-01-15",
    email: "ahmed.trabelsi@example.com",
    telephone: "23123456",
    adresse: "Avenue Mohamed V, Bizerte",
    produits: [{ nom: "Produit E", quantite: 5, prix: "15.65 DT" }],
    notes: "À préparer rapidement",
  },
];

export const initialFormData = {
  client: "",
  montant: "",
  statut: "En Attente",
  email: "",
  telephone: "",
  adresse: "",
  notes: "",
};

export const generateOrderId = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `ORD-${year}${month}${day}-${random}`;
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone) => {
  const phoneRegex = /^\d{8}$/;
  return phoneRegex.test(phone);
};

export const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length > 8 ? cleaned.substring(0, 8) : cleaned;
};

export const validateForm = (formData) => {
  const errors = {};

  if (!formData.client.trim()) {
    errors.client = "Le nom du client est requis";
  } else if (formData.client.length < 2) {
    errors.client = "Le nom doit contenir au moins 2 caractères";
  }

  if (!formData.montant) {
    errors.montant = "Le montant est requis";
  } else if (parseFloat(formData.montant) <= 0) {
    errors.montant = "Le montant doit être supérieur à 0";
  }

  if (formData.email && !isValidEmail(formData.email)) {
    errors.email = "Format d'email invalide";
  }

  if (formData.telephone && !isValidPhone(formData.telephone)) {
    errors.telephone = "Le téléphone doit contenir exactement 8 chiffres";
  }

  return errors;
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getStatusIcon = (statut) => {
  switch (statut) {
    case "Terminée":
      return <CheckCircle className="w-4 h-4" />;
    case "En Cours":
      return <Clock className="w-4 h-4" />;
    case "En Attente":
      return <AlertCircle className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};
