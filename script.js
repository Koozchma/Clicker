// --- Manual Upgrade Definitions ---
const manualUpgrades = [
    {
        id: 'strongerClicks',
        name: 'Stronger Clicks',
        description: 'Increases base score per click by {boost}.', // Placeholder for dynamic boost value
        baseCost: 10,
        costMultiplier: 1.15,
        boost: 1, // Amount base power increases
        type: 'base'
    },
    {
        id: 'clickMultiplier',
        name: 'Click Multiplier',
        description: 'Increases click multiplier by +{boost}x.', // Placeholder for dynamic boost value
        baseCost: 200,
        costMultiplier: 1.8,
        boost: 0.5, // Amount multiplier increases (e.g., 1x -> 1.5x -> 2x)
        type: 'multiplier'
    }
];

// --- Auto Generator Definitions ---
const autoGenerators = [
    { id: 'gen01', name: 'Auto Clicker Bot', baseRate: 0.1, baseCost: 15, costMultiplier: 1.15 },
    { id: 'gen02', name: 'Automated Assembly Line', baseRate: 1, baseCost: 100, costMultiplier: 1.15 },
    { id: 'gen03', name: 'Robotics Warehouse', baseRate: 8, baseCost: 1100, costMultiplier: 1.15 },
    { id: 'gen04', name: 'Data Center Node', baseRate: 47, baseCost: 12000, costMultiplier: 1.15 },
    { id: 'gen05', name: 'Quantum Computing Facility', baseRate: 260, baseCost: 130000, costMultiplier: 1.15 },
    { id: 'gen06', name: 'Fusion Power Plant', baseRate: 1400, baseCost: 1400000, costMultiplier: 1.15 },
    { id: 'gen07', name: 'Nanofactory Complex', baseRate: 7800, baseCost: 20000000, costMultiplier: 1.15 },
    { id: 'gen08', name: 'Orbital Manufacturing Ring', baseRate: 44000, baseCost: 330000000, costMultiplier: 1.15 },
    { id: 'gen09', name: 'AI Core Matrix', baseRate: 260000, baseCost: 5100000000, costMultiplier: 1.15 },
    { id: 'gen10', name: 'Singularity Engine', baseRate: 1600000, baseCost: 75000000000, costMultiplier: 1.15 }
    // Note: Balance these values!
];

// --- DOM Elements ---
const scoreDisplay = document.getElementById('score');
const scorePerSecondDisplay = document.getElementById('score-per-second');
const scorePerClickDisplay = document.getElementById('score-per-click');
const clickerButton = document.getElementById('clicker-button');
const clickButtonValueDisplay = document.getElementById('click-button-value');
const effectsContainer = document.getElementById('effects-container');
const clickArea = document.getElementById('click-area');

// NEW Gambling/Resource Elements
const quantumShardsDisplay = document.getElementById('quantum-shards');
const spacePodsDisplay = document.getElementById('space-pods');
const openPodButton = document.getElementById('open-pod-button');
const boostDisplay = document.getElementById('boost-display');
const casinoButton = document.getElementById('casino-button');
const casinoModal = document.getElementById('casino-modal');
const closeCasinoButton = document.getElementById('close-casino-button');
const casinoSpinCostDisplay = document.getElementById('casino-spin-cost-display');
const casinoShardsDisplay = document.getElementById('casino-shards-display');
const spinButton = document.getElementById('spin-button');
const casinoResultDisplay = document.getElementById('casino-result');
const luckEnhancerLevelDisplay = document.getElementById('luck-enhancer-level');
const luckEnhancerCostDisplay = document.getElementById('luck-enhancer-cost');
const buyLuckEnhancerButton = document.getElementById('buy-luck-enhancer');

// Manual Power Elements (Dropdown UI)
const manualSelect = document.getElementById('manual-select');
const selectedManualDescription = document.getElementById('selected-manual-description');
const selectedManualEffect = document.getElementById('selected-manual-effect');
const selectedManualCost = document.getElementById('selected-manual-cost');
const buySelectedManualButton = document.getElementById('buy-selected-manual');
// Auto Generator Elements (Dropdown + Optimization UI)
const generatorSelect = document.getElementById('generator-select');
const selectedGeneratorRateDisplay = document.getElementById('selected-generator-rate');
const selectedGeneratorLevelDisplay = document.getElementById('selected-generator-level');
const selectedGeneratorCostDisplay = document.getElementById('selected-generator-cost');
const buySelectedGeneratorButton = document.getElementById('buy-selected-generator');
const selectedGeneratorOptimizeLevel = document.getElementById('selected-generator-optimize-level');
const selectedGeneratorOptimizeBoost = document.getElementById('selected-generator-optimize-boost');
const selectedGeneratorOptimizeCost = document.getElementById('selected-generator-optimize-cost');
const optimizeSelectedGeneratorButton = document.getElementById('optimize-selected-generator');
// Global Boost Elements
const globalMultiplierLevelDisplay = document.getElementById('global-multiplier-level'); // Used for display only
const globalMultiplierCostDisplay = document.getElementById('global-multiplier-cost');
const buyGlobalMultiplierButton = document.getElementById('buy-global-multiplier');


