// --- Variabel Global & Konstanta ---
const { Neat, methods, architect } = neataptic; // Pustaka Neataptic untuk AI

// --- Elemen DOM ---
// ... (Referensi Elemen DOM tetap sama) ...
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
const NUM_TARGETS_TO_SPAWN = 3;
const NUM_SPAWN_POINTS = 20;
let potentialSpawnPoints = [];
let targetSpawnCooldown = 0;
let particles = [];

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
    targetSpawnIntervalSeconds: 5.0,
    targetLifetimeSeconds: 15.0,
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
    // dodgeSensorThreshold: 0.5, // Tidak digunakan lagi
    // dodgeRotationBias: 0.8, // Tidak digunakan lagi
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
        ctx.fillStyle = this.bodyColor;
        const bX = this.x - this.bodyWidth / 2,
            bY = this.y - this.bodyHeight / 2;
        ctx.fillRect(bX, bY, this.bodyWidth, this.bodyHeight);
        if (showFullVisuals) {
            ctx.fillStyle = "#ADD8E6";
            ctx.fillRect(
                this.x - 2 * gameScale,
                bY - 5 * gameScale,
                4 * gameScale,
                5 * gameScale,
            );
        }
        const lBAX = this.x - this.boosterSeparation / 2,
            rBAX = this.x + this.boosterSeparation / 2,
            bAY = this.y + this.boosterOffsetY;
        this.drawBooster(lBAX, bAY, this.leftBoosterAngle);
        this.drawBooster(rBAX, bAY, this.rightBoosterAngle);
        if (showFullVisuals && (this.isManual || this.isPlayback) && this.alive) {
            const bw = this.bodyWidth * 0.8,
                bh = 3 * gameScale,
                bs = 1 * gameScale;
            const bx = this.x - bw / 2,
                hby = bY - bh * 2 - bs - 4 * gameScale,
                eby = hby + bh + bs;
            const hr = Math.max(0, this.health / CONFIG.maxHealth);
            ctx.fillStyle = "#4a5568";
            ctx.fillRect(bx, hby, bw, bh);
            ctx.fillStyle = hr > 0.25 ? "#4ade80" : "#f87171";
            ctx.fillRect(bx, hby, bw * hr, bh);
            const er = Math.max(0, this.energy / CONFIG.maxEnergy);
            ctx.fillStyle = "#4a5568";
            ctx.fillRect(bx, eby, bw, bh);
            ctx.fillStyle = this.energyBarColor;
            ctx.fillRect(bx, eby, bw * er, bh);
        }
        ctx.restore();
    },
    drawBooster(attachX, attachY, angle) {
        ctx.save();
        ctx.translate(attachX, attachY);
        ctx.rotate(angle);
        const fby = this.boosterHeight / 2;
        if (this.thrusting && this.energy > 0) {
            ctx.shadowColor = this.boosterFlameColor1;
            ctx.shadowBlur = CONFIG.bloomIntensity;
            const fl = (20 + Math.random() * 8) * gameScale;
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
            ctx.shadowBlur = 0;
        }
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
            const dist = Math.sqrt(minTargetDistSq) || 1;
            this.sensors.targetDirX = (closestTarget.x - this.x) / dist;
            this.sensors.targetDirY = (closestTarget.y - this.y) / dist;
        } else {
            this.sensors.targetDirX = 0;
            this.sensors.targetDirY = 0;
        }
    },
    getMinObstacleDistInDir(dx, dy) {
        let mDSq = scaledSensorRange * scaledSensorRange;
        let det = false;
        obstacles.forEach((obs) => {
            const oDx = obs.x + obs.size / 2 - this.x,
                oDy = obs.y + obs.size / 2 - this.y;
            const dot = oDx * dx + oDy * dy;
            if (dot > 0) {
                const dSq = oDx * oDx + oDy * oDy;
                if (dSq < scaledSensorRange * scaledSensorRange) {
                    const cPDSq = this.distSqPointToSegment(
                        this.x,
                        this.y,
                        this.x + dx * scaledSensorRange,
                        this.y + dy * scaledSensorRange,
                        obs.x + obs.size / 2,
                        obs.y + obs.size / 2,
                    );
                    const oRSq = (obs.size / 1.5) * (obs.size / 1.5);
                    if (cPDSq < oRSq && dSq < mDSq) {
                        mDSq = dSq;
                        det = true;
                    }
                }
            }
        });
        return det ? Math.sqrt(mDSq) / scaledSensorRange : 1.0;
    },
    distSqPointToSegment(x1, y1, x2, y2, px, py) {
        const l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
        if (l2 === 0) return (px - x1) * (px - x1) + (py - y1) * (py - y1);
        let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
        t = Math.max(0, Math.min(1, t));
        const pX = x1 + t * (x2 - x1),
            pY = y1 + t * (y2 - y1);
        return (px - pX) * (px - pX) + (py - pY) * (py - pY);
    },
    takeDamage(amount) {
        if (!this.alive) return;
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            this.alive = false;
            if (!this.isTraining) {
                createDestructionEffect(this.x, this.y);
            }
            if (this.isManual) {
                messageBox.textContent = "Drone Hancur!";
                gameRunning = false;
                updateButtonStates();
            } else if (this.isPlayback) {
                messageBox.textContent = "Playback Selesai (Hancur).";
            }
        }
    },
    update(inputData = {}) {
        if (!this.alive) return;
        let rotationInput = 0;
        let thrustInput = false;
        if (this.isManual) {
            if (inputData.left) rotationInput = -1;
            if (inputData.right) rotationInput = 1;
            thrustInput = inputData.thrust;
        } else {
            // AI atau Playback - Hapus dodge bias, biarkan NEAT belajar
            thrustInput = inputData.thrust > 0.5;
            rotationInput = inputData.rotation * 2 - 1; // Langsung dari output NEAT
            rotationInput = Math.max(-1, Math.min(1, rotationInput)); // Pastikan dalam batas
        }
        const rotationChange = rotationInput * CONFIG.boosterRotationSpeed;
        this.leftBoosterAngle = Math.max(
            -CONFIG.maxBoosterAngle,
            Math.min(CONFIG.maxBoosterAngle, this.leftBoosterAngle + rotationChange),
        );
        this.rightBoosterAngle = Math.max(
            -CONFIG.maxBoosterAngle,
            Math.min(CONFIG.maxBoosterAngle, this.rightBoosterAngle + rotationChange),
        );
        this.thrusting = thrustInput;
        let energyConsumed = 0;
        if (this.thrusting && this.energy > 0) {
            energyConsumed = CONFIG.thrustEnergyCost;
            this.energy = Math.max(0, this.energy - energyConsumed);
            const lTDW = this.leftBoosterAngle - Math.PI / 2,
                rTDW = this.rightBoosterAngle - Math.PI / 2;
            const tVx = ((Math.cos(lTDW) + Math.cos(rTDW)) * scaledThrustPower) / 2,
                tVy = ((Math.sin(lTDW) + Math.sin(rTDW)) * scaledThrustPower) / 2;
            this.vx += tVx;
            this.vy += tVy;
        }
        this.vy += scaledGravity;
        this.vx *= CONFIG.drag;
        this.vy *= CONFIG.drag;
        const cSpd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (cSpd > CONFIG.maxSpeed) {
            const sR = CONFIG.maxSpeed / cSpd;
            this.vx *= sR;
            this.vy *= sR;
        }
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
            this.trail = [];
        }
        this.x += this.vx;
        this.y += this.vy;
        if (isNaN(this.x) || isNaN(this.y) || isNaN(this.vx) || isNaN(this.vy)) {
            console.error("NaN detected!", this);
            this.alive = false;
            if (this.isManual) {
                gameRunning = false;
                updateButtonStates();
            }
            return;
        }
        const hB = this.bodyWidth / 2,
            vB = this.bodyHeight / 2;
        let hitWall = false,
            boosterHit = false;
        const bPts = this.getBoosterWorldPoints();
        bPts.forEach((p) => {
            let cPt = null;
            if (p.x < 0) cPt = { x: 0, y: p.y };
            else if (p.x > canvas.width) cPt = { x: canvas.width, y: p.y };
            if (p.y < 0) cPt = { x: p.x, y: 0 };
            else if (p.y > canvas.height) cPt = { x: p.x, y: canvas.height };
            if (cPt) {
                boosterHit = true;
                if (!this.isTraining) {
                    createBoosterImpactEffect(cPt.x, cPt.y);
                }
                this.takeDamage(CONFIG.boosterHitDamage);
            }
        });
        if (this.x < hB) {
            this.x = hB;
            this.vx *= -0.3;
            hitWall = true;
        } else if (this.x > canvas.width - hB) {
            this.x = canvas.width - hB;
            this.vx *= -0.3;
            hitWall = true;
        }
        if (this.y < vB) {
            this.y = vB;
            this.vy = 0;
            hitWall = true;
        }
        if (this.y > canvas.height - vB) {
            this.y = canvas.height - vB;
            this.vy *= -0.3;
            hitWall = true;
        }
        if (hitWall && !boosterHit) {
            this.takeDamage(CONFIG.wallHitDamage);
        }
        if (this.y > canvas.height + this.bodyHeight * 2) {
            this.alive = false;
            if (this.isManual) {
                messageBox.textContent = "Drone hilang!";
                gameRunning = false;
                updateButtonStates();
            } else if (this.isPlayback) {
                messageBox.textContent = "Playback Selesai (Jatuh).";
            }
        }
        let collidingWithObstacle = false;
        obstacles.forEach((obs) => {
            if (this.checkCollision(obs)) {
                collidingWithObstacle = true;
                const spdF = Math.min(1, cSpd / CONFIG.maxSpeed),
                    szF =
                        obs.size / ((scaledObstacleMinSize + scaledObstacleMaxSize) / 2);
                const dmg =
                    CONFIG.baseObstacleDamage +
                    szF * CONFIG.obstacleDamageSizeFactor * CONFIG.baseObstacleDamage +
                    spdF * CONFIG.obstacleDamageSpeedFactor;
                this.takeDamage(dmg);
                if (!this.isManual) {
                    this.score -= CONFIG.obstacleHitPenalty;
                }
            }
        }); // Tambah penalti skor
        if (this.alive && !this.isManual) {
            this.score += CONFIG.survivalReward; // Reward bertahan hidup
            if (energyConsumed > 0) {
                this.score -= energyConsumed * CONFIG.energyCostPenaltyFactor;
            } // Penalti konsumsi energi
            const nW =
                this.x < scaledWallThresholdX ||
                this.x > canvas.width - scaledWallThresholdX ||
                this.y < scaledWallThresholdY;
            const nF = this.y > canvas.height - scaledFloorThreshold;
            const sZM = canvas.width * 0.2;
            const iSZ = this.x > sZM && this.x < canvas.width - sZM;
            const iMY = canvas.height * CONFIG.idealAltitudeMinRatio,
                iMAY = canvas.height * CONFIG.idealAltitudeMaxRatio;
            const iIA = this.y > iMY && this.y < iMAY;
            if (nW) {
                this.score -= CONFIG.wallPenalty;
            }
            if (nF) {
                this.score -= CONFIG.floorPenalty;
            }
            if (iSZ) {
                this.score += CONFIG.safeZoneReward;
            }
            if (iIA) {
                this.score += CONFIG.altitudeReward;
            }
            if (this.sensors.targetDirX !== 0 || this.sensors.targetDirY !== 0) {
                let cTD = Infinity;
                currentTargets.forEach((target) => {
                    const dx = target.x - this.x,
                        dy = target.y - this.y;
                    cTD = Math.min(cTD, Math.sqrt(dx * dx + dy * dy));
                });
                if (cTD < scaledSensorRange) {
                    const pR =
                        (1 - Math.min(1, cTD / scaledSensorRange)) *
                        CONFIG.targetProximityRewardFactor;
                    this.score += pR;
                }
            }
        }
        const isF =
            !hitWall &&
            !boosterHit &&
            this.y < canvas.height - scaledFloorThreshold &&
            Math.abs(this.vy) < CONFIG.maxFloatVY;
        if (this.alive && isF && !collidingWithObstacle) {
            this.health = Math.min(
                CONFIG.maxHealth,
                this.health + CONFIG.healthRegenRate,
            );
        }
        if (!this.isManual) {
            this.updateSensors();
        }
    },
    getBoosterWorldPoints() {
        const pts = [];
        const hw = this.boosterWidth / 2,
            hh = this.boosterHeight / 2;
        const addPts = (aX, aY, ang) => {
            const cA = Math.cos(ang),
                sA = Math.sin(ang);
            pts.push({
                x: aX + (-hw * cA - -hh * sA),
                y: aY + (-hw * sA + -hh * cA),
            });
            pts.push({ x: aX + (hw * cA - -hh * sA), y: aY + (hw * sA + -hh * cA) });
            pts.push({ x: aX + (hw * cA - hh * sA), y: aY + (hw * sA + hh * cA) });
            pts.push({ x: aX + (-hw * cA - hh * sA), y: aY + (-hw * sA + hh * cA) });
        };
        const lBAX = this.x - this.boosterSeparation / 2,
            rBAX = this.x + this.boosterSeparation / 2,
            bAY = this.y + this.boosterOffsetY;
        addPts(lBAX, bAY, this.leftBoosterAngle);
        addPts(rBAX, bAY, this.rightBoosterAngle);
        return pts;
    },
    reset(startX, startY) {
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
        this.bodyWidth = scaledBodyWidth;
        this.bodyHeight = scaledBodyHeight;
        this.boosterWidth = scaledBoosterWidth;
        this.boosterHeight = scaledBoosterHeight;
        this.boosterSeparation = scaledBoosterSeparation;
        this.boosterOffsetY = scaledBoosterOffsetY;
        this.trail = [];
        if (!this.isManual) this.updateSensors();
    },
};

