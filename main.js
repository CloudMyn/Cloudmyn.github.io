// --- Variabel Global & Konstanta ---
const { Neat, methods, architect } = neataptic; // Pustaka Neataptic untuk AI

// --- Elemen DOM ---
// Referensi Elemen DOM dari kode asli pengguna
const welcomeScreen = document.getElementById("welcomeScreen");
const gameScreen = document.getElementById("gameScreen");
const startGameButton = document.getElementById("startGameButton");
// Input Konfigurasi
const configMutationRateSlider = document.getElementById("configMutationRate");
const mutationRateValue = document.getElementById("mutationRateValue");
const configMutationAmountSlider = document.getElementById(
    "configMutationAmount",
);
const mutationAmountValue = document.getElementById("mutationAmountValue");
const configElitismSlider = document.getElementById("configElitism");
const elitismValue = document.getElementById("elitismValue");
const mutationMethodsContainer = document.getElementById(
    "mutationMethodsContainer",
);
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
const configSafeZoneRewardSlider = document.getElementById(
    "configSafeZoneReward",
);
const safeZoneRewardValue = document.getElementById("safeZoneRewardValue");
const configAltitudeRewardSlider = document.getElementById(
    "configAltitudeReward",
);
const altitudeRewardValue = document.getElementById("altitudeRewardValue");
const configTargetProximityRewardSlider = document.getElementById(
    "configTargetProximityReward",
);
const targetProximityRewardValue = document.getElementById(
    "targetProximityRewardValue",
);
// ---
const configBodyWidthSlider = document.getElementById("configBodyWidth");
const bodyWidthValue = document.getElementById("bodyWidthValue");
const configBodyHeightSlider = document.getElementById("configBodyHeight");
const bodyHeightValue = document.getElementById("bodyHeightValue");
const configBoosterWidthSlider = document.getElementById("configBoosterWidth");
const boosterWidthValue = document.getElementById("boosterWidthValue");
const configBoosterHeightSlider = document.getElementById(
    "configBoosterHeight",
);
const boosterHeightValue = document.getElementById("boosterHeightValue");
const configBoosterSeparationSlider = document.getElementById(
    "configBoosterSeparation",
);
const boosterSeparationValue = document.getElementById(
    "boosterSeparationValue",
);
const configBoosterOffsetYSlider = document.getElementById(
    "configBoosterOffsetY",
);
const boosterOffsetYValue = document.getElementById("boosterOffsetYValue");
const configMotionBlurToggle = document.getElementById(
    "configMotionBlurToggle",
);
const motionBlurIntensityContainer = document.getElementById(
    "motionBlurIntensityContainer",
);
const configMotionBlurIntensitySlider = document.getElementById(
    "configMotionBlurIntensity",
);
const motionBlurIntensityValue = document.getElementById(
    "motionBlurIntensityValue",
);
const configTargetSystemEnabled = document.getElementById(
    "configTargetSystemEnabled",
);
const targetSystemOptionsContainer = document.getElementById(
    "targetSystemOptionsContainer",
);
const configTargetSpawnIntervalSlider = document.getElementById(
    "configTargetSpawnInterval",
);
const targetSpawnIntervalValue = document.getElementById(
    "targetSpawnIntervalValue",
);
const configTargetLifetimeSlider = document.getElementById(
    "configTargetLifetime",
);
const targetLifetimeValue = document.getElementById("targetLifetimeValue");

// Elemen Layar Game
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
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
const obstacleMinSpeedSlider = document.getElementById(
    "obstacleMinSpeedSlider",
);
const obstacleMinSpeedValue = document.getElementById("obstacleMinSpeedValue");
const obstacleMaxSpeedSlider = document.getElementById(
    "obstacleMaxSpeedSlider",
);
const obstacleMaxSpeedValue = document.getElementById("obstacleMaxSpeedValue");
const obstacleSpawnIntervalSlider = document.getElementById(
    "obstacleSpawnIntervalSlider",
);
const obstacleSpawnIntervalValue = document.getElementById(
    "obstacleSpawnIntervalValue",
);
const obstacleMinSizeSlider = document.getElementById("obstacleMinSizeSlider");
const obstacleMinSizeValue = document.getElementById("obstacleMinSizeValue");
const obstacleMaxSizeSlider = document.getElementById("obstacleMaxSizeSlider");
const obstacleMaxSizeValue = document.getElementById("obstacleMaxSizeValue");
const scaleControlContainer = document.getElementById("scaleControlContainer");

// --- Variabel Status Game & AI ---
let neat;
let aiDrones = [];
let playbackDrone = null;
let bestGenomeEver = null;
let generation = 0;
let highestFitness = 0;
let averageFitness = 0;
let aiTrainingActive = false;
let playbackModeActive = false;
let populationCount = parseInt(populationSizeSlider.value);
let animationFrameId;
let gameRunning = false;
let obstacles = [];
let obstacleSpawnTimer = 0;
let obstaclesEnabled = false;
let score = 0;
let playbackScore = 0;
let startTime = 0;
let lastTimestamp = 0;
let simulationSpeed = parseInt(trainingSpeedSlider.value);
let gameScale = parseFloat(gameScaleSelect.value);
let currentTargets = [];
const NUM_TARGETS_TO_SPAWN = populationCount; // Sesuaikan dengan populasi
const NUM_SPAWN_POINTS = populationCount * 2; // Lebih banyak titik spawn potensial
let potentialSpawnPoints = [];
let targetSpawnCooldown = 0;
let particles = [];

// --- Variabel Audio ---
let audioCtx = null; // Audio Context
const activeBoosterSounds = new Map(); // Menyimpan node audio booster yang aktif per drone
let isAudioInitialized = false;