// --- Game State Variables ---
let score = 0;
let scorePerSecond = 0;
let currentScorePerClick = 1;
// Click Power State
let clickPowerBase = 1; // Base power modified by 'strongerClicks'
let clickMultiplierEffect = 1; // Multiplier modified by 'clickMultiplier'
// Manual Upgrade State
let manualUpgradeState = {};
// Generator State
let generatorState = {};
const initialOptimizeCost = 500; // Base cost for Opt Lvl 1 for first generator tier
const optimizeCostMultiplier = 1.65; // Opt cost scaling
const optimizeEffectMultiplier = 1.1; // +10% boost per Opt level
// Global Multiplier State
// let globalMultiplierLevel = 0; // Level isn't strictly needed, effect is key
let globalMultiplierEffect = 1.0; // Stores the actual multiplier
let globalMultiplierCost = 1000;
const globalMultiplierIncrease = 0.1; // Effect increase per purchase
const globalMultiplierCostMultiplier = 2.0;
// Lucky Planet State
let luckyItemTimerId = null;
let luckyItemActive = false;
const minLuckySpawnTime = 30;
const maxLuckySpawnTime = 90;
const luckyItemDuration = 8;

// NEW Gambling/Casino State
let quantumShards = 0;
let ownedSpacePods = 0;
let casinoSpinCost = 5000; // Example starting cost
// Luck Enhancer State
let luckEnhancerLevel = 0;
let luckEnhancerCost = 10; // Cost in Quantum Shards
const luckEnhancerCostMultiplier = 2.5;
// Temporary Boost State
let boostType = null;
let boostMultiplier = 1.0;
let boostEndTime = 0;

// --- Initialization Functions ---
function initializeManualUpgradeState() {
    manualUpgradeState = {};
    manualUpgrades.forEach(upg => {
        manualUpgradeState[upg.id] = {
            currentCost: upg.baseCost
        };
    });
}

// Corrected single definition for initializeGeneratorState
function initializeGeneratorState() {
    generatorState = {};
    autoGenerators.forEach((gen, index) => {
        generatorState[gen.id] = {
            level: 0,
            currentCost: gen.baseCost,
            optimizeLevel: 0,
            // Scale initial opt cost slightly based on generator tier index
            optimizeCost: Math.ceil(initialOptimizeCost * Math.pow(1.5, index)) // Example scaling
        };
    });
}

function initializeGame() {
    initializeManualUpgradeState(); // Init manual state
    initializeGeneratorState(); // Init generator state (CORRECT ONE)
    populateManualSelect(); // Populate manual dropdown
    populateGeneratorSelect(); // Populate generator dropdown
    setupCasinoButtons();
    updateDisplay(); // Initial UI setup including selected dropdowns
    scheduleNextLuckyItemSpawn(); // Start lucky item timer
    setInterval(autoGenerateScore, 1000); // Start game loop
    setInterval(checkBoosts, 500);
    // Add load game from localStorage here if implemented
}

// --- Game Logic Functions ---

function calculateScorePerClick() {
     currentScorePerClick = clickPowerBase * clickMultiplierEffect;
}

