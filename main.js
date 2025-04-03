// --- DOM Elements ---
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
const playBestAiButton = document.getElementById("playBestAiButton");
const generationCount = document.getElementById("generationCount");
const bestFitness = document.getElementById("bestFitness");
const avgFitness = document.getElementById("avgFitness");
const activeDrones = document.getElementById("activeDrones");
const currentMode = document.getElementById("currentMode");
const saveModelButton = document.getElementById("saveModelButton");
const importFile = document.getElementById("importFile");
const savedModelStatus = document.getElementById("savedModelStatus");
const clearObstaclesButton = document.getElementById("clearObstaclesButton");
const viewNetworkButton = document.getElementById("viewNetworkButton");
const networkModal = document.getElementById("networkModal");
const closeNetworkModal = document.getElementById("closeNetworkModal");
const networkJsonDisplay = document.getElementById("networkJsonDisplay");
const obstacleToggle = document.getElementById("obstacleToggle");
const gameScaleSelect = document.getElementById("gameScaleSelect"); // Changed ID
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
// --- Neataptic Setup ---
const { Neat, methods, architect } = neataptic;
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

// --- Game State ---
let animationFrameId;
let gameRunning = true;
let obstacles = [];
let obstacleSpawnTimer = 0;
let obstaclesEnabled = false;
let score = 0;
let playbackScore = 0;
let startTime = 0;
let simulationSpeed = 1;
let gameScale = 1.0; // Added game scale factor

// --- Game Settings (Base values, will be scaled) ---
const BASE_GRAVITY = 0.09;
const BASE_THRUST_POWER = 0.19;
const BASE_SENSOR_RANGE = 250;
const BASE_BODY_WIDTH = 40;
const BASE_BODY_HEIGHT = 18;
const BASE_BOOSTER_WIDTH = 10;
const BASE_BOOSTER_HEIGHT = 20;
const BASE_BOOSTER_SEPARATION = 25;
const BASE_BOOSTER_OFFSET_Y = 0;
const BASE_OBSTACLE_MIN_SIZE = 15; // Base size controlled by sliders now
const BASE_OBSTACLE_MAX_SIZE = 40; // Base size controlled by sliders now

const boosterRotationSpeed = 0.07;
const maxBoosterAngle = Math.PI / 2.5;
const drag = 0.985;
const maxSpeed = 7; // Max speed relative to canvas pixels/frame
const bloomIntensity = 15;
const WALL_THRESHOLD_X = 30;
const WALL_THRESHOLD_Y = 20;
const FLOOR_THRESHOLD = 50;
const MAX_FLOAT_VY = 1.0;
const WALL_PENALTY = 0.3;
const FLOOR_PENALTY = 0.7; // Added floor penalty
const SAFE_ZONE_REWARD = 0.05;
const ALTITUDE_REWARD = 0.06; // Added altitude reward
const IDEAL_ALTITUDE_MIN_RATIO = 0.3; // Lower bound for altitude reward
const IDEAL_ALTITUDE_MAX_RATIO = 0.7; // Upper bound for altitude reward
const HEALTH_REGEN_RATE = 0.15; // Increased health regen rate
const MAX_HEALTH = 200;
const WALL_HIT_DAMAGE = 20;
const BASE_OBSTACLE_DAMAGE = 8;
const OBSTACLE_DAMAGE_SIZE_FACTOR = 0.2;
const OBSTACLE_DAMAGE_SPEED_FACTOR = 3;
const DODGE_SENSOR_THRESHOLD = 0.5; // How close sensor reading triggers dodge
const DODGE_ROTATION_BIAS = 0.8; // How strongly AI dodges

// --- Scaled Game Variables ---
let scaledSensorRange = BASE_SENSOR_RANGE;
let scaledGravity = BASE_GRAVITY;
let scaledThrustPower = BASE_THRUST_POWER;
let scaledBodyWidth = BASE_BODY_WIDTH;
let scaledBodyHeight = BASE_BODY_HEIGHT;
let scaledBoosterWidth = BASE_BOOSTER_WIDTH;
let scaledBoosterHeight = BASE_BOOSTER_HEIGHT;
let scaledBoosterSeparation = BASE_BOOSTER_SEPARATION;
let scaledBoosterOffsetY = BASE_BOOSTER_OFFSET_Y;
let scaledObstacleMinSize = BASE_OBSTACLE_MIN_SIZE;
let scaledObstacleMaxSize = BASE_OBSTACLE_MAX_SIZE;
let scaledWallThresholdX = WALL_THRESHOLD_X;
let scaledWallThresholdY = WALL_THRESHOLD_Y;
let scaledFloorThreshold = FLOOR_THRESHOLD;

// --- Obstacle Settings (Variables) ---
let obstacleMinSpeed = parseFloat(obstacleMinSpeedSlider.value);
let obstacleMaxSpeed = parseFloat(obstacleMaxSpeedSlider.value);
let obstacleSpawnInterval = parseInt(obstacleSpawnIntervalSlider.value);
// Update base sizes from sliders
let baseObstacleMinSize = parseInt(obstacleMinSizeSlider.value);
let baseObstacleMaxSize = parseInt(obstacleMaxSizeSlider.value);