// --- Objek Konfigurasi Default (dengan Optimasi) ---
let CONFIG = {
    // NEAT
    mutationRate: 0.6,
    mutationAmount: 4,
    elitismPercent: 15, // Naikkan sedikit elitisme
    mutationMethods: [
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
    // Game Physics & Rules
    gravity: 0.09,
    thrustPower: 0.19,
    sensorRange: 250,
    maxHealth: 200,
    maxEnergy: 100,
    thrustEnergyCost: 0.2,
    healthRegenRate: 0.15,
    wallPenalty: 0.4, // Naikkan penalti dinding
    floorPenalty: 0.8, // Naikkan penalti lantai
    safeZoneReward: 0.05,
    altitudeReward: 0.06,
    targetCollectReward: 100, // Reward utama
    targetProximityRewardFactor: 1.2, // Turunkan sedikit reward kedekatan
    survivalReward: 0.01, // Reward kecil untuk bertahan hidup
    obstacleHitPenalty: 1.0, // Penalti tambahan saat kena rintangan
    energyCostPenaltyFactor: 0.05, // Penalti kecil untuk penggunaan energi
    // Drone Dimensions
    baseBodyWidth: 40,
    baseBodyHeight: 18,
    baseBoosterWidth: 10,
    baseBoosterHeight: 20,
    baseBoosterSeparation: 60,
    baseBoosterOffsetY: 0,
    // Visuals
    motionBlurEnabled: false,
    motionBlurIntensity: 0.2,
    motionBlurTrailLength: 5,
    // Target System
    targetSystemEnabled: true,
    targetSpawnIntervalSeconds: 1.0,
    targetLifetimeSeconds: 10.0,
    targetSize: 15,
    targetColor: "#FFD700",
    targetBloomColor: "rgba(255, 215, 0, 0.5)",
    targetBloomSize: 15,
    // Other constants
    boosterRotationSpeed: 0.07,
    maxBoosterAngle: Math.PI / 2.5,
    drag: 0.985,
    maxSpeed: 7,
    bloomIntensity: 15,
    wallThresholdX: 30,
    wallThresholdY: 20,
    floorThreshold: 50,
    maxFloatVY: 1.0,
    wallHitDamage: 20,
    boosterHitDamage: 5,
    baseObstacleDamage: 8,
    obstacleDamageSizeFactor: 0.2,
    obstacleDamageSpeedFactor: 3,
    idealAltitudeMinRatio: 0.3,
    idealAltitudeMaxRatio: 0.7,
    spawnPointPaddingRatio: 0.1,
};

// --- Variabel Skala Game ---
let scaledSensorRange = CONFIG.sensorRange * gameScale;
let scaledGravity = CONFIG.gravity;
let scaledThrustPower = CONFIG.thrustPower;
let scaledBodyWidth = CONFIG.baseBodyWidth * gameScale;
let scaledBodyHeight = CONFIG.baseBodyHeight * gameScale;
let scaledBoosterWidth = CONFIG.baseBoosterWidth * gameScale;
let scaledBoosterHeight = CONFIG.baseBoosterHeight * gameScale;
let scaledBoosterSeparation = CONFIG.baseBoosterSeparation * gameScale;
let scaledBoosterOffsetY = CONFIG.baseBoosterOffsetY * gameScale;
let baseObstacleMinSize = parseInt(obstacleMinSizeSlider.value);
let baseObstacleMaxSize = parseInt(obstacleMaxSizeSlider.value);
let scaledObstacleMinSize = baseObstacleMinSize * gameScale;
let scaledObstacleMaxSize = baseObstacleMaxSize * gameScale;
let scaledWallThresholdX = CONFIG.wallThresholdX * gameScale;
let scaledWallThresholdY = CONFIG.wallThresholdY * gameScale;
let scaledFloorThreshold = CONFIG.floorThreshold * gameScale;
let scaledTargetSize = CONFIG.targetSize * gameScale;

// --- Pengaturan Rintangan ---
let obstacleMinSpeed = parseFloat(obstacleMinSpeedSlider.value);
let obstacleMaxSpeed = parseFloat(obstacleMaxSpeedSlider.value);
let obstacleSpawnInterval = parseInt(obstacleSpawnIntervalSlider.value);

// --- Objek Dasar Drone ---
const baseDrone = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    health: 0,
    energy: 0,
    alive: true,
    score: 0,
    thrusting: false,
    bodyColor: "#FFFFFF",
    boosterColor: "#CCCCCC",
    boosterActiveColor: "#FF5722",
    boosterFlameColor1: "rgba(255, 165, 0, 0.9)",
    boosterFlameColor2: "rgba(255, 87, 34, 0.7)",
    energyBarColor: "#60a5fa",
    bodyWidth: 0,
    bodyHeight: 0,
    boosterWidth: 0,
    boosterHeight: 0,
    boosterSeparation: 0,
    boosterOffsetY: 0,
    leftBoosterAngle: 0,
    rightBoosterAngle: 0,
    isManual: false,
    isPlayback: false,
    isTraining: false,
    trail: [],
    sensors: {
        distBottom: 0,
        distLeftWall: 0,
        distRightWall: 0,
        velX: 0,
        velY: 0,
        obsDistForward: 1,
        obsDistLeft: 1,
        obsDistRight: 1,
        obsDistFwdLeft: 1,
        obsDistFwdRight: 1,
        obsDistDown: 1,
        currentHealth: 1,
        currentEnergy: 1,
        targetDirX: 0,
        targetDirY: 0,
        leftBoosterAngleNorm: 0,
        rightBoosterAngleNorm: 0,
    }, // Tambah sensor sudut booster

    checkCollision(obstacle) {
        const dL = this.x - this.bodyWidth / 2,
            dR = this.x + this.bodyWidth / 2,
            dT = this.y - this.bodyHeight / 2,
            dB = this.y + this.bodyHeight / 2;
        const oL = obstacle.x,
            oR = obstacle.x + obstacle.size,
            oT = obstacle.y,
            oB = obstacle.y + obstacle.size;
        return dL < oR && dR > oL && dT < oB && dB > oT;
    },
    draw() {
        ctx.save();
        const showFullVisuals = !this.isTraining;
        // Motion Blur Drawing Logic (remains the same)
        if (
            showFullVisuals &&
            CONFIG.motionBlurEnabled &&
            this.trail.length > 0 &&
            this.alive
        ) {
            for (let i = this.trail.length - 1; i >= 0; i--) {
                const pos = this.trail[i];
                const alphaFactor = (i + 1) / this.trail.length;
                const alpha = CONFIG.motionBlurIntensity * alphaFactor * 0.8;
                if (alpha > 0.01) {
                    ctx.globalAlpha = alpha;
                    ctx.fillStyle = this.bodyColor;
                    const gBX = pos.x - this.bodyWidth / 2,
                        gBY = pos.y - this.bodyHeight / 2;
                    ctx.fillRect(gBX, gBY, this.bodyWidth, this.bodyHeight);
                    ctx.fillStyle = this.boosterColor;
                    const gLBX = pos.x - this.boosterSeparation / 2,
                        gRBX = pos.x + this.boosterSeparation / 2,
                        gBYo = pos.y + this.boosterOffsetY;
                    ctx.save();
                    ctx.translate(gLBX, gBYo);
                    ctx.rotate(pos.lAngle);
                    ctx.fillRect(
                        -this.boosterWidth / 2,
                        -this.boosterHeight / 2,
                        this.boosterWidth,
                        this.boosterHeight,
                    );
                    ctx.restore();
                    ctx.save();
                    ctx.translate(gRBX, gBYo);
                    ctx.rotate(pos.rAngle);
                    ctx.fillRect(
                        -this.boosterWidth / 2,
                        -this.boosterHeight / 2,
                        this.boosterWidth,
                        this.boosterHeight,
                    );
                    ctx.restore();
                }
            }
            ctx.globalAlpha = 1.0;
        }

        // Sensor Range Drawing (remains the same)
        if (showFullVisuals && (this.isManual || this.isPlayback) && this.alive) {
            ctx.globalAlpha = 0.15;
            const gradient = ctx.createRadialGradient(
                this.x,
                this.y,
                scaledSensorRange * 0.3,
                this.x,
                this.y,
                scaledSensorRange,
            );
            gradient.addColorStop(0, "rgba(0, 191, 255, 0.4)");
            gradient.addColorStop(0.8, "rgba(0, 191, 255, 0.1)");
            gradient.addColorStop(1, "rgba(0, 191, 255, 0)");
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, scaledSensorRange, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;
        }

        // Body Drawing (remains the same)
        ctx.fillStyle = this.bodyColor;
        const bX = this.x - this.bodyWidth / 2,
            bY = this.y - this.bodyHeight / 2;
        ctx.fillRect(bX, bY, this.bodyWidth, this.bodyHeight);
        if (showFullVisuals) {
            ctx.fillStyle = "#ADD8E6"; // Antenna color
            ctx.fillRect(
                this.x - 2 * gameScale,
                bY - 5 * gameScale,
                4 * gameScale,
                5 * gameScale,
            );
        }

        // Booster Drawing (calls helper function)
        const lBAX = this.x - this.boosterSeparation / 2,
            rBAX = this.x + this.boosterSeparation / 2,
            bAY = this.y + this.boosterOffsetY;
        this.drawBooster(lBAX, bAY, this.leftBoosterAngle);
        this.drawBooster(rBAX, bAY, this.rightBoosterAngle);

        // Health/Energy Bar Drawing (remains the same)
        if (showFullVisuals && (this.isManual || this.isPlayback) && this.alive) {
            const bw = this.bodyWidth * 0.8,
                bh = 3 * gameScale,
                bs = 1 * gameScale;
            const bx = this.x - bw / 2,
                hby = bY - bh * 2 - bs - 4 * gameScale,
                eby = hby + bh + bs;
            const hr = Math.max(0, this.health / CONFIG.maxHealth);
            ctx.fillStyle = "#4a5568"; // Bar background
            ctx.fillRect(bx, hby, bw, bh);
            ctx.fillStyle = hr > 0.25 ? "#4ade80" : "#f87171"; // Health color
            ctx.fillRect(bx, hby, bw * hr, bh);
            const er = Math.max(0, this.energy / CONFIG.maxEnergy);
            ctx.fillStyle = "#4a5568"; // Bar background
            ctx.fillRect(bx, eby, bw, bh);
            ctx.fillStyle = this.energyBarColor; // Energy color
            ctx.fillRect(bx, eby, bw * er, bh);
        }
        ctx.restore();
    },
    drawBooster(attachX, attachY, angle) {
        ctx.save();
        ctx.translate(attachX, attachY);
        ctx.rotate(angle);
        const fby = this.boosterHeight / 2; // Flame base Y relative to booster center

        // Flame Drawing (remains the same)
        if (this.thrusting && this.energy > 0) {
            ctx.shadowColor = this.boosterFlameColor1;
            ctx.shadowBlur = CONFIG.bloomIntensity;
            const fl = (20 + Math.random() * 8) * gameScale; // Flame length
            const grad = ctx.createLinearGradient(0, fby, 0, fby + fl);
            grad.addColorStop(0, this.boosterFlameColor1);
            grad.addColorStop(1, this.boosterFlameColor2);
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.moveTo(0, fby);
            ctx.lineTo(-this.boosterWidth / 3, fby + fl * 0.6);
            ctx.lineTo(0, fby + fl);
            ctx.lineTo(this.boosterWidth / 3, fby + fl * 0.6);
            ctx.closePath();
            ctx.fill();
            ctx.shadowBlur = 0; // Reset shadow for booster body
        }

        // Booster Body Drawing (remains the same)
        ctx.fillStyle = this.boosterColor;
        ctx.fillRect(
            -this.boosterWidth / 2,
            -this.boosterHeight / 2,
            this.boosterWidth,
            this.boosterHeight,
        );
        ctx.restore();
    },
    updateSensors() {
        // Sensor calculations (remains the same)
        this.sensors.distBottom = Math.max(
            0,
            Math.min(1, (canvas.height - this.y) / canvas.height),
        );
        this.sensors.distLeftWall = Math.max(0, Math.min(1, this.x / canvas.width));
        this.sensors.distRightWall = Math.max(
            0,
            Math.min(1, (canvas.width - this.x) / canvas.width),
        );
        this.sensors.velX = this.vx / CONFIG.maxSpeed;
        this.sensors.velY = this.vy / CONFIG.maxSpeed;
        this.sensors.obsDistForward = this.getMinObstacleDistInDir(0, -1);
        this.sensors.obsDistLeft = this.getMinObstacleDistInDir(-1, 0);
        this.sensors.obsDistRight = this.getMinObstacleDistInDir(1, 0);
        this.sensors.obsDistFwdLeft = this.getMinObstacleDistInDir(-0.707, -0.707);
        this.sensors.obsDistFwdRight = this.getMinObstacleDistInDir(0.707, -0.707);
        this.sensors.obsDistDown = this.getMinObstacleDistInDir(0, 1);
        this.sensors.currentHealth = Math.max(0, this.health / CONFIG.maxHealth);
        this.sensors.currentEnergy = Math.max(0, this.energy / CONFIG.maxEnergy);
        // Sensor sudut booster (dinormalisasi -1 to 1)
        this.sensors.leftBoosterAngleNorm =
            this.leftBoosterAngle / CONFIG.maxBoosterAngle;
        this.sensors.rightBoosterAngleNorm =
            this.rightBoosterAngle / CONFIG.maxBoosterAngle;

        // Target Sensor Logic (remains the same)
        let closestTarget = null;
        let minTargetDistSq = scaledSensorRange * scaledSensorRange;
        currentTargets.forEach((target) => {
            const dx = target.x - this.x;
            const dy = target.y - this.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < minTargetDistSq) {
                minTargetDistSq = distSq;
                closestTarget = target;
            }
        });
        if (closestTarget) {
            const dist = Math.sqrt(minTargetDistSq) || 1; // Avoid division by zero
            this.sensors.targetDirX = (closestTarget.x - this.x) / dist;
            this.sensors.targetDirY = (closestTarget.y - this.y) / dist;
        } else {
            this.sensors.targetDirX = 0;
            this.sensors.targetDirY = 0;
        }
    },
    getMinObstacleDistInDir(dx, dy) {
        // Obstacle detection logic (remains the same)
        let minDistSq = scaledSensorRange * scaledSensorRange;
        let detected = false;
        obstacles.forEach((obs) => {
            const obsCenterX = obs.x + obs.size / 2;
            const obsCenterY = obs.y + obs.size / 2;
            const vecToObsX = obsCenterX - this.x;
            const vecToObsY = obsCenterY - this.y;

            // Dot product to check if obstacle is generally in the sensor direction
            const dotProduct = vecToObsX * dx + vecToObsY * dy;

            if (dotProduct > 0) { // Obstacle is somewhat in front
                const distSq = vecToObsX * vecToObsX + vecToObsY * vecToObsY;

                // Quick check: If center is outside sensor range, skip detailed check
                if (distSq < scaledSensorRange * scaledSensorRange) {
                    // More accurate check: distance from obstacle center to the sensor line segment
                    const closestPointDistSq = this.distSqPointToSegment(
                        this.x, this.y, // Start of sensor line
                        this.x + dx * scaledSensorRange, this.y + dy * scaledSensorRange, // End of sensor line
                        obsCenterX, obsCenterY // Obstacle center
                    );

                    // Consider the obstacle's radius (use size / 1.5 for a slightly larger hit area)
                    const effectiveObstacleRadiusSq = (obs.size / 1.5) * (obs.size / 1.5);

                    if (closestPointDistSq < effectiveObstacleRadiusSq) {
                        // Collision detected along the sensor ray
                        if (distSq < minDistSq) {
                            minDistSq = distSq;
                            detected = true;
                        }
                    }
                }
            }
        });
        // Return normalized distance (0 = very close, 1 = far or no obstacle)
        return detected ? Math.sqrt(minDistSq) / scaledSensorRange : 1.0;
    },
    distSqPointToSegment(x1, y1, x2, y2, px, py) {
        // Helper function for sensor calculation (remains the same)
        const l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
        if (l2 === 0) return (px - x1) * (px - x1) + (py - y1) * (py - y1); // Segment is a point
        let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
        t = Math.max(0, Math.min(1, t)); // Clamp t to [0, 1]
        const closestX = x1 + t * (x2 - x1);
        const closestY = y1 + t * (y2 - y1);
        return (px - closestX) * (px - closestX) + (py - closestY) * (py - closestY);
    },
    takeDamage(amount) {
        if (!this.alive) return;
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            this.alive = false;
            stopBoosterSound(this); // <-- Hentikan suara booster saat mati
            playSoundEffect('destruction'); // <-- Mainkan suara ledakan

            if (!this.isTraining) {
                createDestructionEffect(this.x, this.y);
            }
            if (this.isManual) {
                messageBox.textContent = "Drone Hancur!";
                gameRunning = false;
                updateButtonStates();
            } else if (this.isPlayback) {
                messageBox.textContent = "Playback Selesai (Hancur).";
                // Stop playback implicitly handled by gameLoop check
            }
        }
    },
    update(inputData = {}) {
        if (!this.alive) return;

        // Input Processing (Rotation & Thrust) - remains the same
        let rotationInput = 0;
        let thrustInput = false;
        if (this.isManual) {
            if (inputData.left) rotationInput = -1;
            if (inputData.right) rotationInput = 1;
            thrustInput = inputData.thrust;
        } else { // AI or Playback
            thrustInput = inputData.thrust > 0.5;
            rotationInput = inputData.rotation * 2 - 1; // Output is 0..1, map to -1..1
            rotationInput = Math.max(-1, Math.min(1, rotationInput)); // Clamp
        }

        // Booster Angle Update (remains the same)
        const rotationChange = rotationInput * CONFIG.boosterRotationSpeed;
        this.leftBoosterAngle = Math.max(
            -CONFIG.maxBoosterAngle,
            Math.min(CONFIG.maxBoosterAngle, this.leftBoosterAngle + rotationChange),
        );
        this.rightBoosterAngle = Math.max(
            -CONFIG.maxBoosterAngle,
            Math.min(CONFIG.maxBoosterAngle, this.rightBoosterAngle + rotationChange),
        );

        // Determine if thrusting *should* happen based on input and energy
        this.thrusting = thrustInput; // Update internal state first

        // --- AUDIO BOOSTER ---
        const shouldPlayBooster = this.thrusting && this.energy > 0; // Kondisi aktual untuk suara
        const isBoosterPlaying = activeBoosterSounds.has(this);

        if (shouldPlayBooster && !isBoosterPlaying) {
            playBoosterSound(this); // Mulai suara jika belum main & energi cukup
        } else if (!shouldPlayBooster && isBoosterPlaying) {
            stopBoosterSound(this); // Hentikan suara jika tidak thrusting atau energi habis
        }
        // --- END AUDIO BOOSTER ---

        // Physics Update (Thrust Application)
        let energyConsumed = 0;
        if (this.thrusting && this.energy > 0) { // Apply physics only if energy available
            energyConsumed = CONFIG.thrustEnergyCost;
            this.energy = Math.max(0, this.energy - energyConsumed);

            // Calculate thrust vector based on booster angles
            const leftThrustDirectionWorld = this.leftBoosterAngle - Math.PI / 2;
            const rightThrustDirectionWorld = this.rightBoosterAngle - Math.PI / 2;

            const totalThrustVx = (
                (Math.cos(leftThrustDirectionWorld) + Math.cos(rightThrustDirectionWorld)) * scaledThrustPower
            ) / 2;
            const totalThrustVy = (
                (Math.sin(leftThrustDirectionWorld) + Math.sin(rightThrustDirectionWorld)) * scaledThrustPower
            ) / 2;

            this.vx += totalThrustVx;
            this.vy += totalThrustVy;
        }

        // Gravity and Drag (remains the same)
        this.vy += scaledGravity;
        this.vx *= CONFIG.drag;
        this.vy *= CONFIG.drag;

        // Speed Limiting (remains the same)
        const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (currentSpeed > CONFIG.maxSpeed) {
            const scaleRatio = CONFIG.maxSpeed / currentSpeed;
            this.vx *= scaleRatio;
            this.vy *= scaleRatio;
        }

        // Trail Update for Motion Blur (remains the same)
        if (!this.isTraining && CONFIG.motionBlurEnabled) {
            this.trail.push({
                x: this.x,
                y: this.y,
                lAngle: this.leftBoosterAngle,
                rAngle: this.rightBoosterAngle,
            });
            if (this.trail.length > CONFIG.motionBlurTrailLength) {
                this.trail.shift();
            }
        } else {
            this.trail = []; // Clear trail if disabled or training
        }

        // Position Update (remains the same)
        this.x += this.vx;
        this.y += this.vy;

        // NaN Check (remains the same)
        if (isNaN(this.x) || isNaN(this.y) || isNaN(this.vx) || isNaN(this.vy)) {
            console.error("NaN detected in drone state!", this);
            this.alive = false;
            stopBoosterSound(this); // Stop sound on error too
            if (this.isManual) {
                gameRunning = false; updateButtonStates();
            }
            return;
        }

        // Boundary Collision Checks
        const halfBodyWidth = this.bodyWidth / 2;
        const halfBodyHeight = this.bodyHeight / 2;
        let hitWall = false;
        let boosterHit = false;

        // Booster Collision Check (more robust)
        const boosterPoints = this.getBoosterWorldPoints();
        boosterPoints.forEach(point => {
            let collisionPoint = null;
            if (point.x < 0) collisionPoint = { x: 0, y: point.y };
            else if (point.x > canvas.width) collisionPoint = { x: canvas.width, y: point.y };

            if (point.y < 0) collisionPoint = { x: point.x, y: 0 };
            else if (point.y > canvas.height) collisionPoint = { x: point.x, y: canvas.height };

            if (collisionPoint) {
                boosterHit = true;
                playSoundEffect('booster_hit', 0.8); // <-- Suara benturan booster
                if (!this.isTraining) {
                    createBoosterImpactEffect(collisionPoint.x, collisionPoint.y);
                }
                this.takeDamage(CONFIG.boosterHitDamage);
                // Apply small impulse away from collision point (optional, can make it unstable)
                // const impulseX = this.x - collisionPoint.x;
                // const impulseY = this.y - collisionPoint.y;
                // const impulseMag = Math.sqrt(impulseX*impulseX + impulseY*impulseY) || 1;
                // this.vx += (impulseX / impulseMag) * 0.5;
                // this.vy += (impulseY / impulseMag) * 0.5;
            }
        });


        // Body Collision Check
        let wallHitType = null; // Untuk membedakan tipe benturan
        if (this.x < halfBodyWidth) {
            this.x = halfBodyWidth;
            this.vx *= -0.3; // Dampen velocity on hit
            hitWall = true;
            wallHitType = 'side_wall';
        } else if (this.x > canvas.width - halfBodyWidth) {
            this.x = canvas.width - halfBodyWidth;
            this.vx *= -0.3;
            hitWall = true;
            wallHitType = 'side_wall';
        }

        if (this.y < halfBodyHeight) { // Ceiling hit
            this.y = halfBodyHeight;
            this.vy = 0; // Stop vertical movement more abruptly
            hitWall = true;
            wallHitType = 'ceiling';
        }

        if (this.y > canvas.height - halfBodyHeight) { // Floor hit
            this.y = canvas.height - halfBodyHeight;
            this.vy *= -0.3; // Dampen bounce
            // Add slight horizontal friction on floor hit
            this.vx *= 0.95;
            hitWall = true;
            wallHitType = 'floor';
        }

        // Apply damage only if body hits wall AND booster didn't hit first
        if (hitWall && !boosterHit) {
            const impactSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy); // Speed at impact
            const intensity = Math.min(1.0, impactSpeed / (CONFIG.maxSpeed * 0.7)); // Normalize intensity
            playSoundEffect('wall_hit', intensity); // <-- Suara benturan dinding/lantai
            this.takeDamage(CONFIG.wallHitDamage);
        }

        // Out of Bounds Check (Bottom)
        if (this.y > canvas.height + this.bodyHeight * 2) { // Fallen way below
            this.alive = false;
            stopBoosterSound(this); // Stop sound if fallen out
            if (this.isManual) {
                messageBox.textContent = "Drone hilang!"; gameRunning = false; updateButtonStates();
            } else if (this.isPlayback) {
                messageBox.textContent = "Playback Selesai (Jatuh).";
            }
        }

        // Obstacle Collision Check
        let collidingWithObstacle = false;
        obstacles.forEach((obs) => {
            if (this.checkCollision(obs)) {
                collidingWithObstacle = true;
                const speedFactor = Math.min(1, currentSpeed / CONFIG.maxSpeed);
                const sizeFactor = obs.size / ((scaledObstacleMinSize + scaledObstacleMaxSize) / 2);
                const damage = CONFIG.baseObstacleDamage +
                               sizeFactor * CONFIG.obstacleDamageSizeFactor * CONFIG.baseObstacleDamage +
                               speedFactor * CONFIG.obstacleDamageSpeedFactor;
                const intensity = Math.min(1.5, damage / (CONFIG.baseObstacleDamage * 2)); // Intensity based on relative damage
                playSoundEffect('obstacle_hit', intensity); // <-- Suara benturan obstacle
                this.takeDamage(damage);

                // Apply impulse from obstacle collision
                const impulseX = this.x - (obs.x + obs.size / 2);
                const impulseY = this.y - (obs.y + obs.size / 2);
                const impulseMag = Math.sqrt(impulseX*impulseX + impulseY*impulseY) || 1;
                const impulseStrength = 1.0 + intensity * 0.5; // Stronger impulse for harder hits
                this.vx += (impulseX / impulseMag) * impulseStrength;
                this.vy += (impulseY / impulseMag) * impulseStrength;


                if (!this.isManual) { // Apply score penalty only for AI/Playback
                    this.score -= CONFIG.obstacleHitPenalty;
                }
            }
        });

        // Scoring and Health Regen (for AI/Playback)
        if (this.alive && !this.isManual) {
            // Survival reward
            this.score += CONFIG.survivalReward;

            // Energy consumption penalty
            if (energyConsumed > 0) {
                this.score -= energyConsumed * CONFIG.energyCostPenaltyFactor;
            }

            // Penalties for being near walls/floor
            const nearWall = this.x < scaledWallThresholdX || this.x > canvas.width - scaledWallThresholdX || this.y < scaledWallThresholdY;
            const nearFloor = this.y > canvas.height - scaledFloorThreshold;
            if (nearWall) { this.score -= CONFIG.wallPenalty; }
            if (nearFloor) { this.score -= CONFIG.floorPenalty; }

            // Rewards for safe zone and ideal altitude
            const safeZoneMargin = canvas.width * 0.2;
            const inSafeZone = this.x > safeZoneMargin && this.x < canvas.width - safeZoneMargin;
            const idealMinY = canvas.height * CONFIG.idealAltitudeMinRatio;
            const idealMaxY = canvas.height * CONFIG.idealAltitudeMaxRatio;
            const inIdealAltitude = this.y > idealMinY && this.y < idealMaxY;
            if (inSafeZone) { this.score += CONFIG.safeZoneReward; }
            if (inIdealAltitude) { this.score += CONFIG.altitudeReward; }

            // Target Proximity Reward
            if (this.sensors.targetDirX !== 0 || this.sensors.targetDirY !== 0) {
                let closestTargetDist = Infinity;
                currentTargets.forEach(target => {
                    const dx = target.x - this.x;
                    const dy = target.y - this.y;
                    closestTargetDist = Math.min(closestTargetDist, Math.sqrt(dx * dx + dy * dy));
                });

                if (closestTargetDist < scaledSensorRange) {
                    const proximityRatio = 1 - Math.min(1, closestTargetDist / scaledSensorRange); // 0=far, 1=close
                    const proximityReward = proximityRatio * CONFIG.targetProximityRewardFactor;
                    this.score += proximityReward;
                }
            }
        }

        // Health Regeneration (if stable)
        const isFloating = !hitWall && !boosterHit && this.y < canvas.height - scaledFloorThreshold && Math.abs(this.vy) < CONFIG.maxFloatVY;
        if (this.alive && isFloating && !collidingWithObstacle) {
            this.health = Math.min(CONFIG.maxHealth, this.health + CONFIG.healthRegenRate);
        }

        // Update Sensors (always for AI/Playback, not needed for manual after physics)
        if (!this.isManual) {
            this.updateSensors();
        }
    },
    getBoosterWorldPoints() {
        // Helper to get booster corner points in world coordinates (remains the same)
        const points = [];
        const halfWidth = this.boosterWidth / 2;
        const halfHeight = this.boosterHeight / 2;

        const addPoints = (attachX, attachY, angle) => {
            const cosA = Math.cos(angle);
            const sinA = Math.sin(angle);
            // Local corner coordinates relative to booster center
            const corners = [
                { x: -halfWidth, y: -halfHeight }, // Top-left
                { x: halfWidth, y: -halfHeight },  // Top-right
                { x: halfWidth, y: halfHeight },   // Bottom-right
                { x: -halfWidth, y: halfHeight }   // Bottom-left
            ];
            corners.forEach(corner => {
                // Rotate corner
                const rotatedX = corner.x * cosA - corner.y * sinA;
                const rotatedY = corner.x * sinA + corner.y * cosA;
                // Translate to world position
                points.push({ x: attachX + rotatedX, y: attachY + rotatedY });
            });
        };

        const leftBoosterAttachX = this.x - this.boosterSeparation / 2;
        const rightBoosterAttachX = this.x + this.boosterSeparation / 2;
        const boosterAttachY = this.y + this.boosterOffsetY;

        addPoints(leftBoosterAttachX, boosterAttachY, this.leftBoosterAngle);
        addPoints(rightBoosterAttachX, boosterAttachY, this.rightBoosterAngle);
        return points;
    },
    reset(startX, startY) {
        // Reset drone state (remains the same)
        this.x = startX;
        this.y = startY;
        this.vx = 0;
        this.vy = 0;
        this.leftBoosterAngle = 0;
        this.rightBoosterAngle = 0;
        this.thrusting = false;
        this.alive = true;
        this.score = 0;
        this.health = CONFIG.maxHealth;
        this.energy = CONFIG.maxEnergy;
        // Update dimensions based on current scale
        this.bodyWidth = scaledBodyWidth;
        this.bodyHeight = scaledBodyHeight;
        this.boosterWidth = scaledBoosterWidth;
        this.boosterHeight = scaledBoosterHeight;
        this.boosterSeparation = scaledBoosterSeparation;
        this.boosterOffsetY = scaledBoosterOffsetY;
        this.trail = [];
        if (!this.isManual) this.updateSensors(); // Update sensors on reset for AI/Playback
    },
};