// Function to update all displays on the page (REVISED with Gambling Elements)
function updateDisplay() {
    // Recalculate core values first - these functions now incorporate boosts
    calculateScorePerClick();
    calculateScorePerSecond();

    // Update standard displays
    scoreDisplay.textContent = formatNumber(score);
    scorePerSecondDisplay.textContent = formatNumber(scorePerSecond, 1);
    scorePerClickDisplay.textContent = formatNumber(currentScorePerClick, 1);
    clickButtonValueDisplay.textContent = formatNumber(currentScorePerClick, 1);

    // Update new resource/item displays ---
    quantumShardsDisplay.textContent = formatNumber(quantumShards);
    spacePodsDisplay.textContent = formatNumber(ownedSpacePods);
    openPodButton.disabled = ownedSpacePods <= 0; // Enable button only if pods > 0

    // Update UI based on active boost
    checkBoosts(); // Ensure boost display is current

    // Update upgrade sections (these functions handle their specific UI parts)
    updateSelectedManualDisplay();
    updateSelectedGeneratorDisplay(); // This now updates optimization display too

    // Update Global Boost Display
    globalMultiplierLevelDisplay.textContent = formatNumber((globalMultiplierEffect - 1) * 100); // Display boost as percentage
    globalMultiplierCostDisplay.textContent = formatNumber(Math.ceil(globalMultiplierCost));
    buyGlobalMultiplierButton.disabled = score < globalMultiplierCost;

    // Update Casino Display elements (only if the modal is currently visible) ---
    if (casinoModal.style.display === 'block') {
        casinoSpinCostDisplay.textContent = formatNumber(casinoSpinCost);
        casinoShardsDisplay.textContent = formatNumber(quantumShards); // Show current shards in modal
        spinButton.disabled = score < casinoSpinCost; // Disable spin if not enough score
    }

    // Update Casino Upgrade (Luck Enhancer) Display ---
    luckEnhancerLevelDisplay.textContent = formatNumber(luckEnhancerLevel);
    luckEnhancerCostDisplay.textContent = formatNumber(Math.ceil(luckEnhancerCost));
    // Disable button if not enough SHARDS
    buyLuckEnhancerButton.disabled = quantumShards < luckEnhancerCost

    // Check and update the active boost display ---
    checkBoosts(); // This function will handle showing/hiding/updating the boost text
}

function handleClick(event) {
    console.log("handleClick fired!"); // Check if function runs
    calculateScorePerClick(); // Explicitly calculate before use
    console.log("Score BEFORE add:", score);
    console.log("Value to add (currentScorePerClick):", currentScorePerClick);
    console.log("Base:", clickPowerBase, "Multiplier:", clickMultiplierEffect); // Check components

    // Safety check before adding
    if (typeof currentScorePerClick === 'number' && !isNaN(currentScorePerClick)) {
         score += currentScorePerClick;
    } else {
        console.error("Error: currentScorePerClick is not a valid number!", currentScorePerClick);
    }

    console.log("Score AFTER add:", score);

    createClickPopup(event); // Check console for errors from this function too!
    updateDisplay();
}

// --- Purchase Functions ---
function buyUpgrade(buttonElement, cost, purchaseLogic, upgradeName, currencyType = 'score') {
    let currentCurrency;
    if (currencyType === 'shards') { currentCurrency = quantumShards; }
    else { currentCurrency = score; }

    const isSufficient = (currencyType === 'shards') ? (currentCurrency >= cost) : ((currentCurrency >= cost) || (Math.abs(currentCurrency - cost) < 0.00001));

    if (isSufficient) {
        if (currencyType === 'shards') { quantumShards -= cost; }
        else { score -= cost; }

        try { purchaseLogic(); } catch (error) { console.error(`Error buying ${upgradeName}:`, error); }

        if (buttonElement) { /* Flash effect */ buttonElement.classList.add('purchase-flash'); setTimeout(() => { if (buttonElement) buttonElement.classList.remove('purchase-flash'); }, 400); }
        updateDisplay();
    } else {
        if (buttonElement) { /* Shake effect */ buttonElement.style.animation = 'shake 0.5s'; setTimeout(() => { if (buttonElement) buttonElement.style.animation = ''; }, 500); }
    }
}

// Corrected Global Multiplier Purchase (Updates effect directly)
function buyGlobalMultiplier(event) {
    buyUpgrade(event.target, globalMultiplierCost, () => {
        globalMultiplierEffect += globalMultiplierIncrease; // Directly increase the effect multiplier
        globalMultiplierCost = Math.ceil(globalMultiplierCost * globalMultiplierCostMultiplier); // Update cost
    }, 'Efficiency Training');
}


