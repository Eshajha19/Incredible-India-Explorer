<!DOCTYPE html>
<html lang="en">
<head>
    <script>
        (function() {
            const theme = localStorage.getItem('theme') || 'dark';
            if (theme === 'light') {
                document.body.classList.add('light-theme');
            }
        })();
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Festival Mini-Games Collection">
    <title>Festival Games | Incredible India Explorer</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="festival-games.css">
</head>
<body>
    <header class="navbar" id="navbar">
        <div class="nav-container">
            <a href="index.html" class="nav-logo">
                <span class="saffron">Incredible</span>
                <span class="gold">India</span>
                <span class="green">Explorer</span>
            </a>
            <button class="menu-toggle" id="menu-toggle">☰</button>
            <nav class="nav-menu" id="nav-menu">
                <a href="index.html" class="nav-link">Home</a>
                <a href="festivals.html" class="nav-link">Festivals</a>
                <a href="festival-games.html" class="nav-link">Festival Games</a>
                <button id="theme-toggle" class="btn-theme-toggle">☀️</button>
            </nav>
        </div>
    </header>

    <main id="app-root" class="festival-main">
        
        <!-- Hub Screen -->
        <div id="hub-screen" class="screen active">
            <div class="hub-header">
                <h1 class="hub-title">Festival Challenge Hub</h1>
                <p>Play mini-games to celebrate Indian festivals and earn badges!</p>
            </div>
            
            <div class="dashboard glass-card">
                <div class="dash-score">
                    <h3>Total Score</h3>
                    <div id="total-score" class="score-value">0</div>
                </div>
                <div class="dash-badges">
                    <h3>Earned Badges</h3>
                    <div id="badge-container" class="badge-container">
                        <!-- Badges injected via JS -->
                    </div>
                </div>
            </div>

            <div class="games-grid">
                <div class="game-card holi" onclick="startMiniGame('holi')">
                    <h2>🎨 Holi</h2>
                    <p>Color Match Rush</p>
                    <div class="high-score">High Score: <span id="hs-holi">0</span></div>
                </div>
                <div class="game-card diwali" onclick="startMiniGame('diwali')">
                    <h2>🪔 Diwali</h2>
                    <p>Diya Memory Run</p>
                    <div class="high-score">High Score: <span id="hs-diwali">0</span></div>
                </div>
                <div class="game-card onam" onclick="startMiniGame('onam')">
                    <h2>🌸 Onam</h2>
                    <p>Pookkalam Pattern Assembly</p>
                    <div class="high-score">High Score: <span id="hs-onam">0</span></div>
                </div>
                <div class="game-card lohri" onclick="startMiniGame('lohri')">
                    <h2>🔥 Lohri</h2>
                    <p>Resource Collector</p>
                    <div class="high-score">High Score: <span id="hs-lohri">0</span></div>
                </div>
                <div class="game-card pongal" onclick="startMiniGame('pongal')">
                    <h2>🍲 Pongal</h2>
                    <p>Cooking Timing</p>
                    <div class="high-score">High Score: <span id="hs-pongal">0</span></div>
                </div>
            </div>
        </div>

        <!-- Generic Game Overlay -->
        <div id="game-screen" class="screen">
            <div class="game-header">
                <button id="btn-back" class="btn btn-secondary">🔙 Back to Hub</button>
                <h2 id="current-game-title" class="current-game-title">Game Title</h2>
                <div class="game-stats">
                    <div class="stat-pill">Score: <span id="game-score">0</span></div>
                    <div class="stat-pill">Time: <span id="game-time">0</span>s</div>
                </div>
            </div>

            <!-- Game Containers (Only one active at a time) -->
            
            <!-- Holi -->
            <div id="container-holi" class="mini-game-container hidden">
                <div class="holi-target" id="holi-target-color">Match this color!</div>
                <div class="holi-grid" id="holi-grid"></div>
            </div>

            <!-- Diwali -->
            <div id="container-diwali" class="mini-game-container hidden">
                <div class="diwali-status" id="diwali-status">Watch the sequence...</div>
                <div class="diya-row" id="diwali-diyas">
                    <!-- Diyas injected here -->
                </div>
            </div>

            <!-- Onam -->
            <div id="container-onam" class="mini-game-container hidden">
                <div class="onam-layout">
                    <div class="onam-pieces" id="onam-pieces"></div>
                    <div class="onam-board" id="onam-board"></div>
                </div>
            </div>

            <!-- Lohri -->
            <div id="container-lohri" class="mini-game-container hidden">
                <canvas id="lohri-canvas" width="600" height="400"></canvas>
                <div class="lohri-controls">Press Left/Right Arrow keys to move the basket</div>
            </div>

            <!-- Pongal -->
            <div id="container-pongal" class="mini-game-container hidden">
                <div class="pongal-pot" id="pongal-pot">🍲</div>
                <div class="timing-bar-container">
                    <div class="timing-zone target" id="pongal-target-zone"></div>
                    <div class="timing-marker" id="pongal-marker"></div>
                </div>
                <button id="btn-pongal-action" class="btn btn-primary btn-large" style="margin-top:20px;">Add Ingredient / Stir</button>
            </div>

        </div>

    </main>

    <!-- Game Over Modal -->
    <div id="game-modal" class="modal-overlay hidden">
        <div class="modal-content glass-card game-modal">
            <h2 id="modal-title">Time's Up!</h2>
            <div class="modal-body">
                <div class="final-score-box">
                    <span class="fs-label">Final Score</span>
                    <span id="modal-score" class="fs-value">0</span>
                </div>
                
                <div id="badge-alert" class="badge-alert hidden">
                    <h3>🏆 New Badge Unlocked!</h3>
                    <div id="badge-unlocked-icon" class="badge-icon large"></div>
                    <p id="badge-unlocked-name"></p>
                </div>
            </div>
            <div class="modal-actions">
                <button id="btn-retry" class="btn btn-primary">Play Again</button>
                <button id="btn-modal-hub" class="btn btn-secondary">Return to Hub</button>
            </div>
        </div>
    </div>

    <script src="pages-common.js" defer></script>
    <script type="module" src="festival-games.js"></script>
</body>
</html>
