/**
 * script-pain.js
 * AMM — Landing Page "Point de douleur"
 * Préqualification projet centrale à béton
 */

const CONFIG = {
  // Remplacez par votre URL Google Apps Script.
  // Laissez vide pendant vos tests si vous ne souhaitez pas encore envoyer les leads.
  GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwbpz4bJaI2cz6JJjtSYPI8rU-5ooicBmp8Y9MOHERNhxs9nOcsA4sGax554aa_Mqiz/exec'
};

/* ================================================================
   HERO SLIDER
================================================================ */

(function initHeroSlider() {

  const slides =
    document.querySelectorAll('.slide');


  const dots =
    document.querySelectorAll('.s-dot');


  const prevButton =
    document.getElementById('s-prev');


  const nextButton =
    document.getElementById('s-next');


  const progressBar =
    document.getElementById('prog-bar');


  const hero =
    document.getElementById('accueil');


  if (!slides.length) return;


  /* Durée de chaque image */

  const SLIDE_DURATION = 5500;


  let current = 0;

  let autoplay = null;


  /* ================================================================
     AFFICHER UNE SLIDE
  ================================================================ */

  function goTo(index) {

    /* Retirer slide actuelle */

    slides[current]
      .classList
      .remove('on');


    if (dots[current]) {

      dots[current]
        .classList
        .remove('s-dot-on');

    }


    /* Calcul nouvel index */

    current =
      (
        index +
        slides.length
      )
      %
      slides.length;


    /* Afficher nouvelle slide */

    slides[current]
      .classList
      .add('on');


    if (dots[current]) {

      dots[current]
        .classList
        .add('s-dot-on');

    }


    resetProgress();

  }


  /* ================================================================
     BARRE DE PROGRESSION
  ================================================================ */

  function resetProgress() {

    if (!progressBar) return;


    progressBar.style.transition =
      'none';


    progressBar.style.width =
      '0%';


    /*
     * Force navigateur
     * à recalculer le layout
     */

    void progressBar.offsetWidth;


    progressBar.style.transition =
      `width ${SLIDE_DURATION}ms linear`;


    progressBar.style.width =
      '100%';

  }


  /* ================================================================
     AUTOPLAY
  ================================================================ */

  function startAutoplay() {

    clearInterval(
      autoplay
    );


    autoplay =
      setInterval(
        () => {

          goTo(
            current + 1
          );

        },

        SLIDE_DURATION

      );

  }


  /* ================================================================
     BOUTON PRÉCÉDENT
  ================================================================ */

  if (prevButton) {

    prevButton.addEventListener(
      'click',
      () => {

        goTo(
          current - 1
        );


        startAutoplay();

      }
    );

  }


  /* ================================================================
     BOUTON SUIVANT
  ================================================================ */

  if (nextButton) {

    nextButton.addEventListener(
      'click',
      () => {

        goTo(
          current + 1
        );


        startAutoplay();

      }
    );

  }


  /* ================================================================
     DOTS
  ================================================================ */

  dots.forEach(dot => {

    dot.addEventListener(
      'click',
      () => {

        const target =
          parseInt(
            dot.dataset.to,
            10
          );


        if (
          target !== current
        ) {

          goTo(target);

          startAutoplay();

        }

      }
    );

  });


  /* ================================================================
     CLAVIER
  ================================================================ */

  document.addEventListener(
    'keydown',
    event => {

      if (
        event.key ===
        'ArrowLeft'
      ) {

        goTo(
          current - 1
        );


        startAutoplay();

      }


      if (
        event.key ===
        'ArrowRight'
      ) {

        goTo(
          current + 1
        );


        startAutoplay();

      }

    }
  );


  /* ================================================================
     PAUSE AU SURVOL
  ================================================================ */

  if (hero) {

    hero.addEventListener(
      'mouseenter',
      () => {

        clearInterval(
          autoplay
        );


        if (progressBar) {

          progressBar.style.transition =
            'none';

        }

      }
    );


    hero.addEventListener(
      'mouseleave',
      () => {

        startAutoplay();

        resetProgress();

      }
    );

  }


  /* ================================================================
     INITIALISATION
  ================================================================ */

  slides.forEach(
    (slide, index) => {

      slide.classList.toggle(
        'on',
        index === 0
      );

    }
  );


  dots.forEach(
    (dot, index) => {

      dot.classList.toggle(
        's-dot-on',
        index === 0
      );

    }
  );


  current = 0;


  resetProgress();

  startAutoplay();

}());