// --- Instance Drone Manual ---
const manualDrone = {
    ...baseDrone,
    isManual: true,
    bodyColor: "#0d6efd",
    boosterColor: "#0a58ca",
};

// --- Fungsi Pembuat Rintangan ---
function createObstacle() {
    const sz =
        scaledObstacleMinSize +
        Math.random() * (scaledObstacleMaxSize - scaledObstacleMinSize);
    let x, y, vx, vy;
    const ed = Math.floor(Math.random() * 4),
        spd =
            obstacleMinSpeed + Math.random() * (obstacleMaxSpeed - obstacleMinSpeed);
    switch (ed) {
        case 0:
            x = Math.random() * canvas.width;
            y = -sz;
            break;
        case 1:
            x = canvas.width + sz;
            y = Math.random() * canvas.height;
            break;
        case 2:
            x = Math.random() * canvas.width;
            y = canvas.height + sz;
            break;
        case 3:
            x = -sz;
            y = Math.random() * canvas.height;
            break;
    }
    const tX = canvas.width / 2 + (Math.random() - 0.5) * (canvas.width * 0.6),
        tY = canvas.height / 3 + (Math.random() - 0.5) * (canvas.height * 0.4);
    const dx = tX - x,
        dy = tY - y,
        dist = Math.sqrt(dx * dx + dy * dy) || 1;
    vx = (dx / dist) * spd;
    vy = (dy / dist) * spd;
    const pts = 5 + Math.floor(Math.random() * 6),
        sPts = [];
    for (let i = 0; i < pts; i++) {
        const ang = (i / pts) * Math.PI * 2,
            rad = (sz / 2) * (0.7 + Math.random() * 0.6);
        sPts.push({ x: Math.cos(ang) * rad, y: Math.sin(ang) * rad });
    }
    return {
        x,
        y,
        vx,
        vy,
        size: sz,
        color: `hsl(${Math.random() * 30 + 20}, 60%, ${40 + Math.random() * 20}%)`,
        shapePoints: sPts,
        draw() {
            if (aiTrainingActive) return;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(
                this.x + this.size / 2 + this.shapePoints[0].x,
                this.y + this.size / 2 + this.shapePoints[0].y,
            );
            for (let i = 1; i < this.shapePoints.length; i++) {
                ctx.lineTo(
                    this.x + this.size / 2 + this.shapePoints[i].x,
                    this.y + this.size / 2 + this.shapePoints[i].y,
                );
            }
            ctx.closePath();
            ctx.fill();
        },
        update() {
            this.x += this.vx;
            this.y += this.vy;
        },
    };
}

