
const months = [
  {
    number: 1,
    title: "Primer mes",
    subtitle: "Aquí comienza una historia preciosa.",
    cover: "assets/monster.jpg",
    photos: ["assets/1.jpg", "assets/2.jpg", "assets/3.jpg", "assets/4.jpg", "assets/5.jpg", "assets/6.jpg"]
  },
  {
    number: 2,
    title: "Segundo mes",
    subtitle: "Más miradas, más gestos y muchísimo amor.",
    cover: "assets/mes-02.svg",
    photos: ["assets/foto-02.svg", "assets/foto-05.svg", "assets/foto-01.svg", "assets/foto-06.svg"]
  },
  {
    number: 3,
    title: "Tercer mes",
    subtitle: "Cada día aparece una nueva expresión.",
    cover: "assets/mes-03.svg",
    photos: ["assets/foto-03.svg", "assets/foto-04.svg", "assets/foto-06.svg", "assets/foto-02.svg"]
  },
  {
    number: 4,
    title: "Cuarto mes",
    subtitle: "Pequeñas aventuras y sonrisas enormes.",
    cover: "assets/mes-04.svg",
    photos: ["assets/foto-04.svg", "assets/foto-01.svg", "assets/foto-05.svg", "assets/foto-03.svg"]
  },
  {
    number: 5,
    title: "Quinto mes",
    subtitle: "Un mes lleno de ternura y curiosidad.",
    cover: "assets/mes-05.svg",
    photos: ["assets/foto-05.svg", "assets/foto-06.svg", "assets/foto-02.svg", "assets/foto-04.svg"]
  },
  {
    number: 6,
    title: "Sexto mes",
    subtitle: "Medio año de recuerdos inolvidables.",
    cover: "assets/mes-06.svg",
    photos: ["assets/foto-06.svg", "assets/foto-03.svg", "assets/foto-01.svg", "assets/foto-05.svg"]
  },
  {
    number: 7,
    title: "Séptimo mes",
    subtitle: "Cada día descubre un pedacito más del mundo.",
    cover: "assets/mes-07.svg",
    photos: ["assets/foto-01.svg", "assets/foto-05.svg", "assets/foto-04.svg", "assets/foto-02.svg"]
  },
  {
    number: 8,
    title: "Octavo mes",
    subtitle: "Más movimiento, más risas y más aventuras.",
    cover: "assets/mes-08.svg",
    photos: ["assets/foto-02.svg", "assets/foto-04.svg", "assets/foto-06.svg", "assets/foto-03.svg"]
  },
  {
    number: 9,
    title: "Noveno mes",
    subtitle: "Una etapa llena de energía y nuevas sorpresas.",
    cover: "assets/mes-09.svg",
    photos: ["assets/foto-03.svg", "assets/foto-06.svg", "assets/foto-05.svg", "assets/foto-01.svg"]
  },
  {
    number: 10,
    title: "Décimo mes",
    subtitle: "Cada recuerdo empieza a tener su propia personalidad.",
    cover: "assets/mes-10.svg",
    photos: ["assets/foto-04.svg", "assets/foto-02.svg", "assets/foto-01.svg", "assets/foto-06.svg"]
  },
  {
    number: 11,
    title: "Undécimo mes",
    subtitle: "Ya casi un año de momentos irrepetibles.",
    cover: "assets/mes-11.svg",
    photos: ["assets/foto-05.svg", "assets/foto-01.svg", "assets/foto-03.svg", "assets/foto-04.svg"]
  },
  {
    number: 12,
    title: "Primer añito",
    subtitle: "Doce meses, cientos de fotos y un amor infinito.",
    cover: "assets/mes-12.svg",
    photos: ["assets/foto-06.svg", "assets/foto-05.svg", "assets/foto-02.svg", "assets/foto-03.svg"]
  }
];

const $ = (selector) => document.querySelector(selector);

const bookStage = $("#bookStage");
const book = $("#book");
const openAlbumButton = $("#openAlbum");
const closeAlbumButton = $("#closeAlbum");
const albumPanel = $("#albumPanel");
const monthsGrid = $("#monthsGrid");