// --- Instance Drone Manual ---
const manualDrone = {
    ...baseDrone,
    isManual: true,
    bodyColor: "#0d6efd", // Blue color for manual drone
    boosterColor: "#0a58ca",
};

// --- Fungsi Pembuat Rintangan --- (remains the same)
function createObstacle() {
    const size = scaledObstacleMinSize + Math.random() * (scaledObstacleMaxSize - scaledObstacleMinSize);
    let x, y, vx, vy;
    const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
    const speed = obstacleMinSpeed + Math.random() * (obstacleMaxSpeed - obstacleMinSpeed);

    switch (edge) {
        case 0: // From top
            x = Math.random() * canvas.width;
            y = -size;
            break;
        case 1: // From right
            x = canvas.width + size;
            y = Math.random() * canvas.height;
            break;
        case 2: // From bottom
            x = Math.random() * canvas.width;
            y = canvas.height + size;
            break;
        case 3: // From left
            x = -size;
            y = Math.random() * canvas.height;
            break;
    }

    // Target a point generally towards the center playing area
    const targetX = canvas.width / 2 + (Math.random() - 0.5) * (canvas.width * 0.6);
    const targetY = canvas.height / 3 + (Math.random() - 0.5) * (canvas.height * 0.4); // Target upper/middle area

    const dx = targetX - x;
    const dy = targetY - y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1; // Avoid division by zero

    vx = (dx / dist) * speed;
    vy = (dy / dist) * speed;

    // Asteroid shape generation
    const numPoints = 5 + Math.floor(Math.random() * 6); // 5 to 10 points
    const shapePoints = [];
    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const radius = (size / 2) * (0.7 + Math.random() * 0.6); // Random radius for jaggedness
        shapePoints.push({ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius });
    }


    return {
        x, y, vx, vy, size,
        color: `hsl(${Math.random() * 30 + 20}, 60%, ${40 + Math.random() * 20}%)`, // Brownish/Greyish hues
        shapePoints, // Store the points for drawing
        draw() {
            if (aiTrainingActive) return; // Don't draw obstacles during high-speed training
            ctx.fillStyle = this.color;
            ctx.beginPath();
            // Move to the first point (relative to obstacle center)
            ctx.moveTo(this.x + this.size / 2 + this.shapePoints[0].x, this.y + this.size / 2 + this.shapePoints[0].y);
            // Draw lines to subsequent points
            for (let i = 1; i < this.shapePoints.length; i++) {
                ctx.lineTo(this.x + this.size / 2 + this.shapePoints[i].x, this.y + this.size / 2 + this.shapePoints[i].y);
            }
            ctx.closePath(); // Close the shape
            ctx.fill();
        },
        update() {
            this.x += this.vx;
            this.y += this.vy;
        },
    };
}

// --- Fungsi Terkait Target --- (remains the same)
function initializeSpawnPoints() {
    potentialSpawnPoints = [];
    const paddingX = CONFIG.spawnPointPaddingRatio;
    const paddingY = CONFIG.spawnPointPaddingRatio;
    const numCols = 5; // Arrange in a grid-like fashion
    const numRows = Math.ceil(NUM_SPAWN_POINTS / numCols);

    for (let i = 0; i < NUM_SPAWN_POINTS; i++) {
        const col = i % numCols;
        const row = Math.floor(i / numCols);

        // Base position in grid
        let xRatio = paddingX + (1 - 2 * paddingX) * (col / (numCols - 1));
        let yRatio = paddingY + (1 - 2 * paddingY) * (row / (numRows > 1 ? numRows - 1 : 1)); // Avoid div by zero if 1 row

        // Add some jitter
        xRatio += (Math.random() - 0.5) * 0.05;
        yRatio += (Math.random() - 0.5) * 0.05;

        // Clamp to ensure within bounds
        xRatio = Math.max(paddingX, Math.min(1 - paddingX, xRatio));
        yRatio = Math.max(paddingY, Math.min(1 - paddingY, yRatio));

        potentialSpawnPoints.push({ xRatio, yRatio });
    }
    // Shuffle points for more randomness
    potentialSpawnPoints.sort(() => Math.random() - 0.5);
    console.log("Potential spawn points initialized:", potentialSpawnPoints.length);
}

function spawnTargets() {
    if (!CONFIG.targetSystemEnabled || gameScreen.classList.contains("hidden") || currentTargets.length >= NUM_TARGETS_TO_SPAWN) return;
    if (potentialSpawnPoints.length === 0) {
        initializeSpawnPoints();
        if (potentialSpawnPoints.length === 0) { console.error("Failed to initialize spawn points."); return; }
    }

    let availablePoints = [...potentialSpawnPoints];
    let spawnedCount = 0;
    const minTargetDistSq = (scaledTargetSize * 4) * (scaledTargetSize * 4); // Min distance between targets squared
    const minObstacleDistSq = (scaledTargetSize * 4) * (scaledTargetSize * 4); // Min distance from obstacles squared

    while (spawnedCount < NUM_TARGETS_TO_SPAWN - currentTargets.length && availablePoints.length > 0) {
        const randomIndex = Math.floor(Math.random() * availablePoints.length);
        const spawnRatio = availablePoints[randomIndex];
        const targetX = spawnRatio.xRatio * canvas.width;
        const targetY = spawnRatio.yRatio * canvas.height;

        // Check distance to existing targets
        let tooCloseToExisting = false;
        for (let existingTarget of currentTargets) {
            const dx = targetX - existingTarget.x;
            const dy = targetY - existingTarget.y;
            if (dx * dx + dy * dy < minTargetDistSq) {
                tooCloseToExisting = true;
                break;
            }
        }
        if (tooCloseToExisting) {
             availablePoints.splice(randomIndex, 1); // Remove point, try another
             continue;
        }

        // Check distance to obstacles
        let tooCloseToObstacle = false;
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
         if (tooCloseToObstacle) {
             availablePoints.splice(randomIndex, 1); // Remove point, try another
             continue;
        }


        // If checks pass, spawn the target
        const newTarget = {
            x: targetX,
            y: targetY,
            size: scaledTargetSize,
            color: CONFIG.targetColor,
            pulseOffset: Math.random() * Math.PI * 2, // For visual pulse effect
            lifetime: CONFIG.targetLifetimeSeconds * 1000, // Lifetime in ms
        };
        currentTargets.push(newTarget);
        spawnedCount++;
        availablePoints.splice(randomIndex, 1); // Remove used point
    }

    // Set cooldown for next spawn attempt
    targetSpawnCooldown = (spawnedCount > 0) ? CONFIG.targetSpawnIntervalSeconds * 1000 : 500; // Shorter cooldown if failed
}


