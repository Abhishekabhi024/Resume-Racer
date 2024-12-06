
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#0a0a0a',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);
let car;
let checkpoints = [];
let skillsBillboards = [];
let medalText;

function preload() {
    this.load.image('track', 'https://via.placeholder.com/800x600'); // Placeholder track
    this.load.image('car', 'https://via.placeholder.com/50x30'); // Placeholder car
    this.load.image('billboard', 'https://via.placeholder.com/100x50'); // Placeholder billboard
    this.load.image('checkpoint', 'https://via.placeholder.com/80x80'); // Placeholder checkpoint
}

function create() {
    const { width, height } = this.scale;

    // Background track
    this.add.image(width / 2, height / 2, 'track').setScale(2);

    // Player car
    car = this.physics.add.sprite(width / 2, height - 100, 'car');
    car.setCollideWorldBounds(true);

    // Add keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();

    // Add resume elements
    addSkillsBillboards(this, width, height);
    addEducationCheckpoints(this, width, height);
    addAchievements(this, width, height);

    // Add text display for medals/achievements
    medalText = this.add.text(10, 10, 'Achievements: ', { fontSize: '16px', fill: '#fff' });
}

function update() {
    const speed = 200;
    car.setVelocity(0);

    if (this.cursors.left.isDown) {
        car.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
        car.setVelocityX(speed);
    }

    if (this.cursors.up.isDown) {
        car.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
        car.setVelocityY(speed);
    }
}

function addSkillsBillboards(scene, width, height) {
    const skills = ['Python', 'C', 'Prompt Engineering', 'AWS'];
    skills.forEach((skill, index) => {
        const x = width / 4 + (index * 200);
        const y = height - 400 - (index * 150);
        const billboard = scene.add.image(x, y, 'billboard').setScale(0.5);
        scene.add.text(x - 40, y - 20, skill, { fontSize: '12px', fill: '#fff' });
        skillsBillboards.push(billboard);
    });
}

function addEducationCheckpoints(scene, width, height) {
    const education = [
        { name: 'B.Tech at CMR College', year: '2021-2025' },
        { name: 'Intermediate at Narayana College', year: '2019-2021' },
        { name: 'High School at Manjeera Vidyalayam', year: '2018-2019' }
    ];
    education.forEach((edu, index) => {
        const x = width / 3 + (index * 250);
        const y = height - 600 - (index * 200);
        const checkpoint = scene.add.image(x, y, 'checkpoint').setScale(0.6);
        scene.add.text(x - 50, y - 60, `${edu.name} (${edu.year})`, { fontSize: '10px', fill: '#fff' });
        checkpoints.push(checkpoint);
    });
}

function addAchievements(scene, width, height) {
    const achievements = [
        'Street Cause Volunteer',
        'AWS APAC Solutions Architecture'
    ];
    achievements.forEach((achievement, index) => {
        const x = 100 + (index * 200);
        const y = 50 + (index * 100);
        scene.add.text(x, y, `🏅 ${achievement}`, { fontSize: '14px', fill: '#fff' });
    });
}