/* ================================================================
   1. HEADER
================================================================ */

(function initHeader() {
  const header = document.getElementById('site-header');

  if (!header) return;

  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }

  window.addEventListener('scroll', updateHeader, {
    passive: true
  });

  updateHeader();
}());


/* ================================================================
   2. MENU MOBILE
================================================================ */

(function initBurger() {
  const button = document.getElementById('burger');
  const nav = document.getElementById('mob-nav');

  if (!button || !nav) return;

  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;

    button.classList.toggle('open', isOpen);

    button.setAttribute(
      'aria-expanded',
      String(isOpen)
    );

    nav.setAttribute(
      'aria-hidden',
      String(!isOpen)
    );

    document.body.style.overflow = isOpen
      ? 'hidden'
      : '';
  }

  button.addEventListener('click', toggleMenu);

  nav.querySelectorAll('a').forEach(link => {

    link.addEventListener('click', () => {

      if (isOpen) {
        toggleMenu();
      }

    });

  });

}());


/* ================================================================
   3. ANIMATIONS AU SCROLL
================================================================ */

(function initFadeUp() {

  const elements = document.querySelectorAll('.fade-up');

  if (!elements.length) return;


  /* Fallback anciens navigateurs */

  if (!('IntersectionObserver' in window)) {

    elements.forEach(element => {
      element.classList.add('visible');
    });

    return;
  }


  const observer = new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add('visible');

          observer.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    }

  );


  elements.forEach(element => {

    observer.observe(element);

  });

}());


/* ================================================================
   4. FALLBACK LOGO
================================================================ */

(function initLogo() {

  document
    .querySelectorAll('.logo-img')
    .forEach(img => {

      img.addEventListener('error', () => {

        img.style.display = 'none';

      });


      if (!img.getAttribute('src')) {

        img.style.display = 'none';

      }

    });

}());


/* ================================================================
   5. FAQ
================================================================ */

(function initFaq() {

  document
    .querySelectorAll('.faq-item')
    .forEach(item => {

      const button =
        item.querySelector('.faq-btn');

      const panel =
        item.querySelector('.faq-panel');


      if (!button || !panel) return;


      button.addEventListener('click', () => {

        const isOpen =
          button.getAttribute('aria-expanded') === 'true';


        button.setAttribute(
          'aria-expanded',
          String(!isOpen)
        );


        panel.hidden = isOpen;

      });

    });

}());


/* ================================================================
   6. ACCORDÉONS FORMULAIRE
================================================================ */

(function initAccordions() {

  const groups = [

    'situation',

    'projet',

    'production',

    'avancement',

    'delai'

  ];


  function closeOtherAccordions(activeName) {

    document
      .querySelectorAll('.acc')
      .forEach(acc => {

        if (
          acc.dataset.name === activeName
        ) {
          return;
        }


        const button =
          acc.querySelector('.acc-btn');

        const panel =
          acc.querySelector('.acc-panel');


        if (button) {

          button.setAttribute(
            'aria-expanded',
            'false'
          );

        }


        if (panel) {

          panel.hidden = true;

        }

      });

  }


  groups.forEach(name => {

    const accordion =
      document.querySelector(
        `.acc[data-name="${name}"]`
      );


    if (!accordion) return;


    const button =
      accordion.querySelector('.acc-btn');

    const panel =
      accordion.querySelector('.acc-panel');

    const valueDisplay =
      document.getElementById(
        `v-${name}`
      );


    if (!button || !panel) return;


    /* Ouvrir / fermer */

    button.addEventListener('click', () => {

      const isOpen =
        button.getAttribute('aria-expanded') === 'true';


      closeOtherAccordions(name);


      button.setAttribute(
        'aria-expanded',
        String(!isOpen)
      );


      panel.hidden = isOpen;

    });


    /* Sélection d'une réponse */

    accordion
      .querySelectorAll(
        `input[name="${name}"]`
      )
      .forEach(radio => {

        radio.addEventListener(
          'change',
          () => {

            if (valueDisplay) {

              valueDisplay.textContent =
                radio.value;

            }


            const error =
              document.getElementById(
                `e-${name}`
              );


            if (error) {

              error.hidden = true;

            }


            /* Fermer l'accordéon */

            button.setAttribute(
              'aria-expanded',
              'false'
            );

            panel.hidden = true;


            /* Mettre à jour progression */

            updateFormProgress();

          }
        );

      });

  });

}());


