// --- Global Variables & Constants ---
const { Neat, methods, architect } = neataptic; // Neataptic library for the AI

// --- DOM Element References ---
// (Keep all the element references as before)
const welcomeScreen = document.getElementById("welcomeScreen");
const gameScreen = document.getElementById("gameScreen");
const startGameButton = document.getElementById("startGameButton");
// Configuration Screen Inputs
const configMutationRateSlider = document.getElementById("configMutationRate");
const mutationRateValue = document.getElementById("mutationRateValue");
const configMutationAmountSlider = document.getElementById("configMutationAmount");
const mutationAmountValue = document.getElementById("mutationAmountValue");
const configElitismSlider = document.getElementById("configElitism");
const elitismValue = document.getElementById("elitismValue");
const mutationMethodsContainer = document.getElementById("mutationMethodsContainer");
const configGravitySlider = document.getElementById("configGravity");
const gravityValue = document.getElementById("gravityValue");
const configThrustSlider = document.getElementById("configThrust");
const thrustValue = document.getElementById("thrustValue");
const configMaxEnergySlider = document.getElementById("configMaxEnergy");
const maxEnergyValue = document.getElementById("maxEnergyValue");
const configThrustCostSlider = document.getElementById("configThrustCost");
const thrustCostValue = document.getElementById("thrustCostValue");
const configMaxHealthSlider = document.getElementById("configMaxHealth");
const maxHealthValue = document.getElementById("maxHealthValue");
const configRegenRateSlider = document.getElementById("configRegenRate");
const regenRateValue = document.getElementById("regenRateValue");
const configSensorRangeSlider = document.getElementById("configSensorRange");
const sensorRangeValue = document.getElementById("sensorRangeValue");
const configWallPenaltySlider = document.getElementById("configWallPenalty");
const wallPenaltyValue = document.getElementById("wallPenaltyValue");
const configFloorPenaltySlider = document.getElementById("configFloorPenalty");
const floorPenaltyValue = document.getElementById("floorPenaltyValue");
const configSafeZoneRewardSlider = document.getElementById("configSafeZoneReward");
const safeZoneRewardValue = document.getElementById("safeZoneRewardValue");
const configAltitudeRewardSlider = document.getElementById("configAltitudeReward");
const altitudeRewardValue = document.getElementById("altitudeRewardValue");
const configTargetProximityRewardSlider = document.getElementById("configTargetProximityReward");
const targetProximityRewardValue = document.getElementById("targetProximityRewardValue");
const configBodyWidthSlider = document.getElementById("configBodyWidth");
const bodyWidthValue = document.getElementById("bodyWidthValue");
const configBodyHeightSlider = document.getElementById("configBodyHeight");
const bodyHeightValue = document.getElementById("bodyHeightValue");
const configBoosterWidthSlider = document.getElementById("configBoosterWidth");
const boosterWidthValue = document.getElementById("boosterWidthValue");
const configBoosterHeightSlider = document.getElementById("configBoosterHeight");
const boosterHeightValue = document.getElementById("boosterHeightValue");
const configBoosterSeparationSlider = document.getElementById("configBoosterSeparation");
const boosterSeparationValue = document.getElementById("boosterSeparationValue");
const configBoosterOffsetYSlider = document.getElementById("configBoosterOffsetY");
const boosterOffsetYValue = document.getElementById("boosterOffsetYValue");
const configMotionBlurToggle = document.getElementById("configMotionBlurToggle");
const motionBlurIntensityContainer = document.getElementById("motionBlurIntensityContainer");
const configMotionBlurIntensitySlider = document.getElementById("configMotionBlurIntensity");
const motionBlurIntensityValue = document.getElementById("motionBlurIntensityValue");
const configTargetSystemEnabled = document.getElementById("configTargetSystemEnabled");
const targetSystemOptionsContainer = document.getElementById("targetSystemOptionsContainer");
const configTargetSpawnIntervalSlider = document.getElementById("configTargetSpawnInterval");
const targetSpawnIntervalValue = document.getElementById("targetSpawnIntervalValue");
const configTargetLifetimeSlider = document.getElementById("configTargetLifetime");
const targetLifetimeValue = document.getElementById("targetLifetimeValue");
// Game Screen Elements
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d"); // Our drawing context
const messageBox = document.getElementById("messageBox");
const resetButton = document.getElementById("resetButton");
const scoreDisplay = document.getElementById("scoreDisplay");
const aiScoreDisplay = document.getElementById("aiScoreDisplay");
const playbackScoreDisplay = document.getElementById("playbackScoreDisplay");
const uiContainer = document.getElementById("uiContainer");
const aiControls = document.getElementById("aiControls");
const populationSizeSlider = document.getElementById("populationSize");
const populationValue = document.getElementById("populationValue");
const trainingSpeedSlider = document.getElementById("trainingSpeed");
const speedValue = document.getElementById("speedValue");
const startAiButton = document.getElementById("startAiButton");
const stopAiButton = document.getElementById("stopAiButton");
const playBestAiButton = document.getElementById("playBestAiButton");
const generationCount = document.getElementById("generationCount");
const bestFitness = document.getElementById("bestFitness");
const avgFitness = document.getElementById("avgFitness");
const activeDrones = document.getElementById("activeDrones");
const currentMode = document.getElementById("currentMode");
const saveModelButton = document.getElementById("saveModelButton");
const importFile = document.getElementById("importFile");
const importFileLabel = document.getElementById("importFileLabel");
const savedModelStatus = document.getElementById("savedModelStatus");
const clearObstaclesButton = document.getElementById("clearObstaclesButton");
const viewNetworkButton = document.getElementById("viewNetworkButton");
const networkModal = document.getElementById("networkModal");
const closeNetworkModal = document.getElementById("closeNetworkModal");
const networkJsonDisplay = document.getElementById("networkJsonDisplay");
const obstacleToggle = document.getElementById("obstacleToggle");
const gameScaleSelect = document.getElementById("gameScaleSelect");
const obstacleMinSpeedSlider = document.getElementById("obstacleMinSpeedSlider");
const obstacleMinSpeedValue = document.getElementById("obstacleMinSpeedValue");
const obstacleMaxSpeedSlider = document.getElementById("obstacleMaxSpeedSlider");
const obstacleMaxSpeedValue = document.getElementById("obstacleMaxSpeedValue");
const obstacleSpawnIntervalSlider = document.getElementById("obstacleSpawnIntervalSlider");
const obstacleSpawnIntervalValue = document.getElementById("obstacleSpawnIntervalValue");
const obstacleMinSizeSlider = document.getElementById("obstacleMinSizeSlider");
const obstacleMinSizeValue = document.getElementById("obstacleMinSizeValue");
const obstacleMaxSizeSlider = document.getElementById("obstacleMaxSizeSlider");
const obstacleMaxSizeValue = document.getElementById("obstacleMaxSizeValue");
const scaleControlContainer = document.getElementById("scaleControlContainer");


// --- Game State & AI Variables ---
let neat;                     // Neataptic instance
let aiDrones = [];            // Array holding all AI drone instances during training
let playbackDrone = null;     // Holds the single drone instance during playback mode
let bestGenomeEver = null;    // Stores the best performing neural network found so far
let generation = 0;           // Current AI training generation
let highestFitness = 0;       // Best score achieved in the current/last generation
let averageFitness = 0;       // Average score in the current/last generation
let aiTrainingActive = false; // Flag: Is AI training currently running?
let playbackModeActive = false; // Flag: Is playback mode currently running?
let populationCount = parseInt(populationSizeSlider.value); // How many AI drones per generation
let animationFrameId;         // ID for the main game loop animation frame
let gameRunning = false;      // Is the manual game currently active (not game over)?
let obstacles = [];           // Array holding active obstacle objects
let obstacleSpawnTimer = 0;   // Timer to control obstacle spawning frequency
let obstaclesEnabled = false; // Flag: Should obstacles be spawned? (Set by checkbox)
let score = 0;                // Score for the manual player
let playbackScore = 0;        // Score achieved during the current playback session
let startTime = 0;            // Timestamp when the current game/training/playback started
let lastTimestamp = 0;        // Timestamp of the previous frame for calculating delta time
let simulationSpeed = parseInt(trainingSpeedSlider.value); // Multiplier for AI training speed
let gameScale = parseFloat(gameScaleSelect.value); // Overall scaling factor for game elements
let currentTargets = [];      // Array holding active target objects (usually just one)
let targetSpawnCooldown = 0;  // Timer to control delay between target spawns
let particles = [];           // Array holding active particle effect objects

// --- New Target System: Fixed, Looping Spawn Points ---
// Define 3 specific locations for targets to appear, relative to canvas size.
// This makes the AI's task more predictable.
const HARDCODED_TARGET_SPAWN_POINTS = [
    { xRatio: 0.3, yRatio: 0.2 }, // Left-Middle
    { xRatio: 0.5, yRatio: 0.5 }, // Left-Middle
    { xRatio: 0.4, yRatio: 0.6 }, // Left-Middle
];
let currentTargetSpawnIndex = 0; // Index to track which hardcoded point is next

// --- Audio Variables ---
let audioCtx = null;                  // The Web Audio API context
const activeBoosterSounds = new Map(); // Stores active sound nodes for each drone's booster
let isAudioInitialized = false;       // Flag to ensure audio context is ready

// --- Default Configuration Object ---
// These values are the starting point and can be overridden by the welcome screen settings.
let CONFIG = {
    // NEAT AI Settings
    mutationRate: 0.6,          // Chance of a mutation occurring
    mutationAmount: 4,          // Number of mutations to apply if mutation occurs
    elitismPercent: 15,         // Percentage of top performers carried to the next generation unchanged
    mutationMethods: [          // Allowed mutation types for NEAT
        methods.mutation.ADD_NODE,
        methods.mutation.SUB_NODE,
        methods.mutation.ADD_CONN,
        methods.mutation.SUB_CONN,
        methods.mutation.MOD_WEIGHT,
        methods.mutation.MOD_BIAS,
        methods.mutation.MOD_ACTIVATION,
        methods.mutation.ADD_GATE,
        methods.mutation.SUB_GATE,
        methods.mutation.ADD_SELF_CONN,
        methods.mutation.SUB_SELF_CONN,
        methods.mutation.ADD_BACK_CONN,
        methods.mutation.SUB_BACK_CONN,
    ],

    // Game Physics & Core Mechanics
    gravity: 0.09,              // Downward acceleration
    thrustPower: 0.19,          // Force applied by boosters
    sensorRange: 250,           // Max distance AI sensors can 'see' obstacles (base value)
    baseMaxHealth: 200,         // Starting maximum health
    baseMaxEnergy: 100,         // Starting maximum energy
    thrustEnergyCost: 0.2,      // Energy consumed per frame of thrusting
    healthRegenRate: 0.15,      // Passive health regeneration per frame when safe
    drag: 0.985,                // Velocity multiplier per frame (friction/air resistance)
    maxSpeed: 7,                // Maximum velocity magnitude
    maxHoverStabilitySpeed: 1.0,// Speed threshold below which hover stability reward applies
    maxFloatVY: 1.0,            // Max vertical speed considered 'floating' for passive regen

    // AI Penalties & Rewards
    wallPenalty: 0.4,           // Score reduction per frame near walls/ceiling
    floorPenalty: 0.8,          // Score reduction per frame near floor
    safeZoneReward: 0.05,       // Small reward for being away from walls/floor (deprecated?)
    altitudeReward: 0.06,       // Reward based on height (needs review if used)
    targetProximityRewardFactor: 2.5, // Multiplier for reward based on closeness to target
    hoverStabilityReward: 0.15, // Reward per frame for hovering stably over target
    survivalReward: 0.01,       // Base reward per frame for just staying alive
    obstacleHitPenalty: 1.0,    // Score reduction upon hitting an obstacle
    energyCostPenaltyFactor: 0.05, // Score reduction multiplier based on energy spent
    velocityPenaltyNearTargetFactor: 0.1, // Penalty multiplier for moving too fast near target

    // Damage & Collisions
    wallHitDamage: 20,          // Damage taken from hitting walls/ceiling/floor body
    boosterHitDamage: 5,        // Damage taken if boosters hit walls/ceiling/floor
    baseObstacleDamage: 8,      // Base damage from hitting an obstacle
    obstacleDamageSizeFactor: 0.2, // Damage multiplier based on obstacle size
    obstacleDamageSpeedFactor: 3, // Damage multiplier based on impact speed with obstacle
    wallThresholdX: 30,         // Distance from side walls to start penalty (base)
    wallThresholdY: 20,         // Distance from ceiling to start penalty (base)
    floorThreshold: 50,         // Distance from floor to start penalty (base)

    // Drone Dimensions (Base values, scaled later)
    baseBodyWidth: 40,
    baseBodyHeight: 18,
    baseBoosterWidth: 10,
    baseBoosterHeight: 20,
    baseBoosterSeparation: 60,  // Distance between booster centers
    baseBoosterOffsetY: 0,      // Vertical offset of boosters relative to body center

    // Visuals & Effects
    motionBlurEnabled: false,
    motionBlurIntensity: 0.2,
    motionBlurTrailLength: 5,   // Number of previous positions to draw for blur
    bloomIntensity: 15,         // Glow effect intensity for booster flames

    // Target System
    targetSystemEnabled: true,
    targetSpawnIntervalSeconds: 0.5, // Time between target spawns (if previous is gone)
    targetLifetimeSeconds: 30.0,  // How long a target stays before disappearing
    targetSize: 160,             // **REVISED:** Diameter of the target (base value)
    targetColor: "#FFD700",       // Gold
    targetCompleteColor: "#00FF00", // Green
    targetMissedColor: "#AAAAAA",  // Gray
    targetBloomColor: "rgba(255, 215, 0, 0.5)", // Semi-transparent gold for glow
    targetBloomSize: 30,        // Size of the target glow effect (base)
    targetHoverDistance: 50,    // Max distance from center to be considered hovering (base)
    targetCompletionScoreBonus: 250, // Score awarded for completing a target hover
    hoverRegenRate: 40,         // Health/Energy regeneration rate (% per second) while hovering
    hoverCompletionMaxStatBonus: 5, // Percentage increase to max H/E after completing hover

    // Booster Mechanics
    boosterRotationSpeed: 0.07, // How fast boosters rotate per frame based on input
    maxBoosterAngle: Math.PI / 2.5, // Maximum angle boosters can tilt (radians)
};


// --- Scaled Game Variables ---
// These are calculated based on CONFIG and gameScale, used directly in simulation/rendering.
let scaledSensorRange = CONFIG.sensorRange * gameScale;
let scaledGravity = CONFIG.gravity; // Gravity usually isn't scaled with visuals
let scaledThrustPower = CONFIG.thrustPower; // Thrust power usually isn't scaled
let scaledBodyWidth = CONFIG.baseBodyWidth * gameScale;
let scaledBodyHeight = CONFIG.baseBodyHeight * gameScale;
let scaledBoosterWidth = CONFIG.baseBoosterWidth * gameScale;
let scaledBoosterHeight = CONFIG.baseBoosterHeight * gameScale;
let scaledBoosterSeparation = CONFIG.baseBoosterSeparation * gameScale;
let scaledBoosterOffsetY = CONFIG.baseBoosterOffsetY * gameScale;
let baseObstacleMinSize = parseInt(obstacleMinSizeSlider.value); // Read from UI slider
let baseObstacleMaxSize = parseInt(obstacleMaxSizeSlider.value); // Read from UI slider
let scaledObstacleMinSize = baseObstacleMinSize * gameScale;
let scaledObstacleMaxSize = baseObstacleMaxSize * gameScale;
let scaledWallThresholdX = CONFIG.wallThresholdX * gameScale;
let scaledWallThresholdY = CONFIG.wallThresholdY * gameScale;
let scaledFloorThreshold = CONFIG.floorThreshold * gameScale;
let scaledTargetSize = CONFIG.targetSize * gameScale;
let scaledTargetHoverDistance = CONFIG.targetHoverDistance * gameScale;

// --- Obstacle Settings (from UI sliders) ---
let obstacleMinSpeed = parseFloat(obstacleMinSpeedSlider.value);
let obstacleMaxSpeed = parseFloat(obstacleMaxSpeedSlider.value);
let obstacleSpawnInterval = parseInt(obstacleSpawnIntervalSlider.value); // Frames between spawns