function drawTargets() {
    if (!CONFIG.targetSystemEnabled) return;
    currentTargets.forEach(target => {
        const lifetimeRatio = Math.max(0, target.lifetime / (CONFIG.targetLifetimeSeconds * 1000));
        const baseAlpha = 0.6 + lifetimeRatio * 0.4; // Fade out as lifetime decreases
        const pulse = Math.sin(performance.now() / 300 + target.pulseOffset) * 0.1 + 1.0; // Pulsing size effect
        const currentSize = target.size * pulse;

        ctx.save();
        // Bloom effect
        ctx.shadowColor = CONFIG.targetBloomColor;
        ctx.shadowBlur = CONFIG.targetBloomSize * gameScale * pulse;
        ctx.globalAlpha = baseAlpha;

        // Target body
        ctx.fillStyle = target.color;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"; // White outline
        ctx.lineWidth = 1.5 * gameScale;

        ctx.beginPath();
        ctx.arc(target.x, target.y, currentSize / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke(); // Draw outline

        ctx.restore(); // Restore alpha and shadow settings
    });
}

function updateTargets(deltaTime) {
    if (!CONFIG.targetSystemEnabled) {
        currentTargets = []; // Clear targets if system disabled
        return;
    }

    // Update lifetime and remove expired targets
    for (let i = currentTargets.length - 1; i >= 0; i--) {
        const target = currentTargets[i];
        target.lifetime -= deltaTime * 1000; // Decrease lifetime in ms
        if (target.lifetime <= 0) {
            if (!aiTrainingActive) { // Only show effect if not training fast
                 createClaimEffect(target.x, target.y, "rgba(200, 200, 200, 0.7)"); // Missed target effect
            }
            currentTargets.splice(i, 1);
        }
    }

    // Check if new targets need to be spawned
    if (currentTargets.length < NUM_TARGETS_TO_SPAWN) {
        if (targetSpawnCooldown > 0) {
            targetSpawnCooldown -= deltaTime * 1000;
        } else {
            spawnTargets();
        }
    }
}


// --- Sistem Partikel --- (remains the same)
function createParticles(x, y, count, color, speedMultiplier = 1, lifespanMultiplier = 1) {
    // Optimization: Don't create non-essential particles during high-speed training
    if (aiTrainingActive && simulationSpeed > 2 && color !== "grey" && color !== "white") return;

    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 2 + 1) * speedMultiplier * gameScale;
        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: (Math.random() * 2 + 1) * gameScale,
            life: (Math.random() * 0.5 + 0.5) * lifespanMultiplier, // Lifespan in seconds
            maxLife: (Math.random() * 0.5 + 0.5) * lifespanMultiplier,
            color: color,
            gravity: 0.05 * gameScale, // Slight gravity effect
        });
    }
}
function createClaimEffect(x, y, color = CONFIG.targetColor) {
     if (aiTrainingActive && simulationSpeed > 2) return; // Skip during fast training
    createParticles(x, y, 15, color, 1.5, 0.8);
    createParticles(x, y, 10, "white", 1.0, 0.6);
}
function createDestructionEffect(x, y) {
     if (aiTrainingActive && simulationSpeed > 2) return; // Skip during fast training
    createParticles(x, y, 30, "orange", 2.5, 1.2);
    createParticles(x, y, 20, "red", 1.8, 1.0);
    createParticles(x, y, 15, "#555", 1.0, 1.5); // Debris
}
function createBoosterImpactEffect(x, y) {
     if (aiTrainingActive && simulationSpeed > 2) return; // Skip during fast training
    createParticles(x, y, 5, "grey", 1.2, 0.5); // Sparks
    createParticles(x, y, 3, "white", 0.8, 0.4);
}
function updateParticles(deltaTime) {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= deltaTime;
        if (p.life <= 0) {
            particles.splice(i, 1); // Remove dead particle
        } else {
            p.vy += p.gravity; // Apply gravity
            // Update position based on velocity and deltaTime
            // Multiply by 60 to somewhat normalize speed regardless of frame rate fluctuations
            p.x += p.vx * deltaTime * 60;
            p.y += p.vy * deltaTime * 60;
        }
    }
}
function drawParticles() {
    if (aiTrainingActive && simulationSpeed > 2) return; // Skip drawing during fast training
    particles.forEach(p => {
        ctx.save();
        // Fade out particle as life decreases
        ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });
}

// --- Penanganan Input --- (remains the same)
const keysPressed = {};
window.addEventListener('keydown', (e) => {
    if (!welcomeScreen.classList.contains('hidden')) return; // Ignore input on welcome screen

    const key = e.key.toLowerCase();
    keysPressed[key] = true;

    // Hotkeys for game actions
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
        // Prevent page scrolling only if not focused on an input/textarea
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
             // Allow default if AI or playback is active (unless manual drone is somehow active)
            if ((!aiTrainingActive && !playbackModeActive) || manualDrone.isManual) {
                 e.preventDefault();
            }
        }
    }
});
window.addEventListener('keyup', (e) => {
    if (!welcomeScreen.classList.contains('hidden')) return;
    keysPressed[e.key.toLowerCase()] = false;
});
function getManualInput() {
    return {
        left: keysPressed['a'] || keysPressed['arrowleft'],
        right: keysPressed['d'] || keysPressed['arrowright'],
        thrust: keysPressed['w'] || keysPressed['arrowup'] || keysPressed[' '],
    };
}

// --- Fungsi Update UI --- (remains the same)
function updateButtonStates() {
    if (gameScreen.classList.contains('hidden')) return; // Don't update if game screen not visible

    const modelExists = !!bestGenomeEver;

    // Reset Button
    resetButton.disabled = aiTrainingActive || playbackModeActive;

    // AI Start/Stop Buttons & Speed Slider
    if (aiTrainingActive) {
        startAiButton.classList.add('hidden');
        stopAiButton.classList.remove('hidden');
        trainingSpeedSlider.disabled = false; // Enable speed change during training
    } else {
        startAiButton.classList.remove('hidden');
        stopAiButton.classList.add('hidden');
        startAiButton.disabled = playbackModeActive; // Disable start if playback active
        trainingSpeedSlider.disabled = playbackModeActive; // Disable speed if playback active
    }

    // Playback Button
    playBestAiButton.disabled = aiTrainingActive || playbackModeActive || !modelExists; // Disable if training, playing, or no model
    if (playbackModeActive) {
        playBestAiButton.textContent = "Stop Playback [P]";
        playBestAiButton.classList.remove('bg-cyan-600', 'hover:bg-cyan-700');
        playBestAiButton.classList.add('bg-red-600', 'hover:bg-red-700');
    } else {
        playBestAiButton.textContent = "Playback AI [P]";
        playBestAiButton.classList.remove('bg-red-600', 'hover:bg-red-700');
        playBestAiButton.classList.add('bg-cyan-600', 'hover:bg-cyan-700');
        // Add disabled styling if no model exists
        if (!modelExists || aiTrainingActive) {
             playBestAiButton.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
             playBestAiButton.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }


    // Save Model & View Network Buttons
    saveModelButton.disabled = !modelExists;
    viewNetworkButton.disabled = !modelExists;
    if (!modelExists) {
        saveModelButton.classList.add('opacity-50', 'cursor-not-allowed');
        viewNetworkButton.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        saveModelButton.classList.remove('opacity-50', 'cursor-not-allowed');
        viewNetworkButton.classList.remove('opacity-50', 'cursor-not-allowed');
    }

    // Import Model Button
    importFile.disabled = aiTrainingActive || playbackModeActive;
    importFileLabel.classList.toggle('disabled', importFile.disabled); // Use a class for styling label
    importFileLabel.classList.toggle('opacity-50', importFile.disabled);
    importFileLabel.classList.toggle('cursor-not-allowed', importFile.disabled);


    // Other Controls (disable during AI/Playback)
    const disableDuringRun = aiTrainingActive || playbackModeActive;
    populationSizeSlider.disabled = disableDuringRun;
    gameScaleSelect.disabled = disableDuringRun;
    obstacleMinSpeedSlider.disabled = disableDuringRun;
    obstacleMaxSpeedSlider.disabled = disableDuringRun;
    obstacleSpawnIntervalSlider.disabled = disableDuringRun;
    obstacleMinSizeSlider.disabled = disableDuringRun;
    obstacleMaxSizeSlider.disabled = disableDuringRun;
    obstacleToggle.disabled = disableDuringRun;
    clearObstaclesButton.disabled = disableDuringRun;

}
function updateSavedModelStatus() {
     if (gameScreen.classList.contains('hidden')) return;
    if (bestGenomeEver && bestGenomeEver.score !== undefined) {
        savedModelStatus.textContent = `Terbaik Skor: ${bestGenomeEver.score.toFixed(0)}`;
        savedModelStatus.classList.remove('text-gray-400');
        savedModelStatus.classList.add('text-green-400'); // Green for loaded model
    } else {
        savedModelStatus.textContent = "Belum ada";
        savedModelStatus.classList.add('text-gray-400');
        savedModelStatus.classList.remove('text-green-400');
    }
    updateButtonStates(); // Update buttons whenever model status changes
}

// --- Logika Pergantian Mode ---
function stopAllModes(clearDrones = true) {
    stopAllBoosterSounds(); // <-- Hentikan semua suara booster
    aiTrainingActive = false;
    playbackModeActive = false;
    manualDrone.isTraining = false; // Ensure manual drone isn't marked as training

    if (clearDrones) {
        aiDrones = [];
        playbackDrone = null;
        if (activeDrones) activeDrones.textContent = 0; // Update UI counter
    } else {
        // Keep drones but mark them as not training (e.g., when stopping playback)
        aiDrones.forEach(d => d.isTraining = false);
        if (playbackDrone) playbackDrone.isTraining = false;
    }


    // Hide AI/Playback specific UI elements
    if (aiScoreDisplay) aiScoreDisplay.classList.add('hidden');
    if (playbackScoreDisplay) playbackScoreDisplay.classList.add('hidden');
    if (scoreDisplay) scoreDisplay.classList.remove('hidden'); // Show manual score

    // Stop the game loop ONLY if nothing else will restart it immediately
    // if (animationFrameId) {
    //     cancelAnimationFrame(animationFrameId);
    //     animationFrameId = null;
    // }

    updateButtonStates();
}
function switchToManualMode() {
    if (gameScreen.classList.contains('hidden')) return;
    stopAllModes(); // Stop AI/Playback, clear drones
    gameRunning = true; // Manual game is now running
    currentMode.textContent = "Manual";
    messageBox.textContent = "Mode Manual Aktif. Gunakan W/A/D/Spasi atau Panah.";
    resetManualGame(); // Reset obstacles, score, drone position
    updateButtonStates();

    // Ensure game loop is running
    if (!animationFrameId) {
        lastTimestamp = performance.now();
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}

// --- Fungsi Audio Engine ---

// Fungsi untuk memeriksa apakah suara boleh dimainkan berdasarkan kondisi performa
function canPlaySound() {
    if (!isAudioInitialized || !audioCtx || audioCtx.state === 'suspended') {
         // Coba resume jika suspended (misal karena tab tidak aktif lalu aktif lagi)
         if(audioCtx && audioCtx.state === 'suspended') {
             audioCtx.resume().then(() => {
                 console.log("AudioContext resumed.");
                 isAudioInitialized = true; // Pastikan status benar
             }).catch(e => console.error("Failed to resume AudioContext:", e));
         }
        return false; // Jangan mainkan jika belum init atau suspended
    }

    // Jika tidak sedang training AI, selalu boleh mainkan suara
    if (!aiTrainingActive) {
        return true;
    }

    // Jika sedang training AI, cek kondisi:
    // Hitung drone AI yang aktif
    const activeAiDroneCount = aiDrones.filter(d => d.alive).length;
    const isTrainingFast = simulationSpeed > 2;
    const tooManyDrones = activeAiDroneCount > 10;

    // Jangan mainkan suara jika drone > 10 DAN training > 2x
    if (tooManyDrones && isTrainingFast) {
        // Pastikan semua suara booster berhenti jika kondisi ini terpenuhi
        stopAllBoosterSounds();
        return false;
    }

    return true; // Boleh mainkan suara dalam kondisi lain
}

// Fungsi untuk membuat suara booster yang berkelanjutan
function playBoosterSound(drone) {
    if (!canPlaySound() || activeBoosterSounds.has(drone)) return; // Sudah ada atau tidak boleh main

    const now = audioCtx.currentTime;

    // Oscillator utama (suara dasar)
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(60, now); // Frekuensi dasar rendah

    // LFO untuk modulasi frekuensi (efek getaran)
    const lfo = audioCtx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(8, now); // Frekuensi LFO
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(10, now); // Kedalaman modulasi
    lfo.connect(lfoGain);
    lfoGain.connect(oscillator.frequency); // Modulasi frekuensi oscillator utama

    // Node Gain untuk kontrol volume & fade in/out
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0, now); // Mulai dari 0
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.1); // Fade in cepat (volume maks 0.15)

    // Filter untuk membentuk suara
    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(400, now); // Cutoff frekuensi rendah

    // Hubungkan node: osc -> filter -> gain -> destination
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Mulai oscillator
    oscillator.start(now);
    lfo.start(now);

    // Simpan referensi node untuk drone ini
    activeBoosterSounds.set(drone, { oscillator, lfo, gainNode, filter });
    // console.log("Booster sound started for a drone");
}

