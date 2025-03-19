document.addEventListener('DOMContentLoaded', () => {
  const videoGrid = document.getElementById('videoGrid');
  const episodeModal = document.getElementById('episodeModal');
  const videoPlayerModal = document.getElementById('videoPlayerModal');
  const searchInput = document.getElementById('searchInput');
  const themeToggle = document.getElementById('themeToggle');
  const closeBtn = document.querySelector('.close');
  const closeVideoBtn = document.querySelector('.close-video');

  // Theme toggle functionality
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Update icon with modern SVG
    themeToggle.innerHTML = newTheme === 'light' 
      ? `<svg viewBox="0 0 24 24">
          <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z"/>
        </svg>`
      : `<svg viewBox="0 0 24 24">
          <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/>
        </svg>`;
    
    // Save preference
    localStorage.setItem('theme', newTheme);
  }

  // Load saved theme preference with modern icons
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggle.innerHTML = savedTheme === 'light' 
    ? `<svg viewBox="0 0 24 24">
        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z"/>
      </svg>`
    : `<svg viewBox="0 0 24 24">
        <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/>
      </svg>`;

  themeToggle.addEventListener('click', toggleTheme);

  // Generate episode list with video player for episodes 1, 10, 11, and 12
  function createEpisodeList() {
    const episodeList = document.querySelector('.episode-list');
    episodeList.innerHTML = '';
    
    for (let i = 1; i <= 12; i++) {
      const episodeCard = document.createElement('div');
      episodeCard.className = 'episode-card';
      episodeCard.innerHTML = `
        <h3>Episode ${i}</h3>
        <p>Description to be added soon</p>
      `;
      
      // Add click event for episodes 1, 10, 11, and 12
      if (i === 1 || i === 12 || i === 11 || i === 10) {
        episodeCard.addEventListener('click', () => {
          episodeModal.style.display = 'none';
          videoPlayerModal.style.display = 'block';
          
          // Update video source based on episode
          const videoContainer = document.querySelector('.video-player-container');
          const episodeTitle = document.querySelector('.video-player-content h2');
          episodeTitle.textContent = `Episode ${i}`;
          
          let videoSrc = '';
          switch(i) {
            case 1:
              videoSrc = "S2 E1"; // This will be the path to your uploaded video
              break;
            case 12:
              videoSrc = "https://drive.google.com/file/d/1HA-hubN-nZlttuigD2jideiwin4VQHLN/preview";
              break;
            case 11:
              videoSrc = "https://drive.google.com/file/d/1jomj0tw0pmCp7EjFDQu3Td4cMynERZVt/preview";
              break;
            case 10:
              videoSrc = "https://drive.google.com/file/d/1H0Y_xf1xYHycx33bNs2RCq9KhMNJ0jX0/preview";
              break;
          }
          
          // Check if it's episode 1 (which will be a direct video file)
          if (i === 1) {
            videoContainer.innerHTML = `
              <video width="100%" height="100%" controls autoplay>
                <source src="${videoSrc}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            `;
          } else {
            videoContainer.innerHTML = `
              <iframe src="${videoSrc}" allow="autoplay" allowfullscreen></iframe>
            `;
          }
        });
      }
      
      episodeList.appendChild(episodeCard);
    }
  }

  // Create video cards with disabled functionality
  function createVideoCards(videos) {
    videoGrid.innerHTML = '';
    
    // Sort videos by row and order
    const sortedVideos = videos.sort((a, b) => {
      if (a.row === b.row) {
        return a.order - b.order;
      }
      return a.row - a.row;
    });
    
    sortedVideos.forEach(video => {
      const card = document.createElement('div');
      card.className = 'video-card';
      
      // Add data-season attribute for glow effects
      let season = '';
      if (video.title.includes('Season 1') && video.title.includes('Seven Deadly Sins')) {
        season = 'season1';
      } else if (video.title.includes('Revival')) {
        season = 'revival';
      } else if (video.title.includes('Wrath')) {
        season = 'wrath';
      } else if (video.title.includes('Dragon')) {
        season = 'dragon';
      } else if (video.title.includes('Four Knights') && video.title.includes('Season 1')) {
        season = 'fkoa-s1';
      } else if (video.title.includes('Four Knights') && video.title.includes('Season 2')) {
        season = 'fkoa-s2';
      }
      card.setAttribute('data-season', season);
      
      card.innerHTML = `
        <div class="thumbnail">
          <img src="${video.thumbnail}" alt="${video.title} Thumbnail">
        </div>
        <div class="video-info">
          <h3>${video.title}</h3>
          <p>${video.description}</p>
        </div>
      `;
      
      // Only enable click for Four Knights Season 2
      if (video.title.includes('Four Knights') && video.title.includes('Season 2')) {
        card.addEventListener('click', () => {
          episodeModal.style.display = 'block';
          createEpisodeList();
        });
      }
      
      videoGrid.appendChild(card);
    });
  }

  // Close modal
  closeBtn.addEventListener('click', () => {
    episodeModal.style.display = 'none';
  });

  // Close video player modal and stop video
  closeVideoBtn.addEventListener('click', () => {
    const videoContainer = document.querySelector('.video-player-container');
    
    // Remove the iframe to completely stop video playback
    videoContainer.innerHTML = '';
    
    // Hide the modal
    videoPlayerModal.style.display = 'none';
  });

  // Close modals when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === episodeModal) {
      episodeModal.style.display = 'none';
    }
    if (e.target === videoPlayerModal) {
      videoPlayerModal.style.display = 'none';
    }
  });

  // Search functionality
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredVideos = animeData.filter(video => 
      video.title.toLowerCase().includes(searchTerm) ||
      video.description.toLowerCase().includes(searchTerm)
    );
    createVideoCards(filteredVideos);
  });

  // Initial load
  createVideoCards(animeData);
});