const monthModal = $("#monthModal");
const monthLabel = $("#monthLabel");
const monthTitle = $("#monthTitle");
const monthSubtitle = $("#monthSubtitle");
const photosGrid = $("#photosGrid");

const photoViewer = $("#photoViewer");
const viewerImage = $("#viewerImage");
const viewerCaption = $("#viewerCaption");

let activeMonth = null;
let albumOpenTimer = null;

function renderMonths() {
  monthsGrid.innerHTML = months.map((month) => `
    <article
      class="month-card"
      data-month="${month.number}"
      tabindex="0"
      role="button"
      aria-label="Abrir mes ${month.number}"
    >
      <div class="month-cover">
        <img
          src="${month.cover}"
          alt="Portada del mes ${month.number}"
          loading="lazy"
          decoding="async"
        />
        <span class="month-number">Mes ${month.number}</span>
        <span class="photo-count">${month.photos.length} fotos</span>
      </div>

      <div class="month-content">
        <h3>${month.title}</h3>
        <p>${month.subtitle}</p>
      </div>
    </article>
  `).join("");
}

function openAlbum() {
  if (albumOpenTimer) return;

  book.classList.add("opening");

  albumOpenTimer = window.setTimeout(() => {
    bookStage.classList.add("hidden");
    albumPanel.classList.add("visible");
    albumPanel.setAttribute("aria-hidden", "false");

    albumOpenTimer = null;

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, 610);
}

function closeAlbum() {
  if (albumOpenTimer) {
    clearTimeout(albumOpenTimer);
    albumOpenTimer = null;
  }

  albumPanel.classList.remove("visible");
  albumPanel.setAttribute("aria-hidden", "true");

  bookStage.classList.remove("hidden");

  requestAnimationFrame(() => {
    book.classList.remove("opening");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function openMonth(number) {
  const month = months.find((item) => item.number === number);
  if (!month) return;

  activeMonth = month;

  monthLabel.textContent = `Mes ${month.number}`;
  monthTitle.textContent = month.title;
  monthSubtitle.textContent = month.subtitle;

  photosGrid.innerHTML = month.photos.map((photo, index) => `
    <button
      class="photo-card"
      type="button"
      data-photo="${photo}"
      data-caption="Mes ${month.number} · Foto ${index + 1}"
      aria-label="Abrir foto ${index + 1} del mes ${month.number}"
    >
      <img
        src="${photo}"
        alt="Foto ${index + 1} del mes ${month.number}"
        loading="lazy"
        decoding="async"
      />
    </button>
  `).join("");

  monthModal.classList.add("open");
  monthModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeMonth() {
  monthModal.classList.remove("open");
  monthModal.setAttribute("aria-hidden", "true");
  activeMonth = null;

  if (!photoViewer.classList.contains("open")) {
    document.body.classList.remove("modal-open");
  }
}

function openPhoto(src, caption) {
  viewerImage.src = src;
  viewerImage.alt = caption;
  viewerCaption.textContent = caption;

  photoViewer.classList.add("open");
  photoViewer.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closePhoto() {
  photoViewer.classList.remove("open");
  photoViewer.setAttribute("aria-hidden", "true");
  viewerImage.removeAttribute("src");

  if (!monthModal.classList.contains("open")) {
    document.body.classList.remove("modal-open");
  }
}

/* Delegación de eventos: menos listeners y mejor rendimiento */
monthsGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".month-card");
  if (!card) return;
  openMonth(Number(card.dataset.month));
});

monthsGrid.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;

  const card = event.target.closest(".month-card");
  if (!card) return;

  event.preventDefault();
  openMonth(Number(card.dataset.month));
});

photosGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".photo-card");
  if (!button) return;
  openPhoto(button.dataset.photo, button.dataset.caption);
});

openAlbumButton.addEventListener("click", openAlbum);
closeAlbumButton.addEventListener("click", closeAlbum);

document.addEventListener("click", (event) => {
  if (event.target.matches("[data-close-modal]")) {
    closeMonth();
  }

  if (event.target.matches("[data-close-viewer]")) {
    closePhoto();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (photoViewer.classList.contains("open")) {
    closePhoto();
    return;
  }

  if (monthModal.classList.contains("open")) {
    closeMonth();
  }
});

renderMonths();