// --- Drone Object (Base structure) ---
const baseDrone = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    health: MAX_HEALTH,
    thrusting: false,
    bodyColor: "#FFFFFF",
    boosterColor: "#CCCCCC",
    boosterActiveColor: "#FF5722",
    boosterFlameColor1: "rgba(255, 165, 0, 0.9)",
    boosterFlameColor2: "rgba(255, 87, 34, 0.7)",
    bodyWidth: scaledBodyWidth,
    bodyHeight: scaledBodyHeight,
    boosterWidth: scaledBoosterWidth,
    boosterHeight: scaledBoosterHeight,
    boosterSeparation: scaledBoosterSeparation,
    boosterOffsetY: scaledBoosterOffsetY,
    leftBoosterAngle: 0,
    rightBoosterAngle: 0,
    isManual: false,
    isPlayback: false,
    alive: true,
    score: 0,
    sensors: {
        // Reduced sensors
        distBottom: 0,
        distLeftWall: 0,
        distRightWall: 0,
        velX: 0,
        velY: 0,
        // 6 Obstacle sensors
        obsDistForward: 1,
        obsDistLeft: 1,
        obsDistRight: 1,
        obsDistFwdLeft: 1,
        obsDistFwdRight: 1,
        obsDistDown: 1,
        // Health sensor
        currentHealth: 1,
    },
    draw() {
    /* Same draw method using scaled dimensions */ ctx.save();
        if ((this.isManual || this.isPlayback) && this.alive) {
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
        const bodyX = this.x - this.bodyWidth / 2;
        const bodyY = this.y - this.bodyHeight / 2;
        ctx.fillRect(bodyX, bodyY, this.bodyWidth, this.bodyHeight);
        ctx.fillStyle = "#ADD8E6";
        ctx.fillRect(
            this.x - 2 * gameScale,
            bodyY - 5 * gameScale,
            4 * gameScale,
            5 * gameScale,
        );
        const leftBoosterAttachX = this.x - this.boosterSeparation;
        const rightBoosterAttachX = this.x + this.boosterSeparation;
        const boosterAttachY = this.y + this.boosterOffsetY;
        this.drawBooster(leftBoosterAttachX, boosterAttachY, this.leftBoosterAngle);
        this.drawBooster(
            rightBoosterAttachX,
            boosterAttachY,
            this.rightBoosterAngle,
        );
        if ((this.isManual || this.isPlayback) && this.alive) {
            const barWidth = this.bodyWidth * 0.8;
            const barHeight = 4 * gameScale;
            const barX = this.x - barWidth / 2;
            const barY = bodyY - barHeight - 4 * gameScale;
            const healthRatio = Math.max(0, this.health / MAX_HEALTH);
            ctx.fillStyle = "#4a5568";
            ctx.fillRect(barX, barY, barWidth, barHeight);
            ctx.fillStyle = healthRatio > 0.25 ? "#4ade80" : "#f87171";
            ctx.fillRect(barX, barY, barWidth * healthRatio, barHeight);
        }
        ctx.restore();
    },
    drawBooster(attachX, attachY, angle) {
    /* Same drawBooster method using scaled dimensions */ ctx.save();
        ctx.translate(attachX, attachY);
        ctx.rotate(angle);
        const flameBaseY = this.boosterHeight / 2;
        if (this.thrusting) {
            ctx.shadowColor = this.boosterFlameColor1;
            ctx.shadowBlur = bloomIntensity;
            const flameLength = (20 + Math.random() * 8) * gameScale;
            const grad = ctx.createLinearGradient(
                0,
                flameBaseY,
                0,
                flameBaseY + flameLength,
            );
            grad.addColorStop(0, this.boosterFlameColor1);
            grad.addColorStop(1, this.boosterFlameColor2);
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.moveTo(0, flameBaseY);
            ctx.lineTo(-this.boosterWidth / 3, flameBaseY + flameLength * 0.6);
            ctx.lineTo(0, flameBaseY + flameLength);
            ctx.lineTo(this.boosterWidth / 3, flameBaseY + flameLength * 0.6);
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
        // Update sensors using scaled range
        this.sensors.distBottom = Math.max(
            0,
            Math.min(1, (canvas.height - this.y) / canvas.height),
        );
        this.sensors.distLeftWall = Math.max(0, Math.min(1, this.x / canvas.width));
        this.sensors.distRightWall = Math.max(
            0,
            Math.min(1, (canvas.width - this.x) / canvas.width),
        );
        this.sensors.velX = this.vx / maxSpeed;
        this.sensors.velY = this.vy / maxSpeed;
        // Reduced obstacle sensors
        this.sensors.obsDistForward = this.getMinObstacleDistInDir(0, -1);
        this.sensors.obsDistLeft = this.getMinObstacleDistInDir(-1, 0);
        this.sensors.obsDistRight = this.getMinObstacleDistInDir(1, 0);
        this.sensors.obsDistFwdLeft = this.getMinObstacleDistInDir(-0.707, -0.707);
        this.sensors.obsDistFwdRight = this.getMinObstacleDistInDir(0.707, -0.707);
        this.sensors.obsDistDown = this.getMinObstacleDistInDir(0, 1);
        // Health sensor
        this.sensors.currentHealth = Math.max(0, this.health / MAX_HEALTH);
    },
    getMinObstacleDistInDir(dx, dy) {
    /* Same getMinObstacleDistInDir method using scaled range */ let minDistSq =
            scaledSensorRange * scaledSensorRange;
        let detected = false;
        obstacles.forEach((obs) => {
            const obsDx = obs.x + obs.size / 2 - this.x;
            const obsDy = obs.y + obs.size / 2 - this.y;
            const dotProduct = obsDx * dx + obsDy * dy;
            if (dotProduct > 0) {
                const distSq = obsDx * obsDx + obsDy * obsDy;
                if (distSq < scaledSensorRange * scaledSensorRange) {
                    const closestPointDistSq = this.distSqPointToSegment(
                        this.x,
                        this.y,
                        this.x + dx * scaledSensorRange,
                        this.y + dy * scaledSensorRange,
                        obs.x + obs.size / 2,
                        obs.y + obs.size / 2,
                    );
                    const obstacleRadiusSq = (obs.size / 1.5) * (obs.size / 1.5);
                    if (closestPointDistSq < obstacleRadiusSq && distSq < minDistSq) {
                        minDistSq = distSq;
                        detected = true;
                    }
                }
            }
        });
        return detected ? Math.sqrt(minDistSq) / scaledSensorRange : 1.0;
    },
    distSqPointToSegment(x1, y1, x2, y2, px, py) {
    /* Same helper method */ const l2 =
            (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
        if (l2 === 0) return (px - x1) * (px - x1) + (py - y1) * (py - y1);
        let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
        t = Math.max(0, Math.min(1, t));
        const projX = x1 + t * (x2 - x1);
        const projY = y1 + t * (y2 - y1);
        return (px - projX) * (px - projX) + (py - projY) * (py - projY);
    },
    takeDamage(amount) {
    /* Same takeDamage method */ if (!this.alive) return;
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            this.alive = false;
            if (this.isManual) {
                messageBox.textContent = "Drone Hancur!";
                gameRunning = false;
            } else if (this.isPlayback) {
                messageBox.textContent = "Playback Selesai (Hancur).";
                playbackModeActive = false;
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
            thrustInput = inputData.thrust > 0.5;
            let baseRotationInput = inputData.rotation * 2 - 1;
            // --- AI Counter-Maneuvering Logic (using updated sensor indices) ---
            let dodgeBias = 0;
            // Indices: Fwd=5, Left=6, Right=7, FwdL=8, FwdR=9, Down=10
            if (this.sensors.obsDistLeft < DODGE_SENSOR_THRESHOLD) {
                dodgeBias += DODGE_ROTATION_BIAS;
            }
            if (this.sensors.obsDistRight < DODGE_SENSOR_THRESHOLD) {
                dodgeBias -= DODGE_ROTATION_BIAS;
            }
            // Slightly weaker bias for diagonals
            if (this.sensors.obsDistFwdLeft < DODGE_SENSOR_THRESHOLD) {
                dodgeBias += DODGE_ROTATION_BIAS * 0.7;
            }
            if (this.sensors.obsDistFwdRight < DODGE_SENSOR_THRESHOLD) {
                dodgeBias -= DODGE_ROTATION_BIAS * 0.7;
            }
            // Bias for forward sensor
            if (this.sensors.obsDistForward < DODGE_SENSOR_THRESHOLD * 0.8) {
                dodgeBias +=
                    DODGE_ROTATION_BIAS *
                    0.5 *
                    (this.sensors.obsDistRight > this.sensors.obsDistLeft ? 1 : -1);
            } // Turn away from closer side if front blocked

            rotationInput = Math.max(-1, Math.min(1, baseRotationInput + dodgeBias));
        }
        // Apply rotation
        const rotationChange = rotationInput * boosterRotationSpeed;
        this.leftBoosterAngle = Math.max(
            -maxBoosterAngle,
            Math.min(maxBoosterAngle, this.leftBoosterAngle + rotationChange),
        );
        this.rightBoosterAngle = Math.max(
            -maxBoosterAngle,
            Math.min(maxBoosterAngle, this.rightBoosterAngle + rotationChange),
        );
        // Apply Thrust
        this.thrusting = thrustInput;
        if (this.thrusting) {
            const leftThrustDirWorld = this.leftBoosterAngle - Math.PI / 2;
            this.vx += Math.cos(leftThrustDirWorld) * scaledThrustPower;
            this.vy += Math.sin(leftThrustDirWorld) * scaledThrustPower;
            const rightThrustDirWorld = this.rightBoosterAngle - Math.PI / 2;
            this.vx += Math.cos(rightThrustDirWorld) * scaledThrustPower;
            this.vy += Math.sin(rightThrustDirWorld) * scaledThrustPower;
        }
        // Apply Gravity
        this.vy += scaledGravity;
        this.vx *= drag;
        this.vy *= drag;
        const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (currentSpeed > maxSpeed) {
            this.vx = (this.vx / currentSpeed) * maxSpeed;
            this.vy = (this.vy / currentSpeed) * maxSpeed;
        }
        this.x += this.vx;
        this.y += this.vy;

        // --- Penalties, Rewards, Floating Check ---
        let nearWall = false;
        let nearFloor = false;
        let inSafeZone = false;
        let isFloating = false;
        if (!this.isManual) {
            nearWall =
                this.x < scaledWallThresholdX ||
                this.x > canvas.width - scaledWallThresholdX ||
                this.y < scaledWallThresholdY;
            nearFloor = this.y > canvas.height - scaledFloorThreshold;
            const safeZoneMargin = canvas.width * 0.2;
            inSafeZone =
                this.x > safeZoneMargin && this.x < canvas.width - safeZoneMargin;
            isFloating = !nearWall && !nearFloor && Math.abs(this.vy) < MAX_FLOAT_VY;
        }
        // --- Boundary Checks & Damage ---
        const horzBuffer = this.bodyWidth / 2;
        const vertBuffer = this.bodyHeight / 2;
        let hitWall = false;
        if (this.x < horzBuffer) {
            this.x = horzBuffer;
            this.vx *= -0.3;
            hitWall = true;
        } else if (this.x > canvas.width - horzBuffer) {
            this.x = canvas.width - horzBuffer;
            this.vx *= -0.3;
            hitWall = true;
        }
        if (this.y < vertBuffer) {
            this.y = vertBuffer;
            this.vy = 0;
            hitWall = true;
        }
        if (this.y > canvas.height - vertBuffer) {
            this.y = canvas.height - vertBuffer;
            this.vy *= -0.3;
            hitWall = true;
        } // Bottom wall collision
        if (hitWall) {
            this.takeDamage(WALL_HIT_DAMAGE);
        }
        // Failsafe
        if (this.y > canvas.height + this.bodyHeight * 2) {
            this.alive = false;
            if (this.isManual) {
                messageBox.textContent = "Drone hilang!";
                gameRunning = false;
            } else if (this.isPlayback) {
                messageBox.textContent = "Playback Selesai (Jatuh).";
                playbackModeActive = false;
            }
        }

        // --- Obstacle Collision & Damage ---
        let collidingWithObstacle = false;
        obstacles.forEach((obs) => {
            if (this.checkCollision(obs)) {
                collidingWithObstacle = true;
                const speedFactor = currentSpeed / maxSpeed;
                const sizeFactor =
                    obs.size / ((scaledObstacleMinSize + scaledObstacleMaxSize) / 2);
                const damage =
                    BASE_OBSTACLE_DAMAGE +
                    sizeFactor * OBSTACLE_DAMAGE_SIZE_FACTOR * BASE_OBSTACLE_DAMAGE +
                    speedFactor * OBSTACLE_DAMAGE_SPEED_FACTOR;
                this.takeDamage(damage);
            }
        });

        // --- Score, Penalties, Rewards, Regen ---
        if (this.alive) {
            this.score++;
            if (!this.isManual) {
                if (nearWall) {
                    this.score -= WALL_PENALTY;
                }
                if (nearFloor) {
                    this.score -= FLOOR_PENALTY;
                } // Added floor penalty
                if (inSafeZone) {
                    this.score += SAFE_ZONE_REWARD;
                }
                // Altitude Reward Check
                const idealMinY = canvas.height * IDEAL_ALTITUDE_MIN_RATIO;
                const idealMaxY = canvas.height * IDEAL_ALTITUDE_MAX_RATIO;
                if (this.y > idealMinY && this.y < idealMaxY) {
                    this.score += ALTITUDE_REWARD;
                }
                // Health Regen Check
                if (isFloating && !collidingWithObstacle) {
                    this.health = Math.min(MAX_HEALTH, this.health + HEALTH_REGEN_RATE);
                }
            }
        } else if (!this.isManual && !this.isPlayback && this.genome) {
            this.genome.score = Math.max(0, this.score);
        }
        if (!this.isManual) {
            this.updateSensors();
        }
    },
    checkCollision(obstacle) {
    /* Same checkCollision method using scaled dimensions */ const bodyTop =
            this.y - this.bodyHeight / 2;
        const bodyBottom = this.y + this.bodyHeight / 2;
        const bodyLeft = this.x - this.bodyWidth / 2;
        const bodyRight = this.x + this.bodyWidth / 2;
        const bodyCollision =
            bodyLeft < obstacle.x + obstacle.size &&
            bodyRight > obstacle.x &&
            bodyTop < obstacle.y + obstacle.size &&
            bodyBottom > obstacle.y;
        if (bodyCollision) return true;
        return false;
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
        this.health = MAX_HEALTH;
        // Apply current scale to dimensions
        this.bodyWidth = scaledBodyWidth;
        this.bodyHeight = scaledBodyHeight;
        this.boosterWidth = scaledBoosterWidth;
        this.boosterHeight = scaledBoosterHeight;
        this.boosterSeparation = scaledBoosterSeparation;
        this.boosterOffsetY = scaledBoosterOffsetY;
        if (!this.isManual) this.updateSensors();
    },
};

// --- Create Manual Drone Instance ---
const manualDrone = {
    ...baseDrone,
    isManual: true,
    bodyColor: "#0d6efd",
    boosterColor: "#0a58ca",
};

// --- Obstacle Object ---
function createObstacle() {
    // Use scaled size range
    const size =
        scaledObstacleMinSize +
        Math.random() * (scaledObstacleMaxSize - scaledObstacleMinSize);
    let x, y, vx, vy;
    const edge = Math.floor(Math.random() * 4);
    const speed =
        obstacleMinSpeed + Math.random() * (obstacleMaxSpeed - obstacleMinSpeed);
    switch (edge) {
        case 0:
            x = Math.random() * canvas.width;
            y = -size;
            break;
        case 1:
            x = canvas.width + size;
            y = Math.random() * canvas.height;
            break;
        case 2:
            x = Math.random() * canvas.width;
            y = canvas.height + size;
            break;
        case 3:
            x = -size;
            y = Math.random() * canvas.height;
            break;
    }
    const targetX =
        canvas.width / 2 + (Math.random() - 0.5) * (canvas.width * 0.6);
    const targetY =
        canvas.height / 3 + (Math.random() - 0.5) * (canvas.height * 0.4);
    const dx = targetX - x;
    const dy = targetY - y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    vx = (dx / dist) * speed;
    vy = (dy / dist) * speed;
    const points = 5 + Math.floor(Math.random() * 6);
    const shapePoints = [];
    for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const radius = (size / 2) * (0.7 + Math.random() * 0.6);
        shapePoints.push({
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
        });
    }
    return {
        x,
        y,
        vx,
        vy,
        size,
        color: `hsl(${Math.random() * 30 + 20}, 60%, ${40 + Math.random() * 20}%)`,
        shapePoints,
        draw() {
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

// --- Input Handling --- (No changes needed)
const keysPressed = {};
window.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    keysPressed[key] = true;
    if (key === "r") {
        switchToManualMode();
        e.preventDefault();
    } else if (key === "t") {
        toggleAiTraining();
        e.preventDefault();
    } else if (key === "p") {
        togglePlaybackMode();
        e.preventDefault();
    } else if (
        (aiTrainingActive || playbackModeActive) &&
        [
            "arrowup",
            "arrowdown",
            "arrowleft",
            "arrowright",
            "w",
            "a",
            "s",
            "d",
        ].includes(key)
    ) {
        e.preventDefault();
    } else if (
        !aiTrainingActive &&
        !playbackModeActive &&
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
        e.preventDefault();
    }
});
window.addEventListener("keyup", (e) => {
    keysPressed[e.key.toLowerCase()] = false;
});
function getManualInput() {
    return {
        left: keysPressed["a"] || keysPressed["arrowleft"],
        right: keysPressed["d"] || keysPressed["arrowright"],
        thrust: keysPressed["w"] || keysPressed["arrowup"],
    };
}

// --- Mode Switching Logic --- (No changes needed)
function stopAllModes() {
    aiTrainingActive = false;
    playbackModeActive = false;
    gameRunning = false;
    aiDrones = [];
    playbackDrone = null;
    activeDrones.textContent = 0;
    resetButton.disabled = false;
    startAiButton.disabled = false;
    playBestAiButton.disabled = false;
    startAiButton.textContent = "Mulai AI [T]";
    startAiButton.classList.remove("bg-yellow-600", "hover:bg-yellow-700");
    startAiButton.classList.add("bg-green-600", "hover:bg-green-700");
    playBestAiButton.textContent = "Playback AI [P]";
    playBestAiButton.classList.remove("bg-red-600", "hover:bg-red-700");
    playBestAiButton.classList.add("bg-cyan-600", "hover:bg-cyan-700");
    aiScoreDisplay.classList.add("hidden");
    playbackScoreDisplay.classList.add("hidden");
    scoreDisplay.classList.remove("hidden");
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}
function switchToManualMode() {
    stopAllModes();
    currentMode.textContent = "Manual";
    messageBox.textContent = "Mode Manual. Tekan 'R' untuk mulai.";
    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}

// --- AI / NEAT Functions ---

function initializeNeat() {
    const numInputs = 12; // Reduced: 6 obs + 3 dist + 2 vel + 1 health
    const numOutputs = 2;
    neat = new Neat(numInputs, numOutputs, null, {
        population: populationCount,
        elitism: Math.round(0.1 * populationCount),
        mutationRate: 0.6, // User's value
        mutationAmount: 4,
        network: architect.Random(
            numInputs,
            Math.ceil(numInputs / 1.5),
            numOutputs,
        ),
        methods: [
      /* Same mutation methods */ methods.mutation.ADD_NODE,
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
    });
    generation = 0;
    highestFitness = 0;
    averageFitness = 0;
    bestGenomeEver = null;
    updateSavedModelStatus();
    console.log(
        "NEAT Initialized. Inputs:",
        numInputs,
        "Pop:",
        populationCount,
        "Mutation Rate:",
        neat.mutationRate,
        "Amount:",
        neat.mutationAmount,
    );
}

function createAiDrones() {
  /* Same createAiDrones */ aiDrones = [];
    if (!neat || !neat.population) return;
    for (let i = 0; i < neat.population.length; i++) {
        const drone = { ...baseDrone };
        drone.isManual = false;
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
            // Get 12 inputs (Reduced sensors)
            const inputs = [
                drone.sensors.distBottom,
                drone.sensors.distLeftWall,
                drone.sensors.distRightWall, // 0, 1, 2
                drone.sensors.velX,
                drone.sensors.velY, // 3, 4
                drone.sensors.obsDistForward, // 5
                drone.sensors.obsDistLeft, // 6
                drone.sensors.obsDistRight, // 7
                drone.sensors.obsDistFwdLeft, // 8
                drone.sensors.obsDistFwdRight, // 9
                drone.sensors.obsDistDown, // 10
                drone.sensors.currentHealth, // 11
            ];
            const output = drone.genome.activate(inputs);
            const aiInput = { thrust: output[0], rotation: output[1] };
            drone.update(aiInput); // update handles counter-maneuvering based on sensors
        }
    });
    activeDrones.textContent = activeCount;
    if (activeCount === 0 && aiTrainingActive) {
        evolvePopulation();
        resetObstacles();
        createAiDrones();
    }
}

function evolvePopulation() {
  /* Same evolvePopulation logic */ if (
        !neat ||
        !neat.population ||
        neat.population.length === 0
    )
        return;
    console.log(`Gen ${generation} finished. Evaluating...`);
    neat.sort();
    const currentBest = neat.getFittest();
    highestFitness = currentBest.score;
    averageFitness = neat.getAverage();
    if (!bestGenomeEver || highestFitness > bestGenomeEver.score) {
        bestGenomeEver = neataptic.Network.fromJSON(currentBest.toJSON());
        bestGenomeEver.score = highestFitness;
        updateSavedModelStatus();
        console.log(`New best ever! Fitness: ${highestFitness.toFixed(0)}`);
    }
    console.log(
        `Best Fit: ${highestFitness.toFixed(0)}, Avg Fit: ${averageFitness.toFixed(0)}`,
    );
    bestFitness.textContent = highestFitness.toFixed(0);
    avgFitness.textContent = averageFitness.toFixed(2);
    aiScoreDisplay.textContent = `Skor AI Terbaik: ${highestFitness.toFixed(0)}`;
    const newPopulation = [];
    for (let i = 0; i < neat.elitism; i++) {
        newPopulation.push(neat.population[i]);
    }
    for (let i = 0; i < neat.population.length - neat.elitism; i++) {
        newPopulation.push(neat.getOffspring());
    }
    neat.population = newPopulation;
    neat.mutate();
    generation++;
    generationCount.textContent = generation;
    console.log(`Evolved to Gen ${generation}`);
}

function toggleAiTraining() {
  /* Same toggleAiTraining logic */ if (playbackModeActive) {
        stopAllModes();
        messageBox.textContent = "Playback dihentikan. Tekan 'T' lagi.";
        return;
    }
    aiTrainingActive = !aiTrainingActive;
    if (aiTrainingActive) {
        stopAllModes();
        aiTrainingActive = true;
        gameRunning = false;
        resetButton.disabled = true;
        startAiButton.textContent = "Stop AI [T]";
        startAiButton.classList.remove("bg-green-600", "hover:bg-green-700");
        startAiButton.classList.add("bg-yellow-600", "hover:bg-yellow-700");
        playBestAiButton.disabled = true;
        messageBox.textContent = "AI Training Dimulai...";
        currentMode.textContent = "AI Training";
        aiScoreDisplay.classList.remove("hidden");
        scoreDisplay.classList.add("hidden");
        populationCount = parseInt(populationSizeSlider.value);
        initializeNeat();
        resetObstacles();
        createAiDrones();
        startTime = performance.now();
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(gameLoop);
        }
    } else {
        stopAllModes();
        messageBox.textContent = "AI Dihentikan. Mode Manual.";
        currentMode.textContent = "Manual";
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(gameLoop);
        }
    }
}