// Fungsi untuk menghentikan suara booster
function stopBoosterSound(drone) {
    if (!isAudioInitialized || !activeBoosterSounds.has(drone)) return;

    const soundNodes = activeBoosterSounds.get(drone);
    const now = audioCtx.currentTime;

    // Fade out gain
    soundNodes.gainNode.gain.cancelScheduledValues(now);
    soundNodes.gainNode.gain.setValueAtTime(soundNodes.gainNode.gain.value, now); // Mulai dari nilai saat ini
    soundNodes.gainNode.gain.linearRampToValueAtTime(0, now + 0.2); // Fade out

    // Jadwalkan stop untuk oscillator setelah fade out selesai
    soundNodes.oscillator.stop(now + 0.25);
    soundNodes.lfo.stop(now + 0.25);

    // Hapus dari map setelah dijadwalkan berhenti
    activeBoosterSounds.delete(drone);

    // Cleanup koneksi setelah berhenti (opsional, browser modern bisa handle)
    setTimeout(() => {
        try {
            soundNodes.gainNode.disconnect();
            soundNodes.filter.disconnect();
            soundNodes.oscillator.disconnect();
            soundNodes.lfo.disconnect();
        } catch(e) {/* Mungkin sudah disconnect */}
    }, 300); // Tunggu sedikit lebih lama dari stop
     // console.log("Booster sound stopped for a drone");
}

// Fungsi untuk menghentikan SEMUA suara booster (misal saat kondisi performa berubah)
function stopAllBoosterSounds() {
    if (!isAudioInitialized) return;
    activeBoosterSounds.forEach((nodes, drone) => {
        stopBoosterSound(drone);
    });
    activeBoosterSounds.clear(); // Pastikan map kosong
}

// Fungsi untuk memainkan suara one-shot (tabrakan, target, dll)
function playSoundEffect(type, intensity = 1.0) {
    if (!canPlaySound()) return;

    const now = audioCtx.currentTime;
    let oscType = 'sine';
    let baseFreq = 440;
    let duration = 0.1;
    let volume = 0.2 * intensity;
    let freqEnvelope = false;
    let useNoise = false;
    let filterType = 'lowpass';
    let filterFreq = 20000; // Default tanpa filter
    let filterQ = 1;

    switch (type) {
        case 'wall_hit':
            oscType = 'square';
            baseFreq = 80;
            duration = 0.15;
            volume = 0.15 * Math.min(1, intensity * 1.5); // Volume berdasarkan intensitas benturan
            freqEnvelope = true; // Efek pitch drop
            filterType = 'lowpass';
            filterFreq = 500 + 500 * intensity; // Filter lebih rendah untuk benturan keras
            break;
        case 'booster_hit':
            oscType = 'triangle';
            baseFreq = 150;
            duration = 0.1;
            volume = 0.1 * intensity;
            freqEnvelope = true;
            filterType = 'lowpass';
            filterFreq = 800;
            break;
        case 'obstacle_hit':
            useNoise = true; // Gunakan noise untuk efek "krak"
            duration = 0.2 * Math.min(1.5, intensity); // Durasi berdasarkan intensitas
            volume = 0.25 * Math.min(1, intensity);
            filterType = 'bandpass'; // Filter noise
            filterFreq = 1000 + 500 * (Math.random() - 0.5); // Variasi frekuensi filter
            filterQ = 5 + intensity * 5; // Q lebih tinggi untuk benturan keras
            break;
        case 'target_collect':
            oscType = 'sine';
            baseFreq = 880; // Nada lebih tinggi
            duration = 0.15;
            volume = 0.18;
            freqEnvelope = true; // Sedikit pitch bend naik
             filterFreq = 5000;
            break;
        case 'destruction':
            useNoise = true;
            duration = 0.5; // Lebih lama
            volume = 0.35;
            filterType = 'lowpass';
            filterFreq = 600; // Frekuensi rendah untuk ledakan
             // Tambah ledakan frek rendah
             const lowBoom = audioCtx.createOscillator();
             lowBoom.type = 'sine';
             lowBoom.frequency.setValueAtTime(50, now);
             lowBoom.frequency.exponentialRampToValueAtTime(30, now + 0.4);
             const boomGain = audioCtx.createGain();
             boomGain.gain.setValueAtTime(0.4, now);
             boomGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
             lowBoom.connect(boomGain).connect(audioCtx.destination);
             lowBoom.start(now);
             lowBoom.stop(now + 0.5);
            break;
        default:
            return; // Tipe tidak dikenal
    }

    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume, now + 0.01); // Attack cepat
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration); // Decay

    const filterNode = audioCtx.createBiquadFilter();
    filterNode.type = filterType;
    filterNode.frequency.setValueAtTime(filterFreq, now);
    filterNode.Q.setValueAtTime(filterQ, now);

    gainNode.connect(filterNode);
    filterNode.connect(audioCtx.destination);

    let sourceNode;
    if (useNoise) {
        // Buat white noise menggunakan buffer
        const bufferSize = audioCtx.sampleRate * duration * 1.2; // Sedikit lebih panjang dari durasi
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1; // Noise antara -1 dan 1
        }
        sourceNode = audioCtx.createBufferSource();
        sourceNode.buffer = noiseBuffer;
        sourceNode.loop = false;
    } else {
        sourceNode = audioCtx.createOscillator();
        sourceNode.type = oscType;
        sourceNode.frequency.setValueAtTime(baseFreq, now);
        if (freqEnvelope) {
            if (type === 'target_collect') {
                 sourceNode.frequency.linearRampToValueAtTime(baseFreq * 1.2, now + duration * 0.5); // Pitch naik
                 sourceNode.frequency.linearRampToValueAtTime(baseFreq, now + duration);
            } else {
                sourceNode.frequency.exponentialRampToValueAtTime(baseFreq * 0.5, now + duration * 0.8); // Pitch turun
            }
        }
    }

    sourceNode.connect(gainNode);
    sourceNode.start(now);
    sourceNode.stop(now + duration + 0.05); // Stop sedikit setelah gain mencapai nol

    // Cleanup
     setTimeout(() => {
         try {
            gainNode.disconnect();
            filterNode.disconnect();
            sourceNode.disconnect();
         } catch(e) {/* Mungkin sudah disconnect */}
    }, (duration + 0.1) * 1000);
}

// --- End Fungsi Audio Engine ---


// --- Fungsi AI / NEAT ---
function initializeNeat(importedGenome = null) {
    const numInputs = 17; // Jumlah input sesuai sensor: distBottom, distL, distR, velX, velY, obsFwd, obsL, obsR, obsFL, obsFR, obsDown, health, energy, targetX, targetY, lBoosterAng, rBoosterAng
    const numOutputs = 2; // Output: thrust (0-1), rotation (-1 to 1 via mapping)

    // Get selected mutation methods from checkboxes
    const selectedMethods = [];
    const checkboxes = mutationMethodsContainer.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        if (cb.checked && methods.mutation[cb.value]) {
            selectedMethods.push(methods.mutation[cb.value]);
        }
    });
    // Ensure at least one method is selected
    if (selectedMethods.length === 0) {
        console.warn("No mutation methods selected, using default MOD_WEIGHT.");
        selectedMethods.push(methods.mutation.MOD_WEIGHT);
        // Optionally check the MOD_WEIGHT checkbox visually
        const modWeightCheckbox = document.getElementById('configMethod_MOD_WEIGHT');
        if (modWeightCheckbox) modWeightCheckbox.checked = true;
    }


    neat = new Neat(
        numInputs,
        numOutputs,
        null, // Use population fitness function later (implicitly handled by genome.score)
        {
            population: populationCount,
            elitism: Math.round(Math.max(1, (CONFIG.elitismPercent / 100) * populationCount)), // Ensure at least 1 elite
            mutationRate: CONFIG.mutationRate,
            mutationAmount: CONFIG.mutationAmount,
            mutation: selectedMethods,
            network: importedGenome ? undefined : architect.Random(numInputs, Math.ceil(numInputs / 1.5), numOutputs) // Start with random if no import
        }
    );

    // If importing, replace random population with mutated versions of the import
    if (importedGenome) {
        neat.population = [];
        for (let i = 0; i < populationCount; i++) {
            // Create a fresh copy from the imported JSON structure
            let newGenome = neataptic.Network.fromJSON(importedGenome.toJSON());
            // Mutate slightly if it's not the very first one (to introduce variety)
            if (i > 0) {
                 newGenome.mutate(selectedMethods); // Use the selected methods for initial mutation too
            }
            newGenome.score = 0; // Reset score for the new generation
            neat.population.push(newGenome);
        }
        console.log(`NEAT initialized with imported genome (Pop: ${populationCount})`);
    } else {
        console.log(`NEAT initialized randomly (Inputs: ${numInputs}, Pop: ${populationCount})`);
    }

    // Reset generation stats
    generation = 0;
    highestFitness = 0;
    averageFitness = 0;
    if (!importedGenome) { // Only clear best ever if starting fresh
        bestGenomeEver = null;
    }
    updateSavedModelStatus(); // Update UI based on whether a model is loaded

    // Update UI display
    generationCount.textContent = generation;
    bestFitness.textContent = highestFitness.toFixed(0);
    avgFitness.textContent = averageFitness.toFixed(0);
}

function createAiDrones() {
    aiDrones = [];
    if (!neat || !neat.population) {
         console.error("NEAT population not ready for creating AI drones.");
         return;
    }

    for (let i = 0; i < neat.population.length; i++) {
        const drone = { ...baseDrone }; // Create drone from base object
        drone.isManual = false;
        drone.isTraining = true; // Mark as training drone
        // Assign a unique-ish color based on index for visualization
        drone.bodyColor = `hsl(${200 + ((i * 7) % 160)}, 70%, 60%)`;
        drone.boosterColor = `hsl(${200 + ((i * 7) % 160)}, 70%, 40%)`;
        drone.genome = neat.population[i]; // Assign genome from NEAT population
        drone.genome.score = 0; // Ensure score starts at 0 for this run
        drone.reset(canvas.width / 2, canvas.height / 3); // Reset position, health, etc.
        aiDrones.push(drone);
    }
    activeDrones.textContent = aiDrones.length; // Update UI counter
    console.log(`Gen ${generation}: Created ${aiDrones.length} AI drones.`);
}

function runAiGeneration() {
    if (!aiTrainingActive) return;

    let stillAliveCount = 0;
    aiDrones.forEach(drone => {
        if (drone.alive) {
            stillAliveCount++;

            // Prepare inputs (ensure order matches initializeNeat)
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
                drone.sensors.leftBoosterAngleNorm,
                drone.sensors.rightBoosterAngleNorm,
            ];

            // Activate genome network
            const output = drone.genome.activate(inputs);

            // Map output to drone controls
            const aiInput = { thrust: output[0], rotation: output[1] };

            // Update drone physics and state
            drone.update(aiInput);

            // Check for target collection by this drone
            for (let i = currentTargets.length - 1; i >= 0; i--) {
                const target = currentTargets[i];
                const dx = target.x - drone.x;
                const dy = target.y - drone.y;
                const distSq = dx * dx + dy * dy;
                const collisionDist = drone.bodyWidth / 2 + target.size / 2; // Radius based collision

                if (distSq < collisionDist * collisionDist) {
                    // --- Target Collected ---
                     // Bonus energy and health
                    drone.energy = Math.min(CONFIG.maxEnergy, drone.energy + CONFIG.maxEnergy * 0.3);
                    drone.health = Math.min(CONFIG.maxHealth, drone.health + CONFIG.maxHealth * 0.2);

                    // Increase max stats slightly (up to a limit)
                    // CONFIG.maxEnergy = Math.min(1000, CONFIG.maxEnergy * 1.01); // Capped increase
                    // CONFIG.maxHealth = Math.min(1000, CONFIG.maxHealth * 1.005); // Capped increase


                    drone.score += CONFIG.targetCollectReward; // Add score reward
                    playSoundEffect('target_collect'); // <-- Play sound
                    currentTargets.splice(i, 1); // Remove target

                    // Don't create visual effect during high-speed training
                    // if (!aiTrainingActive || simulationSpeed <= 2) {
                    //    createClaimEffect(target.x, target.y);
                    // }
                    break; // Drone can only collect one target per frame
                }
            }

        } else {
            // If drone died previously, ensure its score is recorded in the genome
            if (drone.genome && (drone.genome.score === 0 || drone.genome.score === undefined) && drone.score !== 0) {
                drone.genome.score = Math.max(0, drone.score); // Assign final score, ensure non-negative
            } else if (drone.genome && drone.genome.score === undefined) {
                 drone.genome.score = 0; // Ensure score is defined if drone died instantly
            }
        }
    });

    activeDrones.textContent = stillAliveCount; // Update UI

    // Check if generation is over (all drones dead)
    if (stillAliveCount === 0 && aiTrainingActive) {
        try {
            // Final score assignment for any drones that were still alive somehow
             aiDrones.forEach(drone => {
                if (drone.genome) {
                    if(drone.alive) { // Should not happen if stillAliveCount is 0, but safety check
                         drone.genome.score = Math.max(0, drone.score);
                    } else if (drone.genome.score === undefined) {
                         drone.genome.score = 0;
                    }
                }
            });

            evolvePopulation(); // Create the next generation
            resetObstacles(); // Clear obstacles for the new generation
            currentTargets = []; // Clear targets
            targetSpawnCooldown = 0; // Reset target spawn timer
            particles = []; // Clear visual particles
            createAiDrones(); // Create drone instances for the new population
        } catch (error) {
            console.error("Error during AI evolution/reset:", error);
            stopAiTraining(); // Stop training if evolution fails
            messageBox.textContent = "Error during AI evolution. Training stopped.";
        }
    }
}