/* ================================================================
   7. OUTILS FORMULAIRE
================================================================ */

function radioVal(name) {

  const element =
    document.querySelector(
      `input[name="${name}"]:checked`
    );


  return element
    ? element.value
    : '';

}


function isPhone(value) {

  return /^[+\d][\d\s\-().]{7,20}$/
    .test(value.trim());

}


function isEmail(value) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(value.trim());

}


function showErr(id, show) {

  const element =
    document.getElementById(id);


  if (element) {

    element.hidden = !show;

  }

}


function setInputError(id, show) {

  const element =
    document.getElementById(id);


  if (element) {

    element.classList.toggle(
      'has-err',
      show
    );

  }

}


/* ================================================================
   8. BARRE DE PROGRESSION
================================================================ */

function updateFormProgress() {

  const radioGroups = [

    'situation',

    'projet',

    'production',

    'avancement',

    'delai'

  ];


  const requiredTextFields = [

    'fe-co',

    'fe-nm',

    'fe-tl',

    'fe-pays',

    'fe-vi'

  ];


  let completed = 0;


  const total =
    radioGroups.length +
    requiredTextFields.length;


  /* Questions */

  radioGroups.forEach(name => {

    if (radioVal(name)) {

      completed++;

    }

  });


  /* Coordonnées */

  requiredTextFields.forEach(id => {

    const field =
      document.getElementById(id);


    if (
      field &&
      field.value.trim()
    ) {

      completed++;

    }

  });


  const percentage =
    Math.round(
      (completed / total) * 100
    );


  const progressBar =
    document.getElementById(
      'form-progress-bar'
    );


  const progressLabel =
    document.getElementById(
      'form-progress-label'
    );


  if (progressBar) {

    progressBar.style.width =
      `${percentage}%`;

  }


  if (progressLabel) {

    progressLabel.textContent =
      `${percentage}%`;

  }

}


/* ================================================================
   9. VALIDATION FORMULAIRE
================================================================ */

function validateForm() {

  let valid = true;


  /* Questions obligatoires */

  const radioGroups = [

    'situation',

    'projet',

    'production',

    'avancement',

    'delai'

  ];


  radioGroups.forEach(name => {

    const missing =
      !radioVal(name);


    showErr(
      `e-${name}`,
      missing
    );


    if (missing) {

      valid = false;

    }

  });


  /* Champs texte obligatoires */

  const requiredFields = [

    ['fe-co', 'e-co'],

    ['fe-nm', 'e-nm'],

    ['fe-pays', 'e-pays'],

    ['fe-vi', 'e-vi']

  ];


  requiredFields.forEach(
    ([fieldId, errorId]) => {

      const field =
        document.getElementById(
          fieldId
        );


      const missing =
        !field ||
        !field.value.trim();


      setInputError(
        fieldId,
        missing
      );


      showErr(
        errorId,
        missing
      );


      if (missing) {

        valid = false;

      }

    }
  );


  /* Téléphone */

  const phone =
    document.getElementById(
      'fe-tl'
    );


  const badPhone =
    !phone ||
    !isPhone(phone.value);


  setInputError(
    'fe-tl',
    badPhone
  );


  showErr(
    'e-tl',
    badPhone
  );


  if (badPhone) {

    valid = false;

  }


  /* Email facultatif mais validé si rempli */

  const email =
    document.getElementById(
      'fe-em'
    );


  const emailValue =
    email
      ? email.value.trim()
      : '';


  const badEmail =
    emailValue !== '' &&
    !isEmail(emailValue);


  setInputError(
    'fe-em',
    badEmail
  );


  showErr(
    'e-em',
    badEmail
  );


  if (badEmail) {

    valid = false;

  }


  return valid;

}