// --- Playback Mode Functions ---
function togglePlaybackMode() {
  /* Same togglePlaybackMode logic */ if (aiTrainingActive) {
        stopAllModes();
        messageBox.textContent = "Training dihentikan. Tekan 'P' lagi.";
        return;
    }
    playbackModeActive = !playbackModeActive;
    if (playbackModeActive) {
        if (!bestGenomeEver) {
            messageBox.textContent = "Tidak ada model AI terbaik. Latih AI dulu.";
            playbackModeActive = false;
            return;
        }
        stopAllModes();
        playbackModeActive = true;
        gameRunning = false;
        resetButton.disabled = true;
        startAiButton.disabled = true;
        playBestAiButton.textContent = "Stop Playback [P]";
        playBestAiButton.classList.remove("bg-cyan-600", "hover:bg-cyan-700");
        playBestAiButton.classList.add("bg-red-600", "hover:bg-red-700");
        messageBox.textContent = "Memulai Playback AI Terbaik...";
        currentMode.textContent = "Playback AI";
        playbackScoreDisplay.classList.remove("hidden");
        scoreDisplay.classList.add("hidden");
        aiScoreDisplay.classList.add("hidden");
        playbackDrone = { ...baseDrone };
        playbackDrone.isPlayback = true;
        playbackDrone.bodyColor = "#facc15";
        playbackDrone.boosterColor = "#eab308";
        playbackDrone.genome = bestGenomeEver;
        playbackDrone.reset(canvas.width / 2, canvas.height / 3);
        playbackScore = 0;
        playbackScoreDisplay.textContent = `Skor Playback: 0`;
        resetObstacles();
        startTime = performance.now();
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(gameLoop);
        }
    } else {
        stopAllModes();
        messageBox.textContent = "Playback Dihentikan. Mode Manual.";
        currentMode.textContent = "Manual";
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(gameLoop);
        }
    }
}