function evolvePopulation() {
    if (!neat || !neat.population || neat.population.length === 0) {
        console.warn("Attempted to evolve population, but NEAT population is missing or empty.");
        return;
    }
    console.log(`Gen ${generation} finished. Evaluating scores...`);

    // Ensure all genomes have a valid score before sorting
    neat.population.forEach(genome => {
        if (genome.score === undefined || isNaN(genome.score)) {
            genome.score = 0; // Assign 0 if score is invalid/missing
             console.warn("Genome with invalid score found during evolution, setting to 0.");
        }
    });

    // Sort population by score (descending)
    neat.sort();

    // Get best of current generation and overall stats
    const currentBestGenome = neat.getFittest();
    highestFitness = currentBestGenome.score;
    averageFitness = neat.getAverage();

    console.log(`Gen ${generation} - Best Score: ${highestFitness.toFixed(0)}, Avg Score: ${averageFitness.toFixed(2)}`);

    // Update the best genome ever found
    if (!bestGenomeEver || highestFitness > bestGenomeEver.score) {
        // Create a clean copy of the best genome's network structure and score
        bestGenomeEver = neataptic.Network.fromJSON(currentBestGenome.toJSON());
        bestGenomeEver.score = highestFitness; // Store the score with the copy
        updateSavedModelStatus(); // Update UI about the new best model
        console.log(`--- New Best Genome Found! Score: ${highestFitness.toFixed(0)} ---`);
    }

    // Update UI Stats
    bestFitness.textContent = highestFitness.toFixed(0);
    avgFitness.textContent = averageFitness.toFixed(2);
    if (aiScoreDisplay) {
        aiScoreDisplay.textContent = `Skor AI Terbaik: ${bestGenomeEver ? bestGenomeEver.score.toFixed(0) : "0"}`;
    }


    // --- Create Next Generation ---
    const newPopulation = [];

    // Elitism: Carry over the top N genomes directly
    const elitismCount = Math.min(
        neat.population.length,
        Math.max(1, neat.elitism) // Use elitism count from NEAT config
    );
    for (let i = 0; i < elitismCount; i++) {
        newPopulation.push(neat.population[i]);
    }

    // Offspring: Fill the rest of the population with offspring
    for (let i = 0; i < neat.population.length - elitismCount; i++) {
        newPopulation.push(neat.getOffspring()); // NEAT handles selection (e.g., tournament) internally
    }

    // Replace old population with the new one
    neat.population = newPopulation;

    // Mutate the new population (excluding elites, NEAT handles this)
    neat.mutate();

    // Reset scores for the new population before the next run
    neat.population.forEach(genome => { genome.score = 0; });

    generation++;
    generationCount.textContent = generation; // Update UI
    console.log(`Evolved to Gen ${generation}. Population size: ${neat.population.length}`);
}

function startAiTraining() {
    if (aiTrainingActive || playbackModeActive) return; // Prevent starting if already running

    stopAllModes(false); // Stop other modes, but keep potential bestGenomeEver
    aiTrainingActive = true;
    gameRunning = false; // Not manual game running
    messageBox.textContent = "AI Training Dimulai...";
    currentMode.textContent = "AI Training";

    // Show AI Score display
    if (aiScoreDisplay) aiScoreDisplay.classList.remove('hidden');
    if (scoreDisplay) scoreDisplay.classList.add('hidden');
    if (playbackScoreDisplay) playbackScoreDisplay.classList.add('hidden');


    // Get current settings from UI
    populationCount = parseInt(populationSizeSlider.value);
    simulationSpeed = parseInt(trainingSpeedSlider.value);

    // Initialize NEAT (potentially using the existing best model)
    initializeNeat(bestGenomeEver);

    // Reset game elements for the first generation
    resetObstacles();
    currentTargets = [];
    targetSpawnCooldown = 0;
    particles = [];
    createAiDrones(); // Create the initial population of drones

    // Timing setup
    startTime = performance.now();
    lastTimestamp = startTime;

    updateButtonStates(); // Update UI buttons

    // Start the game loop if not already running
    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}

function stopAiTraining() {
    if (!aiTrainingActive) return;

    stopAllModes(); // Stop AI, clear drones
    messageBox.textContent = "AI Dihentikan. Mode Manual.";
    currentMode.textContent = "Manual";
    displayGameOver(); // Show game over screen (even if no manual game was played)
    updateButtonStates();
    // Game loop might continue if resetManualGame starts it, or stop if nothing else runs
}

// --- Fungsi Mode Playback ---
function togglePlaybackMode() {
    if (aiTrainingActive) {
        // If training is active, stop it first
        stopAiTraining();
        messageBox.textContent = "Training dihentikan. Tekan [P] lagi untuk mulai playback.";
        updateButtonStates();
        return;
    }

    playbackModeActive = !playbackModeActive; // Toggle state

    if (playbackModeActive) {
        // --- Start Playback ---
        if (!bestGenomeEver) {
            messageBox.textContent = "Tidak ada model AI terbaik. Latih AI dulu.";
            playbackModeActive = false; // Can't start playback
            updateButtonStates();
            return;
        }

        stopAllModes(false); // Stop manual mode, keep bestGenomeEver
        playbackModeActive = true; // Set state explicitly
        gameRunning = false;
        messageBox.textContent = "Memulai Playback AI Terbaik...";
        currentMode.textContent = "Playback AI";

        // Show Playback Score display
        if (playbackScoreDisplay) playbackScoreDisplay.classList.remove('hidden');
        if (scoreDisplay) scoreDisplay.classList.add('hidden');
        if (aiScoreDisplay) aiScoreDisplay.classList.add('hidden');


        // Create the playback drone instance
        playbackDrone = { ...baseDrone };
        playbackDrone.isPlayback = true;
        playbackDrone.isTraining = false; // Not training
        playbackDrone.bodyColor = "#facc15"; // Yellow color for playback drone
        playbackDrone.boosterColor = "#eab308";
        playbackDrone.genome = bestGenomeEver; // Assign the best genome
        playbackDrone.reset(canvas.width / 2, canvas.height / 3); // Reset state

        playbackScore = 0; // Reset playback score counter
        if (playbackScoreDisplay) playbackScoreDisplay.textContent = `Skor Playback: 0`;

        // Reset game elements
        resetObstacles();
        currentTargets = [];
        targetSpawnCooldown = 0;
        particles = [];

        // Timing setup
        startTime = performance.now();
        lastTimestamp = startTime;

    } else {
        // --- Stop Playback ---
        stopAllModes(); // Stop playback, clear drone
        messageBox.textContent = "Playback Dihentikan. Mode Manual.";
        currentMode.textContent = "Manual";
        displayGameOver(); // Show game over screen
    }

    updateButtonStates(); // Update UI buttons based on new state

    // Start game loop if not running
    if (!animationFrameId) {
        lastTimestamp = performance.now();
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}

function runPlayback() {
    if (!playbackModeActive || !playbackDrone) return;

    // Check if playback drone died
    if (!playbackDrone.alive) {
        if (playbackModeActive) { // Ensure we only stop once
            const finalScore = playbackScore; // Capture score before reset
            stopAllModes(); // Stop playback mode
            messageBox.textContent = `Playback Selesai. Skor: ${finalScore}. Mode Manual.`;
            currentMode.textContent = "Manual";
            displayGameOver();
            updateButtonStates();
        }
        return; // Stop further updates for this frame
    }

    // Prepare inputs for the best genome's network (ensure order matches training)
    const inputs = [
        playbackDrone.sensors.distBottom,
        playbackDrone.sensors.distLeftWall,
        playbackDrone.sensors.distRightWall,
        playbackDrone.sensors.velX,
        playbackDrone.sensors.velY,
        playbackDrone.sensors.obsDistForward,
        playbackDrone.sensors.obsDistLeft,
        playbackDrone.sensors.obsDistRight,
        playbackDrone.sensors.obsDistFwdLeft,
        playbackDrone.sensors.obsDistFwdRight,
        playbackDrone.sensors.obsDistDown,
        playbackDrone.sensors.currentHealth,
        playbackDrone.sensors.currentEnergy,
        playbackDrone.sensors.targetDirX,
        playbackDrone.sensors.targetDirY,
        playbackDrone.sensors.leftBoosterAngleNorm,
        playbackDrone.sensors.rightBoosterAngleNorm,
    ];

    // Activate the network
    const output = playbackDrone.genome.activate(inputs);

    // Map output to controls
    const aiInput = { thrust: output[0], rotation: output[1] };

    // Update the playback drone's state
    playbackDrone.update(aiInput);

    // Check for target collection during playback
     for (let i = currentTargets.length - 1; i >= 0; i--) {
        const target = currentTargets[i];
        const dx = target.x - playbackDrone.x;
        const dy = target.y - playbackDrone.y;
        const distSq = dx * dx + dy * dy;
        const collisionDist = playbackDrone.bodyWidth / 2 + target.size / 2;

        if (distSq < collisionDist * collisionDist) {
             // --- Target Collected ---
             // Apply same bonuses as in training for consistency (optional)
            playbackDrone.energy = Math.min(CONFIG.maxEnergy, playbackDrone.energy + CONFIG.maxEnergy * 0.3);
            playbackDrone.health = Math.min(CONFIG.maxHealth, playbackDrone.health + CONFIG.maxHealth * 0.2);
            // CONFIG.maxEnergy = Math.min(1000, CONFIG.maxEnergy * 1.01);
            // CONFIG.maxHealth = Math.min(1000, CONFIG.maxHealth * 1.005);

            playbackDrone.score += CONFIG.targetCollectReward; // Use score property for consistency
            playSoundEffect('target_collect'); // <-- Play sound
            createClaimEffect(target.x, target.y); // Show visual effect
            currentTargets.splice(i, 1); // Remove target
            break;
        }
    }


    // Update playback score display (using the drone's internal score)
    playbackScore = Math.max(0, Math.floor(playbackDrone.score)); // Use internal score
    if (playbackScoreDisplay) playbackScoreDisplay.textContent = `Skor Playback: ${playbackScore}`;
}

// --- Loop Utama Game ---
function gameLoop(currentTime) {
    if (!lastTimestamp) lastTimestamp = currentTime;
    const deltaTime = (currentTime - lastTimestamp) / 1000; // Delta time in seconds
    lastTimestamp = currentTime;

    // Only run updates if the game screen is visible
    if (!gameScreen.classList.contains('hidden')) {

        if (!startTime) startTime = currentTime; // Initialize start time if needed

        // Determine simulation speed (1x for manual/playback, variable for AI)
        const currentSimSpeed = aiTrainingActive ? simulationSpeed : 1;
        const effectiveDeltaTime = Math.min(0.05, deltaTime); // Clamp delta time to prevent large jumps

        // Run simulation steps based on speed
        for (let i = 0; i < currentSimSpeed; i++) {
             // Calculate delta time for this sub-step
             const subStepDeltaTime = effectiveDeltaTime / currentSimSpeed;

             // Update game elements
             updateTargets(subStepDeltaTime);
             updateParticles(subStepDeltaTime);

             // Obstacle Spawning & Updating
             obstacleSpawnTimer += subStepDeltaTime * 60; // Increment timer (approx frames)
             const currentSpawnIntervalFrames = obstacleSpawnInterval; // Interval is in frames
              if (obstaclesEnabled && obstacleSpawnTimer >= currentSpawnIntervalFrames) {
                 obstacles.push(createObstacle());
                 obstacleSpawnTimer = 0; // Reset timer
             }
             obstacles.forEach((obs, index) => {
                 obs.update();
                 // Remove obstacles far off-screen
                 const margin = obs.size * 3;
                 if (obs.x < -margin || obs.x > canvas.width + margin ||
                     obs.y < -margin || obs.y > canvas.height + margin) {
                     obstacles.splice(index, 1);
                 }
             });


             // Run the appropriate mode logic
             if (aiTrainingActive) {
                 runAiGeneration();
             } else if (playbackModeActive) {
                 runPlayback();
             } else { // Manual Mode
                if (gameRunning && manualDrone.alive) { // Only update if game is running and drone alive
                    const manualInput = getManualInput();
                    manualDrone.update(manualInput);

                    // Check for target collection by manual drone
                    for (let i = currentTargets.length - 1; i >= 0; i--) {
                        const target = currentTargets[i];
                        const dx = target.x - manualDrone.x;
                        const dy = target.y - manualDrone.y;
                        const distSq = dx * dx + dy * dy;
                        const collisionDist = manualDrone.bodyWidth / 2 + target.size / 2;

                        if (distSq < collisionDist * collisionDist) {
                            // --- Target Collected (Manual) ---
                            manualDrone.energy = Math.min(CONFIG.maxEnergy, manualDrone.energy + CONFIG.maxEnergy * 0.3);
                            manualDrone.health = Math.min(CONFIG.maxHealth, manualDrone.health + CONFIG.maxHealth * 0.2);
                            // CONFIG.maxEnergy = Math.min(1000, CONFIG.maxEnergy * 1.01);
                            // CONFIG.maxHealth = Math.min(1000, CONFIG.maxHealth * 1.005);

                            manualDrone.score += CONFIG.targetCollectReward; // Update score directly
                            playSoundEffect('target_collect'); // <-- Play sound
                            createClaimEffect(target.x, target.y); // Show visual
                            currentTargets.splice(i, 1); // Remove target
                            break;
                        }
                    }
                    // Update manual score display
                    score = Math.max(0, Math.floor(manualDrone.score));
                    if (scoreDisplay) scoreDisplay.textContent = `Skor Manual: ${score}`;
                }
             }
        } // End simulation speed loop

        // --- Drawing --- (Only draw once per frame, regardless of sim speed)
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

        // Draw game elements
        drawTargets();
        obstacles.forEach(obs => obs.draw());
        drawParticles();

        // Draw the active drone(s)
        if (aiTrainingActive) {
            aiDrones.forEach(drone => {
                if (drone.alive) drone.draw();
            });
        } else if (playbackModeActive) {
            if (playbackDrone && playbackDrone.alive) playbackDrone.draw();
        } else { // Manual mode
            if (manualDrone.alive) {
                manualDrone.draw();
            } else if (!gameRunning) { // If manual drone died and game stopped
                displayGameOver();
            }
        }

    } // End check if game screen is visible

    // Request next frame
    animationFrameId = requestAnimationFrame(gameLoop);
}

function displayGameOver() {
    // Only display if in manual mode and drone is dead, or if explicitly called after stopping modes
    if (aiTrainingActive || playbackModeActive || gameScreen.classList.contains('hidden') || manualDrone.alive) return;

    // Draw Game Over overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "center";
    ctx.font = '20px "Press Start 2P"'; // Use game font
    ctx.fillStyle = "#FF5722"; // Orange color
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 30);

    ctx.font = '16px "Press Start 2P"';
    ctx.fillStyle = "#ffcc00"; // Yellow for score
    ctx.fillText(`Skor Akhir: ${score}`, canvas.width / 2, canvas.height / 2);

    ctx.font = '10px "Press Start 2P"';
    ctx.fillStyle = "#cccccc"; // Light gray for instructions
    ctx.fillText("Tekan [R] Ulang Manual | [T] Training AI | [P] Playback", canvas.width / 2, canvas.height / 2 + 30);
}

