document.addEventListener('DOMContentLoaded', function() {
    createColorParticles();
    
    const video = document.querySelector('video');
    if (video) {
        video.style.opacity = 1;
        
        const playVideo = function() {
            video.play().then(() => {
                console.log("Video playing successfully");
            }).catch(error => {
                console.log("Video autoplay error:", error);
                addPlayButton();
            });
        };
        
        playVideo();
        video.addEventListener('loadeddata', function() {
            playVideo();
            createExtraParticles();
        });
    }
    
    function addPlayButton() {
        if (document.getElementById('video-play-button')) return;
        
        const playButton = document.createElement('button');
        playButton.id = 'video-play-button';
        playButton.className = 'video-play-button';
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        document.body.appendChild(playButton);
        
        playButton.addEventListener('click', function() {
            video.play();
            this.style.display = 'none';
        });
    }
    
    function createColorParticles() {
        const container = document.getElementById('particles');
        const colors = [
            '#ff4d6d', '#ffb703', '#4cc9f0', 
            '#8338ec', '#06d6a0', '#ff9e00',
            '#fb5607', '#ffbe0b', '#3a86ff'
        ];
        
        for (let i = 0; i < 40; i++) {
            setTimeout(function() {
                const x = Math.random() * window.innerWidth * (Math.random() > 0.6 ? 1 : 0.7);
                const y = Math.random() * window.innerHeight;
                createParticle(
                    x, 
                    y,
                    colors[Math.floor(Math.random() * colors.length)],
                    container
                );
            }, i * 80);
        }
        
        setInterval(function() {
            const x = Math.random() * window.innerWidth * (Math.random() > 0.4 ? 1 : 0.7);
            const y = Math.random() * window.innerHeight;
            const color = colors[Math.floor(Math.random() * colors.length)];
            createParticle(x, y, color, container);
        }, 600);
    }
    
    function createExtraParticles() {
        const container = document.getElementById('particles');
        const colors = ['#ff4d6d', '#ffb703', '#4cc9f0', '#8338ec', '#06d6a0'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(function() {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createParticle(
                    x,
                    y,
                    colors[Math.floor(Math.random() * colors.length)],
                    container,
                    true
                );
            }, i * 100);
        }
    }
    
    function createParticle(x, y, color, container, isLarge = false) {
        const particle = document.createElement('div');
        
        const size = isLarge ? Math.random() * 25 + 10 : Math.random() * 15 + 5;
        
        particle.style.position = 'absolute';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = `${size}px`;
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.opacity = '0.7';
        particle.style.boxShadow = `0 0 ${size/2}px ${color}`;
        particle.style.zIndex = '3';
        
        container.appendChild(particle);
        
        const duration = Math.random() * 10 + 5;
        const keyframes = [
            { transform: `translate(0, 0) scale(1)`, opacity: 0.7 },
            { transform: `translate(${Math.random() * 150 - 75}px, ${-Math.random() * 150 - 50}px) scale(0)`, opacity: 0 }
        ];
        
        const animation = particle.animate(keyframes, {
            duration: duration * 1000,
            easing: 'ease-out'
        });
        
        animation.onfinish = function() {
            particle.remove();
        };
    }
    
    document.addEventListener('click', function(e) {
        for (let i = 0; i < 25; i++) {
            setTimeout(function() {
                createParticle(
                    e.clientX,
                    e.clientY,
                    ['#ff4d6d', '#ffb703', '#4cc9f0', '#8338ec', '#06d6a0'][Math.floor(Math.random() * 5)],
                    document.getElementById('particles'),
                    i < 5
                );
            }, i * 40);
        }
    });
});