// Buy function for selected Manual upgrade
function buySelectedManual() {
    const selectedId = manualSelect.value;
    const upgrade = manualUpgrades.find(u => u.id === selectedId);
    const state = manualUpgradeState[selectedId];
    if (!upgrade || !state) return;

    buyUpgrade(buySelectedManualButton, state.currentCost, () => {
        // Apply effect based on type
        let nextCost;
        if (upgrade.type === 'base') {
            clickPowerBase += upgrade.boost;
            // Estimate next level based on base power - assumes level = base power
            // This might need adjustment if levels are tracked differently
            nextCost = Math.ceil(upgrade.baseCost * Math.pow(upgrade.costMultiplier, clickPowerBase));
        } else if (upgrade.type === 'multiplier') {
            clickMultiplierEffect += upgrade.boost;
            // Estimate next level based on multiplier effect
            // Assumes level = (effect - 1) / boost + 1  (Needs careful check)
            const estimatedLevel = Math.round((clickMultiplierEffect - 1) / upgrade.boost) +1; // Recalc estimated level
            nextCost = Math.ceil(upgrade.baseCost * Math.pow(upgrade.costMultiplier, estimatedLevel));

        }
         state.currentCost = nextCost; // Update cost for next level

    }, upgrade.name);
}

// Buy function for selected Generator unit
function buySelectedGenerator() {
    const selectedId = generatorSelect.value;
    const generator = autoGenerators.find(g => g.id === selectedId);
    const state = generatorState[selectedId];
    if (!generator || !state) return;

    buyUpgrade(buySelectedGeneratorButton, state.currentCost, () => {
        state.level++;
        state.currentCost = Math.ceil(generator.baseCost * Math.pow(generator.costMultiplier, state.level));
    }, generator.name + " Unit");
}

// Function to Optimize selected Generator
function optimizeSelectedGenerator() {
    const selectedId = generatorSelect.value;
    const generator = autoGenerators.find(g => g.id === selectedId);
    const state = generatorState[selectedId];
    if (!generator || !state) return;

    buyUpgrade(optimizeSelectedGeneratorButton, state.optimizeCost, () => {
        state.optimizeLevel++;
        // Recalculate the *next* optimization cost using the scaling multiplier
        state.optimizeCost = Math.ceil(state.optimizeCost * optimizeCostMultiplier);
        // Alternatively use base cost scaling if preferred:
        // state.optimizeCost = Math.ceil(initialOptimizeCost * Math.pow(1.5, autoGenerators.findIndex(g => g.id === selectedId)) * Math.pow(optimizeCostMultiplier, state.optimizeLevel));
    }, generator.name + " Optimization");
}

// --- Calculation Functions ---
function calculateScorePerSecond() {
    let rawSPS = 0;
    autoGenerators.forEach(gen => {
        const state = generatorState[gen.id];
        if (state && state.level > 0) {
             const optimizationMultiplier = Math.pow(optimizeEffectMultiplier, state.optimizeLevel);
             rawSPS += state.level * gen.baseRate * optimizationMultiplier;
        }
    });
    let finalSPS = rawSPS * globalMultiplierEffect; // Apply persistent global boost

     // Apply temporary SPS boost if active
     if (boostType === 'sps' && Date.now() < boostEndTime) {
         finalSPS *= boostMultiplier;
     }
    scorePerSecond = finalSPS;
}

// Corrected calculation for Score Per Second including optimization
function calculateScorePerSecond() {
    let rawSPS = 0;
    autoGenerators.forEach(gen => {
        const state = generatorState[gen.id];
        if (state && state.level > 0) {
             const optimizationMultiplier = Math.pow(optimizeEffectMultiplier, state.optimizeLevel);
             rawSPS += state.level * gen.baseRate * optimizationMultiplier;
        }
    });
    let finalSPS = rawSPS * globalMultiplierEffect; // Apply persistent global boost

     // Apply temporary SPS boost if active
     if (boostType === 'sps' && Date.now() < boostEndTime) {
         finalSPS *= boostMultiplier;
     }
    scorePerSecond = finalSPS;
}

// --- Effect Functions --- (createClickPopup unchanged)
function createClickPopup(event) { /* ... Full existing code ... */
    const popup = document.createElement('div');
    popup.textContent = `+${formatNumber(currentScorePerClick, 1)}`;
    popup.classList.add('click-popup');
    const clickX = event.clientX;
    const clickY = event.clientY;
    const areaRect = clickArea.getBoundingClientRect();
    const randomOffsetX = Math.random() * 40 - 20;
    popup.style.left = `${clickX - areaRect.left + randomOffsetX}px`;
    popup.style.bottom = `${areaRect.height * 0.4}px`;
    effectsContainer.appendChild(popup);
    setTimeout(() => { if (popup) popup.remove(); }, 1000);
}

