import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="layout-demo">
      <h2>Demos de Layout</h2>

      <!-- Flexbox Demo -->
      <section>
        <h3>Flexbox Layout</h3>
        <div class="flex-container">
          <div class="flex-item">1</div>
          <div class="flex-item">2</div>
          <div class="flex-item">3</div>
          <div class="flex-item">4</div>
        </div>

        <h4>Flex Navigation</h4>
        <nav class="flex-nav">
          <div class="nav-brand">Logo</div>
          <ul class="nav-items">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
          <button class="nav-button">Login</button>
        </nav>

        <h4>Flex Cards</h4>
        <div class="flex-cards">
          <div class="card">
            <h3>Card 1</h3>
            <p>Contenido flexible</p>
          </div>
          <div class="card">
            <h3>Card 2</h3>
            <p>Contenido más largo para demostrar flexibilidad</p>
          </div>
          <div class="card">
            <h3>Card 3</h3>
            <p>Contenido</p>
          </div>
        </div>
      </section>

      <!-- Grid Demo -->
      <section>
        <h3>Grid Layout</h3>
        <div class="grid-container">
          <header class="grid-header">Header</header>
          <nav class="grid-nav">Sidebar</nav>
          <main class="grid-main">Main Content</main>
          <aside class="grid-aside">Aside</aside>
          <footer class="grid-footer">Footer</footer>
        </div>

        <h4>Grid Gallery</h4>
        <div class="grid-gallery">
          <div class="gallery-item">1</div>
          <div class="gallery-item">2</div>
          <div class="gallery-item">3</div>
          <div class="gallery-item">4</div>
          <div class="gallery-item">5</div>
          <div class="gallery-item">6</div>
        </div>

        <h4>Grid Dashboard</h4>
        <div class="grid-dashboard">
          <div class="dashboard-item">Stats</div>
          <div class="dashboard-item">Graph</div>
          <div class="dashboard-item">Users</div>
          <div class="dashboard-item">Activity</div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .layout-demo {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    /* Flexbox Styles */
    .flex-container {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .flex-item {
      flex: 1;
      min-width: 100px;
      padding: 20px;
      background: #3498db;
      color: white;
      text-align: center;
      border-radius: 4px;
    }

    .flex-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: #2c3e50;
      color: white;
      margin-bottom: 20px;
    }

    .nav-items {
      display: flex;
      gap: 20px;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .flex-cards {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }

    .card {
      flex: 1;
      min-width: 250px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    /* Grid Styles */
    .grid-container {
      display: grid;
      grid-template-areas:
        "header header header"
        "nav main aside"
        "footer footer footer";
      gap: 10px;
      margin-bottom: 20px;
    }

    .grid-header {
      grid-area: header;
      background: #e74c3c;
    }
    .grid-nav {
      grid-area: nav;
      background: #2ecc71;
    }
    .grid-main {
      grid-area: main;
      background: #f1c40f;
    }
    .grid-aside {
      grid-area: aside;
      background: #9b59b6;
    }
    .grid-footer {
      grid-area: footer;
      background: #34495e;
    }

    .grid-header, .grid-nav, .grid-main, .grid-aside, .grid-footer {
      padding: 20px;
      color: white;
      border-radius: 4px;
    }

    .grid-gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 10px;
      margin-bottom: 20px;
    }

    .gallery-item {
      background: #3498db;
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 4px;
    }

    .grid-dashboard {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-bottom: 20px;
    }

    .dashboard-item {
      background: #2c3e50;
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 4px;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .grid-container {
        grid-template-areas:
          "header"
          "nav"
          "main"
          "aside"
          "footer";
      }

      .grid-dashboard {
        grid-template-columns: 1fr;
      }

      .flex-nav {
        flex-direction: column;
        gap: 10px;
      }

      .nav-items {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class LayoutDemoComponent {}