// --- Base Drone Object Template ---
// Used as a blueprint for creating manual, AI, and playback drones.
const baseDrone = {
    // Core properties
    x: 0, y: 0,         // Position
    vx: 0, vy: 0,       // Velocity
    health: 0, energy: 0, // Current stats
    maxHealth: 0, maxEnergy: 0, // Maximum stats (can increase)
    alive: true,        // Is the drone currently operational?
    score: 0,           // Current score (used for fitness in AI)
    thrusting: false,   // Is the thrust input currently active?

    // Visual properties
    bodyColor: "#FFFFFF",        // Default body color
    boosterColor: "#CCCCCC",     // Default booster color
    boosterActiveColor: "#FF5722", // Color when thrusting (currently unused directly)
    boosterFlameColor1: "rgba(255, 165, 0, 0.9)", // Orange for flame
    boosterFlameColor2: "rgba(255, 87, 34, 0.7)",  // Reddish for flame tip
    energyBarColor: "#60a5fa",   // Color for the energy bar

    // Dimensions (set from scaled values on reset)
    bodyWidth: 0, bodyHeight: 0,
    boosterWidth: 0, boosterHeight: 0,
    boosterSeparation: 0, boosterOffsetY: 0,

    // Control state
    leftBoosterAngle: 0, rightBoosterAngle: 0, // Current angle of boosters (radians)

    // Type flags
    isManual: false, isPlayback: false, isTraining: false,

    // Visual effects
    trail: [], // Stores previous positions for motion blur

    // Target interaction
    hoveringTarget: null, // Reference to the target object the drone is currently hovering over

    // AI Sensor Inputs (normalized values between 0 and 1, or -1 and 1)
    sensors: {
        distBottom: 0,      // Proximity to the floor (1 = top, 0 = floor)
        distLeftWall: 0,    // Proximity to the left wall (0 = left wall, 1 = right wall)
        distRightWall: 0,   // Proximity to the right wall (1 = left wall, 0 = right wall)
        velX: 0,            // Horizontal velocity (-1 = max left, 1 = max right)
        velY: 0,            // Vertical velocity (-1 = max up, 1 = max down)
        obsDistForward: 1,  // Normalized distance to nearest obstacle directly 'ahead' (relative to sensors, here means up-ish?) (1 = far, 0 = close) - Currently set to fixed 'up' direction
        obsDistLeft: 1,     // Normalized distance to nearest obstacle left (1 = far, 0 = close)
        obsDistRight: 1,    // Normalized distance to nearest obstacle right (1 = far, 0 = close)
        obsDistFwdLeft: 1,  // Normalized distance to nearest obstacle diagonally forward-left (1 = far, 0 = close)
        obsDistFwdRight: 1, // Normalized distance to nearest obstacle diagonally forward-right (1 = far, 0 = close)
        obsDistDown: 1,     // Normalized distance to nearest obstacle down (1 = far, 0 = close)
        currentHealth: 1,   // Normalized health (0 to 1)
        currentEnergy: 1,   // Normalized energy (0 to 1)
        targetDirX: 0,      // Normalized horizontal direction to the target (-1 to 1)
        targetDirY: 0,      // Normalized vertical direction to the target (-1 to 1)
        targetDistNorm: 1,  // Normalized distance to the target (0 = close, 1 = far)
        leftBoosterAngleNorm: 0, // Normalized angle of the left booster (-1 to 1)
        rightBoosterAngleNorm: 0,// Normalized angle of the right booster (-1 to 1)
        isHovering: 0,      // Is the drone currently hovering over the target? (0 or 1)
    },

    /**
     * Checks if this drone's body bounding box overlaps with an obstacle's bounding box.
     * Simple AABB (Axis-Aligned Bounding Box) collision check.
     * @param {object} obstacle - The obstacle object to check against.
     * @returns {boolean} True if colliding, false otherwise.
     */
    checkCollision(obstacle) {
        // Drone boundaries
        const dL = this.x - this.bodyWidth / 2;
        const dR = this.x + this.bodyWidth / 2;
        const dT = this.y - this.bodyHeight / 2;
        const dB = this.y + this.bodyHeight / 2;
        // Obstacle boundaries (assuming square for simplicity here)
        const oL = obstacle.x;
        const oR = obstacle.x + obstacle.size;
        const oT = obstacle.y;
        const oB = obstacle.y + obstacle.size;

        // Check for overlap
        return dL < oR && dR > oL && dT < oB && dB > oT;
    },

    /**
     * Draws the drone on the canvas.
     * Includes body, boosters, flames (if thrusting), status bars (manual/playback),
     * motion blur trails (optional), and sensor range visualization (manual/playback).
     */
    draw() {
        ctx.save(); // Save current drawing state

        // Determine if we should draw detailed visuals (not during high-speed training)
        const showFullVisuals = !this.isTraining || simulationSpeed <= 2;

        // --- Draw Motion Blur Trail (Optional) ---
        if (showFullVisuals && CONFIG.motionBlurEnabled && this.trail.length > 0 && this.alive) {
            for (let i = this.trail.length - 1; i >= 0; i--) {
                const pos = this.trail[i];
                // Fade out older trail segments
                const alphaFactor = (i + 1) / this.trail.length;
                const alpha = CONFIG.motionBlurIntensity * alphaFactor * 0.8;

                if (alpha > 0.01) { // Only draw if reasonably visible
                    ctx.globalAlpha = alpha;

                    // Draw blurred body
                    ctx.fillStyle = this.bodyColor;
                    const gBX = pos.x - this.bodyWidth / 2;
                    const gBY = pos.y - this.bodyHeight / 2;
                    ctx.fillRect(gBX, gBY, this.bodyWidth, this.bodyHeight);

                    // Draw blurred boosters (need to handle rotation)
                    ctx.fillStyle = this.boosterColor;
                    const gLBX = pos.x - this.boosterSeparation / 2; // Left Booster X
                    const gRBX = pos.x + this.boosterSeparation / 2; // Right Booster X
                    const gBYo = pos.y + this.boosterOffsetY;        // Booster Y offset

                    // Draw left booster ghost
                    ctx.save();
                    ctx.translate(gLBX, gBYo);
                    ctx.rotate(pos.lAngle); // Use stored angle for this trail point
                    ctx.fillRect(-this.boosterWidth / 2, -this.boosterHeight / 2, this.boosterWidth, this.boosterHeight);
                    ctx.restore();

                    // Draw right booster ghost
                    ctx.save();
                    ctx.translate(gRBX, gBYo);
                    ctx.rotate(pos.rAngle); // Use stored angle for this trail point
                    ctx.fillRect(-this.boosterWidth / 2, -this.boosterHeight / 2, this.boosterWidth, this.boosterHeight);
                    ctx.restore();
                }
            }
            ctx.globalAlpha = 1.0; // Reset alpha for main drawing
        }

        // --- Draw Sensor Range Circle (Manual/Playback Only) ---
        if (showFullVisuals && (this.isManual || this.isPlayback) && this.alive && scaledSensorRange > 0) {
            ctx.globalAlpha = 0.1; // Make it subtle
            const gradient = ctx.createRadialGradient(
                this.x, this.y, scaledSensorRange * 0.3, // Inner radius
                this.x, this.y, scaledSensorRange        // Outer radius
            );
            gradient.addColorStop(0, "rgba(100,100,100,0.3)");
            gradient.addColorStop(0.8, "rgba(100,100,100,0.05)");
            gradient.addColorStop(1, "rgba(100,100,100,0)");
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, scaledSensorRange, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0; // Reset alpha
        }

        // --- Draw Main Drone Body ---
        ctx.fillStyle = this.bodyColor;
        const bX = this.x - this.bodyWidth / 2; // Body top-left X
        const bY = this.y - this.bodyHeight / 2; // Body top-left Y
        ctx.fillRect(bX, bY, this.bodyWidth, this.bodyHeight);

        // Little antenna decoration (only if full visuals)
        if (showFullVisuals) {
            ctx.fillStyle = "#ADD8E6"; // Light blue
            ctx.fillRect(this.x - 2 * gameScale, bY - 5 * gameScale, 4 * gameScale, 5 * gameScale);
        }

        // --- Draw Boosters ---
        const lBAX = this.x - this.boosterSeparation / 2; // Left Booster Attach X
        const rBAX = this.x + this.boosterSeparation / 2; // Right Booster Attach X
        const bAY = this.y + this.boosterOffsetY;        // Booster Attach Y
        this.drawBooster(lBAX, bAY, this.leftBoosterAngle, showFullVisuals);
        this.drawBooster(rBAX, bAY, this.rightBoosterAngle, showFullVisuals);

        // --- Draw Health/Energy Bars (Manual/Playback Only) ---
        if (showFullVisuals && (this.isManual || this.isPlayback) && this.alive) {
            const barWidth = this.bodyWidth * 0.8; // Make bars slightly narrower than body
            const barHeight = 3 * gameScale;
            const barSpacing = 1 * gameScale;
            const barX = this.x - barWidth / 2; // Center the bars

            // Position bars above the drone
            const healthBarY = bY - barHeight * 2 - barSpacing - 4 * gameScale;
            const energyBarY = healthBarY + barHeight + barSpacing;

            // Calculate fill ratios
            const healthRatio = this.maxHealth > 0 ? Math.max(0, this.health / this.maxHealth) : 0;
            const energyRatio = this.maxEnergy > 0 ? Math.max(0, this.energy / this.maxEnergy) : 0;

            // Draw backgrounds
            ctx.fillStyle = "#4a5568"; // gray-600
            ctx.fillRect(barX, healthBarY, barWidth, barHeight);
            ctx.fillRect(barX, energyBarY, barWidth, barHeight);

            // Draw foregrounds (filled part)
            // Health bar turns red when low
            ctx.fillStyle = healthRatio > 0.25 ? "#4ade80" : "#f87171"; // green-400 or red-400
            ctx.fillRect(barX, healthBarY, barWidth * healthRatio, barHeight);
            // Energy bar
            ctx.fillStyle = this.energyBarColor; // blue-400
            ctx.fillRect(barX, energyBarY, barWidth * energyRatio, barHeight);
        }

        ctx.restore(); // Restore drawing state
    },

    /**
     * Draws a single booster, including the flame effect if applicable.
     * @param {number} attachX - The x-coordinate where the booster attaches to the drone body.
     * @param {number} attachY - The y-coordinate where the booster attaches to the drone body.
     * @param {number} angle - The current rotation angle of the booster (radians).
     * @param {boolean} showFullVisuals - Whether to draw detailed flame effects.
     */
    drawBooster(attachX, attachY, angle, showFullVisuals) {
        ctx.save(); // Isolate transformations for this booster
        ctx.translate(attachX, attachY); // Move origin to the booster's attachment point
        ctx.rotate(angle); // Rotate the context

        // --- Draw Flame (if thrusting, has energy, and showing full visuals) ---
        const flameBaseY = this.boosterHeight / 2; // Flame starts at the bottom of the booster
        if (showFullVisuals && this.thrusting && this.energy > 0) {
            // Add a glow effect
            ctx.shadowColor = this.boosterFlameColor1;
            ctx.shadowBlur = CONFIG.bloomIntensity * gameScale; // Scale bloom

            // Calculate flame length with some randomness
            const flameLength = (20 + Math.random() * 8) * gameScale; // Scale length

            // Create a gradient for the flame color
            const flameGradient = ctx.createLinearGradient(0, flameBaseY, 0, flameBaseY + flameLength);
            flameGradient.addColorStop(0, this.boosterFlameColor1); // Orange at base
            flameGradient.addColorStop(1, this.boosterFlameColor2); // Reddish at tip

            // Draw the flame shape (a simple triangle/polygon)
            ctx.fillStyle = flameGradient;
            ctx.beginPath();
            ctx.moveTo(0, flameBaseY); // Start at center bottom of booster
            ctx.lineTo(-this.boosterWidth / 3, flameBaseY + flameLength * 0.6); // Point left
            ctx.lineTo(0, flameBaseY + flameLength); // Point down
            ctx.lineTo(this.boosterWidth / 3, flameBaseY + flameLength * 0.6); // Point right
            ctx.closePath();
            ctx.fill();

            ctx.shadowBlur = 0; // Turn off shadow for the booster body itself
        }

        // --- Draw Booster Body ---
        ctx.fillStyle = this.boosterColor;
        // Draw centered around the (translated) origin
        ctx.fillRect(-this.boosterWidth / 2, -this.boosterHeight / 2, this.boosterWidth, this.boosterHeight);

        ctx.restore(); // Restore context transformations
    },

    /**
     * Updates the drone's sensor values based on its current state and environment.
     * These values are used as inputs for the AI neural network.
     */
    updateSensors() {
        // Normalize distances to walls and floor (0 = touching, 1 = max distance/other side)
        this.sensors.distBottom = Math.max(0, Math.min(1, (canvas.height - this.y) / canvas.height));
        this.sensors.distLeftWall = Math.max(0, Math.min(1, this.x / canvas.width));
        this.sensors.distRightWall = Math.max(0, Math.min(1, (canvas.width - this.x) / canvas.width));

        // Normalize velocity relative to max speed (-1 to 1)
        this.sensors.velX = this.vx / CONFIG.maxSpeed;
        this.sensors.velY = this.vy / CONFIG.maxSpeed;

        // --- Obstacle Sensors ---
        // These cast 'rays' in different directions to find the nearest obstacle within sensor range.
        // The result is normalized distance (1 = no obstacle in range, 0 = obstacle very close).
        this.sensors.obsDistForward = this.getMinObstacleDistInDir(0, -1);   // Straight up
        this.sensors.obsDistLeft = this.getMinObstacleDistInDir(-1, 0);    // Straight left
        this.sensors.obsDistRight = this.getMinObstacleDistInDir(1, 0);     // Straight right
        this.sensors.obsDistFwdLeft = this.getMinObstacleDistInDir(-0.707, -0.707); // Diagonal up-left
        this.sensors.obsDistFwdRight = this.getMinObstacleDistInDir(0.707, -0.707); // Diagonal up-right
        this.sensors.obsDistDown = this.getMinObstacleDistInDir(0, 1);      // Straight down

        // Normalize current health and energy (0 to 1)
        this.sensors.currentHealth = this.maxHealth > 0 ? Math.max(0, this.health / this.maxHealth) : 0;
        this.sensors.currentEnergy = this.maxEnergy > 0 ? Math.max(0, this.energy / this.maxEnergy) : 0;

        // Normalize booster angles relative to max angle (-1 to 1)
        this.sensors.leftBoosterAngleNorm = this.leftBoosterAngle / CONFIG.maxBoosterAngle;
        this.sensors.rightBoosterAngleNorm = this.rightBoosterAngle / CONFIG.maxBoosterAngle;

        // --- Target Sensors ---
        const currentTarget = currentTargets.length > 0 ? currentTargets[0] : null;
        if (currentTarget) {
            const dx = currentTarget.x - this.x;
            const dy = currentTarget.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1; // Avoid division by zero

            // Normalized direction vector towards the target
            this.sensors.targetDirX = dx / dist;
            this.sensors.targetDirY = dy / dist;

            // Normalize distance to target relative to max possible distance (canvas diagonal)
            const maxDist = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
            this.sensors.targetDistNorm = Math.min(1, dist / maxDist);

        } else {
            // No target active, provide default 'neutral' sensor values
            this.sensors.targetDirX = 0;
            this.sensors.targetDirY = 0;
            this.sensors.targetDistNorm = 1; // Indicate target is 'far'
        }

        // Sensor indicating if currently hovering correctly over the active target
        this.sensors.isHovering = (this.hoveringTarget !== null && currentTargets.includes(this.hoveringTarget)) ? 1 : 0;
    },

    /**
     * Helper function for obstacle sensors. Finds the closest obstacle along a specific direction vector.
     * Uses a simplified line-segment to circle intersection test.
     * @param {number} dx - Horizontal component of the sensor direction vector.
     * @param {number} dy - Vertical component of the sensor direction vector.
     * @returns {number} Normalized distance (0-1), where 1 means no obstacle detected in range.
     */
    getMinObstacleDistInDir(dx, dy) {
        let minDistSq = scaledSensorRange * scaledSensorRange; // Max range squared
        let detected = false;

        if (scaledSensorRange <= 0) return 1.0; // No sensor range, return 'far'

        obstacles.forEach((obs) => {
            // Calculate vector from drone to obstacle center
            const obsCenterX = obs.x + obs.size / 2;
            const obsCenterY = obs.y + obs.size / 2;
            const vecToObsX = obsCenterX - this.x;
            const vecToObsY = obsCenterY - this.y;

            // Check if obstacle is roughly in the sensor direction using dot product
            const dotProduct = vecToObsX * dx + vecToObsY * dy;

            if (dotProduct > 0) { // Obstacle is generally in the right direction
                const distSq = vecToObsX * vecToObsX + vecToObsY * vecToObsY; // Distance squared to obstacle center

                // Quick check: Is obstacle center within sensor range?
                if (distSq < scaledSensorRange * scaledSensorRange) {
                    // More accurate check: Does the sensor line segment come close to the obstacle's center?
                    // Find distance from obstacle center to the sensor line segment.
                    const closestPointDistSq = this.distSqPointToSegment(
                        this.x, this.y, // Sensor start point (drone center)
                        this.x + dx * scaledSensorRange, this.y + dy * scaledSensorRange, // Sensor end point
                        obsCenterX, obsCenterY // Point to check (obstacle center)
                    );

                    // Consider the obstacle as a circle for simpler intersection
                    const effectiveObstacleRadiusSq = (obs.size / 1.5) * (obs.size / 1.5); // Approximate radius squared

                    // If the sensor line passes within the obstacle's effective radius...
                    if (closestPointDistSq < effectiveObstacleRadiusSq) {
                        // ... we have a detection. Update minimum distance found.
                        if (distSq < minDistSq) {
                            minDistSq = distSq;
                            detected = true;
                        }
                    }
                }
            }
        });

        // Return normalized distance (sqrt(distSq) / range) or 1 if nothing detected
        return detected ? Math.sqrt(minDistSq) / scaledSensorRange : 1.0;
    },

    /**
     * Helper: Calculates the squared distance from a point (px, py) to a line segment (x1,y1) -> (x2,y2).
     */
    distSqPointToSegment(x1, y1, x2, y2, px, py) {
        const l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1); // Squared length of the segment
        if (l2 === 0) return (px - x1) * (px - x1) + (py - y1) * (py - y1); // Segment is a point

        // Project point (px,py) onto the line containing the segment
        let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
        t = Math.max(0, Math.min(1, t)); // Clamp t to [0, 1] to stay within the segment

        // Calculate coordinates of the closest point on the segment
        const closestX = x1 + t * (x2 - x1);
        const closestY = y1 + t * (y2 - y1);

        // Return squared distance from the original point to the closest point on the segment
        return (px - closestX) * (px - closestX) + (py - closestY) * (py - closestY);
    },

    /**
     * Reduces the drone's health and handles death logic.
     * @param {number} amount - The amount of damage to inflict.
     */
    takeDamage(amount) {
        if (!this.alive) return; // Can't damage a dead drone

        this.health -= amount;

        if (this.health <= 0) {
            this.health = 0;
            this.alive = false;
            stopBoosterSound(this); // Stop sound if it was playing
            playSoundEffect("destruction"); // Play explosion sound

            // If drone was hovering a target, release the target
            if (this.hoveringTarget) {
                // Make sure target still exists and hasn't been completed by someone else
                if (currentTargets.includes(this.hoveringTarget)) {
                    this.hoveringTarget.hoveringDrone = null; // Mark target as free
                }
                this.hoveringTarget = null; // Clear drone's reference
            }

            // Show visual effect if not in high-speed training
            if (!this.isTraining || simulationSpeed <= 2) {
                createDestructionEffect(this.x, this.y);
            }

            // Update UI/state depending on the mode
            if (this.isManual) {
                messageBox.textContent = "Drone Destroyed!";
                gameRunning = false; // Stop manual game
                updateButtonStates();
            } else if (this.isPlayback) {
                // Message is handled in runPlayback when it detects !alive
            }
            // For AI training, death is handled by the generation loop checking .alive
        }
    },

    /**
     * The main update logic for a drone, called each simulation step.
     * Handles physics, input, collisions, scoring, sensors, etc.
     * @param {number} deltaTime - Time elapsed since the last update (in seconds).
     * @param {object} inputData - Contains input signals (e.g., {thrust: 0.8, rotation: -0.5}).
     *                            For manual, it's {left: bool, right: bool, thrust: bool}.
     */
    update(deltaTime, inputData = {}) {
        if (!this.alive) return; // Don't update dead drones

        // --- Process Input ---
        let rotationInput = 0; // -1 for left, 1 for right, 0 for none
        let thrustInput = false; // true if thrusting

        if (this.isManual) {
            // Read from keyboard state
            if (inputData.left) rotationInput = -1;
            if (inputData.right) rotationInput = 1;
            thrustInput = inputData.thrust;
        } else { // AI or Playback
            // AI output: thrust (0 to 1), rotation (-1 to 1, needs mapping)
            thrustInput = inputData.thrust > 0.5; // Threshold AI thrust output
            // Map AI rotation output (-1 to 1) to rotationInput (-1 to 1)
            // The raw output is often treated as -1 to 1 directly or scaled. Here, it seems direct.
            const rawRotation = inputData.rotation; // Assuming AI output is already roughly -1 to 1
            // Clamp the rotation input just in case AI outputs extreme values
            rotationInput = Math.max(-1, Math.min(1, rawRotation));
            // If using range 0-1 for rotation, map it: const rawRotation = inputData.rotation * 2 - 1;
        }

        // --- Update Booster Angles ---
        const rotationChange = rotationInput * CONFIG.boosterRotationSpeed;
        // Apply rotation, clamping within max angle limits
        this.leftBoosterAngle = Math.max(-CONFIG.maxBoosterAngle, Math.min(CONFIG.maxBoosterAngle, this.leftBoosterAngle + rotationChange));
        // Right booster mirrors left booster in this simple model
        this.rightBoosterAngle = this.leftBoosterAngle; // *** Or use: Math.max(-CONFIG.maxBoosterAngle, Math.min(CONFIG.maxBoosterAngle, this.rightBoosterAngle + rotationChange)); if independent control needed

        // --- Handle Thrusting & Energy ---
        this.thrusting = thrustInput; // Set flag for drawing flames etc.
        // Manage booster sound based on thrust state
        const shouldPlayBooster = this.thrusting && this.energy > 0 && this.alive;
        const isBoosterPlaying = activeBoosterSounds.has(this);
        if (shouldPlayBooster && !isBoosterPlaying) {
            playBoosterSound(this);
        } else if (!shouldPlayBooster && isBoosterPlaying) {
            stopBoosterSound(this);
        }

        let energyConsumed = 0;
        if (this.thrusting && this.energy > 0) {
            energyConsumed = CONFIG.thrustEnergyCost;
            this.energy = Math.max(0, this.energy - energyConsumed); // Consume energy

            // --- Apply Thrust Physics ---
            // Calculate world direction vector for each booster based on its angle
            // Angle 0 is straight up, positive is clockwise, negative is counter-clockwise
            // We need force upwards/sideways, so angle 0 corresponds to -PI/2 world angle
            const leftThrustDirectionWorld = this.leftBoosterAngle - (Math.PI / 2);
            const rightThrustDirectionWorld = this.rightBoosterAngle - (Math.PI / 2);

            // Calculate total thrust force components from both boosters
            const totalThrustVx = ((Math.cos(leftThrustDirectionWorld) + Math.cos(rightThrustDirectionWorld)) * scaledThrustPower) / 2;
            const totalThrustVy = ((Math.sin(leftThrustDirectionWorld) + Math.sin(rightThrustDirectionWorld)) * scaledThrustPower) / 2;

            // Apply thrust force to velocity
            this.vx += totalThrustVx;
            this.vy += totalThrustVy;

            // If energy runs out mid-thrust, stop sound
            if (this.energy <= 0 && isBoosterPlaying) {
                stopBoosterSound(this);
                this.thrusting = false; // Update thrusting state as well
            }
        }

        // --- Apply Gravity & Drag ---
        this.vy += scaledGravity; // Apply gravity constantly
        this.vx *= CONFIG.drag;   // Apply air resistance/friction
        this.vy *= CONFIG.drag;

        // --- Speed Limiting ---
        const currentSpeedSq = this.vx * this.vx + this.vy * this.vy;
        const maxSpeedSq = CONFIG.maxSpeed * CONFIG.maxSpeed;
        if (currentSpeedSq > maxSpeedSq) {
            const scaleRatio = CONFIG.maxSpeed / Math.sqrt(currentSpeedSq);
            this.vx *= scaleRatio;
            this.vy *= scaleRatio;
        }

        // --- Update Motion Blur Trail ---
        if ((!this.isTraining || simulationSpeed <= 2) && CONFIG.motionBlurEnabled) {
            this.trail.push({ x: this.x, y: this.y, lAngle: this.leftBoosterAngle, rAngle: this.rightBoosterAngle });
            if (this.trail.length > CONFIG.motionBlurTrailLength) {
                this.trail.shift(); // Remove oldest point if trail is too long
            }
        } else {
            this.trail = []; // Clear trail if blur disabled or in fast training
        }


        // --- Update Position ---
        this.x += this.vx;
        this.y += this.vy;

        // --- Sanity Check for NaN values ---
        if (isNaN(this.x) || isNaN(this.y) || isNaN(this.vx) || isNaN(this.vy)) {
            console.error("NaN detected in drone state!", this);
            this.alive = false; // Kill drone immediately
            stopBoosterSound(this);
            if (this.hoveringTarget) {
                if (currentTargets.includes(this.hoveringTarget)) this.hoveringTarget.hoveringDrone = null;
                this.hoveringTarget = null;
            }
            if (this.isManual) {
                gameRunning = false;
                updateButtonStates();
                messageBox.textContent = "Error: Invalid physics state!";
            } else if (this.isPlayback) {
                // Handled in runPlayback
            }
            // AI will be handled by generation loop
            return; // Stop further updates this frame
        }


        // --- Boundary Collisions & Penalties ---
        const halfBodyWidth = this.bodyWidth / 2;
        const halfBodyHeight = this.bodyHeight / 2;
        let hitWall = false;    // Flag if body hit a boundary
        let boosterHit = false; // Flag if a booster hit a boundary

        // Check booster collision first (more sensitive)
        const boosterPoints = this.getBoosterWorldPoints();
        boosterPoints.forEach(point => {
            let collisionPoint = null; // Point of impact
            if (point.x < 0) collisionPoint = { x: 0, y: point.y };
            else if (point.x > canvas.width) collisionPoint = { x: canvas.width, y: point.y };

            if (point.y < 0) collisionPoint = { x: point.x, y: 0 };
            else if (point.y > canvas.height) collisionPoint = { x: point.x, y: canvas.height };

            if (collisionPoint) {
                boosterHit = true;
                playSoundEffect("booster_hit", 0.8); // Play specific sound
                if (!this.isTraining || simulationSpeed <= 2) {
                    createBoosterImpactEffect(collisionPoint.x, collisionPoint.y);
                }
                this.takeDamage(CONFIG.boosterHitDamage); // Apply smaller damage
            }
        });

        // Check body collisions with boundaries
        if (this.x < halfBodyWidth) { this.x = halfBodyWidth; this.vx *= -0.3; hitWall = true; } // Left wall
        else if (this.x > canvas.width - halfBodyWidth) { this.x = canvas.width - halfBodyWidth; this.vx *= -0.3; hitWall = true; } // Right wall

        if (this.y < halfBodyHeight) { this.y = halfBodyHeight; this.vy = 0; hitWall = true; } // Ceiling
        if (this.y > canvas.height - halfBodyHeight) { // Floor
            this.y = canvas.height - halfBodyHeight;
            // Bounce slightly, add friction
            this.vy *= -0.3;
            this.vx *= 0.95;
            hitWall = true;
        }

        // Apply damage if body hit wall AND booster didn't already hit
        if (hitWall && !boosterHit) {
            const impactSpeed = Math.sqrt(currentSpeedSq);
            const intensity = Math.min(1.0, impactSpeed / (CONFIG.maxSpeed * 0.7));
            playSoundEffect("wall_hit", intensity); // Play general impact sound
            this.takeDamage(CONFIG.wallHitDamage); // Apply larger damage
        }

        // Check if fallen off screen
        if (this.y > canvas.height + this.bodyHeight * 2) {
            this.alive = false;
            stopBoosterSound(this);
            if (this.hoveringTarget) {
                if (currentTargets.includes(this.hoveringTarget)) this.hoveringTarget.hoveringDrone = null;
                this.hoveringTarget = null;
            }
            if (this.isManual) {
                messageBox.textContent = "Drone lost!";
                gameRunning = false;
                updateButtonStates();
            } else if (this.isPlayback) {
                // Handled in runPlayback
            }
        }

        // --- Obstacle Collisions ---
        let collidingWithObstacle = false;
        obstacles.forEach((obs) => {
            if (this.checkCollision(obs)) {
                collidingWithObstacle = true;
                // Calculate damage based on speed and obstacle size
                const speedFactor = Math.min(1, Math.sqrt(currentSpeedSq) / CONFIG.maxSpeed);
                const sizeFactor = obs.size / ((scaledObstacleMinSize + scaledObstacleMaxSize) / 2);
                const damage = CONFIG.baseObstacleDamage
                    + (sizeFactor * CONFIG.obstacleDamageSizeFactor * CONFIG.baseObstacleDamage)
                    + (speedFactor * CONFIG.obstacleDamageSpeedFactor);

                const intensity = Math.min(1.5, damage / (CONFIG.baseObstacleDamage * 2));
                playSoundEffect("obstacle_hit", intensity);
                this.takeDamage(damage);

                // Apply a small knockback impulse away from the obstacle center
                const impulseX = this.x - (obs.x + obs.size / 2);
                const impulseY = this.y - (obs.y + obs.size / 2);
                const impulseMag = Math.sqrt(impulseX * impulseX + impulseY * impulseY) || 1;
                const impulseStrength = 1.0 + intensity * 0.5; // Stronger impulse for harder hits
                this.vx += (impulseX / impulseMag) * impulseStrength;
                this.vy += (impulseY / impulseMag) * impulseStrength;

                // Apply AI score penalty for hitting obstacle
                if (!this.isManual) {
                    this.score -= CONFIG.obstacleHitPenalty;
                }
            }
        });

        // --- Target Interaction Logic ---
        const currentTarget = currentTargets.length > 0 ? currentTargets[0] : null;
        let isCurrentlyHovering = false; // Reset hover status each frame

        // Check if drone enters the target's radius and target is free
        if (currentTarget && currentTarget.hoveringDrone === null) {
            const dx = currentTarget.x - this.x;
            const dy = currentTarget.y - this.y;
            const distSq = dx * dx + dy * dy;
            // Use a slightly larger collision radius than hover radius to 'capture'
            const collisionDist = (this.bodyWidth / 2 + currentTarget.size / 2) * 1.1;

            if (distSq < collisionDist * collisionDist) {
                this.hoveringTarget = currentTarget; // Drone claims the target
                currentTarget.hoveringDrone = this; // Target notes the drone
                playSoundEffect("target_collect", 0.5); // Play collection sound
            }
        }

        // If drone is currently assigned to a target, check hover status
        if (this.hoveringTarget) {
            // Ensure the target still exists (hasn't timed out or been completed)
            if (!currentTargets.includes(this.hoveringTarget)) {
                this.hoveringTarget = null; // Target disappeared, release drone
            } else {
                const dx = this.hoveringTarget.x - this.x;
                const dy = this.hoveringTarget.y - this.y;
                const distSq = dx * dx + dy * dy;

                // Check if drone is within the strict hover distance
                if (distSq < scaledTargetHoverDistance * scaledTargetHoverDistance) {
                    isCurrentlyHovering = true; // Mark as successfully hovering

                    // Apply Health/Energy Regeneration while hovering
                    const regenRatePerSec = CONFIG.hoverRegenRate / 100.0; // Convert %/s to fraction/s
                    const healthRegenAmount = this.maxHealth * regenRatePerSec * deltaTime;
                    const energyRegenAmount = this.maxEnergy * regenRatePerSec * deltaTime;

                    this.health = Math.min(this.maxHealth, this.health + healthRegenAmount);
                    this.energy = Math.min(this.maxEnergy, this.energy + energyRegenAmount);

                } else {
                    // Drone moved out of hover range, release the target
                    this.hoveringTarget.hoveringDrone = null;
                    this.hoveringTarget = null;
                }
            }
        }

        // --- AI Scoring (Fitness Calculation) ---
        if (this.alive && !this.isManual) {
            // Base survival reward
            this.score += CONFIG.survivalReward;

            // Penalty for energy consumption
            if (energyConsumed > 0) {
                this.score -= energyConsumed * CONFIG.energyCostPenaltyFactor;
            }

            // Penalties for being too close to boundaries
            const nearWall = this.x < scaledWallThresholdX || this.x > canvas.width - scaledWallThresholdX || this.y < scaledWallThresholdY;
            const nearFloor = this.y > canvas.height - scaledFloorThreshold;
            if (nearWall) this.score -= CONFIG.wallPenalty;
            if (nearFloor) this.score -= CONFIG.floorPenalty;

            // Rewards/Penalties related to the target
            if (currentTarget) {
                const dx = currentTarget.x - this.x;
                const dy = currentTarget.y - this.y;
                const targetDist = Math.sqrt(dx * dx + dy * dy);

                // Proximity reward: Increases as drone gets closer to the target (within 1.5x sensor range)
                if (targetDist < scaledSensorRange * 1.5) {
                    // Calculate proximity ratio (0=far, 1=close)
                    const proximityRatio = Math.max(0, 1 - (targetDist / (scaledSensorRange * 1.5)));
                    // Apply reward, scaled quadratically for stronger incentive when very close
                    const proximityReward = Math.pow(proximityRatio, 2) * CONFIG.targetProximityRewardFactor;
                    this.score += proximityReward;
                }

                // Stability reward/penalty based on speed near/at target
                const currentSpeed = Math.sqrt(currentSpeedSq);
                if (isCurrentlyHovering) {
                    // Reward for being stable (low speed) while hovering
                    if (currentSpeed < CONFIG.maxHoverStabilitySpeed) {
                        this.score += CONFIG.hoverStabilityReward;
                    } else {
                        // Penalty for moving too fast while supposed to be hovering
                        const excessSpeed = currentSpeed - CONFIG.maxHoverStabilitySpeed;
                        this.score -= excessSpeed * CONFIG.velocityPenaltyNearTargetFactor * 0.5; // Less harsh penalty
                    }
                } else if (targetDist < scaledTargetHoverDistance * 2) { // If close but not hovering
                    // Penalty for approaching the target too quickly
                    if (currentSpeed > CONFIG.maxHoverStabilitySpeed * 1.5) {
                        const excessSpeed = currentSpeed - CONFIG.maxHoverStabilitySpeed * 1.5;
                        this.score -= excessSpeed * CONFIG.velocityPenaltyNearTargetFactor;
                    }
                }
            } // end if(currentTarget)
        } // end AI scoring

        // --- Passive Health Regeneration ---
        // Check conditions for passive regen: alive, not hitting walls, not near floor too much,
        // low vertical velocity, not colliding with obstacle, AND not currently hovering (hover has its own regen)
        const isFloating = !hitWall && !boosterHit && this.y < canvas.height - scaledFloorThreshold / 2 // Give more leeway than penalty zone
            && Math.abs(this.vy) < CONFIG.maxFloatVY;
        if (this.alive && isFloating && !collidingWithObstacle && !isCurrentlyHovering) {
            this.health = Math.min(this.maxHealth, this.health + CONFIG.healthRegenRate);
        }

        // --- Update Sensors (for AI/Playback next frame) ---
        // Done last to reflect the state *after* all updates this frame
        if (!this.isManual) {
            this.updateSensors();
        }

        // Note: The actual transfer of `this.score` to the AI's `genome.score`
        // happens in the `runAiGeneration` function while the drone is alive.
    },

    /**
     * Helper: Calculates the world coordinates of the four corners of both boosters.
     * Useful for more precise collision detection if needed (currently used for booster boundary hits).
     * @returns {Array<object>} An array of {x, y} points representing booster corners.
     */
    getBoosterWorldPoints() {
        const points = [];
        const halfWidth = this.boosterWidth / 2;
        const halfHeight = this.boosterHeight / 2;

        // Function to calculate corners for one booster
        const addPoints = (attachX, attachY, angle) => {
            const cosA = Math.cos(angle);
            const sinA = Math.sin(angle);
            const corners = [ // Local coordinates relative to booster center
                { x: -halfWidth, y: -halfHeight }, // Top-left
                { x: halfWidth, y: -halfHeight },  // Top-right
                { x: halfWidth, y: halfHeight },   // Bottom-right
                { x: -halfWidth, y: halfHeight }    // Bottom-left
            ];
            corners.forEach(corner => {
                // Rotate local corner point
                const rotatedX = corner.x * cosA - corner.y * sinA;
                const rotatedY = corner.x * sinA + corner.y * cosA;
                // Add attachment point offset to get world coordinates
                points.push({ x: attachX + rotatedX, y: attachY + rotatedY });
            });
        };

        // Calculate attachment points
        const leftBoosterAttachX = this.x - this.boosterSeparation / 2;
        const rightBoosterAttachX = this.x + this.boosterSeparation / 2;
        const boosterAttachY = this.y + this.boosterOffsetY;

        // Get points for both boosters
        addPoints(leftBoosterAttachX, boosterAttachY, this.leftBoosterAngle);
        addPoints(rightBoosterAttachX, boosterAttachY, this.rightBoosterAngle);

        return points;
    },

    /**
     * Resets the drone to its initial state at a given position.
     * Called when starting a new game, generation, or playback.
     * @param {number} startX - Initial x-coordinate.
     * @param {number} startY - Initial y-coordinate.
     */
    reset(startX, startY) {
        // Position & Motion
        this.x = startX;
        this.y = startY;
        this.vx = 0;
        this.vy = 0;
        this.leftBoosterAngle = 0;
        this.rightBoosterAngle = 0;
        this.thrusting = false;

        // State & Stats
        this.alive = true;
        this.score = 0;
        // Reset max health/energy based on *current* config base values
        this.maxHealth = CONFIG.baseMaxHealth;
        this.maxEnergy = CONFIG.baseMaxEnergy;
        this.health = this.maxHealth; // Start with full health
        this.energy = this.maxEnergy; // Start with full energy

        // Dimensions (apply current scaling)
        this.bodyWidth = scaledBodyWidth;
        this.bodyHeight = scaledBodyHeight;
        this.boosterWidth = scaledBoosterWidth;
        this.boosterHeight = scaledBoosterHeight;
        this.boosterSeparation = scaledBoosterSeparation;
        this.boosterOffsetY = scaledBoosterOffsetY;

        // Effects & Interaction
        this.trail = []; // Clear motion blur trail
        this.hoveringTarget = null; // Not hovering initially

        // Update sensors immediately if it's an AI drone
        if (!this.isManual) {
            this.updateSensors();
        }
        // Stop any lingering sound
        stopBoosterSound(this);
    },
};