// --- Lucky Planet Functions --- (All lucky planet functions unchanged)
function scheduleNextLuckyItemSpawn() { /* ... Full existing code ... */
    clearTimeout(luckyItemTimerId);
    if (luckyItemActive) return;
    const delay = (Math.random() * (maxLuckySpawnTime - minLuckySpawnTime) + minLuckySpawnTime) * 1000;
    luckyItemTimerId = setTimeout(spawnLuckyItem, delay);
 }

function spawnLuckyItem() { /* ... Full existing code ... */
    if (luckyItemActive) return;
    luckyItemActive = true;
    const planet = document.createElement('div');
    planet.classList.add('lucky-planet');
    const planetIndex = Math.floor(Math.random() * 10);
    planet.style.backgroundImage = `url('Images/planet${String(planetIndex).padStart(2, '0')}.png')`;
    const containerRect = effectsContainer.getBoundingClientRect();
    const maxX = containerRect.width - 55;
    const maxY = containerRect.height - 55;
    const minY = 80;
    const adjustedMaxY = Math.max(minY + 50, maxY - 50);
    planet.style.left = `${Math.random() * maxX}px`;
    planet.style.top = `${Math.random() * (adjustedMaxY - minY) + minY}px`;
    planet.onclick = clickLuckyItem;
    effectsContainer.appendChild(planet);
    const removeTimeoutId = setTimeout(() => removeLuckyItem(planet, false), luckyItemDuration * 1000);
    planet.dataset.removeTimeoutId = removeTimeoutId;
}

function clickLuckyItem(event) { /* ... Full existing code ... */
    const planet = event.target;
    if (!planet.classList.contains('lucky-planet')) return;
    clearTimeout(planet.dataset.removeTimeoutId);
    planet.onclick = null;
    const spsBonus = scorePerSecond * 60; // 1 min SPS
    const clickBonus = currentScorePerClick * 50; // 50 clicks worth
    const totalBonus = spsBonus + clickBonus;
    score += totalBonus;
    createBonusPopup(`+${formatNumber(totalBonus)}!`, planet);
    removeLuckyItem(planet, true);
    updateDisplay();
    scheduleNextLuckyItemSpawn();
}

function removeLuckyItem(planetElement, collected) { /* ... Full existing code ... */
    if (!planetElement || !planetElement.parentNode) return;
    clearTimeout(planetElement.dataset.removeTimeoutId);
    if (collected) {
        planetElement.classList.add('lucky-planet-collected');
         setTimeout(() => {
             if (planetElement.parentNode) planetElement.remove();
             luckyItemActive = false;
         }, 300);
    } else {
         if (planetElement.parentNode) planetElement.remove();
         luckyItemActive = false;
         scheduleNextLuckyItemSpawn();
    }
}

function createBonusPopup(text, targetElement) { /* ... Full existing code ... */
    const popup = document.createElement('div');
    popup.textContent = text;
    popup.classList.add('click-popup');
    popup.style.color = '#ffc107';
    const targetRect = targetElement.getBoundingClientRect();
    const containerRect = effectsContainer.getBoundingClientRect();
    popup.style.left = `${targetRect.left - containerRect.left + targetRect.width / 2}px`;
    popup.style.bottom = `${containerRect.height - (targetRect.top - containerRect.top) - targetRect.height / 2}px`;
    effectsContainer.appendChild(popup);
    setTimeout(() => { if (popup) popup.remove(); }, 1500);
}

// --- Manual Upgrade UI Functions ---
function populateManualSelect() {
    manualSelect.innerHTML = '';
    manualUpgrades.forEach(upg => {
        const option = document.createElement('option');
        option.value = upg.id;
        option.textContent = upg.name;
        manualSelect.appendChild(option);
    });
    // Add listener AFTER populating
    manualSelect.addEventListener('change', updateSelectedManualDisplay);
}

function updateSelectedManualDisplay() {
    const selectedId = manualSelect.value;
    const upgrade = manualUpgrades.find(u => u.id === selectedId);
    const state = manualUpgradeState[selectedId];
    if (!upgrade || !state) { // Safety check
        selectedManualDescription.textContent = "Error loading upgrade.";
        selectedManualEffect.textContent = "N/A";
        selectedManualCost.textContent = "N/A";
        buySelectedManualButton.disabled = true;
        return;
    }

    // Update description with dynamic boost value
    selectedManualDescription.textContent = upgrade.description.replace('{boost}', formatNumber(upgrade.boost, upgrade.type === 'multiplier' ? 1 : 0));

    // Update current effect display based on global state
    let currentEffectDisplay = '';
    if (upgrade.type === 'base') {
        currentEffectDisplay = `+${formatNumber(clickPowerBase, 1)} / click`; // Show current total base
    } else if (upgrade.type === 'multiplier') {
        currentEffectDisplay = `x${formatNumber(clickMultiplierEffect, 1)} total click power`; // Show current total multiplier
    }
    selectedManualEffect.textContent = currentEffectDisplay;

    selectedManualCost.textContent = formatNumber(Math.ceil(state.currentCost));
    buySelectedManualButton.disabled = score < state.currentCost;
}

