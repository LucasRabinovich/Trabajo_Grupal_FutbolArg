<template>
  <nav class="navbar navbar-expand-lg navbar-dark sticky-top glass-navbar py-3">
    <div class="container">
      <a class="navbar-brand fw-bold text-neon text-uppercase tracking-wide" href="#">
        <span class="fs-4">⚽ Fixture Arg</span>
      </a>
      <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto fw-semibold gap-3">
          <li class="nav-item">
            <RouterLink class="nav-link custom-link" active-class="active-link" to="/">Partidos</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link custom-link" active-class="active-link" to="/equipos">Equipos</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link custom-link" active-class="active-link" to="/posiciones">Posiciones</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link custom-link" active-class="active-link" to="/estadisticas">Estadísticas</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link custom-link" active-class="active-link" to="/mi-equipo">Mi Equipo</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.glass-navbar {
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.tracking-wide {
  letter-spacing: 1.5px;
}

.custom-link {
  color: #a0aec0 !important;
  transition: all 0.3s ease;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem !important;
}

.custom-link:hover {
  color: #ffffff !important;
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.active-link {
  color: #00fa9a !important;
  background: rgba(0, 250, 154, 0.1);
  box-shadow: inset 0 -2px 0 #00fa9a;
}
</style>