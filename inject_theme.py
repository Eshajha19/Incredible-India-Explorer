import os
import glob

files = glob.glob('d:/INDIA/*.html')

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'id="theme-toggle"' not in content:
        # For root level
        target1 = '<a href="premium.html" class="nav-link" style="color: var(--gold); font-weight: bold;">★ Premium</a>'
        replace1 = '<button id="theme-toggle" class="btn-theme-toggle" aria-label="Toggle Dark/Light Mode" title="Toggle Light Mode">☀️</button>\n                ' + target1
        content = content.replace(target1, replace1)

        # For states folder
        target2 = '<a href="../premium.html" class="nav-link" style="color: var(--gold); font-weight: bold;">★ Premium</a>'
        replace2 = '<button id="theme-toggle" class="btn-theme-toggle" aria-label="Toggle Dark/Light Mode" title="Toggle Light Mode">☀️</button>\n                ' + target2
        content = content.replace(target2, replace2)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
