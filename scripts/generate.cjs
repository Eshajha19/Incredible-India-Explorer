const fs = require('fs');
const path = require('path');
const { mapData } = require('../data.js');

const layoutPath = path.join(__dirname, 'layout.html');
const layoutTemplate = fs.readFileSync(layoutPath, 'utf8');

const distDir = path.join(__dirname, '..', 'dist');
const statesDir = path.join(distDir, 'states');

// Ensure directories exist
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}
if (!fs.existsSync(statesDir)) {
    fs.mkdirSync(statesDir);
}

// Generate State Pages
const locations = mapData.locations;

locations.forEach(state => {
    // Basic slugification for URL
    const slug = state.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    // Dynamic Content
    const title = `${state.name} | Incredible India Explorer`;
    const description = state.description || `Explore ${state.name} in India`;
    const relativePath = '../../'; // since it will be in dist/states/
    
    let content = `
    <div style="max-width: 800px; margin: 40px auto; padding: 20px;" class="glass-card">
        <h1>${state.name}</h1>
        <p><strong>Capital:</strong> ${state.capital}</p>
        <p><strong>Famous Food:</strong> ${state.food}</p>
        <p><strong>Major Festival:</strong> ${state.festival}</p>
        <div style="margin-top: 20px;">
            <h3>Overview</h3>
            <p>${state.description}</p>
        </div>
        <div style="margin-top: 20px;">
            <h3>Story</h3>
            <p>${state.story.replace(/\n/g, '<br>')}</p>
        </div>
        <a href="../../index.html" class="btn btn-primary" style="margin-top: 20px; display: inline-block;">Back to Home</a>
    </div>
    `;

    // Replace placeholders
    let pageHtml = layoutTemplate
        .replace(/\{\{title\}\}/g, title)
        .replace(/\{\{description\}\}/g, description)
        .replace(/\{\{relative_path\}\}/g, relativePath)
        .replace(/\{\{extra_head\}\}/g, '')
        .replace(/\{\{extra_scripts\}\}/g, '')
        .replace(/\{\{content\}\}/g, content);

    // Write file
    const outputPath = path.join(statesDir, `${slug}.html`);
    fs.writeFileSync(outputPath, pageHtml);
    console.log(`Generated: dist/states/${slug}.html`);
});

console.log('Static Site Generation complete!');
