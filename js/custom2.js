document.addEventListener('DOMContentLoaded', function() {
  const scenarioContainer = document.getElementById('posts'); // Container for portfolio items
  const scenarioDetailsContainer = document.querySelector('.portfolio-single-inner'); // Container for detailed sections
  const scenarioFolderPath = 'scenarios/'; // Path to the scenarios folder

  // Fetch the list of scenario folders (subfolders)
  fetch(`${scenarioFolderPath}scenarios.json`)
    .then(response => response.json())
    .then(scenarioFolders => {
      scenarioFolders.forEach(folder => {
        loadScenario(folder);
      });
    })
    .catch(error => console.error('Failed to load scenario folders:', error));


  // Loop through all scenario folders
  for (let i = 1; i <= scenarioCount; i++) {
      loadScenario(i);
  }

  // Function to load a scenario's data.json and dynamically create HTML
  function loadScenario(scenarioFolderName) {
    const scenarioPath = `${scenarioFolderPath}${scenarioFolderName}/data.json`;

      // Fetch data.json for each scenario
      fetch(scenarioPath)
          .then(response => response.json())
          .then(data => {
              // Dynamically create portfolio item HTML
              const portfolioItemHTML = `
                  <div class="item web branding col-sm-6 col-md-6 col-lg-4 isotope-mb-2">
                    <a href="#scenario-${scenarioFolderName}" class="portfolio-item" onclick="showScenario('scenario-${scenarioId}')">
                      <div class="overlay">
                        <span class="wrap-icon icon-link2"></span>
                        <div class="portfolio-item-content">
                          <h3>${data.title}</h3>
                          <p>${data.subtitle}</p>
                        </div>
                      </div>
                      <img src="${scenarioFolderPath}${scenarioFolderName}/image.jpg" class="lazyload img-fluid" alt="${data.title}" onload="imageLoaded(${scenarioId})">
                    </a>
                  </div>
              `;
              scenarioContainer.innerHTML += portfolioItemHTML;

              // Dynamically create detailed scenario section HTML
              const scenarioDetailHTML = `
                  <div class="row mb-5 scenario-detail" id="scenario-${scenarioId}">
                    <div class="col-md-4">
                      <img src="${scenarioFolderPath}${scenarioId}/image.jpg" alt="${data.title}" class="img-fluid">
                    </div>
                    <div class="col-md-8">
                      <div class="row">
                        <div class="col-sm-6 col-md-6 col-lg-7">
                          <div class="detail-v1">
                            <span class="detail-label">Title</span>
                            <span class="detail-val">${data.title}</span>
                          </div>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-3">
                          <div class="detail-v1">
                            <span class="detail-label">Author</span>
                            <span class="detail-val">${data.author}</span>
                          </div>
                        </div>
                      </div>
                      <br><br>
                      <p>${data.scenario}</p>
                    </div>
                  </div>
              `;
              scenarioDetailsContainer.innerHTML += scenarioDetailHTML;
          })
          .catch(error => console.error(`Failed to load scenario ${scenarioId}:`, error));

    // Function to refresh Isotope layout after loading new items
  function refreshIsotope() {
    const $container = $('#posts').isotope(); // Make sure this matches your Isotope initialization in custom.js
    $container.isotope('reloadItems').isotope({ sortBy: 'original-order' });
  }

  // Function to handle image loading for progressive layout adjustment
  function imageLoaded(scenarioId) {
    refreshIsotope(); // Recalculate the Isotope layout when an image is fully loaded
  }
  }
});

// Function to show detailed scenario section
function showScenario(scenarioId) {
  document.getElementById(scenarioId).scrollIntoView({ behavior: 'smooth' });
}