
document.addEventListener("DOMContentLoaded", () => {
  const states = [{"id": "rajasthan", "name": "Rajasthan", "region": "West", "cost": 1050, "days": 2, "health": -8, "reward": 26, "food": "Dal Baati Churma", "risk": "Desert heat", "image": "assets/travel_deserts.png"}, {"id": "gujarat", "name": "Gujarat", "region": "West", "cost": 950, "days": 2, "health": -5, "reward": 24, "food": "Dhokla", "risk": "Long highway detour", "image": "assets/heritage_stepwells.png"}, {"id": "maharashtra", "name": "Maharashtra", "region": "West", "cost": 1250, "days": 2, "health": -6, "reward": 27, "food": "Vada Pav", "risk": "City surge pricing", "image": "assets/heritage_forts.png"}, {"id": "goa", "name": "Goa", "region": "West", "cost": 1350, "days": 2, "health": -4, "reward": 25, "food": "Fish curry rice", "risk": "Peak season crowd", "image": "assets/travel_beaches.png"}, {"id": "kerala", "name": "Kerala", "region": "South", "cost": 1150, "days": 2, "health": -4, "reward": 28, "food": "Appam stew", "risk": "Monsoon delay", "image": "assets/travel_islands.png"}, {"id": "tamil-nadu", "name": "Tamil Nadu", "region": "South", "cost": 1000, "days": 2, "health": -5, "reward": 27, "food": "Idli Sambar", "risk": "Temple town rush", "image": "assets/heritage_temples.png"}, {"id": "karnataka", "name": "Karnataka", "region": "South", "cost": 1100, "days": 2, "health": -6, "reward": 29, "food": "Bisi Bele Bath", "risk": "Bus strike", "image": "assets/heritage_ruins.png"}, {"id": "telangana", "name": "Telangana", "region": "South", "cost": 900, "days": 1, "health": -4, "reward": 22, "food": "Hyderabadi Biryani", "risk": "Heat and traffic", "image": "assets/culture.png"}, {"id": "odisha", "name": "Odisha", "region": "East", "cost": 850, "days": 2, "health": -5, "reward": 25, "food": "Dalma", "risk": "Coastal weather", "image": "assets/heritage_temples.png"}, {"id": "west-bengal", "name": "West Bengal", "region": "East", "cost": 980, "days": 2, "health": -5, "reward": 27, "food": "Machher Jhol", "risk": "Festival crowd", "image": "assets/culture.png"}, {"id": "bihar", "name": "Bihar", "region": "East", "cost": 750, "days": 1, "health": -4, "reward": 21, "food": "Litti Chokha", "risk": "Train delay", "image": "assets/heritage_ruins.png"}, {"id": "assam", "name": "Assam", "region": "Northeast", "cost": 1050, "days": 2, "health": -7, "reward": 28, "food": "Masor Tenga", "risk": "Flood watch", "image": "assets/travel_forests.png"}, {"id": "sikkim", "name": "Sikkim", "region": "Northeast", "cost": 1300, "days": 2, "health": -9, "reward": 30, "food": "Momos", "risk": "Mountain sickness", "image": "assets/travel_mountains.png"}, {"id": "punjab", "name": "Punjab", "region": "North", "cost": 900, "days": 1, "health": -4, "reward": 23, "food": "Sarson da Saag", "risk": "Missed train", "image": "assets/culture.png"}, {"id": "uttar-pradesh", "name": "Uttar Pradesh", "region": "North", "cost": 950, "days": 2, "health": -5, "reward": 27, "food": "Awadhi meal", "risk": "Crowded route", "image": "assets/heritage_temples.png"}, {"id": "himachal", "name": "Himachal Pradesh", "region": "North", "cost": 1200, "days": 2, "health": -8, "reward": 29, "food": "Siddu", "risk": "Landslide alert", "image": "assets/travel_mountains.png"}];
  const events = [{"title": "Missed train", "text": "You missed a connecting train and had to book a sleeper bus.", "money": -650, "days": 1, "health": -5}, {"title": "Kind homestay host", "text": "A local host offers a discounted stay and warm food.", "money": 400, "days": 0, "health": 8}, {"title": "Sudden weather change", "text": "Weather forces a slower route and drains energy.", "money": -250, "days": 1, "health": -9}, {"title": "Lost luggage scare", "text": "You recover your bag, but spend money and health handling it.", "money": -500, "days": 0, "health": -7}, {"title": "Street food win", "text": "You find a budget local meal that restores health.", "money": 150, "days": 0, "health": 10}, {"title": "Festival discount", "text": "A tourism office gives student/backpacker discounts.", "money": 650, "days": 0, "health": 3}];
  const saveKey = "incredible-india-budget-travel-survival-save";
  const travelModes = {train:{money:280,days:1,health:-3,label:"train"},bus:{money:420,days:1,health:-4,label:"bus"},flight:{money:1800,days:0,health:-1,label:"flight"}};
  const stays = {hostel:{money:250,health:-3,label:"hostel"},homestay:{money:550,health:2,label:"homestay"},hotel:{money:1100,health:6,label:"hotel"}};
  const foods = {street:{money:130,health:-2,label:"street food"},thali:{money:280,health:3,label:"local thali"},restaurant:{money:700,health:6,label:"restaurant meal"}};
  let game = {money:18500,days:34,health:100,score:0,visited:[],lastState:null};
  const stateGrid = document.getElementById("state-grid");
  const visitedGrid = document.getElementById("visited-grid");
  const eventCard = document.getElementById("event-card");
  const escapeHtml = (value) => String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
  const clamp = (value,min,max) => Math.max(min, Math.min(max, value));
  const currency = (value) => `₹${Math.round(value).toLocaleString("en-IN")}`;

  function selectedPlan(){
    return {
      transport: travelModes[document.getElementById("transport-select").value],
      stay: stays[document.getElementById("stay-select").value],
      food: foods[document.getElementById("food-select").value]
    };
  }
  function foodCost(state, base){ return base + Math.round(state.cost * 0.08); }
  function visitCost(state){
    const plan = selectedPlan();
    return {money: state.cost + plan.transport.money + plan.stay.money + foodCost(state, plan.food.money), days: state.days + plan.transport.days, health: state.health + plan.transport.health + plan.stay.health + plan.food.health, plan};
  }
  function randomEvent(){ return events[Math.floor(Math.random()*events.length)]; }
  function updateStats(){
    document.getElementById("money").textContent = currency(game.money);
    document.getElementById("days").textContent = game.days;
    document.getElementById("health").textContent = game.health;
    document.getElementById("score").textContent = game.score;
    document.getElementById("money-hero").textContent = currency(game.money);
    document.getElementById("health-hero").textContent = game.health;
    document.getElementById("visited-hero").textContent = `${game.visited.length}/${states.length}`;
    const rank = game.visited.length >= states.length ? "India trail champion" : game.visited.length >= 10 ? "Expert backpacker" : game.visited.length >= 5 ? "Smart traveller" : "Rookie backpacker";
    document.getElementById("survival-rank").textContent = rank;
  }
  function renderStates(){
    stateGrid.innerHTML = states.map((state) => {
      const visited = game.visited.includes(state.id);
      const cost = visitCost(state);
      const impossible = visited || game.money < cost.money || game.days < cost.days || game.health + cost.health <= 0;
      return `<article class="state-card ${visited ? "visited" : ""}"><img src="${escapeHtml(state.image)}" alt="${escapeHtml(state.name)} travel" onerror="this.src='assets/hero_banner.png'"><div><h4>${visited ? "✓ " : ""}${escapeHtml(state.name)}</h4><p>${escapeHtml(state.region)} · Food: ${escapeHtml(state.food)}<br>Risk: ${escapeHtml(state.risk)}<br>Trip: ${currency(cost.money)} · ${cost.days}d · health ${cost.health}</p><button type="button" data-state="${escapeHtml(state.id)}" ${impossible ? "disabled" : ""}>${visited ? "Visited" : "Travel here"}</button></div></article>`;
    }).join("");
    stateGrid.querySelectorAll("[data-state]").forEach((button) => button.addEventListener("click", () => travelTo(button.dataset.state)));
  }
  function renderVisited(){
    visitedGrid.innerHTML = states.map((state) => `<div class="visited-chip ${game.visited.includes(state.id) ? "done" : ""}">${game.visited.includes(state.id) ? "✓ " : "○ "}${escapeHtml(state.name)}</div>`).join("");
  }
  function renderAll(){ updateStats(); renderStates(); renderVisited(); }
  function travelTo(id){
    const state = states.find((item) => item.id === id);
    if (!state || game.visited.includes(id)) return;
    const cost = visitCost(state);
    const event = Math.random() < 0.72 ? randomEvent() : null;
    game.money -= cost.money; game.days -= cost.days; game.health = clamp(game.health + cost.health,0,100); game.score += state.reward; game.visited.push(id); game.lastState = id;
    let eventText = "";
    if (event){
      game.money += event.money; game.days -= event.days; game.health = clamp(game.health + event.health,0,100);
      game.score += Math.max(0, Math.round((event.money + event.health * 25) / 100));
      eventText = `<br><br><strong>Random event: ${escapeHtml(event.title)}</strong><br>${escapeHtml(event.text)}<br>Impact: ${currency(event.money)} · ${event.days} day · health ${event.health}`;
    }
    eventCard.className = "event-card visible";
    eventCard.innerHTML = `<strong>Reached ${escapeHtml(state.name)}!</strong><br>You used ${escapeHtml(cost.plan.transport.label)}, stayed in a ${escapeHtml(cost.plan.stay.label)}, and ate ${escapeHtml(cost.plan.food.label)}.<br>Local food memory: <strong>${escapeHtml(state.food)}</strong>. Reward: +${state.reward} score.${eventText}`;
    if (game.money <= 0 || game.days <= 0 || game.health <= 0) eventCard.innerHTML += "<br><br><strong>Survival warning:</strong> Your journey is almost over. Rest or reset before continuing.";
    if (game.visited.length === states.length) { eventCard.innerHTML += "<br><br><strong>Victory!</strong> You completed the available India backpacking route."; game.score += 250; }
    renderAll();
  }
  function rest(){
    if (game.money < 500 || game.days < 1){ eventCard.className="event-card visible"; eventCard.innerHTML="<strong>Cannot rest.</strong> You need at least ₹500 and 1 day."; return; }
    game.money -= 500; game.days -= 1; game.health = clamp(game.health + 18,0,100);
    eventCard.className="event-card visible"; eventCard.innerHTML="<strong>Rest day taken.</strong> Health restored by 18 points.";
    renderAll();
  }
  function suggestRoute(){
    const best = states.filter((state)=>!game.visited.includes(state.id)).map((state)=>({state,cost:visitCost(state)})).filter((item)=>item.cost.money<=game.money && item.cost.days<=game.days && game.health+item.cost.health>0).sort((a,b)=>(b.state.reward/b.cost.money)-(a.state.reward/a.cost.money))[0];
    eventCard.className="event-card visible";
    eventCard.innerHTML = best ? `<strong>Suggested next stop:</strong> ${escapeHtml(best.state.name)} · ${currency(best.cost.money)} · ${best.cost.days} days · best score-per-rupee route right now.` : "<strong>No safe route found.</strong> Try cheaper choices or rest first.";
  }
  function saveGame(){ localStorage.setItem(saveKey, JSON.stringify(game)); eventCard.className="event-card visible"; eventCard.innerHTML="<strong>Game saved.</strong> Your backpacker progress is stored in this browser."; }
  function resetGame(){
    if(!confirm("Reset Backpack Across India progress?")) return;
    localStorage.removeItem(saveKey); game={money:18500,days:34,health:100,score:0,visited:[],lastState:null}; eventCard.className="event-card"; eventCard.innerHTML=""; renderAll();
  }
  function loadGame(){ try { const saved=JSON.parse(localStorage.getItem(saveKey)||"null"); if(saved && Array.isArray(saved.visited)) game=saved; } catch {} }
  ["transport-select","stay-select","food-select"].forEach((id)=>document.getElementById(id).addEventListener("change", renderStates));
  document.getElementById("rest-button").addEventListener("click", rest);
  document.getElementById("smart-route").addEventListener("click", suggestRoute);
  document.getElementById("save-game").addEventListener("click", saveGame);
  document.getElementById("reset-game").addEventListener("click", resetGame);
  loadGame(); renderAll();
  window.BudgetTravelSurvivalGame = {state:()=>({...game}), suggestRoute, saveGame, resetGame};
});
