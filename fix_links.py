import os
import glob

files = glob.glob('d:/INDIA/*.html')

for filepath in files:
    if filepath.endswith('premium.html'):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix the encoding issue
    content = content.replace('>Learn & Data ?</button>', '>Learn & Data ▾</button>')

    if 'premium.html' not in content:
        search_str = '<a href="learn.html" class="dropdown-item">Learn & Quiz</a>\n                    </div>\n                </div>'
        replace_str = '<a href="learn.html" class="dropdown-item">Learn & Quiz</a>\n                    </div>\n                </div>\n                <a href="premium.html" class="nav-link" style="color: var(--gold); font-weight: bold;">✨ Premium</a>'
        content = content.replace(search_str, replace_str)

        search_str2 = '<a href="../learn.html" class="dropdown-item">Learn & Quiz</a>\n                    </div>\n                </div>'
        replace_str2 = '<a href="../learn.html" class="dropdown-item">Learn & Quiz</a>\n                    </div>\n                </div>\n                <a href="../premium.html" class="nav-link" style="color: var(--gold); font-weight: bold;">✨ Premium</a>'
        content = content.replace(search_str2, replace_str2)

        search_str3 = '<a href="learn.html" class="dropdown-item">Learn & Quiz</a>\r\n                    </div>\r\n                </div>'
        replace_str3 = '<a href="learn.html" class="dropdown-item">Learn & Quiz</a>\r\n                    </div>\r\n                </div>\r\n                <a href="premium.html" class="nav-link" style="color: var(--gold); font-weight: bold;">✨ Premium</a>'
        content = content.replace(search_str3, replace_str3)

        search_str4 = '<a href="../learn.html" class="dropdown-item">Learn & Quiz</a>\r\n                    </div>\r\n                </div>'
        replace_str4 = '<a href="../learn.html" class="dropdown-item">Learn & Quiz</a>\r\n                    </div>\r\n                </div>\r\n                <a href="../premium.html" class="nav-link" style="color: var(--gold); font-weight: bold;">✨ Premium</a>'
        content = content.replace(search_str4, replace_str4)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