// --- Fungsi Terkait Target ---
function initializeSpawnPoints() {
    potentialSpawnPoints = [];
    const pX = CONFIG.spawnPointPaddingRatio,
        pY = CONFIG.spawnPointPaddingRatio;
    const nC = 5,
        nR = Math.ceil(NUM_SPAWN_POINTS / nC);
    for (let i = 0; i < NUM_SPAWN_POINTS; i++) {
        const col = i % nC,
            row = Math.floor(i / nC);
        let xR = pX + (1 - 2 * pX) * (col / (nC - 1)),
            yR = pY + (1 - 2 * pY) * (row / (nR - 1));
        xR += (Math.random() - 0.5) * 0.05;
        yR += (Math.random() - 0.5) * 0.05;
        xR = Math.max(pX, Math.min(1 - pX, xR));
        yR = Math.max(pY, Math.min(1 - pY, yR));
        potentialSpawnPoints.push({ xRatio: xR, yRatio: yR });
    }
    console.log(
        "Potential spawn points initialized:",
        potentialSpawnPoints.length,
    );
}
function spawnTargets() {
    if (
        !CONFIG.targetSystemEnabled ||
        gameScreen.classList.contains("hidden") ||
        currentTargets.length >= NUM_TARGETS_TO_SPAWN
    )
        return;
    if (potentialSpawnPoints.length === 0) {
        initializeSpawnPoints();
        if (potentialSpawnPoints.length === 0) {
            console.error("Failed to initialize spawn points.");
            return;
        }
    }
    let availablePts = [...potentialSpawnPoints];
    let spawnedCnt = 0;
    console.log(
        `Attempting to spawn ${NUM_TARGETS_TO_SPAWN - currentTargets.length} targets.`,
    );
    while (
        spawnedCnt < NUM_TARGETS_TO_SPAWN - currentTargets.length &&
        availablePts.length > 0
    ) {
        const rndIdx = Math.floor(Math.random() * availablePts.length);
        const spRatio = availablePts[rndIdx];
        availablePts.splice(rndIdx, 1);
        const tX = spRatio.xRatio * canvas.width,
            tY = spRatio.yRatio * canvas.height;
        let tooCloseObs = false;
        const mDSqObs = scaledTargetSize * 4 * (scaledTargetSize * 4);
        obstacles.forEach((obs) => {
            const oCX = obs.x + obs.size / 2,
                oCY = obs.y + obs.size / 2;
            const dx = tX - oCX,
                dy = tY - oCY;
            if (dx * dx + dy * dy < mDSqObs) {
                tooCloseObs = true;
            }
        });
        if (!tooCloseObs) {
            const newTgt = {
                x: tX,
                y: tY,
                size: scaledTargetSize,
                color: CONFIG.targetColor,
                pulseOffset: Math.random() * Math.PI * 2,
                lifetime: CONFIG.targetLifetimeSeconds * 1000,
            };
            currentTargets.push(newTgt);
            spawnedCnt++;
        }
    }
    if (spawnedCnt > 0) {
        targetSpawnCooldown = CONFIG.targetSpawnIntervalSeconds * 1000;
    } else {
        targetSpawnCooldown = 500;
    }
}
function drawTargets() {
    if (!CONFIG.targetSystemEnabled) return;
    currentTargets.forEach((target) => {
        const lR = Math.max(
            0,
            target.lifetime / (CONFIG.targetLifetimeSeconds * 1000),
        );
        const bA = 0.6 + lR * 0.4;
        const pul =
            Math.sin(performance.now() / 300 + target.pulseOffset) * 0.1 + 1.0;
        const cS = target.size * pul;
        ctx.save();
        ctx.shadowColor = CONFIG.targetBloomColor;
        ctx.shadowBlur = CONFIG.targetBloomSize * gameScale * pul;
        ctx.globalAlpha = bA;
        ctx.fillStyle = target.color;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = 1.5 * gameScale;
        ctx.beginPath();
        ctx.arc(target.x, target.y, cS / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    });
}
function updateTargets(deltaTime) {
    if (!CONFIG.targetSystemEnabled) {
        currentTargets = [];
        return;
    }
    for (let i = currentTargets.length - 1; i >= 0; i--) {
        const target = currentTargets[i];
        target.lifetime -= deltaTime * 1000;
        if (target.lifetime <= 0) {
            if (!aiTrainingActive) {
                createClaimEffect(target.x, target.y, "rgba(200, 200, 200, 0.7)");
            }
            currentTargets.splice(i, 1);
        }
    }
    if (currentTargets.length < NUM_TARGETS_TO_SPAWN) {
        if (targetSpawnCooldown > 0) {
            targetSpawnCooldown -= deltaTime * 1000;
        } else {
            spawnTargets();
        }
    }
}

// --- Sistem Partikel --- (Tetap sama)
function createParticles(
    x,
    y,
    count,
    color,
    speedMultiplier = 1,
    lifespanMultiplier = 1,
) {
    if (aiTrainingActive && color !== "grey" && color !== "white") return;
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 2 + 1) * speedMultiplier * gameScale;
        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: (Math.random() * 2 + 1) * gameScale,
            life: (Math.random() * 0.5 + 0.5) * lifespanMultiplier,
            maxLife: (Math.random() * 0.5 + 0.5) * lifespanMultiplier,
            color: color,
            gravity: 0.05 * gameScale,
        });
    }
}
function createClaimEffect(x, y, color = CONFIG.targetColor) {
    if (aiTrainingActive) return;
    createParticles(x, y, 15, color, 1.5, 0.8);
    createParticles(x, y, 10, "white", 1.0, 0.6);
}
function createDestructionEffect(x, y) {
    if (aiTrainingActive) return;
    createParticles(x, y, 30, "orange", 2.5, 1.2);
    createParticles(x, y, 20, "red", 1.8, 1.0);
    createParticles(x, y, 15, "#555", 1.0, 1.5);
}
function createBoosterImpactEffect(x, y) {
    createParticles(x, y, 5, "grey", 1.2, 0.5);
    createParticles(x, y, 3, "white", 0.8, 0.4);
}
function updateParticles(deltaTime) {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= deltaTime;
        if (p.life <= 0) {
            particles.splice(i, 1);
        } else {
            p.vy += p.gravity;
            p.x += p.vx * deltaTime * 60;
            p.y += p.vy * deltaTime * 60;
        }
    }
}
function drawParticles() {
    if (aiTrainingActive) return;
    particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });
}

// --- Penanganan Input --- (Tetap sama)
const keysPressed = {};
window.addEventListener("keydown", (e) => {
    if (!welcomeScreen.classList.contains("hidden")) return;
    const key = e.key.toLowerCase();
    keysPressed[key] = true;
    if (key === "r" && !resetButton.disabled) {
        switchToManualMode();
        e.preventDefault();
    } else if (key === "t" && !startAiButton.disabled && !aiTrainingActive) {
        startAiTraining();
        e.preventDefault();
    } else if (key === "p" && !playBestAiButton.disabled) {
        togglePlaybackMode();
        e.preventDefault();
    } else if (
        [
            "arrowup",
            "arrowdown",
            "arrowleft",
            "arrowright",
            "w",
            "a",
            "s",
            "d",
            " ",
        ].includes(key)
    ) {
        if (
            document.activeElement.tagName !== "INPUT" &&
            document.activeElement.tagName !== "TEXTAREA"
        ) {
            if ((!aiTrainingActive && !playbackModeActive) || manualDrone.isManual) {
                e.preventDefault();
            }
        }
    }
});
window.addEventListener("keyup", (e) => {
    if (!welcomeScreen.classList.contains("hidden")) return;
    keysPressed[e.key.toLowerCase()] = false;
});
function getManualInput() {
    return {
        left: keysPressed["a"] || keysPressed["arrowleft"],
        right: keysPressed["d"] || keysPressed["arrowright"],
        thrust: keysPressed["w"] || keysPressed["arrowup"] || keysPressed[" "],
    };
}

