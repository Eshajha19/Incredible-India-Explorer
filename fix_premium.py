import glob

files = glob.glob('d:/INDIA/*.html')

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace('? Premium', '★ Premium')
    content = content.replace('✨ Premium', '★ Premium')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