/* ================================================================
   10. CRÉATION DU LEAD
================================================================ */

function buildPayload() {

  const params =
    new URLSearchParams(
      window.location.search
    );


  return {

    timestamp:
      new Date().toISOString(),


    landing_page:
      'Pain Point - Approvisionnement / Production sur chantier',


    /* Tracking campagne */

    source:
      params.get('utm_source') || '',

    medium:
      params.get('utm_medium') || '',

    campaign:
      params.get('utm_campaign') || '',

    content:
      params.get('utm_content') || '',

    term:
      params.get('utm_term') || '',


    /* Qualification */

    situation:
      radioVal('situation'),

    type_projet:
      radioVal('projet'),

    besoin_production:
      radioVal('production'),

    avancement:
      radioVal('avancement'),

    delai:
      radioVal('delai'),


    /* Contact */

    entreprise:
      document
        .getElementById('fe-co')
        .value
        .trim(),

    nom:
      document
        .getElementById('fe-nm')
        .value
        .trim(),

    fonction:
      document
        .getElementById('fe-role')
        .value
        .trim(),

    telephone:
      document
        .getElementById('fe-tl')
        .value
        .trim(),

    email:
      document
        .getElementById('fe-em')
        .value
        .trim(),

    pays:
      document
        .getElementById('fe-pays')
        .value
        .trim(),

    ville:
      document
        .getElementById('fe-vi')
        .value
        .trim()

  };

}


/* ================================================================
   11. LEAD SCORING INTERNE
   IMPORTANT :
   logique indicative à valider avec l'équipe commerciale AMM.
================================================================ */

function computeLeadScore(payload) {

  let score = 0;


  /* Niveau d'avancement */

  if (
    payload.avancement ===
    'Projet confirmé'
  ) {

    score += 30;

  }


  if (
    payload.avancement ===
    'Budget en validation'
  ) {

    score += 20;

  }


  if (
    payload.avancement ===
    'Comparaison fournisseurs'
  ) {

    score += 15;

  }


  if (
    payload.avancement ===
    'Étude technique'
  ) {

    score += 10;

  }


  /* Délai */

  if (
    payload.delai ===
    'Moins de 1 mois'
  ) {

    score += 30;

  }


  if (
    payload.delai ===
    '1–3 mois'
  ) {

    score += 25;

  }


  if (
    payload.delai ===
    '3–6 mois'
  ) {

    score += 15;

  }


  if (
    payload.delai ===
    '+6 mois'
  ) {

    score += 5;

  }


  /* Besoin identifié */

  if (
    payload.besoin_production &&
    payload.besoin_production !==
      'Je ne sais pas encore'
  ) {

    score += 20;

  }


  /* Société identifiable */

  if (payload.entreprise) {

    score += 10;

  }


  /* Contact téléphonique */

  if (payload.telephone) {

    score += 10;

  }


  /* Classification */

  if (score >= 75) {

    return {

      score: score,

      status:
        'Prioritaire'

    };

  }


  if (score >= 45) {

    return {

      score: score,

      status:
        'À qualifier'

    };

  }


  return {

    score: score,

    status:
      'Nurturing'

  };

}


/* ================================================================
   12. ENVOI GOOGLE SHEETS
================================================================ */