// --- Manual Drone Instance ---
// Create the player-controlled drone using the base object as a template.
const manualDrone = {
    ...baseDrone, // Copy all properties and methods from baseDrone
    isManual: true, // Mark as manually controlled
    // Give it distinct colors
    bodyColor: "#0d6efd", // Blue
    boosterColor: "#0a58ca", // Darker Blue
};


// --- Obstacle Creation ---
/**
 * Creates a new obstacle object with random properties.
 * Obstacles spawn outside the screen and move towards the center area.
 * @returns {object} The newly created obstacle object.
 */
function createObstacle() {
    // Randomize size within the scaled limits
    const size = scaledObstacleMinSize + Math.random() * (scaledObstacleMaxSize - scaledObstacleMinSize);
    let x, y, vx, vy; // Position and velocity

    // Choose a random edge to spawn from (0=top, 1=right, 2=bottom, 3=left)
    const edge = Math.floor(Math.random() * 4);
    // Randomize speed within configured limits
    const speed = obstacleMinSpeed + Math.random() * (obstacleMaxSpeed - obstacleMinSpeed);

    // Set initial position based on spawn edge
    switch (edge) {
        case 0: // Top edge
            x = Math.random() * canvas.width;
            y = -size; // Start just above the screen
            break;
        case 1: // Right edge
            x = canvas.width + size; // Start just right of the screen
            y = Math.random() * canvas.height;
            break;
        case 2: // Bottom edge
            x = Math.random() * canvas.width;
            y = canvas.height + size; // Start just below the screen
            break;
        case 3: // Left edge
            x = -size; // Start just left of the screen
            y = Math.random() * canvas.height;
            break;
    }

    // Set a target point roughly in the middle-upper part of the screen
    const targetX = canvas.width / 2 + (Math.random() - 0.5) * (canvas.width * 0.6);
    const targetY = canvas.height / 3 + (Math.random() - 0.5) * (canvas.height * 0.4);

    // Calculate velocity vector towards the target point
    const dx = targetX - x;
    const dy = targetY - y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1; // Avoid division by zero
    vx = (dx / dist) * speed;
    vy = (dy / dist) * speed;

    // Create a random jagged shape for visual variety
    const numPoints = 5 + Math.floor(Math.random() * 6); // 5 to 10 points
    const shapePoints = [];
    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        // Randomize radius for each point to make it look like an asteroid/rock
        const radius = (size / 2) * (0.7 + Math.random() * 0.6);
        shapePoints.push({
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
        });
    }

    // Return the obstacle object
    return {
        x, y, vx, vy, size, shapePoints,
        color: `hsl(${Math.random() * 30 + 20}, 60%, ${40 + Math.random() * 20}%)`, // Random brownish/greyish color

        /** Draws the obstacle on the canvas. */
        draw() {
            // Skip drawing if in high-speed training for performance
            if (aiTrainingActive && simulationSpeed > 2) return;

            ctx.fillStyle = this.color;
            ctx.beginPath();
            // Move to the first point of the shape (relative to center, then add position)
            ctx.moveTo(this.x + this.size / 2 + this.shapePoints[0].x, this.y + this.size / 2 + this.shapePoints[0].y);
            // Draw lines to subsequent points
            for (let i = 1; i < this.shapePoints.length; i++) {
                ctx.lineTo(this.x + this.size / 2 + this.shapePoints[i].x, this.y + this.size / 2 + this.shapePoints[i].y);
            }
            ctx.closePath(); // Connect last point to first
            ctx.fill();
        },

        /** Updates the obstacle's position based on its velocity. */
        update() {
            this.x += this.vx;
            this.y += this.vy;
        },
    };
}