function runPlayback() {
    /* Same runPlayback, uses 12 inputs */
    if (!playbackModeActive || !playbackDrone || !playbackDrone.alive) {
        if (playbackDrone && !playbackDrone.alive && playbackModeActive) {
            stopAllModes();
            messageBox.textContent = `Playback Selesai. Skor: ${playbackScore}. Mode Manual.`;
            currentMode.textContent = "Manual";
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(gameLoop);
            }
        }
        return;
    }
    // Get 12 inputs
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
    ];
    const output = playbackDrone.genome.activate(inputs);
    const aiInput = { thrust: output[0], rotation: output[1] };
    playbackDrone.update(aiInput);
    playbackScore = Math.max(0, Math.floor(playbackDrone.score));
    playbackScoreDisplay.textContent = `Skor Playback: ${playbackScore}`;
}

// --- Game Loop ---
function gameLoop(currentTime) {
  /* Same gameLoop structure */ if (!startTime) {
        startTime = currentTime;
    }
    const currentSimSpeed = aiTrainingActive ? simulationSpeed : 1;
    for (let i = 0; i < currentSimSpeed; i++) {
        if (i === 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        obstacleSpawnTimer++;
        const currentSpawnInterval = aiTrainingActive
            ? obstacleSpawnInterval / currentSimSpeed
            : obstacleSpawnInterval;
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
            aiDrones.forEach((drone) => {
                if (drone.alive) drone.draw();
            });
        } else if (playbackModeActive) {
            runPlayback();
            if (playbackDrone && playbackDrone.alive) playbackDrone.draw();
        } else {
            if (gameRunning) {
                const manualInput = getManualInput();
                manualDrone.update(manualInput);
                score = Math.max(0, Math.floor(manualDrone.score));
                scoreDisplay.textContent = `Skor Manual: ${score}`;
                if (manualDrone.alive) manualDrone.draw();
            } else {
                displayGameOver();
            }
        }
        if (i === 0) {
            obstacles.forEach((obs) => obs.draw());
        }
    }
    animationFrameId = requestAnimationFrame(gameLoop);
}