// --- Penanganan Perubahan Ukuran Jendela --- (remains the same)
function resizeCanvas() {
    if (gameScreen.classList.contains('hidden')) return; // Don't resize if not visible

    const container = canvas.parentElement;
    if (!container) return;

    const aspectRatio = 16 / 9;

    // Calculate available space considering UI elements
    const topUiHeight = (uiContainer?.offsetHeight ?? 0) + (scaleControlContainer?.offsetHeight ?? 0);
    const bottomUiHeight = (messageBox?.offsetHeight ?? 0) + (aiControls?.offsetHeight ?? 0);
    const verticalMargin = 30; // Top/bottom margin for canvas
    const horizontalMargin = 20; // Left/right margin for canvas

    const availableHeight = window.innerHeight - topUiHeight - bottomUiHeight - verticalMargin;
    const availableWidth = container.clientWidth - horizontalMargin;

    let newWidth, newHeight;

    // Calculate size based on width first
    newWidth = availableWidth;
    newHeight = newWidth / aspectRatio;

    // If height is too much, calculate based on height instead
    if (newHeight > availableHeight) {
        newHeight = availableHeight;
        newWidth = newHeight * aspectRatio;
    }

    // Ensure minimum size
    newWidth = Math.max(320, Math.floor(newWidth));
    newHeight = Math.max(180, Math.floor(newHeight));

    // Apply new dimensions
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Adjust max-width of UI elements to match canvas width
    const uiMaxWidth = `${canvas.width}px`;
    if (uiContainer) uiContainer.style.maxWidth = uiMaxWidth;
    if (messageBox) messageBox.style.maxWidth = uiMaxWidth;
    if (aiControls) aiControls.style.maxWidth = uiMaxWidth;
    if (scaleControlContainer) scaleControlContainer.style.maxWidth = uiMaxWidth;


    // Reinitialize elements that depend on canvas size
    initializeSpawnPoints(); // Recalculate spawn points based on new size
    applyGameScale(false); // Reapply scale without triggering user reset

    // Redraw game over screen if necessary
    if (!aiTrainingActive && !playbackModeActive && !gameRunning && !manualDrone.alive) {
         // Use setTimeout to ensure canvas is fully resized before drawing overlay
         setTimeout(displayGameOver, 0);
    }

    console.log(`Canvas resized to: ${canvas.width}x${canvas.height}`);
}

// --- Fungsi Menerapkan Skala Game --- (remains the same)
function applyGameScale(triggeredByUser = true) {
    gameScale = parseFloat(gameScaleSelect.value);
    console.log("Applying game scale:", gameScale);

    // Recalculate all scaled variables
    scaledSensorRange = CONFIG.sensorRange * gameScale;
    scaledGravity = CONFIG.gravity; // Gravity might not need scaling, depends on desired effect
    scaledThrustPower = CONFIG.thrustPower; // Thrust might not need scaling
    scaledBodyWidth = CONFIG.baseBodyWidth * gameScale;
    scaledBodyHeight = CONFIG.baseBodyHeight * gameScale;
    scaledBoosterWidth = CONFIG.baseBoosterWidth * gameScale;
    scaledBoosterHeight = CONFIG.baseBoosterHeight * gameScale;
    scaledBoosterSeparation = CONFIG.baseBoosterSeparation * gameScale;
    scaledBoosterOffsetY = CONFIG.baseBoosterOffsetY * gameScale;
    baseObstacleMinSize = parseInt(obstacleMinSizeSlider.value); // Get base size from slider
    baseObstacleMaxSize = parseInt(obstacleMaxSizeSlider.value);
    scaledObstacleMinSize = baseObstacleMinSize * gameScale;
    scaledObstacleMaxSize = baseObstacleMaxSize * gameScale;
    scaledWallThresholdX = CONFIG.wallThresholdX * gameScale;
    scaledWallThresholdY = CONFIG.wallThresholdY * gameScale;
    scaledFloorThreshold = CONFIG.floorThreshold * gameScale;
    scaledTargetSize = CONFIG.targetSize * gameScale;


    // Reset drone states to apply new dimensions
     manualDrone.reset(canvas.width / 2, canvas.height / 3);
     aiDrones.forEach(drone => drone.reset(canvas.width / 2, canvas.height / 3));
     if (playbackDrone) playbackDrone.reset(canvas.width / 2, canvas.height / 3);


    // If triggered by user changing the select dropdown, stop everything and prompt user
    if (triggeredByUser) {
        stopAllModes(); // Stop AI/Playback
        messageBox.textContent = `Game scale changed to ${gameScale}x. Tekan [R] / [T] / [P].`;
        currentMode.textContent = "Manual";
        gameRunning = false; // Stop manual game if it was running
        displayGameOver(); // Show game over screen
        updateButtonStates();
    }

     // Ensure game loop is running if needed (e.g., after resize)
    if (!animationFrameId && !gameScreen.classList.contains('hidden')) {
         lastTimestamp = performance.now();
         animationFrameId = requestAnimationFrame(gameLoop);
     }
}

// --- Inisialisasi & Reset Game ---
function resetManualGame() {
    if (aiTrainingActive || playbackModeActive) return; // Don't reset if AI/Playback active

    stopAllBoosterSounds(); // <-- Hentikan suara booster
    gameRunning = true; // Set manual game as running
    resetObstacles();
    obstacleSpawnTimer = 0;
    score = 0; // Reset manual score
    startTime = performance.now();
    lastTimestamp = startTime;
    messageBox.textContent = "Mode Manual Aktif.";
    if (scoreDisplay) scoreDisplay.textContent = `Skor Manual: ${score}`;
    currentMode.textContent = "Manual";

    // Reset targets and particles
    currentTargets = [];
    targetSpawnCooldown = 0; // Allow targets to spawn immediately
    particles = [];

    // Reset the manual drone
    manualDrone.reset(canvas.width / 2, canvas.height / 3);

    // Clear any lingering key presses
    Object.keys(keysPressed).forEach(key => keysPressed[key] = false);

    // Ensure game loop is running
    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}
function resetObstacles() {
    obstacles = [];
}

// --- Fungsi Model AI (Simpan/Impor) --- (remains the same)
function saveBestModel() {
    const modelToSave = bestGenomeEver;
    if (!modelToSave) {
        messageBox.textContent = "Tidak ada model AI terbaik untuk disimpan.";
        return;
    }

    try {
        // Prepare the JSON data, including the score
        const modelJsonData = modelToSave.toJSON();
        modelJsonData.score = modelToSave.score; // Explicitly add score to JSON

        const jsonString = JSON.stringify(modelJsonData);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;

        // Create filename including score and generation
        const fitness = modelToSave.score !== undefined ? Math.round(modelToSave.score) : "N_A";
        const currentGeneration = generation > 0 ? generation : 'N_A'; // Use N_A if generation is 0
        a.download = `drone_ai_terbaik_skor_${fitness}_gen_${currentGeneration}.json`;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // Clean up blob URL

        messageBox.textContent = `Model AI terbaik (Skor: ${fitness}) berhasil disimpan.`;
        console.log("Best model saved.");
    } catch (error) {
        messageBox.textContent = "Error saving model: " + error.message;
        console.error("Save error:", error);
    }
}
function importModel(event) {
    const file = event.target.files[0];
    if (!file) {
        messageBox.textContent = "Tidak ada file dipilih.";
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const json = JSON.parse(e.target.result);

            // Validate basic structure (optional but recommended)
            if (!json.nodes || !json.connections) {
                 throw new Error("Invalid model file format.");
            }

            // Reconstruct the network
            const importedGenome = neataptic.Network.fromJSON(json);

            // Assign score if present in the file, otherwise default to 0
            importedGenome.score = (json.score !== undefined && !isNaN(json.score)) ? json.score : 0;

            // Set as the current best model
            bestGenomeEver = importedGenome;
            updateSavedModelStatus(); // Update UI indicator

            // Stop any active modes and reset state
            stopAllModes();
            messageBox.textContent = `Model AI (Skor: ${bestGenomeEver.score.toFixed(0)}) diimpor. Tekan [T] untuk lanjut training atau [P] untuk playback.`;
            currentMode.textContent = "Manual (Impor)";
            displayGameOver(); // Show game over screen after import
            updateButtonStates();

            console.log("Model imported successfully:", bestGenomeEver);

        } catch (error) {
            messageBox.textContent = "Error importing model: " + error.message;
            console.error("Import error:", error);
            bestGenomeEver = null; // Reset best model if import fails
            updateSavedModelStatus();
            updateButtonStates();
        } finally {
            // Reset the file input to allow importing the same file again
            event.target.value = null;
        }
    };
    reader.onerror = function() {
        messageBox.textContent = "Error reading file.";
        console.error("File read error:", reader.error);
    };
    reader.readAsText(file);
}

// --- Fungsi Modal Jaringan --- (remains the same)
function openNetworkModal() {
    if (!bestGenomeEver) {
        messageBox.textContent = "Tidak ada model AI terbaik untuk ditampilkan.";
        return;
    }
    try {
        // Include score in the displayed JSON
        const networkData = bestGenomeEver.toJSON();
        networkData.score = bestGenomeEver.score;
        const networkJson = JSON.stringify(networkData, null, 2); // Pretty print JSON

        networkJsonDisplay.textContent = networkJson;
        networkModal.style.display = "block"; // Show the modal
    } catch (error) {
        messageBox.textContent = "Failed to display network: " + error.message;
        console.error("Network display error:", error);
    }
}
function closeNetworkModalFunc() {
    networkModal.style.display = "none"; // Hide the modal
    networkJsonDisplay.textContent = ""; // Clear content
}