// --- Fungsi Update UI --- (Tetap sama)
function updateButtonStates() {
    if (gameScreen.classList.contains("hidden")) return;
    const modelExists = !!bestGenomeEver;
    resetButton.disabled = aiTrainingActive || playbackModeActive;
    if (aiTrainingActive) {
        startAiButton.classList.add("hidden");
        stopAiButton.classList.remove("hidden");
        trainingSpeedSlider.disabled = false;
    } else {
        startAiButton.classList.remove("hidden");
        stopAiButton.classList.add("hidden");
        startAiButton.disabled = playbackModeActive;
        trainingSpeedSlider.disabled = playbackModeActive;
    }
    playBestAiButton.disabled =
        aiTrainingActive || playbackModeActive || !modelExists;
    if (playbackModeActive) {
        playBestAiButton.textContent = "Stop Playback [P]";
        playBestAiButton.classList.remove("bg-cyan-600", "hover:bg-cyan-700");
        playBestAiButton.classList.add("bg-red-600", "hover:bg-red-700");
    } else {
        playBestAiButton.textContent = "Playback AI [P]";
        playBestAiButton.classList.remove("bg-red-600", "hover:bg-red-700");
        playBestAiButton.classList.add("bg-cyan-600", "hover:bg-cyan-700");
        if (!modelExists) {
            playBestAiButton.classList.add("opacity-50", "cursor-not-allowed");
        } else {
            playBestAiButton.classList.remove("opacity-50", "cursor-not-allowed");
        }
    }
    saveModelButton.disabled = !modelExists;
    viewNetworkButton.disabled = !modelExists;
    if (!modelExists) {
        saveModelButton.classList.add("opacity-50", "cursor-not-allowed");
        viewNetworkButton.classList.add("opacity-50", "cursor-not-allowed");
    } else {
        saveModelButton.classList.remove("opacity-50", "cursor-not-allowed");
        viewNetworkButton.classList.remove("opacity-50", "cursor-not-allowed");
    }
    importFile.disabled = aiTrainingActive || playbackModeActive;
    importFileLabel.classList.toggle("disabled", importFile.disabled);
    importFileLabel.classList.toggle("opacity-50", importFile.disabled);
    importFileLabel.classList.toggle("cursor-not-allowed", importFile.disabled);
    populationSizeSlider.disabled = aiTrainingActive || playbackModeActive;
    gameScaleSelect.disabled = aiTrainingActive || playbackModeActive;
    obstacleMinSpeedSlider.disabled = aiTrainingActive || playbackModeActive;
    obstacleMaxSpeedSlider.disabled = aiTrainingActive || playbackModeActive;
    obstacleSpawnIntervalSlider.disabled = aiTrainingActive || playbackModeActive;
    obstacleMinSizeSlider.disabled = aiTrainingActive || playbackModeActive;
    obstacleMaxSizeSlider.disabled = aiTrainingActive || playbackModeActive;
    obstacleToggle.disabled = aiTrainingActive || playbackModeActive;
    clearObstaclesButton.disabled = aiTrainingActive || playbackModeActive;
}
function updateSavedModelStatus() {
    if (gameScreen.classList.contains("hidden")) return;
    if (bestGenomeEver && bestGenomeEver.score !== undefined) {
        savedModelStatus.textContent = `Terbaik Skor: ${bestGenomeEver.score.toFixed(0)}`;
        savedModelStatus.classList.remove("text-gray-400");
        savedModelStatus.classList.add("text-green-400");
    } else {
        savedModelStatus.textContent = "Belum ada";
        savedModelStatus.classList.add("text-gray-400");
        savedModelStatus.classList.remove("text-green-400");
    }
    updateButtonStates();
}