// --- Generator UI Functions ---
function populateGeneratorSelect() { // Unchanged
    generatorSelect.innerHTML = '';
    autoGenerators.forEach(gen => { const option = document.createElement('option'); option.value = gen.id; option.textContent = gen.name; generatorSelect.appendChild(option); });
    // Add listener AFTER populating
    generatorSelect.addEventListener('change', updateSelectedGeneratorDisplay);
}

// Corrected Generator display function including optimization
function updateSelectedGeneratorDisplay() {
    const selectedId = generatorSelect.value;
    if (!selectedId) return; // Handle empty selection if possible initially
    const generator = autoGenerators.find(g => g.id === selectedId);
    const state = generatorState[selectedId];
    if (!generator || !state) return; // Safety check

    // Calculate and display effective rate
    const optimizationMultiplier = Math.pow(optimizeEffectMultiplier, state.optimizeLevel);
    const effectiveRate = generator.baseRate * optimizationMultiplier;
    selectedGeneratorRateDisplay.textContent = formatNumber(effectiveRate, 1);

    selectedGeneratorLevelDisplay.textContent = formatNumber(state.level);
    selectedGeneratorCostDisplay.textContent = formatNumber(Math.ceil(state.currentCost));
    buySelectedGeneratorButton.disabled = score < state.currentCost;

    // Update optimization display
    selectedGeneratorOptimizeLevel.textContent = formatNumber(state.optimizeLevel);
    const boostPercent = (optimizationMultiplier - 1) * 100;
    selectedGeneratorOptimizeBoost.textContent = formatNumber(boostPercent, 0);
    selectedGeneratorOptimizeCost.textContent = formatNumber(Math.ceil(state.optimizeCost));
    optimizeSelectedGeneratorButton.disabled = score < state.optimizeCost;
}

// --- Game Loop ---
function autoGenerateScore() { // Unchanged
    score += scorePerSecond;
    updateDisplay();
    // Add periodic save game call here
}

// --- Helper function formatNumber --- (Keep improved version)
function formatNumber(num, decimals = 0) {
    const thresholds = [ { value: 1e18, suffix: 'E' }, { value: 1e15, suffix: 'P' }, { value: 1e12, suffix: 'T' }, { value: 1e9, suffix: 'B' }, { value: 1e6, suffix: 'M' }, { value: 1e3, suffix: 'K' } ];
    if (isNaN(num) || typeof num !== 'number') { return '...'; }
    if (num === 0) return '0';
    for (let i = 0; i < thresholds.length; i++) {
        if (Math.abs(num) >= thresholds[i].value) {
            const scaledValue = num / thresholds[i].value;
            const numDecimals = decimals + (thresholds[i].value < 1e9 ? 2 : 1);
            // Ensure very small scaled values show enough precision
            const fixedValue = scaledValue.toFixed(numDecimals);
            // Prevent showing "0.000K" etc. if number is just below threshold but positive
            return (parseFloat(fixedValue) === 0 && scaledValue > 0) ? scaledValue.toPrecision(2) + thresholds[i].suffix : fixedValue + thresholds[i].suffix;
       }
    }
    // For numbers less than 1000, or when decimals needed
     if (num % 1 !== 0 && decimals > 0) {
         return num.toFixed(decimals);
     }
     // Default to integer string if no decimals needed or it's naturally an integer
     return Math.floor(num).toString(); // Changed to floor for cleaner display < 1000
}

// Buy Luck Enhancer (Uses Shards)
function buyLuckEnhancer() {
    // Pass 'shards' as the currency type to the helper
    buyUpgrade(buyLuckEnhancerButton, luckEnhancerCost, () => {
        luckEnhancerLevel++;
        luckEnhancerCost = Math.ceil(luckEnhancerCost * luckEnhancerCostMultiplier);
        // Update display specific to this upgrade (level/cost) within updateDisplay
    }, 'Luck Enhancer', 'shards');
}