// --- Target System Functions ---

/**
 * Spawns a new target if the target system is enabled, enough time has passed,
 * and there isn't already an active target. Uses the hardcoded looping sequence.
 */
function spawnTargets() {

    console.warn("spawnTargets() called");

    // Check prerequisites for spawning
    if (!CONFIG.targetSystemEnabled || gameScreen.classList.contains("hidden") || currentTargets.length > 0) {
        return; // Don't spawn if disabled, game not visible, or target already exists
    }

    // Use the next spawn point from the hardcoded list
    const spawnRatio = HARDCODED_TARGET_SPAWN_POINTS[Math.floor(Math.random() * HARDCODED_TARGET_SPAWN_POINTS.length)];

    // Calculate absolute coordinates based on current canvas size
    const targetX = spawnRatio.xRatio * canvas.width;
    const targetY = spawnRatio.yRatio * canvas.height;

    // Optional: Check if the spawn location is too close to an existing obstacle
    let tooCloseToObstacle = false;
    const minObstacleDistSq = (scaledTargetSize * 3) * (scaledTargetSize * 3); // Check a radius 3x target size
    for (let obs of obstacles) {
        const obsCenterX = obs.x + obs.size / 2;
        const obsCenterY = obs.y + obs.size / 2;
        const dx = targetX - obsCenterX;
        const dy = targetY - obsCenterY;
        if (dx * dx + dy * dy < minObstacleDistSq) {
            tooCloseToObstacle = true;
            break;
        }
    }

    // If too close to an obstacle, wait a bit before trying to spawn again
    if (tooCloseToObstacle) {
        targetSpawnCooldown = 200; // Wait 200ms
        return;
    }

    // Create the new target object
    const newTarget = {
        x: targetX,
        y: targetY,
        size: scaledTargetSize,    // Use the scaled size
        color: CONFIG.targetColor,
        pulseOffset: Math.random() * Math.PI * 2, // Randomize pulse animation start
        lifetime: CONFIG.targetLifetimeSeconds * 1000, // Lifetime in milliseconds
        maxLifetime: CONFIG.targetLifetimeSeconds * 1000,
        hoveringDrone: null,       // No drone hovering initially
        spawnIndex: currentTargetSpawnIndex, // Store which spawn point it used (optional)
    };

    currentTargets.push(newTarget); // Add to the active list

    // Move to the next spawn index, looping back to 0 if needed
    currentTargetSpawnIndex = (currentTargetSpawnIndex + 1) % HARDCODED_TARGET_SPAWN_POINTS.length;

    // Set cooldown until the *next* target can potentially spawn (after this one is gone)
    targetSpawnCooldown = CONFIG.targetSpawnIntervalSeconds * 1000;

    // console.log(`Spawned target idx: ${newTarget.spawnIndex}. Next: ${currentTargetSpawnIndex}`); // Debug log
}


/**
 * Draws the active target(s) on the canvas, including visual effects.
 */
function drawTargets() {
    // Only draw if system enabled and a target exists
    if (!CONFIG.targetSystemEnabled || currentTargets.length === 0) return;

    const target = currentTargets[0]; // Assume only one target active at a time

    // --- Calculate Visual Properties ---
    const lifetimeRatio = Math.max(0, target.lifetime / target.maxLifetime); // 0-1 ratio
    // Fade out as lifetime decreases
    const baseAlpha = 0.6 + lifetimeRatio * 0.4;
    // Gentle pulsing effect using sine wave
    const pulse = Math.sin(performance.now() / 300 + target.pulseOffset) * 0.1 + 1.0; // Size multiplier 0.9 to 1.1
    const currentSize = target.size * pulse;

    ctx.save();

    // --- Bloom/Glow Effect ---
    ctx.shadowColor = CONFIG.targetBloomColor;
    ctx.shadowBlur = CONFIG.targetBloomSize * gameScale * pulse * lifetimeRatio; // Scale bloom and fade with lifetime

    // --- Draw Main Target Circle ---
    ctx.globalAlpha = baseAlpha;
    ctx.fillStyle = target.color;
    ctx.strokeStyle = "rgba(255,255,255,0.8)"; // White outline
    ctx.lineWidth = 2.0 * gameScale; // Scale outline thickness
    ctx.beginPath();
    ctx.arc(target.x, target.y, currentSize / 2, 0, Math.PI * 2); // Draw circle
    ctx.fill();
    ctx.stroke();

    // --- Draw Hover Indicator (if a drone is hovering) ---
    if (target.hoveringDrone && target.hoveringDrone.alive) {
        ctx.strokeStyle = target.hoveringDrone.bodyColor; // Use drone's color for indicator
        ctx.lineWidth = 3 * gameScale;
        // Pulsing alpha for the indicator ring
        ctx.globalAlpha = 0.5 + Math.sin(performance.now() / 150) * 0.3;
        ctx.beginPath();
        // Draw slightly outside the main target circle
        ctx.arc(target.x, target.y, currentSize / 2 + 5 * gameScale, 0, Math.PI * 2);
        ctx.stroke();
    }

    ctx.restore();
}

/**
 * Updates the state of the active target(s), primarily handling lifetime decay
 * and triggering completion/missed logic. Also handles spawning new targets.
 * @param {number} deltaTime - Time elapsed since the last update (in seconds).
 */
function updateTargets(deltaTime) {
    // If system disabled, clear any existing targets and do nothing else
    if (!CONFIG.targetSystemEnabled) {
        currentTargets = [];
        return;
    }

    // If no target exists, check cooldown and try to spawn one
    if (currentTargets.length === 0) {
        if (targetSpawnCooldown > 0) {
            targetSpawnCooldown -= deltaTime * 1000; // Decrease cooldown timer
        } else {
            spawnTargets(); // Cooldown finished, attempt spawn
        }
    }

    // If a target exists, update its lifetime
    if (currentTargets.length > 0) {
        const target = currentTargets[0];
        target.lifetime -= deltaTime * 1000; // Decrease lifetime

        // Check if lifetime has run out
        if (target.lifetime <= 0) {
            const drone = target.hoveringDrone; // Was a drone hovering when it expired?

            // --- Target Completion Logic ---
            if (drone && drone.alive && currentTargets.includes(target)) {
                // console.log("Target completed!"); // Debug log

                // Apply stat bonus to the successful drone
                const bonusFactor = 1 + CONFIG.hoverCompletionMaxStatBonus / 100.0;
                drone.maxHealth *= bonusFactor;
                drone.maxEnergy *= bonusFactor;
                // Award score bonus
                drone.score += CONFIG.targetCompletionScoreBonus;

                playSoundEffect("target_complete"); // Play success sound
                // Show visual effect (if not high-speed training)
                if (!aiTrainingActive || simulationSpeed <= 2) {
                    createTargetCompletionEffect(target.x, target.y);
                }

                // Release the drone from the target
                drone.hoveringTarget = null;

            } else { // --- Target Missed Logic ---
                // Show missed effect (if not high-speed training)
                if (!aiTrainingActive || simulationSpeed <= 2) {
                    createClaimEffect(target.x, target.y, CONFIG.targetMissedColor); // Grey particles
                    playSoundEffect("target_missed"); // Play failure sound
                }
                // If a drone was hovering but died, ensure it's released
                if (drone && currentTargets.includes(target)) {
                    drone.hoveringTarget = null;
                }
            }

            // Remove the expired/completed target from the active list
            currentTargets.splice(0, 1);
            // Reset spawn cooldown slightly to allow next spawn attempt soon
            targetSpawnCooldown = 100;
        }
    }
}


// --- Particle System --- (Generally unchanged, added comments)

/**
 * Creates a burst of particles at a specific location.
 * Used for visual feedback like explosions, target collection, etc.
 * @param {number} x - X coordinate for particle burst center.
 * @param {number} y - Y coordinate for particle burst center.
 * @param {number} count - Number of particles to create.
 * @param {string} color - Color of the particles.
 * @param {number} [speedMultiplier=1] - Multiplier for particle initial speed.
 * @param {number} [lifespanMultiplier=1] - Multiplier for particle lifespan.
 */
function createParticles(x, y, count, color, speedMultiplier = 1, lifespanMultiplier = 1) {
    // Skip particle creation during very high-speed training for performance,
    // unless it's a critical feedback color like grey/white maybe?
    // Allowing grey/white helps visualize impacts even at speed.
    if (aiTrainingActive && simulationSpeed > 4 && color !== 'grey' && color !== 'white') {
        return;
    }

    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2; // Random direction
        const speed = (Math.random() * 2 + 1) * speedMultiplier * gameScale; // Random base speed + multiplier + scaling
        particles.push({
            x, y, // Start position
            vx: Math.cos(angle) * speed, // Initial velocity x
            vy: Math.sin(angle) * speed, // Initial velocity y
            size: (Math.random() * 2 + 1) * gameScale, // Random size, scaled
            life: (Math.random() * 0.5 + 0.5) * lifespanMultiplier, // Random lifespan + multiplier
            maxLife: (Math.random() * 0.5 + 0.5) * lifespanMultiplier,
            color: color,
            gravity: 0.05 * gameScale // Slight downward pull on particles, scaled
        });
    }
}

/** Creates particle effect for generic target interaction (like initial hover claim). */
function createClaimEffect(x, y, color = CONFIG.targetColor) {
    if (aiTrainingActive && simulationSpeed > 4) return;
    createParticles(x, y, 15, color, 1.5, 0.8); // Main color burst
    createParticles(x, y, 10, 'white', 1.0, 0.6); // Smaller white sparks
}

/** Creates particle effect for successful target completion. */
function createTargetCompletionEffect(x, y) {
    if (aiTrainingActive && simulationSpeed > 4) return;
    createParticles(x, y, 25, CONFIG.targetCompleteColor, 2.0, 1.0); // Large green burst
    createParticles(x, y, 15, 'white', 1.5, 0.8);                     // White sparks
    createParticles(x, y, 10, CONFIG.targetColor, 1.0, 1.2);        // Lingering gold particles
}

/** Creates particle effect for drone destruction. */
function createDestructionEffect(x, y) {
    if (aiTrainingActive && simulationSpeed > 4) return;
    createParticles(x, y, 30, 'orange', 2.5, 1.2); // Main explosion
    createParticles(x, y, 20, 'red', 1.8, 1.0);    // Inner core
    createParticles(x, y, 15, '#555', 1.0, 1.5);   // Dark debris
}

/** Creates small spark effect for booster hitting a wall. */
function createBoosterImpactEffect(x, y) {
    if (aiTrainingActive && simulationSpeed > 4) return;
    createParticles(x, y, 5, 'grey', 1.2, 0.5); // Grey sparks
    createParticles(x, y, 3, 'white', 0.8, 0.4); // Tiny white sparks
}

/**
 * Updates the position and lifetime of all active particles.
 * Removes particles whose lifetime has expired.
 * @param {number} deltaTime - Time elapsed since the last update (in seconds).
 */
function updateParticles(deltaTime) {
    // Iterate backwards to allow safe removal during iteration
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= deltaTime; // Decrease lifetime

        if (p.life <= 0) {
            particles.splice(i, 1); // Remove dead particle
        } else {
            // Apply simple physics (gravity)
            p.vy += p.gravity;
            // Update position based on velocity
            // Multiply by 60 to make velocity units more intuitive (pixels per second-ish)
            p.x += p.vx * deltaTime * 60;
            p.y += p.vy * deltaTime * 60;
        }
    }
}

/**
 * Draws all active particles on the canvas.
 * Fades particles based on their remaining lifetime.
 */
function drawParticles() {
    // Skip drawing if in high-speed training
    if (aiTrainingActive && simulationSpeed > 4) return;

    particles.forEach((p) => {
        ctx.save();
        // Calculate alpha based on remaining life
        ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
        ctx.fillStyle = p.color;
        // Draw particle as a small circle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });
}


// --- Input Handling ---
const keysPressed = {}; // Object to track the state of currently pressed keys

// Listen for key presses
window.addEventListener('keydown', (e) => {
    // Ignore keydowns if the welcome screen is visible
    if (!welcomeScreen.classList.contains('hidden')) return;

    const key = e.key.toLowerCase(); // Normalize key name
    keysPressed[key] = true;

    // Prevent game control keys from interfering if user is typing in an input field
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'SELECT' || document.activeElement.tagName === 'TEXTAREA') {
        // Allow 'Enter' maybe, but block others if needed
        return;
    }

    // Handle non-movement hotkeys
    if (key === 'r' && !resetButton.disabled) {
        switchToManualMode();
        e.preventDefault(); // Prevent default browser action (like page refresh)
    } else if (key === 't' && !startAiButton.disabled && !aiTrainingActive) {
        startAiTraining();
        e.preventDefault();
    } else if (key === 'p' && !playBestAiButton.disabled) {
        togglePlaybackMode();
        e.preventDefault();
    } else if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd', ' '].includes(key)) {
        // Prevent arrow keys or spacebar from scrolling the page during manual play
        if ((!aiTrainingActive && !playbackModeActive) || manualDrone.isManual) {
            e.preventDefault();
        }
    }
});

// Listen for key releases
window.addEventListener('keyup', (e) => {
    // Ignore keyups if the welcome screen is visible
    if (!welcomeScreen.classList.contains('hidden')) return;
    keysPressed[e.key.toLowerCase()] = false; // Update key state
});

/**
 * Gets the current state of manual control inputs based on keysPressed.
 * @returns {object} An object like {left: boolean, right: boolean, thrust: boolean}.
 */
function getManualInput() {
    return {
        left: keysPressed['a'] || keysPressed['arrowleft'],
        right: keysPressed['d'] || keysPressed['arrowright'],
        thrust: keysPressed['w'] || keysPressed['arrowup'] || keysPressed[' '], // W, Up Arrow, or Space for thrust
    };
}

// --- UI Update Functions ---

/**
 * Updates the enabled/disabled state and text of various control buttons
 * based on the current game mode (Manual, AI Training, Playback) and AI model availability.
 */