// --- Logika Pergantian Mode --- (Tetap sama)
function stopAllModes(clearDrones = true) {
    aiTrainingActive = false;
    playbackModeActive = false;
    manualDrone.isTraining = false;
    if (clearDrones) {
        aiDrones = [];
        playbackDrone = null;
        if (activeDrones) activeDrones.textContent = 0;
    } else {
        aiDrones.forEach((d) => (d.isTraining = false));
        if (playbackDrone) playbackDrone.isTraining = false;
    }
    if (aiScoreDisplay) aiScoreDisplay.classList.add("hidden");
    if (playbackScoreDisplay) playbackScoreDisplay.classList.add("hidden");
    if (scoreDisplay) scoreDisplay.classList.remove("hidden");
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    updateButtonStates();
}
function switchToManualMode() {
    if (gameScreen.classList.contains("hidden")) return;
    stopAllModes();
    gameRunning = true;
    currentMode.textContent = "Manual";
    messageBox.textContent = "Mode Manual Aktif. Gunakan W/A/D/Spasi atau Panah.";
    resetManualGame();
    updateButtonStates();
    if (!animationFrameId) {
        lastTimestamp = performance.now();
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}

// --- Fungsi AI / NEAT ---
function initializeNeat(importedGenome = null) {
    const numInputs = 17; // Naikkan jumlah input menjadi 17
    const numOutputs = 2;
    const selectedMethods = [];
    const checkboxes = mutationMethodsContainer.querySelectorAll(
        'input[type="checkbox"]',
    );
    checkboxes.forEach((cb) => {
        if (cb.checked && methods.mutation[cb.value]) {
            selectedMethods.push(methods.mutation[cb.value]);
        }
    });
    if (selectedMethods.length === 0) {
        console.warn("No mutation methods selected, using MOD_WEIGHT.");
        selectedMethods.push(methods.mutation.MOD_WEIGHT);
    }
    neat = new Neat(numInputs, numOutputs, null, {
        population: populationCount,
        elitism: Math.round((CONFIG.elitismPercent / 100) * populationCount),
        mutationRate: CONFIG.mutationRate,
        mutationAmount: CONFIG.mutationAmount,
        mutation: selectedMethods,
        network: importedGenome
            ? undefined
            : architect.Random(numInputs, Math.ceil(numInputs / 1.5), numOutputs), // Sesuaikan arsitektur jika perlu
    });
    if (importedGenome) {
        neat.population = [];
        for (let i = 0; i < populationCount; i++) {
            let newGenome = neataptic.Network.fromJSON(importedGenome.toJSON());
            if (i > 0) {
                newGenome.mutate(methods.mutation.MOD_WEIGHT);
                newGenome.mutate(methods.mutation.MOD_BIAS);
            }
            neat.population.push(newGenome);
        }
        console.log(
            `NEAT initialized with imported genome (Pop: ${populationCount})`,
        );
    } else {
        console.log(
            `NEAT initialized randomly (Inputs: ${numInputs}, Pop: ${populationCount})`,
        );
    } // Log jumlah input
    generation = 0;
    highestFitness = 0;
    averageFitness = 0;
    if (!importedGenome) {
        bestGenomeEver = null;
    }
    updateSavedModelStatus();
    generationCount.textContent = generation;
    bestFitness.textContent = highestFitness.toFixed(0);
    avgFitness.textContent = averageFitness.toFixed(0);
}
function createAiDrones() {
    aiDrones = [];
    if (!neat || !neat.population) return;
    for (let i = 0; i < neat.population.length; i++) {
        const drone = { ...baseDrone };
        drone.isManual = false;
        drone.isTraining = true;
        drone.bodyColor = `hsl(${200 + ((i * 7) % 160)}, 70%, 60%)`;
        drone.boosterColor = `hsl(${200 + ((i * 7) % 160)}, 70%, 40%)`;
        drone.genome = neat.population[i];
        drone.genome.score = 0;
        drone.reset(canvas.width / 2, canvas.height / 3);
        aiDrones.push(drone);
    }
    activeDrones.textContent = aiDrones.length;
    console.log(`Gen ${generation}: Created ${aiDrones.length} AI drones.`);
}
function runAiGeneration() {
    if (!aiTrainingActive) return;
    let activeCount = 0;
    aiDrones.forEach((drone) => {
        if (drone.alive) {
            activeCount++;
            // Ambil 17 input untuk jaringan syaraf
            const inputs = [
                drone.sensors.distBottom,
                drone.sensors.distLeftWall,
                drone.sensors.distRightWall, // 0-2
                drone.sensors.velX,
                drone.sensors.velY, // 3-4
                drone.sensors.obsDistForward,
                drone.sensors.obsDistLeft,
                drone.sensors.obsDistRight, // 5-7
                drone.sensors.obsDistFwdLeft,
                drone.sensors.obsDistFwdRight,
                drone.sensors.obsDistDown, // 8-10
                drone.sensors.currentHealth, // 11
                drone.sensors.currentEnergy, // 12
                drone.sensors.targetDirX,
                drone.sensors.targetDirY, // 13-14
                drone.sensors.leftBoosterAngleNorm,
                drone.sensors.rightBoosterAngleNorm, // 15-16 (Input Baru)
            ];
            const output = drone.genome.activate(inputs);
            const aiInput = { thrust: output[0], rotation: output[1] };
            drone.update(aiInput);
            for (let i = currentTargets.length - 1; i >= 0; i--) {
                const target = currentTargets[i];
                const dx = target.x - drone.x,
                    dy = target.y - drone.y,
                    dSq = dx * dx + dy * dy;
                const cDist = drone.bodyWidth / 2 + target.size / 2;
                if (dSq < cDist * cDist) {
                    drone.health = Math.min(
                        CONFIG.maxHealth,
                        drone.health + CONFIG.maxHealth * 0.5,
                    );
                    drone.energy = Math.min(
                        CONFIG.maxEnergy,
                        drone.energy + CONFIG.maxEnergy * 0.7,
                    );
                    drone.score += CONFIG.targetCollectReward;
                    currentTargets.splice(i, 1);
                    break;
                }
            }
        } else {
            if (drone.genome && drone.genome.score === 0 && drone.score !== 0) {
                drone.genome.score = drone.score;
            } else if (drone.genome && drone.genome.score === undefined) {
                drone.genome.score = 0;
            }
        }
    });
    activeDrones.textContent = activeCount;
    if (activeCount === 0 && aiTrainingActive) {
        try {
            aiDrones.forEach((drone) => {
                if (drone.genome && drone.alive) {
                    drone.genome.score = Math.max(0, drone.score);
                } else if (drone.genome && drone.genome.score === undefined) {
                    drone.genome.score = 0;
                }
            });
            evolvePopulation();
            resetObstacles();
            currentTargets = [];
            targetSpawnCooldown = 0;
            particles = [];
            createAiDrones();
        } catch (error) {
            console.error("Error during evolution/reset:", error);
            stopAiTraining();
            messageBox.textContent = "Error during AI evolution. Training stopped.";
        }
    }
}
function evolvePopulation() {
    if (!neat || !neat.population || neat.population.length === 0) {
        console.warn("No NEAT population to evolve.");
        return;
    }
    console.log(`Gen ${generation} finished. Evaluating...`);
    neat.population.forEach((genome) => {
        if (genome.score === undefined || isNaN(genome.score)) {
            genome.score = 0;
            console.warn(
                "Genome with undefined score found during evolution, setting to 0.",
            );
        }
    });
    neat.sort();
    const currentBest = neat.getFittest();
    highestFitness = currentBest.score;
    averageFitness = neat.getAverage();
    if (!bestGenomeEver || highestFitness > bestGenomeEver.score) {
        bestGenomeEver = neataptic.Network.fromJSON(currentBest.toJSON());
        bestGenomeEver.score = highestFitness;
        updateSavedModelStatus();
        console.log(`New best! Score: ${highestFitness.toFixed(0)}`);
    }
    console.log(
        `Best Score: ${highestFitness.toFixed(0)}, Avg Score: ${averageFitness.toFixed(2)}`,
    );
    bestFitness.textContent = highestFitness.toFixed(0);
    avgFitness.textContent = averageFitness.toFixed(2);
    if (aiScoreDisplay) {
        aiScoreDisplay.textContent = `Skor AI Terbaik: ${bestGenomeEver ? bestGenomeEver.score.toFixed(0) : "0"}`;
    }
    const newPopulation = [];
    const elitismCount = Math.min(
        neat.population.length,
        Math.max(
            1,
            Math.round((CONFIG.elitismPercent / 100) * neat.population.length),
        ),
    );
    for (let i = 0; i < elitismCount; i++) {
        newPopulation.push(neat.population[i]);
    }
    for (let i = 0; i < neat.population.length - elitismCount; i++) {
        newPopulation.push(neat.getOffspring());
    }
    neat.population = newPopulation;
    neat.mutate();
    generation++;
    generationCount.textContent = generation;
    console.log(`Evolved to Gen ${generation}`);
}
function startAiTraining() {
    if (aiTrainingActive || playbackModeActive) return;
    stopAllModes(false);
    aiTrainingActive = true;
    gameRunning = false;
    messageBox.textContent = "AI Training Dimulai...";
    currentMode.textContent = "AI Training";
    if (aiScoreDisplay) aiScoreDisplay.classList.remove("hidden");
    if (scoreDisplay) scoreDisplay.classList.add("hidden");
    if (playbackScoreDisplay) playbackScoreDisplay.classList.add("hidden");
    populationCount = parseInt(populationSizeSlider.value);
    simulationSpeed = parseInt(trainingSpeedSlider.value);
    initializeNeat(bestGenomeEver);
    resetObstacles();
    currentTargets = [];
    targetSpawnCooldown = 0;
    particles = [];
    createAiDrones();
    startTime = performance.now();
    lastTimestamp = startTime;
    updateButtonStates();
    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}
function stopAiTraining() {
    if (!aiTrainingActive) return;
    stopAllModes();
    messageBox.textContent = "AI Dihentikan. Mode Manual.";
    currentMode.textContent = "Manual";
    displayGameOver();
    updateButtonStates();
}

// --- Fungsi Mode Playback --- (Tetap sama, tapi input sensor disesuaikan)
function togglePlaybackMode() {
    if (aiTrainingActive) {
        stopAiTraining();
        messageBox.textContent =
            "Training dihentikan. Tekan [P] lagi untuk mulai playback.";
        updateButtonStates();
        return;
    }
    playbackModeActive = !playbackModeActive;
    if (playbackModeActive) {
        if (!bestGenomeEver) {
            messageBox.textContent = "Tidak ada model AI terbaik. Latih AI dulu.";
            playbackModeActive = false;
            updateButtonStates();
            return;
        }
        stopAllModes(false);
        playbackModeActive = true;
        gameRunning = false;
        messageBox.textContent = "Memulai Playback AI Terbaik...";
        currentMode.textContent = "Playback AI";
        if (playbackScoreDisplay) playbackScoreDisplay.classList.remove("hidden");
        if (scoreDisplay) scoreDisplay.classList.add("hidden");
        if (aiScoreDisplay) aiScoreDisplay.classList.add("hidden");
        playbackDrone = { ...baseDrone };
        playbackDrone.isPlayback = true;
        playbackDrone.isTraining = false;
        playbackDrone.bodyColor = "#facc15";
        playbackDrone.boosterColor = "#eab308";
        playbackDrone.genome = bestGenomeEver;
        playbackDrone.reset(canvas.width / 2, canvas.height / 3);
        playbackScore = 0;
        if (playbackScoreDisplay)
            playbackScoreDisplay.textContent = `Skor Playback: 0`;
        resetObstacles();
        currentTargets = [];
        targetSpawnCooldown = 0;
        particles = [];
        startTime = performance.now();
        lastTimestamp = startTime;
    } else {
        stopAllModes();
        messageBox.textContent = "Playback Dihentikan. Mode Manual.";
        currentMode.textContent = "Manual";
        displayGameOver();
    }
    updateButtonStates();
    if (!animationFrameId) {
        lastTimestamp = performance.now();
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}
function runPlayback() {
    if (!playbackModeActive || !playbackDrone) return;
    if (!playbackDrone.alive) {
        if (playbackModeActive) {
            stopAllModes();
            messageBox.textContent = `Playback Selesai. Skor: ${playbackScore}. Mode Manual.`;
            currentMode.textContent = "Manual";
            displayGameOver();
            updateButtonStates();
        }
        return;
    }
    // Ambil 17 input
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
        playbackDrone.sensors.rightBoosterAngleNorm, // Input baru
    ];
    const output = playbackDrone.genome.activate(inputs);
    const aiInput = { thrust: output[0], rotation: output[1] };
    playbackDrone.update(aiInput);
    for (let i = currentTargets.length - 1; i >= 0; i--) {
        const target = currentTargets[i];
        const dx = target.x - playbackDrone.x,
            dy = target.y - playbackDrone.y,
            dSq = dx * dx + dy * dy;
        const cDist = playbackDrone.bodyWidth / 2 + target.size / 2;
        if (dSq < cDist * cDist) {
            playbackDrone.health = Math.min(
                CONFIG.maxHealth,
                playbackDrone.health + CONFIG.maxHealth * 0.5,
            );
            playbackDrone.energy = Math.min(
                CONFIG.maxEnergy,
                playbackDrone.energy + CONFIG.maxEnergy * 0.7,
            );
            playbackDrone.score += CONFIG.targetCollectReward;
            createClaimEffect(target.x, target.y);
            currentTargets.splice(i, 1);
            break;
        }
    }
    playbackScore = Math.max(0, Math.floor(playbackDrone.score));
    if (playbackScoreDisplay)
        playbackScoreDisplay.textContent = `Skor Playback: ${playbackScore}`;
}

// --- Loop Utama Game --- (Tetap sama)
function gameLoop(currentTime) {
    if (!lastTimestamp) lastTimestamp = currentTime;
    const deltaTime = (currentTime - lastTimestamp) / 1000;
    lastTimestamp = currentTime;
    if (!gameScreen.classList.contains("hidden")) {
        if (!startTime) startTime = currentTime;
        const currentSimSpeed = aiTrainingActive ? simulationSpeed : 1;
        for (let i = 0; i < currentSimSpeed; i++) {
            const effectiveDeltaTime = Math.min(0.05, deltaTime / currentSimSpeed);
            updateTargets(effectiveDeltaTime);
            updateParticles(effectiveDeltaTime);
            obstacleSpawnTimer++;
            const currentSpawnInterval = obstacleSpawnInterval / currentSimSpeed;
            if (obstaclesEnabled && obstacleSpawnTimer >= currentSpawnInterval) {
                obstacles.push(createObstacle());
                obstacleSpawnTimer = 0;
            }
            obstacles.forEach((obs, index) => {
                obs.update();
                const margin = obs.size * 3;
                if (
                    obs.x < -margin ||
                    obs.x > canvas.width + margin ||
                    obs.y < -margin ||
                    obs.y > canvas.height + margin
                ) {
                    obstacles.splice(index, 1);
                }
            });
            if (aiTrainingActive) {
                runAiGeneration();
            } else if (playbackModeActive) {
                runPlayback();
            } else {
                if (gameRunning && manualDrone.alive) {
                    const manualInput = getManualInput();
                    manualDrone.update(manualInput);
                    for (let i = currentTargets.length - 1; i >= 0; i--) {
                        const target = currentTargets[i];
                        const dx = target.x - manualDrone.x,
                            dy = target.y - manualDrone.y,
                            dSq = dx * dx + dy * dy;
                        const cDist = manualDrone.bodyWidth / 2 + target.size / 2;
                        if (dSq < cDist * cDist) {
                            manualDrone.health = Math.min(
                                CONFIG.maxHealth,
                                manualDrone.health + CONFIG.maxHealth * 0.5,
                            );
                            manualDrone.energy = Math.min(
                                CONFIG.maxEnergy,
                                manualDrone.energy + CONFIG.maxEnergy * 0.7,
                            );
                            manualDrone.score += CONFIG.targetCollectReward;
                            createClaimEffect(target.x, target.y);
                            currentTargets.splice(i, 1);
                            break;
                        }
                    }
                    score = Math.max(0, Math.floor(manualDrone.score));
                    if (scoreDisplay) scoreDisplay.textContent = `Skor Manual: ${score}`;
                }
            }
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawTargets();
        obstacles.forEach((obs) => obs.draw());
        drawParticles();
        if (aiTrainingActive) {
            aiDrones.forEach((drone) => {
                if (drone.alive) drone.draw();
            });
        } else if (playbackModeActive) {
            if (playbackDrone && playbackDrone.alive) playbackDrone.draw();
        } else {
            if (manualDrone.alive) {
                manualDrone.draw();
            } else if (!gameRunning) {
                displayGameOver();
            }
        }
    }
    animationFrameId = requestAnimationFrame(gameLoop);
}
function displayGameOver() {
    if (
        aiTrainingActive ||
        playbackModeActive ||
        gameScreen.classList.contains("hidden")
    )
        return;
    if (!manualDrone.alive) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = "center";
        ctx.font = '20px "Press Start 2P"';
        ctx.fillStyle = "#FF5722";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 30);
        ctx.font = '16px "Press Start 2P"';
        ctx.fillStyle = "#ffcc00";
        ctx.fillText(`Skor Akhir: ${score}`, canvas.width / 2, canvas.height / 2);
        ctx.font = '10px "Press Start 2P"';
        ctx.fillStyle = "#cccccc";
        ctx.fillText(
            "Tekan [R] Ulang Manual | [T] Training AI | [P] Playback",
            canvas.width / 2,
            canvas.height / 2 + 30,
        );
    }
}