// --- NEW Casino and Gambling Functions ---

function setupCasinoButtons() {
    casinoButton.addEventListener('click', () => {
        casinoModal.style.display = 'block';
        updateDisplay(); // Update casino costs/shards when opening
    });
    closeCasinoButton.addEventListener('click', () => {
        casinoModal.style.display = 'none';
    });
    spinButton.addEventListener('click', spinSlots);
    openPodButton.addEventListener('click', openSpacePod);
    buyLuckEnhancerButton.addEventListener('click', buyLuckEnhancer);

    // Close modal if clicking outside the content
    window.addEventListener('click', (event) => {
        if (event.target == casinoModal) {
            casinoModal.style.display = 'none';
        }
    });
}

function spinSlots() {
    if (score < casinoSpinCost) {
        casinoResultDisplay.textContent = "Not enough score to spin!";
        // Optional: Add shake effect to spin button
        spinButton.style.animation = 'shake 0.5s';
        setTimeout(() => { spinButton.style.animation = ''; }, 500);
        return;
    }

    score -= casinoSpinCost;
    spinButton.disabled = true; // Prevent multi-clicks while processing

    // Calculate probabilities (Luck Enhancer makes bad outcomes less likely)
    // Example: reduces consolation chance by 2% per level, distributes to others
    const luckFactor = Math.max(0, 1 - (luckEnhancerLevel * 0.02)); // Ensure factor doesn't go below 0
    const consolationChance = 0.50 * luckFactor;
    const scoreChance = 0.25 + (0.50 * (1 - luckFactor) * 0.4); // Distribute 40% of reduced chance here
    const shardChance = 0.10 + (0.50 * (1 - luckFactor) * 0.2); // Distribute 20% here
    const boostChance = 0.10 + (0.50 * (1 - luckFactor) * 0.2); // Distribute 20% here
    // Pod chance gets the remaining ~20% of the reduced consolation chance
    const podChance = 1.0 - consolationChance - scoreChance - shardChance - boostChance;

    const rand = Math.random();
    let resultMessage = "";

    if (rand < consolationChance) {
        // 1. Consolation Prize
        const refund = casinoSpinCost * 0.1;
        score += refund;
        resultMessage = `Quantum Entanglement Misfire... Recovered ${formatNumber(refund)} score.`;
    } else if (rand < consolationChance + scoreChance) {
        // 2. Score Lump Sum
        const scoreBonus = scorePerSecond * 60 * (Math.random() * 0.5 + 0.75); // 45-75 seconds of SPS
        score += scoreBonus;
        resultMessage = `Temporal Echo! Gained +${formatNumber(scoreBonus)} score!`;
    } else if (rand < consolationChance + scoreChance + shardChance) {
        // 3. Quantum Shards
        const shardsGained = Math.floor(Math.random() * 5) + 1; // 1-5 shards
        quantumShards += shardsGained;
        resultMessage = `Reality Fracture! Found ${shardsGained} Quantum Shard(s)!`;
    } else if (rand < consolationChance + scoreChance + shardChance + boostChance) {
        // 4. Temporary Boost
        const boostDuration = 60 * 1000; // 60 seconds
        boostType = 'sps'; // Or randomly choose 'sps'/'click'?
        boostMultiplier = 1.5; // +50%
        boostEndTime = Date.now() + boostDuration;
        resultMessage = `Energy Surge! +50% SPS for 60 seconds!`;
        checkBoosts(); // Immediately update display/calculations
    } else {
        // 5. Space Pod
        ownedSpacePods++;
        resultMessage = `Rare Anomaly Detected! Acquired 1 Space Pod!`;
    }

    casinoResultDisplay.textContent = resultMessage;
    updateDisplay(); // Update score, shards, pods etc.

    // Re-enable button after a short delay
    setTimeout(() => {
         if (casinoModal.style.display === 'block') { // Only re-enable if modal still open
             spinButton.disabled = score < casinoSpinCost;
         }
    }, 500); // Delay to prevent immediate re-spin spam
}