function updateButtonStates() {
    // Don't update if game screen isn't visible yet
    if (gameScreen.classList.contains('hidden')) return;

    const modelExists = !!bestGenomeEver; // Check if a best AI model has been found/loaded

    // Reset button only enabled in Manual mode (when not training or playing back)
    resetButton.disabled = aiTrainingActive || playbackModeActive;

    // Start/Stop AI buttons
    if (aiTrainingActive) {
        startAiButton.classList.add('hidden');
        stopAiButton.classList.remove('hidden');
        trainingSpeedSlider.disabled = false; // Allow changing speed during training
    } else {
        startAiButton.classList.remove('hidden');
        stopAiButton.classList.add('hidden');
        startAiButton.disabled = playbackModeActive; // Can't start training during playback
        trainingSpeedSlider.disabled = playbackModeActive; // Don't change speed if not training
    }

    // Playback button
    playBestAiButton.disabled = aiTrainingActive || !modelExists; // Disabled during training or if no model exists
    if (playbackModeActive) {
        playBestAiButton.textContent = "Stop Playback [P]"; // Change text and style to indicate 'Stop'
        playBestAiButton.classList.remove('bg-cyan-600', 'hover:bg-cyan-700');
        playBestAiButton.classList.add('bg-red-600', 'hover:bg-red-700');
    } else {
        playBestAiButton.textContent = "Playback AI [P]"; // Default text and style
        playBestAiButton.classList.remove('bg-red-600', 'hover:bg-red-700');
        playBestAiButton.classList.add('bg-cyan-600', 'hover:bg-cyan-700');
        // Add disabled visual style if needed
        if (playBestAiButton.disabled) {
            playBestAiButton.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            playBestAiButton.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }

    // Model Save/View buttons
    saveModelButton.disabled = !modelExists;
    viewNetworkButton.disabled = !modelExists;
    saveModelButton.classList.toggle('opacity-50', !modelExists);
    saveModelButton.classList.toggle('cursor-not-allowed', !modelExists);
    viewNetworkButton.classList.toggle('opacity-50', !modelExists);
    viewNetworkButton.classList.toggle('cursor-not-allowed', !modelExists);

    // Model Import button/label
    importFile.disabled = aiTrainingActive || playbackModeActive; // Can't import during training/playback
    importFileLabel.classList.toggle('disabled', importFile.disabled);
    importFileLabel.classList.toggle('opacity-50', importFile.disabled);
    importFileLabel.classList.toggle('cursor-not-allowed', importFile.disabled);

    // Disable sliders/controls that shouldn't be changed during AI run or playback
    const disableDuringRun = aiTrainingActive || playbackModeActive;
    populationSizeSlider.disabled = disableDuringRun;
    gameScaleSelect.disabled = disableDuringRun; // Changing scale requires reset
    obstacleMinSpeedSlider.disabled = disableDuringRun;
    obstacleMaxSpeedSlider.disabled = disableDuringRun;
    obstacleSpawnIntervalSlider.disabled = disableDuringRun;
    obstacleMinSizeSlider.disabled = disableDuringRun;
    obstacleMaxSizeSlider.disabled = disableDuringRun;
    obstacleToggle.disabled = disableDuringRun; // Don't toggle obstacles mid-run
    clearObstaclesButton.disabled = disableDuringRun;
}

/**
 * Updates the text indicating whether a best AI model is currently loaded/saved.
 */
function updateSavedModelStatus() {
    if (gameScreen.classList.contains('hidden')) return;

    if (bestGenomeEver && bestGenomeEver.score !== undefined) {
        // Display the score of the best known model
        savedModelStatus.textContent = `Best Score: ${bestGenomeEver.score.toFixed(0)}`;
        savedModelStatus.classList.remove('text-gray-400'); // Use green to indicate loaded
        savedModelStatus.classList.add('text-green-400');
    } else {
        savedModelStatus.textContent = "None yet"; // Default message
        savedModelStatus.classList.add('text-gray-400');
        savedModelStatus.classList.remove('text-green-400');
    }
    updateButtonStates(); // Ensure buttons relying on model status are updated
}

// --- Game Mode Switching Logic ---

/**
 * Stops all active modes (AI training, playback) and resets relevant states.
 * @param {boolean} [clearDrones=true] - Whether to completely remove AI/playback drone instances.
 */
function stopAllModes(clearDrones = true) {
    stopAllBoosterSounds(); // Stop all sounds first
    aiTrainingActive = false;
    playbackModeActive = false;

    // Reset drone flags and clear hover targets
    manualDrone.isTraining = false;
    manualDrone.hoveringTarget = null;
    if (clearDrones) {
        aiDrones = [];
        playbackDrone = null;
        if (activeDrones) activeDrones.textContent = '0'; // Update UI stat
    } else {
        // If not clearing, just reset flags on existing drones
        aiDrones.forEach(d => {
            d.isTraining = false;
            d.hoveringTarget = null;
        });
        if (playbackDrone) {
            playbackDrone.isTraining = false;
            playbackDrone.hoveringTarget = null;
        }
    }
    // Ensure targets don't think a drone is still hovering
    currentTargets.forEach(t => t.hoveringDrone = null);

    // Reset scoreboard visibility
    if (aiScoreDisplay) aiScoreDisplay.classList.add('hidden');
    if (playbackScoreDisplay) playbackScoreDisplay.classList.add('hidden');
    if (scoreDisplay) scoreDisplay.classList.remove('hidden'); // Show manual score by default

    updateButtonStates(); // Update button enable/disable states
}

/**
 * Switches the game to manual player control mode.
 * Resets the game state for the manual drone.
 */
function switchToManualMode() {
    if (gameScreen.classList.contains('hidden')) return; // Only works when game screen is active

    stopAllModes(); // Stop any AI/playback first
    gameRunning = true; // Enable manual game loop logic
    currentMode.textContent = "Manual"; // Update UI display
    messageBox.textContent = "Manual Mode Active. Use WASD/Arrows/Space.";
    resetManualGame(); // Reset drone, score, obstacles etc.
    updateButtonStates();

    // Ensure the game loop is running
    if (!animationFrameId) {
        lastTimestamp = performance.now();
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}


// --- Audio Engine --- (Added comments, logic mostly unchanged)

/**
 * Checks if sound effects should be played based on audio initialization status
 * and current game state (e.g., high-speed AI training).
 * Also attempts to resume suspended audio context if necessary.
 * @returns {boolean} True if sound can be played, false otherwise.
 */
function canPlaySound() {
    // Check if audio context is initialized and not suspended
    if (!isAudioInitialized || !audioCtx || audioCtx.state === 'suspended') {
        // If suspended, try to resume it (often required after user interaction)
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume().then(() => {
                // console.log("Audio Resumed."); // Debug log
                isAudioInitialized = true; // Mark as initialized upon successful resume
            }).catch(e => { /* console.error("Audio resume failed:", e); */ }); // Log error if resume fails
        }
        return false; // Cannot play sound yet
    }

    // Performance optimization: Limit sounds during high-speed AI training
    if (aiTrainingActive) {
        const currentSimSpeed = simulationSpeed; // Get current training speed
        const activeAiDroneCount = aiDrones.filter(d => d.alive).length; // Count living AI drones

        // Heuristic: If many drones are active AND speed is high, disable most sounds
        if (activeAiDroneCount > 10 && currentSimSpeed > 4) {
            // Allow critical sounds maybe? Or just disable all non-essential ones.
            return false;
        }
    }

    return true; // OK to play sound
}

/**
 * Starts playing the continuous booster sound for a specific drone.
 * Uses Web Audio API oscillators and gain nodes.
 * @param {object} drone - The drone object to play the sound for.
 */
function playBoosterSound(drone) {
    // Don't play if sound disabled or already playing for this drone
    if (!canPlaySound() || activeBoosterSounds.has(drone)) return;

    const now = audioCtx.currentTime;

    // --- Create Audio Nodes ---
    // Main sound source: Sawtooth wave for a harsh engine sound
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(60, now); // Base frequency (low rumble)

    // Low-Frequency Oscillator (LFO) for pitch modulation (warble effect)
    const lfo = audioCtx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(8, now); // LFO frequency (how fast it warbles)

    // Gain node to control the *intensity* of the LFO effect
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(10, now); // LFO intensity (how much pitch variation)

    // Gain node to control the overall volume of the booster sound
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0, now); // Start silent
    let targetVolume = drone.isManual ? 0.4 : 0.15; // Louder for manual drone
    // Fade in quickly
    gainNode.gain.linearRampToValueAtTime(targetVolume, now + 0.1);

    // Filter to shape the sound (lowpass cuts high frequencies for a muffled effect)
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now); // Cutoff frequency

    // --- Connect Audio Nodes ---
    // LFO -> LFO Gain -> Oscillator Frequency (LFO controls pitch)
    lfo.connect(lfoGain);
    lfoGain.connect(oscillator.frequency);
    // Oscillator -> Filter -> Gain Node -> Destination (main output)
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // --- Start Oscillators ---
    oscillator.start(now);
    lfo.start(now);

    // Store references to the nodes for this drone so we can stop them later
    activeBoosterSounds.set(drone, { oscillator, lfo, gainNode, filter });
}

/**
 * Stops the continuous booster sound for a specific drone.
 * Fades out the sound smoothly.
 * @param {object} drone - The drone object whose sound should be stopped.
 */
function stopBoosterSound(drone) {
    // Check if audio is initialized and if this drone actually has a sound playing
    if (!isAudioInitialized || !activeBoosterSounds.has(drone)) return;

    const soundNodes = activeBoosterSounds.get(drone); // Get the audio nodes for this drone
    const now = audioCtx.currentTime;

    // --- Fade Out ---
    soundNodes.gainNode.gain.cancelScheduledValues(now); // Cancel any previous volume changes
    soundNodes.gainNode.gain.setValueAtTime(soundNodes.gainNode.gain.value, now); // Hold current volume
    soundNodes.gainNode.gain.linearRampToValueAtTime(0, now + 0.2); // Fade to zero over 0.2 seconds

    // --- Stop Oscillators ---
    // Stop them slightly after the fade is complete
    soundNodes.oscillator.stop(now + 0.25);
    soundNodes.lfo.stop(now + 0.25);

    // Remove the drone from the active sounds map
    activeBoosterSounds.delete(drone);

    // --- Cleanup (Important!) ---
    // Disconnect nodes after they stop to free up resources
    setTimeout(() => {
        try {
            soundNodes.gainNode.disconnect();
            soundNodes.filter.disconnect();
            soundNodes.oscillator.disconnect();
            soundNodes.lfo.disconnect();
        } catch (e) { /* Ignore errors if already disconnected */ }
    }, 300); // Delay slightly longer than stop time
}

/** Stops all currently playing booster sounds. */
function stopAllBoosterSounds() {
    if (!isAudioInitialized) return;
    // Iterate through the map of active sounds and stop each one
    activeBoosterSounds.forEach((nodes, drone) => {
        stopBoosterSound(drone); // Use the existing stop function
    });
    activeBoosterSounds.clear(); // Clear the map
}

/**
 * Plays a one-shot sound effect using the Web Audio API.
 * @param {string} type - The type of sound effect (e.g., 'wall_hit', 'target_complete').
 * @param {number} [intensity=1.0] - A multiplier (usually 0-1) affecting volume/parameters.
 */
function playSoundEffect(type, intensity = 1.0) {
    if (!canPlaySound()) return; // Check if sound should be played

    const now = audioCtx.currentTime;

    // --- Define Sound Parameters based on Type ---
    let oscType = 'sine';      // Oscillator waveform (sine, square, sawtooth, triangle)
    let baseFreq = 440;        // Base frequency (pitch) in Hz
    let duration = 0.1;        // Sound duration in seconds
    let volume = 0.2 * intensity; // Base volume, scaled by intensity
    let freqEnvelope = false;   // Should the frequency change over time?
    let useNoise = false;       // Use white noise instead of an oscillator?
    let filterType = 'lowpass'; // Filter type (lowpass, highpass, bandpass, etc.)
    let filterFreq = 20000;     // Filter cutoff/center frequency
    let filterQ = 1;            // Filter resonance (Q factor)

    switch (type) {
        case 'wall_hit':
            oscType = 'square'; baseFreq = 80; duration = 0.15;
            volume = 0.15 * Math.min(1, intensity * 1.5); // Volume scales with intensity
            freqEnvelope = true; filterType = 'lowpass'; filterFreq = 500 + 500 * intensity;
            break;
        case 'booster_hit': // Quieter, higher pitch 'tink'
            oscType = 'triangle'; baseFreq = 150; duration = 0.1;
            volume = 0.1 * intensity; freqEnvelope = true; filterType = 'lowpass'; filterFreq = 800;
            break;
        case 'obstacle_hit': // Use noise for a 'crunch'/'thud'
            useNoise = true; duration = 0.2 * Math.min(1.5, intensity); // Longer for harder hits
            volume = 0.25 * Math.min(1, intensity);
            filterType = 'bandpass'; // Focus noise into a frequency band
            filterFreq = 1000 + 500 * (Math.random() - 0.5); // Randomize frequency slightly
            filterQ = 5 + intensity * 5; // Higher Q for more resonance/impact feel
            break;
        case 'target_collect': // Short, high-pitched 'blip'
            oscType = 'sine'; baseFreq = 660; duration = 0.08;
            volume = 0.12 * intensity; filterFreq = 4000;
            break;
        case 'target_complete': // Rising, brighter sound
            oscType = 'triangle'; baseFreq = 880; duration = 0.3;
            volume = 0.25; freqEnvelope = true; filterType = 'highpass'; // Cut lows
            filterFreq = 1000; filterQ = 2;
            break;
        case 'target_missed': // Falling, duller sound
            oscType = 'sawtooth'; baseFreq = 100; duration = 0.2;
            volume = 0.1; freqEnvelope = true; filterType = 'lowpass'; // Cut highs
            filterFreq = 300;
            break;
        case 'destruction': // Complex sound with noise and a boom
            useNoise = true; duration = 0.5; volume = 0.35;
            filterType = 'lowpass'; filterFreq = 600;
            // Add a separate low-frequency boom
            const lowBoom = audioCtx.createOscillator();
            lowBoom.type = 'sine';
            lowBoom.frequency.setValueAtTime(50, now);
            lowBoom.frequency.exponentialRampToValueAtTime(30, now + 0.4); // Pitch drops
            const boomGain = audioCtx.createGain();
            boomGain.gain.setValueAtTime(0.4, now);
            boomGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5); // Fade out
            lowBoom.connect(boomGain).connect(audioCtx.destination);
            lowBoom.start(now);
            lowBoom.stop(now + 0.5);
            break;
        default: return; // Unknown sound type
    }

    // --- Create Core Audio Nodes ---
    // Gain node for volume control and fade-out
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0, now); // Start silent
    gainNode.gain.linearRampToValueAtTime(volume, now + 0.01); // Quick fade-in
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration); // Fade out

    // Filter node
    const filterNode = audioCtx.createBiquadFilter();
    filterNode.type = filterType;
    filterNode.frequency.setValueAtTime(filterFreq, now);
    filterNode.Q.setValueAtTime(filterQ, now);

    // --- Create Sound Source (Oscillator or Noise Buffer) ---
    let sourceNode;
    if (useNoise) {
        // Create a buffer filled with white noise
        const bufferSize = audioCtx.sampleRate * duration * 1.2; // Slightly longer buffer
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1; // Generate random samples between -1 and 1
        }
        // Create a BufferSource node to play the noise
        sourceNode = audioCtx.createBufferSource();
        sourceNode.buffer = noiseBuffer;
        sourceNode.loop = false; // Don't loop the noise
    } else {
        // Create an Oscillator node
        sourceNode = audioCtx.createOscillator();
        sourceNode.type = oscType;
        sourceNode.frequency.setValueAtTime(baseFreq, now);

        // Apply frequency envelope if needed
        if (freqEnvelope) {
            if (type === 'target_complete') {
                sourceNode.frequency.linearRampToValueAtTime(baseFreq * 1.5, now + duration * 0.7); // Pitch up
            } else if (type === 'target_missed') {
                sourceNode.frequency.exponentialRampToValueAtTime(baseFreq * 0.4, now + duration); // Pitch down
            } else if (type === 'target_collect') {
                // Maybe a slight vibrato or quick pitch bend could be added here
            } else { // Default pitch drop for hits
                sourceNode.frequency.exponentialRampToValueAtTime(baseFreq * 0.5, now + duration * 0.8);
            }
        }
    }

    // --- Connect Nodes ---
    // Source -> Gain -> Filter -> Destination
    sourceNode.connect(gainNode);
    gainNode.connect(filterNode);
    filterNode.connect(audioCtx.destination);

    // --- Start and Stop Source ---
    sourceNode.start(now);
    sourceNode.stop(now + duration + 0.05); // Stop slightly after duration allows fadeout

    // --- Cleanup ---
    // Disconnect nodes after sound finishes playing
    setTimeout(() => {
        try {
            gainNode.disconnect();
            filterNode.disconnect();
            sourceNode.disconnect();
            // Disconnect the extra boom nodes if they exist (destruction sound)
            // Note: This part is slightly less clean, maybe manage boom nodes separately
            if (type === 'destruction') {
                // Need references to lowBoom and boomGain outside the switch, or handle cleanup differently
            }
        } catch (e) { /* Ignore errors */ }
    }, (duration + 0.1) * 1000); // Delay cleanup
}

// --- AI / NEAT Functions ---

/**
 * Initializes the Neataptic instance for training.
 * Sets up the population size, mutation rates, methods, and network structure.
 * Can be initialized randomly or based on a previously saved/best genome.
 * @param {object|null} [importedGenome=null] - A Neataptic network JSON object to seed the population.
 */
function initializeNeat(importedGenome = null) {
    // Define the number of inputs (sensors) and outputs (thrust, rotation) for the network
    const numInputs = Object.keys(baseDrone.sensors).length; // Dynamically count sensors
    const numOutputs = 2; // Thrust and Rotation

    // Get selected mutation methods from the config UI
    const selectedMethods = [];
    const checkboxes = mutationMethodsContainer.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        if (cb.checked && methods.mutation[cb.value]) {
            selectedMethods.push(methods.mutation[cb.value]);
        }
    });
    // Ensure at least one mutation method is selected
    if (selectedMethods.length === 0) {
        console.warn("No mutation methods selected, defaulting to MOD_WEIGHT.");
        selectedMethods.push(methods.mutation.MOD_WEIGHT);
        // Optionally, check the corresponding checkbox visually
        const cb = document.getElementById('configMethod_MOD_WEIGHT');
        if (cb) cb.checked = true;
    }

    // Create the Neat instance
    neat = new Neat(
        numInputs,
        numOutputs,
        null, // Fitness function is handled externally (by assigning genome.score)
        {
            population: populationCount, // Population size from slider
            elitism: Math.round(Math.max(1, (CONFIG.elitismPercent / 100) * populationCount)), // Calculate elite count
            mutationRate: CONFIG.mutationRate,     // From config
            mutationAmount: CONFIG.mutationAmount, // From config
            mutation: selectedMethods,             // Use selected methods
            // Define the initial network structure *only if not importing*
            network: importedGenome ? undefined : architect.Random(numInputs, Math.ceil(numInputs / 1.5), numOutputs) // Random hidden layer size
            // Other Neataptic options could be added here (activation functions, etc.)
        }
    );

    // If importing a genome, replace the random population with mutated copies of the import
    if (importedGenome) {
        console.log("Initializing NEAT population from imported genome...");
        neat.population = []; // Clear the random population
        for (let i = 0; i < populationCount; i++) {
            // Create a new network from the imported JSON structure
            let newGenome = neataptic.Network.fromJSON(importedGenome.toJSON());
            // Mutate the copies slightly (except maybe the very first one) to introduce diversity
            if (i > 0) {
                newGenome.mutate(selectedMethods); // Use the same mutation methods
            }
            newGenome.score = 0; // Reset score for the new generation
            neat.population.push(newGenome);
        }
        console.log(`NEAT initialized from import (Pop: ${populationCount}, Inputs: ${numInputs}, Outputs: ${numOutputs})`);
    } else {
        console.log(`NEAT initialized randomly (Pop: ${populationCount}, Inputs: ${numInputs}, Outputs: ${numOutputs})`);
    }

    // Reset generation stats
    generation = 0;
    highestFitness = 0;
    averageFitness = 0;
    // Reset best genome *only* if starting fresh
    if (!importedGenome) {
        bestGenomeEver = null;
    }
    updateSavedModelStatus(); // Update UI about the model status

    // Update UI stats display
    generationCount.textContent = generation;
    bestFitness.textContent = highestFitness.toFixed(0);
    avgFitness.textContent = averageFitness.toFixed(0);
}