function sendToSheets(payload) {

  /*
   * Si aucune URL Apps Script n'est encore configurée,
   * le formulaire fonctionne en mode test.
   */

  if (!CONFIG.GOOGLE_SCRIPT_URL) {

    console.info(
      '[AMM] Mode test — aucune URL Google Apps Script configurée.'
    );


    console.table(payload);


    return Promise.resolve();

  }


  return new Promise(resolve => {


    /* Iframe invisible */

    const iframe =
      document.createElement(
        'iframe'
      );


    iframe.name =
      'hidden_iframe_' +
      Date.now();


    iframe.style.display =
      'none';


    document.body.appendChild(
      iframe
    );


    /* Formulaire invisible */

    const hiddenForm =
      document.createElement(
        'form'
      );


    hiddenForm.method =
      'POST';


    hiddenForm.action =
      CONFIG.GOOGLE_SCRIPT_URL;


    hiddenForm.target =
      iframe.name;


    hiddenForm.style.display =
      'none';


    /* Création des champs */

    Object.keys(payload)
      .forEach(key => {

        const input =
          document.createElement(
            'input'
          );


        input.type =
          'hidden';


        input.name =
          key;


        input.value =
          payload[key] ?? '';


        hiddenForm.appendChild(
          input
        );

      });


    document.body.appendChild(
      hiddenForm
    );


    let resolved = false;


    function cleanup() {

      setTimeout(() => {

        try {

          hiddenForm.remove();

        } catch (error) {}


        try {

          iframe.remove();

        } catch (error) {}

      }, 1500);

    }


    function finish() {

      if (resolved) return;


      resolved = true;


      resolve();


      cleanup();

    }


    iframe.onload =
      finish;


    /*
     * Sécurité :
     * on évite de bloquer l'utilisateur
     * si Google ne déclenche pas correctement onload.
     */

    setTimeout(
      finish,
      10000
    );


    hiddenForm.submit();

  });

}


/* ================================================================
   13. SOUMISSION DU FORMULAIRE
================================================================ */

(function initForm() {

  const form =
    document.getElementById(
      'lead-form'
    );


  const submitButton =
    document.getElementById(
      'sub-btn'
    );


  const submitLabel =
    document.getElementById(
      'sub-lbl'
    );


  const spinner =
    document.getElementById(
      'sub-spin'
    );


  const successBox =
    document.getElementById(
      'f-ok'
    );


  const errorBox =
    document.getElementById(
      'f-err'
    );


  if (!form) return;


  /* Mise à jour progression */

  form
    .querySelectorAll('input')
    .forEach(input => {

      input.addEventListener(
        'input',
        () => {

          input.classList.remove(
            'has-err'
          );


          updateFormProgress();

        }
      );

    });


  function setLoading(isLoading) {

    if (submitButton) {

      submitButton.disabled =
        isLoading;

    }


    if (submitLabel) {

      submitLabel.textContent =
        isLoading
          ? 'Envoi en cours…'
          : 'Envoyer mon projet à AMM';

    }


    if (spinner) {

      spinner.hidden =
        !isLoading;

    }

  }


  form.addEventListener(
    'submit',
    async event => {

      event.preventDefault();


      if (errorBox) {

        errorBox.hidden = true;

      }


      /* Validation */

      if (!validateForm()) {

        const firstError =
          form.querySelector(
            '.ferr:not([hidden]), .has-err'
          );


        if (firstError) {

          firstError.scrollIntoView({

            behavior:
              'smooth',

            block:
              'center'

          });

        }


        return;

      }


      /* Création données */

      const payload =
        buildPayload();


      /* Lead scoring */

      const lead =
        computeLeadScore(
          payload
        );


      payload.lead_score =
        lead.score;


      payload.lead_status =
        lead.status;


      /* Chargement */

      setLoading(true);


      try {

        await sendToSheets(
          payload
        );


        /* Masquer formulaire */

        form.hidden =
          true;


        /* Afficher succès */

        if (successBox) {

          successBox.hidden =
            false;


          successBox.scrollIntoView({

            behavior:
              'smooth',

            block:
              'center'

          });

        }

      }

      catch (error) {

        console.error(
          '[AMM] Erreur formulaire :',
          error
        );


        setLoading(false);


        if (errorBox) {

          errorBox.hidden =
            false;


          errorBox.scrollIntoView({

            behavior:
              'smooth',

            block:
              'center'

          });

        }

      }

    }
  );


  updateFormProgress();

}());


/* ================================================================
   14. ANNÉE FOOTER
================================================================ */

(function initYear() {

  const year =
    document.getElementById(
      'yr'
    );


  if (year) {

    year.textContent =
      new Date().getFullYear();

  }

}());