// --- Logika Layar Konfigurasi ---
function populateMutationMethods() {
    const availableMethods = Object.keys(methods.mutation);
    mutationMethodsContainer.innerHTML = ""; // Clear existing options

    availableMethods.forEach(methodName => {
        // Exclude internal/complex methods if desired (FFW, LSTM etc. are architectures, not mutations)
        if (['FFW', 'LSTM', 'GRU', 'NARX', 'Memory'].includes(methodName)) return;

        const container = document.createElement('div');
        container.classList.add('flex', 'items-center', 'mb-1');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `configMethod_${methodName}`;
        checkbox.value = methodName;
        checkbox.name = 'mutationMethod';
        checkbox.classList.add('form-checkbox', 'h-4', 'w-4', 'text-blue-600', 'transition', 'duration-150', 'ease-in-out');

        // Check if this method is in the current default CONFIG
        checkbox.checked = CONFIG.mutationMethods.some(m => {
             try {
                 // Compare function names for robustness
                 return methods.mutation[methodName] && m.name === methods.mutation[methodName].name;
             } catch (e) { return false; } // Handle potential errors if method doesn't exist
         });


        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        // Format name nicely (replace underscores, capitalize)
        label.textContent = methodName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        label.classList.add('ml-2', 'text-sm', 'text-gray-300');

        container.appendChild(checkbox);
        container.appendChild(label);
        mutationMethodsContainer.appendChild(container);
    });
}
function setupConfigScreenListeners() {
    console.log("setupConfigScreenListeners called");

    // Helper to connect slider and value display
    const setupSlider = (sliderElem, valueElem, formatter = val => val) => {
        if (sliderElem && valueElem) {
            sliderElem.addEventListener('input', (e) => {
                valueElem.textContent = formatter(e.target.value);
            });
        } else {
             console.warn("Slider or value element missing for", sliderElem?.id);
        }
    };

     // Helper for float formatting
    const formatFloat = (digits) => (val) => parseFloat(val).toFixed(digits);
    const formatPercent = (val) => `${val}%`;
    const formatSeconds = (val) => `${parseFloat(val).toFixed(1)}s`;


    // Setup for all sliders
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
    setupSlider(configTargetLifetimeSlider, targetLifetimeValue, val => `${val}s`);


    // Toggle visibility listeners
    if (configMotionBlurToggle && motionBlurIntensityContainer) {
        configMotionBlurToggle.addEventListener('change', (e) => {
            motionBlurIntensityContainer.classList.toggle('hidden', !e.target.checked);
        });
    }
     if (configTargetSystemEnabled && targetSystemOptionsContainer) {
        configTargetSystemEnabled.addEventListener('change', (e) => {
            targetSystemOptionsContainer.classList.toggle('hidden', !e.target.checked);
        });
    }

    // Start Game Button Listener (Crucial part)
    if (startGameButton) {
        console.log("Attaching listener to startGameButton");
        // Clone and replace to remove potential old listeners before adding new one
        const newStartGameButton = startGameButton.cloneNode(true);
        startGameButton.parentNode.replaceChild(newStartGameButton, startGameButton);

        newStartGameButton.addEventListener('click', () => {
            console.log("Start Game button clicked!");

             // --- INISIALISASI AUDIO CONTEXT (jika belum) ---
             if (!isAudioInitialized && typeof window.AudioContext !== 'undefined' && typeof (window.webkitAudioContext) !== 'undefined') {
                 try {
                     audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                     // Resume context immediately if it starts suspended (common practice)
                     if (audioCtx.state === 'suspended') {
                         audioCtx.resume().then(() => console.log("AudioContext resumed on start."));
                     }
                     isAudioInitialized = true;
                     console.log("AudioContext initialized.");
                 } catch (e) {
                     console.error("Web Audio API is not supported or failed to initialize.", e);
                     isAudioInitialized = false; // Tandai gagal
                     alert("Web Audio API tidak didukung atau gagal diinisialisasi. Efek suara tidak akan berfungsi.");
                 }
             } else if (audioCtx && audioCtx.state === 'suspended') {
                 // If context exists but is suspended, try resuming
                 audioCtx.resume().then(() => console.log("AudioContext resumed on start."));
             }
             // --- END INISIALISASI AUDIO ---


            // Apply all config values from sliders/toggles to CONFIG object
            CONFIG.mutationRate = parseFloat(configMutationRateSlider.value);
            CONFIG.mutationAmount = parseInt(configMutationAmountSlider.value);
            CONFIG.elitismPercent = parseInt(configElitismSlider.value);

            // Update mutation methods based on checkboxes
            CONFIG.mutationMethods = [];
            const checkedCheckboxes = mutationMethodsContainer.querySelectorAll('input[type="checkbox"]:checked');
            checkedCheckboxes.forEach(cb => {
                if (methods.mutation[cb.value]) {
                    CONFIG.mutationMethods.push(methods.mutation[cb.value]);
                }
            });
            // Ensure at least one method if user deselects all
            if (CONFIG.mutationMethods.length === 0) {
                console.warn("No mutation methods selected, defaulting to MOD_WEIGHT.");
                CONFIG.mutationMethods.push(methods.mutation.MOD_WEIGHT);
            }

            // Apply Physics & Rules
            CONFIG.gravity = parseFloat(configGravitySlider.value);
            CONFIG.thrustPower = parseFloat(configThrustSlider.value);
            CONFIG.maxEnergy = parseInt(configMaxEnergySlider.value);
            CONFIG.thrustEnergyCost = parseFloat(configThrustCostSlider.value);
            CONFIG.maxHealth = parseInt(configMaxHealthSlider.value);
            CONFIG.healthRegenRate = parseFloat(configRegenRateSlider.value);
            CONFIG.sensorRange = parseInt(configSensorRangeSlider.value);
            CONFIG.wallPenalty = parseFloat(configWallPenaltySlider.value);
            CONFIG.floorPenalty = parseFloat(configFloorPenaltySlider.value);
            CONFIG.safeZoneReward = parseFloat(configSafeZoneRewardSlider.value);
            CONFIG.altitudeReward = parseFloat(configAltitudeRewardSlider.value);
            CONFIG.targetProximityRewardFactor = parseFloat(configTargetProximityRewardSlider.value);

            // Apply Drone Dimensions
            CONFIG.baseBodyWidth = parseInt(configBodyWidthSlider.value);
            CONFIG.baseBodyHeight = parseInt(configBodyHeightSlider.value);
            CONFIG.baseBoosterWidth = parseInt(configBoosterWidthSlider.value);
            CONFIG.baseBoosterHeight = parseInt(configBoosterHeightSlider.value);
            CONFIG.baseBoosterSeparation = parseInt(configBoosterSeparationSlider.value);
            CONFIG.baseBoosterOffsetY = parseInt(configBoosterOffsetYSlider.value);

            // Apply Visuals
            CONFIG.motionBlurEnabled = configMotionBlurToggle.checked;
            CONFIG.motionBlurIntensity = parseFloat(configMotionBlurIntensitySlider.value);

             // Apply Target System Config
            CONFIG.targetSystemEnabled = configTargetSystemEnabled.checked;
            CONFIG.targetSpawnIntervalSeconds = parseFloat(configTargetSpawnIntervalSlider.value);
            CONFIG.targetLifetimeSeconds = parseFloat(configTargetLifetimeSlider.value);


            console.log("Configuration Applied:", CONFIG);

            // --- Transition to Game Screen ---
            welcomeScreen.classList.add('hidden');
            gameScreen.classList.remove('hidden');

            // Initial setup for game screen
            resizeCanvas(); // Resize canvas to fit
            applyGameScale(false); // Apply scale based on dropdown without reset message
            updateSavedModelStatus(); // Check if a model was previously loaded/best
            obstacleToggle.checked = obstaclesEnabled; // Set obstacle toggle state

            // Reset game state to manual idle
            stopAllModes();
            gameRunning = false; // Start in non-running manual mode
            displayGameOver(); // Show the initial "Game Over" screen as a prompt
            currentMode.textContent = "Manual";
            messageBox.textContent = "Tekan [R] Manual | [T] Training AI | [P] Playback.";
            updateButtonStates(); // Enable/disable buttons correctly

            // Start the main game loop if it's not already running
            if (!animationFrameId) {
                startTime = performance.now();
                lastTimestamp = startTime;
                animationFrameId = requestAnimationFrame(gameLoop);
            }
        });
        console.log("Listener ATTACHED to new startGameButton");
    } else {
        console.error("Start Game button (startGameButton) not found!");
    }
}

// --- Event Listeners --- (Standard UI listeners)
window.addEventListener('resize', resizeCanvas);

// Button Clicks
resetButton.addEventListener('click', switchToManualMode);
startAiButton.addEventListener('click', startAiTraining);
stopAiButton.addEventListener('click', stopAiTraining);
playBestAiButton.addEventListener('click', togglePlaybackMode);
saveModelButton.addEventListener('click', saveBestModel);
clearObstaclesButton.addEventListener('click', resetObstacles);
viewNetworkButton.addEventListener('click', openNetworkModal);
closeNetworkModal.addEventListener('click', closeNetworkModalFunc);

// Import File Input Change
importFile.addEventListener('change', importModel);

// Modal Close on Background Click
window.addEventListener('click', (event) => {
    if (event.target == networkModal) { // If click target is the modal background
        closeNetworkModalFunc();
    }
});

// Game Scale Change
gameScaleSelect.addEventListener('change', () => applyGameScale(true)); // Triggered by user

// Obstacle Toggle Change
obstacleToggle.addEventListener('change', (e) => {
    obstaclesEnabled = e.target.checked;
    if (!gameScreen.classList.contains('hidden')) { // Only show message if game is active
        messageBox.textContent = `Rintangan ${obstaclesEnabled ? "diaktifkan" : "dinonaktifkan"}.`;
    }
    if (!obstaclesEnabled) {
        resetObstacles(); // Clear obstacles immediately if disabled
    }
});

// Population Size Slider (update variable if not training)
populationSizeSlider.addEventListener('input', (e) => {
    populationValue.textContent = e.target.value;
    if (!aiTrainingActive && !playbackModeActive) {
        populationCount = parseInt(e.target.value);
        // Update target spawn numbers based on population
        // NUM_TARGETS_TO_SPAWN = populationCount;
        // NUM_SPAWN_POINTS = populationCount * 2;
        // initializeSpawnPoints(); // Reinitialize if needed, maybe not necessary unless pop changes drastically
    }
});

// Training Speed Slider
trainingSpeedSlider.addEventListener('input', (e) => {
    simulationSpeed = parseInt(e.target.value);
    speedValue.textContent = `${simulationSpeed}x`;
});

// Obstacle Speed Sliders (with validation)
obstacleMinSpeedSlider.addEventListener('input', (e) => {
    obstacleMinSpeed = parseFloat(e.target.value);
    obstacleMinSpeedValue.textContent = obstacleMinSpeed.toFixed(1);
    // Ensure min speed is not greater than max speed
    if (obstacleMinSpeed > obstacleMaxSpeed) {
        obstacleMaxSpeedSlider.value = obstacleMinSpeed; // Adjust max slider
        obstacleMaxSpeed = obstacleMinSpeed;
        obstacleMaxSpeedValue.textContent = obstacleMaxSpeed.toFixed(1);
    }
});
obstacleMaxSpeedSlider.addEventListener('input', (e) => {
    obstacleMaxSpeed = parseFloat(e.target.value);
    obstacleMaxSpeedValue.textContent = obstacleMaxSpeed.toFixed(1);
    // Ensure max speed is not less than min speed
    if (obstacleMaxSpeed < obstacleMinSpeed) {
        obstacleMinSpeedSlider.value = obstacleMaxSpeed; // Adjust min slider
        obstacleMinSpeed = obstacleMaxSpeed;
        obstacleMinSpeedValue.textContent = obstacleMinSpeed.toFixed(1);
    }
});

// Obstacle Spawn Interval Slider
obstacleSpawnIntervalSlider.addEventListener('input', (e) => {
    obstacleSpawnInterval = parseInt(e.target.value); // Interval is in frames
    obstacleSpawnIntervalValue.textContent = obstacleSpawnInterval;
});

// Obstacle Size Sliders (with validation and scale update)
obstacleMinSizeSlider.addEventListener('input', (e) => {
    baseObstacleMinSize = parseInt(e.target.value);
    obstacleMinSizeValue.textContent = baseObstacleMinSize;
    if (baseObstacleMinSize > baseObstacleMaxSize) {
        obstacleMaxSizeSlider.value = baseObstacleMinSize;
        baseObstacleMaxSize = baseObstacleMinSize;
        obstacleMaxSizeValue.textContent = baseObstacleMaxSize;
    }
    applyGameScale(false); // Reapply scale to update scaled sizes
});
obstacleMaxSizeSlider.addEventListener('input', (e) => {
    baseObstacleMaxSize = parseInt(e.target.value);
    obstacleMaxSizeValue.textContent = baseObstacleMaxSize;
    if (baseObstacleMaxSize < baseObstacleMinSize) {
        obstacleMinSizeSlider.value = baseObstacleMaxSize;
        baseObstacleMinSize = baseObstacleMaxSize;
        obstacleMinSizeValue.textContent = baseObstacleMinSize;
    }
    applyGameScale(false); // Reapply scale to update scaled sizes
});

// --- Inisialisasi Saat Halaman Dimuat ---
window.onload = () => {
    console.log("window.onload called");

    // Populate dynamic elements
    populateMutationMethods();

    // Set initial values for config sliders based on default CONFIG
    // Helper to set slider and text value
    const setInitialSliderValue = (sliderElem, valueElem, configValue, formatter = val => val) => {
         if(sliderElem && valueElem) {
             sliderElem.value = configValue;
             valueElem.textContent = formatter(configValue);
         }
    };
    const formatFloat = (digits) => (val) => parseFloat(val).toFixed(digits);
    const formatPercent = (val) => `${val}%`;
    const formatSeconds = (val) => `${parseFloat(val).toFixed(1)}s`;

    setInitialSliderValue(configMutationRateSlider, mutationRateValue, CONFIG.mutationRate, formatFloat(2));
    setInitialSliderValue(configMutationAmountSlider, mutationAmountValue, CONFIG.mutationAmount);
    setInitialSliderValue(configElitismSlider, elitismValue, CONFIG.elitismPercent, formatPercent);
    setInitialSliderValue(configGravitySlider, gravityValue, CONFIG.gravity, formatFloat(2));
    setInitialSliderValue(configThrustSlider, thrustValue, CONFIG.thrustPower, formatFloat(2));
    setInitialSliderValue(configMaxEnergySlider, maxEnergyValue, CONFIG.maxEnergy);
    setInitialSliderValue(configThrustCostSlider, thrustCostValue, CONFIG.thrustEnergyCost, formatFloat(2));
    setInitialSliderValue(configMaxHealthSlider, maxHealthValue, CONFIG.maxHealth);
    setInitialSliderValue(configRegenRateSlider, regenRateValue, CONFIG.healthRegenRate, formatFloat(2));
    setInitialSliderValue(configSensorRangeSlider, sensorRangeValue, CONFIG.sensorRange);
    setInitialSliderValue(configWallPenaltySlider, wallPenaltyValue, CONFIG.wallPenalty, formatFloat(2));
    setInitialSliderValue(configFloorPenaltySlider, floorPenaltyValue, CONFIG.floorPenalty, formatFloat(2));
    setInitialSliderValue(configSafeZoneRewardSlider, safeZoneRewardValue, CONFIG.safeZoneReward, formatFloat(2));
    setInitialSliderValue(configAltitudeRewardSlider, altitudeRewardValue, CONFIG.altitudeReward, formatFloat(2));
    setInitialSliderValue(configTargetProximityRewardSlider, targetProximityRewardValue, CONFIG.targetProximityRewardFactor, formatFloat(1));
    setInitialSliderValue(configBodyWidthSlider, bodyWidthValue, CONFIG.baseBodyWidth);
    setInitialSliderValue(configBodyHeightSlider, bodyHeightValue, CONFIG.baseBodyHeight);
    setInitialSliderValue(configBoosterWidthSlider, boosterWidthValue, CONFIG.baseBoosterWidth);
    setInitialSliderValue(configBoosterHeightSlider, boosterHeightValue, CONFIG.baseBoosterHeight);
    setInitialSliderValue(configBoosterSeparationSlider, boosterSeparationValue, CONFIG.baseBoosterSeparation);
    setInitialSliderValue(configBoosterOffsetYSlider, boosterOffsetYValue, CONFIG.baseBoosterOffsetY);
    setInitialSliderValue(configMotionBlurIntensitySlider, motionBlurIntensityValue, CONFIG.motionBlurIntensity, formatFloat(2));
    setInitialSliderValue(configTargetSpawnIntervalSlider, targetSpawnIntervalValue, CONFIG.targetSpawnIntervalSeconds, formatSeconds);
    setInitialSliderValue(configTargetLifetimeSlider, targetLifetimeValue, CONFIG.targetLifetimeSeconds, val => `${val}s`);


    // Set initial toggle states
    if(configMotionBlurToggle) configMotionBlurToggle.checked = CONFIG.motionBlurEnabled;
    if(motionBlurIntensityContainer) motionBlurIntensityContainer.classList.toggle('hidden', !CONFIG.motionBlurEnabled);
    if(configTargetSystemEnabled) configTargetSystemEnabled.checked = CONFIG.targetSystemEnabled;
    if(targetSystemOptionsContainer) targetSystemOptionsContainer.classList.toggle('hidden', !CONFIG.targetSystemEnabled);


    // Setup the listeners for the config screen (including the crucial start button listener)
    setupConfigScreenListeners();

    console.log("window.onload finished");
};