// --- Penanganan Perubahan Ukuran Jendela --- (Tetap sama)
function resizeCanvas() {
    if (gameScreen.classList.contains("hidden")) return;
    const container = canvas.parentElement;
    const aspectRatio = 16 / 9;
    const topUiHeight =
        (uiContainer?.offsetHeight ?? 0) +
        (scaleControlContainer?.offsetHeight ?? 0);
    const bottomUiHeight =
        (messageBox?.offsetHeight ?? 0) + (aiControls?.offsetHeight ?? 0);
    const verticalMargin = 30;
    const horizontalMargin = 20;
    const availableHeight =
        window.innerHeight - topUiHeight - bottomUiHeight - verticalMargin;
    const availableWidth = container.clientWidth - horizontalMargin;
    let newWidth, newHeight;
    newWidth = availableWidth;
    newHeight = newWidth / aspectRatio;
    if (newHeight > availableHeight) {
        newHeight = availableHeight;
        newWidth = newHeight * aspectRatio;
    }
    newWidth = Math.max(320, Math.floor(newWidth));
    newHeight = Math.max(180, Math.floor(newHeight));
    canvas.width = newWidth;
    canvas.height = newHeight;
    const uiMaxWidth = `${canvas.width}px`;
    if (uiContainer) uiContainer.style.maxWidth = uiMaxWidth;
    if (messageBox) messageBox.style.maxWidth = uiMaxWidth;
    if (aiControls) aiControls.style.maxWidth = uiMaxWidth;
    if (scaleControlContainer) scaleControlContainer.style.maxWidth = uiMaxWidth;
    initializeSpawnPoints();
    applyGameScale(false);
    if (!aiTrainingActive && !playbackModeActive && !gameRunning) {
        setTimeout(displayGameOver, 0);
    }
    console.log(`Canvas resized to: ${canvas.width}x${canvas.height}`);
}