/**
 * Creates drone instances for the AI population based on the current `neat.population`.
 * Each drone gets assigned a genome (neural network) from the population.
 */
function createAiDrones() {
    aiDrones = []; // Clear previous generation's drones
    if (!neat || !neat.population) {
        console.error("NEAT population is missing during drone creation.");
        return;
    }

    // Create a drone for each genome in the NEAT population
    for (let i = 0; i < neat.population.length; i++) {
        const drone = { ...baseDrone }; // Create a new drone instance based on the template

        // Set AI-specific properties
        drone.isManual = false;
        drone.isTraining = true; // Mark as training drone
        // Give AI drones varying colors for visual distinction (optional)
        drone.bodyColor = `hsl(${200 + ((i * 7) % 160)}, 70%, 60%)`; // Cycle through hues
        drone.boosterColor = `hsl(${200 + ((i * 7) % 160)}, 70%, 40%)`;

        // Assign the genome (the neural network) to this drone
        drone.genome = neat.population[i];
        // Ensure the genome starts with a score of 0 for this generation
        drone.genome.score = 0;

        // Reset the drone's physical state and position it
        drone.reset(canvas.width / 2, canvas.height / 3); // Start in the upper middle

        aiDrones.push(drone); // Add to the array of active AI drones
    }

    activeDrones.textContent = aiDrones.length; // Update UI display
    console.log(`Gen ${generation}: Created ${aiDrones.length} AI drones.`);
}

/**
 * Runs one simulation step for all active AI drones.
 * Gets sensor inputs, feeds them to the neural network, gets outputs,
 * updates the drone's physics, and transfers the drone's accumulated score
 * to its corresponding genome's fitness score.
 * Also checks if the generation should end (all drones dead).
 * @param {number} deltaTime - Time elapsed since the last simulation step.
 */
function runAiGeneration(deltaTime) {
    if (!aiTrainingActive) return; // Do nothing if AI training isn't active

    let stillAliveCount = 0; // Counter for drones still alive this frame

    aiDrones.forEach((drone) => {
        if (drone.alive) {
            stillAliveCount++;

            // --- Get Inputs for Neural Network ---
            // Prepare the input array in the correct order expected by the network
            // Note: The order here MUST match the order expected during network creation/training
            const inputs = [
                drone.sensors.distBottom,
                drone.sensors.distLeftWall,
                drone.sensors.distRightWall,
                drone.sensors.velX,
                drone.sensors.velY,
                drone.sensors.obsDistForward,
                drone.sensors.obsDistLeft,
                drone.sensors.obsDistRight,
                drone.sensors.obsDistFwdLeft,
                drone.sensors.obsDistFwdRight,
                drone.sensors.obsDistDown,
                drone.sensors.currentHealth,
                drone.sensors.currentEnergy,
                drone.sensors.targetDirX,
                drone.sensors.targetDirY,
                drone.sensors.targetDistNorm,
                drone.sensors.leftBoosterAngleNorm,
                drone.sensors.rightBoosterAngleNorm,
                drone.sensors.isHovering,
                // Add any other sensors here if the network expects them
            ];

            // --- Activate Network & Get Outputs ---
            let output = [0, 0]; // Default output if activation fails
            try {
                output = drone.genome.activate(inputs);
                // Sanity check outputs
                if (isNaN(output[0]) || isNaN(output[1])) {
                    console.warn("AI output was NaN, setting to 0.", drone.genome);
                    output = [0, 0];
                    // Optional: Penalize this genome heavily?
                    // drone.score -= 100;
                }
            } catch (error) {
                console.error("Error activating genome:", error, "Inputs:", inputs, "Genome:", drone.genome);
                // Consider killing the drone or assigning a very low score if activation fails repeatedly
                // drone.alive = false;
                // drone.score = -1000;
            }


            // --- Update Drone ---
            // Map network outputs to the format expected by drone.update()
            const aiInput = { thrust: output[0], rotation: output[1] }; // Assuming output[1] is already -1 to 1
            drone.update(deltaTime, aiInput); // Update drone physics and state

            // --- Transfer Score to Genome ---
            // Update the genome's fitness score based on the drone's performance *this frame*
            // The drone's internal `score` accumulates rewards/penalties during its lifetime.
            // We assign this accumulated score to the genome's `score` property, which Neataptic uses.
            if (drone.genome) {
                if (drone.score !== undefined && !isNaN(drone.score)) {
                    // Use Math.max(0, drone.score) if fitness cannot be negative
                    // Allowing negative scores can sometimes be useful for strong penalties
                    drone.genome.score = drone.score;
                } else if (drone.genome.score === undefined) {
                    // Initialize score if it somehow wasn't set
                    drone.genome.score = 0;
                }
            }

        } else { // Drone is dead
            // Ensure the genome has a score assigned even if the drone died instantly
            if (drone.genome && drone.genome.score === undefined) {
                drone.genome.score = 0; // Assign a base score (or the last known score if tracked differently)
            }
            // Stop sound just in case it was missed
            stopBoosterSound(drone);
        }
    });

    activeDrones.textContent = stillAliveCount; // Update UI

    // --- Check for End of Generation ---
    // If all drones are dead and training is still marked as active...
    if (stillAliveCount === 0 && aiTrainingActive) {
        // console.log(`Generation ${generation} finished.`); // Debug log
        try {
            // Final safety check on genome scores before evolution
            neat.population.forEach((genome, index) => {
                if (genome.score === undefined || isNaN(genome.score)) {
                    console.warn(`Genome ${index} had invalid score (${genome.score}) before evolution, setting to 0.`);
                    genome.score = 0; // Assign 0 fitness if invalid
                }
            });

            // Trigger the NEAT evolution process
            evolvePopulation();

            // Reset environment for the next generation
            resetObstacles();
            currentTargets = [];
            currentTargetSpawnIndex = 0; // Start target cycle from beginning
            targetSpawnCooldown = 0;
            particles = []; // Clear visual effects
            stopAllBoosterSounds(); // Ensure all sounds are off

            // Create the drones for the new generation
            createAiDrones();

        } catch (error) {
            console.error("Error during AI evolution or reset:", error);
            stopAiTraining(); // Stop training if evolution fails critically
            messageBox.textContent = "Error during AI evolution. Training stopped.";
        }
    }
}


/**
 * Performs the NEAT evolution process: sorting, elitism, selection, crossover, mutation.
 * Updates the `neat.population` with the new generation of genomes.
 * Also updates the best score tracking and UI elements.
 */
function evolvePopulation() {
    if (!neat || !neat.population || neat.population.length === 0) {
        console.warn("Attempted to evolve an empty or invalid population.");
        return;
    }
    // console.log(`Evaluating Generation ${generation}...`); // Debug log

    // --- Sort Population ---
    // Neataptic sorts the population based on the `score` property (descending)
    neat.sort();

    // --- Get Statistics ---
    const currentBest = neat.getFittest(); // Get the genome with the highest score
    highestFitness = currentBest.score;
    averageFitness = neat.getAverage(); // Calculate average score of the generation

    console.log(`Gen ${generation} - Best Score: ${highestFitness.toFixed(0)}, Avg Score: ${averageFitness.toFixed(2)}`);

    // --- Track Best Ever Genome ---
    // If this generation's best is better than the all-time best, save it
    if (!bestGenomeEver || highestFitness > bestGenomeEver.score) {
        // Clone the best genome to avoid modifying it during subsequent mutations
        bestGenomeEver = neataptic.Network.fromJSON(currentBest.toJSON());
        bestGenomeEver.score = highestFitness; // Store its score along with the network structure
        updateSavedModelStatus(); // Update UI to show new best score
        console.log(`--- New Best Overall Genome Found! Score: ${highestFitness.toFixed(0)} ---`);
    }

    // Update UI display for fitness stats
    bestFitness.textContent = highestFitness.toFixed(0);
    avgFitness.textContent = averageFitness.toFixed(2);
    // Update AI score display panel
    if (aiScoreDisplay && bestGenomeEver) {
        aiScoreDisplay.textContent = `Best AI Score: ${bestGenomeEver.score.toFixed(0)}`;
    } else if (aiScoreDisplay) {
        aiScoreDisplay.textContent = `Best AI Score: 0`;
    }

    // --- Create Next Generation ---
    const newPopulation = [];

    // 1. Elitism: Copy the top performers directly to the new population
    const eliteCount = Math.min(neat.population.length, Math.max(1, neat.elitism)); // Ensure at least 1 elite if possible
    for (let i = 0; i < eliteCount; i++) {
        newPopulation.push(neat.population[i]);
    }

    // 2. Offspring: Fill the rest of the population with offspring
    // Neataptic's getOffspring uses selection (based on score) and crossover
    for (let i = 0; i < neat.population.length - eliteCount; i++) {
        newPopulation.push(neat.getOffspring());
    }

    // Replace the old population with the new one
    neat.population = newPopulation;

    // --- Mutate New Population ---
    // Apply mutations to the new population (elitism ensures elites might be skipped depending on mutation rate)
    neat.mutate();

    // Reset scores for the new generation before they run
    neat.population.forEach(genome => { genome.score = 0; });

    // Increment generation counter
    generation++;
    generationCount.textContent = generation; // Update UI
    // console.log(`Evolved to Generation ${generation}. Population size: ${neat.population.length}`); // Debug log
}


/**
 * Starts the AI training process.
 * Initializes NEAT, creates the first generation of drones, and starts the game loop.
 */
function startAiTraining() {
    // Prevent starting if already training or in playback
    if (aiTrainingActive || playbackModeActive) return;

    stopAllModes(false); // Stop manual mode, but keep potential bestGenomeEver
    aiTrainingActive = true;
    gameRunning = false; // Ensure manual game logic is off

    messageBox.textContent = "Starting AI Training...";
    currentMode.textContent = "AI Training"; // Update UI status

    // Show AI score, hide others
    if (aiScoreDisplay) aiScoreDisplay.classList.remove('hidden');
    if (scoreDisplay) scoreDisplay.classList.add('hidden');
    if (playbackScoreDisplay) playbackScoreDisplay.classList.add('hidden');

    // Read current settings from UI controls
    populationCount = parseInt(populationSizeSlider.value);
    simulationSpeed = parseInt(trainingSpeedSlider.value);

    // Initialize the NEAT algorithm
    // Pass bestGenomeEver to potentially seed the initial population if desired
    initializeNeat(bestGenomeEver);

    // Reset the game environment
    resetObstacles();
    currentTargets = [];
    currentTargetSpawnIndex = 0; // Reset target cycle
    targetSpawnCooldown = 0;
    particles = [];
    stopAllBoosterSounds();

    // Create the first generation of AI drones
    createAiDrones();

    // Reset timers
    startTime = performance.now();
    lastTimestamp = startTime;

    updateButtonStates(); // Update button enable/disable states

    // Start the game loop if it's not already running
    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}

/**
 * Stops the AI training process.
 * Switches back to manual mode and displays the game over screen.
 */
function stopAiTraining() {
    if (!aiTrainingActive) return; // Do nothing if not training

    stopAllModes(); // Stop training, clear AI drones
    messageBox.textContent = "AI Training Stopped. Switched to Manual Mode.";
    currentMode.textContent = "Manual";
    displayGameOver(); // Show game over screen (useful placeholder)
    updateButtonStates();
}


// --- Playback Mode Functions ---

/**
 * Toggles the AI playback mode on or off.
 * If turning on, loads the best found genome into a single drone.
 * If turning off, stops playback and returns to manual mode.
 */
function togglePlaybackMode() {
    // If AI training is active, pressing 'P' should probably stop training first.
    if (aiTrainingActive) {
        stopAiTraining();
        messageBox.textContent = "Training stopped. Press [P] again to start playback.";
        updateButtonStates();
        return;
    }

    playbackModeActive = !playbackModeActive; // Toggle the flag

    if (playbackModeActive) {
        // --- Start Playback ---
        // Check if a best model exists to play back
        if (!bestGenomeEver) {
            messageBox.textContent = "No best AI model found to play back.";
            playbackModeActive = false; // Immediately turn off if no model
            updateButtonStates();
            return;
        }

        stopAllModes(false); // Stop manual mode, keep bestGenomeEver
        playbackModeActive = true; // Set flag again just to be sure
        gameRunning = false;

        messageBox.textContent = "Starting Best AI Playback...";
        currentMode.textContent = "Playback AI";

        // Show playback score, hide others
        if (playbackScoreDisplay) playbackScoreDisplay.classList.remove('hidden');
        if (scoreDisplay) scoreDisplay.classList.add('hidden');
        if (aiScoreDisplay) aiScoreDisplay.classList.add('hidden');

        // Create the single playback drone
        playbackDrone = { ...baseDrone }; // Use the template
        playbackDrone.isPlayback = true; // Mark as playback drone
        playbackDrone.isTraining = false;
        // Give playback drone a distinct color
        playbackDrone.bodyColor = "#facc15"; // Yellow/Gold
        playbackDrone.boosterColor = "#eab308"; // Darker Yellow/Gold
        // Load the best genome into this drone
        playbackDrone.genome = bestGenomeEver;

        // Reset drone state and environment
        playbackDrone.reset(canvas.width / 2, canvas.height / 3);
        playbackScore = 0; // Reset playback score counter
        if (playbackScoreDisplay) playbackScoreDisplay.textContent = `Playback Score: 0`;
        resetObstacles();
        currentTargets = [];
        currentTargetSpawnIndex = 0; // Reset target cycle
        targetSpawnCooldown = 0;
        particles = [];
        stopAllBoosterSounds();

        // Reset timers
        startTime = performance.now();
        lastTimestamp = startTime;

    } else {
        // --- Stop Playback ---
        stopAllModes(); // Stop playback mode, clear drone
        messageBox.textContent = "Playback Stopped. Switched to Manual Mode.";
        currentMode.textContent = "Manual";
        displayGameOver(); // Show game over screen
    }

    updateButtonStates(); // Update button text/state (e.g., Playback button becomes Stop)

    // Ensure game loop is running
    if (!animationFrameId) {
        lastTimestamp = performance.now();
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}

/**
 * Runs one simulation step for the playback drone using the best genome.
 * @param {number} deltaTime - Time elapsed since the last simulation step.
 */
function runPlayback(deltaTime) {
    if (!playbackModeActive || !playbackDrone) return; // Only run if active and drone exists

    // Check if the playback drone has died
    if (!playbackDrone.alive) {
        if (playbackModeActive) { // Ensure we don't call stopAllModes multiple times
            const finalScore = playbackScore; // Get the final score before reset
            stopAllModes(); // Stop playback mode
            messageBox.textContent = `Playback Finished. Final Score: ${finalScore}. Switched to Manual Mode.`;
            currentMode.textContent = "Manual";
            displayGameOver();
            updateButtonStates();
        }
        return; // Don't update dead drone
    }

    // --- Get Inputs & Activate Network ---
    // Similar to AI training, prepare sensor inputs
    const inputs = [
        playbackDrone.sensors.distBottom, playbackDrone.sensors.distLeftWall, playbackDrone.sensors.distRightWall,
        playbackDrone.sensors.velX, playbackDrone.sensors.velY,
        playbackDrone.sensors.obsDistForward, playbackDrone.sensors.obsDistLeft, playbackDrone.sensors.obsDistRight,
        playbackDrone.sensors.obsDistFwdLeft, playbackDrone.sensors.obsDistFwdRight, playbackDrone.sensors.obsDistDown,
        playbackDrone.sensors.currentHealth, playbackDrone.sensors.currentEnergy,
        playbackDrone.sensors.targetDirX, playbackDrone.sensors.targetDirY, playbackDrone.sensors.targetDistNorm,
        playbackDrone.sensors.leftBoosterAngleNorm, playbackDrone.sensors.rightBoosterAngleNorm, playbackDrone.sensors.isHovering,
    ];
    const output = playbackDrone.genome.activate(inputs); // Use the best genome

    // --- Update Drone ---
    const aiInput = { thrust: output[0], rotation: output[1] };
    playbackDrone.update(deltaTime, aiInput); // Update using AI output

    // --- Update Playback Score ---
    // The drone's internal score calculation runs in its update method
    playbackScore = Math.max(0, Math.floor(playbackDrone.score)); // Get the current score
    if (playbackScoreDisplay) {
        playbackScoreDisplay.textContent = `Playback Score: ${playbackScore}`; // Update UI
    }
}


// --- Main Game Loop ---
/**
 * The core recursive function that drives the game simulation and rendering.
 * Called repeatedly using requestAnimationFrame.
 * @param {number} currentTime - Timestamp provided by requestAnimationFrame.
 */
function gameLoop(currentTime) {
    // Ensure lastTimestamp is initialized on the first frame
    if (!lastTimestamp) lastTimestamp = currentTime;
    // Calculate time elapsed since the last frame in seconds
    const deltaTime = (currentTime - lastTimestamp) / 1000.0;
    lastTimestamp = currentTime; // Store timestamp for the next frame calculation

    // Only run updates and drawing if the game screen is visible
    if (!gameScreen.classList.contains('hidden')) {

        if (!startTime) startTime = currentTime; // Initialize start time if needed

        // Determine simulation speed (1x for manual/playback, variable for AI)
        const currentSimSpeed = aiTrainingActive ? simulationSpeed : 1;
        // Calculate the time step for each simulation iteration
        // Clamp deltaTime to avoid large jumps if browser tab was inactive
        const effectiveDeltaTime = Math.min(1 / 30, deltaTime); // Max step of 1/30th second
        const subStepDeltaTime = effectiveDeltaTime / currentSimSpeed;

        // --- Run Simulation Steps ---
        // Loop multiple times per frame if simulation speed is increased (for AI training)
        for (let i = 0; i < currentSimSpeed; i++) {

            // --- Update Game Objects ---
            updateTargets(subStepDeltaTime);   // Update target lifetime, check completion, spawn new
            updateParticles(subStepDeltaTime); // Update particle positions and lifetimes

            // --- Update Obstacles ---
            if (obstaclesEnabled) {
                // Use a frame-based timer for obstacle spawning
                // Divide subStepDeltaTime by expected frame time (1/60) to count 'frames' passed
                // This makes spawn interval roughly consistent regardless of sim speed/frame rate
                obstacleSpawnTimer += subStepDeltaTime / (1 / 60);
                const interval = obstacleSpawnInterval; // Get interval from slider value
                if (obstacleSpawnTimer >= interval) {
                    obstacles.push(createObstacle()); // Spawn a new obstacle
                    obstacleSpawnTimer = 0; // Reset timer
                }
            }
            // Update existing obstacles and remove those far off-screen
            obstacles.forEach((obs, index) => {
                obs.update();
                const margin = obs.size * 3; // Generous margin for removal
                if (obs.x < -margin || obs.x > canvas.width + margin ||
                    obs.y < -margin || obs.y > canvas.height + margin) {
                    obstacles.splice(index, 1); // Remove obstacle
                }
            });

            // --- Update Drones (based on current mode) ---
            if (aiTrainingActive) {
                runAiGeneration(subStepDeltaTime); // Update all AI drones
            } else if (playbackModeActive) {
                runPlayback(subStepDeltaTime); // Update the single playback drone
            } else { // Manual Mode
                if (gameRunning && manualDrone.alive) {
                    const manualInput = getManualInput(); // Get player input
                    manualDrone.update(subStepDeltaTime, manualInput); // Update the manual drone
                    // Update score display for manual player
                    score = Math.max(0, Math.floor(manualDrone.score));
                    if (scoreDisplay) scoreDisplay.textContent = `Manual Score: ${score}`;
                }
            }
        } // End simulation step loop

        // --- Rendering --- (Only happens once per actual frame, regardless of sim speed)
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        drawTargets(); // Draw active target
        obstacles.forEach(obs => obs.draw()); // Draw obstacles
        drawParticles(); // Draw particle effects

        // Draw the appropriate drone(s) based on the mode
        if (aiTrainingActive) {
            // Draw only living AI drones (draw dead ones is optional, clutters view)
            aiDrones.forEach(drone => {
                if (drone.alive) drone.draw();
            });
        } else if (playbackModeActive) {
            if (playbackDrone && playbackDrone.alive) playbackDrone.draw();
        } else { // Manual Mode
            if (manualDrone.alive) {
                manualDrone.draw();
            } else if (!gameRunning) {
                // If manual drone is dead and game isn't running, show Game Over
                displayGameOver();
            }
        }

    } // End if(!gameScreen.hidden)

    // Request the next animation frame to continue the loop
    animationFrameId = requestAnimationFrame(gameLoop);
}


/** Displays the "Game Over" message on the canvas for manual mode. */
function displayGameOver() {
    // Don't show if AI or Playback is active, or game isn't visible, or player is alive
    if (aiTrainingActive || playbackModeActive || gameScreen.classList.contains('hidden') || (gameRunning && manualDrone.alive)) {
        return;
    }

    // Draw a semi-transparent overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text styles
    ctx.textAlign = "center";
    ctx.font = '20px "Press Start 2P"'; // Use retro font
    ctx.fillStyle = "#FF5722"; // Orange color

    // Draw "GAME OVER" text
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 30);

    // Draw final score
    ctx.font = '16px "Press Start 2P"';
    ctx.fillStyle = "#ffcc00"; // Yellow color
    const lastScore = playbackModeActive ? playbackScore : score; // Should usually be manual score here
    ctx.fillText(`Final Score: ${lastScore}`, canvas.width / 2, canvas.height / 2);

    // Draw instructions
    ctx.font = '10px "Press Start 2P"';
    ctx.fillStyle = "#cccccc"; // Light grey color
    ctx.fillText("Press [R] Restart | [T] Train AI | [P] Playback", canvas.width / 2, canvas.height / 2 + 30);
}