function openSpacePod() {
    if (ownedSpacePods <= 0) return;
    ownedSpacePods--;

    const rand = Math.random();
    let resultMessage = "Opened Pod: ";

    if (rand < 0.40) { // 40% Large Score Sum
        const scoreBonus = scorePerSecond * 300 * (Math.random() + 0.5); // 2.5-7.5 mins SPS
        score += scoreBonus;
        resultMessage += `Found concentrated energy! +${formatNumber(scoreBonus)} score!`;
    } else if (rand < 0.70) { // 30% Large Shard Amount
        const shardsGained = Math.floor(Math.random() * 16) + 10; // 10-25 shards
        quantumShards += shardsGained;
        resultMessage += `Uncovered a shard cluster! +${shardsGained} Quantum Shards!`;
    } else if (rand < 0.90) { // 20% Powerful Temp Boost
        const boostDuration = 120 * 1000; // 2 minutes
        boostType = 'click'; // Click boost from pods?
        boostMultiplier = 2.0; // +100% click power
        boostEndTime = Date.now() + boostDuration;
        resultMessage += `Hyper-Efficiency Matrix! +100% Click Power for 2 minutes!`;
        checkBoosts();
    } else if (rand < 0.99) { // 9% Free Optimization Level
        if (autoGenerators.length > 0) {
            const randomGenIndex = Math.floor(Math.random() * autoGenerators.length);
            const randomGenId = autoGenerators[randomGenIndex].id;
            const state = generatorState[randomGenId];
            state.optimizeLevel++;
            state.optimizeCost = Math.ceil(state.optimizeCost * optimizeCostMultiplier); // Increase next cost too
            resultMessage += `Reverse-engineered tech! Free Optimization level for ${autoGenerators[randomGenIndex].name}!`;
        } else {
            resultMessage += `Found optimization plans... but you have no generators!`;
        }
    } else { // 1% Quantum Duplicator
        if (autoGenerators.length > 0) {
             // Find generators player actually owns
             const ownedGenerators = autoGenerators.filter(gen => generatorState[gen.id]?.level > 0);
             if (ownedGenerators.length > 0) {
                const randomOwnedGenIndex = Math.floor(Math.random() * ownedGenerators.length);
                const randomGenId = ownedGenerators[randomOwnedGenIndex].id;
                const state = generatorState[randomGenId];
                const duplicatedAmount = state.level;
                state.level *= 2; // Double the level
                 // Also need to update the 'currentCost' to reflect the new higher level for the *next* purchase
                 state.currentCost = Math.ceil(ownedGenerators[randomOwnedGenIndex].baseCost * Math.pow(ownedGenerators[randomOwnedGenIndex].costMultiplier, state.level));
                resultMessage += `Quantum Duplication Event! Doubled your ${ownedGenerators[randomOwnedGenIndex].name} count (added ${duplicatedAmount})!`;
             } else {
                 resultMessage += `Duplicator primed... but you don't own any generators to duplicate!`;
             }
        } else {
             resultMessage += `Found a Quantum Duplicator... strange...`;
        }
    }

    // Display result (maybe use casino display temporarily or a dedicated popup)
    casinoResultDisplay.textContent = resultMessage; // Simple display for now
    if (casinoModal.style.display !== 'block') { // If casino isn't open, maybe alert or use another display
        // Consider adding a dedicated notification area later
         console.log("Pod Result:", resultMessage);
    }

    updateDisplay();
}

function checkBoosts() {
    if (boostEndTime === 0) { // No boost active or just initialized
        boostDisplay.style.display = 'none';
        return;
    }

    const now = Date.now();
    if (now >= boostEndTime) {
        // Boost expired
        boostDisplay.style.display = 'none';
        boostType = null;
        boostMultiplier = 1.0;
        boostEndTime = 0;
        // Force recalculation as boost ended
        calculateScorePerClick();
        calculateScorePerSecond();
        updateDisplay(); // Update UI to remove boost text potentially
    } else {
        // Boost active, update text
        const timeLeft = Math.ceil((boostEndTime - now) / 1000);
        const boostPercent = Math.round((boostMultiplier - 1) * 100);
        boostDisplay.textContent = `Boost: +${boostPercent}% ${boostType === 'sps' ? 'SPS' : 'Click'} (${timeLeft}s left)`;
        boostDisplay.style.display = 'block';
    }
}


// --- Event Listeners ---
clickerButton.addEventListener('click', handleClick);
buyGlobalMultiplierButton.addEventListener('click', buyGlobalMultiplier);
buySelectedManualButton.addEventListener('click', buySelectedManual); // New
buySelectedGeneratorButton.addEventListener('click', buySelectedGenerator);
optimizeSelectedGeneratorButton.addEventListener('click', optimizeSelectedGenerator); // New
// Dropdown listeners are added in populate functions


// --- START THE GAME ---
initializeGame();