// --- Fungsi Menerapkan Skala Game --- (Tetap sama)
function applyGameScale(triggeredByUser = true) {
    gameScale = parseFloat(gameScaleSelect.value);
    console.log("Applying game scale:", gameScale);
    scaledSensorRange = CONFIG.sensorRange * gameScale;
    scaledGravity = CONFIG.gravity;
    scaledThrustPower = CONFIG.thrustPower;
    scaledBodyWidth = CONFIG.baseBodyWidth * gameScale;
    scaledBodyHeight = CONFIG.baseBodyHeight * gameScale;
    scaledBoosterWidth = CONFIG.baseBoosterWidth * gameScale;
    scaledBoosterHeight = CONFIG.baseBoosterHeight * gameScale;
    scaledBoosterSeparation = CONFIG.baseBoosterSeparation * gameScale;
    scaledBoosterOffsetY = CONFIG.baseBoosterOffsetY * gameScale;
    baseObstacleMinSize = parseInt(obstacleMinSizeSlider.value);
    baseObstacleMaxSize = parseInt(obstacleMaxSizeSlider.value);
    scaledObstacleMinSize = baseObstacleMinSize * gameScale;
    scaledObstacleMaxSize = baseObstacleMaxSize * gameScale;
    scaledWallThresholdX = CONFIG.wallThresholdX * gameScale;
    scaledWallThresholdY = CONFIG.wallThresholdY * gameScale;
    scaledFloorThreshold = CONFIG.floorThreshold * gameScale;
    scaledTargetSize = CONFIG.targetSize * gameScale;
    if (triggeredByUser) {
        stopAllModes();
        messageBox.textContent = `Game scale changed to ${gameScale}x. Press [R] / [T] / [P].`;
        currentMode.textContent = "Manual";
        gameRunning = false;
        displayGameOver();
        updateButtonStates();
    }
    manualDrone.reset(canvas.width / 2, canvas.height / 3);
    aiDrones.forEach((drone) => drone.reset(canvas.width / 2, canvas.height / 3));
    if (playbackDrone) playbackDrone.reset(canvas.width / 2, canvas.height / 3);
    if (!animationFrameId) {
        lastTimestamp = performance.now();
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}

// --- Inisialisasi & Reset Game --- (Tetap sama)
function resetManualGame() {
    if (aiTrainingActive || playbackModeActive) return;
    gameRunning = true;
    resetObstacles();
    obstacleSpawnTimer = 0;
    score = 0;
    startTime = performance.now();
    lastTimestamp = startTime;
    messageBox.textContent = "Mode Manual Aktif.";
    if (scoreDisplay) scoreDisplay.textContent = `Skor Manual: ${score}`;
    currentMode.textContent = "Manual";
    currentTargets = [];
    targetSpawnCooldown = 0;
    particles = [];
    manualDrone.reset(canvas.width / 2, canvas.height / 3);
    Object.keys(keysPressed).forEach((key) => (keysPressed[key] = false));
    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}
function resetObstacles() {
    obstacles = [];
}

// --- Fungsi Model AI (Simpan/Impor) --- (Tetap sama)
function saveBestModel() {
    const modelToSave = bestGenomeEver;
    if (!modelToSave) {
        messageBox.textContent = "Tidak ada model AI terbaik untuk disimpan.";
        return;
    }
    try {
        const json = JSON.stringify(modelToSave.toJSON());
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const fitness =
            modelToSave.score !== undefined ? Math.round(modelToSave.score) : "N_A";
        a.download = `drone_ai_terbaik_skor_${fitness}_gen_${generation}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
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
    reader.onload = function (e) {
        try {
            const json = JSON.parse(e.target.result);
            const importedGenome = neataptic.Network.fromJSON(json);
            importedGenome.score = json.score !== undefined ? json.score : 0;
            bestGenomeEver = importedGenome;
            updateSavedModelStatus();
            stopAllModes();
            messageBox.textContent = `Model AI (Skor: ${bestGenomeEver.score.toFixed(0)}) diimpor. Tekan [T] untuk lanjut training atau [P] untuk playback.`;
            currentMode.textContent = "Manual (Impor)";
            displayGameOver();
            updateButtonStates();
            console.log("Model imported successfully:", bestGenomeEver);
        } catch (error) {
            messageBox.textContent = "Error importing model: " + error.message;
            console.error("Import error:", error);
            bestGenomeEver = null;
            updateSavedModelStatus();
            updateButtonStates();
        } finally {
            event.target.value = null;
        }
    };
    reader.onerror = function () {
        messageBox.textContent = "Error reading file.";
        console.error("File read error:", reader.error);
    };
    reader.readAsText(file);
}

// --- Fungsi Modal Jaringan --- (Tetap sama)
function openNetworkModal() {
    if (!bestGenomeEver) {
        messageBox.textContent = "Tidak ada model AI terbaik untuk ditampilkan.";
        return;
    }
    try {
        const networkJson = JSON.stringify(bestGenomeEver.toJSON(), null, 2);
        networkJsonDisplay.textContent = networkJson;
        networkModal.style.display = "block";
    } catch (error) {
        messageBox.textContent = "Failed to display network: " + error.message;
        console.error("Network display error:", error);
    }
}
function closeNetworkModalFunc() {
    networkModal.style.display = "none";
    networkJsonDisplay.textContent = "";
}

// --- Logika Layar Konfigurasi --- (Tetap sama)
function populateMutationMethods() {
    const availableMethods = Object.keys(methods.mutation);
    mutationMethodsContainer.innerHTML = "";
    availableMethods.forEach((methodName) => {
        if (
            methodName === "FFW" ||
            methodName === "LSTM" ||
            methodName === "GRU" ||
            methodName === "NARX" ||
            methodName === "Memory"
        )
            return;
        const container = document.createElement("div");
        container.classList.add("flex", "items-center", "mb-1");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `configMethod_${methodName}`;
        checkbox.value = methodName;
        checkbox.name = "mutationMethod";
        checkbox.classList.add(
            "form-checkbox",
            "h-4",
            "w-4",
            "text-blue-600",
            "transition",
            "duration-150",
            "ease-in-out",
        );
        checkbox.checked = CONFIG.mutationMethods.some((m) => {
            try {
                return (
                    methods.mutation[methodName] &&
                    m.name === methods.mutation[methodName].name
                );
            } catch (e) {
                return false;
            }
        });
        const label = document.createElement("label");
        label.htmlFor = checkbox.id;
        label.textContent = methodName
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());
        label.classList.add("ml-2", "text-sm", "text-gray-300");
        container.appendChild(checkbox);
        container.appendChild(label);
        mutationMethodsContainer.appendChild(container);
    });
}
function setupConfigScreenListeners() {
    console.log("setupConfigScreenListeners called");
    configMutationRateSlider.addEventListener("input", (e) => {
        mutationRateValue.textContent = parseFloat(e.target.value).toFixed(2);
    });
    configMutationAmountSlider.addEventListener("input", (e) => {
        mutationAmountValue.textContent = e.target.value;
    });
    configElitismSlider.addEventListener("input", (e) => {
        elitismValue.textContent = `${e.target.value}%`;
    });
    configGravitySlider.addEventListener("input", (e) => {
        gravityValue.textContent = parseFloat(e.target.value).toFixed(2);
    });
    configThrustSlider.addEventListener("input", (e) => {
        thrustValue.textContent = parseFloat(e.target.value).toFixed(2);
    });
    configMaxEnergySlider.addEventListener("input", (e) => {
        maxEnergyValue.textContent = e.target.value;
    });
    configThrustCostSlider.addEventListener("input", (e) => {
        thrustCostValue.textContent = parseFloat(e.target.value).toFixed(2);
    });
    configMaxHealthSlider.addEventListener("input", (e) => {
        maxHealthValue.textContent = e.target.value;
    });
    configRegenRateSlider.addEventListener("input", (e) => {
        regenRateValue.textContent = parseFloat(e.target.value).toFixed(2);
    });
    configSensorRangeSlider.addEventListener("input", (e) => {
        sensorRangeValue.textContent = e.target.value;
    });
    configWallPenaltySlider.addEventListener("input", (e) => {
        wallPenaltyValue.textContent = parseFloat(e.target.value).toFixed(2);
    });
    configFloorPenaltySlider.addEventListener("input", (e) => {
        floorPenaltyValue.textContent = parseFloat(e.target.value).toFixed(2);
    });
    configSafeZoneRewardSlider.addEventListener("input", (e) => {
        safeZoneRewardValue.textContent = parseFloat(e.target.value).toFixed(2);
    });
    configAltitudeRewardSlider.addEventListener("input", (e) => {
        altitudeRewardValue.textContent = parseFloat(e.target.value).toFixed(2);
    });
    configTargetProximityRewardSlider.addEventListener("input", (e) => {
        targetProximityRewardValue.textContent = parseFloat(e.target.value).toFixed(
            1,
        );
    });
    configBodyWidthSlider.addEventListener("input", (e) => {
        bodyWidthValue.textContent = e.target.value;
    });
    configBodyHeightSlider.addEventListener("input", (e) => {
        bodyHeightValue.textContent = e.target.value;
    });
    configBoosterWidthSlider.addEventListener("input", (e) => {
        boosterWidthValue.textContent = e.target.value;
    });
    configBoosterHeightSlider.addEventListener("input", (e) => {
        boosterHeightValue.textContent = e.target.value;
    });
    configBoosterSeparationSlider.addEventListener("input", (e) => {
        boosterSeparationValue.textContent = e.target.value;
    });
    configBoosterOffsetYSlider.addEventListener("input", (e) => {
        boosterOffsetYValue.textContent = e.target.value;
    });
    configMotionBlurToggle.addEventListener("change", (e) => {
        motionBlurIntensityContainer.classList.toggle("hidden", !e.target.checked);
    });
    configMotionBlurIntensitySlider.addEventListener("input", (e) => {
        motionBlurIntensityValue.textContent = parseFloat(e.target.value).toFixed(
            2,
        );
    });
    configTargetSystemEnabled.addEventListener("change", (e) => {
        targetSystemOptionsContainer.classList.toggle("hidden", !e.target.checked);
    });
    configTargetSpawnIntervalSlider.addEventListener("input", (e) => {
        targetSpawnIntervalValue.textContent = `${parseFloat(e.target.value).toFixed(1)}s`;
    });
    configTargetLifetimeSlider.addEventListener("input", (e) => {
        targetLifetimeValue.textContent = `${e.target.value}s`;
    });
    if (startGameButton) {
        console.log("Attaching listener to startGameButton");
        startGameButton.replaceWith(startGameButton.cloneNode(true));
        const newStartGameButton = document.getElementById("startGameButton");
        newStartGameButton.addEventListener("click", () => {
            console.log("Start Game button clicked!");
            CONFIG.mutationRate = parseFloat(configMutationRateSlider.value);
            CONFIG.mutationAmount = parseInt(configMutationAmountSlider.value);
            CONFIG.elitismPercent = parseInt(configElitismSlider.value);
            CONFIG.mutationMethods = [];
            const checkboxes = mutationMethodsContainer.querySelectorAll(
                'input[type="checkbox"]:checked',
            );
            checkboxes.forEach((cb) => {
                if (methods.mutation[cb.value]) {
                    CONFIG.mutationMethods.push(methods.mutation[cb.value]);
                }
            });
            if (CONFIG.mutationMethods.length === 0) {
                console.warn("No mutation methods selected, using MOD_WEIGHT.");
                CONFIG.mutationMethods.push(methods.mutation.MOD_WEIGHT);
            }
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
            CONFIG.targetProximityRewardFactor = parseFloat(
                configTargetProximityRewardSlider.value,
            );
            CONFIG.baseBodyWidth = parseInt(configBodyWidthSlider.value);
            CONFIG.baseBodyHeight = parseInt(configBodyHeightSlider.value);
            CONFIG.baseBoosterWidth = parseInt(configBoosterWidthSlider.value);
            CONFIG.baseBoosterHeight = parseInt(configBoosterHeightSlider.value);
            CONFIG.baseBoosterSeparation = parseInt(
                configBoosterSeparationSlider.value,
            );
            CONFIG.baseBoosterOffsetY = parseInt(configBoosterOffsetYSlider.value);
            CONFIG.motionBlurEnabled = configMotionBlurToggle.checked;
            CONFIG.motionBlurIntensity = parseFloat(
                configMotionBlurIntensitySlider.value,
            );
            CONFIG.targetSystemEnabled = configTargetSystemEnabled.checked;
            CONFIG.targetSpawnIntervalSeconds = parseFloat(
                configTargetSpawnIntervalSlider.value,
            );
            CONFIG.targetLifetimeSeconds = parseFloat(
                configTargetLifetimeSlider.value,
            );
            console.log("Configuration Applied:", CONFIG);
            welcomeScreen.classList.add("hidden");
            gameScreen.classList.remove("hidden");
            resizeCanvas();
            applyGameScale(false);
            updateSavedModelStatus();
            obstacleToggle.checked = obstaclesEnabled;
            stopAllModes();
            gameRunning = false;
            displayGameOver();
            currentMode.textContent = "Manual";
            messageBox.textContent =
                "Tekan [R] Manual | [T] Training AI | [P] Playback.";
            updateButtonStates();
            if (!animationFrameId) {
                startTime = performance.now();
                lastTimestamp = startTime;
                animationFrameId = requestAnimationFrame(gameLoop);
            }
        });
        console.log("Listener ATTACHED to startGameButton");
    } else {
        console.error("Start Game button (startGameButton) not found!");
    }
}

// --- Event Listeners --- (Tetap sama)
window.addEventListener("resize", resizeCanvas);
resetButton.addEventListener("click", switchToManualMode);
startAiButton.addEventListener("click", startAiTraining);
stopAiButton.addEventListener("click", stopAiTraining);
playBestAiButton.addEventListener("click", togglePlaybackMode);
saveModelButton.addEventListener("click", saveBestModel);
importFile.addEventListener("change", importModel);
clearObstaclesButton.addEventListener("click", resetObstacles);
viewNetworkButton.addEventListener("click", openNetworkModal);
closeNetworkModal.addEventListener("click", closeNetworkModalFunc);
window.addEventListener("click", (event) => {
    if (event.target == networkModal) {
        closeNetworkModalFunc();
    }
});
gameScaleSelect.addEventListener("change", () => applyGameScale(true));
obstacleToggle.addEventListener("change", (e) => {
    obstaclesEnabled = e.target.checked;
    if (!gameScreen.classList.contains("hidden")) {
        messageBox.textContent = `Rintangan ${obstaclesEnabled ? "diaktifkan" : "dinonaktifkan"}.`;
    }
    if (!obstaclesEnabled) {
        resetObstacles();
    }
});
populationSizeSlider.addEventListener("input", (e) => {
    populationValue.textContent = e.target.value;
    if (!aiTrainingActive && !playbackModeActive) {
        populationCount = parseInt(e.target.value);
    }
});
trainingSpeedSlider.addEventListener("input", (e) => {
    simulationSpeed = parseInt(e.target.value);
    speedValue.textContent = `${simulationSpeed}x`;
});
obstacleMinSpeedSlider.addEventListener("input", (e) => {
    obstacleMinSpeed = parseFloat(e.target.value);
    obstacleMinSpeedValue.textContent = obstacleMinSpeed.toFixed(1);
    if (obstacleMinSpeed > obstacleMaxSpeed) {
        obstacleMaxSpeedSlider.value = obstacleMinSpeed;
        obstacleMaxSpeed = obstacleMinSpeed;
        obstacleMaxSpeedValue.textContent = obstacleMaxSpeed.toFixed(1);
    }
});
obstacleMaxSpeedSlider.addEventListener("input", (e) => {
    obstacleMaxSpeed = parseFloat(e.target.value);
    obstacleMaxSpeedValue.textContent = obstacleMaxSpeed.toFixed(1);
    if (obstacleMaxSpeed < obstacleMinSpeed) {
        obstacleMinSpeedSlider.value = obstacleMaxSpeed;
        obstacleMinSpeed = obstacleMaxSpeed;
        obstacleMinSpeedValue.textContent = obstacleMinSpeed.toFixed(1);
    }
});
obstacleSpawnIntervalSlider.addEventListener("input", (e) => {
    obstacleSpawnInterval = parseInt(e.target.value);
    obstacleSpawnIntervalValue.textContent = obstacleSpawnInterval;
});
obstacleMinSizeSlider.addEventListener("input", (e) => {
    baseObstacleMinSize = parseInt(e.target.value);
    obstacleMinSizeValue.textContent = baseObstacleMinSize;
    if (baseObstacleMinSize > baseObstacleMaxSize) {
        obstacleMaxSizeSlider.value = baseObstacleMinSize;
        baseObstacleMaxSize = baseObstacleMinSize;
        obstacleMaxSizeValue.textContent = baseObstacleMaxSize;
    }
    applyGameScale(false);
});
obstacleMaxSizeSlider.addEventListener("input", (e) => {
    baseObstacleMaxSize = parseInt(e.target.value);
    obstacleMaxSizeValue.textContent = baseObstacleMaxSize;
    if (baseObstacleMaxSize < baseObstacleMinSize) {
        obstacleMinSizeSlider.value = baseObstacleMaxSize;
        baseObstacleMinSize = baseObstacleMaxSize;
        obstacleMinSizeValue.textContent = baseObstacleMinSize;
    }
    applyGameScale(false);
});

// --- Inisialisasi Saat Halaman Dimuat --- (Tetap sama)
window.onload = () => {
    console.log("window.onload called");
    populateMutationMethods();
    setupConfigScreenListeners();
    configMutationRateSlider.value = CONFIG.mutationRate;
    mutationRateValue.textContent = CONFIG.mutationRate.toFixed(2);
    configMutationAmountSlider.value = CONFIG.mutationAmount;
    mutationAmountValue.textContent = CONFIG.mutationAmount;
    configElitismSlider.value = CONFIG.elitismPercent;
    elitismValue.textContent = `${CONFIG.elitismPercent}%`;
    configGravitySlider.value = CONFIG.gravity;
    gravityValue.textContent = CONFIG.gravity.toFixed(2);
    configThrustSlider.value = CONFIG.thrustPower;
    thrustValue.textContent = CONFIG.thrustPower.toFixed(2);
    configMaxEnergySlider.value = CONFIG.maxEnergy;
    maxEnergyValue.textContent = CONFIG.maxEnergy;
    configThrustCostSlider.value = CONFIG.thrustEnergyCost;
    thrustCostValue.textContent = CONFIG.thrustEnergyCost.toFixed(2);
    configMaxHealthSlider.value = CONFIG.maxHealth;
    maxHealthValue.textContent = CONFIG.maxHealth;
    configRegenRateSlider.value = CONFIG.healthRegenRate;
    regenRateValue.textContent = CONFIG.healthRegenRate.toFixed(2);
    configSensorRangeSlider.value = CONFIG.sensorRange;
    sensorRangeValue.textContent = CONFIG.sensorRange;
    configWallPenaltySlider.value = CONFIG.wallPenalty;
    wallPenaltyValue.textContent = CONFIG.wallPenalty.toFixed(2);
    configFloorPenaltySlider.value = CONFIG.floorPenalty;
    floorPenaltyValue.textContent = CONFIG.floorPenalty.toFixed(2);
    configSafeZoneRewardSlider.value = CONFIG.safeZoneReward;
    safeZoneRewardValue.textContent = CONFIG.safeZoneReward.toFixed(2);
    configAltitudeRewardSlider.value = CONFIG.altitudeReward;
    altitudeRewardValue.textContent = CONFIG.altitudeReward.toFixed(2);
    configTargetProximityRewardSlider.value = CONFIG.targetProximityRewardFactor;
    targetProximityRewardValue.textContent =
        CONFIG.targetProximityRewardFactor.toFixed(1);
    configBodyWidthSlider.value = CONFIG.baseBodyWidth;
    bodyWidthValue.textContent = CONFIG.baseBodyWidth;
    configBodyHeightSlider.value = CONFIG.baseBodyHeight;
    bodyHeightValue.textContent = CONFIG.baseBodyHeight;
    configBoosterWidthSlider.value = CONFIG.baseBoosterWidth;
    boosterWidthValue.textContent = CONFIG.baseBoosterWidth;
    configBoosterHeightSlider.value = CONFIG.baseBoosterHeight;
    boosterHeightValue.textContent = CONFIG.baseBoosterHeight;
    configBoosterSeparationSlider.value = CONFIG.baseBoosterSeparation;
    boosterSeparationValue.textContent = CONFIG.baseBoosterSeparation;
    configBoosterOffsetYSlider.value = CONFIG.baseBoosterOffsetY;
    boosterOffsetYValue.textContent = CONFIG.baseBoosterOffsetY;
    configMotionBlurToggle.checked = CONFIG.motionBlurEnabled;
    motionBlurIntensityContainer.classList.toggle(
        "hidden",
        !CONFIG.motionBlurEnabled,
    );
    configMotionBlurIntensitySlider.value = CONFIG.motionBlurIntensity;
    motionBlurIntensityValue.textContent = CONFIG.motionBlurIntensity.toFixed(2);
    configTargetSystemEnabled.checked = CONFIG.targetSystemEnabled;
    targetSystemOptionsContainer.classList.toggle(
        "hidden",
        !CONFIG.targetSystemEnabled,
    );
    configTargetSpawnIntervalSlider.value = CONFIG.targetSpawnIntervalSeconds;
    targetSpawnIntervalValue.textContent = `${CONFIG.targetSpawnIntervalSeconds.toFixed(1)}s`;
    configTargetLifetimeSlider.value = CONFIG.targetLifetimeSeconds;
    targetLifetimeValue.textContent = `${CONFIG.targetLifetimeSeconds}s`;
    console.log("window.onload finished");
};