// --- Canvas Resizing ---
/**
 * Handles window resize events to adjust the canvas size and related UI elements
 * while maintaining the aspect ratio. Also reapplies game scaling.
 */
function resizeCanvas() {
    // Don't resize if game screen isn't visible
    if (gameScreen.classList.contains('hidden')) return;

    const container = canvas.parentElement;
    if (!container) return; // Should not happen normally

    const aspectRatio = 16 / 9;

    // Calculate available space, considering UI elements above and below canvas
    const topUiHeight = (uiContainer?.offsetHeight ?? 0) + (scaleControlContainer?.offsetHeight ?? 0);
    const bottomUiHeight = (messageBox?.offsetHeight ?? 0) + (aiControls?.offsetHeight ?? 0);
    const verticalMargin = 30; // Extra vertical padding
    const horizontalMargin = 20; // Extra horizontal padding

    const availableHeight = window.innerHeight - topUiHeight - bottomUiHeight - verticalMargin;
    const availableWidth = container.clientWidth - horizontalMargin;

    // Calculate new dimensions based on available space and aspect ratio
    let newWidth, newHeight;
    // Try fitting to width first
    newWidth = availableWidth;
    newHeight = newWidth / aspectRatio;

    // If height is too large, fit to height instead
    if (newHeight > availableHeight) {
        newHeight = availableHeight;
        newWidth = newHeight * aspectRatio;
    }

    // Ensure minimum reasonable size
    newWidth = Math.max(320, Math.floor(newWidth));
    newHeight = Math.max(180, Math.floor(newHeight));

    // Apply new dimensions to the canvas
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Adjust max-width of UI elements to match canvas width
    const uiMaxWidth = `${canvas.width}px`;
    if (uiContainer) uiContainer.style.maxWidth = uiMaxWidth;
    if (messageBox) messageBox.style.maxWidth = uiMaxWidth;
    if (aiControls) aiControls.style.maxWidth = uiMaxWidth;
    if (scaleControlContainer) scaleControlContainer.style.maxWidth = uiMaxWidth;

    // Reapply game scaling calculations based on new canvas size
    applyGameScale(false); // 'false' means don't reset mode, just recalculate scaled values

    // Redraw the game over screen immediately if applicable
    if (!aiTrainingActive && !playbackModeActive && (!gameRunning || !manualDrone.alive)) {
        // Use setTimeout to ensure canvas size is fully applied before drawing
        setTimeout(displayGameOver, 0);
    }

    console.log(`Canvas resized to: ${canvas.width}x${canvas.height}`);
}


// --- Game Scaling ---
/**
 * Applies the selected game scale factor.
 * Recalculates all size-dependent variables (drone dimensions, sensor range, etc.).
 * Resets drone positions and potentially the game mode if triggered by user.
 * @param {boolean} [triggeredByUser=true] - If true, stop modes and show message. If false, just recalculate values.
 */