function displayGameOver() {
  /* Same displayGameOver */ ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
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

// --- Resize Handling --- (Restored responsive behavior)
function resizeCanvas() {
    const container = canvas.parentElement;
    const aspectRatio = 16 / 9;
    const topUiHeight =
        uiContainer.offsetHeight +
        document.getElementById("scaleControlContainer").offsetHeight; // Include scale selector height
    const bottomUiHeight = messageBox.offsetHeight + aiControls.offsetHeight;
    const verticalMargin = 30;
    const availableHeight =
        window.innerHeight - topUiHeight - bottomUiHeight - verticalMargin;
    const availableWidth = container.clientWidth * 0.98;
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
    if (uiContainer) uiContainer.style.maxWidth = `${canvas.width}px`;
    if (messageBox) messageBox.style.maxWidth = `${canvas.width}px`;
    if (aiControls) aiControls.style.maxWidth = `${canvas.width}px`;
    const scaleControlContainer = document.getElementById(
        "scaleControlContainer",
    );
    if (scaleControlContainer)
        scaleControlContainer.style.maxWidth = `${canvas.width}px`;
    if (!aiTrainingActive && !playbackModeActive && !gameRunning) {
        displayGameOver();
    }
    console.log(`Canvas resized to: ${canvas.width}x${canvas.height}`);
    // Re-apply scale and reset drone positions after canvas resize
    applyGameScale(false); // Pass false to avoid double reset message if called from window resize
}

// --- Apply Game Scale and Reset ---
function applyGameScale(showResetMessage = true) {
    // Added parameter to control message
    gameScale = parseFloat(gameScaleSelect.value);
    console.log("Applying game scale:", gameScale);

    // Update scaled variables
    scaledSensorRange = BASE_SENSOR_RANGE * gameScale;
    scaledGravity = BASE_GRAVITY; // Keep constant
    scaledThrustPower = BASE_THRUST_POWER; // Keep constant
    scaledBodyWidth = BASE_BODY_WIDTH * gameScale;
    scaledBodyHeight = BASE_BODY_HEIGHT * gameScale;
    scaledBoosterWidth = BASE_BOOSTER_WIDTH * gameScale;
    scaledBoosterHeight = BASE_BOOSTER_HEIGHT * gameScale;
    scaledBoosterSeparation = BASE_BOOSTER_SEPARATION * gameScale;
    scaledBoosterOffsetY = BASE_BOOSTER_OFFSET_Y * gameScale;
    // Update scaled obstacle sizes based on BASE sizes from sliders
    baseObstacleMinSize = parseInt(obstacleMinSizeSlider.value);
    baseObstacleMaxSize = parseInt(obstacleMaxSizeSlider.value);
    scaledObstacleMinSize = baseObstacleMinSize * gameScale;
    scaledObstacleMaxSize = baseObstacleMaxSize * gameScale;
    // Scale thresholds
    scaledWallThresholdX = WALL_THRESHOLD_X * gameScale;
    scaledWallThresholdY = WALL_THRESHOLD_Y * gameScale;
    scaledFloorThreshold = FLOOR_THRESHOLD * gameScale;

    // Stop everything before reset only if triggered by user change, not window resize
    if (showResetMessage) {
        stopAllModes();
        messageBox.textContent = `Skala game diubah ke ${gameScale}x. Tekan [R] / [T] / [P].`;
        currentMode.textContent = "Manual";
        displayGameOver();
    }

    // Re-initialize manual drone position and apply scaled dimensions
    manualDrone.reset(canvas.width / 2, canvas.height / 3);
    // Reset AI drones and playback drone if they exist
    aiDrones.forEach((drone) => drone.reset(canvas.width / 2, canvas.height / 3));
    if (playbackDrone) playbackDrone.reset(canvas.width / 2, canvas.height / 3);

    // Restart the game loop if it was stopped
    if (!animationFrameId && showResetMessage) {
        // Only restart if stopped by user action
        animationFrameId = requestAnimationFrame(gameLoop);
    } else if (!animationFrameId) {
        // Ensure loop is running after resize event
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}

// --- Game Initialization ---
function resetManualGame() {
    if (aiTrainingActive || playbackModeActive) return;
    stopAllModes();
    gameRunning = true;
    resetObstacles();
    obstacleSpawnTimer = 0;
    score = 0;
    startTime = performance.now();
    messageBox.textContent = "Mode Manual Aktif.";
    scoreDisplay.textContent = `Skor Manual: ${score}`;
    currentMode.textContent = "Manual";
    manualDrone.reset(canvas.width / 2, canvas.height / 3); // Applies current scale
    Object.keys(keysPressed).forEach((key) => (keysPressed[key] = false));
    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}
function resetObstacles() {
    obstacles = [];
}

// --- Model Export/Import --- (No changes needed)
function saveBestModel() {
  /* Same saveBestModel */ const modelToSave = bestGenomeEver;
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
        const fitness = modelToSave.score ? Math.round(modelToSave.score) : "N/A";
        a.download = `drone_ai_terbaik_fit_${fitness}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        messageBox.textContent = `Model AI terbaik (Fitness: ${fitness}) berhasil disimpan.`;
        console.log("Best model saved.");
    } catch (error) {
        messageBox.textContent = "Error saat simpan model: " + error.message;
        console.error("Save error:", error);
    }
}
function importModel(event) {
  /* Same importModel */ const file = event.target.files[0];
    if (!file) {
        messageBox.textContent = "Tidak ada file dipilih.";
        return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const json = JSON.parse(e.target.result);
            const importedGenome = neataptic.Network.fromJSON(json);
            bestGenomeEver = importedGenome;
            bestGenomeEver.score = json.score || 0;
            updateSavedModelStatus();
            stopAllModes();
            setTimeout(() => {
                startImportedTraining(importedGenome);
            }, 100);
        } catch (error) {
            messageBox.textContent = "Error saat import model: " + error.message;
            console.error("Import error:", error);
        } finally {
            event.target.value = null;
        }
    };
    reader.onerror = function () {
        messageBox.textContent = "Error membaca file.";
        console.error("File reading error:", reader.error);
    };
    reader.readAsText(file);
}
function startImportedTraining(importedGenome) {
  /* Same startImportedTraining */ messageBox.textContent = `Model AI diimport. Memulai training...`;
    console.log("Imported genome:", importedGenome);
    aiTrainingActive = true;
    gameRunning = false;
    playbackModeActive = false;
    resetButton.disabled = true;
    startAiButton.textContent = "Stop AI [T]";
    startAiButton.classList.remove("bg-green-600", "hover:bg-green-700");
    startAiButton.classList.add("bg-yellow-600", "hover:bg-yellow-700");
    playBestAiButton.disabled = true;
    currentMode.textContent = "AI Training (Imported)";
    aiScoreDisplay.classList.remove("hidden");
    scoreDisplay.classList.add("hidden");
    playbackScoreDisplay.classList.add("hidden");
    populationCount = parseInt(populationSizeSlider.value);
    initializeNeat();
    neat.population = [];
    for (let i = 0; i < populationCount; i++) {
        let newGenome = neataptic.Network.fromJSON(importedGenome.toJSON());
        if (i > 0) {
            newGenome.mutate(methods.mutation.MOD_WEIGHT);
        }
        neat.population.push(newGenome);
    }
    generation = 0;
    highestFitness = 0;
    averageFitness = 0;
    generationCount.textContent = generation;
    bestFitness.textContent = highestFitness;
    avgFitness.textContent = averageFitness.toFixed(2);
    resetObstacles();
    createAiDrones();
    startTime = performance.now();
    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}
function updateSavedModelStatus() {
  /* Same updateSavedModelStatus */ if (
        bestGenomeEver &&
        bestGenomeEver.score !== undefined
    ) {
        savedModelStatus.textContent = `Terbaik Fit: ${bestGenomeEver.score.toFixed(0)}`;
        savedModelStatus.classList.remove("text-gray-400");
        savedModelStatus.classList.add("text-green-400");
        playBestAiButton.disabled = false;
    } else {
        savedModelStatus.textContent = "Belum ada";
        savedModelStatus.classList.add("text-gray-400");
        savedModelStatus.classList.remove("text-green-400");
        playBestAiButton.disabled = true;
    }
}

// --- Modal Functions --- (No changes needed)
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
        messageBox.textContent = "Gagal menampilkan jaringan: " + error.message;
        console.error("Network display error:", error);
    }
}
function closeNetworkModalFunc() {
    networkModal.style.display = "none";
    networkJsonDisplay.textContent = "";
}

// --- Event Listeners ---
window.addEventListener("resize", resizeCanvas); // Restored listener
resetButton.addEventListener("click", switchToManualMode);
startAiButton.addEventListener("click", toggleAiTraining);
playBestAiButton.addEventListener("click", togglePlaybackMode);
saveModelButton.addEventListener("click", saveBestModel);
importFile.addEventListener("change", importModel);
clearObstaclesButton.addEventListener("click", resetObstacles);
viewNetworkButton.addEventListener("click", openNetworkModal);
closeNetworkModal.addEventListener("click", closeNetworkModalFunc);
gameScaleSelect.addEventListener("change", () => applyGameScale(true)); // Use arrow function to pass parameter

obstacleToggle.addEventListener("change", (e) => {
    obstaclesEnabled = e.target.checked;
    messageBox.textContent = `Rintangan ${obstaclesEnabled ? "diaktifkan" : "dinonaktifkan"}.`;
    if (!obstaclesEnabled) {
        resetObstacles();
    }
});
window.addEventListener("click", (event) => {
    if (event.target == networkModal) {
        closeNetworkModalFunc();
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
// Obstacle sliders now update BASE sizes, applyGameScale updates scaled sizes
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
    applyGameScale(false); /* Update scaled sizes */
});
obstacleMaxSizeSlider.addEventListener("input", (e) => {
    baseObstacleMaxSize = parseInt(e.target.value);
    obstacleMaxSizeValue.textContent = baseObstacleMaxSize;
    if (baseObstacleMaxSize < baseObstacleMinSize) {
        obstacleMinSizeSlider.value = baseObstacleMaxSize;
        baseObstacleMinSize = baseObstacleMaxSize;
        obstacleMinSizeValue.textContent = baseObstacleMinSize;
    }
    applyGameScale(false); /* Update scaled sizes */
});

// --- Initial Setup ---
window.onload = () => {
    resizeCanvas(); // Initial resize based on window
    gameScaleSelect.value = gameScale; // Set dropdown to default scale
    applyGameScale(false); // Apply initial game scale WITHOUT showing reset message
    updateSavedModelStatus();
    obstacleToggle.checked = obstaclesEnabled;
    stopAllModes(); // Ensure clean state
    displayGameOver(); // Show initial prompt
    currentMode.textContent = "Manual";
    messageBox.textContent = "Tekan [R] Manual | [T] Training AI | [P] Playback.";
    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(gameLoop);
    }
};