function applyGameScale(triggeredByUser = true) {
    gameScale = parseFloat(gameScaleSelect.value); // Read selected scale
    console.log("Applying game scale:", gameScale);

    // Recalculate all scaled variables based on the new gameScale and base CONFIG values
    scaledSensorRange = CONFIG.sensorRange * gameScale;
    // Gravity and Thrust usually aren't scaled visually
    scaledGravity = CONFIG.gravity;
    scaledThrustPower = CONFIG.thrustPower;
    // Scale dimensions
    scaledBodyWidth = CONFIG.baseBodyWidth * gameScale;
    scaledBodyHeight = CONFIG.baseBodyHeight * gameScale;
    scaledBoosterWidth = CONFIG.baseBoosterWidth * gameScale;
    scaledBoosterHeight = CONFIG.baseBoosterHeight * gameScale;
    scaledBoosterSeparation = CONFIG.baseBoosterSeparation * gameScale;
    scaledBoosterOffsetY = CONFIG.baseBoosterOffsetY * gameScale;
    // Read base obstacle sizes again in case they changed, then scale
    baseObstacleMinSize = parseInt(obstacleMinSizeSlider.value);
    baseObstacleMaxSize = parseInt(obstacleMaxSizeSlider.value);
    scaledObstacleMinSize = baseObstacleMinSize * gameScale;
    scaledObstacleMaxSize = baseObstacleMaxSize * gameScale;
    // Scale thresholds
    scaledWallThresholdX = CONFIG.wallThresholdX * gameScale;
    scaledWallThresholdY = CONFIG.wallThresholdY * gameScale;
    scaledFloorThreshold = CONFIG.floorThreshold * gameScale;
    // Scale target properties
    scaledTargetSize = CONFIG.targetSize * gameScale;
    scaledTargetHoverDistance = CONFIG.targetHoverDistance * gameScale;

    // Reset drones to apply new sizes and reposition them
    // Use center-ish position after potential resize
    const startX = canvas.width / 2;
    const startY = canvas.height / 3;
    manualDrone.reset(startX, startY);
    aiDrones.forEach(drone => drone.reset(startX, startY));
    if (playbackDrone) playbackDrone.reset(startX, startY);

    // If the scale change was triggered by the user selecting from the dropdown...
    if (triggeredByUser) {
        stopAllModes(); // Stop any active AI/playback
        messageBox.textContent = `Game scale set to ${gameScale}x. Press [R] / [T] / [P] to start.`;
        currentMode.textContent = "Manual"; // Default to manual mode indication
        gameRunning = false; // Stop manual game if it was running
        displayGameOver(); // Show game over screen
        updateButtonStates();
    }

    // Ensure the game loop continues running if it was already active
    // This is needed because applyGameScale might be called during resize
    if (!animationFrameId && !gameScreen.classList.contains('hidden')) {
        lastTimestamp = performance.now();
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}


// --- Game Initialization & Reset ---

/**
 * Resets the state specifically for manual play.
 * Clears obstacles, resets score, drone position, timers, and input keys.
 */
function resetManualGame() {
    // Don't reset if AI or playback is running
    if (aiTrainingActive || playbackModeActive) return;

    stopAllBoosterSounds(); // Stop any lingering sounds
    gameRunning = true; // Mark manual game as active

    // Reset environment
    resetObstacles();
    obstacleSpawnTimer = 0;
    currentTargets = []; // Clear targets
    currentTargetSpawnIndex = 0; // Reset target cycle
    targetSpawnCooldown = 0;
    particles = []; // Clear visual effects

    // Reset player state
    score = 0;
    manualDrone.reset(canvas.width / 2, canvas.height / 3); // Reset drone position/stats

    // Reset timers
    startTime = performance.now();
    lastTimestamp = startTime;

    // Update UI
    messageBox.textContent = "Manual Mode Active. Use WASD/Arrows/Space.";
    if (scoreDisplay) scoreDisplay.textContent = `Manual Score: ${score}`;
    currentMode.textContent = "Manual";

    // Clear any stuck keys (just in case)
    Object.keys(keysPressed).forEach(key => { keysPressed[key] = false; });

    // Ensure game loop is running
    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}

/** Clears all active obstacles from the game. */
function resetObstacles() {
    obstacles = [];
}


// --- AI Model Management (Save/Import) ---

/** Saves the current `bestGenomeEver` to a JSON file. */
function saveBestModel() {
    const modelToSave = bestGenomeEver;
    if (!modelToSave) {
        messageBox.textContent = "No best AI model available to save.";
        return;
    }

    try {
        // Get the network structure as JSON
        const modelJsonData = modelToSave.toJSON();
        // Add the score to the saved data
        modelJsonData.score = modelToSave.score;
        // Convert to a string
        const jsonString = JSON.stringify(modelJsonData);
        // Create a Blob (binary large object) containing the JSON data
        const blob = new Blob([jsonString], { type: 'application/json' });
        // Create a temporary URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a temporary link element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        // Construct a filename including the score and generation (if available)
        const fitness = (modelToSave.score !== undefined) ? Math.round(modelToSave.score) : 'N_A';
        const currentGeneration = generation > 0 ? generation : 'N_A'; // Use current gen as approximation
        a.download = `drone_ai_best_score_${fitness}_gen_${currentGeneration}.json`;

        // Programmatically click the link to start download
        document.body.appendChild(a);
        a.click();

        // Clean up the temporary elements
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // Release the Blob URL resource

        messageBox.textContent = `Best model (Score: ${fitness}) saved successfully.`;
        console.log("AI Model saved.");

    } catch (error) {
        messageBox.textContent = "Error saving model: " + error.message;
        console.error("Error saving AI model:", error);
    }
}

/**
 * Handles the file input change event to load an AI model from a JSON file.
 * @param {Event} event - The file input change event object.
 */
function importModel(event) {
    const file = event.target.files[0]; // Get the selected file
    if (!file) {
        messageBox.textContent = "No file selected for import.";
        return;
    }

    const reader = new FileReader(); // Create a file reader

    // Define what happens when the file is successfully read
    reader.onload = function (e) {
        try {
            const json = JSON.parse(e.target.result); // Parse the file content as JSON

            // Basic validation: Check if it looks like a Neataptic network JSON
            if (!json.nodes || !json.connections) {
                throw new Error("Invalid model file format.");
            }

            // Create a Neataptic network from the imported JSON
            const importedGenome = neataptic.Network.fromJSON(json);

            // Optional: Check if input/output sizes match the current game setup
            const expectedInputs = Object.keys(baseDrone.sensors).length;
            const expectedOutputs = 2;
            if (importedGenome.input !== expectedInputs || importedGenome.output !== expectedOutputs) {
                console.warn(
                    `Imported model has different input/output sizes (${importedGenome.input}/${importedGenome.output}) than expected (${expectedInputs}/${expectedOutputs}). It might not work correctly.`
                );
                // You could throw an error here or just show a stronger warning message
                // messageBox.textContent = `Warning: Imported model size mismatch! (${importedGenome.input}/${importedGenome.output})`;
            }

            // Load the score if it was saved in the file
            importedGenome.score = (json.score !== undefined && !isNaN(json.score)) ? json.score : 0;

            // Set the imported genome as the new 'best ever'
            bestGenomeEver = importedGenome;
            updateSavedModelStatus(); // Update UI

            // Stop any current game mode and reset
            stopAllModes();
            messageBox.textContent = `AI Model imported (Score: ${bestGenomeEver.score.toFixed(0)}). Press [T] to train from it or [P] to play it back.`;
            currentMode.textContent = "Manual (Imported)"; // Indicate a model is loaded
            displayGameOver(); // Show game over screen
            updateButtonStates(); // Enable playback/save buttons
            console.log("AI Model imported successfully.");

        } catch (error) {
            messageBox.textContent = "Model import error: " + error.message;
            console.error("Error importing AI model:", error);
            bestGenomeEver = null; // Clear any potentially corrupted loaded model
            updateSavedModelStatus();
            updateButtonStates();
        } finally {
            // Reset the file input value so the user can import the same file again if needed
            event.target.value = null;
        }
    };

    // Define what happens if the file cannot be read
    reader.onerror = function () {
        messageBox.textContent = "Error reading the selected file.";
        console.error("File reading error:", reader.error);
    };

    // Start reading the file as text
    reader.readAsText(file);
}


// --- Network Modal Functions ---

/** Opens the modal window to display the JSON structure of the best AI network. */
function openNetworkModal() {
    if (!bestGenomeEver) {
        messageBox.textContent = "No AI model available to display.";
        return;
    }
    try {
        // Get the network data as JSON
        const networkData = bestGenomeEver.toJSON();
        // Add the score for information
        networkData.score = bestGenomeEver.score;
        // Format the JSON string nicely for display
        const networkJson = JSON.stringify(networkData, null, 2); // Indent with 2 spaces
        // Put the formatted JSON into the <pre> tag
        networkJsonDisplay.textContent = networkJson;
        // Show the modal
        networkModal.style.display = "block";
    } catch (error) {
        messageBox.textContent = "Error displaying network structure: " + error.message;
        console.error("Network display error:", error);
    }
}

/** Closes the network structure modal window. */
function closeNetworkModalFunc() {
    networkModal.style.display = "none";
    networkJsonDisplay.textContent = ""; // Clear content
}


// --- Configuration Screen Logic ---

/** Dynamically populates the checkbox list for NEAT mutation methods on the config screen. */
function populateMutationMethods() {
    const availableMethods = Object.keys(methods.mutation); // Get all available mutation method names
    mutationMethodsContainer.innerHTML = ""; // Clear any existing options

    availableMethods.forEach(methodName => {
        // Skip internal/complex types not usually configured this way
        if (['FFW', 'LSTM', 'GRU', 'NARX', 'Memory'].includes(methodName)) return;

        // Create elements for each method
        const container = document.createElement('div');
        container.classList.add('flex', 'items-center', 'mb-1');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `configMethod_${methodName}`;
        checkbox.value = methodName;
        checkbox.name = 'mutationMethod'; // Group checkboxes
        checkbox.classList.add('form-checkbox', 'h-4', 'w-4', 'text-blue-600'); // Basic styling
        // Check if this method is in the default CONFIG list
        checkbox.checked = CONFIG.mutationMethods.some(m => {
            try {
                // Compare function names to handle potential object differences
                return methods.mutation[methodName] && m.name === methods.mutation[methodName].name;
            } catch (e) { return false; } // Handle errors if method doesn't exist
        });


        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        // Format method name nicely (e.g., ADD_NODE -> Add Node)
        label.textContent = methodName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        label.classList.add('ml-2', 'text-sm', 'text-gray-300'); // Styling

        container.appendChild(checkbox);
        container.appendChild(label);
        mutationMethodsContainer.appendChild(container);
    });
}

/** Sets up event listeners for all the input elements on the configuration screen. */
function setupConfigScreenListeners() {
    console.log("Setting up configuration screen listeners..."); // Debug log

    // Helper function to link a slider input to its value display span
    const setupSlider = (slider, valueDisplay, formatter = (v) => v) => {
        if (slider && valueDisplay) {
            // Update display immediately when slider value changes
            slider.addEventListener('input', (e) => {
                valueDisplay.textContent = formatter(e.target.value);
            });
            // Set initial display value based on slider's current value
            valueDisplay.textContent = formatter(slider.value);
        } else {
            console.warn("Missing element for slider setup:", slider?.id, valueDisplay?.id);
        }
    };

    // Formatting functions for different value types
    const formatFloat = (digits) => (value) => parseFloat(value).toFixed(digits);
    const formatPercent = (value) => `${value}%`;
    const formatSeconds = (value) => `${parseFloat(value).toFixed(1)}s`;

    // Setup listeners for all sliders
    setupSlider(configMutationRateSlider, mutationRateValue, formatFloat(2));
    setupSlider(configMutationAmountSlider, mutationAmountValue);
    setupSlider(configElitismSlider, elitismValue, formatPercent);
    setupSlider(configGravitySlider, gravityValue, formatFloat(2));
    setupSlider(configThrustSlider, thrustValue, formatFloat(2));
    setupSlider(configMaxEnergySlider, maxEnergyValue);
    setupSlider(configThrustCostSlider, thrustCostValue, formatFloat(2));
    setupSlider(configMaxHealthSlider, maxHealthValue);
    setupSlider(configRegenRateSlider, regenRateValue, formatFloat(2));
    setupSlider(configSensorRangeSlider, sensorRangeValue);
    setupSlider(configWallPenaltySlider, wallPenaltyValue, formatFloat(2));
    setupSlider(configFloorPenaltySlider, floorPenaltyValue, formatFloat(2));
    setupSlider(configSafeZoneRewardSlider, safeZoneRewardValue, formatFloat(2));
    setupSlider(configAltitudeRewardSlider, altitudeRewardValue, formatFloat(2));
    setupSlider(configTargetProximityRewardSlider, targetProximityRewardValue, formatFloat(1));
    setupSlider(configBodyWidthSlider, bodyWidthValue);
    setupSlider(configBodyHeightSlider, bodyHeightValue);
    setupSlider(configBoosterWidthSlider, boosterWidthValue);
    setupSlider(configBoosterHeightSlider, boosterHeightValue);
    setupSlider(configBoosterSeparationSlider, boosterSeparationValue);
    setupSlider(configBoosterOffsetYSlider, boosterOffsetYValue);
    setupSlider(configMotionBlurIntensitySlider, motionBlurIntensityValue, formatFloat(2));
    setupSlider(configTargetSpawnIntervalSlider, targetSpawnIntervalValue, formatSeconds);
    setupSlider(configTargetLifetimeSlider, targetLifetimeValue, (v) => `${v}s`);

    // Listener for Motion Blur toggle checkbox
    if (configMotionBlurToggle && motionBlurIntensityContainer) {
        configMotionBlurToggle.addEventListener('change', (e) => {
            // Show/hide intensity slider based on checkbox state
            motionBlurIntensityContainer.classList.toggle('hidden', !e.target.checked);
        });
        // Set initial visibility based on checkbox state
        motionBlurIntensityContainer.classList.toggle('hidden', !configMotionBlurToggle.checked);
    }

    // Listener for Target System toggle checkbox
    if (configTargetSystemEnabled && targetSystemOptionsContainer) {
        configTargetSystemEnabled.addEventListener('change', (e) => {
            // Show/hide target options based on checkbox state
            targetSystemOptionsContainer.classList.toggle('hidden', !e.target.checked);
        });
        // Set initial visibility
        targetSystemOptionsContainer.classList.toggle('hidden', !configTargetSystemEnabled.checked);
    }

    // --- Start Game Button Listener ---
    if (startGameButton) {
        // **Important:** Remove potential old listeners before adding a new one
        // This prevents multiple listeners accumulating if setupConfigScreenListeners is called more than once.
        const newStartGameButton = startGameButton.cloneNode(true);
        startGameButton.parentNode.replaceChild(newStartGameButton, startGameButton);

        newStartGameButton.addEventListener('click', () => {
            console.log("Start Game button clicked!");

            // --- Initialize Audio Context on User Interaction ---
            // This is often required by browsers to allow audio playback.
            if (!isAudioInitialized && (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined')) {
                try {
                    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                    // If context starts suspended, try resuming it
                    if (audioCtx.state === 'suspended') {
                        audioCtx.resume().then(() => {
                            console.log("AudioContext resumed successfully on start.");
                            isAudioInitialized = true;
                        }).catch(e => console.error("AudioContext resume failed:", e));
                    } else {
                        isAudioInitialized = true; // Already running or ready
                        console.log("AudioContext initialized successfully.");
                    }
                } catch (e) {
                    console.error("Failed to create AudioContext:", e);
                    isAudioInitialized = false;
                    alert("Could not initialize audio. Sound effects will be disabled.");
                }
            } else if (audioCtx && audioCtx.state === 'suspended') {
                // If already initialized but suspended, just try resuming
                audioCtx.resume().then(() => console.log("AudioContext resumed."));
            }


            // --- Apply All Config Settings ---
            // Read values from UI elements and update the global CONFIG object
            CONFIG.mutationRate = parseFloat(configMutationRateSlider.value);
            CONFIG.mutationAmount = parseInt(configMutationAmountSlider.value);
            CONFIG.elitismPercent = parseInt(configElitismSlider.value);
            // Get selected mutation methods
            CONFIG.mutationMethods = [];
            const checkedCheckboxes = mutationMethodsContainer.querySelectorAll('input[type="checkbox"]:checked');
            checkedCheckboxes.forEach(cb => {
                if (methods.mutation[cb.value]) CONFIG.mutationMethods.push(methods.mutation[cb.value]);
            });
            if (CONFIG.mutationMethods.length === 0) CONFIG.mutationMethods.push(methods.mutation.MOD_WEIGHT); // Default if none selected

            // Game Physics & Mechanics
            CONFIG.gravity = parseFloat(configGravitySlider.value);
            CONFIG.thrustPower = parseFloat(configThrustSlider.value);
            CONFIG.baseMaxEnergy = parseInt(configMaxEnergySlider.value);
            CONFIG.thrustEnergyCost = parseFloat(configThrustCostSlider.value);
            CONFIG.baseMaxHealth = parseInt(configMaxHealthSlider.value);
            CONFIG.healthRegenRate = parseFloat(configRegenRateSlider.value);
            CONFIG.sensorRange = parseInt(configSensorRangeSlider.value);
            // Penalties & Rewards
            CONFIG.wallPenalty = parseFloat(configWallPenaltySlider.value);
            CONFIG.floorPenalty = parseFloat(configFloorPenaltySlider.value);
            CONFIG.safeZoneReward = parseFloat(configSafeZoneRewardSlider.value);
            CONFIG.altitudeReward = parseFloat(configAltitudeRewardSlider.value);
            CONFIG.targetProximityRewardFactor = parseFloat(configTargetProximityRewardSlider.value);
            // Drone Dimensions
            CONFIG.baseBodyWidth = parseInt(configBodyWidthSlider.value);
            CONFIG.baseBodyHeight = parseInt(configBodyHeightSlider.value);
            CONFIG.baseBoosterWidth = parseInt(configBoosterWidthSlider.value);
            CONFIG.baseBoosterHeight = parseInt(configBoosterHeightSlider.value);
            CONFIG.baseBoosterSeparation = parseInt(configBoosterSeparationSlider.value);
            CONFIG.baseBoosterOffsetY = parseInt(configBoosterOffsetYSlider.value);
            // Visuals & Target
            CONFIG.motionBlurEnabled = configMotionBlurToggle.checked;
            CONFIG.motionBlurIntensity = parseFloat(configMotionBlurIntensitySlider.value);
            CONFIG.targetSystemEnabled = configTargetSystemEnabled.checked;
            CONFIG.targetSpawnIntervalSeconds = parseFloat(configTargetSpawnIntervalSlider.value);
            CONFIG.targetLifetimeSeconds = parseFloat(configTargetLifetimeSlider.value);
            // Target size is now hardcoded in CONFIG defaults, but could be added back here if needed

            console.log("Configuration Applied:", CONFIG);

            // --- Switch Screens & Start Game ---
            welcomeScreen.classList.add('hidden'); // Hide config screen
            gameScreen.classList.remove('hidden'); // Show game screen

            // Resize canvas and apply scale *after* screen is visible
            resizeCanvas(); // This calls applyGameScale(false) internally

            // Initialize UI states for the game screen
            updateSavedModelStatus(); // Show if a model is loaded (might be from previous session)
            obstacleToggle.checked = obstaclesEnabled; // Set obstacle toggle to match current state (default is likely false)
            stopAllModes(); // Ensure clean state
            gameRunning = false; // Start in 'ready' state (not actively playing manual)
            displayGameOver(); // Show initial 'Game Over' / Ready screen
            currentMode.textContent = "Manual"; // Set initial mode display
            messageBox.textContent = "Press [R] for Manual | [T] Train AI | [P] Playback Best AI."; // Initial instructions
            updateButtonStates(); // Set button enabled/disabled states

            // Start the main game loop if it's not already running
            if (!animationFrameId) {
                startTime = performance.now(); // Reset start time
                lastTimestamp = startTime;
                animationFrameId = requestAnimationFrame(gameLoop);
            }
        });
        console.log("Start Game button listener attached."); // Debug log
    } else {
        console.error("Start Game button not found!");
    }
}


// --- Global Event Listeners ---

// Handle window resizing
window.addEventListener('resize', resizeCanvas);

// Connect UI buttons to their functions
resetButton.addEventListener('click', switchToManualMode);
startAiButton.addEventListener('click', startAiTraining);
stopAiButton.addEventListener('click', stopAiTraining);
playBestAiButton.addEventListener('click', togglePlaybackMode);
saveModelButton.addEventListener('click', saveBestModel);
clearObstaclesButton.addEventListener('click', resetObstacles);
viewNetworkButton.addEventListener('click', openNetworkModal);
closeNetworkModal.addEventListener('click', closeNetworkModalFunc);
importFile.addEventListener('change', importModel);

// Close modal if clicked outside the content area
window.addEventListener('click', (event) => {
    if (event.target == networkModal) {
        closeNetworkModalFunc();
    }
});

// Game Scale dropdown listener
gameScaleSelect.addEventListener('change', () => applyGameScale(true)); // true = triggered by user

// Obstacle toggle checkbox listener
obstacleToggle.addEventListener('change', (e) => {
    obstaclesEnabled = e.target.checked;
    // Update message only if game screen is active
    if (!gameScreen.classList.contains('hidden')) {
        messageBox.textContent = `Obstacles ${obstaclesEnabled ? 'Enabled' : 'Disabled'}.`;
    }
    // Clear existing obstacles immediately if disabled
    if (!obstaclesEnabled) {
        resetObstacles();
    }
});

// Listeners for AI control panel sliders (Update state variables directly)
populationSizeSlider.addEventListener('input', (e) => {
    populationValue.textContent = e.target.value; // Update display
    // Update variable only if not currently training/playing back
    if (!aiTrainingActive && !playbackModeActive) {
        populationCount = parseInt(e.target.value);
    }
});
trainingSpeedSlider.addEventListener('input', (e) => {
    simulationSpeed = parseInt(e.target.value); // Update speed variable
    speedValue.textContent = `${simulationSpeed}x`; // Update display
});

// Listeners for Obstacle control panel sliders
obstacleMinSpeedSlider.addEventListener('input', (e) => {
    obstacleMinSpeed = parseFloat(e.target.value);
    obstacleMinSpeedValue.textContent = obstacleMinSpeed.toFixed(1);
    // Ensure min speed doesn't exceed max speed
    if (obstacleMinSpeed > obstacleMaxSpeed) {
        obstacleMaxSpeedSlider.value = obstacleMinSpeed; // Adjust max slider
        obstacleMaxSpeed = obstacleMinSpeed;
        obstacleMaxSpeedValue.textContent = obstacleMaxSpeed.toFixed(1);
    }
});
obstacleMaxSpeedSlider.addEventListener('input', (e) => {
    obstacleMaxSpeed = parseFloat(e.target.value);
    obstacleMaxSpeedValue.textContent = obstacleMaxSpeed.toFixed(1);
    // Ensure max speed isn't less than min speed
    if (obstacleMaxSpeed < obstacleMinSpeed) {
        obstacleMinSpeedSlider.value = obstacleMaxSpeed; // Adjust min slider
        obstacleMinSpeed = obstacleMaxSpeed;
        obstacleMinSpeedValue.textContent = obstacleMinSpeed.toFixed(1);
    }
});
obstacleSpawnIntervalSlider.addEventListener('input', (e) => {
    obstacleSpawnInterval = parseInt(e.target.value);
    obstacleSpawnIntervalValue.textContent = obstacleSpawnInterval;
});
// Obstacle size sliders need to re-apply scaling
obstacleMinSizeSlider.addEventListener('input', (e) => {
    baseObstacleMinSize = parseInt(e.target.value);
    obstacleMinSizeValue.textContent = baseObstacleMinSize;
    if (baseObstacleMinSize > baseObstacleMaxSize) {
        obstacleMaxSizeSlider.value = baseObstacleMinSize;
        baseObstacleMaxSize = baseObstacleMinSize;
        obstacleMaxSizeValue.textContent = baseObstacleMaxSize;
    }
    // Re-calculate scaled sizes, but don't reset game mode
    applyGameScale(false);
});
obstacleMaxSizeSlider.addEventListener('input', (e) => {
    baseObstacleMaxSize = parseInt(e.target.value);
    obstacleMaxSizeValue.textContent = baseObstacleMaxSize;
    if (baseObstacleMaxSize < baseObstacleMinSize) {
        obstacleMinSizeSlider.value = baseObstacleMaxSize;
        baseObstacleMinSize = baseObstacleMaxSize;
        obstacleMinSizeValue.textContent = baseObstacleMinSize;
    }
    // Re-calculate scaled sizes, but don't reset game mode
    applyGameScale(false);
});


// --- Page Load Initialization ---
/**
 * Function called when the HTML page is fully loaded.
 * Sets up the configuration screen with default values and attaches listeners.
 */
window.onload = () => {
    console.log("Window loaded. Initializing configuration screen.");

    // Populate dynamic elements like mutation methods
    populateMutationMethods();

    // Helper to set initial slider value AND display from CONFIG defaults
    const setInitialSlider = (slider, valueDisplay, configKey, formatter = (v) => v) => {
        if (slider && valueDisplay && CONFIG[configKey] !== undefined) {
            slider.value = CONFIG[configKey]; // Set slider position
            valueDisplay.textContent = formatter(CONFIG[configKey]); // Set text display
        } else {
            /* console.warn("Missing element or config key for initial setup:", slider?.id, configKey); */
        }
    };
    // Formatters (reuse from setupConfigScreenListeners)
    const formatFloat = (d) => (v) => parseFloat(v).toFixed(d);
    const formatPercent = (v) => `${v}%`;
    const formatSeconds = (v) => `${parseFloat(v).toFixed(1)}s`;

    // Set initial values for all config sliders based on CONFIG defaults
    setInitialSlider(configMutationRateSlider, mutationRateValue, "mutationRate", formatFloat(2));
    setInitialSlider(configMutationAmountSlider, mutationAmountValue, "mutationAmount");
    setInitialSlider(configElitismSlider, elitismValue, "elitismPercent", formatPercent);
    setInitialSlider(configGravitySlider, gravityValue, "gravity", formatFloat(2));
    setInitialSlider(configThrustSlider, thrustValue, "thrustPower", formatFloat(2));
    setInitialSlider(configMaxEnergySlider, maxEnergyValue, "baseMaxEnergy");
    setInitialSlider(configThrustCostSlider, thrustCostValue, "thrustEnergyCost", formatFloat(2));
    setInitialSlider(configMaxHealthSlider, maxHealthValue, "baseMaxHealth");
    setInitialSlider(configRegenRateSlider, regenRateValue, "healthRegenRate", formatFloat(2));
    setInitialSlider(configSensorRangeSlider, sensorRangeValue, "sensorRange");
    setInitialSlider(configWallPenaltySlider, wallPenaltyValue, "wallPenalty", formatFloat(2));
    setInitialSlider(configFloorPenaltySlider, floorPenaltyValue, "floorPenalty", formatFloat(2));
    setInitialSlider(configSafeZoneRewardSlider, safeZoneRewardValue, "safeZoneReward", formatFloat(2));
    setInitialSlider(configAltitudeRewardSlider, altitudeRewardValue, "altitudeReward", formatFloat(2));
    setInitialSlider(configTargetProximityRewardSlider, targetProximityRewardValue, "targetProximityRewardFactor", formatFloat(1));
    setInitialSlider(configBodyWidthSlider, bodyWidthValue, "baseBodyWidth");
    setInitialSlider(configBodyHeightSlider, bodyHeightValue, "baseBodyHeight");
    setInitialSlider(configBoosterWidthSlider, boosterWidthValue, "baseBoosterWidth");
    setInitialSlider(configBoosterHeightSlider, boosterHeightValue, "baseBoosterHeight");
    setInitialSlider(configBoosterSeparationSlider, boosterSeparationValue, "baseBoosterSeparation");
    setInitialSlider(configBoosterOffsetYSlider, boosterOffsetYValue, "baseBoosterOffsetY");
    setInitialSlider(configMotionBlurIntensitySlider, motionBlurIntensityValue, "motionBlurIntensity", formatFloat(2));
    setInitialSlider(configTargetSpawnIntervalSlider, targetSpawnIntervalValue, "targetSpawnIntervalSeconds", formatSeconds);
    setInitialSlider(configTargetLifetimeSlider, targetLifetimeValue, "targetLifetimeSeconds", (v) => `${v}s`);

    // Set initial state for checkboxes and dependent elements
    if (configMotionBlurToggle) configMotionBlurToggle.checked = CONFIG.motionBlurEnabled;
    // if (motionBlurIntensityContainer) motionBlurIntensityContainer.classList.toggle('hidden', !CONFIG.motionBlurEnabled); // Visibility handled by setup listener now
    if (configTargetSystemEnabled) configTargetSystemEnabled.checked = CONFIG.targetSystemEnabled;
    // if (targetSystemOptionsContainer) targetSystemOptionsContainer.classList.toggle('hidden', !CONFIG.targetSystemEnabled); // Visibility handled by setup listener now

    // Finally, attach all the listeners to the config screen elements
    setupConfigScreenListeners();

    console.log("Configuration screen setup complete.");
}; // End window.onload